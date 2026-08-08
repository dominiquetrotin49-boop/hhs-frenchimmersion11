import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Languages, PenTool, Gamepad2 } from 'lucide-react';
import EscapeGame from '../components/EscapeGame';
import Unit2EscapeGame from '../components/Unit2EscapeGame';
import Unit3EscapeGame from '../components/Unit3EscapeGame';
import Unit4RoleplayGame from '../components/games/Unit4RoleplayGame';
import PracticeMenu from '../components/games/PracticeMenu';
import Fishtopia from '../components/games/Fishtopia';
import DontLookDown from '../components/games/DontLookDown';
import VocabFillInTheBlank from '../components/VocabFillInTheBlank';
import GrammarSection from '../components/GrammarSection';
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
  const [activeTab, setActiveTab] = useState('grammar');
  const [selectedGame1, setSelectedGame1] = useState(null); // 'escape' or 'fishtopia'
  const [selectedGame2, setSelectedGame2] = useState(null); // 'escape' or 'dld'

  const isFilm = unitId?.startsWith('film');
  
  // Get specific unit titles
  let specificTitle = '';
  if (unitId === '1') specificTitle = ' - Liberté de la presse';
  else if (unitId === '2') specificTitle = ' - L\'éducation';
  else if (unitId === '3') specificTitle = ' - La technologie';
  else if (unitId === '4') specificTitle = ' - Les arts et la culture';
  else if (unitId === '5') specificTitle = ' - Les droits des femmes';
  else if (unitId === '6') specificTitle = ' - Halte aux inégalités';
  const unitTitle = isFilm ? `Mini-unité Film ${unitId.replace('film', '')}` : `Unité ${unitId}${specificTitle}`;

  const leaUnit1Script = "Salut tout le monde ! Bienvenue dans l'Unité 1 consacrée à la liberté de la presse et au monde des médias ! Dans cette unité, tu vas te glisser dans la peau d'un vrai journaliste. Tu vas apprendre le vocabulaire des médias, réviser la conjugaison des verbes au présent, et découvrir comment exprimer ton opinion avec conviction. N'oublie pas de tester nos jeux interactifs comme le Scoop Race et la Rédaction en Action ! Alors, prêt à décrocher ton premier scoop ? Choisis une section ci-dessous pour démarrer !";
  const hugoUnit2Script = "Salut ! Bienvenue dans l'Unité 2 ! Cette fois, on s'attaque à un grand sujet : l'éducation et la vie scolaire. Dans ce module, on va explorer des différents systèmes éducatifs, mais surtout bétonner la grammaire avec les 25 verbes irréguliers indispensables au présent. Tu vas en avoir besoin pour briller dans les activités d'écriture ! Pense aussi à essayer l'Escape Game de l'Unité 2 pour tester tes réflexes. Allez, bon courage et lance-toi vite dans les leçons !";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header glass-panel">
        {/* LEFT COLUMN: Title Top-Left, Tabs Bottom-Left */}
        <div className="unit-header-left">
          <div className="unit-title-group">
            <p className="unit-subtitle">Module de cours</p>
            <h2 className="unit-title text-gradient">{unitTitle}</h2>
          </div>
          
          <div className="tabs-container">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
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
        </div>
      </header>

      <div className="dashboard-content">
        {['1', '2', '3', '4'].includes(unitId) ? (
          <>
            {activeTab === 'grammar' && (
              <div className="section-content animate-in">
                <GrammarSection unitId={unitId} />
              </div>
            )}
            
            {activeTab === 'vocabulary' && (
              <div className="section-content animate-in">
                <VocabFillInTheBlank unitId={unitId} />
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="section-content animate-in">
                <PracticeMenu unitId={unitId} />
              </div>
            )}

            {activeTab === 'game' && (
              <div className="section-content animate-in">
                {unitId === '4' ? <Unit4RoleplayGame /> :
                 unitId === '3' ? <Unit3EscapeGame /> : 
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
