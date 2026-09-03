import React, { useState } from 'react';
import './WritingPractice.css';
import { analyzeFrenchText } from '../../utils/frenchTextAnalyzer';

export default function WritingPractice({ unitId, onBack }) {
  const isUnit2 = unitId === '2';
  const isUnit3 = unitId === '3';
  const isUnit4 = unitId === '4';
  const promptSubject = isUnit4 ? "Critique d'Art & Récit Culturel" : isUnit3 ? "Se protéger en ligne" : isUnit2 ? "Souvenirs d'école & Vision de l'éducation" : "Journaliste en Action";
  const promptText = isUnit4
    ? "Rédigez la critique d'un film, d'une œuvre d'art ou le récit d'un souvenir culturel marquant (au moins 50 mots). Vous devez utiliser le PASSÉ COMPOSÉ et l'IMPARFAIT (décor vs événement), au moins un VERBE RÉFLÉCHI (se passionner, se dérouler...), et des CONNECTEURS LOGIQUES (tout d'abord, cependant, en conclusion)."
    : isUnit3
    ? "Écrivez un court e-mail (au moins 50 mots au PRÉSENT) à un ami pour lui expliquer comment vous protégez vos données sur Internet. Vous devez utiliser au moins 3 PRONOMS OBJETS (me, te, se, nous, vous, le, la, les, lui, leur, y, en) pour éviter les répétitions."
    : isUnit2 
    ? "Rédigez un court paragraphe (au moins 50 mots) pour décrire vos souvenirs de votre ancienne école (à l'IMPARFAIT) et ce que vous avez fait récemment pour améliorer vos études (au PASSÉ COMPOSÉ). Vous devez aussi utiliser au moins 3 PRONOMS OBJETS (le, la, les, lui, leur, y, en) pour éviter les répétitions."
    : "Vous êtes un jeune journaliste. Écrivez un court paragraphe (au moins 50 mots) au PRÉSENT pour décrire comment vous trouvez vos informations, comment vous écrivez vos articles, et pourquoi la liberté de la presse est importante.";
  const perfectScoreMsg = isUnit4
    ? "Félicitations ! Votre critique artistique est magnifiquement rédigée au passé avec le vocabulaire de l'Unité 4 ! 🎨🎬✨"
    : isUnit3
    ? "Excellent e-mail ! Vos conseils en cybersécurité sont très clairs. 🛡️✨"
    : isUnit2
    ? "Excellent travail ! Votre texte sur l'éducation utilise parfaitement les temps du passé et les pronoms objets ! 🏫✨"
    : "Excellent travail ! Vous avez le talent d'un vrai journaliste. 📰✨";
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleAnalyze = () => {
    const result = analyzeFrenchText(text, {
      unitId: unitId,
      checkLength: true,
      minWords: 50
    });
    setFeedback(result);
  };

  return (
    <div className="writing-practice">
      <button className="back-btn" onClick={onBack}>
        ← Retour au menu
      </button>

      <div className="writing-header glass-panel">
        <h2 className="text-gradient">Production Écrite</h2>
        <div className="writing-prompt">
          <strong>Sujet : {promptSubject}</strong><br/>
          {promptText}
          <br/><br/>
          <em>Contrainte : Utilisez le vocabulaire de l'unité et les verbes réguliers/irréguliers vus en classe.</em>
        </div>
      </div>

      <div className="writing-workspace">
        <div className="editor-panel glass-panel">
          <textarea
            className="writing-textarea"
            placeholder="Écrivez votre paragraphe ici..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFeedback(null); // Clear feedback when typing
            }}
          ></textarea>
          
          <div className="editor-footer">
            <span className={`word-count ${wordCount < 50 ? 'text-danger' : 'text-success'}`}>
              Mots : {wordCount} / 50 min.
            </span>
            <button 
              className="check-btn btn-accent" 
              onClick={handleAnalyze}
              disabled={text.trim().length === 0}
            >
              Demander une correction
            </button>
          </div>
        </div>

        {feedback && (
          <div className="feedback-panel glass-panel slide-in">
            <h3 className="feedback-title">Rapport de Correction</h3>
            
            <div className="score-circle">
              <span className="score-num">{feedback.score}</span>
              <span className="score-denom">/ 10</span>
            </div>

            {/* General feedback */}
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#475569', fontSize: '0.85rem', fontWeight: 600, margin: '0.5rem 0 1rem' }}>
              {feedback.generalFeedback}
            </p>

            {feedback.isValid && (
              <div style={{ padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(22,163,74,0.2)', background: 'rgba(22,163,74,0.05)', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 700 }}>
                ✅ Zéro faute ! Excellent travail !
              </div>
            )}

            {/* Verb Agreements */}
            {feedback.verbAgreements && feedback.verbAgreements.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accords de verbes</span>
                {feedback.verbAgreements.map((err, idx) => (
                  <div key={idx} style={{ padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(220,38,38,0.1)', background: 'rgba(220,38,38,0.03)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.5, margin: 0 }}>{err.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Adjective Agreements */}
            {feedback.adjectiveAgreements && feedback.adjectiveAgreements.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accord des adjectifs</span>
                {feedback.adjectiveAgreements.map((err, idx) => (
                  <div key={idx} style={{ padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(234,88,12,0.1)', background: 'rgba(234,88,12,0.03)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.5, margin: 0 }}>{err.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Noun Genders */}
            {feedback.nounGenders && feedback.nounGenders.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Genre des noms</span>
                {feedback.nounGenders.map((err, idx) => (
                  <div key={idx} style={{ padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(217,119,6,0.1)', background: 'rgba(217,119,6,0.03)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.5, margin: 0 }}>{err.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Spelling Errors */}
            {feedback.spellingErrors && feedback.spellingErrors.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Orthographe</span>
                {feedback.spellingErrors.map((err, idx) => (
                  <div key={idx} style={{ padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(37,99,235,0.1)', background: 'rgba(37,99,235,0.03)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.5, margin: 0 }}>{err.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Word Choices */}
            {feedback.wordChoices && feedback.wordChoices.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vocabulaire & Prépositions</span>
                {feedback.wordChoices.map((err, idx) => (
                  <div key={idx} style={{ padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.1)', background: 'rgba(124,58,237,0.03)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.5, margin: 0 }}>{err.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Structure Notes */}
            <ul className="feedback-notes">
              {feedback.structureNotes.map((note, idx) => (
                <li key={idx} className={`note-item note-${note.type}`}>
                  {note.type === 'success' && '✅ '}
                  {note.type === 'warning' && '⚠️ '}
                  {note.type === 'error' && '❌ '}
                  {note.msg}
                </li>
              ))}
            </ul>

            {feedback.score === 10 && (
              <div className="perfect-score-msg">
                {perfectScoreMsg}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
