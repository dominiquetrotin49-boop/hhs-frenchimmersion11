import React, { useState } from 'react';
import { Grid3X3, PenTool, Edit3, Repeat, MoveHorizontal, Gamepad2, BookOpen, Shield, HelpCircle, FileText } from 'lucide-react';
import Crossword from './Crossword';
import PronounReplacement from './PronounReplacement';
import PronounOrder from './PronounOrder';
import PronounFill from './PronounFill';
import GrammarFill from './GrammarFill';
import { IMPARFAIT_FILL_DATA, PC_FILL_DATA, MIXED_FILL_DATA } from '../../data/unit4GrammarGames';
import ColdCaseDossier from './ColdCaseDossier';
import WritingPrompt from './WritingPrompt';
import ReprisePractice from './ReprisePractice';
import QuestionsPractice from './QuestionsPractice';
import VocabFillInTheBlank from '../VocabFillInTheBlank';
import Unit1VerbFillInTheBlank from './Unit1VerbFillInTheBlank';
import Unit1NewsroomFillInTheBlank from './Unit1NewsroomFillInTheBlank';
import './Games.css';

const ER_PUZZLE = {
  title: "Mots Croisés: Verbes en -ER",
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
  title: "Mots Croisés: Verbes en -IR",
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
  title: "Mots Croisés: Verbes en -RE",
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
  title: "Mots Croisés: Être & Avoir",
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
  title: "Mots Croisés: Super Irréguliers & -OIR",
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
  title: "Mots Croisés: Les verbes 'Botte'",
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
  title: "Mots Croisés: Autres Irréguliers",
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

const UNIT_4_PUZZLE = {
  title: "Mots Croisés: Les Arts & la Culture",
  description: "Remplissez la grille avec le vocabulaire et les notions culturelles de l'Unité 4.",
  numRows: 10,
  numCols: 10,
  puzzleData: [
    { id: 1, word: "EXPOSITION", r: 0, c: 4, dir: "down", clue: "Présentation publique d'œuvres d'art" },
    { id: 2, word: "CINEMA", r: 0, c: 1, dir: "across", clue: "Le 7e art" },
    { id: 3, word: "PRIX", r: 2, c: 4, dir: "across", clue: "Récompense attribuée lors d'un festival" },
    { id: 4, word: "SLAM", r: 4, c: 4, dir: "across", clue: "Poésie orale déclamée en rythme" },
    { id: 5, word: "THEATRE", r: 6, c: 0, dir: "across", clue: "Art de la représentation scénique" },
    { id: 6, word: "NUANCE", r: 9, c: 4, dir: "across", clue: "Subtilité de sens ou de couleur" },
    { id: 7, word: "SCENARIO", r: 1, c: 8, dir: "down", clue: "Texte écrit décrivant les scènes d'un film" }
  ]
};

export default function PracticeMenu({ unitId }) {
  const [activeGame, setActiveGame] = useState(null);
  const defaultCategory = (unitId === '1' || unitId === '4') ? 'crosswords' : (unitId === '2') ? 'grammar' : 'trous';
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Active Game Views
  if (activeGame === 'questions-practice') return (
    <div>
      <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux exercices</button>
      <QuestionsPractice />
    </div>
  );
  if (activeGame === 'coldcase-present') return <ColdCaseDossier tense="present" onBack={() => setActiveGame(null)} />;
  if (activeGame === 'coldcase-past') return <ColdCaseDossier tense="past" onBack={() => setActiveGame(null)} />;
  if (activeGame === 'coldcase-negation') return <ColdCaseDossier tense="negation" onBack={() => setActiveGame(null)} />;

  if (activeGame === 'crossword-er') return <Crossword {...ER_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-ir') return <Crossword {...IR_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-re') return <Crossword {...RE_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-aux') return <Crossword {...AUX_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-irr1') return <Crossword {...IRR_PUZZLE_1} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-irr2') return <Crossword {...IRR_PUZZLE_2} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-irr3') return <Crossword {...IRR_PUZZLE_3} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-u4') return <Crossword {...UNIT_4_PUZZLE} onBack={() => setActiveGame(null)} />;

  if (activeGame === 'pronoun-replace') return <PronounReplacement onBack={() => setActiveGame(null)} />;
  if (activeGame === 'pronoun-order') return <PronounOrder onBack={() => setActiveGame(null)} />;
  if (activeGame === 'pronoun-fill') return <PronounFill onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-imparfait') return <GrammarFill data={IMPARFAIT_FILL_DATA} title="L'Imparfait" description="Complétez avec le verbe conjugué à l'imparfait." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-pc') return <GrammarFill data={PC_FILL_DATA} title="Le Passé Composé" description="Choisissez le bon auxiliaire et participe passé." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-mixed') return <GrammarFill data={MIXED_FILL_DATA} title="Imparfait vs Passé Composé" description="Choisissez le temps approprié pour chaque situation." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'reprise-practice') return <ReprisePractice onBack={() => setActiveGame(null)} />;

  // REPRISE MINI-UNIT VIEW
  if (unitId === 'reprise') {
    return (
      <div className="practice-menu">
        <div className="mb-4">
          <h3 className="section-title">Entraînement & Exercices de Rentrée</h3>
          <p style={{ opacity: 0.85 }}>
            Renforcez vos bases de syntaxe, d'interrogation et de négation avec des ateliers ciblés.
          </p>
        </div>

        <div className="game-cards-container">
          {/* Card 1: Questions & Négations Practice */}
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('questions-practice')}>
            <FileText className="game-icon" style={{ color: '#38bdf8' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Questions & Négations (5 Activités)</h4>
            <p style={{ opacity: 0.85 }}>
              Pratiquez « Est-ce que », l'inversion formelle, les mots interrogatifs, la production de dialogue et la double négation.
            </p>
            <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Ouvrir les 5 Activités</button>
          </div>

          {/* Card 2: Cold Case Présent */}
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-present')}>
            <Shield className="game-icon" style={{ color: '#60a5fa' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Dossier d'Interrogatoire : Présent</h4>
            <p style={{ opacity: 0.85 }}>
              Déterminez la culpabilité des suspects en plaçant les doubles pronoms corrects au présent.
            </p>
            <button className="play-btn" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa' }}>Lancer l'Interrogatoire</button>
          </div>

          {/* Card 3: Cold Case Passé */}
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-past')}>
            <Shield className="game-icon" style={{ color: '#fbbf24' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Dossier d'Interrogatoire : Passé Composé</h4>
            <p style={{ opacity: 0.85 }}>
              Déterminez la culpabilité en plaçant les pronoms et l'accord du participe passé.
            </p>
            <button className="play-btn" style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24' }}>Lancer l'Interrogatoire</button>
          </div>

          {/* Card 4: Cold Case Négation */}
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-negation')}>
            <Shield className="game-icon" style={{ color: '#a78bfa' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Dossier d'Interrogatoire : La Négation</h4>
            <p style={{ opacity: 0.85 }}>
              Pratiquez la négation complexe (ne... jamais, rien, personne, plus, aucun, pas de).
            </p>
            <button className="play-btn" style={{ background: 'rgba(167, 139, 250, 0.25)', color: '#a78bfa' }}>Lancer l'Interrogatoire</button>
          </div>
        </div>
      </div>
    );
  }

  // UNITS 1 TO 4 VIEW
  return (
    <div className="practice-menu">
      <div className="flex-between mb-4" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title">Entraînement & Exercices</h3>
          <p style={{ opacity: 0.85, margin: 0 }}>Choisissez votre modalité de travail pour consolider vos acquis.</p>
        </div>

        <div className="tabs-container novel-style" style={{ alignSelf: 'auto' }}>
          {(unitId === '1' || unitId === '4') && (
            <button
              className={`tab-btn ${activeCategory === 'crosswords' ? 'active' : ''} novel-style`}
              onClick={() => setActiveCategory('crosswords')}
            >
              <Grid3X3 size={16} />
              <span>Mots Croisés</span>
            </button>
          )}

          {unitId === '2' && (
            <button
              className={`tab-btn ${activeCategory === 'grammar' ? 'active' : ''} novel-style`}
              onClick={() => setActiveCategory('grammar')}
            >
              <Repeat size={16} />
              <span>Exercices & Pronoms</span>
            </button>
          )}

          <button
            className={`tab-btn ${activeCategory === 'trous' ? 'active' : ''} novel-style`}
            onClick={() => setActiveCategory('trous')}
          >
            <Edit3 size={16} />
            <span>Texte à Trous</span>
          </button>

          <button
            className={`tab-btn ${activeCategory === 'ecriture' ? 'active' : ''} novel-style`}
            onClick={() => setActiveCategory('ecriture')}
          >
            <PenTool size={16} />
            <span>Production Écrite</span>
          </button>
        </div>
      </div>

      {/* Crosswords Category (Unit 1 & Unit 4) */}
      {activeCategory === 'crosswords' && unitId === '1' && (
        <div>
          <h4 className="mb-4 text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            7 Grilles de Mots Croisés : Le Présent de l'Indicatif
          </h4>
          <div className="game-cards-container">
            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-er')}>
              <Grid3X3 className="game-icon" style={{ color: '#38bdf8' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Mots Croisés: Verbes en -ER</h4>
              <p style={{ opacity: 0.85 }}>Remplissez la grille en conjuguant 10 verbes courants en -ER !</p>
              <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Jouer (Grille -ER)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-ir')}>
              <Grid3X3 className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Mots Croisés: Verbes en -IR</h4>
              <p style={{ opacity: 0.85 }}>Testez vos connaissances des verbes réguliers du 2ème groupe (-IR) !</p>
              <button className="play-btn btn-accent">Jouer (Grille -IR)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-re')}>
              <Grid3X3 className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Mots Croisés: Verbes en -RE</h4>
              <p style={{ opacity: 0.85 }}>Conjuguez les verbes du 3ème groupe en -RE comme attendre ou vendre !</p>
              <button className="play-btn btn-success">Jouer (Grille -RE)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-aux')}>
              <Grid3X3 className="game-icon text-danger" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Mots Croisés: Être & Avoir</h4>
              <p style={{ opacity: 0.85 }}>Révisez les deux auxiliaires fondamentaux de la langue française !</p>
              <button className="play-btn btn-danger">Jouer (Grille Auxiliaires)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-irr1')}>
              <Grid3X3 className="game-icon" style={{ color: '#fbbf24' }} size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Grille 1: Super Irréguliers & -OIR</h4>
              <p style={{ opacity: 0.85 }}>Conjuguez Être, Avoir, Aller, Faire, Pouvoir, Vouloir, Devoir, Savoir.</p>
              <button className="play-btn" style={{ background: '#fbbf24', color: '#0f172a' }}>Jouer (Grille 1)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-irr2')}>
              <Grid3X3 className="game-icon text-accent" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Grille 2: Verbes "Botte"</h4>
              <p style={{ opacity: 0.85 }}>Conjuguez Venir, Tenir, Prendre, Acheter, Préférer, Appeler, Payer.</p>
              <button className="play-btn btn-accent">Jouer (Grille 2)</button>
            </div>

            <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-irr3')}>
              <Grid3X3 className="game-icon text-success" size={48} />
              <h4 style={{ fontWeight: 'bold' }}>Grille 3: Autres Irréguliers</h4>
              <p style={{ opacity: 0.85 }}>Conjuguez Mettre, Dire, Lire, Écrire, Boire, Croire, Sortir, Partir, Dormir.</p>
              <button className="play-btn btn-success">Jouer (Grille 3)</button>
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'crosswords' && unitId === '4' && (
        <div className="game-cards-container">
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('crossword-u4')}>
            <Grid3X3 className="game-icon text-success" size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Mots Croisés: Les Arts & la Culture</h4>
            <p style={{ opacity: 0.85 }}>Complétez la grille avec le vocabulaire et les notions culturelles de l'Unité 4 !</p>
            <button className="play-btn btn-success">Jouer (Mots Croisés)</button>
          </div>
        </div>
      )}

      {/* Unit 2 Grammar & Pronouns Drills */}
      {activeCategory === 'grammar' && unitId === '2' && (
        <div className="game-cards-container">
          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('pronoun-replace')}>
            <Repeat className="game-icon" style={{ color: '#38bdf8' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 1: Remplacement (QCM)</h4>
            <p style={{ opacity: 0.85 }}>Choisissez le bon pronom objet pour remplacer le nom lié à l'éducation.</p>
            <button className="play-btn" style={{ background: '#38bdf8', color: '#0f172a' }}>Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('pronoun-order')}>
            <MoveHorizontal className="game-icon text-accent" size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 2: L'Ordre des Doubles Pronoms</h4>
            <p style={{ opacity: 0.85 }}>Remettez les mots de la phrase dans le bon ordre (ex: Je le lui donne).</p>
            <button className="play-btn btn-accent">Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('pronoun-fill')}>
            <Edit3 className="game-icon text-success" size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 3: Texte à Trous (Pronoms)</h4>
            <p style={{ opacity: 0.85 }}>Lisez le dialogue et complétez les blancs avec le bon pronom objet court.</p>
            <button className="play-btn btn-success">Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('grammar-fill-imparfait')}>
            <Edit3 className="game-icon text-success" size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 4: L'Imparfait</h4>
            <p style={{ opacity: 0.85 }}>Pratiquez les terminaisons et les irréguliers (être/avoir) à l'imparfait.</p>
            <button className="play-btn btn-success">Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('grammar-fill-pc')}>
            <Edit3 className="game-icon text-accent" size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 5: Le Passé Composé</h4>
            <p style={{ opacity: 0.85 }}>Pratiquez le choix de l'auxiliaire (Avoir/Être) et l'accord du participe.</p>
            <button className="play-btn btn-accent">Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('grammar-fill-mixed')}>
            <Gamepad2 className="game-icon" style={{ color: '#8b5cf6' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Jeu 6: Imparfait vs Passé Composé</h4>
            <p style={{ opacity: 0.85 }}>Entraînez-vous à combiner le décor (imparfait) et l'action soudaine (PC).</p>
            <button className="play-btn" style={{ background: '#8b5cf6', color: 'white' }}>Jouer</button>
          </div>

          <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('reprise-practice')}>
            <BookOpen className="game-icon" style={{ color: '#38bdf8' }} size={48} />
            <h4 style={{ fontWeight: 'bold' }}>Exercices de Révision</h4>
            <p style={{ opacity: 0.85 }}>Pratiquez les pronoms et la conjugaison de révision avant de commencer.</p>
            <button className="play-btn" style={{ background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8' }}>S'entraîner</button>
          </div>
        </div>
      )}

      {/* Texte à Trous Category */}
      {activeCategory === 'trous' && (
        <div className="animate-in">
          {String(unitId) === '1' ? (
            <Unit1VerbFillInTheBlank />
          ) : (
            <VocabFillInTheBlank unitId={unitId} />
          )}
        </div>
      )}

      {/* Writing Prompt Category */}
      {activeCategory === 'ecriture' && (
        <div className="animate-in">
          <WritingPrompt unitId={unitId} />
        </div>
      )}
    </div>
  );
}
