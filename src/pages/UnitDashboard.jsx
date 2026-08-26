import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Languages, PenTool, Gamepad2, Layers } from 'lucide-react';
import EscapeGame from '../components/EscapeGame';
import Unit2EscapeGame from '../components/Unit2EscapeGame';
import Unit3EscapeGame from '../components/Unit3EscapeGame';
import ArtDetectiveGame from '../components/games/ArtDetectiveGame';
import FilmDirectorGame from '../components/games/FilmDirectorGame';
import ArtAuctionGame from '../components/games/ArtAuctionGame';
import PracticeMenu from '../components/games/PracticeMenu';
import Fishtopia from '../components/games/Fishtopia';
import DontLookDown from '../components/games/DontLookDown';
import Amnesique from '../components/games/Amnesique';
import VocabFillInTheBlank from '../components/VocabFillInTheBlank';
import GrammarSection from '../components/GrammarSection';
import VocabHangman from '../components/games/VocabHangman';
import RepriseGrammar from '../components/RepriseGrammar';
import UnitAvatarSpeaker from '../components/UnitAvatarSpeaker';
import './UnitDashboard.css';

const TABS = [
  { id: 'grammar', label: 'Grammaire', icon: BookOpen },
  { id: 'vocabulary', label: 'Vocabulaire', icon: Languages },
  { id: 'practice', label: 'Pratique', icon: PenTool },
  { id: 'game', label: 'Jeux', icon: Gamepad2 },
];

export default function UnitDashboard() {
  const { unitId } = useParams();
  // Block access on Vercel for units other than Reprise and Chapter 1
  const allowedUnits = ['reprise', '1', '2'];
  const isVercel = (typeof process !== 'undefined' && process.env && process.env.VERCEL_URL) || window.location.hostname.includes('vercel');
  if (isVercel && !allowedUnits.includes(unitId)) {
    return (
      <div className="dashboard-container">
        <div className="section-content animate-in empty-state glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', marginTop: '2rem' }}>
          <h3>Nous n'y sommes pas encore.</h3>
        </div>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState(unitId === 'reprise' ? 'game' : 'grammar');
  const [selectedGame1, setSelectedGame1] = useState(null); // 'escape' or 'fishtopia'
  const [selectedGame2, setSelectedGame2] = useState(null); // 'escape' or 'dld'
  const [selectedGame4, setSelectedGame4] = useState(null); // 'detective', 'director', 'auction'
  const [selectedRepriseGame, setSelectedRepriseGame] = useState(null);

  useEffect(() => {
    setActiveTab(unitId === 'reprise' ? 'game' : 'grammar');
    setSelectedRepriseGame(null);
  }, [unitId]);

  const isFilm = unitId?.startsWith('film');
  const isReprise = unitId === 'reprise';
  
  // Get specific unit titles
  let specificTitle = '';
  if (unitId === '1') specificTitle = ' - Liberté de la presse';
  else if (unitId === '2') specificTitle = ' - L\'éducation';
  else if (unitId === '3') specificTitle = ' - La technologie';
  else if (unitId === '4') specificTitle = ' - Les arts et la culture';
  else if (unitId === '5') specificTitle = ' - Les droits des femmes';
  else if (unitId === '6') specificTitle = ' - Halte aux inégalités';
  
  const unitTitle = isFilm 
    ? `Mini-unité Film ${unitId.replace('film', '')}` 
    : isReprise 
      ? 'Reprise' 
      : `Unité ${unitId}${specificTitle}`;

  const leaUnit1Script = "Salut tout le monde ! Bienvenue dans l'Unité 1 consacrée à la liberté de la presse et au monde des médias ! Dans cette unité, tu vas te glisser dans la peau d'un vrai journaliste. Tu vas apprendre le vocabulaire des médias, réviser la conjugaison des verbes au présent, et découvrir comment exprimer ton opinion avec conviction. N'oublie pas de tester nos jeux interactifs comme le Scoop Race et la Rédaction en Action ! Alors, prêt à décrocher ton premier scoop ? Choisis une section ci-dessous pour démarrer !";
  const hugoUnit2Script = "Salut ! Bienvenue dans l'Unité 2 ! Cette fois, on s'attaque à un grand sujet : l'éducation et la vie scolaire. Dans ce module, on va explorer des différents systèmes éducatifs, mais surtout bétonner la grammaire avec les 25 verbes irréguliers indispensables au présent. Tu vas en avoir besoin pour briller dans les activités d'écriture ! Pense aussi à essayer l'Escape Game de l'Unité 2 pour tester tes réflexes. Allez, bon courage et lance-toi vite dans les leçons !";

  const hugoUnit4Script = "Salut ! Bienvenue dans l'Unité 4 ! Dans ce module, on part à la découverte des arts, du cinéma, de la musique et du patrimoine culturel francophone. Côté grammaire, on va maîtriser les temps du passé en opposant le passé composé et l'imparfait, indispensable pour raconter des histoires et décrire des souvenirs. N'hésite pas à essayer nos jeux interactifs et les défis d'écriture pour tester tes connaissances. Allez, bon travail et explore vite les leçons !";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header glass-panel">
        {/* LEFT COLUMN: Title Top-Left, Tabs Bottom-Left */}
        <div className="unit-header-left">
          <div className="unit-title-group">
            <p className="unit-subtitle">Module de cours</p>
            <h2 className="unit-title text-gradient">{unitTitle}</h2>
          </div>
          
          <div className="tabs-container novel-style">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''} novel-style`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Avatar Card locked to TOP RIGHT corner */}
        <div className="unit-header-right">
          {unitId === '1' && (
            <UnitAvatarSpeaker 
              avatar="lea" 
              audioSrc="/audio/unit1_intro_lea.mp3" 
              name="Léa" 
              speechFallbackText={leaUnit1Script}
            />
          )}

          {unitId === '2' && (
            <UnitAvatarSpeaker 
              avatar="hugo" 
              audioSrc="/audio/unit2_intro_hugo.mp3" 
              name="Hugo" 
              speechFallbackText={hugoUnit2Script}
            />
          )}

          {unitId === '3' && (
            <UnitAvatarSpeaker 
              avatar="duo" 
              audioSrc="/audio/unit3_intro_duo.mp3" 
              name="Léa & Hugo" 
            />
          )}

          {unitId === '4' && (
            <UnitAvatarSpeaker 
              avatar="hugo" 
              audioSrc="/audio/unit4_intro_hugo.mp3" 
              name="Hugo" 
              speechFallbackText={hugoUnit4Script}
            />
          )}
        </div>
      </header>

      <div className="dashboard-content">
        {['1', '2', '3', '4', 'reprise'].includes(unitId) ? (
          <>
            {activeTab === 'grammar' && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === 'reprise' ? (
                  <RepriseGrammar />
                ) : (
                  <GrammarSection unitId={unitId} />
                )}
              </div>
            )}
            
            {activeTab === 'vocabulary' && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === 'reprise' ? (
                  <VocabHangman />
                ) : (
                  <VocabFillInTheBlank unitId={unitId} />
                )}
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="section-content animate-in novel-frame-container">
                <PracticeMenu unitId={unitId} />
              </div>
            )}

            {activeTab === 'game' && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === 'reprise' ? (
                  selectedRepriseGame === 'amnesique' ? (
                    <div>
                      <button className="back-btn mb-4" onClick={() => setSelectedRepriseGame(null)}>← Retour aux jeux</button>
                      <Amnesique />
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                      <div className="game-cards-container">
                        <div className="game-card glass-panel" onClick={() => setSelectedRepriseGame('amnesique')} style={{ cursor: 'pointer' }}>
                          <Gamepad2 className="game-icon" style={{ color: '#3b82f6' }} size={48} />
                          <h4>🕵️ JEU DE REVISION — L'AMNÉSIQUE EN LIGNE</h4>
                          <h5 style={{ color: '#60a5fa', margin: '0.2rem 0', fontWeight: 'semibold' }}>Aidez le voyageur !</h5>
                          <p style={{ opacity: 0.9 }}>Posez-lui des questions pour l'aider à retrouver son objet et son souvenir perdus.</p>
                          <button className="play-btn" style={{ background: '#3b82f6', color: 'white' }}>Jouer</button>
                        </div>
                      </div>
                    </div>
                  )
                ) : unitId === '4' ? (
                  selectedGame4 === 'detective' ? (
                    <ArtDetectiveGame onBack={() => setSelectedGame4(null)} />
                  ) : selectedGame4 === 'director' ? (
                    <FilmDirectorGame onBack={() => setSelectedGame4(null)} />
                  ) : selectedGame4 === 'auction' ? (
                    <ArtAuctionGame onBack={() => setSelectedGame4(null)} />
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu Interactif !</h3>
                      <div className="game-cards-container">
                        <div className="game-card glass-panel" onClick={() => setSelectedGame4('detective')}>
                          <Gamepad2 className="game-icon" style={{ color: '#60a5fa' }} size={48} />
                          <h4>🕵️‍♂️ Le Détective d'Art (Vol au Louvre)</h4>
                          <p>Parcourez Paris, Montréal, Dakar et Bruxelles pour résoudre le mystère et retrouver le chef-d'œuvre !</p>
                          <button className="play-btn" style={{ background: '#3b82f6', color: 'white' }}>Mener l'Enquête</button>
                        </div>

                        <div className="game-card glass-panel" onClick={() => setSelectedGame4('director')}>
                          <Gamepad2 className="game-icon" style={{ color: '#c084fc' }} size={48} />
                          <h4>🎬 Festival de Cannes : Réalisateur</h4>
                          <p>Réalisez votre film, choisissez le cadrage, la bande originale et remportez la Palme d'Or !</p>
                          <button className="play-btn" style={{ background: '#8b5cf6', color: 'white' }}>Tourner le Film</button>
                        </div>

                        <div className="game-card glass-panel" onClick={() => setSelectedGame4('auction')}>
                          <Gamepad2 className="game-icon" style={{ color: '#10b981' }} size={48} />
                          <h4>🏛️ L'Enchère des Arts & Galerie Virtuelle</h4>
                          <p>Achetez des œuvres d'art lors d'enchères linguistiques et organisez votre propre vernissage !</p>
                          <button className="play-btn" style={{ background: '#10b981', color: 'white' }}>Accéder aux Enchères</button>
                        </div>
                      </div>
                    </div>
                  )
                ) : unitId === '3' ? <Unit3EscapeGame /> : 
                 unitId === '2' ? (
                    selectedGame2 === 'escape' ? (
                      <div>
                        <button className="back-btn mb-4" onClick={() => setSelectedGame2(null)}>← Retour aux jeux</button>
                        <Unit2EscapeGame />
                      </div>
                    ) :
                    selectedGame2 === 'dld' ? <DontLookDown onBack={() => setSelectedGame2(null)} /> :
                    (
                      <div>
                        <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                        <div className="game-cards-container">
                          <div className="game-card glass-panel" onClick={() => setSelectedGame2('escape')}>
                            <Gamepad2 className="game-icon text-accent" size={48} />
                            <h4>Escape Game</h4>
                            <p>Testez vos connaissances en résolvant des énigmes !</p>
                            <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
                          </div>
                          
                          <div className="game-card glass-panel" onClick={() => setSelectedGame2('dld')} style={{background: 'linear-gradient(to top, #38bdf8, #bae6fd)'}}>
                            <Gamepad2 className="game-icon text-white" size={48} />
                            <h4 className="text-white">Ne Regarde Pas En Bas !</h4>
                            <p className="text-white opacity-90">Grimpez tout en haut de la ville, mais ne tombez pas !</p>
                            <button className="play-btn" style={{background: 'white', color: '#1e293b'}}>Lancer le Jeu</button>
                          </div>
                        </div>
                      </div>
                    )
                 ) : 
                 (
                    selectedGame1 === 'escape' ? (
                      <div>
                        <button className="back-btn mb-4" onClick={() => setSelectedGame1(null)}>← Retour aux jeux</button>
                        <EscapeGame unitId={unitId} />
                      </div>
                    ) :
                    selectedGame1 === 'fishtopia' ? <Fishtopia onBack={() => setSelectedGame1(null)} /> :
                    (
                      <div>
                        <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                        <div className="game-cards-container">
                          <div className="game-card glass-panel" onClick={() => setSelectedGame1('escape')}>
                            <Gamepad2 className="game-icon text-accent" size={48} />
                            <h4>Escape Game</h4>
                            <p>Testez vos connaissances en résolvant des énigmes !</p>
                            <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
                          </div>
                          
                          <div className="game-card glass-panel" onClick={() => setSelectedGame1('fishtopia')} style={{background: 'linear-gradient(135deg, #4ade80, #3b82f6)'}}>
                            <Gamepad2 className="game-icon text-white" size={48} />
                            <h4 className="text-white">Francotopia (Jeu RPG)</h4>
                            <p className="text-white opacity-90">Baladez-vous, incarnez un hamster, gagnez des appâts et pêchez !</p>
                            <button className="play-btn" style={{background: 'white', color: '#1e293b'}}>Lancer Francotopia</button>
                          </div>
                        </div>
                      </div>
                    )
                 )}
              </div>
            )}
          </>
        ) : (
          <div className="section-content animate-in empty-state glass-panel" style={{textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem'}}>
            <BookOpen size={48} style={{margin: '0 auto', opacity: 0.5, marginBottom: '1rem'}} />
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Module en cours de développement</h3>
            <p style={{opacity: 0.8}}>Le contenu pour {unitTitle} sera bientôt disponible. Merci de votre patience !</p>
          </div>
        )}
      </div>
    </div>
  );
}
