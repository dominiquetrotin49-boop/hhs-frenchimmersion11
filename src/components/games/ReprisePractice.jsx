import React, { useState, useEffect } from 'react';
import { CheckCircle2, RefreshCw, XCircle, Award } from 'lucide-react';
import WritingPrompt from './WritingPrompt';
import './ReprisePractice.css';

const REPRISE_ACTIVITIES = [
  {
    id: 'pronoms',
    title: 'Activité 1 : Les pronoms (DOP/IOP)',
    description: 'Remplacez les mots soulignés ou complétez avec le pronom correct (le, la, les, lui, leur, en, y) adapté au niveau intermédiaire.',
    questions: [
      { id: 'pr_1', textBefore: "Je donne le stylo à Paul. -> Je ", textAfter: " donne le stylo.", hint: "lui / le", answer: "lui" },
      { id: 'pr_2', textBefore: "Tu aimes les croissants. -> Tu ", textAfter: " aimes.", hint: "les / en", answer: "les" },
      { id: 'pr_3', textBefore: "Nous répondons à la question. -> Nous ", textAfter: " répondons.", hint: "y / en", answer: "y" },
      { id: 'pr_4', textBefore: "Elle parle à son amie. -> Elle ", textAfter: " parle.", hint: "lui / la", answer: "lui" },
      { id: 'pr_5', textBefore: "Ils prennent du gâteau. -> Ils ", textAfter: " prennent.", hint: "en / le", answer: "en" },
      { id: 'pr_6', textBefore: "Vous pensez aux examens. -> Vous ", textAfter: " pensez.", hint: "y / les", answer: "y" },
      { id: 'pr_7', textBefore: "Je prête ma voiture à mes parents. -> Je ", textAfter: " prête ma voiture.", hint: "leur / lui", answer: "leur" },
      { id: 'pr_8', textBefore: "Tu as écrit la lettre. -> Tu ", textAfter: " as écrite.", hint: "l' / la", answer: "l'" },
      { id: 'pr_9', textBefore: "Elle adore sa nouvelle école. -> Elle ", textAfter: " adore.", hint: "l' / la", answer: "l'" },
      { id: 'pr_10', textBefore: "Nous achetons des pommes. -> Nous ", textAfter: " achetons.", hint: "en / les", answer: "en" },
      { id: 'pr_11', textBefore: "Il explique le problème aux élèves. -> Il ", textAfter: " explique le problème.", hint: "leur / lui", answer: "leur" },
      { id: 'pr_12', textBefore: "Je réponds à ma mère. -> Je ", textAfter: " réponds.", hint: "lui / y", answer: "lui" },
      { id: 'pr_13', textBefore: "Tu habites en France. -> Tu ", textAfter: " habites.", hint: "y / en", answer: "y" },
      { id: 'pr_14', textBefore: "Nous achetons cette maison. -> Nous ", textAfter: " achetons.", hint: "l' / la", answer: "l'" },
      { id: 'pr_15', textBefore: "Vous vendez vos livres. -> Vous ", textAfter: " vendez.", hint: "les / en", answer: "les" },
      { id: 'pr_16', textBefore: "Ils téléphonent à leurs cousins. -> Ils ", textAfter: " téléphonent.", hint: "leur / les", answer: "leur" },
      { id: 'pr_17', textBefore: "Je bois du café. -> J'", textAfter: " bois.", hint: "en / y", answer: "en" },
      { id: 'pr_18', textBefore: "Elle pense à ses vacances. -> Elle ", textAfter: " pense.", hint: "y / les", answer: "y" },
      { id: 'pr_19', textBefore: "Nous écoutons la radio. -> Nous ", textAfter: " écoutons.", hint: "l' / la", answer: "l'" },
      { id: 'pr_20', textBefore: "Tu rends les devoirs au prof. -> Tu ", textAfter: " rends les devoirs.", hint: "lui / le", answer: "lui" }
    ]
  },
  {
    id: 'etre_avoir',
    title: 'Activité 2 : Être & Avoir au présent',
    description: 'Complétez les phrases avec le verbe ÊTRE ou AVOIR conjugué au présent de l\'indicatif.',
    questions: [
      { id: 'ea_1', textBefore: "Nous ", textAfter: " ravis de vous accueillir chez nous ce soir.", hint: "être", answer: "sommes" },
      { id: 'ea_2', textBefore: "Est-ce que tu ", textAfter: " le temps de m'aider avec mes révisions ?", hint: "avoir", answer: "as" },
      { id: 'ea_3', textBefore: "Ils ", textAfter: " de la chance d'étudier le français dans cette école.", hint: "avoir", answer: "ont" },
      { id: 'ea_4', textBefore: "Je ", textAfter: " persuadé que l'indépendance journalistique est essentielle.", hint: "être", answer: "suis" },
      { id: 'ea_5', textBefore: "Vous ", textAfter: " très courageux de défendre vos propres idées.", hint: "être", answer: "êtes" },
      { id: 'ea_6', textBefore: "Elle ", textAfter: " une véritable passion pour la liberté de la presse.", hint: "avoir", answer: "a" },
      { id: 'ea_7', textBefore: "Le professeur ", textAfter: " disponible après la classe pour répondre aux questions.", hint: "être", answer: "est" },
      { id: 'ea_8', textBefore: "Nous ", textAfter: " besoin de plus de transparence de la part du gouvernement.", hint: "avoir", answer: "avons" },
      { id: 'ea_9', textBefore: "Vous ", textAfter: " tout à fait raison de poser ces questions importantes.", hint: "avoir", answer: "avez" },
      { id: 'ea_10', textBefore: "Je ", textAfter: " l'impression que l'opinion publique commence à réagir.", hint: "avoir", answer: "ai" },
      { id: 'ea_11', textBefore: "Tu ", textAfter: " toujours prêt à relever de nouveaux défis académiques.", hint: "être", answer: "es" },
      { id: 'ea_12', textBefore: "Les suspects ", textAfter: " innocents jusqu'à ce que leur culpabilité soit prouvée.", hint: "être", answer: "sont" },
      { id: 'ea_13', textBefore: "Elle ", textAfter: " canadienne, mais elle habite à Paris depuis deux ans.", hint: "être", answer: "est" },
      { id: 'ea_14', textBefore: "Ils ", textAfter: " impatients de lire les corrections du travail d'écriture.", hint: "être", answer: "sont" },
      { id: 'ea_15', textBefore: "Nous ", textAfter: " conscients des difficultés de ce projet de recherche.", hint: "être", answer: "sommes" },
      { id: 'ea_16', textBefore: "Vous ", textAfter: " attentifs aux besoins de vos camarades de classe.", hint: "être", answer: "êtes" },
      { id: 'ea_17', textBefore: "J'", textAfter: " envie de rédiger un article d'investigation intéressant.", hint: "avoir", answer: "ai" },
      { id: 'ea_18', textBefore: "Tu ", textAfter: " dix-sept ans cette année, c'est l'âge idéal.", hint: "avoir", answer: "as" },
      { id: 'ea_19', textBefore: "Elles ", textAfter: " peur de la censure appliquée par ce régime autoritaire.", hint: "avoir", answer: "ont" },
      { id: 'ea_20', textBefore: "Le président ", textAfter: " le devoir de respecter la charte des droits humains.", hint: "avoir", answer: "a" }
    ]
  },
  {
    id: 'present',
    title: 'Activité 3 : Les verbes au présent (réguliers & irréguliers)',
    description: 'Conjuguez les verbes entre parenthèses au présent de l\'indicatif.',
    questions: [
      { id: 'v_1', textBefore: "Nous ", textAfter: " (faire) des recherches sur l'indépendance de la presse.", hint: "faire", answer: "faisons" },
      { id: 'v_2', textBefore: "Tu ", textAfter: " (vouloir) écrire un paragraphe au présent de l'indicatif.", hint: "vouloir", answer: "veux" },
      { id: 'v_3', textBefore: "Ils ", textAfter: " (prendre) le bus de ramassage scolaire tous les matins.", hint: "prendre", answer: "prennent" },
      { id: 'v_4', textBefore: "Je ", textAfter: " (venir) de terminer la lecture de ce roman captivant.", hint: "venir", answer: "viens" },
      { id: 'v_5', textBefore: "Vous ", textAfter: " (pouvoir) choisir le héros qui vous inspire le plus.", hint: "pouvoir", answer: "pouvez" },
      { id: 'v_6', textBefore: "Elle ", textAfter: " (choisir) d'étudier l'histoire de la censure moderne.", hint: "choisir", answer: "choisit" },
      { id: 'v_7', textBefore: "Nous ", textAfter: " (aller) à la bibliothèque municipale pour travailler.", hint: "aller", answer: "allons" },
      { id: 'v_8', textBefore: "Tu ", textAfter: " (devoir) vérifier tes sources avant d'écrire l'article.", hint: "devoir", answer: "dois" },
      { id: 'v_9', textBefore: "Je ", textAfter: " (rendre) visite à mes cousins pendant le week-end.", hint: "rendre", answer: "rends" },
      { id: 'v_10', textBefore: "Vous ", textAfter: " (faire) des efforts remarquables pour progresser.", hint: "faire", answer: "faites" },
      { id: 'v_11', textBefore: "Ils ", textAfter: " (comprendre) parfaitement l'importance de ce débat.", hint: "comprendre", answer: "comprennent" },
      { id: 'v_12', textBefore: "Elle ", textAfter: " (dire) toujours la vérité dans ses articles d'opinion.", hint: "dire", answer: "dit" },
      { id: 'v_13', textBefore: "Nous ", textAfter: " (écrire) un compte rendu sur le débat de la veille.", hint: "écrire", answer: "écrivons" },
      { id: 'v_14', textBefore: "Tu ", textAfter: " (finir) cet exercice avant de passer à l'activité d'écriture.", hint: "finir", answer: "finis" },
      { id: 'v_15', textBefore: "Je ", textAfter: " (savoir) comment accorder les participes passés.", hint: "savoir", answer: "sais" },
      { id: 'v_16', textBefore: "Vous ", textAfter: " (vendre) des abonnements pour le journal étudiant.", hint: "vendre", answer: "vendez" },
      { id: 'v_17', textBefore: "Ils ", textAfter: " (vouloir) s'impliquer activement dans la vie associative.", hint: "vouloir", answer: "veulent" },
      { id: 'v_18', textBefore: "Elle ", textAfter: " (mettre) de l'ordre dans ses notes de cours de français.", hint: "mettre", answer: "met" },
      { id: 'v_19', textBefore: "Tu ", textAfter: " (répondre) à la lettre ouverte du rédacteur en chef.", hint: "répondre", answer: "réponds" },
      { id: 'v_20', textBefore: "Nous ", textAfter: " (sortir) de la salle de classe après la sonnerie.", hint: "sortir", answer: "sortons" }
    ]
  },
  {
    id: 'writing',
    title: 'Activité 4 : Atelier d\'Écriture',
    description: 'Entraînez-vous à rédiger au présent et recevez des corrections de grammaire et d\'accords immédiates.',
    questions: []
  },
  {
    id: 'negations',
    title: 'Activité 5 : Négations',
    description: "Complétez chaque phrase avec l'expression négative qui convient le mieux selon le contexte : ne… pas | ne… jamais | ne… plus | ne… rien | ne… aucun(e) | ne… personne. (N'oubliez pas d'élider ne en n' devant une voyelle ou un h muet si nécessaire.)",
    dualBlank: true,
    questions: [
      { id: 'n_1', textBefore: "Julien adorait le chocolat quand il était petit, mais maintenant il", textMiddle: "en mange", textAfter: ".", hint: "ne… pas | ne… jamais | ne… plus | ne… rien | ne… aucun(e) | ne… personne", answer1: "n'", answer2: "plus" },
      { id: 'n_2', textBefore: "La salle d'interrogatoire est complètement vide ; il", textMiddle: "y a", textAfter: "à l'intérieur.", hint: "", answer1: "n'", answer2: "rien" },
      { id: 'n_3', textBefore: "Je cherche mes clés depuis ce matin, mais je", textMiddle: "les trouve", textAfter: ".", hint: "", answer1: "ne", answer2: "pas" },
      { id: 'n_4', textBefore: "Claire a très peur de l'avion, donc elle", textMiddle: "a", textAfter: "voyagé en dehors du pays.", hint: "", answer1: "n'", answer2: "jamais" },
      { id: 'n_5', textBefore: "L'inspecteur a fouillé la maison de fond en comble, mais il", textMiddle: "a trouvé", textAfter: "indice.", hint: "", answer1: "n'", answer2: "aucun" },
      { id: 'n_6', textBefore: "Tu as faim ? Non merci, je", textMiddle: "veux", textAfter: "manger avant le dîner.", hint: "", answer1: "ne", answer2: "rien" },
      { id: 'n_7', textBefore: "Marc a déménagé le mois dernier ; il", textMiddle: "habite", textAfter: "dans ce quartier.", hint: "", answer1: "n'", answer2: "plus" },
      { id: 'n_8', textBefore: "Malgré ses nombreuses recherches, elle", textMiddle: "a", textAfter: "doute sur la culpabilité du suspect.", hint: "", answer1: "n'", answer2: "aucun" },
      { id: 'n_9', textBefore: "C'est un secret absolu : je", textMiddle: "ai parlé de cette affaire à", textAfter: ".", hint: "", answer1: "n'", answer2: "personne" },
      { id: 'n_10', textBefore: "Nous", textMiddle: "avons", textAfter: "compris à cette consigne ; pouvez-vous la réexpliquer ?", hint: "", answer1: "n'", answer2: "rien" },
      { id: 'n_11', textBefore: "Elle a une mémoire excellente : elle", textMiddle: "oublie", textAfter: "un anniversaire.", hint: "", answer1: "n'", answer2: "jamais" },
      { id: 'n_12', textBefore: "Le détective a interrogé tout le monde, mais", textMiddle: "n'a voulu témoigner.", textAfter: "", hint: "", answer1: "personne", answer2: "" },
      { id: 'n_13', textBefore: "Ce magasin a fait faillite ; il", textMiddle: "est", textAfter: "ouvert le week-end.", hint: "", answer1: "n'", answer2: "plus" },
      { id: 'n_14', textBefore: "Vous", textMiddle: "avez fait", textAfter: "erreur dans cet exercice de grammaire, bravo !", hint: "", answer1: "n'", answer2: "aucune" },
      { id: 'n_15', textBefore: "Je suis fatigué ce soir, je", textMiddle: "ai", textAfter: "envie de sortir.", hint: "", answer1: "n'", answer2: "aucune" },
      { id: 'n_16', textBefore: "Dans le coffre-fort abandonné, les policiers", textMiddle: "ont découvert", textAfter: ".", hint: "", answer1: "n'", answer2: "rien" },
      { id: 'n_17', textBefore: "Sophie est très timide ; elle", textMiddle: "prend", textAfter: "la parole en public.", hint: "", answer1: "ne", answer2: "jamais" },
      { id: 'n_18', textBefore: "Il fait tellement noir dans ce couloir que je", textMiddle: "vois", textAfter: ".", hint: "", answer1: "ne", answer2: "rien" },
      { id: 'n_19', textBefore: "Après leur dispute, ils", textMiddle: "se parlent", textAfter: "du tout.", hint: "", answer1: "ne", answer2: "plus" },
      { id: 'n_20', textBefore: "", textMiddle: "n'est venu à la réunion ce matin ; la salle était déserte.", textAfter: "", hint: "", answer1: "Personne", answer2: "" }
    ]
  }
];

export default function ReprisePractice({ onBack }) {
  const [activeTab, setActiveTab] = useState('pronoms');
  const [userAnswers, setUserAnswers] = useState({});
  const [validationResults, setValidationResults] = useState({});
  const [focusedInputId, setFocusedInputId] = useState(null);

  const currentActivity = REPRISE_ACTIVITIES.find(act => act.id === activeTab);

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
    if (!focusedInputId) return;
    const inputEl = document.getElementById(focusedInputId);
    if (!inputEl) return;

    const start = inputEl.selectionStart || 0;
    const end = inputEl.selectionEnd || 0;
    const currentValue = userAnswers[focusedInputId] || '';
    const newValue = currentValue.substring(0, start) + accent + currentValue.substring(end);

    handleInputChange(focusedInputId, newValue);

    // Keep focus and restore selection position
    setTimeout(() => {
      inputEl.focus();
      inputEl.setSelectionRange(start + accent.length, start + accent.length);
    }, 0);
  };

  const handleVerify = (activityId) => {
    const activity = REPRISE_ACTIVITIES.find(act => act.id === activityId);
    if (!activity) return;

    let score = 0;
    const results = {};

    activity.questions.forEach(q => {
      if (activity.dualBlank) {
        const userVal1 = (userAnswers[q.id + '_1'] || '').trim().toLowerCase();
        const userVal2 = (userAnswers[q.id + '_2'] || '').trim().toLowerCase();
        const expectedVal1 = (q.answer1 || '').trim().toLowerCase();
        const expectedVal2 = (q.answer2 || '').trim().toLowerCase();
        const isCorrect = userVal1 === expectedVal1 && userVal2 === expectedVal2;
        if (isCorrect) {
          score++;
        }
        results[q.id] = {
          isCorrect,
          expected: q.answer2 ? `${q.answer1}… ${q.answer2}` : q.answer1
        };
      } else {
        const userVal = (userAnswers[q.id] || '').trim().toLowerCase();
        const expectedVal = q.answer.trim().toLowerCase();
        const isCorrect = userVal === expectedVal;
        if (isCorrect) {
          score++;
        }
        results[q.id] = {
          isCorrect,
          expected: q.answer
        };
      }
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
    const activity = REPRISE_ACTIVITIES.find(act => act.id === activityId);
    if (!activity) return;

    const newUserAnswers = { ...userAnswers };
    activity.questions.forEach(q => {
      delete newUserAnswers[q.id];
      delete newUserAnswers[q.id + '_1'];
      delete newUserAnswers[q.id + '_2'];
    });
    setUserAnswers(newUserAnswers);

    const newValidationResults = { ...validationResults };
    delete newValidationResults[activityId];
    setValidationResults(newValidationResults);
  };

  return (
    <div className="reprise-practice-container">
      {/* Sub-Header / View toggle */}
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
            <h3 className="reprise-title">Exercices de Révision</h3>
            <p className="reprise-desc">
              Pratiquez les pronoms et la conjugaison de révision avant de commencer les unités.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation bar */}
      <div className="reprise-tabs-nav">
        {REPRISE_ACTIVITIES.map(act => (
          <button
            key={act.id}
            onClick={() => {
              setActiveTab(act.id);
              setFocusedInputId(null);
            }}
            className={`reprise-tab-btn ${activeTab === act.id ? 'active' : ''}`}
          >
            {act.title}
          </button>
        ))}
      </div>

      {activeTab === 'writing' ? (
        /* Activité 4: Writing prompt with the same feedback tool */
        <div style={{ marginTop: '1rem' }}>
          <WritingPrompt onBack={onBack} />
        </div>
      ) : (
        /* Activités 1, 2, 3: Gap fill worksheets */
        <div className="flex flex-col gap-4 animate-in">
          <div className="reprise-header">
            <h4 className="text-slate-800" style={{ fontWeight: 800, margin: 0 }}>{currentActivity.title}</h4>
            <p className="text-slate-500" style={{ fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{currentActivity.description}</p>
          </div>

          {/* Accent Panel */}
          <div className="reprise-accent-bar">
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5a6c7d', marginRight: '0.5rem' }}>Accents :</span>
            {['é', 'è', 'à', 'ù', 'ç', 'â', 'ê', 'î', 'ô', 'û', 'ë', 'ï', 'ü', 'œ', 'É', 'È', 'À', 'Ç'].map(acc => (
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
                    {currentActivity.dualBlank ? (
                      <>
                        {q.textBefore && <span>{q.textBefore} </span>}
                        <input
                          id={q.id + '_1'}
                          type="text"
                          value={userAnswers[q.id + '_1'] || ""}
                          onChange={(e) => handleInputChange(q.id + '_1', e.target.value)}
                          onFocus={() => handleFocus(q.id + '_1')}
                          disabled={isChecked}
                          className={`reprise-input ${inputClass}`}
                          placeholder="..."
                          autoComplete="off"
                          style={{ width: '5rem' }}
                        />
                        {q.textMiddle && <span> {q.textMiddle} </span>}
                        {q.answer2 !== "" && (
                          <input
                            id={q.id + '_2'}
                            type="text"
                            value={userAnswers[q.id + '_2'] || ""}
                            onChange={(e) => handleInputChange(q.id + '_2', e.target.value)}
                            onFocus={() => handleFocus(q.id + '_2')}
                            disabled={isChecked}
                            className={`reprise-input ${inputClass}`}
                            placeholder="..."
                            autoComplete="off"
                            style={{ width: '6rem' }}
                          />
                        )}
                        {q.textAfter && <span> {q.textAfter}</span>}
                      </>
                    ) : (
                      <>
                        <span>{q.textBefore}</span>
                        <input
                          id={q.id}
                          type="text"
                          value={userAnswers[q.id] || ""}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          onFocus={() => handleFocus(q.id)}
                          disabled={isChecked}
                          className={`reprise-input ${inputClass}`}
                          placeholder="..."
                          autoComplete="off"
                        />
                        <span>{q.textAfter}</span>
                      </>
                    )}
                    {q.hint && <span className="reprise-hint-pill">Indice : {q.hint}</span>}
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
                  style={{ background: '#4a5d23', color: 'white', border: 'none' }}
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
