import React, { useState } from 'react';
import { Clock, TrendingUp, Flag, BookOpen } from 'lucide-react';
import EditorChallenge from './EditorChallenge';
import JournalistLadder from './JournalistLadder';
import ScoopRace from './ScoopRace';
import Crossword from './Crossword';
import WritingPractice from './WritingPractice';
import PronunciationPractice from './PronunciationPractice';
import PronounReplacement from './PronounReplacement';
import PronounOrder from './PronounOrder';
import PronounFill from './PronounFill';
import GrammarFill from './GrammarFill';
import Fishtopia from './Fishtopia';
import { Grid3X3, PenTool, Volume2, Repeat, MoveHorizontal, Edit3, Gamepad2, Shield, Layers } from 'lucide-react';
import { IMPARFAIT_FILL_DATA, PC_FILL_DATA, MIXED_FILL_DATA } from '../../data/unit4GrammarGames';
import ArtDetectiveGame from './ArtDetectiveGame';
import FilmDirectorGame from './FilmDirectorGame';
import ArtAuctionGame from './ArtAuctionGame';
import ColdCaseDossier from './ColdCaseDossier';
import WritingPrompt from './WritingPrompt';
import VocabFlashcards from '../VocabFlashcards';
import ReprisePractice from './ReprisePractice';
import QuestionsPractice from './QuestionsPractice';
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
    { id: 7, word: "ECOUTONS", r: 12, c: 5, dir: "down", clue: "Nous + Écouter" },
    { id: 8, word: "MANGES", r: 12, c: 9, dir: "down", clue: "Tu + Manger" },
    { id: 9, word: "TROUVENT", r: 14, c: 3, dir: "across", clue: "Ils + Trouver" },
    { id: 10, word: "ETUDIES", r: 16, c: 4, dir: "across", clue: "Tu + Étudier" }
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
  ]
,
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
  numRows: 11,
  numCols: 9,
  puzzleData: [
    { id: 1, word: "AVONS", r: 3, c: 4, dir: "across", clue: "nous — avoir" },
    { id: 2, word: "SOMMES", r: 5, c: 0, dir: "across", clue: "nous — être" },
    { id: 3, word: "SONT", r: 8, c: 0, dir: "across", clue: "ils — être" },
    { id: 4, word: "ES", r: 10, c: 2, dir: "across", clue: "tu — être" },
    { id: 5, word: "AS", r: 2, c: 8, dir: "down", clue: "tu — avoir" },
    { id: 6, word: "AVEZ", r: 3, c: 4, dir: "down", clue: "vous — avoir" },
    { id: 7, word: "SUIS", r: 5, c: 0, dir: "down", clue: "je — être" },
    { id: 8, word: "ÊTES", r: 7, c: 3, dir: "down", clue: "vous — être" }
  ]
};

const IRR_PUZZLE_1 = {
  title: "Mots Croisés: Super Irréguliers & -OIR",
  description: "Conjuguez Être, Avoir, Aller, Faire, Pouvoir, Vouloir, Devoir, Savoir, Voir.",
  numRows: 9,
  numCols: 15,
  puzzleData: [
    { "id": 1, "word": "PEUVENT", "r": 7, "c": 4, "dir": "across", "clue": "Ils + Pouvoir" },
    { "id": 2, "word": "SOMMES", "r": 3, "c": 5, "dir": "down", "clue": "Nous + Être" },
    { "id": 3, "word": "FAITES", "r": 3, "c": 8, "dir": "down", "clue": "Vous + Faire" },
    { "id": 4, "word": "SAVENT", "r": 2, "c": 10, "dir": "down", "clue": "Ils + Savoir" },
    { "id": 5, "word": "VOYONS", "r": 3, "c": 0, "dir": "across", "clue": "Nous + Voir" },
    { "id": 6, "word": "AVONS", "r": 3, "c": 10, "dir": "across", "clue": "Nous + Avoir" },
    { "id": 7, "word": "VAIS", "r": 0, "c": 14, "dir": "down", "clue": "Je + Aller" },
    { "id": 8, "word": "VEUT", "r": 3, "c": 0, "dir": "down", "clue": "Il + Vouloir" },
    { "id": 9, "word": "DOIS", "r": 2, "c": 3, "dir": "down", "clue": "Tu + Devoir" },
    { "id": 10, "word": "FONT", "r": 2, "c": 12, "dir": "down", "clue": "Ils + Faire" }
  ]
};

const IRR_PUZZLE_2 = {
  title: "Mots Croisés: Les verbes 'Botte'",
  description: "Conjuguez Venir, Tenir, Prendre, Acheter, Préférer, Appeler, Payer.",
  numRows: 14,
  numCols: 16,
  puzzleData: [
    { "id": 1, "word": "TIENNENT", "r": 7, "c": 4, "dir": "across", "clue": "Ils + Tenir" },
    { "id": 2, "word": "APPELONS", "r": 4, "c": 6, "dir": "down", "clue": "Nous + Appeler" },
    { "id": 3, "word": "VIENNENT", "r": 0, "c": 4, "dir": "down", "clue": "Ils + Venir" },
    { "id": 4, "word": "ACHETENT", "r": 1, "c": 8, "dir": "down", "clue": "Ils + Acheter" },
    { "id": 5, "word": "PRENONS", "r": 4, "c": 10, "dir": "down", "clue": "Nous + Prendre" },
    { "id": 6, "word": "ACHETES", "r": 11, "c": 0, "dir": "across", "clue": "Tu + Acheter" },
    { "id": 7, "word": "PREFERE", "r": 2, "c": 0, "dir": "across", "clue": "Elle + Préférer" },
    { "id": 8, "word": "PAIENT", "r": 1, "c": 7, "dir": "across", "clue": "Ils + Payer" },
    { "id": 9, "word": "PRENEZ", "r": 4, "c": 10, "dir": "across", "clue": "Vous + Prendre" },
    { "id": 10, "word": "VIENS", "r": 9, "c": 3, "dir": "down", "clue": "Je + Venir" }
  ]
};

const IRR_PUZZLE_3 = {
  title: "Mots Croisés: Autres Irréguliers",
  description: "Conjuguez Mettre, Dire, Lire, Écrire, Boire, Croire, Sortir, Partir, Dormir.",
  numRows: 12,
  numCols: 14,
  puzzleData: [
    { "id": 1, "word": "ECRIVENT", "r": 4, "c": 6, "dir": "across", "clue": "Ils + Écrire" },
    { "id": 2, "word": "CROIENT", "r": 0, "c": 6, "dir": "down", "clue": "Ils + Croire" },
    { "id": 3, "word": "PARTONS", "r": 2, "c": 8, "dir": "down", "clue": "Nous + Partir" },
    { "id": 4, "word": "DORMENT", "r": 0, "c": 11, "dir": "down", "clue": "Ils + Dormir" },
    { "id": 5, "word": "BOIVENT", "r": 6, "c": 0, "dir": "across", "clue": "Ils + Boire" },
    { "id": 6, "word": "METTEZ", "r": 2, "c": 13, "dir": "down", "clue": "Vous + Mettre" },
    { "id": 7, "word": "DISONS", "r": 8, "c": 6, "dir": "across", "clue": "Nous + Dire" },
    { "id": 8, "word": "BUVONS", "r": 6, "c": 0, "dir": "down", "clue": "Nous + Boire" },
    { "id": 9, "word": "SORTEZ", "r": 2, "c": 4, "dir": "down", "clue": "Vous + Sortir" },
    { "id": 10, "word": "PAYENT", "r": 3, "c": 7, "dir": "across", "clue": "Ils + Payer" }
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
  if (unitId === 'reprise') {
    return <QuestionsPractice />;
  }

  const [activeGame, setActiveGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState(unitId === 'reprise' ? 'grammar' : 'vocab');
  const isVercel = (typeof process !== 'undefined' && process.env && process.env.VERCEL_URL) || window.location.hostname.includes('vercel');

  const getGameTitles = () => {
    switch(unitId) {
      case '2':
        return {
          editor: "Le Défi du Professeur",
          editorDesc: "Trouve le bon mot avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Contre la montre)",
          ladder: "L'Ascension Universitaire",
          ladderDesc: "Deviens un excellent professeur en répondant à des questions de plus en plus difficiles.",
          ladderBtn: "Jouer (Progression)",
          race: "Le Marathon des Examens",
          raceDesc: "Bâts ton rival pour être le premier à réussir les examens !",
          raceBtn: "Jouer (Course)",
          writingTitle: "Souvenirs d'école & Éducation",
          writingDesc: "Décrivez vos souvenirs scolaires et votre parcours en utilisant l'imparfait, le passé composé et les pronoms objets !"
        };
      case '3':
        return {
          editor: "Le Défi du Hacker",
          editorDesc: "Trouve le bon mot de passe avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Contre la montre)",
          ladder: "L'Échelle du Développeur",
          ladderDesc: "Deviens un expert en tech en répondant à des questions complexes.",
          ladderBtn: "Jouer (Progression)",
          race: "La Course à l'Innovation",
          raceDesc: "Bâts l'entreprise rivale pour être le premier à publier ta technologie !",
          raceBtn: "Jouer (Course)",
          writingTitle: "Se protéger en ligne",
          writingDesc: "Rédigez un paragraphe sur la cybersécurité en utilisant le présent !"
        };
      case '4':
        return {
          editor: "Le Défi des Mots d'Art",
          editorDesc: "Trouvez le bon mot du vocabulaire artistique avant la fin du temps !",
          editorBtn: "Jouer (Contre la montre)",
          ladder: "Le Parcours Culturel",
          ladderDesc: "Devenez un expert en cinéma, musique et architecture en répondant aux questions !",
          ladderBtn: "Jouer (Progression)",
          race: "La Course du Festival de Cannes",
          raceDesc: "Gagnez la course au cinéma en répondant correctement à toutes les questions !",
          raceBtn: "Jouer (Course)",
          writingTitle: "Critique de Film & Récit d'Art",
          writingDesc: "Rédigez la critique d'un film ou le récit d'un souvenir culturel au passé !"
        };
      default: // Unit 1
        return {
          editor: "Le Défi du Rédacteur en Chef",
          editorDesc: "Un jeu de vitesse ! Trouve le bon mot avant que le temps ne s'écoule.",
          editorBtn: "Jouer (Contre la montre)",
          ladder: "L'Échelle du Journaliste",
          ladderDesc: "Deviens Rédacteur en Chef en répondant à des questions de plus en plus difficiles.",
          ladderBtn: "Jouer (Progression)",
          race: "La Course au Scoop",
          raceDesc: "Bâts le journal rival pour être le premier à publier le scoop !",
          raceBtn: "Jouer (Course)",
          writingTitle: "Journaliste en Action",
          writingDesc: "Rédigez un paragraphe sur votre rôle de journaliste en utilisant le présent !"
        };
    }
  };

  const titles = getGameTitles();

  if (activeGame === 'editor') return <EditorChallenge unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'ladder') return <JournalistLadder unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'race') return <ScoopRace unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-er') return <Crossword {...ER_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-ir') return <Crossword {...IR_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-re') return <Crossword {...RE_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-aux') return <Crossword {...AUX_PUZZLE} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-imparfait') return <GrammarFill data={IMPARFAIT_FILL_DATA} title="L'Imparfait" description="Complétez avec le verbe conjugué à l'imparfait." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-pc') return <GrammarFill data={PC_FILL_DATA} title="Le Passé Composé" description="Choisissez le bon auxiliaire et participe passé." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'grammar-fill-mixed') return <GrammarFill data={MIXED_FILL_DATA} title="Imparfait vs Passé Composé" description="Choisissez le temps approprié pour chaque situation." onBack={() => setActiveGame(null)} />;
  if (activeGame === 'writing') return <WritingPrompt unitId={unitId} onBack={() => setActiveGame(null)} />;
  // Unit 2 puzzles
  if (activeGame === 'crossword-irr1') return <Crossword {...IRR_PUZZLE_1} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-irr2') return <Crossword {...IRR_PUZZLE_2} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'crossword-irr3') return <Crossword {...IRR_PUZZLE_3} onBack={() => setActiveGame(null)} />;
  
  // Unit 4 Special Games
  if (activeGame === 'art-detective') return <ArtDetectiveGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'film-director') return <FilmDirectorGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'art-auction') return <ArtAuctionGame onBack={() => setActiveGame(null)} />;

  if (activeGame === 'crossword-u4') return <Crossword {...UNIT_4_PUZZLE} onBack={() => setActiveGame(null)} />;
  
  if (activeGame === 'pronoun-replace') return <PronounReplacement onBack={() => setActiveGame(null)} />;
  if (activeGame === 'pronoun-order') return <PronounOrder onBack={() => setActiveGame(null)} />;
  if (activeGame === 'pronoun-fill') return <PronounFill onBack={() => setActiveGame(null)} />;
  if (activeGame === 'reprise-practice') return <ReprisePractice onBack={() => setActiveGame(null)} />;
  
  if (activeGame === 'fishtopia') return <Fishtopia onBack={() => setActiveGame(null)} />;
  
  if (activeGame === 'coldcase-present') {
    if (isVercel) {
      return (
        <div className="practice-menu">
          <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux exercices</button>
          <div className="empty-state glass-panel" style={{textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem'}}>
            <h3>Nous n'y sommes pas encore.</h3>
          </div>
        </div>
      );
    }
    return <ColdCaseDossier tense="present" onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'coldcase-past') {
    if (isVercel) {
      return (
        <div className="practice-menu">
          <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux exercices</button>
          <div className="empty-state glass-panel" style={{textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem'}}>
            <h3>Nous n'y sommes pas encore.</h3>
          </div>
        </div>
      );
    }
    return <ColdCaseDossier tense="past" onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'coldcase-negation') {
    if (isVercel) {
      return (
        <div className="practice-menu">
          <button className="back-btn mb-4" onClick={() => setActiveGame(null)}>← Retour aux exercices</button>
          <div className="empty-state glass-panel" style={{textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem'}}>
            <h3>Nous n'y sommes pas encore.</h3>
          </div>
        </div>
      );
    }
    return <ColdCaseDossier tense="negation" onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'writing-prompt' || activeGame === 'writing') return <WritingPrompt unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'flashcards') {
    return <VocabFlashcards onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'writing') return <WritingPrompt unitId={unitId} onBack={() => setActiveGame(null)} />;
  if (activeGame === 'pronunciation') return <PronunciationPractice unitId={unitId} onBack={() => setActiveGame(null)} />;

  return (
    <div className="practice-menu">
      <div className="flex-between mb-4" style={{ alignItems: 'flex-end' }}>
        <h3>Jeux Pratiques: Choisis ton défi !</h3>
        
        {unitId !== 'reprise' && (
          <div className="tabs-container novel-style" style={{ alignSelf: 'auto' }}>
            <button 
              className={`tab-btn ${activeCategory === 'vocab' ? 'active' : ''} novel-style`}
              onClick={() => setActiveCategory('vocab')}
            >
              Vocabulaire
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'grammar' ? 'active' : ''} novel-style`}
              onClick={() => setActiveCategory('grammar')}
            >
              Grammaire
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'ecriture' ? 'active' : ''} novel-style`}
              onClick={() => setActiveCategory('ecriture')}
            >
              Production Écrite
            </button>
          </div>
        )}
      </div>
      
      <div className="game-cards-container">
        {unitId === 'reprise' ? (
          isVercel ? (
            <div className="empty-state glass-panel w-full shadow-sm" style={{textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem'}}>
              <h3>Nous n'y sommes pas encore.</h3>
            </div>
          ) : (
            <>
              <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-present')}>
                <Shield className="game-icon animate-pulse" style={{ color: '#60a5fa' }} size={48} />
                <h4>Dossier d'Interrogatoire : Présent</h4>
                <p>Déterminez la culpabilité des suspects en plaçant les doubles pronoms corrects au présent de l'indicatif.</p>
                <button className="play-btn btn-accent" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>Lancer l'Interrogatoire (Présent)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-past')}>
                <Shield className="game-icon animate-pulse" style={{ color: '#fbbf24' }} size={48} />
                <h4>Dossier d'Interrogatoire : Passé Composé</h4>
                <p>Déterminez la culpabilité des suspects en plaçant les pronoms et l'accord du participe passé au passé composé.</p>
                <button className="play-btn btn-accent" style={{ background: 'rgba(217, 119, 6, 0.2)', color: '#d97706' }}>Lancer l'Interrogatoire (Passé)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('coldcase-negation')}>
                <Shield className="game-icon animate-pulse" style={{ color: '#a78bfa' }} size={48} />
                <h4>Dossier d'Interrogatoire : La Négation</h4>
                <p>Pratiquez la négation complexe au présent (ne... jamais, ne... rien, ne... personne, ne... plus, ne... aucun, ne... pas de).</p>
                <button className="play-btn btn-accent" style={{ background: 'rgba(167, 139, 250, 0.2)', color: '#a78bfa' }}>Lancer l'Interrogatoire (Négation)</button>
              </div>

              <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('writing-prompt')}>
                <PenTool className="game-icon animate-pulse" style={{ color: '#f43f5e' }} size={48} />
                <h4>Atelier d'Écriture : Le Présent</h4>
                <p>Rédigez un court paragraphe de 150 caractères maximum et recevez des corrections de grammaire et d'accords immédiates !</p>
                <button className="play-btn btn-accent" style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>Lancer l'Atelier</button>
              </div>
            </>
          )
        ) : (
          <>
            {activeCategory === 'vocab' && (
          <>
            <div className="game-card glass-panel" onClick={() => setActiveGame('pronunciation')}>
              <Volume2 className="game-icon" style={{ color: '#f1c40f' }} size={48} />
              <h4>Atelier de Prononciation</h4>
              <p>Écoutez et répétez les mots de vocabulaire avec un accent natif !</p>
              <button className="play-btn" style={{ background: 'rgba(241, 196, 15, 0.2)' }}>S'entraîner</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('editor')}>
              <Clock className="game-icon text-danger" size={48} />
              <h4>{titles.editor}</h4>
              <p>{titles.editorDesc}</p>
              <button className="play-btn btn-danger">{titles.editorBtn}</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('ladder')}>
              <TrendingUp className="game-icon text-success" size={48} />
              <h4>{titles.ladder}</h4>
              <p>{titles.ladderDesc}</p>
              <button className="play-btn btn-success">{titles.ladderBtn}</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('race')}>
              <Flag className="game-icon text-accent" size={48} />
              <h4>{titles.race}</h4>
              <p>{titles.raceDesc}</p>
              <button className="play-btn btn-accent">{titles.raceBtn}</button>
            </div>
            
            {unitId === '1' && (
              <div className="game-card glass-panel animate-in" onClick={() => setActiveGame('flashcards')}>
                <Layers className="game-icon animate-pulse" style={{ color: '#3b82f6' }} size={48} />
                <h4>Cartes-Éclairs 3D</h4>
                <p>Révisez le vocabulaire de la liberté de la presse avec des cartes mémoires interactives en trois dimensions.</p>
                <button className="play-btn btn-accent" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>Lancer l'activité</button>
              </div>
            )}
            
            {unitId === '4' && (
              <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-u4')}>
                <Grid3X3 className="game-icon text-success" size={48} />
                <h4>Mots Croisés: Les Arts & la Culture</h4>
                <p>Complétez la grille avec le vocabulaire et les notions culturelles de l'Unité 4 !</p>
                <button className="play-btn btn-success">Jouer (Mots Croisés)</button>
              </div>
            )}
          </>
        )}

        {activeCategory === 'grammar' && unitId !== '2' && unitId !== '3' && unitId !== '4' && (
          <>
            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-er')}>
              <Grid3X3 className="game-icon" style={{ color: '#fdf6e3' }} size={48} />
              <h4>Mots Croisés: Verbes -ER</h4>
              <p>Remplissez la grille en conjuguant 10 verbes courants en -ER !</p>
              <button className="play-btn" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>Jouer (Grille -ER)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-ir')}>
              <Grid3X3 className="game-icon text-accent" size={48} />
              <h4>Mots Croisés: Verbes -IR</h4>
              <p>Testez vos connaissances des verbes réguliers du 2ème groupe (-IR) !</p>
              <button className="play-btn btn-accent">Jouer (Grille -IR)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-re')}>
              <Grid3X3 className="game-icon text-success" size={48} />
              <h4>Mots Croisés: Verbes -RE</h4>
              <p>Conjuguez les verbes du 3ème groupe en -RE comme attendre ou vendre !</p>
              <button className="play-btn btn-success">Jouer (Grille -RE)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-aux')}>
              <Grid3X3 className="game-icon text-danger" size={48} />
              <h4>Mots Croisés: Être & Avoir</h4>
              <p>Révisez les deux auxiliaires les plus importants de la langue française !</p>
              <button className="play-btn btn-danger">Jouer (Grille Auxiliaires)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-irr1')}>
              <Grid3X3 className="game-icon" style={{ color: '#fdf6e3' }} size={48} />
              <h4>Grille 1: Super Irréguliers & -OIR</h4>
              <p>Conjuguez Être, Avoir, Aller, Faire, Pouvoir, Vouloir, Devoir, Savoir, Voir.</p>
              <button className="play-btn" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>Jouer (Grille 1)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-irr2')}>
              <Grid3X3 className="game-icon text-accent" size={48} />
              <h4>Grille 2: Les verbes "Botte"</h4>
              <p>Conjuguez Venir, Tenir, Prendre, Acheter, Préférer, Appeler, Payer.</p>
              <button className="play-btn btn-accent">Jouer (Grille 2)</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('crossword-irr3')}>
              <Grid3X3 className="game-icon text-success" size={48} />
              <h4>Grille 3: Autres Irréguliers</h4>
              <p>Conjuguez Mettre, Dire, Lire, Écrire, Boire, Croire, Sortir, Partir, Dormir.</p>
              <button className="play-btn btn-success">Jouer (Grille 3)</button>
            </div>
          </>
        )}

        {activeCategory === 'grammar' && unitId === '2' && (
          <>
            <div className="game-card glass-panel" onClick={() => setActiveGame('pronoun-replace')}>
              <Repeat className="game-icon" style={{ color: '#fdf6e3' }} size={48} />
              <h4>Jeu 1: Remplacement (QCM)</h4>
              <p>Choisissez le bon pronom objet pour remplacer le nom lié à l'éducation.</p>
              <button className="play-btn" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('pronoun-order')}>
              <MoveHorizontal className="game-icon text-accent" size={48} />
              <h4>Jeu 2: L'Ordre des Doubles Pronoms</h4>
              <p>Remettez les mots de la phrase dans le bon ordre (ex: Je le lui donne).</p>
              <button className="play-btn btn-accent">Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('pronoun-fill')}>
              <Edit3 className="game-icon text-success" size={48} />
              <h4>Jeu 3: Texte à Trous (Pronoms)</h4>
              <p>Lisez le dialogue sur l'éducation et complétez les blancs avec le bon pronom objet court.</p>
              <button className="play-btn btn-success">Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('grammar-fill-imparfait')}>
              <Edit3 className="game-icon text-success" size={48} />
              <h4>Jeu 4: L'Imparfait</h4>
              <p>Pratiquez les terminaisons et les irréguliers (être/avoir) à l'imparfait.</p>
              <button className="play-btn btn-success">Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('grammar-fill-pc')}>
              <Edit3 className="game-icon text-accent" size={48} />
              <h4>Jeu 5: Le Passé Composé</h4>
              <p>Pratiquez le choix de l'auxiliaire (Avoir/Être) et l'accord du participe.</p>
              <button className="play-btn btn-accent">Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('grammar-fill-mixed')}>
              <Gamepad2 className="game-icon" style={{ color: '#8b5cf6' }} size={48} />
              <h4>Jeu 6: Imparfait vs Passé Composé</h4>
              <p>Entraînez-vous à combiner le décor (imparfait) et l'action soudaine (PC).</p>
              <button className="play-btn" style={{ background: '#8b5cf6', color: 'white' }}>Jouer</button>
            </div>

            <div className="game-card glass-panel" onClick={() => setActiveGame('reprise-practice')}>
              <BookOpen className="game-icon" style={{ color: '#38bdf8' }} size={48} />
              <h4>Exercices de Révision</h4>
              <p>Pratiquez les pronoms et la conjugaison de révision avant de commencer les unités.</p>
              <button className="play-btn" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>S'entraîner</button>
            </div>
          </>
        )}

        {activeCategory === 'grammar' && unitId === '3' && (
          <>
            <div className="empty-state glass-panel w-full" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Aucune activité de grammaire pour le moment.</p>
            </div>
          </>
        )}

        {activeCategory === 'grammar' && unitId === '4' && (
          <>
            <div className="empty-state glass-panel w-full" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Aucune activité de grammaire pour le moment.</p>
            </div>
          </>
        )}

        {activeCategory === 'ecriture' && (
          <>
            <div className="game-card glass-panel" onClick={() => setActiveGame('writing')}>
              <PenTool className="game-icon text-accent" size={48} />
              <h4>{titles.writingTitle}</h4>
              <p>{titles.writingDesc}</p>
              <button className="play-btn btn-accent">Commencer à écrire</button>
            </div>
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
}
