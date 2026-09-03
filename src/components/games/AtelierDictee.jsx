import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertTriangle, XCircle, Sparkles, Award } from 'lucide-react';
import { UNIT_1_VOCAB } from '../../data/vocabulary';
import './AtelierDictee.css';

const FRENCH_ACCENTS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ'];

export default function AtelierDictee({ onBack }) {
  const [userSpellings, setUserSpellings] = useState({});
  const [spellingStatus, setSpellingStatus] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);

  const playRecordedAudio = (url, fallbackText) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    setCurrentAudio(audio);
    audio.play().catch((err) => {
      console.warn(`Local audio not found (${url}), using TTS fallback:`, err);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(fallbackText);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const normalizeWithoutAccents = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

  const handleInputChange = (index, value, expected) => {
    setUserSpellings(prev => ({ ...prev, [index]: value }));

    const cleanInput = value.trim();
    const cleanExpected = expected.trim();

    if (!cleanInput) {
      setSpellingStatus(prev => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      return;
    }

    if (cleanInput.toLowerCase() === cleanExpected.toLowerCase()) {
      setSpellingStatus(prev => ({ ...prev, [index]: 'correct' }));
    } else if (normalizeWithoutAccents(cleanInput) === normalizeWithoutAccents(cleanExpected)) {
      setSpellingStatus(prev => ({ ...prev, [index]: 'accent-error' }));
    } else {
      setSpellingStatus(prev => ({ ...prev, [index]: 'spelling-error' }));
    }
  };

  const handleInsertAccent = (index, accent) => {
    const current = userSpellings[index] || '';
    const updated = current + accent;
    handleInputChange(index, updated, UNIT_1_VOCAB[index].word);
  };

  const correctCount = Object.values(spellingStatus).filter(s => s === 'correct').length;

  return (
    <div className="orthographe-disney-container fade-in">
      {onBack && (
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={onBack}
            className="back-btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "0.4rem 0.8rem",
              cursor: "pointer",
              fontSize: "0.85rem"
            }}
          >
            ← Retour aux activités
          </button>
        </div>
      )}

      <div className="dictee-header-banner">
        <div>
          <h3 className="dictee-title">
            <Sparkles className="text-amber-400" size={22} />
            L'Atelier d'Orthographe & Dictée Enchantée
          </h3>
          <p className="dictee-subtitle">
            Écoutez l'audio authentique de chaque mot et écrivez son orthographe exacte en français (Unité 1 : La liberté de la presse).
          </p>
        </div>

        <div className="dictee-badge">
          <Award size={18} className="text-amber-400" />
          <span>Mots maîtrisés : {correctCount} / {UNIT_1_VOCAB.length}</span>
        </div>
      </div>

      <div className="dictee-grid">
        {UNIT_1_VOCAB.map((item, index) => {
          const status = spellingStatus[index];

          return (
            <div key={item.id || index} className="ortho-card-disney">
              <div>
                <div className="card-top-bar">
                  <span className="word-index-tag">Mot {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => playRecordedAudio(`/audio/vocab/word_${item.id}.mp3`, item.word)}
                    className="audio-listen-btn"
                    title="Écouter la dictée du mot"
                  >
                    <Volume2 size={16} /> 🔊 Écouter la dictée
                  </button>
                </div>

                <p className="definition-text">
                  <strong>Définition :</strong> {item.definition}
                </p>
                {item.sentence && (
                  <p className="english-hint-text" style={{ color: "#94a3b8", fontStyle: "italic" }}>
                    Exemple : {item.sentence}
                  </p>
                )}
              </div>

              <div className="input-section-container">
                <div className="accents-bar">
                  <span className="accents-label">Accents :</span>
                  {FRENCH_ACCENTS.map((acc, aIdx) => (
                    <button
                      key={aIdx}
                      type="button"
                      onClick={() => handleInsertAccent(index, acc)}
                      className="accent-key-btn"
                      title={`Insérer ${acc}`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={userSpellings[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value, item.word)}
                  placeholder="Écoutez le mot et tapez son orthographe exacte..."
                  className={`ortho-input-field ${status || ''}`}
                />

                {status === 'correct' && (
                  <div className="feedback-banner status-correct">
                    <CheckCircle2 size={16} />
                    <span>Parfait ! Orthographe impeccable : "{item.word}"</span>
                  </div>
                )}

                {status === 'accent-error' && (
                  <div className="feedback-banner status-accent">
                    <AlertTriangle size={16} />
                    <span>Attention aux accents ! Terme exact : <strong>{item.word}</strong></span>
                  </div>
                )}

                {status === 'spelling-error' && (
                  <div className="feedback-banner status-error">
                    <XCircle size={16} />
                    <span>Orthographe incorrecte. Réécoutez l'audio et vérifiez les lettres.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
