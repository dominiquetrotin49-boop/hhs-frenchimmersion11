import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, Award, ArrowRight, HelpCircle } from 'lucide-react';

const VOCAB_WORDS = [
  { word: "environnement", definition: "La nature, l'air, l'eau et tout le monde vivant qui nous entoure." },
  { word: "journaliste", definition: "Personne qui écrit des articles pour les journaux ou présente les actualités." },
  { word: "ordinateur", definition: "Appareil électronique indispensable pour naviguer sur le web et travailler." },
  { word: "technologie", definition: "Ensemble des connaissances et des outils scientifiques modernes." },
  { word: "liberté", definition: "Possibilité d'agir, de penser et de parler sans contrainte." },
  { word: "apprentissage", definition: "Processus d'acquisition de nouvelles connaissances ou compétences." },
  { word: "citoyen", definition: "Membre d'un pays qui possède des droits civiques et politiques." },
  { word: "gouvernement", definition: "Groupe de personnes qui dirige un État ou une nation." },
  { word: "démocratie", definition: "Régime politique où le pouvoir est exercé par le peuple." },
  { word: "sécurité", definition: "Situation tranquille où l'on se sent à l'abri des dangers." },
  { word: "partage", definition: "Action de diviser ou de distribuer quelque chose à d'autres." },
  { word: "bibliothèque", definition: "Lieu de lecture public où l'on stocke et prête des livres." },
  { word: "quotidien", definition: "Qui se produit chaque jour de la semaine." },
  { word: "vacances", definition: "Période de repos durant laquelle on ne travaille pas." },
  { word: "dossier", definition: "Ensemble de documents concernant une affaire ou un sujet d'enquête." },
  // Intermediate High words
  { word: "épanouissement", definition: "Action de se développer pleinement et de trouver un équilibre heureux." },
  { word: "sensibilisation", definition: "Action de rendre une personne attentive ou réceptive à une cause importante." },
  { word: "divergence", definition: "Différence d'opinions, désaccord ou écart logique entre deux points de vue." },
  { word: "répercussion", definition: "Conséquence indirecte, effet secondaire ou impact d'un événement ou d'une décision." },
  { word: "vulnérabilité", definition: "Caractère fragile ou sensible d'un individu ou d'un système face aux menaces." },
  { word: "bienveillance", definition: "Disposition gentille, attentive et positive envers autrui." },
  { word: "persévérance", definition: "Fait de continuer un effort de manière constante et courageuse malgré les obstacles." },
  { word: "citoyenneté", definition: "Statut social et politique conférant des droits civiques et des devoirs civils dans un pays." }
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const ACCENTS = "éèàùçâêîôûëïœ".split("");

// Mathematically rigorous Fisher-Yates shuffle for guaranteed random ordering
const getShuffledPool = () => {
  const arr = [...VOCAB_WORDS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export default function VocabHangman({ onBack }) {
  // Initialize state directly with data to prevent any empty frames or mount race conditions
  const [wordPool, setWordPool] = useState(getShuffledPool);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [goodAnswers, setGoodAnswers] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [wordGuessed, setWordGuessed] = useState(false);

  const startNewGameSession = () => {
    setWordPool(getShuffledPool());
    setCurrentWordIdx(0);
    setGuessedLetters([]);
    setGoodAnswers(0);
    setWrongGuesses(0);
    setGameState('playing');
    setWordGuessed(false);
  };

  const currentItem = wordPool[currentWordIdx] || null;

  // Handle letter guesses
  const makeGuess = (letter) => {
    if (gameState !== 'playing' || wordGuessed || !currentItem) return;
    if (guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    const targetWord = currentItem.word.toLowerCase();
    
    if (targetWord.includes(letter)) {
      // Check if word is fully revealed
      const allLettersGuessed = targetWord.split("").every(char => 
        !/[a-zà-ÿœæ]/i.test(char) || newGuessed.includes(char)
      );
      
      if (allLettersGuessed) {
        setWordGuessed(true);
        const newGood = goodAnswers + 1;
        setGoodAnswers(newGood);
        
        if (newGood >= 10) {
          setGameState('won');
        }
      }
    } else {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= 6) {
        setGameState('lost');
      }
    }
  };

  // Next word handler
  const handleNextWord = () => {
    if (currentWordIdx < wordPool.length - 1) {
      setCurrentWordIdx(prev => prev + 1);
      setGuessedLetters([]);
      setWordGuessed(false);
    } else {
      // Shuffled again if we run out of words
      setWordPool(getShuffledPool());
      setCurrentWordIdx(0);
      setGuessedLetters([]);
      setWordGuessed(false);
    }
  };

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing' || wordGuessed || !currentItem) return;
      const key = e.key.toLowerCase();
      if (ALPHABET.includes(key) || ACCENTS.includes(key)) {
        makeGuess(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guessedLetters, currentWordIdx, gameState, wordGuessed, wordPool, currentItem]);

  // Render hangman drawing using SVG
  const renderHangman = () => {
    return (
      <svg height="180" width="160" className="mx-auto hangman-drawing">
        {/* Gallows */}
        <line x1="20" y1="160" x2="140" y2="160" stroke="#475569" strokeWidth="4" />
        <line x1="50" y1="160" x2="50" y2="20" stroke="#475569" strokeWidth="4" />
        <line x1="50" y1="20" x2="110" y2="20" stroke="#475569" strokeWidth="4" />
        <line x1="110" y1="20" x2="110" y2="45" stroke="#475569" strokeWidth="4" />
        
        {/* Stage 1: Head */}
        {wrongGuesses >= 1 && <circle cx="110" cy="58" r="13" stroke="#f8fafc" strokeWidth="3" fill="none" />}
        
        {/* Stage 2: Body */}
        {wrongGuesses >= 2 && <line x1="110" y1="71" x2="110" y2="115" stroke="#f8fafc" strokeWidth="3" />}
        
        {/* Stage 3: Left Arm */}
        {wrongGuesses >= 3 && <line x1="110" y1="85" x2="85" y2="100" stroke="#f8fafc" strokeWidth="3" />}
        
        {/* Stage 4: Right Arm */}
        {wrongGuesses >= 4 && <line x1="110" y1="85" x2="135" y2="100" stroke="#f8fafc" strokeWidth="3" />}
        
        {/* Stage 5: Left Leg */}
        {wrongGuesses >= 5 && <line x1="110" y1="115" x2="85" y2="145" stroke="#f8fafc" strokeWidth="3" />}
        
        {/* Stage 6: Right Leg */}
        {wrongGuesses >= 6 && <line x1="110" y1="115" x2="135" y2="145" stroke="#f8fafc" strokeWidth="3" />}
      </svg>
    );
  };

  // Fallback UI to prevent blank screen if currentItem is temporarily missing
  if (!currentItem) {
    return (
      <div className="hangman-container animate-in">
        <style>{STYLE_BLOCK}</style>
        <div className="text-center py-12 ccd-panel">
          <p className="text-slate-300">Chargement du dossier de vocabulaire...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hangman-container animate-in">
      <style>{STYLE_BLOCK}</style>

      {/* Header */}
      <div className="hangman-header">
        <div className="hangman-title-group">
          <h2>Le Pendu du Vocabulaire 🕵️‍♂️</h2>
          <p>Devinez le mot à partir de sa définition. Trouvez 10 mots sans compléter le pendu !</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hangman-stats-badge bg-emerald-950/40 border-emerald-500/40 text-emerald-400">
            ✅ Victoires : {goodAnswers} / 10
          </div>
          <div className="hangman-stats-badge bg-red-950/40 border-red-500/40 text-red-400">
            💀 Erreurs : {wrongGuesses} / 6
          </div>
          {onBack && (
            <button onClick={onBack} className="hangman-reset-btn">
              ← Retour
            </button>
          )}
        </div>
      </div>

      {/* Main Game Frame */}
      {gameState === 'won' || gameState === 'lost' ? (
        <div className="text-center py-12 ccd-panel">
          <Award className={`mx-auto mb-6 ${gameState === 'won' ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} size={80} />
          <h2 className="text-3xl font-black mb-4">
            {gameState === 'won' ? "Félicitations ! Vous avez gagné !" : "Partie terminée !"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
            {gameState === 'won' 
              ? "Vous avez trouvé 10 mots de vocabulaire de niveau intermédiaire ! Votre accent et orthographe sont impeccables."
              : "Le pendu est complet. Entraînez-vous encore pour perfectionner votre vocabulaire."}
          </p>
          <button onClick={startNewGameSession} className="ccd-btn ccd-btn-primary">
            <RefreshCw size={18} />
            Recommencer une partie
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Hangman Visualization Left Panel */}
          <div className="lg:col-span-4 ccd-panel flex flex-col justify-center items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 text-center">
              État d'avancement
            </h3>
            {renderHangman()}
            <div className="mt-4 text-center text-xs text-slate-400">
              Tapez sur votre clavier ou cliquez sur les touches ci-dessous.
            </div>
          </div>

          {/* Definition and Input Right Panel */}
          <div className="lg:col-span-8 ccd-panel flex flex-col justify-between gap-6">
            
            {/* Definition Box */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <HelpCircle size={14} className="text-blue-400" />
                Définition :
              </div>
              <p className="text-lg font-semibold text-slate-100 leading-relaxed">
                {currentItem.definition}
              </p>
            </div>

            {/* Word Display Area (Guaranteed horizontal alignment from left to right) */}
            <div className="vh-word-row">
              {currentItem.word.split("").map((char, index) => {
                const isLetter = /[a-zà-ÿœæ]/i.test(char);
                const revealed = guessedLetters.includes(char.toLowerCase()) || !isLetter;
                return (
                  <div key={index} className="vh-char-box">
                    <span className={`vh-char-text ${revealed ? 'text-blue-400' : 'text-slate-400'}`}>
                      {revealed ? char : "?"}
                    </span>
                    <div className={`vh-char-underline ${revealed ? 'bg-blue-500' : 'bg-slate-700'}`} />
                  </div>
                );
              })}
            </div>

            {/* Word Guessed Feedback Card */}
            {wordGuessed && (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <span>Correct ! Le mot était : <strong className="uppercase text-blue-400">{currentItem.word}</strong></span>
                </div>
                <button onClick={handleNextWord} className="ccd-btn ccd-btn-primary py-1.5 px-4 text-xs">
                  Mot suivant
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Virtual Keyboards Area */}
            <div className="space-y-4">
              {/* Keyboard line 1: Accents */}
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Accents et caractères spéciaux :
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENTS.map((char) => {
                    const guessed = guessedLetters.includes(char);
                    return (
                      <button
                        key={char}
                        disabled={guessed || wordGuessed}
                        onClick={() => makeGuess(char)}
                        className={`key-btn accent-key ${guessed ? 'guessed' : ''}`}
                      >
                        {char}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Keyboard line 2: Alphabet */}
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Lettres standards :
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALPHABET.map((char) => {
                    const guessed = guessedLetters.includes(char);
                    return (
                      <button
                        key={char}
                        disabled={guessed || wordGuessed}
                        onClick={() => makeGuess(char)}
                        className={`key-btn ${guessed ? 'guessed' : ''}`}
                      >
                        {char}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

const STYLE_BLOCK = `
  .hangman-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 1.5rem;
    background: rgba(30, 41, 59, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    color: #f8fafc;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hangman-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hangman-title-group h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.3rem 0;
    background: linear-gradient(135deg, #60a5fa, #3b82f6, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hangman-title-group p {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin: 0;
  }

  .hangman-stats-badge {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: bold;
    font-size: 0.9rem;
    border: 1px solid;
    display: flex;
    align-items: center;
  }

  .hangman-reset-btn {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #e2e8f0;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.2s ease;
  }

  .hangman-reset-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .ccd-panel {
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 1.5rem;
  }

  /* Fixed word row styling ensuring horizontal left-to-right display */
  .vh-word-row {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    padding: 1.5rem 0 !important;
    width: 100% !important;
  }

  .vh-char-box {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    min-width: 22px !important;
  }

  .vh-char-text {
    font-family: monospace !important;
    font-size: 1.75rem !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
  }

  .vh-char-underline {
    width: 18px !important;
    height: 4px !important;
    margin-top: 4px !important;
    border-radius: 2px !important;
  }

  .key-btn {
    width: 32px;
    height: 38px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .key-btn:hover {
    background: rgba(255, 255, 255, 0.18);
    color: white;
    transform: translateY(-1px);
  }

  .key-btn.guessed {
    opacity: 0.25;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.05);
    color: #475569;
    cursor: not-allowed;
    transform: none;
  }

  .key-btn.accent-key {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    color: #93c5fd;
  }

  .key-btn.accent-key:hover {
    background: rgba(59, 130, 246, 0.25);
    color: white;
  }

  .ccd-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
  }

  .ccd-btn-primary {
    background: #3b82f6;
    color: white;
    border: 1px solid #2563eb;
  }

  .ccd-btn-primary:hover {
    background: #2563eb;
  }

  .ccd-btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .ccd-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .hangman-drawing {
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
  }
`;
