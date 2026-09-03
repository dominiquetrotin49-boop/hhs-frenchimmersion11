import DetecteurDeFailles from "../components/games/DetecteurDeFailles";
import CourseContreLaMontre from "../components/games/CourseContreLaMontre";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Languages, PenTool, Gamepad2, Layers } from "lucide-react";
import EscapeGame from "../components/EscapeGame";
import Unit2EscapeGame from "../components/Unit2EscapeGame";
import Unit3EscapeGame from "../components/Unit3EscapeGame";
import ArtDetectiveGame from "../components/games/ArtDetectiveGame";
import FilmDirectorGame from "../components/games/FilmDirectorGame";
import ArtAuctionGame from "../components/games/ArtAuctionGame";
import PracticeMenu from "../components/games/PracticeMenu";
import Fishtopia from "../components/games/Fishtopia";
import DontLookDown from "../components/games/DontLookDown";
import VocabFillInTheBlank from "../components/VocabFillInTheBlank";
import GrammarSection from "../components/GrammarSection";
import VocabHangman from "../components/games/VocabHangman";
import RepriseGrammar from "../components/RepriseGrammar";
import UnitAvatarSpeaker from "../components/UnitAvatarSpeaker";
import "./UnitDashboard.css";

const TABS = [
  { id: "grammar", label: "Grammaire", icon: BookOpen },
  { id: "vocabulary", label: "Vocabulaire", icon: Languages },
  { id: "practice", label: "Pratique", icon: PenTool },
  { id: "game", label: "Jeux", icon: Gamepad2 },
];

export default function UnitDashboard() {
  const { unitId } = useParams();
  const allowedUnits = ["reprise", "1"];
  const isVercel = (typeof process !== "undefined" && process.env && process.env.VERCEL_URL) || window.location.hostname.includes("vercel");
  if (isVercel && !allowedUnits.includes(unitId)) {
    return (
      <div className="dashboard-container">
        <div className="section-content animate-in empty-state glass-panel" style={{ textAlign: "center", padding: "3rem 2rem", marginTop: "2rem" }}>
          <h3>Nous n'y sommes pas encore.</h3>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState("grammar");
  const [selectedGame1, setSelectedGame1] = useState(null);
  const [selectedGame2, setSelectedGame2] = useState(null);
  const [selectedGame4, setSelectedGame4] = useState(null);
  const [selectedRepriseGame, setSelectedRepriseGame] = useState(null);

  useEffect(() => {
    setActiveTab("grammar");
    setSelectedGame1(null);
    setSelectedGame2(null);
    setSelectedGame4(null);
    setSelectedRepriseGame(null);
  }, [unitId]);

  const isReprise = unitId === "reprise";
  const unitTitle = isReprise ? "Unité : Reprise" : `Unité ${unitId}`;
  const unitSubtitle = isReprise 
    ? "Révision globale de la syntaxe et des structures fondamentales" 
    : "Explorez les leçons et pratiquez vos compétences";

  const hugoUnit4Script = "Bienvenue dans l'Unité 4 ! Aujourd'hui, nous plongeons au cœur de l'art et du cinéma.";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header novel-header">
        <div className="header-text">
          <h2 className="title-novel">{unitTitle}</h2>
          <p className="subtitle-novel">{unitSubtitle}</p>
        </div>
        <div className="header-avatar-zone">
          {unitId === "4" && (
            <UnitAvatarSpeaker 
              avatar="hugo" 
              audioSrc="/audio/unit4_intro_hugo.mp3" 
              name="Hugo" 
              speechFallbackText={hugoUnit4Script}
            />
          )}
        </div>
      </header>

      {/* Tabs Header */}
      <div className="tabs-container novel-tabs-bar">
        {TABS.map((tab) => {
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
        {["1", "2", "3", "4", "reprise"].includes(unitId) ? (
          <>
            {/* GRAMMAR TAB */}
            {activeTab === "grammar" && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === "reprise" ? (
                  <RepriseGrammar />
                ) : (
                  <GrammarSection unitId={unitId} />
                )}
              </div>
            )}

            {/* VOCABULARY TAB */}
            {activeTab === "vocabulary" && (
              <div className="section-content animate-in novel-frame-container">
                <VocabHangman unitId={unitId} />
                <div style={{ marginTop: "2rem" }}>
                  <VocabFillInTheBlank unitId={unitId} />
                </div>
              </div>
            )}

            {/* PRACTICE TAB */}
            {activeTab === "practice" && (
              <div className="section-content animate-in novel-frame-container">
                <PracticeMenu unitId={unitId} />
              </div>
            )}

            {/* GAMES TAB */}
            {activeTab === "game" && (
              <div className="section-content animate-in novel-frame-container">
                {unitId === "reprise" ? (
                  selectedRepriseGame === "detecteur-failles" ? (
                    <div>
                      <DetecteurDeFailles onBack={() => setSelectedRepriseGame(null)} />
                    </div>
                  ) : selectedRepriseGame === "chrono" ? (
                    <div>
                      <CourseContreLaMontre onBack={() => setSelectedRepriseGame(null)} />
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                      <div className="game-cards-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                        
                        {/* Game 1: Le Détecteur de Failles */}
                        <div 
                          className="game-card glass-panel" 
                          onClick={() => setSelectedRepriseGame("detecteur-failles")} 
                          style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", borderRadius: "1rem" }}
                        >
                          <div>
                            <Gamepad2 className="game-icon" style={{ color: "#6366f1", marginBottom: "1rem" }} size={48} />
                            <h4 style={{ fontWeight: "bold", fontSize: "1.15rem", marginBottom: "0.5rem" }}>🔍 LE DÉTECTEUR DE FAILLES</h4>
                            <h5 style={{ color: "#818cf8", margin: "0.2rem 0 0.75rem", fontWeight: "600" }}>Révisez la Syntaxe & la Négation</h5>
                            <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>Examinez les dossiers d'enquête, débusquez les erreurs d'inversion, de traits d'union et la règle du « de » !</p>
                          </div>
                          <button className="play-btn mt-4" style={{ background: "#6366f1", color: "white", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                            Jouer
                          </button>
                        </div>

                        {/* Game 2: Course contre la Montre */}
                        <div 
                          className="game-card glass-panel" 
                          onClick={() => setSelectedRepriseGame("chrono")}
                          style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", borderRadius: "1rem" }}
                        >
                          <div>
                            <Gamepad2 className="game-icon" style={{ color: "#e76f51", marginBottom: "1rem" }} size={48} />
                            <h4 style={{ fontWeight: "bold", fontSize: "1.15rem", marginBottom: "0.5rem" }}>⚡ LA COURSE CONTRE LA MONTRE</h4>
                            <h5 style={{ color: "#f4a261", margin: "0.2rem 0 0.75rem", fontWeight: "600" }}>Défi Chrono (20s)</h5>
                            <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>Transformez les phrases au chronomètre et développez des automatismes rapides en syntaxe.</p>
                          </div>
                          <button className="play-btn mt-4" style={{ background: "#e76f51", color: "white", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                            Lancer le Défi
                          </button>
                        </div>

                      </div>
                    </div>
                  )
                ) : unitId === "4" ? (
                  selectedGame4 === "detective" ? (
                    <ArtDetectiveGame onBack={() => setSelectedGame4(null)} />
                  ) : selectedGame4 === "director" ? (
                    <FilmDirectorGame onBack={() => setSelectedGame4(null)} />
                  ) : selectedGame4 === "auction" ? (
                    <ArtAuctionGame onBack={() => setSelectedGame4(null)} />
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu Interactif !</h3>
                      <div className="game-cards-container">
                        <div className="game-card glass-panel" onClick={() => setSelectedGame4("detective")}>
                          <Gamepad2 className="game-icon" style={{ color: "#60a5fa" }} size={48} />
                          <h4>🕵️‍♂️ Le Détective d'Art (Vol au Louvre)</h4>
                          <p>Parcourez Paris, Montréal, Dakar et Bruxelles pour résoudre le mystère et retrouver le chef-d'œuvre !</p>
                          <button className="play-btn" style={{ background: "#3b82f6", color: "white" }}>Mener l'Enquête</button>
                        </div>

                        <div className="game-card glass-panel" onClick={() => setSelectedGame4("director")}>
                          <Gamepad2 className="game-icon" style={{ color: "#c084fc" }} size={48} />
                          <h4>🎬 Festival de Cannes : Réalisateur</h4>
                          <p>Réalisez votre film, choisissez le cadrage, la bande originale et remportez la Palme d'Or !</p>
                          <button className="play-btn" style={{ background: "#8b5cf6", color: "white" }}>Tourner le Film</button>
                        </div>

                        <div className="game-card glass-panel" onClick={() => setSelectedGame4("auction")}>
                          <Gamepad2 className="game-icon" style={{ color: "#10b981" }} size={48} />
                          <h4>🏛️ L'Enchère des Arts & Galerie Virtuelle</h4>
                          <p>Achetez des œuvres d'art lors d'enchères linguistiques et organisez votre propre vernissage !</p>
                          <button className="play-btn" style={{ background: "#10b981", color: "white" }}>Accéder aux Enchères</button>
                        </div>
                      </div>
                    </div>
                  )
                ) : unitId === "3" ? (
                  <Unit3EscapeGame />
                ) : unitId === "2" ? (
                  selectedGame2 === "escape" ? (
                    <div>
                      <button className="back-btn mb-4" onClick={() => setSelectedGame2(null)}>← Retour aux jeux</button>
                      <Unit2EscapeGame />
                    </div>
                  ) : selectedGame2 === "dld" ? (
                    <DontLookDown onBack={() => setSelectedGame2(null)} />
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                      <div className="game-cards-container">
                        <div className="game-card glass-panel" onClick={() => setSelectedGame2("escape")}>
                          <Gamepad2 className="game-icon text-accent" size={48} />
                          <h4>Escape Game</h4>
                          <p>Testez vos connaissances en résolvant des énigmes !</p>
                          <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
                        </div>
                        
                        <div className="game-card glass-panel" onClick={() => setSelectedGame2("dld")} style={{background: "linear-gradient(to top, #38bdf8, #bae6fd)"}}>
                          <Gamepad2 className="game-icon text-white" size={48} />
                          <h4 className="text-white">Ne Regarde Pas En Bas !</h4>
                          <p className="text-white opacity-90">Grimpez tout en haut de la ville, mais ne tombez pas !</p>
                          <button className="play-btn" style={{background: "white", color: "#1e293b"}}>Lancer le Jeu</button>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  selectedGame1 === "escape" ? (
                    <div>
                      <button className="back-btn mb-4" onClick={() => setSelectedGame1(null)}>← Retour aux jeux</button>
                      <EscapeGame unitId={unitId} />
                    </div>
                  ) : selectedGame1 === "fishtopia" ? (
                    <Fishtopia onBack={() => setSelectedGame1(null)} />
                  ) : (
                    <div>
                      <h3 className="mb-4 text-center">Choisissez votre Jeu !</h3>
                      <div className="game-cards-container">
                        <div className="game-card glass-panel" onClick={() => setSelectedGame1("escape")}>
                          <Gamepad2 className="game-icon text-accent" size={48} />
                          <h4>Escape Game</h4>
                          <p>Testez vos connaissances en résolvant des énigmes !</p>
                          <button className="play-btn btn-accent">Jouer à l'Escape Game</button>
                        </div>
                        
                        <div className="game-card glass-panel" onClick={() => setSelectedGame1("fishtopia")} style={{background: "linear-gradient(135deg, #4ade80, #3b82f6)"}}>
                          <Gamepad2 className="game-icon text-white" size={48} />
                          <h4 className="text-white">Francotopia (Jeu RPG)</h4>
                          <p className="text-white opacity-90">Baladez-vous, incarnez un hamster, gagnez des appâts et pêchez !</p>
                          <button className="play-btn" style={{background: "white", color: "#1e293b"}}>Lancer Francotopia</button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <div className="section-content animate-in empty-state glass-panel" style={{textAlign: "center", padding: "4rem 2rem", marginTop: "2rem"}}>
            <BookOpen size={48} style={{margin: "0 auto", opacity: 0.5, marginBottom: "1rem"}} />
            <h3 style={{fontSize: "1.5rem", marginBottom: "1rem"}}>Module en cours de développement</h3>
            <p style={{opacity: 0.8}}>Le contenu pour {unitTitle} sera bientôt disponible. Merci de votre patience !</p>
          </div>
        )}
      </div>
    </div>
  );
}
