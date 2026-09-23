import React, { useState, useEffect } from 'react';
import { UNIT_1_VOCAB, UNIT_2_VOCAB, UNIT_3_VOCAB, UNIT_4_VOCAB } from '../data/vocabulary';
import { Volume2, CheckCircle, RotateCw, Search, Grid, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import './VocabFlashcards.css';

export default function VocabFlashcards({ unitId = '1', onBack }) {
  const vocabData = unitId === '4' ? UNIT_4_VOCAB : unitId === '3' ? UNIT_3_VOCAB : unitId === '2' ? UNIT_2_VOCAB : UNIT_1_VOCAB;
  const storageKey = `masteredVocab_u${unitId}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'grid'
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredVocab, setMasteredVocab] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(masteredVocab));
    } catch (e) {
      console.warn("Failed to save mastered vocab to localStorage", e);
    }
  }, [masteredVocab, storageKey]);

  useEffect(() => {
    // Warm up speech voice loader
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      window.currentUtterance = utterance;
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const frVoice = voices.find(v => v.lang.includes('fr'));
        if (frVoice) utterance.voice = frVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error(e);
    }
  };

  const playAudio = (id, fallbackText, e) => {
    if (e) e.stopPropagation();
    const url = unitId === '2' ? `/audio/vocab/u2_word_${id}.mp3` : `/audio/vocab/word_${id}.mp3`;
    const audio = new Audio(url);
    audio.play().catch(err => {
      console.warn(`Local audio not found or blocked for word ${id}. Falling back to TTS.`, err);
      speak(fallbackText);
    });
  };

  // Filtered Vocab list
  const filteredVocab = vocabData.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Safe boundary check
  const activeIndex = cardIndex >= filteredVocab.length ? 0 : cardIndex;
  const currentCard = filteredVocab[activeIndex] || null;

  const handleNextCard = () => {
    setIsFlipped(false);
    if (filteredVocab.length === 0) return;
    setCardIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (filteredVocab.length === 0) return;
    setCardIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const toggleMastered = (id, e) => {
    if (e) e.stopPropagation();
    setMasteredVocab(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getCleanSentence = (card) => {
    if (!card) return "";
    return card.sentence.replace("_____", card.word);
  };

  return (
    <div className="vocab-flashcards-container">
      {/* Sub-Header / View toggle */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-black/5 pb-4 w-full">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack} 
              className="deck-nav-btn"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', border: '1px solid rgba(0,0,0,0.15)' }}
            >
              ← Retour
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800" style={{ margin: 0 }}>Cartes</h3>
            <p className="text-sm text-slate-500" style={{ margin: '0.2rem 0 0 0' }}>
              Pratiquez le lexique de l'unité avec la prononciation francophone officielle.
            </p>
          </div>
        </div>

        <div className="flashcard-view-toggles">
          <button
            onClick={() => setViewMode('cards')}
            className={`toggle-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
          >
            <Layers size={14} />
            Mode Cartes
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`toggle-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
          >
            <Grid size={14} />
            Lexique Complet
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="vocab-search-row">
        <div className="vocab-search-input-wrapper">
          <Search size={16} className="vocab-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCardIndex(0);
              setIsFlipped(false);
            }}
            placeholder="Rechercher un mot ou une définition..."
            className="vocab-search-input"
          />
        </div>
      </div>

      {filteredVocab.length === 0 ? (
        <div className="glass-panel text-center py-16" style={{ background: '#fcf9f2' }}>
          <Layers size={48} style={{ margin: '0 auto', opacity: 0.5, marginBottom: '1rem', color: '#e76f51' }} />
          <h3>Aucun mot ne correspond à votre recherche</h3>
        </div>
      ) : viewMode === 'cards' && currentCard ? (
        
        /* 3D Flashcard deck view */
        <div className="max-w-xl mx-auto w-full space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold px-1">
            <span>Carte {activeIndex + 1} sur {filteredVocab.length}</span>
            <span className="text-accent flex items-center gap-1">
              <RotateCw size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
              Cliquez pour retourner
            </span>
          </div>

          {/* Flashcard container wrapper */}
          <div className="h-80 perspective-1000 w-full">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}
            >
              
              {/* Front face (French Word) */}
              <div className="flashcard-front">
                <div className="flex justify-between items-center w-full">
                  <span className="vocab-badge">Français 🇫🇷</span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => playAudio(currentCard.id, currentCard.word, e)}
                      className="card-icon-btn"
                      title="Écouter la prononciation"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      onClick={(e) => toggleMastered(currentCard.id, e)}
                      className={`card-icon-btn ${masteredVocab.includes(currentCard.id) ? 'mastered' : ''}`}
                      title={masteredVocab.includes(currentCard.id) ? 'Maîtrisé' : 'Marquer comme maîtrisé'}
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>

                <div className="flashcard-content-center">
                  <h4 className="flashcard-word">{currentCard.word}</h4>
                </div>

                <div className="flex justify-between items-center w-full text-[10px] text-slate-400 font-bold border-t border-black/5 pt-3">
                  <span>UNITÉ 1</span>
                  <span className="text-accent flex items-center gap-1">
                    <RotateCw size={11} /> Voir la définition
                  </span>
                </div>
              </div>

              {/* Back face (Definition and sentence) */}
              <div className="flashcard-back">
                <div className="flex justify-between items-center w-full">
                  <span className="vocab-badge vocab-badge-success">Définition & Contexte</span>
                  <button
                    onClick={(e) => playAudio(currentCard.id, getCleanSentence(currentCard), e)}
                    className="card-icon-btn"
                    title="Écouter la phrase exemple"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="flashcard-content-center" style={{ gap: '0.75rem' }}>
                  <p className="flashcard-definition">{currentCard.definition}</p>
                  
                  <div className="flashcard-example-box" onClick={(e) => e.stopPropagation()}>
                    <span className="flashcard-example-title">Exemple d'usage</span>
                    <p className="flashcard-example-text">
                      « {getCleanSentence(currentCard)} »
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center w-full text-[10px] text-slate-400 font-bold border-t border-black/5 pt-3">
                  <span>MAÎTRISÉ : {masteredVocab.includes(currentCard.id) ? "OUI" : "NON"}</span>
                  <span className="text-accent flex items-center gap-1">
                    <RotateCw size={11} /> Retourner la carte
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation controls */}
          <div className="deck-controls-row">
            <button onClick={handlePrevCard} className="deck-nav-btn">
              <ChevronLeft size={16} />
              Précédent
            </button>
            <button onClick={handleNextCard} className="deck-nav-btn">
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      ) : (
        
        /* Grid / list view mode */
        <div className="vocab-grid-list">
          {filteredVocab.map((item) => {
            const isMastered = masteredVocab.includes(item.id);
            return (
              <div key={item.id} className={`grid-vocab-card ${isMastered ? 'mastered' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{item.word}</h4>
                    <span className="vocab-badge mt-1" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                      UNITÉ 1
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => playAudio(item.id, item.word, e)}
                      className="card-icon-btn"
                      style={{ width: '32px', height: '32px' }}
                      title="Écouter"
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      onClick={(e) => toggleMastered(item.id, e)}
                      className={`card-icon-btn ${isMastered ? 'mastered' : ''}`}
                      style={{ width: '32px', height: '32px' }}
                      title={isMastered ? 'Maîtrisé' : 'Marquer comme maîtrisé'}
                    >
                      <CheckCircle size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-slate-650 leading-relaxed border-t border-black/5 pt-2">
                  <strong className="text-xs uppercase text-slate-500 tracking-wide block mb-1">Définition :</strong>
                  {item.definition}
                </div>

                <div className="flashcard-example-box" style={{ margin: 0 }}>
                  <span className="flashcard-example-title" style={{ fontSize: '0.6rem' }}>Exemple</span>
                  <p className="flashcard-example-text" style={{ fontSize: '0.85rem' }}>
                    « {getCleanSentence(item)} »
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
