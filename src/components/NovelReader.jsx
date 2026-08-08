import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, VolumeX, CheckCircle, HelpCircle, ArrowRight, ArrowLeft, Award, Search, Sparkles, UserCheck, Play, Pause } from 'lucide-react';
import { NOVEL_CHAPTERS } from '../data/novelData';
import './NovelReader.css';

export default function NovelReader({ onBack }) {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('reading'); // 'reading', 'vocab', 'quiz'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(null);
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const chapter = NOVEL_CHAPTERS[activeChapterIdx];

  const [activeAudioObj, setActiveAudioObj] = useState(null);

  // Stop audio speech on chapter change or unmount
  useEffect(() => {
    if (activeAudioObj) {
      activeAudioObj.pause();
    }
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setCurrentLineIdx(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  }, [activeChapterIdx]);

  const speakLine = (line, idx) => {
    if (activeAudioObj) {
      activeAudioObj.pause();
      setActiveAudioObj(null);
    }
    window.speechSynthesis.cancel();

    if (isPlayingAudio && currentLineIdx === idx) {
      setIsPlayingAudio(false);
      setCurrentLineIdx(null);
      return;
    }

    if (line.audioSrc) {
      const audio = new Audio(line.audioSrc);
      setActiveAudioObj(audio);
      setIsPlayingAudio(true);
      setCurrentLineIdx(idx);

      audio.onended = () => {
        setIsPlayingAudio(false);
        setCurrentLineIdx(null);
        setActiveAudioObj(null);
      };

      audio.onerror = () => {
        setIsPlayingAudio(false);
        setCurrentLineIdx(null);
        setActiveAudioObj(null);
      };

      audio.play().catch(e => console.log("Audio play error:", e));
    } else {
      const utterance = new SpeechSynthesisUtterance(line.audioText);
      utterance.lang = 'fr-FR';
      utterance.rate = line.speaker === 'lea' ? 0.92 : 0.95;
      utterance.pitch = line.speaker === 'lea' ? 1.25 : 1.20;

      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setCurrentLineIdx(idx);
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setCurrentLineIdx(null);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setCurrentLineIdx(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectQuizOpt = (qId, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qId]: optIdx });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    chapter.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIdx) {
        score += 100;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <div className="novel-container glass-panel animate-in">
      {/* Novel Header */}
      <div className="novel-header">
        <div className="novel-header-info">
          <span className="novel-badge">📖 Roman Interactif — French 11 Immersion</span>
          <h1 className="novel-main-title">Le Secret du Manuscrit Francophone</h1>
          <p className="novel-subtitle">Suivez les aventures de Léa & Hugo à travers 6 chapitres thématiques !</p>
        </div>
        {onBack && (
          <button className="novel-back-btn" onClick={onBack}>
            ← Retour au tableau de bord
          </button>
        )}
      </div>

      {/* Chapter Navigation Tabs */}
      <div className="chapter-selector-container">
        {NOVEL_CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            className={`chapter-tab-btn ${activeChapterIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveChapterIdx(idx)}
          >
            <span className="chapter-num">{ch.number}</span>
            <span className="chapter-tab-title">{ch.title}</span>
          </button>
        ))}
      </div>

      {/* Chapter Overview Box */}
      <div className="chapter-overview-box glass-panel">
        <div className="chapter-meta-tag">
          <span className="meta-pill theme-pill">📌 {chapter.theme}</span>
          <span className="meta-pill grammar-pill">💡 Grammaire : {chapter.grammarFocus}</span>
        </div>
        <h2 className="chapter-title">{chapter.number} : {chapter.title}</h2>
        <p className="chapter-summary">{chapter.summary}</p>
      </div>

      {/* Inner Subtabs (Lecture, Vocabulaire, Quiz) */}
      <div className="novel-subtabs">
        <button
          className={`subtab-btn ${activeTab === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveTab('reading')}
        >
          <BookOpen size={18} />
          <span>Lecture & Audio ({chapter.content.length} répliques)</span>
        </button>
        <button
          className={`subtab-btn ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          <Search size={18} />
          <span>Fiche de Vocabulaire ({chapter.vocabList.length} mots)</span>
        </button>
        <button
          className={`subtab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <HelpCircle size={18} />
          <span>Questions de Compréhension</span>
        </button>
      </div>

      {/* SUBTAB 1 : READING & AUDIO */}
      {activeTab === 'reading' && (
        <div className="novel-reading-section">
          <div className="story-dialogue-list">
            {chapter.content.map((line, idx) => {
              const isLea = line.speaker === 'lea';
              const isCurrentPlaying = isPlayingAudio && currentLineIdx === idx;
              return (
                <div
                  key={line.id}
                  className={`dialogue-card ${isLea ? 'lea-card' : 'hugo-card'} ${isCurrentPlaying ? 'playing-glow' : ''}`}
                >
                  <div className="avatar-side">
                    <img
                      src={isLea ? "/avatars/lea.jpg" : "/avatars/hugo.jpg"}
                      alt={line.speakerName}
                      className="speaker-avatar-img"
                    />
                    <span className={`speaker-badge ${isLea ? 'lea-badge' : 'hugo-badge'}`}>
                      {line.speakerName}
                    </span>
                  </div>

                  <div className="speech-content-side">
                    <p className="speech-text">{line.text}</p>
                    <button
                      className={`audio-listen-btn ${isCurrentPlaying ? 'active-audio' : ''}`}
                      onClick={() => speakLine(line, idx)}
                    >
                      {isCurrentPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                      <span>{isCurrentPlaying ? "Pause" : `Écouter (${line.speakerName})`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reading-actions">
            {activeChapterIdx < NOVEL_CHAPTERS.length - 1 && (
              <button
                className="next-chapter-btn"
                onClick={() => setActiveChapterIdx(activeChapterIdx + 1)}
              >
                <span>Chapitre Suivant : {NOVEL_CHAPTERS[activeChapterIdx + 1].title}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2 : FICHE DE VOCABULAIRE */}
      {activeTab === 'vocab' && (
        <div className="novel-vocab-section">
          <h3 className="vocab-section-title">📚 Vocabulaire Clé — {chapter.number}</h3>
          <div className="vocab-grid">
            {chapter.vocabList.map((item, idx) => (
              <div key={idx} className="vocab-card glass-panel">
                <span className="vocab-word">{item.word}</span>
                <p className="vocab-definition">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3 : COMPREHENSION QUIZ */}
      {activeTab === 'quiz' && (
        <div className="novel-quiz-section">
          <h3 className="quiz-section-title">🧪 Quiz de Compréhension — {chapter.number}</h3>
          {!quizSubmitted ? (
            <div>
              {chapter.quiz.map((q) => (
                <div key={q.id} className="quiz-card glass-panel">
                  <h4 className="quiz-question">{q.id}. {q.question}</h4>
                  <div className="quiz-options-list">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className={`quiz-opt-btn ${quizAnswers[q.id] === optIdx ? 'selected' : ''}`}
                        onClick={() => handleSelectQuizOpt(q.id, optIdx)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                className="submit-quiz-btn"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < chapter.quiz.length}
              >
                Valider mes réponses
              </button>
            </div>
          ) : (
            <div className="quiz-results-card glass-panel text-center">
              <Award size={64} className="score-icon" />
              <h3>Résultats du Quiz — {chapter.number}</h3>
              <p className="score-value">{quizScore} / {chapter.quiz.length * 100} pts</p>
              <p className="score-feedback">
                {quizScore === chapter.quiz.length * 100
                  ? "Félicitations ! Vous avez parfaitement compris le chapitre !"
                  : "Bon travail ! Relisez le texte et la fiche de vocabulaire pour viser le 100%."}
              </p>

              <div className="quiz-review-list">
                {chapter.quiz.map((q) => (
                  <div key={q.id} className="review-item text-left">
                    <p className="review-q"><strong>{q.id}. {q.question}</strong></p>
                    <p className="review-explanation">💡 Explanation : {q.explanation}</p>
                  </div>
                ))}
              </div>

              <button
                className="retry-quiz-btn"
                onClick={() => setQuizSubmitted(false)}
              >
                Recommencer le Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
