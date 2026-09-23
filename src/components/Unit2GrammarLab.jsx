import React, { useState, useMemo } from 'react';
import {
  Clock,
  Target,
  Search,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  HelpCircle,
  Shuffle,
  ChevronRight,
  Info,
  Compass,
  Zap,
  RotateCcw
} from 'lucide-react';
import './Unit2GrammarLab.css';

// ==========================================
// DATA BANK PRESERVATION (100% Preserved)
// ==========================================

const IMPARFAIT_VERBS = [
  {
    infinitive: "Aimer (-ER)",
    stem: "aim",
    nousPresent: "aimons",
    type: "Régulier",
    forms: [
      { pronoun: "Je / J'", form: "aimais", ending: "ais" },
      { pronoun: "Tu", form: "aimais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "aimait", ending: "ait" },
      { pronoun: "Nous", form: "aimions", ending: "ions" },
      { pronoun: "Vous", form: "aimiez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "aimaient", ending: "aient" }
    ]
  },
  {
    infinitive: "Finir (-IR)",
    stem: "finiss",
    nousPresent: "finissons",
    type: "Régulier",
    forms: [
      { pronoun: "Je", form: "finissais", ending: "ais" },
      { pronoun: "Tu", form: "finissais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "finissait", ending: "ait" },
      { pronoun: "Nous", form: "finissions", ending: "ions" },
      { pronoun: "Vous", form: "finissiez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "finissaient", ending: "aient" }
    ]
  },
  {
    infinitive: "Mettre (-RE)",
    stem: "mett",
    nousPresent: "mettons",
    type: "Régulier",
    forms: [
      { pronoun: "Je", form: "mettais", ending: "ais" },
      { pronoun: "Tu", form: "mettais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "mettait", ending: "ait" },
      { pronoun: "Nous", form: "mettions", ending: "ions" },
      { pronoun: "Vous", form: "mettiez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "mettaient", ending: "aient" }
    ]
  },
  {
    infinitive: "Être (L'Exception Unique)",
    stem: "ét",
    nousPresent: "sommes (irrégulier)",
    type: "Exception",
    forms: [
      { pronoun: "J'", form: "étais", ending: "ais" },
      { pronoun: "Tu", form: "étais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "était", ending: "ait" },
      { pronoun: "Nous", form: "étions", ending: "ions" },
      { pronoun: "Vous", form: "étiez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "étaient", ending: "aient" }
    ]
  },
  {
    infinitive: "Avoir (Fondation)",
    stem: "av",
    nousPresent: "avons",
    type: "Fondation",
    forms: [
      { pronoun: "J'", form: "avais", ending: "ais" },
      { pronoun: "Tu", form: "avais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "avait", ending: "ait" },
      { pronoun: "Nous", form: "avions", ending: "ions" },
      { pronoun: "Vous", form: "aviez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "avaient", ending: "aient" }
    ]
  },
  {
    infinitive: "Faire (Faux Irrégulier)",
    stem: "fais",
    nousPresent: "faisons",
    type: "Faux Irrégulier",
    forms: [
      { pronoun: "Je", form: "faisais", ending: "ais" },
      { pronoun: "Tu", form: "faisais", ending: "ais" },
      { pronoun: "Il / Elle / On", form: "faisait", ending: "ait" },
      { pronoun: "Nous", form: "faisions", ending: "ions" },
      { pronoun: "Vous", form: "faisiez", ending: "iez" },
      { pronoun: "Ils / Elles", form: "faisaient", ending: "aient" }
    ]
  }
];

const VANDERTRAMP_VERBS = [
  { letter: "D", verb: "Descendre", pp: "descendu", meaning: "to descend / go down" },
  { letter: "R", verb: "Rester", pp: "resté", meaning: "to stay / remain" },
  { letter: "M", verb: "Monter", pp: "monté", meaning: "to climb / go up" },
  { letter: "R", verb: "Retourner", pp: "retourné", meaning: "to return" },
  { letter: "S", verb: "Sortir", pp: "sorti", meaning: "to exit / go out" },
  { letter: "V", verb: "Venir", pp: "venu", meaning: "to come" },
  { letter: "A", verb: "Aller", pp: "allé", meaning: "to go" },
  { letter: "N", verb: "Naître", pp: "né", meaning: "to be born" },
  { letter: "D", verb: "Devenir", pp: "devenu", meaning: "to become" },
  { letter: "E", verb: "Entrer", pp: "entré", meaning: "to enter" },
  { letter: "R", verb: "Rentrer", pp: "rentré", meaning: "to re-enter / go home" },
  { letter: "T", verb: "Tomber", pp: "tombé", meaning: "to fall" },
  { letter: "R", verb: "Revenir", pp: "revenu", meaning: "to come back" },
  { letter: "A", verb: "Arriver", pp: "arrivé", meaning: "to arrive" },
  { letter: "M", verb: "Mourir", pp: "mort", meaning: "to die" },
  { letter: "P", verb: "Partir", pp: "parti", meaning: "to leave" },
  { letter: "+", verb: "Passer", pp: "passé", meaning: "to pass by (sans COD)" }
];

const IRREGULAR_PARTICIPLES = [
  { infinitive: "boire", pp: "bu", example: "J'ai bu un thé vert." },
  { infinitive: "faire", pp: "fait", example: "Tu as fait tes devoirs." },
  { infinitive: "lire", pp: "lu", example: "Elle a lu tout le dossier." },
  { infinitive: "écrire", pp: "écrit", example: "Nous avons écrit un courriel." },
  { infinitive: "prendre", pp: "pris", example: "Vous avez pris l'autobus." },
  { infinitive: "voir", pp: "vu", example: "Ils ont vu un documentaire." },
  { infinitive: "dire", pp: "dit", example: "J'ai dit la vérité." },
  { infinitive: "avoir", pp: "eu", example: "Elle a eu une excellente note." },
  { infinitive: "mettre", pp: "mis", example: "Il a mis son sac sur la table." },
  { infinitive: "pouvoir", pp: "pu", example: "Nous avons pu entrer à temps." }
];

export default function Unit2GrammarLab() {
  // Main Tab: 'passe' (Temps du Passé) or 'pronoms' (Pronoms Compléments)
  const [mainPillar, setMainPillar] = useState('passe');

  // Sub-station
  const [activeStation, setActiveStation] = useState('imparfait');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive controls
  const [selectedImparfaitVerb, setSelectedImparfaitVerb] = useState(0);
  const [vanderSubject, setVanderSubject] = useState('elle'); // il, elle, ils, elles
  const [activeDuelMode, setActiveDuelMode] = useState('story'); // 'story' | 'indicators'
  const [activePronounDemo, setActivePronounDemo] = useState('cod'); // 'cod' | 'coi'
  const [activeRadarStep, setActiveRadarStep] = useState(1);

  // Switch main pillar and set appropriate default station
  const handlePillarChange = (pillar) => {
    setMainPillar(pillar);
    if (pillar === 'passe') {
      setActiveStation('imparfait');
    } else {
      setActiveStation('cod_coi');
    }
  };

  const matchesSearch = (text) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="unit2-grammar-lab">
      {/* ============================================================ */}
      {/* HEADER BANNER */}
      {/* ============================================================ */}
      <div className="lab-header glass-card">
        <div className="lab-header-top">
          <div className="header-meta">
            <span className="campus-badge">
              <Sparkles size={13} className="text-accent" />
              CAMPUS LINGUISTIQUE • DOSSIER 02
            </span>
            <h2 className="lab-title">Le Hub Grammaire : Pronoms & Temps du Passé</h2>
            <p className="lab-subtitle">
              Une architecture claire en deux pôles d'apprentissage : maîtrisez l'art de raconter au passé et l'art de remplacer avec précision grâce aux pronoms.
            </p>
          </div>

          <div className="search-filter-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher une règle, un verbe, un pronom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="search-clear-btn" onClick={() => setSearchTerm('')}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* PRIMARY PILLAR SWITCHER */}
        <div className="pillar-switcher-container">
          <button
            className={`pillar-button ${mainPillar === 'passe' ? 'active-passe' : ''}`}
            onClick={() => handlePillarChange('passe')}
          >
            <div className="pillar-icon-box icon-passe">
              <Clock size={20} />
            </div>
            <div className="pillar-text">
              <span className="pillar-tag">PÔLE 01</span>
              <span className="pillar-title">⏳ Les Temps du Passé</span>
              <span className="pillar-desc">Imparfait • Passé Composé • Narration</span>
            </div>
          </button>

          <button
            className={`pillar-button ${mainPillar === 'pronoms' ? 'active-pronoms' : ''}`}
            onClick={() => handlePillarChange('pronoms')}
          >
            <div className="pillar-icon-box icon-pronoms">
              <Target size={20} />
            </div>
            <div className="pillar-text">
              <span className="pillar-tag">PÔLE 02</span>
              <span className="pillar-title">🎯 La Forteresse des Pronoms</span>
              <span className="pillar-desc">COD • COI • Y & EN • Ordre Strict</span>
            </div>
          </button>
        </div>

        {/* SUB-STATION NAVIGATOR */}
        <div className="station-nav-bar">
          <span className="station-nav-label">
            <Compass size={15} />
            Stations :
          </span>

          {mainPillar === 'passe' ? (
            <div className="station-buttons-group">
              <button
                className={`station-btn ${activeStation === 'imparfait' ? 'active' : ''}`}
                onClick={() => setActiveStation('imparfait')}
              >
                <span>1. L'Imparfait (Le Décor & L'Habitude)</span>
              </button>
              <button
                className={`station-btn ${activeStation === 'pc' ? 'active' : ''}`}
                onClick={() => setActiveStation('pc')}
              >
                <span>2. Le Passé Composé (Avoir, Être & Accords)</span>
              </button>
              <button
                className={`station-btn ${activeStation === 'duel' ? 'active' : ''}`}
                onClick={() => setActiveStation('duel')}
              >
                <span>3. Le Duel Narratif (PC vs Imparfait)</span>
              </button>
            </div>
          ) : (
            <div className="station-buttons-group">
              <button
                className={`station-btn ${activeStation === 'cod_coi' ? 'active' : ''}`}
                onClick={() => setActiveStation('cod_coi')}
              >
                <span>1. Pronoms Directs vs Indirects (COD & COI)</span>
              </button>
              <button
                className={`station-btn ${activeStation === 'yen' ? 'active' : ''}`}
                onClick={() => setActiveStation('yen')}
              >
                <span>2. Les Pronoms Spéciaux (Y & EN)</span>
              </button>
              <button
                className={`station-btn ${activeStation === 'ordre' ? 'active' : ''}`}
                onClick={() => setActiveStation('ordre')}
              >
                <span>3. Le Radar des Doubles Pronoms</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* PÔLE 1 : LES TEMPS DU PASSÉ */}
      {/* ============================================================ */}
      {mainPillar === 'passe' && (
        <div className="pillar-content-area">
          {/* STATION 1: L'IMPARFAIT */}
          {activeStation === 'imparfait' && (
            <div className="station-view animate-fade">
              {/* Educational banner */}
              <div className="pedagogy-banner banner-imparfait">
                <div className="banner-icon-col">
                  <Lightbulb size={24} className="banner-icon" />
                </div>
                <div className="banner-text-col">
                  <h4>La Question Maîtresse de l'Imparfait</h4>
                  <p>
                    L'imparfait répond à la question : <strong>« Que se passait-il au moment où l'action a eu lieu ? »</strong>.
                    C'est le temps du décor, des descriptions physiques ou psychologiques, et des routines du passé.
                  </p>
                </div>
              </div>

              {/* 3 Pillars Visual Cards */}
              <div className="three-pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-num">01</span>
                    <span className="pillar-badge badge-decor">🎨 Le Décor</span>
                  </div>
                  <h5 className="pillar-name">La Description & L'Ambiance</h5>
                  <p className="pillar-rule">
                    Planter le décor dans le passé : météo, état émotionnel, paysage, cadre.
                  </p>
                  <div className="example-bubble">
                    <span className="example-label">Exemples :</span>
                    <p><em>« Il <strong>faisait</strong> beau, les étudiants <strong>étaient</strong> calmes et il y <strong>avait</strong> du vent. »</em></p>
                  </div>
                </div>

                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-num">02</span>
                    <span className="pillar-badge badge-routine">🔄 L'Habitude</span>
                  </div>
                  <h5 className="pillar-name">La Répétition & Routine</h5>
                  <p className="pillar-rule">
                    Une action répétée ou habituelle dans le passé, sans début ni fin précis.
                  </p>
                  <div className="example-bubble">
                    <span className="example-label">Exemples :</span>
                    <p><em>« Tous les matins, Hugo <strong>prenait</strong> son café et <strong>lisait</strong> le journal universitaire. »</em></p>
                  </div>
                </div>

                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-num">03</span>
                    <span className="pillar-badge badge-continue">⏳ L'Action Continue</span>
                  </div>
                  <h5 className="pillar-name">L'Action en Déroulement</h5>
                  <p className="pillar-rule">
                    Ce qui était en train de se passer (action de fond continue) lorsqu'un événement est survenu.
                  </p>
                  <div className="example-bubble">
                    <span className="example-label">Exemples :</span>
                    <p><em>« Je <strong>révisais</strong> pour l'examen de sciences quand le professeur est entré. »</em></p>
                  </div>
                </div>
              </div>

              {/* Formula & Live Generator */}
              <div className="formula-section glass-panel">
                <div className="section-title-row">
                  <Zap size={20} className="text-accent" />
                  <h3>La Formule Magique de l'Imparfait</h3>
                </div>

                <div className="formula-equation-box">
                  <div className="equation-step">
                    <span className="step-tag">Étape 1</span>
                    <span className="step-val">Présent avec <strong>NOUS</strong></span>
                    <span className="step-sub">ex: <em>nous buvons</em></span>
                  </div>
                  <div className="equation-sign">-</div>
                  <div className="equation-step">
                    <span className="step-tag">Étape 2</span>
                    <span className="step-val">Retirer <strong>-ONS</strong></span>
                    <span className="step-sub">radical = <em>buv-</em></span>
                  </div>
                  <div className="equation-sign">+</div>
                  <div className="equation-step highlight-step">
                    <span className="step-tag">Étape 3</span>
                    <span className="step-val">Terminaisons Universelles</span>
                    <span className="step-sub"><strong>-ais, -ais, -ait, -ions, -iez, -aient</strong></span>
                  </div>
                </div>

                {/* Traps Callout */}
                <div className="trap-alert-box">
                  <AlertTriangle size={20} className="text-warning" />
                  <div>
                    <strong>Le Filtre Phonétique (-GER et -CER) :</strong>
                    <div className="trap-content">
                      Pour préserver le son doux du « g » et du « c », on ajoute un « e » ou une cédille « ç » devant <strong>a</strong> :
                      <span className="trap-pill">Manger ➔ Je mang<strong>e</strong>ais, Nous mangions</span>
                      <span className="trap-pill">Commencer ➔ Je commen<strong>ç</strong>ais, Nous commencions</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Conjugation Selector */}
                <div className="interactive-matrix-wrap">
                  <div className="matrix-controls-row">
                    <span className="matrix-title">
                      <BookOpen size={16} />
                      Tableau de Bord des Verbes Clés :
                    </span>
                    <div className="verb-choice-pills">
                      {IMPARFAIT_VERBS.map((v, idx) => (
                        <button
                          key={v.infinitive}
                          className={`verb-pill-btn ${selectedImparfaitVerb === idx ? 'selected' : ''}`}
                          onClick={() => setSelectedImparfaitVerb(idx)}
                        >
                          {v.infinitive}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Verb Details */}
                  {IMPARFAIT_VERBS[selectedImparfaitVerb] && (
                    <div className="active-verb-display">
                      <div className="active-verb-meta">
                        <div>
                          <span className="active-infinitive">
                            {IMPARFAIT_VERBS[selectedImparfaitVerb].infinitive}
                          </span>
                          <span className="active-type-tag">
                            {IMPARFAIT_VERBS[selectedImparfaitVerb].type}
                          </span>
                        </div>
                        <div className="stem-indicator">
                          Radical extrait de « Nous » : <code>{IMPARFAIT_VERBS[selectedImparfaitVerb].stem}-</code>
                          {IMPARFAIT_VERBS[selectedImparfaitVerb].infinitive.includes("Être") && (
                            <span className="exception-note">⚠️ Seul verbe irrégulier à l'imparfait !</span>
                          )}
                        </div>
                      </div>

                      <div className="conjugation-tiles-grid">
                        {IMPARFAIT_VERBS[selectedImparfaitVerb].forms.map((row, i) => (
                          <div key={i} className="conjugation-tile">
                            <span className="tile-pronoun">{row.pronoun}</span>
                            <span className="tile-full-verb">
                              <span className="tile-stem">{IMPARFAIT_VERBS[selectedImparfaitVerb].stem}</span>
                              <span className="tile-ending">{row.ending}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STATION 2: LE PASSÉ COMPOSÉ */}
          {activeStation === 'pc' && (
            <div className="station-view animate-fade">
              {/* Overview Equation Card */}
              <div className="dual-engine-box">
                <div className="engine-card engine-avoir">
                  <div className="engine-header">
                    <span className="engine-badge">~90% DES VERBES</span>
                    <h4>Le Moteur Principal : AVOIR</h4>
                  </div>
                  <div className="engine-formula">
                    <code>[Sujet] + [Avoir au présent] + [Participe Passé]</code>
                  </div>
                  <p className="engine-rule">
                    <strong>Règle d'or :</strong> AUCUN ACCORD du participe passé avec le sujet.
                  </p>
                  <div className="engine-examples">
                    <div className="example-item">
                      <span className="subj">Hugo</span> <span className="aux">a</span> <span className="pp">étudié</span> toute la nuit.
                    </div>
                    <div className="example-item">
                      <span className="subj">Les étudiantes</span> <span className="aux">ont</span> <span className="pp">réussi</span> l'épreuve.
                    </div>
                  </div>
                </div>

                <div className="engine-card engine-etre">
                  <div className="engine-header">
                    <span className="engine-badge badge-etre">~10% DES VERBES</span>
                    <h4>La Voie Spéciale : ÊTRE</h4>
                  </div>
                  <div className="engine-formula">
                    <code>[Sujet] + [Être au présent] + [Participe Passé]</code>
                  </div>
                  <p className="engine-rule">
                    <strong>Règle d'or :</strong> ACCORD OBLIGATOIRE en genre (-e) et nombre (-s) avec le sujet !
                  </p>
                  <div className="engine-examples">
                    <div className="example-item">
                      <span className="subj">Il</span> <span className="aux">est</span> <span className="pp">parti</span>.
                    </div>
                    <div className="example-item">
                      <span className="subj">Elle</span> <span className="aux">est</span> <span className="pp">parti<strong>e</strong></span>.
                    </div>
                    <div className="example-item">
                      <span className="subj">Elles</span> <span className="aux">sont</span> <span className="pp">parti<strong>es</strong></span>.
                    </div>
                  </div>
                </div>
              </div>

              {/* DR & MRS VANDERTRAMP INTERACTIVE HOUSE */}
              <div className="vandertramp-section glass-panel">
                <div className="section-title-row">
                  <ShieldCheck size={20} className="text-accent" />
                  <div>
                    <h3>Le Code d'Accès : DR & MRS VANDERTRAMP</h3>
                    <p className="section-subtext">
                      Tous les verbes de déplacement et de changement d'état se conjuguent avec <strong>ÊTRE</strong>.
                    </p>
                  </div>
                </div>

                {/* Subject Selector for Interactive Agreement Demonstration */}
                <div className="subject-tester-bar">
                  <span className="tester-label">Simulateur d'Accord :</span>
                  <div className="tester-buttons">
                    <button
                      className={`tester-btn ${vanderSubject === 'il' ? 'active' : ''}`}
                      onClick={() => setVanderSubject('il')}
                    >
                      👨 Il (Masculin Singulier)
                    </button>
                    <button
                      className={`tester-btn ${vanderSubject === 'elle' ? 'active' : ''}`}
                      onClick={() => setVanderSubject('elle')}
                    >
                      👩 Elle (Féminin Singulier: +e)
                    </button>
                    <button
                      className={`tester-btn ${vanderSubject === 'ils' ? 'active' : ''}`}
                      onClick={() => setVanderSubject('ils')}
                    >
                      👥 Ils (Masculin Pluriel: +s)
                    </button>
                    <button
                      className={`tester-btn ${vanderSubject === 'elles' ? 'active' : ''}`}
                      onClick={() => setVanderSubject('elles')}
                    >
                      👭 Elles (Féminin Pluriel: +es)
                    </button>
                  </div>
                </div>

                {/* 17 Verb Cards Grid */}
                <div className="vandertramp-grid">
                  {VANDERTRAMP_VERBS.map((v, i) => {
                    let ending = '';
                    if (vanderSubject === 'elle') ending = 'e';
                    else if (vanderSubject === 'ils') ending = 's';
                    else if (vanderSubject === 'elles') ending = 'es';

                    const auxForm = vanderSubject.startsWith('il')
                      ? (vanderSubject === 'ils' ? 'sont' : 'est')
                      : (vanderSubject === 'elles' ? 'sont' : 'est');

                    const subjectLabel = vanderSubject === 'il' ? 'Il' : vanderSubject === 'elle' ? 'Elle' : vanderSubject === 'ils' ? 'Ils' : 'Elles';

                    return (
                      <div key={i} className="vander-card">
                        <div className="vander-letter-badge">{v.letter}</div>
                        <div className="vander-verb-name">{v.verb}</div>
                        <div className="vander-simulated-form">
                          <span className="aux-text">{subjectLabel} {auxForm}</span>{' '}
                          <span className="pp-text">
                            {v.pp}
                            {ending && <span className="agreement-highlight">{ending}</span>}
                          </span>
                        </div>
                        <span className="vander-meaning">{v.meaning}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Reflexive Verbs Banner */}
                <div className="pronominaux-box">
                  <Sparkles size={20} className="text-accent" />
                  <div>
                    <strong>Les Verbes Pronominaux (Toujours avec ÊTRE !) :</strong>
                    <div className="pronominaux-examples">
                      <span>Je me suis lavé(e)</span> • 
                      <span>Tu t'es inscrit(e)</span> • 
                      <span>Elle s'est préparée</span> • 
                      <span>Nous nous sommes levé(e)s</span> • 
                      <span>Ils se sont rencontrés</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Irregular Participles & COD Court-circuit */}
              <div className="two-column-details">
                {/* Participles Vault */}
                <div className="details-card glass-panel">
                  <h4 className="details-title">
                    <BookOpen size={18} />
                    Le Coffre des Participes Irréguliers
                  </h4>
                  <div className="participles-table">
                    {IRREGULAR_PARTICIPLES.map((item, idx) => (
                      <div key={idx} className="participle-row">
                        <span className="row-infinitive">{item.infinitive}</span>
                        <ArrowRight size={14} className="arrow-sep" />
                        <span className="row-pp">{item.pp}</span>
                        <span className="row-example">{item.example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Court-Circuit du COD */}
                <div className="details-card glass-panel court-circuit-card">
                  <h4 className="details-title text-danger">
                    <AlertTriangle size={18} />
                    Le Piège Ultime : Le Court-Circuit du COD
                  </h4>
                  <p className="court-circuit-intro">
                    Normalement, le verbe avec <strong>Avoir</strong> ne s'accorde jamais. Mais attention : si le <strong>COD est placé AVANT</strong> le verbe, le participe s'accorde en genre et en nombre avec ce COD !
                  </p>

                  <div className="comparison-pairs">
                    <div className="compare-block normal-case">
                      <span className="case-tag">Cas Normal (COD Après)</span>
                      <p className="case-sentence">
                        J'ai vu <strong>tes notes</strong>.
                      </p>
                      <span className="case-expl">Aucun accord avec « notes » car il est après le verbe.</span>
                    </div>

                    <div className="compare-block exception-case">
                      <span className="case-tag tag-alert">Court-Circuit (COD Avant)</span>
                      <p className="case-sentence">
                        Tes notes ? Je les ai vu<strong>es</strong> !
                      </p>
                      <span className="case-expl">
                        « les » = tes notes (fém. pluriel) placé <strong>avant</strong> ➔ Accord obligatoire <strong>+es</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATION 3: LE DUEL NARRATIF */}
          {activeStation === 'duel' && (
            <div className="station-view animate-fade">
              {/* Metaphor Spotlight */}
              <div className="duel-metaphor-card glass-panel">
                <div className="metaphor-side imparfait-side">
                  <div className="side-badge">LA CAMÉRA PANORAMIQUE</div>
                  <h3>L'Imparfait</h3>
                  <div className="side-metaphor-desc">
                    C'est la bande sonore et le décor du film. Rien ne commence, rien ne finit. Tout était déjà là.
                  </div>
                  <ul className="side-points">
                    <li>✓ <strong>Décor & Météo :</strong> Il pleuvait, il faisait nuit.</li>
                    <li>✓ <strong>État physique/mental :</strong> J'avais peur, elle était fatiguée.</li>
                    <li>✓ <strong>Action continue en cours :</strong> Les étudiants marchaient dans la rue.</li>
                    <li>✓ <strong>Habitude répétée :</strong> Chaque soir, il étudiait deux heures.</li>
                  </ul>
                </div>

                <div className="vs-divider">
                  <span className="vs-badge">VS</span>
                </div>

                <div className="metaphor-side pc-side">
                  <div className="side-badge">LE COUP DE THÉÂTRE</div>
                  <h3>Le Passé Composé</h3>
                  <div className="side-metaphor-desc">
                    C'est le flash du photographe. L'action soudaine qui fait bondir le récit et change la donne.
                  </div>
                  <ul className="side-points">
                    <li>✓ <strong>Action précise & soudaine :</strong> Tout à coup, l'alarme a sonné !</li>
                    <li>✓ <strong>Interruption du décor :</strong> Un élève a ouvert la porte.</li>
                    <li>✓ <strong>Action achevée et datée :</strong> Hier, nous avons signé le contrat.</li>
                    <li>✓ <strong>Enchaînement chronologique :</strong> Il est entré, a salué et s'est assis.</li>
                  </ul>
                </div>
              </div>

              {/* Story Simulator */}
              <div className="story-simulator-box glass-panel">
                <div className="section-title-row">
                  <BookOpen size={20} className="text-accent" />
                  <h3>Scénario Interactif : La Soirée d'Étude</h3>
                </div>

                <div className="interactive-story-flow">
                  <div className="flow-step imparfait-step">
                    <div className="step-badge">1. CONTEXTE (Imparfait)</div>
                    <p className="step-sentence">
                      Il <strong>était</strong> 20 heures et il <strong>neigeait</strong> doucement sur le campus.
                    </p>
                  </div>

                  <div className="flow-step imparfait-step">
                    <div className="step-badge">2. ACTION CONTINUE (Imparfait)</div>
                    <p className="step-sentence">
                      Léa et Hugo <strong>révisaient</strong> leurs cours à la bibliothèque universitaire...
                    </p>
                  </div>

                  <div className="flow-step pc-step alert-action">
                    <div className="step-badge badge-sudden">⚡ 3. INTERRUPTION SOUDAINE (Passé Composé)</div>
                    <p className="step-sentence">
                      ...quand tout à coup, les lumières <strong>se sont éteintes</strong> !
                    </p>
                  </div>

                  <div className="flow-step pc-step">
                    <div className="step-badge">4. SUITE CHRONOLOGIQUE (Passé Composé)</div>
                    <p className="step-sentence">
                      Le directeur <strong>est venu</strong> avec une torche et <strong>a rassuré</strong> tout le monde.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator Words Comparison Radar */}
              <div className="indicators-radar glass-panel">
                <div className="section-title-row">
                  <Compass size={20} className="text-accent" />
                  <h3>Les Déclencheurs Vocaux (Indicateurs Temporels)</h3>
                </div>
                <div className="indicators-columns">
                  <div className="indicator-col col-imparfait">
                    <h4>📡 Déclencheurs d'Imparfait</h4>
                    <div className="indicator-chips">
                      <span className="chip">Tous les jours</span>
                      <span className="chip">Chaque matin</span>
                      <span className="chip">D'habitude</span>
                      <span className="chip">Autrefois</span>
                      <span className="chip">Pendant que</span>
                      <span className="chip">Toujours / Souvent</span>
                      <span className="chip">Quand j'étais petit(e)</span>
                    </div>
                  </div>

                  <div className="indicator-col col-pc">
                    <h4>⚡ Déclencheurs de Passé Composé</h4>
                    <div className="indicator-chips">
                      <span className="chip chip-pc">Soudain / Tout à coup</span>
                      <span className="chip chip-pc">Un jour précis</span>
                      <span className="chip chip-pc">Hier / La semaine dernière</span>
                      <span className="chip chip-pc">À ce moment-là</span>
                      <span className="chip chip-pc">Puis / Ensuite</span>
                      <span className="chip chip-pc">Tout de suite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* PÔLE 2 : LA FORTERESSE DES PRONOMS */}
      {/* ============================================================ */}
      {mainPillar === 'pronoms' && (
        <div className="pillar-content-area">
          {/* STATION 1: COD vs COI */}
          {activeStation === 'cod_coi' && (
            <div className="station-view animate-fade">
              {/* COD vs COI Interactive Diagnostic */}
              <div className="diagnostic-hero-grid">
                {/* COD Card */}
                <div className="pronoun-hero-card card-cod">
                  <div className="hero-header">
                    <span className="hero-badge badge-cod">DIRECT (SANS PRÉPOSITION)</span>
                    <h3>Les Pronoms COD</h3>
                  </div>
                  <div className="question-trigger">
                    Posez la question : <code>[Verbe] + QUI ? ou QUOI ?</code>
                  </div>
                  <div className="pronoun-inventory">
                    <span className="p-pill">me / m'</span>
                    <span className="p-pill">te / t'</span>
                    <span className="p-pill highlight">le / la / l'</span>
                    <span className="p-pill">nous</span>
                    <span className="p-pill">vous</span>
                    <span className="p-pill highlight">les</span>
                  </div>
                  <div className="substitution-showcase">
                    <div className="sub-line">
                      <span className="raw">Je consulte <strong>l'article</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Je <strong>le</strong> consulte.</span>
                    </div>
                    <div className="sub-line">
                      <span className="raw">Tu télécharges <strong>les données</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Tu <strong>les</strong> télécharges.</span>
                    </div>
                    <div className="sub-line">
                      <span className="raw">Il protège <strong>son mot de passe</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Il <strong>le</strong> protège.</span>
                    </div>
                  </div>
                </div>

                {/* COI Card */}
                <div className="pronoun-hero-card card-coi">
                  <div className="hero-header">
                    <span className="hero-badge badge-coi">INDIRECT (AVEC « À »)</span>
                    <h3>Les Pronoms COI</h3>
                  </div>
                  <div className="question-trigger">
                    Posez la question : <code>[Verbe] + À QUI ? (Personnes)</code>
                  </div>
                  <div className="pronoun-inventory">
                    <span className="p-pill">me / m'</span>
                    <span className="p-pill">te / t'</span>
                    <span className="p-pill highlight-coi">lui</span>
                    <span className="p-pill">nous</span>
                    <span className="p-pill">vous</span>
                    <span className="p-pill highlight-coi">leur</span>
                  </div>
                  <div className="substitution-showcase">
                    <div className="sub-line">
                      <span className="raw">J'écris <strong>à la professeure</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Je <strong>lui</strong> écris.</span>
                    </div>
                    <div className="sub-line">
                      <span className="raw">Elle parle <strong>aux étudiants</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Elle <strong>leur</strong> parle.</span>
                    </div>
                    <div className="sub-line">
                      <span className="raw">Nous répondons <strong>à Hugo</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="trans">Nous <strong>lui</strong> répondons.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Position & Rules Card */}
              <div className="rules-position-card glass-panel">
                <div className="section-title-row">
                  <Zap size={20} className="text-accent" />
                  <h3>L'Emplacement Stratégique du Pronom</h3>
                </div>
                <div className="position-grid">
                  <div className="position-item">
                    <span className="pos-badge">Présent & Futur Simple</span>
                    <div className="pos-formula"><code>[Sujet] + [PRONOM] + [Verbe conjugué]</code></div>
                    <p className="pos-example">Je <strong>le</strong> lis chaque matin.</p>
                  </div>

                  <div className="position-item">
                    <span className="pos-badge">Passé Composé</span>
                    <div className="pos-formula"><code>[Sujet] + [PRONOM] + [Auxiliaire] + [Participe]</code></div>
                    <p className="pos-example">Je <strong>lui</strong> ai téléphoné hier soir.</p>
                  </div>

                  <div className="position-item">
                    <span className="pos-badge">Verbe Semi-Auxiliaire (Vouloir, Devoir, Aller...)</span>
                    <div className="pos-formula"><code>[Sujet] + [Verbe 1] + [PRONOM] + [Infinitif]</code></div>
                    <p className="pos-example">Je veux <strong>le</strong> regarder maintenant.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATION 2: Y & EN */}
          {activeStation === 'yen' && (
            <div className="station-view animate-fade">
              {/* Dual Y vs EN Showcase */}
              <div className="yen-duo-grid">
                {/* PRONOM Y */}
                <div className="yen-card card-y">
                  <div className="yen-badge badge-y">LE PRONOM Y</div>
                  <h3>Le Remplaçant des Lieux & de « À + Chose »</h3>
                  
                  <div className="yen-case">
                    <span className="case-title">1. Un Lieu (Introduit par à, en, dans, sur, chez...)</span>
                    <div className="yen-example-row">
                      <span className="src">Tu vas <strong>à la bibliothèque</strong> ?</span>
                      <ArrowRight size={14} />
                      <span className="res">Oui, j'<strong>y</strong> vais.</span>
                    </div>
                    <div className="yen-example-row">
                      <span className="src">Elle habite <strong>en France</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="res">Elle <strong>y</strong> habite.</span>
                    </div>
                  </div>

                  <div className="yen-case">
                    <span className="case-title">2. Une Idée ou Chose introduite par « À »</span>
                    <div className="yen-example-row">
                      <span className="src">Tu penses <strong>à ton avenir</strong> ?</span>
                      <ArrowRight size={14} />
                      <span className="res">Oui, j'<strong>y</strong> pense souvent.</span>
                    </div>
                    <div className="yen-example-row">
                      <span className="src">Je participe <strong>au projet</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="res">J'<strong>y</strong> participe.</span>
                    </div>
                  </div>
                </div>

                {/* PRONOM EN */}
                <div className="yen-card card-en">
                  <div className="yen-badge badge-en">LE PRONOM EN</div>
                  <h3>Le Remplaçant des Quantités & de « DE + Chose »</h3>

                  <div className="yen-case">
                    <span className="case-title">1. Une Quantité (un, une, des, du, de la, nombres...)</span>
                    <div className="yen-example-row">
                      <span className="src">Tu as <strong>un ordinateur</strong> ?</span>
                      <ArrowRight size={14} />
                      <span className="res">Oui, j'<strong>en</strong> ai <strong>un</strong>.</span>
                    </div>
                    <div className="yen-example-row">
                      <span className="src">Il lit <strong>beaucoup de livres</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="res">Il <strong>en</strong> lit beaucoup.</span>
                    </div>
                  </div>

                  <div className="yen-case">
                    <span className="case-title">2. Une Chose introduite par la préposition « DE »</span>
                    <div className="yen-example-row">
                      <span className="src">Tu parles <strong>de la nouvelle réforme</strong> ?</span>
                      <ArrowRight size={14} />
                      <span className="res">Oui, j'<strong>en</strong> parle avec Hugo.</span>
                    </div>
                    <div className="yen-example-row">
                      <span className="src">J'ai besoin <strong>de ce document</strong>.</span>
                      <ArrowRight size={14} />
                      <span className="res">J'<strong>en</strong> ai besoin.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Red Alert : Never use Y / EN for People */}
              <div className="trap-alert-box alert-critique">
                <AlertTriangle size={24} className="text-danger" />
                <div>
                  <strong>Alerte Sécurité Grammaticale : Les Personnes sont Intouchables !</strong>
                  <p>
                    Ni <strong>Y</strong> ni <strong>EN</strong> ne remplacent des êtres humains !
                  </p>
                  <div className="safe-alternatives">
                    <span className="alt-chip">❌ <em>Je pense à Paul ➔ J'y pense</em> (Faux !) ➔ ✔️ <strong>Je pense à lui</strong></span>
                    <span className="alt-chip">❌ <em>Je parle de Léa ➔ J'en parle</em> (Faux !) ➔ ✔️ <strong>Je parle d'elle</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATION 3: L'ORDRE DES DOUBLES PRONOMS */}
          {activeStation === 'ordre' && (
            <div className="station-view animate-fade">
              {/* Radar Belt Showcase */}
              <div className="radar-belt-container glass-panel">
                <div className="section-title-row">
                  <Compass size={20} className="text-accent" />
                  <div>
                    <h3>La Tour de Contrôle : L'Ordre Inviolable</h3>
                    <p className="section-subtext">
                      Quand deux pronoms se rencontrent avant le verbe, ils doivent respecter cet ordre précis :
                    </p>
                  </div>
                </div>

                {/* The 5 Stations Track */}
                <div className="radar-track">
                  <div
                    className={`track-node ${activeRadarStep === 1 ? 'node-selected' : ''}`}
                    onClick={() => setActiveRadarStep(1)}
                  >
                    <span className="node-step">1️⃣ Colonne 1</span>
                    <span className="node-pronouns">me, te, se, nous, vous</span>
                    <span className="node-role">Personnes réflexives / récepteurs</span>
                  </div>

                  <div className="track-connector">➔</div>

                  <div
                    className={`track-node ${activeRadarStep === 2 ? 'node-selected' : ''}`}
                    onClick={() => setActiveRadarStep(2)}
                  >
                    <span className="node-step">2️⃣ Colonne 2</span>
                    <span className="node-pronouns">le, la, l', les</span>
                    <span className="node-role">Les pronoms COD</span>
                  </div>

                  <div className="track-connector">➔</div>

                  <div
                    className={`track-node ${activeRadarStep === 3 ? 'node-selected' : ''}`}
                    onClick={() => setActiveRadarStep(3)}
                  >
                    <span className="node-step">3️⃣ Colonne 3</span>
                    <span className="node-pronouns">lui, leur</span>
                    <span className="node-role">Les pronoms COI (3e personne)</span>
                  </div>

                  <div className="track-connector">➔</div>

                  <div
                    className={`track-node ${activeRadarStep === 4 ? 'node-selected' : ''}`}
                    onClick={() => setActiveRadarStep(4)}
                  >
                    <span className="node-step">4️⃣ Colonne 4</span>
                    <span className="node-pronouns">y</span>
                    <span className="node-role">Lieu / à + chose</span>
                  </div>

                  <div className="track-connector">➔</div>

                  <div
                    className={`track-node ${activeRadarStep === 5 ? 'node-selected' : ''}`}
                    onClick={() => setActiveRadarStep(5)}
                  >
                    <span className="node-step">5️⃣ Colonne 5</span>
                    <span className="node-pronouns">en</span>
                    <span className="node-role">Quantité / de + chose</span>
                  </div>

                  <div className="track-connector">➔</div>

                  <div className="track-node node-verb">
                    <span className="node-step">VERBE</span>
                    <span className="node-pronouns">Le Verbe Conjugué</span>
                    <span className="node-role">Arrivée finale</span>
                  </div>
                </div>

                {/* Mnemonic Rule */}
                <div className="mnemonic-tip-box">
                  <Lightbulb size={20} className="text-warning" />
                  <div>
                    <strong>L'Astuce Alphabétique :</strong> Vous hésitez entre <code>le/la/les</code> et <code>lui/leur</code> ?
                    Pensez à l'ordre alphabétique du dictionnaire : <strong>L-E</strong> (le) vient TOUJOURS avant <strong>L-U</strong> (lui) !
                  </div>
                </div>
              </div>

              {/* Concrete Combinations Lab */}
              <div className="combos-grid">
                <div className="combo-card">
                  <div className="combo-header">
                    <span className="combo-badge">Combinaison 1 + 2</span>
                    <h5>Colonne 1 (me/te/se...) + Colonne 2 (le/la/les)</h5>
                  </div>
                  <div className="combo-sentence">
                    <span className="orig">Tu me prêtes <strong>ton ordinateur</strong> ?</span>
                    <div className="result-line">
                      ➔ Tu <strong>me le</strong> prêtes.
                    </div>
                  </div>
                </div>

                <div className="combo-card">
                  <div className="combo-header">
                    <span className="combo-badge">Combinaison 2 + 3</span>
                    <h5>Colonne 2 (le/la/les) + Colonne 3 (lui/leur)</h5>
                  </div>
                  <div className="combo-sentence">
                    <span className="orig">Je donne <strong>le mot de passe</strong> <strong>à mon ami</strong>.</span>
                    <div className="result-line">
                      ➔ Je <strong>le lui</strong> donne.
                    </div>
                  </div>
                </div>

                <div className="combo-card">
                  <div className="combo-header">
                    <span className="combo-badge">Combinaison 3 + 5</span>
                    <h5>Colonne 3 (lui/leur) + Colonne 5 (en)</h5>
                  </div>
                  <div className="combo-sentence">
                    <span className="orig">Le professeur parle <strong>de la bourse</strong> <strong>aux élèves</strong>.</span>
                    <div className="result-line">
                      ➔ Le professeur <strong>leur en</strong> parle.
                    </div>
                  </div>
                </div>

                <div className="combo-card">
                  <div className="combo-header">
                    <span className="combo-badge">Combinaison 2 + 4</span>
                    <h5>Colonne 2 (le/la/les) + Colonne 4 (y)</h5>
                  </div>
                  <div className="combo-sentence">
                    <span className="orig">Hugo range <strong>son dossier</strong> <strong>dans le tiroir</strong>.</span>
                    <div className="result-line">
                      ➔ Hugo <strong>l'y</strong> range.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
