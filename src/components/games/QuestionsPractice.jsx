import React, { useState, useRef } from 'react';
import { CheckCircle2, RefreshCw, XCircle, Award, Send, AlertTriangle, HelpCircle } from 'lucide-react';
import './ReprisePractice.css';

const QUESTIONS_ACTIVITIES = [
  {
    id: 'est_ce_que',
    title: 'Activité 1 : Poser des questions avec « Est-ce que »',
    description: 'Transformez les affirmations suivantes en questions au registre standard. N\'oubliez pas le point d\'interrogation final (?) et faites attention aux élisions devant voyelle (est-ce qu\') !',
    questions: [
      { id: 'eq_1', textBefore: "Affirmation : Tu étudies le français. -> Question : ", textAfter: "", hint: "Est-ce que tu...", answer: "Est-ce que tu étudies le français ?" },
      { id: 'eq_2', textBefore: "Affirmation : Il aime faire ses devoirs. -> Question : ", textAfter: "", hint: "Est-ce qu'il...", answer: "Est-ce qu'il aime faire ses devoirs ?" },
      { id: 'eq_3', textBefore: "Affirmation : Vous comprenez la leçon. -> Question : ", textAfter: "", hint: "Est-ce que vous...", answer: "Est-ce que vous comprenez la leçon ?" },
      { id: 'eq_4', textBefore: "Affirmation : Elle a un examen aujourd'hui. -> Question : ", textAfter: "", hint: "Est-ce qu'elle...", answer: "Est-ce qu'elle a un examen aujourd'hui ?" },
      { id: 'eq_5', textBefore: "Affirmation : Ils vont à la bibliothèque. -> Question : ", textAfter: "", hint: "Est-ce qu'ils...", answer: "Est-ce qu'ils vont à la bibliothèque ?" }
    ]
  },
  {
    id: 'inversion',
    title: 'Activité 2 : L\'Inversion sujet-verbe',
    description: 'Récrivez les questions en utilisant l\'inversion formelle. N\'oubliez pas le trait d\'union (-) et le "-t-" euphonique entre deux voyelles !',
    questions: [
      { id: 'inv_1', textBefore: "Question : Est-ce que tu as ton livre ? -> Inversion : ", textAfter: "", hint: "As-tu...", answer: "As-tu ton livre ?" },
      { id: 'inv_2', textBefore: "Question : Est-ce qu'il parle espagnol ? -> Inversion : ", textAfter: "", hint: "Parle-t-il...", answer: "Parle-t-il espagnol ?" },
      { id: 'inv_3', textBefore: "Question : Est-ce que vous faites vos devoirs ? -> Inversion : ", textAfter: "", hint: "Faites-vous...", answer: "Faites-vous vos devoirs ?" },
      { id: 'inv_4', textBefore: "Question : Est-ce qu'elle aime l'histoire ? -> Inversion : ", textAfter: "", hint: "Aime-t-elle...", answer: "Aime-t-elle l'histoire ?" },
      { id: 'inv_5', textBefore: "Question : Est-ce qu'ils comprennent la règle ? -> Inversion : ", textAfter: "", hint: "Comprennent-ils...", answer: "Comprennent-ils la règle ?" }
    ]
  },
  {
    id: 'mots_interrogatifs',
    title: 'Activité 3 : Les mots interrogatifs',
    description: 'Complétez la question avec le mot interrogatif correct (Où, Quand, Pourquoi, Comment, Qui, Combien, Que) selon le contexte de la réponse.',
    questions: [
      { id: 'mi_1', textBefore: "Question : ", textAfter: " étudies-tu le français ? (Réponse : Car je veux habiter à Paris.)", hint: "Pourquoi / Où", answer: "Pourquoi" },
      { id: 'mi_2', textBefore: "Question : ", textAfter: " est-ce que se trouve le nouveau campus ? (Réponse : Au centre de la ville.)", hint: "Où / Quand", answer: "Où" },
      { id: 'mi_3', textBefore: "Question : ", textAfter: " commence le cours d'histoire ? (Réponse : À dix heures précises.)", hint: "Quand / Qui", answer: "Quand" },
      { id: 'mi_4', textBefore: "Question : ", textAfter: " de livres as-tu achetés ? (Réponse : J'ai acheté trois livres.)", hint: "Combien / Comment", answer: "Combien" },
      { id: 'mi_5', textBefore: "Question : ", textAfter: " est le nouveau professeur ? (Réponse : C'est Monsieur Dubois.)", hint: "Qui / Que", answer: "Qui" },
      { id: 'mi_6', textBefore: "Question : ", textAfter: " vous appelez-vous ? (Réponse : Je m'appelle Zoé.)", hint: "Comment / Pourquoi", answer: "Comment" },
      { id: 'mi_7', textBefore: "Question : ", textAfter: " voulez-vous faire après le lycée ? (Réponse : Je veux devenir journaliste.)", hint: "Que / Quoi", answer: "Que" }
    ]
  },
  {
    id: 'writing',
    title: 'Activité 4 : Production Écrite',
    description: 'Créez un dialogue court pour pratiquer l\'interrogation sous toutes ses formes.',
    questions: []
  }
];

const ACCENTS = ["é", "è", "à", "ù", "ç", "â", "ê", "î", "ô", "û", "ë", "ï", "œ", "-"];

const localAnalyzeText = (text) => {
  const textClean = text.trim();
  const textLower = textClean.toLowerCase();
  
  const spellingErrors = [];
  const verbAgreements = [];
  const adjectiveAgreements = [];
  const nounGenders = [];
  const wordChoices = [];
  const questionRequirements = [];

  // 1. spelling errors
  // cooment -> comment
  if (textLower.includes("cooment") || textLower.includes("commant") || textLower.includes("coment")) {
    const errorWord = textClean.match(/\bcooment|commant|coment\b/i)?.[0] || "cooment";
    spellingErrors.push({
      error: errorWord,
      correction: "comment",
      explanation: "L'adverbe interrogatif s'écrit « comment »."
    });
  }

  // quel age -> quel âge
  const ageAccentMatch = textClean.match(/\b(quel\s+)?age\b/i);
  if (ageAccentMatch) {
    spellingErrors.push({
      error: ageAccentMatch[0],
      correction: ageAccentMatch[1] ? "quel âge" : "âge",
      explanation: "Le mot « âge » s'écrit avec un accent circonflexe sur le 'a'."
    });
  }

  // bocou / trés / deja
  if (textLower.includes("bocou")) {
    spellingErrors.push({ error: "bocou", correction: "beaucoup", explanation: "S'écrit toujours « beaucoup »." });
  }
  if (textLower.includes("trés")) {
    spellingErrors.push({ error: "trés", correction: "très", explanation: "S'écrit avec un accent grave : très." });
  }

  // 2. verb agreement errors
  // j'habites -> j'habite (verbs in -er with je)
  const jHabitesMatch = textClean.match(/\bj['’](\w+es)\b/i);
  if (jHabitesMatch) {
    const verb = jHabitesMatch[1];
    const correctVerb = verb.slice(0, -1);
    verbAgreements.push({
      error: `j'${verb}`,
      subject: "je",
      correction: `j'${correctVerb}`,
      explanation: "Avec le pronom 'je' (ou j'), les verbes du premier groupe (-er) se terminent par '-e' au présent, pas '-es'."
    });
  }

  // je manges -> je mange
  const jeEsMatch = textClean.match(/\b(je)\s+(\w+es)\b/i);
  if (jeEsMatch) {
    verbAgreements.push({
      error: jeEsMatch[2],
      subject: "je",
      correction: jeEsMatch[2].slice(0, -1),
      explanation: "Avec le pronom sujet « je », la terminaison est « -e » pour les verbes du premier groupe (-er)."
    });
  }

  // 3. word choices / syntax
  // je suis 15 ans -> j'ai 15 ans
  const jeSuisAgeMatch = textClean.match(/\b(je\s+suis|tu\s+es|il\s+est|elle\s+est|nous\s+sommes|vous\s+êtes|ils\s+sont|elles\s+sont)\s+(\d+)\s+ans\b/i);
  if (jeSuisAgeMatch) {
    const errorText = jeSuisAgeMatch[0];
    const subject = jeSuisAgeMatch[1].toLowerCase().trim();
    const age = jeSuisAgeMatch[2];
    
    let correction = `j'ai ${age} ans`;
    if (subject.includes("tu")) correction = `tu as ${age} ans`;
    if (subject.includes("il") || subject.includes("elle")) correction = `${subject.split(" ")[0]} a ${age} ans`;
    
    wordChoices.push({
      error: errorText,
      correction: correction,
      explanation: "En français, on exprime l'âge avec le verbe « avoir », pas « être » (ex: j'ai 15 ans)."
    });
  }

  // a Boston / a Paris (preposition à before cities/places)
  const aCityMatch = textClean.match(/\ba\s+([A-Z]\w+)\b/);
  if (aCityMatch) {
    wordChoices.push({
      error: `a ${aCityMatch[1]}`,
      correction: `à ${aCityMatch[1]}`,
      explanation: "La préposition devant un nom de ville ou de lieu s'écrit « à » avec un accent grave."
    });
  }

  // a vs à general
  const aPrepMatch = textClean.match(/\ba\s+(la|l'|un|une|des|le|les|l'école|l'hôtel|\d+)\b/i);
  if (aPrepMatch && !aCityMatch) {
    wordChoices.push({
      error: `a ${aPrepMatch[1]}`,
      correction: `à ${aPrepMatch[1]}`,
      explanation: "La préposition de lieu ou de temps s'écrit « à » avec un accent grave."
    });
  }

  // Ou habites-tu -> Où habites-tu (Ou interrogatif)
  const ouInterrogatifMatch = textClean.match(/\bOu\s+(\w+-tu|\w+-il|\w+-elle|est-ce|tu|vous)\b/);
  if (ouInterrogatifMatch) {
    wordChoices.push({
      error: `Ou ${ouInterrogatifMatch[1]}`,
      correction: `Où ${ouInterrogatifMatch[1]}`,
      explanation: "L'adverbe interrogatif s'écrit « où » avec un accent grave pour indiquer le lieu."
    });
  }

  // comment appelles-tu -> comment t'appelles-tu
  if (textLower.includes("comment appelles-tu") || textLower.includes("appelles-tu")) {
    const rawMatch = textClean.match(/(comment\s+)?appelles-tu/i)?.[0];
    if (rawMatch) {
      wordChoices.push({
        error: rawMatch,
        correction: rawMatch.toLowerCase().startsWith("comment") ? "comment t'appelles-tu" : "t'appelles-tu",
        explanation: "Le verbe s'appeler est pronominal. N'oubliez pas le pronom réfléchi (t') : comment t'appelles-tu ?"
      });
    }
  }

  // Questions Checks:
  // Must contain a question mark
  const hasQuestionMark = textClean.includes("?");
  if (!hasQuestionMark) {
    questionRequirements.push({
      status: "warning",
      msg: "Votre dialogue doit contenir au moins un point d'interrogation (?) pour former une question."
    });
  }

  // Uses Est-ce que
  const hasEstCeQue = textLower.includes("est-ce que") || textLower.includes("est-ce qu");
  
  // Uses inversion (hyphenated verb-subject)
  const hasInversion = /\b(as-tu|es-tu|parles-tu|fais-tu|aimes-tu|étudies-tu|aime-t-il|aime-t-elle|parle-t-il|parle-t-elle|voulez-vous|faites-vous|avez-vous|êtes-vous|appelles-tu|habites-tu)\b/i.test(textClean);

  // Interrogative words
  const interrogatifs = ["où", "quand", "pourquoi", "comment", "qui", "combien", "que", "quoi", "ou"]; // include "ou" in case they missed the accent
  const foundInterrogatif = interrogatifs.find(word => textLower.includes(word));

  if (hasQuestionMark) {
    if (hasEstCeQue) {
      questionRequirements.push({
        status: "success",
        msg: "Structure « Est-ce que » bien détectée !"
      });
    } else {
      questionRequirements.push({
        status: "info",
        msg: "Conseil : Essayez d'ajouter une question avec « Est-ce que » pour pratiquer ce registre."
      });
    }

    if (hasInversion) {
      questionRequirements.push({
        status: "success",
        msg: "Inversion sujet-verbe bien détectée !"
      });
    } else {
      questionRequirements.push({
        status: "info",
        msg: "Conseil : Essayez d'utiliser l'inversion sujet-verbe (ex: As-tu... ? Parles-tu... ?) pour l'une de vos questions."
      });
    }

    if (foundInterrogatif) {
      questionRequirements.push({
        status: "success",
        msg: `Mot interrogatif (« ${foundInterrogatif === 'ou' ? 'où' : foundInterrogatif} ») bien détecté !`
      });
    } else {
      questionRequirements.push({
        status: "info",
        msg: "Conseil : Essayez d'utiliser un mot interrogatif (ex: Où, Quand, Pourquoi, Comment)."
      });
    }
  }

  const isValid = spellingErrors.length === 0 && 
                  verbAgreements.length === 0 && 
                  adjectiveAgreements.length === 0 && 
                  nounGenders.length === 0 && 
                  wordChoices.length === 0 &&
                  hasQuestionMark;

  return {
    isValid,
    spellingErrors,
    verbAgreements,
    adjectiveAgreements,
    nounGenders,
    wordChoices,
    questionRequirements,
    generalFeedback: isValid 
      ? "Excellent travail ! Votre conversation utilise correctement les structures de questions sans faute grammaticale."
      : "Voici des corrections détaillées pour parfaire votre grammaire et vos structures de questions."
  };
};

export default function QuestionsPractice({ onBack }) {
  const [activeTab, setActiveTab] = useState('est_ce_que');
  const [userAnswers, setUserAnswers] = useState({});
  const [validationResults, setValidationResults] = useState({});
  const [focusedInputId, setFocusedInputId] = useState(null);

  // Writing Prompt State
  const [writingText, setWritingText] = useState("");
  const [writingFeedback, setWritingFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  const currentActivity = QUESTIONS_ACTIVITIES.find(act => act.id === activeTab);

  const handleInputChange = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleFocus = (id) => {
    setFocusedInputId(id);
  };

  const handleInsertAccent = (accent) => {
    if (activeTab === 'writing') {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart || 0;
      const end = el.selectionEnd || 0;
      const currentVal = writingText;
      const newVal = currentVal.slice(0, start) + accent + currentVal.slice(end);
      if (newVal.length <= 250) {
        setWritingText(newVal);
      }
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + accent.length, start + accent.length);
      }, 0);
      return;
    }

    if (!focusedInputId) return;
    const inputEl = document.getElementById(focusedInputId);
    if (!inputEl) return;

    const start = inputEl.selectionStart || 0;
    const end = inputEl.selectionEnd || 0;
    const currentValue = userAnswers[focusedInputId] || '';
    const newValue = currentValue.substring(0, start) + accent + currentValue.substring(end);

    handleInputChange(focusedInputId, newValue);

    setTimeout(() => {
      inputEl.focus();
      inputEl.setSelectionRange(start + accent.length, start + accent.length);
    }, 0);
  };

  const sanitize = (str) => {
    if (!str) return '';
    return str.trim()
              .toLowerCase()
              .replace(/\s+/g, ' ')
              .replace(/[?.,!]$/, '')
              .replace(/[«»'"’‘]/g, '')
              .trim();
  };

  const handleVerify = (activityId) => {
    const activity = QUESTIONS_ACTIVITIES.find(act => act.id === activityId);
    if (!activity) return;

    let score = 0;
    const results = {};

    activity.questions.forEach((q) => {
      const uAns = userAnswers[q.id] || '';
      const isCorrect = sanitize(uAns) === sanitize(q.answer);
      if (isCorrect) score++;
      results[q.id] = {
        isCorrect,
        expected: q.answer,
        actual: uAns
      };
    });

    setValidationResults(prev => ({
      ...prev,
      [activityId]: {
        isChecked: true,
        score,
        results
      }
    }));
  };

  const handleReset = (activityId) => {
    setValidationResults(prev => {
      const copy = { ...prev };
      delete copy[activityId];
      return copy;
    });

    const activity = QUESTIONS_ACTIVITIES.find(act => act.id === activityId);
    if (activity) {
      setUserAnswers(prev => {
        const copy = { ...prev };
        activity.questions.forEach(q => {
          delete copy[q.id];
        });
        return copy;
      });
    }
  };

  const handleWritingSubmit = async () => {
    if (!writingText.trim() || loading) return;

    setLoading(true);
    setError(null);
    setWritingFeedback(null);

    const promptText = "Dialogue de questions: Rédigez une conversation courte (au moins 3 répliques) entre deux élèves. Une personne doit poser des questions à l'autre en variant les registres (l'intonation, « est-ce que » et l'inversion sujet-verbe) et en utilisant au moins un mot interrogatif.";

    try {
      const response = await fetch('/api/writing-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: writingText.trim(),
          prompt: promptText
        })
      });

      const textRes = await response.text();
      
      // If we receive an HTML page (such as Vite SPA fallback in local dev), fall back to client-side checker
      if (textRes.trim().startsWith("<!DOCTYPE") || textRes.trim().startsWith("<html")) {
        const localFeedback = localAnalyzeText(writingText.trim());
        setWritingFeedback(localFeedback);
        return;
      }

      let data;
      try {
        data = JSON.parse(textRes);
      } catch (parseErr) {
        const localFeedback = localAnalyzeText(writingText.trim());
        setWritingFeedback(localFeedback);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite lors de l'analyse.");
      }

      // Add local question requirements checklist to the Gemini feedback object
      const localQFeedback = localAnalyzeText(writingText.trim());
      data.questionRequirements = localQFeedback.questionRequirements;
      
      setWritingFeedback(data);
    } catch (err) {
      console.error(err);
      // Fallback
      const localFeedback = localAnalyzeText(writingText.trim());
      setWritingFeedback(localFeedback);
    } finally {
      setLoading(false);
    }
  };

  const handleWritingReset = () => {
    setWritingText("");
    setWritingFeedback(null);
    setError(null);
  };

  return (
    <div className="reprise-practice-container animate-in">
      <style>{STYLE_BLOCK}</style>
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-black/5 pb-4 w-full">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack} 
              className="deck-nav-btn"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', border: '1px solid rgba(0,0,0,0.15)', background: 'white' }}
            >
              ← Retour
            </button>
          )}
          <div>
            <h3 className="reprise-title">Poser des Questions</h3>
            <p className="reprise-desc">
              Pratiquez les structures pour former des questions avec l'intonation, « est-ce que », l'inversion et les mots interrogatifs.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation bar */}
      <div className="reprise-tabs-nav">
        {QUESTIONS_ACTIVITIES.map(act => (
          <button
            key={act.id}
            onClick={() => {
              setActiveTab(act.id);
              setFocusedInputId(null);
            }}
            className={`reprise-tab-btn ${activeTab === act.id ? 'active' : ''}`}
          >
            {act.title.split(' : ')[0]}
          </button>
        ))}
      </div>

      {activeTab === 'writing' ? (
        /* Activité 4: Production Écrite Dialoguée */
        <div className="flex flex-col gap-4 mt-4 animate-in">
          <div className="reprise-header">
            <h4 style={{ color: '#1e293b', fontWeight: 800, margin: 0 }}>{currentActivity.title}</h4>
            <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{currentActivity.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Panel: Prompt area */}
            <div className="lg:col-span-6 wp-panel flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <h4 className="wp-section-title">
                    Sujet d'écriture (Registre de questions)
                  </h4>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                  <h5 className="wp-prompt-title">Créer un dialogue interrogatif</h5>
                  <p className="wp-prompt-text">
                    Rédigez une conversation courte (au moins 3 répliques) entre deux élèves. Une personne doit poser des questions à l'autre en variant les registres (l'intonation, « est-ce que » et l'inversion sujet-verbe) et en utilisant au moins un mot interrogatif.
                  </p>
                </div>

                {/* Accent Panel */}
                <div className="mb-2">
                  <div className="wp-accent-title">
                    Accents utiles :
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ACCENTS.map((char) => (
                      <button
                        key={char}
                        onClick={() => handleInsertAccent(char)}
                        className="accent-key-btn"
                        disabled={loading}
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative mt-2">
                  <textarea
                    ref={textareaRef}
                    value={writingText}
                    onChange={(e) => {
                      if (e.target.value.length <= 250) setWritingText(e.target.value);
                    }}
                    placeholder="Écrivez le dialogue ici... (ex: — Salut ! Est-ce que tu vas bien ? — Oui, et toi ? As-tu ton livre de français ?)"
                    className="wp-textarea"
                    rows="6"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={loading}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-slate-500 font-mono">
                    {writingText.length} / 250 caract.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                <button
                  onClick={handleWritingReset}
                  className="wp-secondary-btn"
                  disabled={loading}
                >
                  Effacer
                </button>
                <button
                  onClick={handleWritingSubmit}
                  disabled={loading || !writingText.trim()}
                  className="wp-primary-btn"
                >
                  <Send size={14} />
                  {loading ? "Analyse en cours..." : "Soumettre pour correction"}
                </button>
              </div>
            </div>

            {/* Right Panel: Feedback area */}
            <div className="lg:col-span-6 wp-panel flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <h4 className="wp-section-title">
                    Rapport de Correction Pédagogique
                  </h4>
                </div>

                {error && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-50 text-red-800 flex items-center gap-2 mb-4 text-xs font-semibold">
                    <AlertTriangle size={18} className="text-red-500" />
                    <p>{error}</p>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="wp-loader" />
                    <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>Gemini analyse votre grammaire, accords et orthographe...</p>
                  </div>
                )}

                {!writingFeedback && !loading && (
                  <div className="text-center py-16">
                    <HelpCircle size={40} className="mx-auto opacity-40 mb-3" style={{ color: '#64748b' }} />
                    <p style={{ color: '#475569', fontWeight: 650, fontSize: '0.875rem', margin: 0 }}>Aucun texte soumis pour le moment.</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem', margin: 0 }}>Rédigez votre réponse et cliquez sur Soumettre pour recevoir vos corrections.</p>
                  </div>
                )}

                {writingFeedback && !loading && (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    
                    {/* General feedback */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span style={{ fontSize: '10px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Retour général</span>
                      <p style={{ fontSize: '0.75rem', color: '#1e293b', lineHeight: 1.5, fontWeight: 600, fontStyle: 'italic', margin: 0 }}>
                        "{writingFeedback.generalFeedback}"
                      </p>
                    </div>

                    {/* Perfect work check */}
                    {writingFeedback.isValid && (
                      <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-50 text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.125rem' }}>Zéro faute !</span>
                          <p style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 500, margin: 0 }}>Excellent travail ! Votre orthographe et accords sont corrects.</p>
                        </div>
                      </div>
                    )}

                    {/* Question Requirements status checklist */}
                    {writingFeedback.questionRequirements && writingFeedback.questionRequirements.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Objectifs Grammaticaux</span>
                        {writingFeedback.questionRequirements.map((req, idx) => {
                          const isSuccess = req.status === "success";
                          const isWarning = req.status === "warning";
                          return (
                            <div key={idx} className={`p-2.5 rounded-lg border text-xs flex gap-2 items-center ${
                              isSuccess ? 'border-emerald-500/20 bg-emerald-50 text-emerald-800' :
                              isWarning ? 'border-red-500/20 bg-red-50 text-red-800' : 'border-slate-200 bg-slate-50 text-slate-700'
                            }`}>
                              {isSuccess ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className={isWarning ? "text-red-500" : "text-sky-500"} />}
                              <span style={{ fontWeight: 650, color: '#1e293b' }}>{req.msg}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Verbs feedback */}
                    {writingFeedback.verbAgreements && writingFeedback.verbAgreements.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Accords de verbes (présent)</span>
                        {writingFeedback.verbAgreements.map((err, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-red-500/10 bg-red-50/50 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span style={{ fontWeight: 650, color: '#991b1b' }}>Sujet : « {err.subject} »</span>
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                            </div>
                            <p style={{ color: '#475569', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>{err.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Adjectives feedback */}
                    {writingFeedback.adjectiveAgreements && writingFeedback.adjectiveAgreements.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Accord des adjectifs</span>
                        {writingFeedback.adjectiveAgreements.map((err, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-orange-500/10 bg-orange-50/50 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span style={{ fontWeight: 650, color: '#9a3412' }}>Nom : « {err.noun} »</span>
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                            </div>
                            <p style={{ color: '#475569', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>{err.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Noun Genders feedback */}
                    {writingFeedback.nounGenders && writingFeedback.nounGenders.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Genre des noms & articles</span>
                        {writingFeedback.nounGenders.map((err, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-amber-500/10 bg-amber-50/50 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                            </div>
                            <p style={{ color: '#475569', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>{err.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Spelling feedback */}
                    {writingFeedback.spellingErrors && writingFeedback.spellingErrors.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Orthographe</span>
                        {writingFeedback.spellingErrors.map((err, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-blue-500/10 bg-blue-50/50 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                            </div>
                            <p style={{ color: '#475569', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>{err.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Word Choices feedback */}
                    {writingFeedback.wordChoices && writingFeedback.wordChoices.length > 0 && (
                      <div className="space-y-2">
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Vocabulaire & Prépositions</span>
                        {writingFeedback.wordChoices.map((err, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-purple-500/10 bg-purple-50/50 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{err.error}</span>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>➔ {err.correction}</span>
                            </div>
                            <p style={{ color: '#475569', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>{err.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>

              <div style={{ fontSize: '10px', color: '#475569', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                💡 Révisez l'intonation, « est-ce que » et l'inversion dans l'onglet "Grammaire" !
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Gap fill worksheets (Activités 1, 2, 3) */
        <div className="flex flex-col gap-4 mt-4">
          <div className="reprise-header">
            <h4 style={{ color: '#1e293b', fontWeight: 800, margin: 0 }}>{currentActivity.title}</h4>
            <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{currentActivity.description}</p>
          </div>

          {/* Accent Panel */}
          <div className="reprise-accent-bar">
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5a6c7d', marginRight: '0.5rem' }}>Accents :</span>
            {['é', 'è', 'à', 'ù', 'ç', 'â', 'ê', 'î', 'ô', 'û', 'ë', 'ï', 'ü', 'œ', 'É', 'È', 'À', 'Ç', '-'].map(acc => (
              <button
                key={acc}
                type="button"
                className="reprise-accent-btn"
                onClick={() => handleInsertAccent(acc)}
                disabled={!focusedInputId}
                title={focusedInputId ? `Insérer ${acc}` : "Sélectionnez une case de réponse d'abord"}
              >
                {acc}
              </button>
            ))}
          </div>

          {/* Questions Grid */}
          <div className="reprise-questions-list">
            {currentActivity.questions.map((q, idx) => {
              const isChecked = validationResults[currentActivity.id]?.isChecked;
              const result = validationResults[currentActivity.id]?.results?.[q.id];
              
              let inputClass = "";
              if (isChecked) {
                inputClass = result.isCorrect ? "correct" : "incorrect";
              }

              return (
                <div key={q.id} className="reprise-question-card">
                  <div className="reprise-question-content">
                    <span className="reprise-number-badge">{idx + 1}</span>
                    <span>{q.textBefore}</span>
                    <input
                      id={q.id}
                      type="text"
                      value={userAnswers[q.id] || ""}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      onFocus={() => handleFocus(q.id)}
                      disabled={isChecked}
                      className={`reprise-input ${inputClass}`}
                      style={{ minWidth: '320px' }}
                      placeholder="..."
                      autoComplete="off"
                    />
                    <span>{q.textAfter}</span>
                    {idx === 0 && <span className="reprise-hint-pill">Indice: {q.hint}</span>}
                  </div>

                  {isChecked && !result.isCorrect && (
                    <div className="reprise-feedback-row">
                      <XCircle size={16} />
                      <span>Correction : la bonne réponse est <span className="reprise-correct-ans">{result.expected}</span></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Activity Actions Row */}
          <div className="reprise-actions">
            <div className="flex gap-2">
              {!validationResults[currentActivity.id]?.isChecked ? (
                <button
                  onClick={() => handleVerify(currentActivity.id)}
                  className="deck-nav-btn"
                  style={{ background: '#0284c7', color: 'white', border: 'none' }}
                >
                  <CheckCircle2 size={16} />
                  Vérifier les réponses
                </button>
              ) : (
                <button
                  onClick={() => handleReset(currentActivity.id)}
                  className="deck-nav-btn"
                  style={{ background: 'white', color: '#5a6c7d' }}
                >
                  <RefreshCw size={16} />
                  Recommencer l'activité
                </button>
              )}
            </div>

            {validationResults[currentActivity.id]?.isChecked && (
              <div className="reprise-score-badge">
                <Award size={18} />
                <span>Score : {validationResults[currentActivity.id].score} / {currentActivity.questions.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const STYLE_BLOCK = `
  .wp-panel {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 18px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .wp-section-title {
    color: #1e3b8b !important;
    font-size: 0.75rem !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    margin: 0 !important;
  }
  
  .wp-prompt-title {
    color: #1e3b8b !important;
    font-size: 0.875rem !important;
    font-weight: 800 !important;
    margin-bottom: 0.25rem !important;
    margin-top: 0 !important;
  }

  .wp-prompt-text {
    color: #334155 !important;
    font-size: 0.75rem !important;
    font-weight: 600 !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  .wp-accent-title {
    color: #1e3b8b !important;
    font-size: 0.75rem !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 0.375rem !important;
    margin-top: 0 !important;
  }
  
  .wp-textarea {
    width: 100%;
    background: #fafaf9;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    color: #2c3e50;
    padding: 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    outline: none;
    resize: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .wp-textarea:focus {
    border-color: #0284c7;
  }

  .accent-key-btn {
    width: 32px;
    height: 32px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    color: #334155;
    font-size: 0.95rem;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }
  .accent-key-btn:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
  }

  .wp-primary-btn {
    background: #0284c7;
    color: white;
    font-weight: bold;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.8rem;
  }
  .wp-primary-btn:hover {
    background: #0369a1;
  }
  .wp-primary-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wp-secondary-btn {
    background: white;
    color: #5a6c7d;
    font-weight: bold;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.8rem;
  }
  .wp-secondary-btn:hover {
    background: #f8fafc;
  }

  .wp-loader {
    width: 32px;
    height: 32px;
    border: 3.5px solid rgba(2, 132, 199, 0.2);
    border-top-color: #0284c7;
    border-radius: 50%;
    animation: wp-spin 1s infinite linear;
  }

  @keyframes wp-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
