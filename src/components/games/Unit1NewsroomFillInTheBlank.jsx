import React, { useState, useRef } from 'react';
import { Newspaper, CheckCircle2, XCircle, HelpCircle, RotateCcw, Send, Sparkles, Award, AlertCircle } from 'lucide-react';
import './Unit1NewsroomFillInTheBlank.css';

const NEWSROOM_DATA = [
  {
    id: 1,
    before: "Pour empêcher la diffusion d'informations compromettantes sur le scandale politique, le régime autoritaire a imposé une stricte ",
    after: " sur tous les journaux nationaux.",
    expectedDisplay: "censure",
    acceptedAnswers: ["censure", "la censure"],
    hint: "Interdiction ou contrôle préalable des publications par une autorité politique.",
    placeholder: "terme journalistique..."
  },
  {
    id: 2,
    before: "Avant de publier un article d'investigation sensible, un journaliste professionnel s'appuie toujours sur ",
    after: " pour garantir l'exactitude de ses révélations.",
    expectedDisplay: "une source fiable",
    acceptedAnswers: ["une source fiable", "source fiable"],
    hint: "Origine d'information digne de confiance, authentifiée et vérifiable.",
    placeholder: "terme journalistique..."
  },
  {
    id: 3,
    before: "Pendant les campagnes électorales, les réseaux sociaux sont souvent inondés de ",
    after: " visant à tromper délibérément les électeurs.",
    expectedDisplay: "désinformation",
    acceptedAnswers: ["désinformation", "la désinformation", "desinformation", "la desinformation"],
    hint: "Diffusion volontaire de fausses nouvelles dans l'intention de manipuler l'opinion.",
    placeholder: "terme journalistique..."
  },
  {
    id: 4,
    before: "En ouvrant le journal ce matin, le regard du lecteur est immédiatement attiré par ",
    after: " imprimé en caractères géants sur toute la largeur de la une.",
    expectedDisplay: "un gros titre",
    acceptedAnswers: ["un gros titre", "gros titre"],
    hint: "Texte saillant et très visible en première page résumant l'information principale.",
    placeholder: "terme journalistique..."
  },
  {
    id: 5,
    before: "Protégée par l'article 19 de la Déclaration universelle des droits de l'homme, ",
    after: " est indispensable au bon fonctionnement d'une société démocratique.",
    expectedDisplay: "la liberté d'expression",
    acceptedAnswers: [
      "la liberté d'expression", "liberté d'expression", 
      "la liberte d'expression", "liberte d'expression",
      "la liberté d’expression", "liberté d’expression",
      "la liberte d’expression", "liberte d’expression"
    ],
    hint: "Droit fondamental d'émettre et de diffuser librement ses idées sans entrave.",
    placeholder: "terme journalistique..."
  },
  {
    id: 6,
    before: "Pour respecter la déontologie journalistique, un reporter d'actualité doit faire preuve de la plus stricte ",
    after: " et ne jamais prendre parti dans son traitement des faits.",
    expectedDisplay: "impartialité",
    acceptedAnswers: [
      "impartialité", "l'impartialité", "l’impartialité",
      "impartialite", "l'impartialite", "l’impartialite"
    ],
    hint: "Absence de parti pris, objectivité et neutralité absolue face aux événements.",
    placeholder: "terme journalistique..."
  },
  {
    id: 7,
    before: "Pour faire découvrir le quotidien des sauveteurs en haute mer, la journaliste a réalisé ",
    after: " immersif sur le terrain pendant deux semaines complètes.",
    expectedDisplay: "un reportage",
    acceptedAnswers: ["un reportage", "reportage"],
    hint: "Enquête ou compte-rendu vivant rédigé directement sur les lieux de l'action.",
    placeholder: "terme journalistique..."
  },
  {
    id: 8,
    before: "Dans la salle des nouvelles, c'est ",
    after: " qui anime la conférence matinale et choisit les articles qui paraîtront en première page.",
    expectedDisplay: "le rédacteur en chef",
    acceptedAnswers: [
      "le rédacteur en chef", "rédacteur en chef",
      "le redacteur en chef", "redacteur en chef"
    ],
    hint: "Dirigeant de la rédaction qui coordonne le travail des journalistes et valide les sujets.",
    placeholder: "terme journalistique..."
  },
  {
    id: 9,
    before: "Face à la propagation éclair des rumeurs en ligne, la règle d'or d'un journaliste rigoureux est de ",
    after: " avant d'envisager la moindre publication.",
    expectedDisplay: "vérifier les faits",
    acceptedAnswers: ["vérifier les faits", "verifier les faits"],
    hint: "Démarche de recoupement et de fact-checking pour valider l'authenticité d'une information.",
    placeholder: "terme journalistique..."
  },
  {
    id: 10,
    before: "Rappelée dans la Charte de Munich, ",
    after: " interdit formellement aux journalistes de plagier, de diffamer ou d'accepter des rétributions financières occultes.",
    expectedDisplay: "l'éthique déontologique",
    acceptedAnswers: [
      "l'éthique déontologique", "éthique déontologique",
      "l’éthique déontologique", "l'ethique deontologique",
      "ethique deontologique", "la déontologie", "déontologie", "deontologie"
    ],
    hint: "Ensemble des devoirs moraux et des codes de conduite qui guident la profession journalistique.",
    placeholder: "terme journalistique..."
  },
  {
    id: 11,
    before: "Grâce à cette enquête explosive tirée à des centaines de milliers d'exemplaires, ",
    after: " du quotidien a atteint un record historique de ventes ce mois-ci.",
    expectedDisplay: "le tirage",
    acceptedAnswers: ["le tirage", "tirage"],
    hint: "Nombre d'exemplaires imprimés pour une même édition d'un journal ou d'un magazine.",
    placeholder: "terme journalistique..."
  },
  {
    id: 12,
    before: "En révélant avant tous ses concurrents l'accord secret entre les deux multinationales, cette jeune pigiste a signé ",
    after: " retentissant qui a surpris tout le milieu médiatique.",
    expectedDisplay: "un scoop",
    acceptedAnswers: ["un scoop", "scoop"],
    hint: "Information sensationnelle, exclusive et inédite diffusée avant la concurrence.",
    placeholder: "terme journalistique..."
  },
  {
    id: 13,
    before: "Le tribunal a condamné l'hebdomadaire à une lourde amende pour ",
    after: ", après la publication d'allégations mensongères portant atteinte à l'honneur de la magistrate.",
    expectedDisplay: "diffamation",
    acceptedAnswers: ["diffamation", "la diffamation"],
    hint: "Allégation ou accusation publique sans preuve portant atteinte à l'honneur d'une personne.",
    placeholder: "terme journalistique..."
  },
  {
    id: 14,
    before: "Dans les régimes autoritaires, les médias d'État sont transformés en de puissants instruments de ",
    after: " pour façonner la pensée des citoyens et vanter les mérites du chef.",
    expectedDisplay: "propagande",
    acceptedAnswers: ["propagande", "la propagande"],
    hint: "Diffusion organisée de doctrines visant à manipuler et convaincre l'opinion des masses.",
    placeholder: "terme journalistique..."
  },
  {
    id: 15,
    before: "L'atelier d'éducation aux médias aide les lycéens à aiguiser leur ",
    after: " afin de distinguer les analyses argumentées des simples théories du complot.",
    expectedDisplay: "esprit critique",
    acceptedAnswers: ["esprit critique", "l'esprit critique", "l’esprit critique"],
    hint: "Faculté d'analyse rationnelle et de discernement permettant de juger objectivement les informations.",
    placeholder: "terme journalistique..."
  },
  {
    id: 16,
    before: "Dans l'édition du week-end, le journal a ouvert ses colonnes à un collectif de climatologues qui a publié ",
    after: " pour alerter les décideurs sur la crise écologique.",
    expectedDisplay: "une tribune libre",
    acceptedAnswers: ["une tribune libre", "tribune libre"],
    hint: "Espace d'expression offert par un média à un auteur extérieur pour exposer une réflexion.",
    placeholder: "terme journalistique..."
  },
  {
    id: 17,
    before: "La rédaction a envoyé ",
    after: " en zone sinistrée pour transmettre des témoignages directs depuis le cœur de la catastrophe.",
    expectedDisplay: "un envoyé spécial",
    acceptedAnswers: [
      "un envoyé spécial", "envoyé spécial",
      "un envoye special", "envoye special"
    ],
    hint: "Reporter dépêché temporairement par sa rédaction sur les lieux d'un événement majeur.",
    placeholder: "terme journalistique..."
  },
  {
    id: 18,
    before: "L'utilisation de montages vidéo hors contexte constitue une véritable ",
    after: " de l'opinion publique destinée à susciter la peur et l'indignation.",
    expectedDisplay: "manipulation",
    acceptedAnswers: ["manipulation", "la manipulation"],
    hint: "Procédé déloyal visant à orienter artificiellement le jugement ou les émotions du public.",
    placeholder: "terme journalistique..."
  },
  {
    id: 19,
    before: "Malgré la domination croissante des écrans et des flux d'actualité en continu, ",
    after: " conserve un lectorat passionné par la texture du papier et les longs dossiers de fond.",
    expectedDisplay: "la presse écrite",
    acceptedAnswers: [
      "la presse écrite", "presse écrite",
      "la presse ecrite", "presse ecrite"
    ],
    hint: "Ensemble des quotidiens et magazines traditionnels imprimés sur papier.",
    placeholder: "terme journalistique..."
  },
  {
    id: 20,
    before: "Pour protéger ",
    after: " du journal, les journalistes refusent catégoriquement que les actionnaires fortunés dictent le ton ou le choix des enquêtes.",
    expectedDisplay: "l'indépendance éditoriale",
    acceptedAnswers: [
      "l'indépendance éditoriale", "indépendance éditoriale",
      "l’indépendance éditoriale", "l'independance editoriale",
      "independance editoriale"
    ],
    hint: "Autonomie absolue d'une équipe de rédaction à l'égard de toute ingérence extérieure.",
    placeholder: "terme journalistique..."
  }
];

const ACCENT_KEYS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ', "'"];

function normalizeAnswer(str) {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ');
}

export default function Unit1NewsroomFillInTheBlank() {
  const [userAnswers, setUserAnswers] = useState(Array(NEWSROOM_DATA.length).fill(''));
  const [visibleHints, setVisibleHints] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const handleInsertAccent = (char) => {
    const targetIdx = activeInputIndex !== null ? activeInputIndex : 0;
    const inputEl = inputRefs.current[targetIdx];
    const currentVal = userAnswers[targetIdx] || '';

    if (inputEl) {
      const start = inputEl.selectionStart ?? currentVal.length;
      const end = inputEl.selectionEnd ?? currentVal.length;
      const newVal = currentVal.substring(0, start) + char + currentVal.substring(end);

      handleInputChange(targetIdx, newVal);

      // Restore focus and update selection
      setTimeout(() => {
        inputEl.focus();
        inputEl.setSelectionRange(start + char.length, start + char.length);
      }, 10);
    } else {
      handleInputChange(targetIdx, currentVal + char);
    }
  };

  const toggleHint = (index) => {
    setVisibleHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkSingleAnswer = (index) => {
    const userAns = normalizeAnswer(userAnswers[index]);
    if (!userAns) return false;
    const item = NEWSROOM_DATA[index];
    return item.acceptedAnswers.some(ans => normalizeAnswer(ans) === userAns);
  };

  const calculateScore = () => {
    let count = 0;
    NEWSROOM_DATA.forEach((_, idx) => {
      if (checkSingleAnswer(idx)) count++;
    });
    return count;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Scroll smoothly to bottom scorecard
    setTimeout(() => {
      const scorecard = document.getElementById('newsroom-scorecard-section');
      if (scorecard) {
        scorecard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleReset = () => {
    setUserAnswers(Array(NEWSROOM_DATA.length).fill(''));
    setIsSubmitted(false);
    setVisibleHints({});
    setActiveInputIndex(0);
  };

  const handleRetryErrors = () => {
    const updated = [...userAnswers];
    NEWSROOM_DATA.forEach((_, idx) => {
      if (!checkSingleAnswer(idx)) {
        updated[idx] = '';
      }
    });
    setUserAnswers(updated);
    setIsSubmitted(false);
  };

  const filledCount = userAnswers.filter(a => a.trim().length > 0).length;
  const score = calculateScore();

  const getVerdict = (pts) => {
    if (pts >= 19) {
      return {
        stamp: "BON À TIRER — ÉDITION NATIONALE",
        title: "Mention Très Bien — Félicitations de la Rédaction !",
        subtext: "Votre maîtrise des concepts de la presse, de l'éthique déontologique et de la liberté d'expression est exemplaire. Votre dossier est prêt pour la une nationale !",
        color: "#10b981"
      };
    }
    if (pts >= 15) {
      return {
        stamp: "APPROUVÉ SOUS RÉSERVE",
        title: "Bon travail de reportage !",
        subtext: "Vous maîtrisez la majorité des notions essentielles de la presse. Quelques vérifications de sources et votre article sera parfait.",
        color: "#3b82f6"
      };
    }
    if (pts >= 10) {
      return {
        stamp: "ENQUÊTE EN COURS",
        title: "Enquête prometteuse mais incomplète",
        subtext: "Relisez attentivement les indices contextuels et reprenez les termes inexacts pour consolider votre vocabulaire de presse.",
        color: "#f59e0b"
      };
    }
    return {
      stamp: "RELECTURE EXIGÉE",
      title: "Relecture exigée par le Rédacteur en Chef",
      subtext: "Prenez le temps de relire les contextes de chaque phrase et servez-vous de la barre d'accents pour orthographier précisément chaque notion.",
      color: "#ef4444"
    };
  };

  const verdict = getVerdict(score);

  return (
    <div className="newsroom-container">
      {/* Editorial Masthead Banner */}
      <header className="newsroom-masthead">
        <div className="masthead-top">
          <span className="masthead-badge">
            <Newspaper size={14} /> Salle de Rédaction
          </span>
          <span className="badge-classified">Unité 1 : La liberté de la presse</span>
        </div>
        <h2 className="masthead-title">
          <Sparkles className="text-accent" size={28} />
          Textes à Trous : Le Vocabulaire de la Presse en Contexte
        </h2>
        <p className="masthead-desc">
          Rédacteurs et reporters, vingt dépêches officielles comportent des blancs cruciaux.
          Retrouvez le terme journalistique ou civique exact en analysant le contexte de chaque phrase.
          <strong> Aucune banque de mots n'est fournie</strong> : faites appel à vos connaissances et à votre rigueur journalistique !
        </p>
        <div className="masthead-notice">
          <AlertCircle size={18} />
          <span>
            <strong>Consigne :</strong> Tapez le terme directement dans chaque encadré.
            Vous pouvez cliquer sur les touches de la barre d'accents ci-dessous pour insérer les caractères spéciaux français.
          </span>
        </div>
      </header>

      {/* Sticky Accent Bar & Progress Stats */}
      <section className="newsroom-toolbar" aria-label="Barre d'outils typographiques">
        <div className="toolbar-accent-cluster">
          <span className="toolbar-accent-label">
            Clavier d'accents :
          </span>
          {ACCENT_KEYS.map((char) => (
            <button
              key={char}
              type="button"
              className="accent-key-btn"
              onClick={() => handleInsertAccent(char)}
              title={`Insérer « ${char} »`}
            >
              {char}
            </button>
          ))}
        </div>

        <div className="toolbar-stats">
          <span className="stats-counter">
            ✍️ {filledCount} / {NEWSROOM_DATA.length} complétés
          </span>
        </div>
      </section>

      {/* Sentences List */}
      <main className="newsroom-sentences-grid">
        {NEWSROOM_DATA.map((item, idx) => {
          const isCorrect = isSubmitted ? checkSingleAnswer(idx) : null;
          const cardClass = isSubmitted
            ? isCorrect
              ? 'card-correct'
              : 'card-incorrect'
            : activeInputIndex === idx
            ? 'card-focus'
            : '';

          return (
            <article
              key={item.id}
              className={`sentence-dispatch-card ${cardClass}`}
              onClick={() => setActiveInputIndex(idx)}
            >
              <div className="card-meta-bar">
                <span className="card-num-badge">
                  DÉPÊCHE #{String(item.id).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="hint-toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHint(idx);
                  }}
                >
                  <HelpCircle size={14} />
                  {visibleHints[idx] ? "Masquer l'indice" : "💡 Indice"}
                </button>
              </div>

              {visibleHints[idx] && (
                <div className="hint-callout">
                  <strong>Indice du rédacteur :</strong> {item.hint}
                </div>
              )}

              <div className="sentence-context-flow">
                <span>{item.before}</span>
                <input
                  ref={el => inputRefs.current[idx] = el}
                  type="text"
                  className={`newsroom-inline-input ${
                    isSubmitted ? (isCorrect ? 'input-correct' : 'input-incorrect') : ''
                  }`}
                  value={userAnswers[idx]}
                  placeholder={item.placeholder}
                  onFocus={() => setActiveInputIndex(idx)}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  disabled={isSubmitted}
                  aria-label={`Réponse pour dépêche ${item.id}`}
                />
                <span>{item.after}</span>
              </div>

              {isSubmitted && (
                <div className="card-feedback-row">
                  {isCorrect ? (
                    <div className="feedback-status correct">
                      <CheckCircle2 size={18} />
                      <span>Validé par la rédaction !</span>
                    </div>
                  ) : (
                    <div className="feedback-status incorrect">
                      <XCircle size={18} />
                      <span>
                        Correction exigée — Votre saisie : <em>{userAnswers[idx] || '(vide)'}</em>
                      </span>
                    </div>
                  )}

                  {!isCorrect && (
                    <div className="feedback-answer-box">
                      Réponse attendue : <strong>{item.expectedDisplay}</strong>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </main>

      {/* Action Deck */}
      <footer className="newsroom-bottom-actions">
        {!isSubmitted ? (
          <button
            type="button"
            className="btn-newsroom-primary"
            onClick={handleSubmit}
            disabled={filledCount === 0}
          >
            <Send size={18} />
            Vérifier mes réponses ({filledCount}/{NEWSROOM_DATA.length})
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn-newsroom-secondary"
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              Recommencer à zéro
            </button>

            {score < NEWSROOM_DATA.length && (
              <button
                type="button"
                className="btn-newsroom-primary"
                onClick={handleRetryErrors}
              >
                <Award size={18} />
                Corriger uniquement les erreurs ({NEWSROOM_DATA.length - score})
              </button>
            )}
          </>
        )}
      </footer>

      {/* Post-submission Scorecard */}
      {isSubmitted && (
        <section id="newsroom-scorecard-section" className="newsroom-scorecard">
          <div className="scorecard-stamp" style={{ borderColor: verdict.color, color: verdict.color }}>
            {verdict.stamp}
          </div>
          <div className="scorecard-score-big">
            {score} / {NEWSROOM_DATA.length}
          </div>
          <h3 className="scorecard-verdict">{verdict.title}</h3>
          <p className="scorecard-subtext">{verdict.subtext}</p>
          <div className="scorecard-actions">
            <button
              type="button"
              className="btn-newsroom-secondary"
              onClick={handleReset}
            >
              <RotateCcw size={16} /> Réinitialiser
            </button>
            {score < NEWSROOM_DATA.length && (
              <button
                type="button"
                className="btn-newsroom-primary"
                onClick={handleRetryErrors}
              >
                Refaire les erreurs
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
