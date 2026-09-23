import React, { useState } from 'react';
import { PenTool, Gamepad2, Sparkles, BookOpen } from 'lucide-react';
import PracticeMenu from '../games/PracticeMenu';
import GamesSection from '../GamesSection';
import './AtelierSectionUnit1.css';

export default function AtelierSectionGeneral({ unitId }) {
  const isDevUnit = unitId === '5' || unitId === '6';

  const TABS = [
    {
      id: 'practice',
      title: "Entraînement & Exercices",
      subtitle: unitId === '4' ? "Mots Croisés, Textes à Trous & Rédaction" : "Drills, Grammaire & Exercices Pratiques",
      icon: "📝",
      color: "#0284c7",
      badgeBg: "rgba(2, 132, 199, 0.15)"
    },
    {
      id: 'games',
      title: "Salle d'Arcade & Quêtes",
      subtitle: "Escape Games, Défis Chrono, Quêtes & RPG",
      icon: "🎮",
      color: "#7c3aed",
      badgeBg: "rgba(124, 58, 237, 0.15)"
    }
  ];

  const [activeTab, setActiveTab] = useState('practice');

  if (isDevUnit) {
    return (
      <div className="section-content animate-in empty-state glass-panel" style={{ textAlign: "center", padding: "3.5rem 2rem", borderRadius: "1.25rem" }}>
        <Sparkles size={48} style={{ margin: "0 auto", color: "#c084fc", marginBottom: "1rem" }} />
        <h3 style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#f8fafc", marginBottom: "0.75rem" }}>
          L'Atelier Créatif & Jeux — Unité {unitId}
        </h3>
        <p style={{ color: "#94a3b8", maxWidth: "550px", margin: "0 auto", lineHeight: 1.6 }}>
          Les énigmes interactives, quêtes d'arcade et ateliers de rédaction pour l'Unité {unitId} sont en cours de déploiement. Revenez très bientôt pour relever ces nouveaux défis !
        </p>
      </div>
    );
  }

  return (
    <div className="atelier-container fade-in">
      {/* 2 Big Action Navigation Tabs */}
      <div className="atelier-nav-bar" style={{ maxWidth: '750px', margin: '0 auto 2rem' }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
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

      {/* Subpanel Content */}
      <div className="atelier-subpanel-card animate-fade-in">
        {activeTab === 'practice' && (
          <div className="practice-subpanel">
            <PracticeMenu unitId={unitId} />
          </div>
        )}

        {activeTab === 'games' && (
          <div className="games-subpanel">
            <GamesSection unitId={unitId} />
          </div>
        )}
      </div>
    </div>
  );
}
