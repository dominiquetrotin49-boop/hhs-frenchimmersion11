import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Zap, CheckCircle2, XCircle, Award, RotateCcw, Sparkles, ChevronRight } from "lucide-react";
import "./ReprisePractice.css";

const SPEED_CHALLENGES = [
  {
    id: 1,
    category: "Inversion Formelle",
    prompt: "Transformez à la forme interrogative formelle avec inversion :",
    baseSentence: "Vous comprenez la question.",
    targetHint: "Verbe-Pronom ?",
    correctAnswers: ["Comprenez-vous la question ?", "Comprenez-vous la question?", "Comprenez vous la question ?"],
    explanation: "Inversion pronominale avec trait d'union obligatoire : « Comprenez-vous la question ? »."
  },
  {
    id: 2,
    category: "Règle du « DE »",
    prompt: "Transformez à la forme négative avec « ne... pas » :",
    baseSentence: "J'ai des questions sur le texte.",
    targetHint: "Attention au partitif/indéfini",
    correctAnswers: ["Je n'ai pas de questions sur le texte.", "Je n'ai pas de questions sur le texte", "Je n'ai pas de questions.", "Je n'ai pas de questions"],
    explanation: "« des questions » devient « de questions » à la forme négative stricte."
  },
  {
    id: 3,
    category: "« -t- » Euphonique",
    prompt: "Transformez avec inversion du sujet :",
    baseSentence: "Elle parle français en classe.",
    targetHint: "Verbe en voyelle + Pronom en voyelle",
    correctAnswers: ["Parle-t-elle français en classe ?", "Parle-t-elle français en classe?", "Parle-t-elle francais en classe ?"],
    explanation: "Le verbe se terminant par une voyelle exige un « -t- » euphonique : « Parle-t-elle... »."
  },
  {
    id: 4,
    category: "Exception du verbe ÊTRE",
    prompt: "Transformez à la forme négative avec « ne... pas » :",
    baseSentence: "C'est une erreur impardonnable.",
    targetHint: "Attention à l'exception avec ÊTRE",
    correctAnswers: ["Ce n'est pas une erreur impardonnable.", "Ce n'est pas une erreur impardonnable", "C'est pas une erreur impardonnable."],
    explanation: "Après le verbe ÊTRE, l'article ne change pas en « de » : « Ce n'est pas une erreur... »."
  },
  {
    id: 5,
    category: "Négation Restrictive (Ne... que)",
    prompt: "Complétez pour exprimer la restriction (« seulement ») :",
    baseSentence: "Il étudie seulement le soir. -> Il ",
    targetHint: "ne... que",
    correctAnswers: ["n'étudie que le soir.", "n'étudie que le soir", "n'etudie que le soir."],
    explanation: "« Ne... que » encadre le verbe et l'élément restreint pour exprimer la restriction."
  },
  {
    id: 6,
    category: "Inversion avec Sujet Nominal",
    prompt: "Transformez avec inversion formelle :",
    baseSentence: "Les journalistes posent des questions.",
    targetHint: "Nom en tête + verbe-pronom",
    correctAnswers: ["Les journalistes posent-ils des questions ?", "Les journalistes posent-ils des questions?", "Les journalistes posent-ils des questions"],
    explanation: "Le sujet nominal reste en tête suivi du verbe et du pronom de rappel : « Les journalistes posent-ils... »."
  },
  {
    id: 7,
    category: "Quantité Nulle (Ne... aucun)",
    prompt: "Transformez avec « ne... aucun » :",
    baseSentence: "Elle a des doutes sur l'issue.",
    targetHint: "aucun(e) sans « de »",
    correctAnswers: ["Elle n'a aucun doute sur l'issue.", "Elle n'a aucun doute sur l'issue", "Elle n'a aucun doute.", "Elle n'a aucun doute"],
    explanation: "« Ne... aucun + nom » se construit sans « de » : « Elle n'a aucun doute... »."
  },
  {
    id: 8,
    category: "Inversion au Passé Composé",
    prompt: "Transformez à la forme interrogative avec inversion :",
    baseSentence: "Tu as fini tes devoirs.",
    targetHint: "Inverser l'auxiliaire et le pronom",
    correctAnswers: ["As-tu fini tes devoirs ?", "As-tu fini tes devoirs?", "As-tu fini tes devoirs"],
    explanation: "Au temps composé, l'inversion porte sur l'auxiliaire : « As-tu fini... »."
  }
];

const ACCENTS = ["é", "è", "ê", "ë", "à", "â", "î", "ï", "ô", "û", "ù", "ç", "œ", "«", "»", "-"];
const TIME_PER_QUESTION = 20;

export default function CourseContreLaMontre({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState({});
  const [gameFinished, setGameFinished] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const currentQ = SPEED_CHALLENGES[currentIndex];

  useEffect(() => {
    if (isActive && !hasSubmitted && !gameFinished) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft((t) => t - 1);
        }, 1000);
      } else {
        handleTimeOut();
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isActive, hasSubmitted, gameFinished]);

  const handleStartGame = () => {
    setIsActive(true);
    setTimeLeft(TIME_PER_QUESTION);
    setHasSubmitted(false);
    setInputVal("");
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleTimeOut = () => {
    setHasSubmitted(true);
    setResults((prev) => ({
      ...prev,
      [currentQ.id]: { userAns: inputVal, isCorrect: false, timedOut: true }
    }));
  };

  const cleanString = (str) => {
    return str.trim().toLowerCase().replace(/['`’]/g, "'").replace(/\s+/g, " ");
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (hasSubmitted || !inputVal.trim()) return;

    clearTimeout(timerRef.current);
    const userClean = cleanString(inputVal);
    const isCorrect = currentQ.correctAnswers.some((ans) => cleanString(ans) === userClean);

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setResults((prev) => ({
      ...prev,
      [currentQ.id]: { userAns: inputVal, isCorrect, timedOut: false }
    }));
    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < SPEED_CHALLENGES.length) {
      setCurrentIndex((prev) => prev + 1);
      setInputVal("");
      setTimeLeft(TIME_PER_QUESTION);
      setHasSubmitted(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setInputVal("");
    setTimeLeft(TIME_PER_QUESTION);
    setIsActive(false);
    setResults({});
    setGameFinished(false);
    setHasSubmitted(false);
    setScore(0);
  };

  const insertAccent = (char) => {
    setInputVal((prev) => prev + char);
    if (inputRef.current) inputRef.current.focus();
  };

  const currentResult = results[currentQ?.id];

  return (
    <div className="reprise-practice-container">
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0, 0, 0, 0.06)", paddingBottom: "1rem" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "0.45rem 1rem",
            borderRadius: "10px",
            color: "#5a6c7d",
            fontWeight: "700",
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          <ArrowLeft size={16} /> Retour aux jeux
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="reprise-hint-pill" style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
            Défi {currentIndex + 1} / {SPEED_CHALLENGES.length}
          </span>
          <span className="reprise-score-badge" style={{ padding: "0.35rem 0.9rem", fontSize: "0.85rem" }}>
            <Award size={16} /> Score : {score} / {SPEED_CHALLENGES.length}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="reprise-header">
        <h2 className="reprise-title">⚡ La Course contre la Montre</h2>
        <p className="reprise-desc">
          Répondez aux défis de transformation syntaxique avant la fin du compte à rebours ({TIME_PER_QUESTION}s par question) !
        </p>
      </div>

      {!isActive && !gameFinished ? (
        /* Welcome / Start Screen */
        <div className="reprise-question-card" style={{ textAlign: "center", padding: "3rem 2rem", alignItems: "center" }}>
          <div style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 8px 20px rgba(231, 111, 81, 0.25)"
          }}>
            <Zap size={36} />
          </div>

          <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#2c3e50", margin: "0 0 0.5rem" }}>
            Prêt pour le Défi Chrono ?
          </h3>
          <p style={{ color: "#5a6c7d", fontSize: "0.95rem", maxWidth: "520px", lineHeight: "1.6", margin: "0 0 1.75rem" }}>
            Vous aurez <strong>{TIME_PER_QUESTION} secondes</strong> pour chaque phrase afin d'effectuer l'inversion ou la transformation négative exacte. Utilisez la barre d'accents ou vos raccourcis clavier.
          </p>

          <button
            onClick={handleStartGame}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#e76f51",
              color: "white",
              border: "none",
              padding: "0.8rem 2rem",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "1.05rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(231, 111, 81, 0.35)"
            }}
          >
            <Zap size={20} /> Lancer le Chronomètre
          </button>
        </div>
      ) : !gameFinished ? (
        /* Active Game Mode */
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Timer Progress Bar */}
          <div style={{ background: "#e2e8f0", borderRadius: "99px", height: "10px", overflow: "hidden" }}>
            <div style={{
              background: timeLeft <= 5 ? "#c0392b" : timeLeft <= 10 ? "#f4a261" : "#4a5d23",
              height: "100%",
              width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`,
              transition: "width 1s linear, background-color 0.3s"
            }} />
          </div>

          <div className="reprise-question-card" style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="reprise-number-badge">{currentIndex + 1}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#e76f51", textTransform: "uppercase" }}>
                  {currentQ.category}
                </span>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontWeight: "800",
                fontSize: "0.95rem",
                color: timeLeft <= 5 ? "#c0392b" : "#2c3e50"
              }}>
                <Clock size={18} /> {timeLeft}s
              </div>
            </div>

            <p style={{ fontSize: "0.95rem", color: "#5a6c7d", fontWeight: "600", margin: "0.25rem 0 0.5rem" }}>
              {currentQ.prompt}
            </p>

            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1rem 1.25rem",
              fontSize: "1.15rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "1rem"
            }}>
              « {currentQ.baseSentence} »
            </div>

            {/* Virtual Accent Bar */}
            <div className="reprise-accent-bar" style={{ marginBottom: "1rem", padding: "0.4rem 0.6rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#64748b", marginRight: "0.3rem" }}>Accents :</span>
              {ACCENTS.map((char, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => insertAccent(char)}
                  className="reprise-accent-btn"
                  style={{ width: "28px", height: "28px", fontSize: "0.85rem" }}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input
                  ref={inputRef}
                  type="text"
                  disabled={hasSubmitted}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Tapez votre réponse complète ici..."
                  className={`reprise-input ${hasSubmitted ? (currentResult?.isCorrect ? "correct" : "incorrect") : ""}`}
                  style={{ width: "100%", padding: "0.65rem 1rem", fontSize: "1rem" }}
                />

                {!hasSubmitted && (
                  <button
                    type="submit"
                    style={{
                      background: "#2c3e50",
                      color: "white",
                      border: "none",
                      padding: "0.65rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: "800",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Valider
                  </button>
                )}
              </div>
            </form>

            {/* Feedback Row */}
            {hasSubmitted && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "12px",
                  background: currentResult?.isCorrect ? "rgba(74, 93, 35, 0.06)" : "rgba(192, 57, 43, 0.06)",
                  border: `1.5px solid ${currentResult?.isCorrect ? "#4a5d23" : "#c0392b"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "800", fontSize: "0.95rem", color: currentResult?.isCorrect ? "#4a5d23" : "#c0392b" }}>
                    {currentResult?.isCorrect ? (
                      <>
                        <CheckCircle2 size={18} /> Exact ! Bravo pour la rapidité (+1 point)
                      </>
                    ) : currentResult?.timedOut ? (
                      <>
                        <Clock size={18} /> Temps écoulé !
                      </>
                    ) : (
                      <>
                        <XCircle size={18} /> Réponse incorrecte.
                      </>
                    )}
                  </div>

                  <p style={{ margin: "0.2rem 0", color: "#2c3e50", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {currentQ.explanation}
                  </p>

                  <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#4a5d23" }}>
                    Réponse attendue : « {currentQ.correctAnswers[0]} »
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={handleNext}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#e76f51",
                      color: "white",
                      border: "none",
                      padding: "0.6rem 1.3rem",
                      borderRadius: "10px",
                      fontWeight: "800",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(231, 111, 81, 0.2)"
                    }}
                  >
                    {currentIndex + 1 < SPEED_CHALLENGES.length ? (
                      <>Défi Suivant <ChevronRight size={18} /></>
                    ) : (
                      <>Voir le Bilan <Sparkles size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Summary Screen */
        <div className="reprise-question-card" style={{ textAlign: "center", padding: "3rem 2rem", alignItems: "center" }}>
          <div style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4a5d23 0%, #3d4d1d 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem"
          }}>
            <Award size={36} />
          </div>

          <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#2c3e50", margin: "0 0 0.5rem" }}>
            Course Terminée !
          </h3>
          <p style={{ color: "#5a6c7d", fontSize: "1rem", maxWidth: "500px", margin: "0 0 1.5rem" }}>
            {score >= 7 
              ? "Performance exceptionnelle ! Vos automatismes en syntaxe et en inversion sont impeccables." 
              : score >= 5 
              ? "Très bon score ! Votre vitesse de réaction est au point." 
              : "La vitesse viendra avec la pratique ! Relisez les fiches de révision et retentez le chrono."}
          </p>

          <div className="reprise-score-badge" style={{ fontSize: "1.25rem", padding: "0.75rem 2rem", marginBottom: "2rem" }}>
            Score Final : {score} / {SPEED_CHALLENGES.length} ({Math.round((score / SPEED_CHALLENGES.length) * 100)}%)
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleRestart}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#ffffff",
                border: "2px solid #cbd5e1",
                padding: "0.6rem 1.2rem",
                borderRadius: "10px",
                color: "#2c3e50",
                fontWeight: "800",
                cursor: "pointer"
              }}
            >
              <RotateCcw size={16} /> Retenter le Chrono
            </button>
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#e76f51",
                color: "white",
                border: "none",
                padding: "0.6rem 1.4rem",
                borderRadius: "10px",
                fontWeight: "800",
                cursor: "pointer"
              }}
            >
              Retour à la liste des jeux
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
