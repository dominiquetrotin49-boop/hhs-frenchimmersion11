import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, RotateCcw, Check, ArrowRight, Award, HelpCircle } from 'lucide-react';

const PRESENT_QUESTIONS = [
  {
    id: 1,
    question: "Donnez-vous les documents au ministre ?",
    codText: "les documents",
    codDetails: "COD masculin pluriel",
    coiText: "au ministre",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    suffix: "donne ce matin.",
    correctSlots: ["les", "lui"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    rationale: "« Les documents » (COD masc. pl.) → les. « Au ministre » (COI sing.) → lui. Ordre : les lui."
  },
  {
    id: 2,
    question: "Rendez-vous la clé aux agents ?",
    codText: "la clé",
    codDetails: "COD féminin singulier",
    coiText: "aux agents",
    coiDetails: "COI pluriel",
    prefix: "Non, je ne",
    suffix: "rends pas.",
    correctSlots: ["la", "leur"],
    pronouns: ["la", "leur", "lui", "les", "le", "l'"],
    rationale: "« La clé » (COD fém. sing.) → la. « Aux agents » (COI pl.) → leur. Ordre : la leur."
  },
  {
    id: 3,
    question: "Expliquez-vous la situation à Sophie ?",
    codText: "la situation",
    codDetails: "COD féminin singulier",
    coiText: "à Sophie",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    suffix: "explique en détail.",
    correctSlots: ["la", "lui"],
    pronouns: ["la", "lui", "leur", "l'", "le", "les"],
    rationale: "« La situation » (COD fém. sing.) → la. « À Sophie » (COI sing.) → lui. Ordre : la lui."
  },
  {
    id: 4,
    question: "Montrez-vous les photos aux témoins ?",
    codText: "les photos",
    codDetails: "COD féminin pluriel",
    coiText: "aux témoins",
    coiDetails: "COI pluriel",
    prefix: "Oui, je",
    suffix: "montre.",
    correctSlots: ["les", "leur"],
    pronouns: ["les", "leur", "lui", "la", "le", "l'"],
    rationale: "« Les photos » (COD fém. pl.) → les. « Aux témoins » (COI pl.) → leur. Ordre : les leur."
  },
  {
    id: 5,
    question: "Vendez-vous la voiture volée à votre voisin ?",
    codText: "la voiture",
    codDetails: "COD féminin singulier",
    coiText: "à votre voisin",
    coiDetails: "COI singulier",
    prefix: "Non, je ne",
    suffix: "vends pas.",
    correctSlots: ["la", "lui"],
    pronouns: ["la", "lui", "leur", "l'", "le", "les"],
    rationale: "« La voiture » (COD fém. sing.) → la. « Au voisin » (COI sing.) → lui. Ordre : la lui."
  },
  {
    id: 6,
    question: "Transmettez-vous les codes d'accès à l'informaticienne ?",
    codText: "les codes d'accès",
    codDetails: "COD masculin pluriel",
    coiText: "à l'informaticienne",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    suffix: "transmets par message.",
    correctSlots: ["les", "lui"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    rationale: "« Les codes d'accès » (COD masc. pl.) → les. « À l'informaticienne » (COI sing.) → lui. Ordre : les lui."
  },
  {
    id: 7,
    question: "Est-ce que Marc promet cette récompense aux détectives ?",
    codText: "cette récompense",
    codDetails: "COD féminin singulier",
    coiText: "aux détectives",
    coiDetails: "COI pluriel",
    prefix: "Oui, il",
    suffix: "promet.",
    correctSlots: ["la", "leur"],
    pronouns: ["la", "leur", "lui", "les", "le", "l'"],
    rationale: "« La récompense » (COD fém. sing.) → la. « Aux détectives » (COI pl.) → leur. Ordre : la leur."
  },
  {
    id: 8,
    question: "Laissez-vous les preuves au juge ?",
    codText: "les preuves",
    codDetails: "COD féminin pluriel",
    coiText: "au juge",
    coiDetails: "COI singulier",
    prefix: "Non, je ne",
    suffix: "laisse pas.",
    correctSlots: ["les", "lui"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    rationale: "« Les preuves » (COD fém. pl.) → les. « Au juge » (COI sing.) → lui. Ordre : les lui."
  }
];

const PAST_QUESTIONS = [
  {
    id: 1,
    question: "Avez-vous envoyé les documents au ministre ?",
    codText: "les documents",
    codDetails: "COD masculin pluriel",
    coiText: "au ministre",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    mid: "ai",
    suffix: "ce matin.",
    correctSlots: ["les", "lui", "envoyés"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    participles: ["envoyé", "envoyés", "envoyée", "envoyées"],
    rationale: "« Les documents » (COD masc. pl.) → les. « Au ministre » (COI sing.) → lui. Ordre : les lui. Accord : envoyés s'accorde avec le COD précédent."
  },
  {
    id: 2,
    question: "Avez-vous rendu la clé aux agents ?",
    codText: "la clé",
    codDetails: "COD féminin singulier",
    coiText: "aux agents",
    coiDetails: "COI pluriel",
    prefix: "Non, je ne",
    mid: "ai pas",
    suffix: ".",
    correctSlots: ["la", "leur", "rendue"],
    pronouns: ["la", "leur", "lui", "les", "le", "l'"],
    participles: ["rendu", "rendue", "rendus", "rendues"],
    rationale: "« La clé » (COD fém. sing.) → la. « Aux agents » (COI pl.) → leur. Ordre : la leur. Accord : rendue (fém. sing.)."
  },
  {
    id: 3,
    question: "Avez-vous expliqué la situation à Sophie ?",
    codText: "la situation",
    codDetails: "COD féminin singulier",
    coiText: "à Sophie",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    mid: "ai",
    suffix: "en détail.",
    correctSlots: ["la", "lui", "expliquée"],
    pronouns: ["la", "lui", "leur", "l'", "le", "les"],
    participles: ["expliqué", "expliquée", "expliqués", "expliquées"],
    rationale: "« La situation » (COD fém. sing.) → la. « À Sophie » (COI sing.) → lui. Ordre : la lui. Accord : expliquée (fém. sing.)."
  },
  {
    id: 4,
    question: "Avez-vous montré les photos aux témoins ?",
    codText: "les photos",
    codDetails: "COD féminin pluriel",
    coiText: "aux témoins",
    coiDetails: "COI pluriel",
    prefix: "Oui, je",
    mid: "ai",
    suffix: ".",
    correctSlots: ["les", "leur", "montrées"],
    pronouns: ["les", "leur", "lui", "la", "le", "l'"],
    participles: ["montré", "montrée", "montrés", "montrées"],
    rationale: "« Les photos » (COD fém. pl.) → les. « Aux témoins » (COI pl.) → leur. Ordre : les leur. Accord : montrées (fém. pl.)."
  },
  {
    id: 5,
    question: "Avez-vous vendu la voiture volée à votre voisin ?",
    codText: "la voiture",
    codDetails: "COD féminin singulier",
    coiText: "à votre voisin",
    coiDetails: "COI singulier",
    prefix: "Non, je ne",
    mid: "ai pas",
    suffix: ".",
    correctSlots: ["la", "lui", "vendue"],
    pronouns: ["la", "lui", "leur", "l'", "le", "les"],
    participles: ["vendu", "vendue", "vendus", "vendues"],
    rationale: "« La voiture » (COD fém. sing.) → la. « Au voisin » (COI sing.) → lui. Ordre : la lui. Accord : vendue (fém. sing.)."
  },
  {
    id: 6,
    question: "Avez-vous transmis les codes d'accès à l'informaticienne ?",
    codText: "les codes d'accès",
    codDetails: "COD masculin pluriel",
    coiText: "à l'informaticienne",
    coiDetails: "COI singulier",
    prefix: "Oui, je",
    mid: "ai",
    suffix: "par message.",
    correctSlots: ["les", "lui", "transmis"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    participles: ["transmis", "transmise", "transmises"],
    rationale: "« Les codes d'accès » (COD masc. pl.) → les. « À l'informaticienne » (COI sing.) → lui. Ordre : les lui. Accord : transmis (invariable au masculin pluriel)."
  },
  {
    id: 7,
    question: "Est-ce que Marc a promis cette récompense aux détectives ?",
    codText: "cette récompense",
    codDetails: "COD féminin singulier",
    coiText: "aux détectives",
    coiDetails: "COI pluriel",
    prefix: "Oui, il",
    mid: "a",
    suffix: ".",
    correctSlots: ["la", "leur", "promise"],
    pronouns: ["la", "leur", "lui", "les", "le", "l'"],
    participles: ["promis", "promise", "promises"],
    rationale: "« La récompense » (COD fém. sing.) → la. « Aux détectives » (COI pl.) → leur. Ordre : la leur. Accord : promise (fém. sing.)."
  },
  {
    id: 8,
    question: "Avez-vous laissé les preuves au juge ?",
    codText: "les preuves",
    codDetails: "COD féminin pluriel",
    coiText: "au juge",
    coiDetails: "COI singulier",
    prefix: "Non, je ne",
    mid: "ai pas",
    suffix: ".",
    correctSlots: ["les", "lui", "laissées"],
    pronouns: ["les", "lui", "leur", "la", "le", "l'"],
    participles: ["laissé", "laissée", "laissés", "laissées"],
    rationale: "« Les preuves » (COD fém. pl.) → les. « Au juge » (COI sing.) → lui. Ordre : les lui. Accord : laissées (fém. pl.)."
  }
];

const NEGATION_QUESTIONS = [
  {
    id: 1,
    question: "Portez-vous toujours votre badge ?",
    triggerText: "toujours",
    triggerRule: "Ne... jamais",
    prefix: "Non, je",
    suffix: "porte [ Slot ] mon badge.", // Handled in sentence builder
    sentenceLayout: "Oui-Non",
    correctSlots: ["ne", "jamais"],
    pronouns: ["ne", "pas", "de", "jamais", "rien", "plus"],
    rationale: "La négation de « toujours » est « ne... jamais ». Elle entoure le verbe conjugué : « Je ne porte jamais mon badge »."
  },
  {
    id: 2,
    question: "Dites-vous tout au complice ?",
    triggerText: "tout",
    triggerRule: "Ne... rien",
    prefix: "Non, je",
    suffix: "dis [ Slot ] au complice.",
    correctSlots: ["ne", "rien"],
    pronouns: ["ne", "pas", "rien", "personne", "plus", "jamais"],
    rationale: "La négation de « tout » ou « quelque chose » est « ne... rien ». Elle entoure le verbe conjugué : « Je ne dis rien au complice »."
  },
  {
    id: 3,
    question: "Soupçonnez-vous quelqu'un dans cette pièce ?",
    triggerText: "quelqu'un",
    triggerRule: "Ne... personne",
    prefix: "Non, je",
    suffix: "soupçonne [ Slot ] dans cette pièce.",
    correctSlots: ["ne", "personne"],
    pronouns: ["ne", "pas", "personne", "rien", "plus", "aucun"],
    rationale: "La négation de « quelqu'un » est « ne... personne ». Contrairement aux autres, « personne » se place après le verbe : « Je ne soupçonne personne »."
  },
  {
    id: 4,
    question: "Suivez-vous encore la voiture rouge ?",
    triggerText: "encore",
    triggerRule: "Ne... plus",
    prefix: "Non, je",
    suffix: "suis [ Slot ] la voiture rouge.",
    correctSlots: ["ne", "plus"],
    pronouns: ["ne", "pas", "plus", "jamais", "rien", "de"],
    rationale: "La négation de « encore » (continuité) est « ne... plus » (arrêt). Elle entoure le verbe : « Je ne suis plus la voiture rouge »."
  },
  {
    id: 5,
    question: "Avez-vous une clé de secours ?",
    triggerText: "une",
    triggerRule: "Ne... aucun(e)",
    prefix: "Non, je",
    suffix: "ai [ Slot ] clé de secours.",
    correctSlots: ["n'", "aucune"],
    pronouns: ["n'", "ne", "aucune", "aucun", "pas", "de"],
    rationale: "« Une » devient « aucune » à la négation pour exprimer une absence totale. Devant voyelle, « ne » s'élide en « n' » : « Je n'ai aucune clé »."
  },
  {
    id: 6,
    question: "Mangez-vous une pomme ?",
    triggerText: "une pomme",
    triggerRule: "Ne... pas de",
    prefix: "Non, je ne mange",
    suffix: "pomme.",
    correctSlots: ["pas", "de"],
    pronouns: ["pas", "de", "du", "des", "plus", "jamais"],
    rationale: "À la négation, les articles indéfinis (un, une, des) se transforment en « de » (ou d' devant voyelle) : « Je ne mange pas de pomme »."
  },
  {
    id: 7,
    question: "Visitez-vous encore le musée ?",
    triggerText: "encore",
    triggerRule: "Ne... plus",
    prefix: "Non, je",
    suffix: "visite [ Slot ] le musée.",
    correctSlots: ["ne", "plus"],
    pronouns: ["ne", "pas", "plus", "jamais", "de", "rien"],
    rationale: "La négation de « encore » est « ne... plus ». Elle marque un changement d'état : « Je ne visite plus le musée »."
  },
  {
    id: 8,
    question: "Cherchez-vous quelque chose dans les tiroirs ?",
    triggerText: "quelque chose",
    triggerRule: "Ne... rien",
    prefix: "Non, je",
    suffix: "cherche [ Slot ] dans les tiroirs.",
    correctSlots: ["ne", "rien"],
    pronouns: ["ne", "pas", "rien", "personne", "plus", "jamais"],
    rationale: "La négation de « quelque chose » est « ne... rien ». Elle se place autour du verbe : « Je ne cherche rien dans les tiroirs »."
  }
];

export default function ColdCaseDossier({ tense = 'present', onBack }) {
  const isPast = tense === 'past';
  const isNegation = tense === 'negation';
  
  const QUESTIONS = isNegation 
    ? NEGATION_QUESTIONS 
    : isPast 
      ? PAST_QUESTIONS 
      : PRESENT_QUESTIONS;

  const [currentIdx, setCurrentIdx] = useState(0);
  // Present and Negation have 2 slots, Past has 3 slots
  const [selectedSlots, setSelectedSlots] = useState(isPast ? ["", "", ""] : ["", ""]);
  const [credibility, setCredibility] = useState(50); // Starts at 50%
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = QUESTIONS[currentIdx];

  const handleChipClick = (chipValue, type) => {
    if (showFeedback) return;
    
    const newSlots = [...selectedSlots];
    
    if (isNegation) {
      // For negation, we fill the first empty slot
      if (newSlots[0] === "") {
        newSlots[0] = chipValue;
      } else if (newSlots[1] === "") {
        newSlots[1] = chipValue;
      }
    } else {
      if (type === 'pronoun') {
        if (newSlots[0] === "") {
          newSlots[0] = chipValue;
        } else if (newSlots[1] === "") {
          newSlots[1] = chipValue;
        }
      } else if (type === 'participle' && isPast) {
        newSlots[2] = chipValue;
      }
    }
    
    setSelectedSlots(newSlots);
  };

  const handleSlotClick = (slotIdx) => {
    if (showFeedback) return;
    const newSlots = [...selectedSlots];
    newSlots[slotIdx] = "";
    setSelectedSlots(newSlots);
  };

  const handleReset = () => {
    if (showFeedback) return;
    setSelectedSlots(isPast ? ["", "", ""] : ["", ""]);
  };

  const handleCheck = () => {
    if (selectedSlots.includes("")) return;

    const correct = selectedSlots.every((val, idx) => val === currentQuestion.correctSlots[idx]);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCredibility(prev => Math.min(100, prev + 10));
    } else {
      setCredibility(prev => Math.max(0, prev - 10));
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedSlots(isPast ? ["", "", ""] : ["", ""]);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedSlots(isPast ? ["", "", ""] : ["", ""]);
    setCredibility(50);
    setShowFeedback(false);
    setGameOver(false);
  };

  const getGaugeColor = () => {
    if (credibility < 40) return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]";
    if (credibility < 70) return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]";
    return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
  };

  const getGaugeStatusText = () => {
    if (credibility < 40) return "Suspect non crédible / Indices contradictoires";
    if (credibility < 70) return "Statut incertain / Enquête en cours";
    return "Témoignage crédible / Pistes validées";
  };

  const getGaugeStatusIcon = () => {
    if (credibility < 40) return <ShieldAlert className="text-red-500 animate-pulse" size={20} />;
    if (credibility < 70) return <HelpCircle className="text-amber-500" size={20} />;
    return <Shield className="text-emerald-500 animate-bounce" size={20} />;
  };

  const renderHighlightedQuestion = () => {
    if (isNegation) {
      const trigger = currentQuestion.triggerText;
      const parts = currentQuestion.question.split(new RegExp(`(${trigger})`, 'g'));
      return (
        <h3 className="text-xl font-semibold leading-relaxed mb-0 text-slate-100">
          {parts.map((part, idx) => {
            if (part === trigger) {
              return (
                <span key={idx} className="ccd-badge-cod inline-block mx-1">
                  {part} <span className="text-[10px] uppercase opacity-75 font-bold ml-1">DÉCLENCHEUR</span>
                </span>
              );
            }
            return part;
          })}
        </h3>
      );
    }

    const cod = currentQuestion.codText;
    const coi = currentQuestion.coiText;
    const parts = currentQuestion.question.split(new RegExp(`(${cod}|${coi})`, 'g'));
    return (
      <h3 className="text-xl font-semibold leading-relaxed mb-0 text-slate-100">
        {parts.map((part, idx) => {
          if (part === cod) {
            return (
              <span key={idx} className="ccd-badge-cod inline-block mx-1">
                {part} <span className="text-[10px] uppercase opacity-75 font-bold ml-1">COD</span>
              </span>
            );
          }
          if (part === coi) {
            return (
              <span key={idx} className="ccd-badge-coi inline-block mx-1">
                {part} <span className="text-[10px] uppercase opacity-75 font-bold ml-1">COI</span>
              </span>
            );
          }
          return part;
        })}
      </h3>
    );
  };

  const renderSentenceBuilder = () => {
    if (isNegation) {
      if (currentQuestion.id === 5) {
        // "Non, je [ Slot 1 ] ai [ Slot 2 ] clé de secours."
        return (
          <div className="ccd-sentence-box mb-6">
            <span>{currentQuestion.prefix}</span>
            <button onClick={() => handleSlotClick(0)} className={`ccd-slot ${selectedSlots[0] ? 'filled' : ''}`}>
              {selectedSlots[0] || "Ne"}
            </button>
            <span>ai</span>
            <button onClick={() => handleSlotClick(1)} className={`ccd-slot ${selectedSlots[1] ? 'filled filled-participle' : ''}`}>
              {selectedSlots[1] || "Négation"}
            </button>
            <span>clé de secours.</span>
          </div>
        );
      }
      if (currentQuestion.id === 6) {
        // "Non, je ne mange [ Slot 1 ] [ Slot 2 ] pomme."
        return (
          <div className="ccd-sentence-box mb-6">
            <span>{currentQuestion.prefix}</span>
            <button onClick={() => handleSlotClick(0)} className={`ccd-slot ${selectedSlots[0] ? 'filled' : ''}`}>
              {selectedSlots[0] || "Négation"}
            </button>
            <button onClick={() => handleSlotClick(1)} className={`ccd-slot ${selectedSlots[1] ? 'filled filled-participle' : ''}`}>
              {selectedSlots[1] || "Article"}
            </button>
            <span>pomme.</span>
          </div>
        );
      }
      // General structure: "Non, je [ Slot 1 ] [verb] [ Slot 2 ] [suffix]"
      // We extract the verb from the suffix for rendering cleanly
      const suffixParts = currentQuestion.suffix.split(' [ Slot ] ');
      const verb = suffixParts[0];
      const rest = suffixParts[1] || "";
      return (
        <div className="ccd-sentence-box mb-6">
          <span>{currentQuestion.prefix}</span>
          <button onClick={() => handleSlotClick(0)} className={`ccd-slot ${selectedSlots[0] ? 'filled' : ''}`}>
            {selectedSlots[0] || "Ne"}
          </button>
          <span>{verb}</span>
          <button onClick={() => handleSlotClick(1)} className={`ccd-slot ${selectedSlots[1] ? 'filled filled-participle' : ''}`}>
            {selectedSlots[1] || "Négation"}
          </button>
          <span>{rest}</span>
        </div>
      );
    }

    return (
      <div className="ccd-sentence-box mb-6">
        <span>{currentQuestion.prefix}</span>
        
        {/* Slot 1 */}
        <button 
          onClick={() => handleSlotClick(0)}
          className={`ccd-slot ${selectedSlots[0] ? 'filled' : ''}`}
        >
          {selectedSlots[0] || "Pronom"}
        </button>

        {/* Slot 2 */}
        <button 
          onClick={() => handleSlotClick(1)}
          className={`ccd-slot ${selectedSlots[1] ? 'filled' : ''}`}
        >
          {selectedSlots[1] || "Pronom"}
        </button>

        {isPast && (
          <>
            <span>{currentQuestion.mid}</span>
            {/* Slot 3 */}
            <button 
              onClick={() => handleSlotClick(2)}
              className={`ccd-slot ${selectedSlots[2] ? 'filled filled-participle' : ''}`}
            >
              {selectedSlots[2] || "Participe"}
            </button>
          </>
        )}

        <span>{currentQuestion.suffix}</span>
      </div>
    );
  };

  if (gameOver) {
    return (
      <div className="ccd-container animate-in">
        <style>{STYLE_BLOCK}</style>
        <div className="text-center py-12">
          <Award className="mx-auto text-amber-400 mb-6 animate-bounce" size={80} />
          <h2 className="text-3xl font-black mb-4 text-slate-50">Interrogatoire Terminé</h2>
          <p className="text-lg text-slate-350 mb-8 max-w-md mx-auto">
            Dossier d'enquête clôturé. Votre niveau final de crédibilité est de <strong className="text-blue-400">{credibility}%</strong>.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleRestart}
              className="ccd-btn ccd-btn-primary"
            >
              <RotateCcw size={18} />
              Recommencer l'Enquête
            </button>
            {onBack && (
              <button 
                onClick={onBack}
                className="ccd-btn ccd-btn-secondary"
              >
                Retour aux Exercices
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ccd-container animate-in">
      <style>{STYLE_BLOCK}</style>

      {/* Header (Matching Amnesique header) */}
      <div className="ccd-header">
        <div className="ccd-title-group">
          <h2>
            {isNegation 
              ? "Dossier d'Interrogatoire : La Négation 📂" 
              : "Dossier d'Interrogatoire (Cold Case) 📂"}
          </h2>
          <p>
            {isNegation 
              ? "Pratiquez la négation complexe au présent (ne... jamais, plus, rien, personne, aucun, pas de)."
              : isPast 
                ? "Pratiquez les doubles pronoms au passé composé avec l'accord du participe passé."
                : "Pratiquez les doubles pronoms au présent de l'indicatif."}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="ccd-turn-badge">
            🎯 Question {currentIdx + 1} / {QUESTIONS.length}
          </div>
          {onBack && (
            <button 
              onClick={onBack}
              className="ccd-reset-btn"
              title="Retour aux exercices"
            >
              ← Retour
            </button>
          )}
        </div>
      </div>

      {/* Lie Detector Gauge */}
      <div className="ccd-gauge-container">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getGaugeStatusIcon()}
            <span className="text-sm font-bold text-slate-205">
              Détecteur de Mensonges (Crédibilité)
            </span>
          </div>
          <span className="text-sm font-black text-blue-400">
            {credibility}%
          </span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden mb-2 border border-slate-800">
          <div 
            className={`h-full lie-detector-transition ${getGaugeColor()}`}
            style={{ width: `${credibility}%` }}
          />
        </div>
        <div className="text-xs text-slate-350 font-medium">
          {getGaugeStatusText()}
        </div>
      </div>

      {/* Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel - Transcription de l'Interrogatoire */}
        <div className="ccd-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">
                Transcription de l'Interrogatoire
              </h3>
            </div>
            
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Question de l'Enquêteur :
              </div>
              {renderHighlightedQuestion()}
            </div>

            <div className="space-y-3">
              <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                {isNegation ? "Indice de négation :" : "Indices du dossier :"}
              </div>
              <div className="flex flex-col gap-3">
                {isNegation ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-800/50 bg-slate-900/30 text-sm">
                    <span className="ccd-badge-cod">
                      RÈGLE
                    </span>
                    <div>
                      <span className="font-bold text-slate-200">
                        {currentQuestion.triggerRule}
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Négation requise comme contraire de : « {currentQuestion.triggerText} ».
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-sm">
                      <span className="ccd-badge-cod">
                        COD
                      </span>
                      <div>
                        <span className="font-bold text-slate-200">
                          {currentQuestion.codText}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {currentQuestion.codDetails}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-sm">
                      <span className="ccd-badge-coi">
                        COI
                      </span>
                      <div>
                        <span className="font-bold text-slate-200">
                          {currentQuestion.coiText}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {currentQuestion.coiDetails}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-400 italic">
            {isNegation 
              ? "💡 Conseil : Repérez le mot déclencheur (toujours, encore, quelqu'un, tout, etc.) pour en déduire la forme de négation correcte."
              : isPast 
                ? "💡 Conseil : Identifiez les pronoms COD et COI, trouvez leur ordre devant l'auxiliaire, puis accordez correctement le participe passé."
                : "💡 Conseil : Identifiez les pronoms COD et COI et placez-les dans le bon ordre devant le verbe conjugué au présent."}
          </div>
        </div>

        {/* Right Panel - Déposition du Suspect */}
        <div className="ccd-panel flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-purple-400">
                Déposition du Suspect
              </h3>
            </div>

            {/* Sentence Builder Area */}
            {renderSentenceBuilder()}

            {/* Token Bank */}
            <div className="space-y-5">
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  {isNegation ? "Options de Négation / Mots à placer :" : "Options Pronoms (DOP / IOP) :"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.pronouns.map((chip, idx) => {
                    const isUsed = selectedSlots[0] === chip || selectedSlots[1] === chip;
                    return (
                      <button
                        key={idx}
                        disabled={isUsed || showFeedback}
                        onClick={() => handleChipClick(chip, 'pronoun')}
                        className={`ccd-chip pronoun-chip ${isUsed ? 'opacity-40 cursor-not-allowed border-dashed' : ''}`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isPast && (
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Options Participes Passés :
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.participles.map((chip, idx) => {
                      const isUsed = selectedSlots[2] === chip;
                      return (
                        <button
                          key={idx}
                          disabled={isUsed || showFeedback}
                          onClick={() => handleChipClick(chip, 'participle')}
                          className={`ccd-chip participle-chip ${isUsed ? 'opacity-40 cursor-not-allowed border-dashed' : ''}`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Button Panel */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-2 gap-4">
            <button
              onClick={handleReset}
              disabled={showFeedback || selectedSlots.every(s => s === "")}
              className="ccd-btn ccd-btn-secondary py-2"
            >
              <RotateCcw size={14} />
              Réinitialiser
            </button>
            
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedSlots.includes("")}
                className="ccd-btn ccd-btn-primary"
              >
                <Check size={16} />
                Vérifier la déposition
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className="ccd-btn ccd-btn-primary bg-indigo-600 border-indigo-500 hover:bg-indigo-500 animate-pulse"
              >
                Continuer
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Educational Feedback Panel */}
      {showFeedback && (
        <div className={`p-5 rounded-2xl border ${
          isCorrect 
            ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-100" 
            : "bg-red-950/20 border-red-500/40 text-red-100"
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            )}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
                {isCorrect ? "Déposition Validée (Crédibilité en hausse !)" : "Indices erronés (Crédibilité en baisse !)"}
              </h4>
              <p className="text-sm font-medium mb-3">
                {isCorrect 
                  ? "La structure négative correspond parfaitement aux indices relevés." 
                  : "Le suspect hésite. Revoyez la position et le choix des éléments de négation."}
              </p>
              
              <div className="border-t border-slate-800/80 pt-3 mt-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                  Explication syntaxique :
                </span>
                <p className="text-sm leading-relaxed text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-850">
                  {currentQuestion.rationale}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STYLE_BLOCK = `
  .ccd-container {
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

  .ccd-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ccd-title-group h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.3rem 0;
    background: linear-gradient(135deg, #60a5fa, #3b82f6, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ccd-title-group p {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin: 0;
  }

  .ccd-turn-badge {
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid #3b82f6;
    padding: 0.5rem 1.2rem;
    border-radius: 12px;
    font-weight: bold;
    color: #60a5fa;
    font-size: 0.95rem;
  }

  .ccd-reset-btn {
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

  .ccd-reset-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .ccd-panel {
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 1.5rem;
  }

  .ccd-gauge-container {
    padding: 1.25rem;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  .ccd-sentence-box {
    background: rgba(15, 23, 42, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    font-size: 1.25rem;
    color: white;
    padding: 1.25rem 1.5rem;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-family: monospace;
  }

  .ccd-slot {
    min-width: 80px;
    height: 38px;
    padding: 0 10px;
    background: rgba(15, 23, 42, 0.85);
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: #60a5fa;
    font-weight: bold;
    font-size: 1.05rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ccd-slot.filled {
    border-style: solid;
    border-color: #3b82f6;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }

  .ccd-slot.filled-participle {
    border-style: solid;
    border-color: #a78bfa;
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    color: white;
    box-shadow: 0 0 10px rgba(167, 139, 250, 0.3);
  }

  .ccd-chip {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: #e2e8f0;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ccd-chip:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-1px);
  }

  .ccd-chip.pronoun-chip {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    color: #93c5fd;
  }

  .ccd-chip.pronoun-chip:hover {
    background: rgba(59, 130, 246, 0.25);
    border-color: #3b82f6;
    color: white;
  }

  .ccd-chip.participle-chip {
    background: rgba(167, 139, 250, 0.12);
    border-color: rgba(167, 139, 250, 0.3);
    color: #c084fc;
  }

  .ccd-chip.participle-chip:hover {
    background: rgba(167, 139, 250, 0.25);
    border-color: #a78bfa;
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

  .ccd-badge-cod {
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: #fbbf24;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    font-weight: bold;
    font-size: 0.85rem;
  }

  .ccd-badge-coi {
    background: rgba(129, 140, 248, 0.15);
    border: 1px solid rgba(129, 140, 248, 0.4);
    color: #818cf8;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    font-weight: bold;
    font-size: 0.85rem;
  }

  .lie-detector-transition {
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
