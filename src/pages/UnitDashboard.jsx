import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Volume2, 
  BookOpen, 
  PenTool, 
  Gamepad2, 
  Languages, 
  BookOpenCheck 
} from "lucide-react";
import VocabListeningSection from "../components/VocabListeningSection";
import GrammarSection from "../components/GrammarSection";
import RepriseGrammar from "../components/RepriseGrammar";
import PracticeMenu from "../components/games/PracticeMenu";
import GamesSection from "../components/GamesSection";
import UnitAvatarSpeaker from "../components/UnitAvatarSpeaker";
import AtelierSectionUnit1 from "../components/sections/AtelierSectionUnit1";
import AtelierSectionUnit2 from "../components/sections/AtelierSectionUnit2";
import AtelierSectionGeneral from "../components/sections/AtelierSectionGeneral";
import { UNIT_DOSSIER_CONFIG } from "../data/unitMetadata";
import "./UnitDashboard.css";

const STANDARD_TABS = [
  { id: "vocab", label: "Vocabulaire & Écoute", icon: Volume2 },
  { id: "grammar", label: "Grammaire & Règles", icon: BookOpen },
  { id: "practice", label: "Entraînement & Exercices", icon: PenTool },
  { id: "games", label: "Jeux & Défis", icon: Gamepad2 },
];

export default function UnitDashboard() {
  const { unitId, section } = useParams();
  const allowedUnits = ["reprise", "1"];
  const isVercel = (typeof window !== "undefined" && (
    window.location.hostname.includes("vercel") || 
    window.location.hostname.includes("vercel.app")
  )) || (typeof process !== "undefined" && process.env && (process.env.IS_VERCEL === "1" || process.env.VERCEL_URL));
  
  const currentConfig = UNIT_DOSSIER_CONFIG[unitId] || UNIT_DOSSIER_CONFIG['1'];

  if (isVercel && !allowedUnits.includes(unitId)) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header glass-panel">
          <div>
            <p className="unit-subtitle">{currentConfig?.subtitle || `Unité ${unitId}`}</p>
            <h2 className="unit-title text-gradient">{currentConfig?.title || `Unité ${unitId}`}</h2>
          </div>
        </header>

        <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
          <div className="section-content animate-in empty-state glass-panel" style={{ textAlign: "center", padding: "3.5rem 2rem", maxWidth: "600px", borderRadius: "1.25rem", margin: "2rem auto" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f8fafc", marginBottom: "0.5rem" }}>
              Nous n'y sommes pas encore.
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
              Ce contenu sera disponible prochainement au fil de l'année scolaire.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section mapping for 3-Dossier Hub Model
  const getInitialDossier = () => {
    if (section === 'grammaire' || section === 'grammar' || section === 'studio') return 'grammar';
    if (section === 'atelier' || section === 'practice' || section === 'exercices' || section === 'jeux') return 'atelier';
    if (section === 'vocabulaire' || section === 'vocab' || section === 'lexique') return 'vocab';
    return null; // When clicking a unit, only show the 3 Dossiers
  };

  const [activeTab, setActiveTab] = useState("vocab");
  const [activeDossier, setActiveDossier] = useState(getInitialDossier());

  useEffect(() => {
    setActiveTab("vocab");
    setActiveDossier(getInitialDossier());
  }, [unitId, section]);

  const isReprise = unitId === "reprise";
  const isDossierUnit = ["1", "2", "3", "4", "5", "6"].includes(unitId);
  
  const unitTitle = isReprise 
    ? "Unité : Reprise" 
    : currentConfig?.title || `Unité ${unitId}`;
    
  const unitSubtitle = isReprise 
    ? "Révision globale de la syntaxe et des structures fondamentales" 
    : currentConfig?.subtitle || "Explorez les leçons et pratiquez vos compétences";

  return (
    <div className="dashboard-container">
      {/* Unit Header with Speaker Avatar */}
      <header className="dashboard-header novel-header" style={{ alignItems: 'center' }}>
        <div className="header-text">
          <h2 className="title-novel">{unitTitle}</h2>
          <p className="subtitle-novel">{unitSubtitle}</p>
        </div>
        {isDossierUnit && currentConfig?.avatar && (
          <div className="unit-header-right">
            <UnitAvatarSpeaker 
              avatar={currentConfig.avatar} 
              name={currentConfig.avatarName} 
              audioSrc={currentConfig.audioSrc} 
              speechFallbackText={currentConfig.speechFallbackText}
            />
          </div>
        )}
      </header>

      {/* ── UNITÉS 1 À 6 : HUB MODULAIRE EN 3 GRANDS DOSSIERS ── */}
      {isDossierUnit ? (
        <>
          <div className="section-navigation">
            {/* Dossier 01: Vocabulaire & Écoute */}
            <div 
              className={`section-card ${activeDossier === 'vocab' ? 'active' : ''}`}
              onClick={() => setActiveDossier(activeDossier === 'vocab' ? null : 'vocab')}
            >
              <div className="tab-icon-badge vocab-badge">
                <Languages size={28} />
              </div>
              <div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: activeDossier === 'vocab' ? '#ffffff' : '#06b6d4', 
                  display: 'block', 
                  marginBottom: '2px' 
                }}>
                  {currentConfig?.dossier1.tag || 'Dossier 01'}
                </span>
                <h3>{currentConfig?.dossier1.title || 'Le Lexique'}</h3>
                <p>{currentConfig?.dossier1.subtitle || 'Écoute • Vocabulaire • Prononciation'}</p>
              </div>
            </div>

            {/* Dossier 02: Grammaire & Règles */}
            <div 
              className={`section-card ${activeDossier === 'grammar' ? 'active' : ''}`}
              onClick={() => setActiveDossier(activeDossier === 'grammar' ? null : 'grammar')}
            >
              <div className="tab-icon-badge grammar-badge">
                <BookOpenCheck size={28} />
              </div>
              <div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: activeDossier === 'grammar' ? '#ffffff' : '#f59e0b', 
                  display: 'block', 
                  marginBottom: '2px' 
                }}>
                  {currentConfig?.dossier2.tag || 'Dossier 02'}
                </span>
                <h3>{currentConfig?.dossier2.title || 'Le Studio & Règles'}</h3>
                <p>{currentConfig?.dossier2.subtitle || 'Règles • Conjugaison • Structures'}</p>
              </div>
            </div>

            {/* Dossier 03: L'Atelier Créatif & Jeux */}
            <div 
              className={`section-card ${activeDossier === 'atelier' ? 'active' : ''}`}
              onClick={() => setActiveDossier(activeDossier === 'atelier' ? null : 'atelier')}
            >
              <div className="tab-icon-badge practice-badge">
                <PenTool size={28} />
              </div>
              <div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: activeDossier === 'atelier' ? '#ffffff' : '#c084fc', 
                  display: 'block', 
                  marginBottom: '2px' 
                }}>
                  {currentConfig?.dossier3.tag || 'Dossier 03'}
                </span>
                <h3>{currentConfig?.dossier3.title || 'L\'Atelier Créatif & Jeux'}</h3>
                <p>{currentConfig?.dossier3.subtitle || 'Exercices • Mots Croisés • Jeux & Défis'}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            {!activeDossier && (
              <div className="hub-welcome-prompt animate-in">
                <p style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
                  👆 Cliquez sur l'un des 3 dossiers ci-dessus pour afficher son contenu.
                </p>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.35rem', marginBottom: 0 }}>
                  {currentConfig?.dossier1.tag} ({currentConfig?.dossier1.title}) • {currentConfig?.dossier2.tag} ({currentConfig?.dossier2.title}) • {currentConfig?.dossier3.tag} ({currentConfig?.dossier3.title})
                </p>
              </div>
            )}

            {/* Dossier 1 Content */}
            {activeDossier === 'vocab' && (
              <div className="section-content animate-in novel-frame-container">
                <VocabListeningSection unitId={unitId} />
              </div>
            )}

            {/* Dossier 2 Content */}
            {activeDossier === 'grammar' && (
              <div className="section-content animate-in novel-frame-container">
                <GrammarSection unitId={unitId} />
              </div>
            )}

            {/* Dossier 3 Content */}
            {activeDossier === 'atelier' && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === '1' ? (
                  <AtelierSectionUnit1 />
                ) : unitId === '2' ? (
                  <AtelierSectionUnit2 />
                ) : (
                  <AtelierSectionGeneral unitId={unitId} />
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        /* ── UNITÉ REPRISE : ONGLETS STANDARDS DE RENTRÉE CONSERVÉS ── */
        <>
          <div className="tabs-container novel-tabs-bar">
            {STANDARD_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""} novel-style`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="dashboard-content">
            {activeTab === "vocab" && (
              <div className="section-content animate-in novel-frame-container">
                <VocabListeningSection unitId={unitId} />
              </div>
            )}
            {activeTab === "grammar" && (
              <div className="section-content animate-in novel-frame-container">
                <RepriseGrammar />
              </div>
            )}
            {activeTab === "practice" && (
              <div className="section-content animate-in novel-frame-container">
                <PracticeMenu unitId={unitId} />
              </div>
            )}
            {activeTab === "games" && (
              <div className="section-content animate-in novel-frame-container">
                <GamesSection unitId={unitId} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
