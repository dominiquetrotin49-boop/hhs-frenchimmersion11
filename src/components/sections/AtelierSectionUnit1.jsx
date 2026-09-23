import React, { useState } from 'react';
import { 
  PenTool, 
  Edit3, 
  Grid3X3, 
  Gamepad2, 
  Clock, 
  TrendingUp, 
  Flag, 
  ArrowLeft 
} from 'lucide-react';
import Unit1VerbFillInTheBlank from '../games/Unit1VerbFillInTheBlank';
import WritingPrompt from '../games/WritingPrompt';
import Crossword from '../games/Crossword';
import EscapeGame from '../EscapeGame';
import Fishtopia from '../games/Fishtopia';
import EditorChallenge from '../games/EditorChallenge';
import JournalistLadder from '../games/JournalistLadder';
import ScoopRace from '../games/ScoopRace';
import TribuneJournalistique from '../games/TribuneJournalistique';
import './AtelierSectionUnit1.css';
import '../games/Games.css';

// ── 7 Grilles de Mots Croisés au Présent ──────────────────────────────────────────
const ER_PUZZLE = {
  title: "Mots Croisés : Verbes en -ER",
  description: "Remplissez la grille avec les conjugaisons correctes au présent.",
  numRows: 21,
  numCols: 12,
  puzzleData: [
    { id: 1, word: "HABITEZ", r: 0, c: 9, dir: "down", clue: "Vous + Habiter" },
    { id: 2, word: "TRAVAILLENT", r: 4, c: 3, dir: "down", clue: "Ils + Travailler" },
    { id: 3, word: "REGARDE", r: 5, c: 3, dir: "across", clue: "Je + Regarder" },
    { id: 4, word: "AIME", r: 3, c: 8, dir: "across", clue: "Elle + Aimer" },
    { id: 5, word: "PARLONS", r: 8, c: 2, dir: "across", clue: "Nous + Parler" },
    { id: 6, word: "JOUE", r: 12, c: 0, dir: "across", clue: "Je + Jouer" },
    { id: 7, word: "ÉCOUTONS", r: 12, c: 5, dir: "down", clue: "Nous + Écouter" },
    { id: 8, word: "MANGES", r: 12, c: 9, dir: "down", clue: "Tu + Manger" },
    { id: 9, word: "TROUVENT", r: 14, c: 3, dir: "across", clue: "Ils + Trouver" },
    { id: 10, word: "ÉTUDIES", r: 16, c: 4, dir: "across", clue: "Tu + Étudier" }
  ]
};

const IR_PUZZLE = {
  title: "Mots Croisés : Verbes en -IR",
  description: "Remplissez la grille avec les conjugaisons correctes au présent.",
  numRows: 16,
  numCols: 17,
  puzzleData: [
    { id: 1, word: "GRANDISSENT", r: 5, c: 3, dir: "across", clue: "Ils + Grandir" },
    { id: 2, word: "REMPLISSENT", r: 5, c: 4, dir: "down", clue: "Ils + Remplir" },
    { id: 3, word: "MAIGRISSEZ", r: 3, c: 8, dir: "down", clue: "Vous + Maigrir" },
    { id: 4, word: "FINISSONS", r: 3, c: 6, dir: "down", clue: "Nous + Finir" },
    { id: 5, word: "CHOISIS", r: 1, c: 10, dir: "down", clue: "Tu + Choisir" },
    { id: 6, word: "RÉUSSIS", r: 11, c: 0, dir: "across", clue: "Je + Réussir" },
    { id: 7, word: "ROUGIT", r: 0, c: 13, dir: "down", clue: "Elle + Rougir" },
    { id: 8, word: "OBÉIS", r: 9, c: 1, dir: "down", clue: "Tu + Obéir" },
    { id: 9, word: "PUNIS", r: 2, c: 12, dir: "across", clue: "Tu + Punir" },
    { id: 10, word: "AGIT", r: 15, c: 1, dir: "across", clue: "Il + Agir" }
  ],
  cellSize: 24
};

const RE_PUZZLE = {
  title: "Mots Croisés : Verbes en -RE",
  description: "Remplissez la grille avec les conjugaisons correctes au présent.",
  numRows: 16,
  numCols: 11,
  puzzleData: [
    { id: 1, word: "CONFONDENT", r: 9, c: 1, dir: "across", clue: "Ils + Confondre" },
    { id: 2, word: "RÉPONDENT", r: 6, c: 2, dir: "down", clue: "Ils + Répondre" },
    { id: 3, word: "DESCENDEZ", r: 4, c: 6, dir: "down", clue: "Vous + Descendre" },
    { id: 4, word: "DÉFENDONS", r: 7, c: 4, dir: "down", clue: "Nous + Défendre" },
    { id: 5, word: "VENDONS", r: 8, c: 8, dir: "down", clue: "Nous + Vendre" },
    { id: 6, word: "ATTENDS", r: 8, c: 10, dir: "down", clue: "Tu + Attendre" },
    { id: 7, word: "ENTENDS", r: 14, c: 0, dir: "across", clue: "Je + Entendre" },
    { id: 8, word: "RENDS", r: 4, c: 3, dir: "across", clue: "Je + Rendre" },
    { id: 9, word: "MORDS", r: 0, c: 7, dir: "down", clue: "Tu + Mordre" },
    { id: 10, word: "PERD", r: 6, c: 0, dir: "across", clue: "Elle + Perdre" }
  ]
};

const AUX_PUZZLE = {
  title: "Mots Croisés : Être & Avoir",
  description: "Remplissez la grille avec les conjugaisons correctes de Être et Avoir.",
  numRows: 8,
  numCols: 9,
  puzzleData: [
    { id: 1, word: "AS", r: 0, c: 3, dir: "down", clue: "tu — avoir" },
    { id: 2, word: "SOMMES", r: 1, c: 3, dir: "across", clue: "nous — être" },
    { id: 3, word: "ONT", r: 1, c: 4, dir: "down", clue: "ils — avoir" },
    { id: 4, word: "SUIS", r: 1, c: 8, dir: "down", clue: "je — être" },
    { id: 5, word: "EST", r: 3, c: 2, dir: "across", clue: "il / elle / on — être" },
    { id: 6, word: "SONT", r: 3, c: 3, dir: "down", clue: "ils — être" },
    { id: 7, word: "AVEZ", r: 4, c: 1, dir: "down", clue: "vous — avoir" },
    { id: 8, word: "ÊTES", r: 4, c: 5, dir: "across", clue: "vous — être" },
    { id: 9, word: "ES", r: 4, c: 7, dir: "down", clue: "tu — être" },
    { id: 10, word: "AVONS", r: 5, c: 0, dir: "across", clue: "nous — avoir" }
  ]
};

const IRR_PUZZLE_1 = {
  title: "Mots Croisés : Super Irréguliers & -OIR",
  description: "Conjuguez les verbes irréguliers (aller, faire, savoir, vouloir, devoir, avoir).",
  numRows: 12,
  numCols: 13,
  puzzleData: [
    { id: 1, word: "VAIS", r: 0, c: 7, dir: "across", clue: "je — aller" },
    { id: 2, word: "FAISONS", r: 2, c: 4, dir: "across", clue: "nous — faire" },
    { id: 3, word: "SAVEZ", r: 4, c: 8, dir: "across", clue: "vous — savoir" },
    { id: 4, word: "FONT", r: 6, c: 2, dir: "across", clue: "ils — faire" },
    { id: 5, word: "DOIS", r: 8, c: 0, dir: "across", clue: "je — devoir" },
    { id: 6, word: "DEVONS", r: 10, c: 1, dir: "across", clue: "nous — devoir" },
    { id: 7, word: "AVONS", r: 0, c: 8, dir: "down", clue: "nous — avoir" },
    { id: 8, word: "SAVENT", r: 1, c: 5, dir: "down", clue: "ils — savoir" },
    { id: 9, word: "VEUX", r: 4, c: 10, dir: "down", clue: "je — vouloir" },
    { id: 10, word: "FAITES", r: 6, c: 2, dir: "down", clue: "vous — faire" },
    { id: 11, word: "VONT", r: 8, c: 5, dir: "down", clue: "ils — aller" }
  ]
};

const IRR_PUZZLE_2 = {
  title: "Mots Croisés : Les verbes « Botte »",
  description: "Conjuguez Venir, Tenir, Prendre, Acheter, Appeler, Payer.",
  numRows: 15,
  numCols: 13,
  puzzleData: [
    { id: 1, word: "PAIENT", r: 1, c: 3, dir: "across", clue: "ils — payer" },
    { id: 2, word: "PRENEZ", r: 4, c: 6, dir: "across", clue: "vous — prendre" },
    { id: 3, word: "TIENNENT", r: 7, c: 0, dir: "across", clue: "ils — tenir" },
    { id: 4, word: "ACHÈTES", r: 10, c: 0, dir: "across", clue: "tu — acheter" },
    { id: 5, word: "TIENT", r: 13, c: 1, dir: "across", clue: "il — tenir" },
    { id: 6, word: "VIENNENT", r: 0, c: 0, dir: "down", clue: "ils — venir" },
    { id: 7, word: "ACHÈTENT", r: 1, c: 4, dir: "down", clue: "ils — acheter" },
    { id: 8, word: "APPELONS", r: 1, c: 10, dir: "down", clue: "nous — appeler" },
    { id: 9, word: "PRENONS", r: 4, c: 6, dir: "down", clue: "nous — prendre" },
    { id: 10, word: "ACHÈTE", r: 9, c: 1, dir: "down", clue: "je — acheter" }
  ]
};

const IRR_PUZZLE_3 = {
  title: "Mots Croisés : Autres Irréguliers",
  description: "Conjuguez boire, mettre, envoyer, partir, croire, sortir, écrire, dormir.",
  numRows: 13,
  numCols: 14,
  puzzleData: [
    { id: 1, word: "MET", r: 2, c: 8, dir: "across", clue: "il — mettre" },
    { id: 2, word: "ENVOYONS", r: 5, c: 6, dir: "across", clue: "nous — envoyer" },
    { id: 3, word: "BOIVENT", r: 7, c: 0, dir: "across", clue: "ils — boire" },
    { id: 4, word: "PARTONS", r: 9, c: 6, dir: "across", clue: "nous — partir" },
    { id: 5, word: "BOIS", r: 11, c: 6, dir: "across", clue: "tu — boire" },
    { id: 6, word: "CROIENT", r: 1, c: 6, dir: "down", clue: "ils — croire" },
    { id: 7, word: "METTONS", r: 1, c: 9, dir: "down", clue: "nous — mettre" },
    { id: 8, word: "SORTEZ", r: 3, c: 4, dir: "down", clue: "vous — sortir" },
    { id: 9, word: "ÉCRIVENT", r: 4, c: 2, dir: "down", clue: "ils — écrire" },
    { id: 10, word: "DORMENT", r: 4, c: 11, dir: "down", clue: "ils — dormir" },
    { id: 11, word: "BUVONS", r: 0, c: 13, dir: "down", clue: "nous — boire" },
    { id: 12, word: "CROIS", r: 8, c: 8, dir: "down", clue: "je — croire" }
  ]
};

export default function AtelierSectionUnit1() {
  const [activeTab, setActiveTab] = useState('tribune');
  const [activeCrossword, setActiveCrossword] = useState(null);
  const [activeArcadeGame, setActiveArcadeGame] = useState(null);

  const TABS = [
    {
      id: 'tribune',
      title: "Tribune & Enquête (UDL)",
      subtitle: "Atelier d'écriture guidée avec Boîte à Outils 3 Niveaux",
      icon: "📰",
      color: "#06b6d4",
      badgeBg: "rgba(6, 182, 212, 0.18)"
    },
    {
      id: 'trous',
      title: "Journalisme & Verbes",
      subtitle: "5 Activités de Conjugaison & Rédaction Journalistique",
      icon: "✍️",
      color: "#0284c7",
      badgeBg: "rgba(2, 132, 199, 0.15)"
    },
    {
      id: 'ecriture',
      title: "Production Libre",
      subtitle: "Atelier de rédaction guidée sur la presse et la déontologie",
      icon: "📝",
      color: "#0891b2",
      badgeBg: "rgba(8, 145, 178, 0.15)"
    },
    {
      id: 'mots_croises',
      title: "Mots Croisés",
      subtitle: "7 grilles interactives au présent (-ER, -IR, -RE, Irréguliers)",
      icon: "🧩",
      color: "#d97706",
      badgeBg: "rgba(217, 119, 6, 0.15)"
    },
    {
      id: 'jeux',
      title: "Salle d'Arcade & Quêtes",
      subtitle: "Escape Game, Francotopia RPG, Défi Chrono, Scoop Race...",
      icon: "🎮",
      color: "#7c3aed",
      badgeBg: "rgba(124, 58, 237, 0.15)"
    }
  ];

  // Render active crossword
  if (activeCrossword) {
    let puzzleProps = ER_PUZZLE;
    if (activeCrossword === 'ir') puzzleProps = IR_PUZZLE;
    if (activeCrossword === 're') puzzleProps = RE_PUZZLE;
    if (activeCrossword === 'aux') puzzleProps = AUX_PUZZLE;
    if (activeCrossword === 'irr1') puzzleProps = IRR_PUZZLE_1;
    if (activeCrossword === 'irr2') puzzleProps = IRR_PUZZLE_2;
    if (activeCrossword === 'irr3') puzzleProps = IRR_PUZZLE_3;

    return (
      <div className="atelier-crossword-wrapper animate-fade-in">
        <Crossword {...puzzleProps} onBack={() => setActiveCrossword(null)} />
      </div>
    );
  }

  // Render active arcade game
  if (activeArcadeGame === 'escape') {
    return (
      <div className="animate-fade-in">
        <button 
          className="back-btn mb-4" 
          onClick={() => setActiveArcadeGame(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ArrowLeft size={16} /> Retour à la Salle d'Arcade
        </button>
        <EscapeGame unitId="1" />
      </div>
    );
  }
  if (activeArcadeGame === 'fishtopia') {
    return <Fishtopia onBack={() => setActiveArcadeGame(null)} />;
  }
  if (activeArcadeGame === 'editor') {
    return <EditorChallenge unitId="1" onBack={() => setActiveArcadeGame(null)} />;
  }
  if (activeArcadeGame === 'ladder') {
    return <JournalistLadder unitId="1" onBack={() => setActiveArcadeGame(null)} />;
  }
  if (activeArcadeGame === 'race') {
    return <ScoopRace unitId="1" onBack={() => setActiveArcadeGame(null)} />;
  }

  return (
    <div className="atelier-container fade-in">
      {/* Tab Selector Bar */}
      <div className="atelier-nav-bar">
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

      {/* Active Tab Panel */}
      <div className="atelier-subpanel-card animate-fade-in">
        {/* Tab 1: Tribune & Enquête Journalistique (Tier 1 UDL) */}
        {activeTab === 'tribune' && (
          <div className="tribune-panel">
            <TribuneJournalistique />
          </div>
        )}

        {/* Tab 2: Journalisme & Textes à Trous */}
        {activeTab === 'trous' && (
          <div className="trous-panel">
            <Unit1VerbFillInTheBlank />
          </div>
        )}

        {/* Tab 3: Production Écrite */}
        {activeTab === 'ecriture' && (
          <div className="ecriture-panel">
            <WritingPrompt unitId="1" />
          </div>
        )}

        {/* Tab 3: Mots Croisés (7 Grilles) */}
        {activeTab === 'mots_croises' && (
          <div className="crosswords-panel">
            <div className="crosswords-panel-header">
              <h4>7 Grilles de Mots Croisés : Le Présent de l'Indicatif</h4>
              <p>Choisissez une grille pour pratiquer les terminaisons régulières, les verbes en -oir et les irréguliers fondamentaux.</p>
            </div>

            <div className="game-cards-container">
              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('er')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#38bdf8' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Mots Croisés : Verbes en -ER</h4>
                <p style={{ opacity: 0.85 }}>Remplissez la grille en conjuguant 10 verbes courants en -ER du 1er groupe !</p>
                <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Jouer (Grille -ER)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('ir')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#f59e0b' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Mots Croisés : Verbes en -IR</h4>
                <p style={{ opacity: 0.85 }}>Testez vos connaissances des verbes réguliers du 2ème groupe (-IR) !</p>
                <button className="play-btn" style={{ background: '#f59e0b', color: '#0f172a' }}>Jouer (Grille -IR)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('re')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#10b981' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Mots Croisés : Verbes en -RE</h4>
                <p style={{ opacity: 0.85 }}>Conjuguez les verbes du 3ème groupe en -RE comme attendre ou vendre !</p>
                <button className="play-btn" style={{ background: '#10b981', color: '#ffffff' }}>Jouer (Grille -RE)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('aux')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#f43f5e' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Mots Croisés : Être & Avoir</h4>
                <p style={{ opacity: 0.85 }}>Révisez les deux auxiliaires fondamentaux de la langue française !</p>
                <button className="play-btn" style={{ background: '#f43f5e', color: '#ffffff' }}>Jouer (Grille Auxiliaires)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('irr1')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#fbbf24' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Grille 1 : Super Irréguliers & -OIR</h4>
                <p style={{ opacity: 0.85 }}>Conjuguez Être, Avoir, Aller, Faire, Pouvoir, Vouloir, Devoir, Savoir.</p>
                <button className="play-btn" style={{ background: '#fbbf24', color: '#0f172a' }}>Jouer (Grille 1)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('irr2')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#38bdf8' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Grille 2 : Verbes « Botte »</h4>
                <p style={{ opacity: 0.85 }}>Conjuguez Venir, Tenir, Prendre, Acheter, Préférer, Appeler, Payer.</p>
                <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Jouer (Grille 2)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveCrossword('irr3')} style={{ cursor: 'pointer' }}>
                <Grid3X3 className="game-icon" style={{ color: '#a855f7' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Grille 3 : Autres Irréguliers</h4>
                <p style={{ opacity: 0.85 }}>Conjuguez Mettre, Dire, Lire, Écrire, Boire, Croire, Sortir, Partir, Dormir.</p>
                <button className="play-btn" style={{ background: '#a855f7', color: '#ffffff' }}>Jouer (Grille 3)</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Salle d'Arcade & Quêtes */}
        {activeTab === 'jeux' && (
          <div className="arcade-panel">
            <div className="arcade-panel-header">
              <h4>Salle d'Arcade : La Rédaction Journalistique</h4>
              <p>Relevez des défis immersifs, résolvez des énigmes et courez contre la montre pour sauver le scoop !</p>
            </div>

            <div className="game-cards-container">
              {/* Escape Game 1 */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('escape')}
                style={{ cursor: 'pointer' }}
              >
                <Gamepad2 className="game-icon" style={{ color: '#0ea5e9' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>🔐 Escape Game : La Rédaction</h4>
                <p style={{ opacity: 0.85 }}>
                  Testez vos connaissances en liberté de la presse et résolvez des énigmes pour sauver le scoop !
                </p>
                <button className="play-btn" style={{ background: 'rgba(14, 165, 233, 0.25)', color: '#38bdf8' }}>
                  Jouer à l'Escape Game
                </button>
              </div>

              {/* Francotopia RPG */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('fishtopia')} 
                style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(59, 130, 246, 0.25))' }}
              >
                <Gamepad2 className="game-icon" style={{ color: '#4ade80' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>🐟 Francotopia (Jeu RPG)</h4>
                <p style={{ opacity: 0.85 }}>
                  Baladez-vous dans le village francophone, incarnez un personnage, répondez aux quiz et pêchez !
                </p>
                <button className="play-btn" style={{ background: '#10b981', color: 'white' }}>
                  Lancer Francotopia
                </button>
              </div>

              {/* Editor Challenge */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('editor')}
                style={{ cursor: 'pointer' }}
              >
                <Clock className="game-icon" style={{ color: '#ef4444' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Le Défi du Rédacteur en Chef</h4>
                <p style={{ opacity: 0.85 }}>
                  Un jeu de vitesse ! Trouvez le bon mot avant que le temps ne s'écoule.
                </p>
                <button className="play-btn" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#f87171' }}>
                  Jouer (Chrono)
                </button>
              </div>

              {/* Journalist Ladder */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('ladder')}
                style={{ cursor: 'pointer' }}
              >
                <TrendingUp className="game-icon" style={{ color: '#10b981' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>L'Échelle du Journaliste</h4>
                <p style={{ opacity: 0.85 }}>
                  Devenez Rédacteur en Chef en répondant à des questions de plus en plus difficiles.
                </p>
                <button className="play-btn" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
                  Jouer (Progression)
                </button>
              </div>

              {/* Scoop Race */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('race')}
                style={{ cursor: 'pointer' }}
              >
                <Flag className="game-icon" style={{ color: '#3b82f6' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>La Course au Scoop</h4>
                <p style={{ opacity: 0.85 }}>
                  Battez le journal rival pour être le premier à publier le scoop !
                </p>
                <button className="play-btn" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa' }}>
                  Jouer (Course)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
