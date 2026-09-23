import React, { useState } from 'react';
import { Volume2, Layers, SpellCheck, Headphones } from 'lucide-react';
import VocabFlashcards from './VocabFlashcards';
import AtelierDictee from './games/AtelierDictee';
import PronunciationPractice from './games/PronunciationPractice';
import VocabHangman from './games/VocabHangman';
import UnitAvatarSpeaker from './UnitAvatarSpeaker';
import './sections/AtelierSectionUnit1.css';

export default function VocabListeningSection({ unitId }) {
  const [activeVocabTab, setActiveVocabTab] = useState('cartes');

  // Unit 4 audio intro fallback text
  const hugoUnit4Script = "Bienvenue dans l'Unité 4 ! Aujourd'hui, nous plongeons au cœur de l'art, du cinéma et de la culture francophone.";

  // Activity Tabs configuration per unit
  const getTabsConfig = (uid) => [
    {
      id: 'cartes',
      title: "Cartes",
      subtitle: uid === '2' 
        ? "Cartes mémoires interactives du lexique de l'éducation" 
        : "Cartes mémoires interactives du lexique de la presse",
      icon: "🃏",
      color: "#3b82f6",
      badgeBg: "rgba(59, 130, 246, 0.15)"
    },
    {
      id: 'dictee',
      title: "Atelier d'Orthographe & Dictee",
      subtitle: "Dictée sonore et orthographe exacte avec barre d'accents",
      icon: "✍️",
      color: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.15)"
    },
    {
      id: 'prononciation',
      title: "Atelier de prononciation",
      subtitle: "Écoute authentique, intonation et compréhension orale",
      icon: "🗣️",
      color: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)"
    }
  ];

  // In Reprise: VocabHangman
  if (unitId === 'reprise') {
    return (
      <div className="vocab-listening-section">
        <VocabHangman unitId={unitId} />
      </div>
    );
  }

  // ── Units 1 and 2: Identical 3 Activity Tabs Layout ──────────────────────────
  if (unitId === '1' || unitId === '2') {
    const tabs = getTabsConfig(unitId);

    return (
      <div className="vocab-listening-menu fade-in">
        {/* 3 Tabs Bar */}
        <div className="atelier-nav-bar" style={{ marginBottom: '1.75rem' }}>
          {tabs.map(tab => {
            const isActive = activeVocabTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveVocabTab(tab.id)}
                className={`atelier-nav-btn ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? tab.color : 'rgba(255, 255, 255, 0.12)'
                }}
              >
                <div
                  className="atelier-btn-icon"
                  style={{
                    background: isActive ? tab.badgeBg : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${isActive ? tab.color + '55' : 'rgba(255, 255, 255, 0.08)'}`
                  }}
                >
                  {tab.icon}
                </div>
                <div>
                  <span 
                    className="atelier-btn-title" 
                    style={{ color: isActive ? tab.color : '#f8fafc' }}
                  >
                    {tab.title}
                  </span>
                  <span className="atelier-btn-sub">{tab.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="atelier-subpanel-card animate-fade-in">
          {/* Tab 1: Cartes */}
          {activeVocabTab === 'cartes' && (
            <div className="cartes-tab-panel">
              <VocabFlashcards unitId={unitId} />
            </div>
          )}

          {/* Tab 2: Atelier d'Orthographe & Dictee */}
          {activeVocabTab === 'dictee' && (
            <div className="dictee-tab-panel">
              <AtelierDictee unitId={unitId} />
            </div>
          )}

          {/* Tab 3: Atelier de prononciation */}
          {activeVocabTab === 'prononciation' && (
            <div className="prononciation-tab-panel">
              <div className="mb-4">
                <h3 className="section-title">
                  {unitId === '1' 
                    ? "Vocabulaire & Écoute : La liberté de la presse" 
                    : "Vocabulaire & Écoute"}
                </h3>
                <p style={{ opacity: 0.85 }}>
                  Écoutez la prononciation authentique de chaque mot et travaillez votre intonation et compréhension orale.
                </p>
              </div>
              <PronunciationPractice unitId={unitId} />
            </div>
          )}
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

  // Other Units: Default PronunciationPractice view
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
