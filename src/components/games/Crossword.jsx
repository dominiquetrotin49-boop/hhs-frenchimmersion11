import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';
import './Crossword.css';

const ACCENTS = ['É', 'È', 'Ê', 'Ë', 'À', 'Â', 'Ù', 'Û', 'Ç', 'Ô', 'Î', 'Ï', 'Œ'];

const normalizeChar = (ch) => {
  if (!ch) return '';
  return ch
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

export default function Crossword({ title, description, numRows, numCols, puzzleData, onBack }) {
  const NUM_ROWS = numRows;
  const NUM_COLS = numCols;
  // Calculate zoom scale specifically for large grids (like IR: 17 cols x 16 rows)
  const gridScale = (numCols >= 16 || numRows >= 15) ? 0.78 : 1;

  const gridMeta = useMemo(() => {
    const meta = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => ({
        isActive: false,
        answer: '',
        words: [],
        startNum: null
      }))
    );

    puzzleData.forEach((w) => {
      meta[w.r][w.c].startNum = w.id;

      for (let i = 0; i < w.word.length; i++) {
        const r = w.r + (w.dir === 'down' ? i : 0);
        const c = w.c + (w.dir === 'across' ? i : 0);
        if (r < numRows && c < numCols) {
          meta[r][c].isActive = true;
          const letter = w.word[i].toUpperCase();
          const existing = meta[r][c].answer;
          if (!existing || letter !== normalizeChar(letter)) {
            meta[r][c].answer = letter;
          }
          meta[r][c].words.push(w);
        }
      }
    });
    return meta;
  }, [puzzleData, numRows, numCols]);

  const [inputs, setInputs] = useState({});
  const [activeWord, setActiveWord] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const inputRefs = useRef({});

  useEffect(() => {
    if (puzzleData && puzzleData.length > 0) {
      setActiveWord(puzzleData[0]);
      setActiveCell({ r: puzzleData[0].r, c: puzzleData[0].c });
    }
  }, [puzzleData]);

  const handleCellClick = (r, c) => {
    const cellMeta = gridMeta[r][c];
    if (!cellMeta.isActive) return;

    setShowErrors(false);

    if (activeCell?.r === r && activeCell?.c === c && cellMeta.words.length > 1) {
      const currentWordIndex = cellMeta.words.findIndex(w => w.id === activeWord?.id);
      const nextWord = cellMeta.words[(currentWordIndex + 1) % cellMeta.words.length];
      setActiveWord(nextWord);
    } else {
      setActiveCell({ r, c });
      if (!cellMeta.words.find(w => w.id === activeWord?.id)) {
        setActiveWord(cellMeta.words[0]);
      }
    }

    inputRefs.current[`${r}-${c}`]?.focus();
  };

  const moveCursor = (r, c, step) => {
    if (!activeWord) return false;
    const isAcross = activeWord.dir === 'across';
    const nextR = r + (isAcross ? 0 : step);
    const nextC = c + (isAcross ? step : 0);

    if (nextR >= 0 && nextR < NUM_ROWS && nextC >= 0 && nextC < NUM_COLS && gridMeta[nextR]?.[nextC]?.isActive) {
      setActiveCell({ r: nextR, c: nextC });
      const nextInput = inputRefs.current[`${nextR}-${nextC}`];
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
        return true;
      }
    }
    return false;
  };

  const moveInGrid = (r, c, dr, dc) => {
    const nextR = r + dr;
    const nextC = c + dc;
    if (nextR >= 0 && nextR < NUM_ROWS && nextC >= 0 && nextC < NUM_COLS && gridMeta[nextR]?.[nextC]?.isActive) {
      handleCellClick(nextR, nextC);
    }
  };

  const handleInputChange = (e, r, c) => {
    const raw = e.target.value.slice(-1);
    const val = raw.toUpperCase();
    setShowErrors(false);

    setInputs(prev => ({
      ...prev,
      [`${r}-${c}`]: val
    }));

    if (val) {
      moveCursor(r, c, 1);
    }
  };

  const handleKeyDown = (e, r, c) => {
    setShowErrors(false);

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (inputs[`${r}-${c}`]) {
        setInputs(prev => ({ ...prev, [`${r}-${c}`]: '' }));
      } else {
        moveCursor(r, c, -1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveInGrid(r, c, -1, 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveInGrid(r, c, 1, 0);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveInGrid(r, c, 0, -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveInGrid(r, c, 0, 1);
    }
  };

  const handleInsertAccent = (char) => {
    let target = activeCell;
    if (!target && activeWord) {
      target = { r: activeWord.r, c: activeWord.c };
    }
    if (!target && puzzleData && puzzleData.length > 0) {
      target = { r: puzzleData[0].r, c: puzzleData[0].c };
    }
    if (!target) return;

    const { r, c } = target;
    setShowErrors(false);
    const val = char.toUpperCase();
    setInputs(prev => ({ ...prev, [`${r}-${c}`]: val }));

    const moved = moveCursor(r, c, 1);
    if (!moved) {
      inputRefs.current[`${r}-${c}`]?.focus();
    }
  };

  const checkAnswers = () => {
    setShowErrors(true);
    let totalCells = 0;
    let correctCells = 0;
    let emptyCells = 0;
    let wrongCells = 0;

    for (let r = 0; r < NUM_ROWS; r++) {
      for (let c = 0; c < NUM_COLS; c++) {
        if (gridMeta[r][c].isActive) {
          totalCells++;
          const val = normalizeChar(inputs[`${r}-${c}`]);
          if (!val) {
            emptyCells++;
          } else if (val === normalizeChar(gridMeta[r][c].answer)) {
            correctCells++;
          } else {
            wrongCells++;
          }
        }
      }
    }

    if (correctCells === totalCells) {
      setIsWon(true);
      setFeedbackMsg({ type: "success", text: "Bravo ! Toutes les réponses sont correctes !" });
    } else {
      setIsWon(false);
      setFeedbackMsg(null);
      setFeedbackMsg({
        type: "info",
        text: `${correctCells} / ${totalCells} lettres correctes. (${wrongCells} erreur${wrongCells > 1 ? "s" : ""}, ${emptyCells} case${emptyCells > 1 ? "s" : ""} vide${emptyCells > 1 ? "s" : ""})`
      });
    }
  };

  const handleReset = () => {
    setInputs({});
    setShowErrors(false);
    setIsWon(false);
    setFeedbackMsg(null);
  };

  // Helper: is this word fully and correctly solved?
  const isWordSolved = (word) => {
    if (!showErrors) return false;
    const normTarget = normalizeChar(word.word);
    for (let i = 0; i < word.word.length; i++) {
      const r = word.r + (word.dir === 'down' ? i : 0);
      const c = word.c + (word.dir === 'across' ? i : 0);
      const val = normalizeChar(inputs[`${r}-${c}`]);
      if (val !== normTarget[i]) return false;
    }
    return true;
  };

  const cellSize = Math.max(18, Math.min(32, Math.floor(480 / Math.max(numCols, numRows * 0.85))));
  const fontSize = Math.max(11, Math.floor(cellSize * 0.55));
  const numFontSize = Math.max(7, Math.floor(cellSize * 0.32));

  return (
    <div className="cw-root">

      {/* ── Top Action Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button className="cw-btn-back" onClick={onBack}>
          <ArrowLeft size={15} /> Retour au menu
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button className="cw-btn-primary" onClick={checkAnswers}>
            <CheckCircle2 size={16} /> Vérifier mes réponses
          </button>
          <button className="cw-btn-ghost" onClick={handleReset}>
            <RefreshCw size={14} /> Réinitialiser
          </button>
        </div>
      </div>

      {/* ── Feedback Banner ── */}
      {feedbackMsg && (
        <div className={`cw-feedback ${feedbackMsg.type}`}>
          {feedbackMsg.type === 'success'
            ? <span className="cw-stamp"><CheckCircle2 size={18} /> Publié !</span>
            : <CheckCircle2 size={18} />
          }
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* ── Masthead / Header ── */}
      <div className="cw-masthead">
        <h2 className="cw-masthead-title">{title}</h2>
        <p className="cw-masthead-subtitle">{description}</p>
      </div>

      {/* ── Accent Toolbar ── */}
      <div className="cw-accent-bar">
        <span className="cw-accent-label">Accents :</span>
        {ACCENTS.map((char) => (
          <button
            key={char}
            type="button"
            className="cw-accent-btn"
            onClick={(e) => {
              e.preventDefault();
              handleInsertAccent(char);
            }}
          >
            {char}
          </button>
        ))}
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="cw-layout">

        {/* Grid Board */}
        <div className="cw-board">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {gridMeta.map((row, r) => (
              <div key={r} style={{ display: 'flex' }}>
                {row.map((cell, c) => {
                  if (!cell.isActive) {
                    return (
                      <div
                        key={`${r}-${c}`}
                        className="cw-cell-inactive"
                        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                      />
                    );
                  }

                  const isActiveCell = activeCell?.r === r && activeCell?.c === c;
                  const isWordCell = activeWord && cell.words.some(w => w.id === activeWord.id);
                  const isChecked = showErrors && inputs[`${r}-${c}`];
                  const isCorrect = isChecked && normalizeChar(inputs[`${r}-${c}`]) === normalizeChar(cell.answer);
                  const isWrong = isChecked && !isCorrect;

                  let cellClass = 'cw-cell-base';
                  if (isCorrect)    cellClass += ' cw-cell-correct';
                  else if (isWrong) cellClass += ' cw-cell-wrong';
                  else if (isActiveCell) cellClass += ' cw-cell-cursor';
                  else if (isWordCell)   cellClass += ' cw-cell-word';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                    >
                      {cell.startNum && (
                        <span
                          className="cw-cell-num"
                          style={{ fontSize: `${numFontSize}px` }}
                        >
                          {cell.startNum}
                        </span>
                      )}
                      <input
                        ref={el => (inputRefs.current[`${r}-${c}`] = el)}
                        type="text"
                        maxLength={2}
                        value={(isChecked && isCorrect) ? cell.answer : (inputs[`${r}-${c}`] || '')}
                        onChange={e => handleInputChange(e, r, c)}
                        onKeyDown={e => handleKeyDown(e, r, c)}
                        onFocus={() => handleCellClick(r, c)}
                        className="cw-cell-input"
                        style={{ fontSize: `${fontSize}px` }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Clue Panel */}
        <div className="cw-clues-panel">
          <h3 className="cw-clues-title">Indices</h3>

          {/* Horizontal clues */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p className="cw-clue-section-head">Horizontale — Across</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {puzzleData.filter(w => w.dir === 'across').map(w => {
                const isSelected = activeWord?.id === w.id;
                const solved = isWordSolved(w);
                return (
                  <div
                    key={w.id}
                    className={`cw-clue-row${isSelected ? ' active' : ''}${solved ? ' solved' : ''}`}
                    onClick={() => {
                      setActiveWord(w);
                      setActiveCell({ r: w.r, c: w.c });
                      inputRefs.current[`${w.r}-${w.c}`]?.focus();
                    }}
                  >
                    <span style={{ textDecoration: solved ? 'line-through' : 'none', opacity: solved ? 0.65 : 1 }}>
                      <strong>{w.id}.</strong> {w.clue}
                    </span>
                    {solved && (
                      <span style={{
                        display: 'inline-block',
                        marginLeft: '0.4rem',
                        color: '#065f46',
                        background: '#d1fae5',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '0.25rem',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.04em',
                        textDecoration: 'none'
                      }}>
                        ✓ {w.word}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vertical clues */}
          <div style={{ marginBottom: '0.5rem' }}>
            <p className="cw-clue-section-head">Verticale — Down</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {puzzleData.filter(w => w.dir === 'down').map(w => {
                const isSelected = activeWord?.id === w.id;
                const solved = isWordSolved(w);
                return (
                  <div
                    key={w.id}
                    className={`cw-clue-row${isSelected ? ' active' : ''}${solved ? ' solved' : ''}`}
                    onClick={() => {
                      setActiveWord(w);
                      setActiveCell({ r: w.r, c: w.c });
                      inputRefs.current[`${w.r}-${w.c}`]?.focus();
                    }}
                  >
                    <span style={{ textDecoration: solved ? 'line-through' : 'none', opacity: solved ? 0.65 : 1 }}>
                      <strong>{w.id}.</strong> {w.clue}
                    </span>
                    {solved && (
                      <span style={{
                        display: 'inline-block',
                        marginLeft: '0.4rem',
                        color: '#065f46',
                        background: '#d1fae5',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '0.25rem',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.04em',
                        textDecoration: 'none'
                      }}>
                        ✓ {w.word}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="cw-clue-divider" />
          <div className="cw-clue-actions">
            <button className="cw-clue-btn-verify" onClick={checkAnswers}>
              <CheckCircle2 size={14} /> Vérifier
            </button>
            <button className="cw-clue-btn-reset" onClick={handleReset}>
              <RefreshCw size={14} /> Réinitialiser
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
