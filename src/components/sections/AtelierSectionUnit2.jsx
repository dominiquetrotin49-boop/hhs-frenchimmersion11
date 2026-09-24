import React, { useState } from 'react';
import { 
  ArrowLeft,
  Repeat,
  MoveHorizontal,
  Edit3,
  Gamepad2,
  BookOpen,
  Sparkles,
  Trophy,
  Clock,
  TrendingUp,
  Flag,
  PenTool,
  GraduationCap
} from 'lucide-react';
import TribuneAcademique from '../games/TribuneAcademique';
import PronounReplacement from '../games/PronounReplacement';
import PronounOrder from '../games/PronounOrder';
import PronounFill from '../games/PronounFill';
import GrammarFill from '../games/GrammarFill';
import { IMPARFAIT_FILL_DATA, PC_FILL_DATA, MIXED_FILL_DATA } from '../../data/unit4GrammarGames';
import ReprisePractice from '../games/ReprisePractice';
import VocabFillInTheBlank from '../VocabFillInTheBlank';
import WritingPrompt from '../games/WritingPrompt';
import Unit2EscapeGame from '../Unit2EscapeGame';
import DonjonDuPasse from '../games/DonjonDuPasse';
import DontLookDown from '../games/DontLookDown';
import EditorChallenge from '../games/EditorChallenge';
import JournalistLadder from '../games/JournalistLadder';
import ScoopRace from '../games/ScoopRace';
import './AtelierSectionUnit1.css';
import '../games/Games.css';

export default function AtelierSectionUnit2() {
  const [activeTab, setActiveTab] = useState('tribune');
  const [activeDrillGame, setActiveDrillGame] = useState(null);
  const [activeArcadeGame, setActiveArcadeGame] = useState(null);

  const TABS = [
    {
      id: 'tribune',
      title: "Tribune Académique",
      subtitle: "Atelier d'écriture guidée avec Boîte à Outils 3 Niveaux",
      icon: "🎓",
      color: "#06b6d4",
      badgeBg: "rgba(6, 182, 212, 0.18)"
    },
    {
      id: 'drills',
      title: "Pronoms & Temps du Passé",
      subtitle: "7 Jeux d'Entraînement : COD/COI, Doubles Pronoms, Imparfait & PC",
      icon: "🎯",
      color: "#0284c7",
      badgeBg: "rgba(2, 132, 199, 0.15)"
    },
    {
      id: 'trous',
      title: "Textes à Trous & Vocabulaire",
      subtitle: "Pratiquez le lexique de l'éducation en contexte",
      icon: "✍️",
      color: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)"
    },
    {
      id: 'ecriture',
      title: "Production Libre",
      subtitle: "Atelier de rédaction guidée avec analyse et rétroaction",
      icon: "📝",
      color: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.15)"
    },
    {
      id: 'jeux',
      title: "Salle d'Arcade & Quêtes",
      subtitle: "Escape Game Campus, Le Donjon du Passé, Défi Chrono...",
      icon: "🎮",
      color: "#7c3aed",
      badgeBg: "rgba(124, 58, 237, 0.15)"
    }
  ];

  // ── Render Active Drill Game ────────────────────────────────────────────────
  if (activeDrillGame) {
    return (
      <div className="animate-fade-in">
        <button 
          className="back-btn mb-4" 
          onClick={() => setActiveDrillGame(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        >
          <ArrowLeft size={16} /> Retour à l'Atelier d'Entraînement
        </button>

        {activeDrillGame === 'pronoun-replace' && (
          <PronounReplacement onBack={() => setActiveDrillGame(null)} />
        )}
        {activeDrillGame === 'pronoun-order' && (
          <PronounOrder onBack={() => setActiveDrillGame(null)} />
        )}
        {activeDrillGame === 'pronoun-fill' && (
          <PronounFill onBack={() => setActiveDrillGame(null)} />
        )}
        {activeDrillGame === 'imparfait' && (
          <GrammarFill 
            data={IMPARFAIT_FILL_DATA} 
            title="L'Imparfait" 
            description="Complétez avec le verbe conjugué à l'imparfait." 
            onBack={() => setActiveDrillGame(null)} 
          />
        )}
        {activeDrillGame === 'pc' && (
          <GrammarFill 
            data={PC_FILL_DATA} 
            title="Le Passé Composé" 
            description="Choisissez le bon auxiliaire et participe passé." 
            onBack={() => setActiveDrillGame(null)} 
          />
        )}
        {activeDrillGame === 'mixed' && (
          <GrammarFill 
            data={MIXED_FILL_DATA} 
            title="Imparfait vs Passé Composé" 
            description="Choisissez le temps approprié pour chaque situation." 
            onBack={() => setActiveDrillGame(null)} 
          />
        )}
        {activeDrillGame === 'reprise' && (
          <ReprisePractice onBack={() => setActiveDrillGame(null)} />
        )}
      </div>
    );
  }

  // ── Render Active Arcade Game ───────────────────────────────────────────────
  if (activeArcadeGame) {
    return (
      <div className="animate-fade-in">
        <button 
          className="back-btn mb-4" 
          onClick={() => setActiveArcadeGame(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        >
          <ArrowLeft size={16} /> Retour à la Salle d'Arcade
        </button>

        {activeArcadeGame === 'escape' && (
          <Unit2EscapeGame />
        )}
        {activeArcadeGame === 'donjon' && (
          <DonjonDuPasse onBack={() => setActiveArcadeGame(null)} />
        )}
        {activeArcadeGame === 'dld' && (
          <DontLookDown onBack={() => setActiveArcadeGame(null)} />
        )}
        {activeArcadeGame === 'editor' && (
          <EditorChallenge unitId="2" onBack={() => setActiveArcadeGame(null)} />
        )}
        {activeArcadeGame === 'ladder' && (
          <JournalistLadder unitId="2" onBack={() => setActiveArcadeGame(null)} />
        )}
        {activeArcadeGame === 'race' && (
          <ScoopRace unitId="2" onBack={() => setActiveArcadeGame(null)} />
        )}
      </div>
    );
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
        {/* Tab 1: Tribune Académique */}
        {activeTab === 'tribune' && (
          <div className="tribune-panel">
            <TribuneAcademique />
          </div>
        )}

        {/* Tab 2: Pronoms & Temps du Passé (Drills) */}
        {activeTab === 'drills' && (
          <div className="drills-panel">
            <div className="crosswords-panel-header">
              <h4>7 Jeux d'Entraînement : Pronoms & Temps du Passé</h4>
              <p>Choisissez un jeu pour développer des automatismes rapides avec les pronoms objets et les temps de la narration.</p>
            </div>

            <div className="game-cards-container">
              {/* Drill 1: Remplacement QCM */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('pronoun-replace')}
                style={{ cursor: 'pointer' }}
              >
                <Repeat className="game-icon" style={{ color: '#38bdf8' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 1 : Remplacement de Pronoms (QCM)</h4>
                <p style={{ opacity: 0.85 }}>Choisissez le bon pronom objet pour remplacer le nom lié à l'éducation.</p>
                <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 2: Ordre des doubles pronoms */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('pronoun-order')}
                style={{ cursor: 'pointer' }}
              >
                <MoveHorizontal className="game-icon" style={{ color: '#0284c7' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 2 : L'Ordre des Doubles Pronoms</h4>
                <p style={{ opacity: 0.85 }}>Remettez les mots de la phrase dans le bon ordre (ex: Je le lui donne).</p>
                <button className="play-btn" style={{ background: '#0284c7', color: 'white' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 3: Texte à trous pronoms */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('pronoun-fill')}
                style={{ cursor: 'pointer' }}
              >
                <Edit3 className="game-icon" style={{ color: '#10b981' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 3 : Texte à Trous (Pronoms)</h4>
                <p style={{ opacity: 0.85 }}>Lisez le dialogue et complétez les blancs avec le bon pronom objet court.</p>
                <button className="play-btn" style={{ background: '#10b981', color: 'white' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 4: L'Imparfait */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('imparfait')}
                style={{ cursor: 'pointer' }}
              >
                <Edit3 className="game-icon" style={{ color: '#f59e0b' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 4 : L'Imparfait (Décor & Habitude)</h4>
                <p style={{ opacity: 0.85 }}>Pratiquez les terminaisons et les irréguliers (être/avoir) à l'imparfait.</p>
                <button className="play-btn" style={{ background: '#f59e0b', color: '#0f172a' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 5: Le Passé Composé */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('pc')}
                style={{ cursor: 'pointer' }}
              >
                <Edit3 className="game-icon" style={{ color: '#a855f7' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 5 : Le Passé Composé</h4>
                <p style={{ opacity: 0.85 }}>Pratiquez le choix de l'auxiliaire (Avoir/Être) et l'accord du participe.</p>
                <button className="play-btn" style={{ background: '#a855f7', color: 'white' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 6: Imparfait vs Passé Composé */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('mixed')}
                style={{ cursor: 'pointer' }}
              >
                <Gamepad2 className="game-icon" style={{ color: '#ec4899' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 6 : Imparfait vs Passé Composé</h4>
                <p style={{ opacity: 0.85 }}>Entraînez-vous à combiner le décor (imparfait) et l'action soudaine (PC).</p>
                <button className="play-btn" style={{ background: '#ec4899', color: 'white' }}>
                  Jouer
                </button>
              </div>

              {/* Drill 7: Révision */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveDrillGame('reprise')}
                style={{ cursor: 'pointer' }}
              >
                <BookOpen className="game-icon" style={{ color: '#06b6d4' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>Jeu 7 : Exercices de Révision</h4>
                <p style={{ opacity: 0.85 }}>Pratiquez les pronoms et la conjugaison de révision avant de commencer.</p>
                <button className="play-btn" style={{ background: 'rgba(6, 182, 212, 0.25)', color: '#06b6d4' }}>
                  S'entraîner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vocabulaire & Textes à Trous */}
        {activeTab === 'trous' && (
          <div className="trous-panel animate-in">
            <VocabFillInTheBlank unitId="2" />
          </div>
        )}

        {/* Tab 3: Production Écrite */}
        {activeTab === 'ecriture' && (
          <div className="ecriture-panel animate-in">
            <WritingPrompt unitId="2" />
          </div>
        )}

        {/* Tab 4: Salle d'Arcade & Quêtes */}
        {activeTab === 'jeux' && (
          <div className="arcade-panel">
            <div className="arcade-panel-header">
              <h4>Salle d'Arcade : Le Campus Universitaire</h4>
              <p>Relevez des défis immersifs, résolvez des énigmes linguistiques et battez la montre !</p>
            </div>

            <div className="game-cards-container">
              {/* Escape Game 2 */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('escape')}
                style={{ cursor: 'pointer' }}
              >
                <Gamepad2 className="game-icon" style={{ color: '#0ea5e9' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>🔐 Escape Game : Université</h4>
                <p style={{ opacity: 0.85 }}>
                  Dénouez les mystères du campus universitaire en résolvant des énigmes linguistiques !
                </p>
                <button className="play-btn" style={{ background: 'rgba(14, 165, 233, 0.25)', color: '#38bdf8' }}>
                  Jouer à l'Escape Game
                </button>
              </div>

              {/* Le Donjon du Passé */}
              <div
                className="game-card glass-panel animate-in"
                onClick={() => setActiveArcadeGame('donjon')}
                style={{ 
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, rgba(91, 20, 160, 0.25), rgba(40, 5, 80, 0.4))' 
                }}
              >
                <Sparkles className="game-icon" style={{ color: '#c084fc' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>🏰 Le Donjon du Passé</h4>
                <p style={{ opacity: 0.85 }}>
                  Brisez les sorts en maîtrisant le passé composé, l'imparfait et les pronoms objets dans ce donjon mystérieux !
                </p>
                <button className="play-btn" style={{ background: 'linear-gradient(135deg, #7b2ff7, #4f0e9c)', color: 'white' }}>
                  Entrer dans le Donjon
                </button>
              </div>

              {/* Ne Regarde Pas En Bas */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('dld')} 
                style={{ 
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(186, 230, 253, 0.25))' 
                }}
              >
                <Trophy className="game-icon" style={{ color: '#38bdf8' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>🏆 Ne Regarde Pas En Bas !</h4>
                <p style={{ opacity: 0.85 }}>
                  Grimpez tout en haut de la tour en répondant sans faute aux questions de grammaire !
                </p>
                <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>
                  Lancer l'Escalade
                </button>
              </div>

              {/* Editor Challenge */}
              <div 
                className="game-card glass-panel animate-in" 
                onClick={() => setActiveArcadeGame('editor')}
                style={{ cursor: 'pointer' }}
              >
                <Clock className="game-icon" style={{ color: '#ef4444' }} size={48} />
                <h4 style={{ fontWeight: 'bold' }}>⏱️ Le Défi du Professeur</h4>
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
                <h4 style={{ fontWeight: 'bold' }}>📈 L'Ascension Universitaire</h4>
                <p style={{ opacity: 0.85 }}>
                  Deviens un excellent professeur en répondant à des questions de plus en plus difficiles.
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
                <h4 style={{ fontWeight: 'bold' }}>🏁 Le Marathon des Examens</h4>
                <p style={{ opacity: 0.85 }}>
                  Bats ton rival pour être le premier à réussir les examens !
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
