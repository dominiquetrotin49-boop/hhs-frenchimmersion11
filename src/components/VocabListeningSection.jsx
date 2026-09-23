import React, { useState } from 'react';
import { Volume2, Layers, SpellCheck, Headphones } from 'lucide-react';
import VocabFlashcards from './VocabFlashcards';
import AtelierDictee from './games/AtelierDictee';
import PronunciationPractice from './games/PronunciationPractice';
import VocabHangman from './games/VocabHangman';
import UnitAvatarSpeaker from './UnitAvatarSpeaker';

export default function VocabListeningSection({ unitId }) {
  const [activeActivity, setActiveActivity] = useState(null);

  // Unit 4 audio intro fallback text
  const hugoUnit4Script = "Bienvenue dans l'Unité 4 ! Aujourd'hui, nous plongeons au cœur de l'art, du cinéma et de la culture francophone.";

  // In Reprise: VocabHangman
  if (unitId === 'reprise') {
    return (
      <div className="vocab-listening-section">
        <VocabHangman unitId={unitId} />
      </div>
    );
  }

  // Active sub-activity view
  if (activeActivity === 'flashcards') {
    return (
      <div className="vocab-activity-view">
        <button className="back-btn mb-4" onClick={() => setActiveActivity(null)}>
          ← Retour aux activités de vocabulaire
        </button>
        <VocabFlashcards onBack={() => setActiveActivity(null)} />
      </div>
    );
  }

  if (activeActivity === 'dictee') {
    return (
      <div className="vocab-activity-view">
        <button className="back-btn mb-4" onClick={() => setActiveActivity(null)}>
          ← Retour aux activités de vocabulaire
        </button>
        <AtelierDictee onBack={() => setActiveActivity(null)} />
      </div>
    );
  }

  if (activeActivity === 'pronunciation') {
    return (
      <div className="vocab-activity-view">
        <button className="back-btn mb-4" onClick={() => setActiveActivity(null)}>
          ← Retour aux activités de vocabulaire
        </button>
        <PronunciationPractice unitId={unitId} onBack={() => setActiveActivity(null)} />
      </div>
    );
  }

  // Unit 1: Card selector for Flashcards, Dictée, Pronunciation
  if (unitId === '1') {
    return (
      <div className="vocab-listening-menu">
        <div className="mb-4">
          <h3 className="section-title">Vocabulaire & Écoute : La liberté de la presse</h3>
          <p style={{ opacity: 0.85 }}>
            Maîtrisez le lexique journalistique par l'écoute, la mémorisation visuelle en 3D et la dictée sonore.
          </p>
        </div>

        <div className="game-cards-container">
          {/* Card 1: Cartes-Éclairs 3D */}
          <div 
            className="game-card glass-panel animate-in" 
            onClick={() => setActiveActivity('flashcards')}
            style={{ cursor: 'pointer' }}
          >
            <Layers className="game-icon animate-pulse" style={{ color: '#3b82f6' }} size={48} />
            <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Cartes-Éclairs 3D</h4>
            <p style={{ opacity: 0.85, fontSize: '0.92rem' }}>
              Révisez le vocabulaire de la presse avec des cartes mémoires interactives en trois dimensions.
            </p>
            <button className="play-btn btn-accent" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa' }}>
              Lancer les Cartes 3D
            </button>
          </div>

          {/* Card 2: Atelier d'Orthographe & Dictée */}
          <div 
            className="game-card glass-panel animate-in" 
            onClick={() => setActiveActivity('dictee')}
            style={{ cursor: 'pointer' }}
          >
            <SpellCheck className="game-icon" style={{ color: '#f59e0b' }} size={48} />
            <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Atelier d'Orthographe & Dictée</h4>
            <p style={{ opacity: 0.85, fontSize: '0.92rem' }}>
              Écoutez chaque mot de vocabulaire de la presse et tapez son orthographe exacte avec la barre d'accents.
            </p>
            <button className="play-btn" style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24' }}>
              S'entraîner à la Dictée
            </button>
          </div>

          {/* Card 3: Atelier de Prononciation */}
          <div 
            className="game-card glass-panel animate-in" 
            onClick={() => setActiveActivity('pronunciation')}
            style={{ cursor: 'pointer' }}
          >
            <Volume2 className="game-icon" style={{ color: '#10b981' }} size={48} />
            <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Atelier de Prononciation</h4>
            <p style={{ opacity: 0.85, fontSize: '0.92rem' }}>
              Écoutez et répétez chaque terme de l'unité avec la voix native pour perfectionner votre intonation.
            </p>
            <button className="play-btn" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
              Pratiquer l'Écoute
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Unit 4: Hugo voice avatar player + PronunciationPractice
  if (unitId === '4') {
    return (
      <div className="vocab-listening-menu">
        <div className="glass-panel p-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.06)', padding: '1.5rem' }}>
          <UnitAvatarSpeaker 
            avatar="hugo" 
            audioSrc="/audio/unit4_intro_hugo.mp3" 
            name="Hugo" 
            speechFallbackText={hugoUnit4Script}
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Introduction Vocale : Les Arts & la Culture</h4>
            <p style={{ margin: '0.4rem 0 0', opacity: 0.85, fontSize: '0.95rem' }}>
              Écoutez le message audio d'introduction d'Hugo pour découvrir les thématiques artistiques de l'unité.
            </p>
          </div>
        </div>
        <PronunciationPractice unitId="4" />
      </div>
    );
  }

  // Units 2 and 3: PronunciationPractice
  return (
    <div className="vocab-listening-menu">
      <div className="mb-4">
        <h3 className="section-title">Vocabulaire & Écoute</h3>
        <p style={{ opacity: 0.85 }}>
          Écoutez la prononciation authentique de chaque mot et travaillez votre intonation et compréhension orale.
        </p>
      </div>
      <PronunciationPractice unitId={unitId} />
    </div>
  );
}
