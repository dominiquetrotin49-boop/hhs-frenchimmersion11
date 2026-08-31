import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw, AlertTriangle, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import "./ReprisePractice.css";

const DOSSIERS = [
  {
    id: 1,
    theme: "L'Inversion & le « -t- » euphonique",
    suspectSentence: "A-elle compris les consignes du professeur hier soir ?",
    isCorrect: false,
    errorExplanation: "Quand le verbe se termine par une voyelle et que le pronom commence par une voyelle (a + elle), on insère un « -t- » euphonique encadré de traits d'union : « A-t-elle compris... ».",
    fixedSentence: "A-t-elle compris les consignes du professeur hier soir ?",
    ruleSummary: "Règle du t euphonique : voyelle + voyelle -> ajouter « -t- »."
  },
  {
    id: 2,
    theme: "La Négation & la règle du « DE »",
    suspectSentence: "Nous n'avons pas des erreurs dans notre premier rapport.",
    isCorrect: false,
    errorExplanation: "À la forme négative stricte avec un verbe d'action, les articles indéfinis/partitifs (un, une, des, du, de la) deviennent « de » ou « d' » : « Nous n'avons pas d'erreurs... ».",
    fixedSentence: "Nous n'avons pas d'erreurs dans notre premier rapport.",
    ruleSummary: "Négation stricte : pas de / pas d' (sauf après le verbe être)."
  },
  {
    id: 3,
    theme: "Inversion interrogative avec sujet nominal",
    suspectSentence: "Les élèves ont-ils terminé la rédaction de leur enquête ?",
    isCorrect: true,
    errorExplanation: "La phrase est parfaitement correcte ! Le nom sujet « Les élèves » est placé en tête, suivi du verbe et du pronom de rappel inversé avec trait d'union « ont-ils ».",
    fixedSentence: "Les élèves ont-ils terminé la rédaction de leur enquête ?",
    ruleSummary: "Sujet nominal + Verbe-Pronom de rappel."
  },
  {
    id: 4,
    theme: "Le verbe ÊTRE et la Négation",
    suspectSentence: "Ce n'est pas de problème majeur pour l'équipe.",
    isCorrect: false,
    errorExplanation: "Attention à l'exception majeure ! Après le verbe ÊTRE (ce n'est pas...), on conserve l'article : « Ce n'est pas un problème majeur... ».",
    fixedSentence: "Ce n'est pas un problème majeur pour l'équipe.",
    ruleSummary: "Exception Être : ce n'est pas un / une (l'article ne se transforme pas en « de »)."
  },
  {
    id: 5,
    theme: "Inversion avec « Pourquoi »",
    suspectSentence: "Pourquoi avez vous décidé de mener cette investigation ?",
    isCorrect: false,
    errorExplanation: "Lors d'une inversion sujet-verbe, le trait d'union est obligatoire entre le verbe et le pronom : « Pourquoi avez-vous décidé... ».",
    fixedSentence: "Pourquoi avez-vous décidé de mener cette investigation ?",
    ruleSummary: "Le trait d'union est obligatoire dans toute inversion pronominale."
  },
  {
    id: 6,
    theme: "Négation multiple (Ne... jamais de)",
    suspectSentence: "Ils ne font jamais de bruit pendant les examens écrits.",
    isCorrect: true,
    errorExplanation: "La phrase est impeccable ! Avec « jamais », la transformation en « de » s'applique également : « ne font jamais de bruit ».",
    fixedSentence: "Ils ne font jamais de bruit pendant les examens écrits.",
    ruleSummary: "« Ne... jamais de » remplace les partitifs/indéfinis."
  },
  {
    id: 7,
    theme: "Inversion interrogative au présent (3e personne)",
    suspectSentence: "Parle-il souvent de ses projets d'échange en France ?",
    isCorrect: false,
    errorExplanation: "« Parle » se termine par « e » et « il » commence par une voyelle. Il faut le « -t- » euphonique : « Parle-t-il souvent... ».",
    fixedSentence: "Parle-t-il souvent de ses projets d'échange en France ?",
    ruleSummary: "Parle-t-il, chante-t-elle, écoute-t-on."
  },
  {
    id: 8,
    theme: "Négation avec quantité nulle (Ne... aucun)",
    suspectSentence: "Le journaliste n'a trouvé aucune de preuve concluante.",
    isCorrect: false,
    errorExplanation: "« Aucun / aucune » est directement suivi du nom sans « de » : « n'a trouvé aucune preuve concluante ».",
    fixedSentence: "Le journaliste n'a trouvé aucune preuve concluante.",
    ruleSummary: "« Ne... aucun(e) + NOM » (sans de)."
  }
];

export default function DetecteurDeFailles({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const currentDossier = DOSSIERS[currentIndex];
  const hasAnsweredCurrent = answers[currentDossier.id] !== undefined;
  const userChoice = answers[currentDossier.id];
  const isCurrentCorrect = userChoice === currentDossier.isCorrect;

  const handleChoice = (choice) => {
    if (hasAnsweredCurrent) return;

    const correct = choice === currentDossier.isCorrect;
    setAnswers((prev) => ({ ...prev, [currentDossier.id]: choice }));
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < DOSSIERS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setGameFinished(false);
  };

  return (
    <div className="reprise-practice-container">
      {/* Top Bar with Back Button */}
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
            Dossier {currentIndex + 1} / {DOSSIERS.length}
          </span>
          <span className="reprise-score-badge" style={{ padding: "0.35rem 0.9rem", fontSize: "0.85rem" }}>
            <Award size={16} /> Score : {score} / {DOSSIERS.length}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="reprise-header">
        <h2 className="reprise-title">🔍 Le Détecteur de Failles</h2>
        <p className="reprise-desc">
          Analysez chaque phrase. Débusquez les erreurs d'inversion, de traits d'union et la règle du « de » !
        </p>
      </div>

      {!gameFinished ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Main Inspection Card */}
          <div className="reprise-question-card" style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="reprise-number-badge">{currentIndex + 1}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#e76f51", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {currentDossier.theme}
                </span>
              </div>
            </div>

            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#1e293b",
              lineHeight: "1.6",
              margin: "0.5rem 0"
            }}>
              « {currentDossier.suspectSentence} »
            </div>

            {/* Verdict Selection */}
            {!hasAnsweredCurrent ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                <button
                  onClick={() => handleChoice(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "2px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#2c3e50",
                    fontWeight: "800",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#4a5d23";
                    e.currentTarget.style.background = "rgba(74, 93, 35, 0.04)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                >
                  <ShieldCheck size={22} color="#4a5d23" />
                  Phrase Valide (Sans Faute)
                </button>

                <button
                  onClick={() => handleChoice(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "2px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#2c3e50",
                    fontWeight: "800",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#c0392b";
                    e.currentTarget.style.background = "rgba(192, 57, 43, 0.04)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                >
                  <AlertTriangle size={22} color="#c0392b" />
                  Faille Détectée (Erreur)
                </button>
              </div>
            ) : (
              /* Feedback State */
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{
                  padding: "1.25rem",
                  borderRadius: "12px",
                  background: isCurrentCorrect ? "rgba(74, 93, 35, 0.06)" : "rgba(192, 57, 43, 0.06)",
                  border: `1.5px solid ${isCurrentCorrect ? "#4a5d23" : "#c0392b"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "800", fontSize: "1rem", color: isCurrentCorrect ? "#4a5d23" : "#c0392b" }}>
                    {isCurrentCorrect ? (
                      <>
                        <CheckCircle2 size={20} /> Excellent diagnostic ! (+1 point)
                      </>
                    ) : (
                      <>
                        <XCircle size={20} /> Diagnostic erroné.
                      </>
                    )}
                  </div>

                  <p style={{ margin: "0.25rem 0 0", color: "#2c3e50", fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {currentDossier.errorExplanation}
                  </p>

                  {!currentDossier.isCorrect && (
                    <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px dashed rgba(0,0,0,0.1)", fontSize: "0.95rem", fontWeight: "700", color: "#4a5d23" }}>
                      Correction : « {currentDossier.fixedSentence} »
                    </div>
                  )}

                  <div style={{ marginTop: "0.25rem", fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>
                    💡 {currentDossier.ruleSummary}
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
                      padding: "0.65rem 1.4rem",
                      borderRadius: "10px",
                      fontWeight: "800",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(231, 111, 81, 0.25)"
                    }}
                  >
                    {currentIndex + 1 < DOSSIERS.length ? (
                      <>Dossier Suivant <ChevronRight size={18} /></>
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
        /* Final Score / Summary Card */
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
            Inspection Terminée !
          </h3>
          <p style={{ color: "#5a6c7d", fontSize: "1rem", maxWidth: "500px", margin: "0 0 1.5rem" }}>
            {score >= 7 
              ? "Impressionnant ! Vous maîtrisez parfaitement l'inversion syntaxique et la règle du « de » négatif." 
              : score >= 5 
              ? "Bon travail ! Quelques règles de syntaxe méritent encore une relecture attentive." 
              : "Prenez le temps de revoir la fiche de grammaire avant votre prochaine session."}
          </p>

          <div className="reprise-score-badge" style={{ fontSize: "1.25rem", padding: "0.75rem 2rem", marginBottom: "2rem" }}>
            Score Final : {score} / {DOSSIERS.length} ({Math.round((score / DOSSIERS.length) * 100)}%)
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
              <RotateCcw size={16} /> Recommencer
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
