import React, { useState } from 'react';
import { Gamepad2, Clock, TrendingUp, Flag, Shield, Trophy, Sparkles } from 'lucide-react';
import DetecteurDeFailles from './games/DetecteurDeFailles';
import CourseContreLaMontre from './games/CourseContreLaMontre';
import EscapeGame from './EscapeGame';
import Fishtopia from './games/Fishtopia';
import Unit2EscapeGame from './Unit2EscapeGame';
import DontLookDown from './games/DontLookDown';
import DonjonDuPasse from './games/DonjonDuPasse';
import Unit3EscapeGame from './Unit3EscapeGame';
import ArtDetectiveGame from './games/ArtDetectiveGame';
import FilmDirectorGame from './games/FilmDirectorGame';
import ArtAuctionGame from './games/ArtAuctionGame';
import Unit4RoleplayGame from './games/Unit4RoleplayGame';
import EditorChallenge from './games/EditorChallenge';
import JournalistLadder from './games/JournalistLadder';
import ScoopRace from './games/ScoopRace';
import './games/Games.css';

export default function GamesSection({ unitId }) {
  const [activeGame, setActiveGame] = useState(null);

  const getTitles = () => {
    switch (unitId) {
      case '2':
        return {
          editor: "Le Défi du Professeur",
          editorDesc: "Trouve le bon mot avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Chrono)",
          ladder: "L'Ascension Universitaire",
          ladderDesc: "Deviens un excellent professeur en répondant à des questions de plus en plus difficiles.",
          ladderBtn: "Jouer (Progression)",
          race: "Le Marathon des Examens",
          raceDesc: "Bats ton rival pour être le premier à réussir les examens !",
          raceBtn: "Jouer (Course)",
        };
      case '3':
        return {
          editor: "Le Défi du Hacker",
          editorDesc: "Trouve le bon mot de passe avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Chrono)",
          ladder: "L'Échelle du Développeur",
          ladderDesc: "Deviens un expert en tech en répondant à des questions complexes.",
          ladderBtn: "Jouer (Progression)",
          race: "La Course à l'Innovation",
          raceDesc: "Bats l'entreprise rivale pour être le premier à publier ta technologie !",
          raceBtn: "Jouer (Course)",
        };
      case '4':
        return {
          editor: "Le Défi des Mots d'Art",
          editorDesc: "Trouvez le bon mot du vocabulaire artistique avant la fin du temps !",
          editorBtn: "Jouer (Chrono)",
          ladder: "Le Parcours Culturel",
          ladderDesc: "Devenez un expert en cinéma, musique et architecture en répondant aux questions !",
          ladderBtn: "Jouer (Progression)",
          race: "La Course du Festival de Cannes",
          raceDesc: "Gagnez la course au cinéma en répondant correctement à toutes les questions !",
          raceBtn: "Jouer (Course)",
        };
      default: // Unit 1
        return {
          editor: "Le Défi du Rédacteur en Chef",
          editorDesc: "Un jeu de vitesse ! Trouve le bon mot avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Chrono)",
          ladder: "L'Échelle du Journaliste",
          ladderDesc: "Deviens Rédacteur en Chef en répondant à des questions de plus en plus difficiles.",
          ladderBtn: "Jouer (Progression)",
          race: "La Course au Scoop",
          raceDesc: "Bats le journal rival pour être le premier à publier le scoop !",
          raceBtn: "Jouer (Course)",
        };
    }
  };

  const titles = getTitles();

  // Active game renders
  if (activeGame === 'detecteur-failles') return <DetecteurDeFailles onBack={() => setActiveGame(null)} />;
  if (activeGame === 'chrono') return <CourseContreLaMontre onBack={() => setActiveGame(null)} />;
  
  if (activeGame === 'escape-1') {
    return (
      <div>
        <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux jeux</button>
        <EscapeGame unitId="1" />
      </div>
    );
  }
  if (activeGame === 'fishtopia') return <Fishtopia onBack={() => setActiveGame(null)} />;
  
  if (activeGame === 'escape-2') {
    return (
      <div>
        <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux jeux</button>
        <Unit2EscapeGame />
      </div>
    );
  }
  if (activeGame === 'dld') return <DontLookDown onBack={() => setActiveGame(null)} />;
  if (activeGame === 'donjon-passe') return <DonjonDuPasse onBack={() => setActiveGame(null)} />;

  if (activeGame === 'escape-3') {
    return (
      <div>
        <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux jeux</button>
        <Unit3EscapeGame />
      </div>
    );
  }

  if (activeGame === 'detective') return <ArtDetectiveGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'director') return <FilmDirectorGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'auction') return <ArtAuctionGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'roleplay') return <Unit4RoleplayGame onBack={() => setActiveGame(null)} />;

  if (activeGame === 'editor') return <EditorChallenge unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'ladder') return <JournalistLadder unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'race') return <ScoopRace unitId={unitId} onBack={() => setActiveGame(null)} />;

  // Main game menu per unit
  return (
    <div className="games-section">
      <div className="mb-4">
        <h3 className="section-title">Jeux & Défis Interactifs</h3>
        <p style={{ opacity: 0.85 }}>
          Testez vos réflexes, résolvez des énigmes et relevez des défis immersifs.
        </p>
      </div>

      <div className="game-cards-container">
        {unitId === 'reprise' ? (
          <>
            {/* Game 1: Le Détecteur de Failles */}
            <div 
              className="game-card glass-panel animate-in" 
              onClick={() => setActiveGame('detecteur-failles')}
            >
              <Shield className="game-icon" style={{ color: '#6366f1' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🔍 LE DÉTECTEUR DE FAILLES</h4>
              <p style={{ opacity: 0.85 }}>
                Examinez les dossiers d'enquête, débusquez les erreurs d'inversion, de traits d'union et la règle du « de » !
              </p>
              <button className="play-btn" style={{ background: '#6366f1' }}>
                Jouer
              </button>
            </div>

            {/* Game 2: Course contre la Montre */}
            <div 
              className="game-card glass-panel animate-in" 
              onClick={() => setActiveGame('chrono')}
            >
              <Clock className="game-icon" style={{ color: '#e76f51' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>⚡ LA COURSE CONTRE LA MONTRE</h4>
              <p style={{ opacity: 0.85 }}>
                Transformez les phrases au chronomètre (20s) et développez des automatismes rapides en syntaxe.
              </p>
              <button className="play-btn" style={{ background: '#e76f51' }}>
                Lancer le Défi Chrono
              </button>
            </div>
          </>
        ) : unitId === '1' ? (
          <>
            {/* Escape Game 1 */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('escape-1')}>
              <Gamepad2 className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🔐 Escape Game : La Rédaction</h4>
              <p style={{ opacity: 0.85 }}>
                Testez vos connaissances en liberté de la presse et résolvez des énigmes pour sauver le scoop !
              </p>
              <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
            </div>

            {/* Francotopia */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('fishtopia')} style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(59, 130, 246, 0.25))' }}>
              <Gamepad2 className="game-icon" style={{ color: '#4ade80' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🐟 Francotopia (Jeu RPG)</h4>
              <p style={{ opacity: 0.85 }}>
                Baladez-vous dans le village francophone, incarnez un personnage, répondez aux quiz et pêchez !
              </p>
              <button className="play-btn" style={{ background: '#10b981', color: 'white' }}>Lancer Francotopia</button>
            </div>

            {/* Editor Challenge */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('editor')}>
              <Clock className="game-icon text-danger" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.editor}</h4>
              <p style={{ opacity: 0.85 }}>{titles.editorDesc}</p>
              <button className="play-btn btn-danger">{titles.editorBtn}</button>
            </div>

            {/* Journalist Ladder */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('ladder')}>
              <TrendingUp className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.ladder}</h4>
              <p style={{ opacity: 0.85 }}>{titles.ladderDesc}</p>
              <button className="play-btn btn-success">{titles.ladderBtn}</button>
            </div>

            {/* Scoop Race */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('race')}>
              <Flag className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.race}</h4>
              <p style={{ opacity: 0.85 }}>{titles.raceDesc}</p>
              <button className="play-btn btn-accent">{titles.raceBtn}</button>
            </div>
          </>
        ) : unitId === '2' ? (
          <>
            {/* Escape Game 2 */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('escape-2')}>
              <Gamepad2 className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🔐 Escape Game : Université</h4>
              <p style={{ opacity: 0.85 }}>
                Dénouez les mystères du campus universitaire en résolvant des énigmes linguistiques !
              </p>
              <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
            </div>

            {/* Don't Look Down */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('dld')} style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(186, 230, 253, 0.25))' }}>
              <Trophy className="game-icon" style={{ color: '#38bdf8' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Ne Regarde Pas En Bas !</h4>
              <p style={{ opacity: 0.85 }}>
                Grimpez tout en haut de la tour en répondant sans faute aux questions de grammaire !
              </p>
              <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Lancer l'Escalade</button>
            </div>

            {/* Le Donjon du Passé */}
            <div
              className="game-card glass-panel animate-in"
              onClick={() => setActiveGame('donjon-passe')}
              style={{ background: 'linear-gradient(135deg, rgba(91,20,160,0.25), rgba(40,5,80,0.4))' }}
            >
              <Sparkles className="game-icon" style={{ color: '#c084fc' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🏰 Le Donjon du Passé</h4>
              <p style={{ opacity: 0.85 }}>
                Brisez les sorts en maîtrisant le passé composé, l'imparfait et les pronoms objets dans ce donjon 3D !
              </p>
              <button className="play-btn" style={{ background: 'linear-gradient(135deg,#7b2ff7,#4f0e9c)', color: 'white' }}>
                Entrer dans le Donjon
              </button>
            </div>

            {/* Editor Challenge */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('editor')}>
              <Clock className="game-icon text-danger" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.editor}</h4>
              <p style={{ opacity: 0.85 }}>{titles.editorDesc}</p>
              <button className="play-btn btn-danger">{titles.editorBtn}</button>
            </div>

            {/* Journalist Ladder */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('ladder')}>
              <TrendingUp className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.ladder}</h4>
              <p style={{ opacity: 0.85 }}>{titles.ladderDesc}</p>
              <button className="play-btn btn-success">{titles.ladderBtn}</button>
            </div>

            {/* Scoop Race */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('race')}>
              <Flag className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.race}</h4>
              <p style={{ opacity: 0.85 }}>{titles.raceDesc}</p>
              <button className="play-btn btn-accent">{titles.raceBtn}</button>
            </div>
          </>
        ) : unitId === '3' ? (
          <>
            {/* Escape Game 3 */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('escape-3')}>
              <Gamepad2 className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🔐 Escape Game : Cyber-Attaque</h4>
              <p style={{ opacity: 0.85 }}>
                Neutralisez le malware et protégez les données du réseau grâce à vos connaissances !
              </p>
              <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
            </div>

            {/* Editor Challenge */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('editor')}>
              <Clock className="game-icon text-danger" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.editor}</h4>
              <p style={{ opacity: 0.85 }}>{titles.editorDesc}</p>
              <button className="play-btn btn-danger">{titles.editorBtn}</button>
            </div>

            {/* Journalist Ladder */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('ladder')}>
              <TrendingUp className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.ladder}</h4>
              <p style={{ opacity: 0.85 }}>{titles.ladderDesc}</p>
              <button className="play-btn btn-success">{titles.ladderBtn}</button>
            </div>

            {/* Scoop Race */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('race')}>
              <Flag className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.race}</h4>
              <p style={{ opacity: 0.85 }}>{titles.raceDesc}</p>
              <button className="play-btn btn-accent">{titles.raceBtn}</button>
            </div>
          </>
        ) : (
          /* Unit 4 */
          <>
            {/* Detective */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('detective')}>
              <Gamepad2 className="game-icon" style={{ color: '#60a5fa' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🕵️‍♂️ Le Détective d'Art (Vol au Louvre)</h4>
              <p style={{ opacity: 0.85 }}>
                Parcourez Paris, Montréal, Dakar et Bruxelles pour résoudre le mystère et retrouver le chef-d'œuvre !
              </p>
              <button className="play-btn" style={{ background: '#3b82f6', color: 'white' }}>Mener l'Enquête</button>
            </div>

            {/* Film Director */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('director')}>
              <Gamepad2 className="game-icon" style={{ color: '#c084fc' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🎬 Festival de Cannes : Réalisateur</h4>
              <p style={{ opacity: 0.85 }}>
                Réalisez votre film, choisissez le cadrage, la bande originale et remportez la Palme d'Or !
              </p>
              <button className="play-btn" style={{ background: '#8b5cf6', color: 'white' }}>Tourner le Film</button>
            </div>

            {/* Art Auction */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('auction')}>
              <Gamepad2 className="game-icon" style={{ color: '#10b981' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🏛️ L'Enchère des Arts & Galerie</h4>
              <p style={{ opacity: 0.85 }}>
                Achetez des œuvres d'art lors d'enchères linguistiques et organisez votre propre vernissage !
              </p>
              <button className="play-btn" style={{ background: '#10b981', color: 'white' }}>Accéder aux Enchères</button>
            </div>

            {/* Unit 4 Roleplay */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('roleplay')}>
              <Sparkles className="game-icon" style={{ color: '#f59e0b' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>🎭 Jeu de Rôle : Débats Culturels</h4>
              <p style={{ opacity: 0.85 }}>
                Incarnez juré, réalisateur, conservateur ou mécène dans 4 scénarios de commissions culturelles minutées !
              </p>
              <button className="play-btn" style={{ background: '#f59e0b', color: 'white' }}>Lancer la Commission</button>
            </div>

            {/* Editor Challenge */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('editor')}>
              <Clock className="game-icon text-danger" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.editor}</h4>
              <p style={{ opacity: 0.85 }}>{titles.editorDesc}</p>
              <button className="play-btn btn-danger">{titles.editorBtn}</button>
            </div>

            {/* Journalist Ladder */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('ladder')}>
              <TrendingUp className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.ladder}</h4>
              <p style={{ opacity: 0.85 }}>{titles.ladderDesc}</p>
              <button className="play-btn btn-success">{titles.ladderBtn}</button>
            </div>

            {/* Scoop Race */}
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('race')}>
              <Flag className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>{titles.race}</h4>
              <p style={{ opacity: 0.85 }}>{titles.raceDesc}</p>
              <button className="play-btn btn-accent">{titles.raceBtn}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
