/**
 * TribuneAcademique.jsx
 * « Tribune Académique — Plaidoyer & Récit pour l'Éducation »
 * 
 * Interactive writing activity based on Dossiers 1 & 2 (FI11 Unité 2).
 * Layout: [Left pull-tab toolbox] | [Main writing canvas]
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  X,
  Copy,
  RefreshCw,
  Check,
  BookOpen,
  Zap,
  Star,
  FileText,
  ChevronRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';
import './TribuneJournalistique.css';

// ── Accents ────────────────────────────────────────────────────────────────────
const LOWER_ACCENTS = ['é','è','ê','ë','à','â','ù','û','î','ï','ô','ç','œ'];
const UPPER_ACCENTS = ['É','È','Ê','Ë','À','Â','Ù','Û','Î','Ï','Ô','Ç','Œ'];

// ── Quick chips (Connecteurs & Déclencheurs) ───────────────────────────────────
const QUICK_CHIPS = [
  { label: "🎓 Quand j'étais élève,", phrase: "Quand j'étais élève, ", color: "chip-sky" },
  { label: "⏳ À cette époque-là,", phrase: "À cette époque-là, ", color: "chip-amber" },
  { label: "⚡ Soudain, un jour,", phrase: "Soudain, un jour, ", color: "chip-rose" },
  { label: "💡 Pour y remédier,", phrase: "Pour y remédier, ", color: "chip-emerald" },
  { label: "🤝 Nous leur apportons", phrase: "Nous leur apportons ", color: "chip-violet" },
  { label: "🏛️ Selon la réforme,", phrase: "Selon la réforme éducative, ", color: "chip-blue" },
  { label: "✨ C'est pourquoi j'en parle,", phrase: "C'est pourquoi j'en parle, ", color: "chip-sky" },
  { label: "➔ En conclusion,", phrase: "En conclusion, ", color: "chip-amber" },
];

// ── Toolbox tabs (Based on Dossiers 1 & 2 of Unit 2) ──────────────────────────
const TOOLBOX_TABS = [
  {
    id: 'niveau1',
    label: 'Niveau 1',
    sublabel: 'Guidé & Trad.',
    icon: BookOpen,
    color: 'ltab-sky',
    sections: [
      {
        heading: "📚 Le Lexique de l'Éducation",
        subheading: 'Dossier 1 • Bilingue',
        color: 'ts-sky',
        items: [
          { fr: "le système éducatif", en: "the educational system" },
          { fr: "le taux de scolarisation", en: "the enrollment rate" },
          { fr: "les inégalités éducatives", en: "educational inequalities" },
          { fr: "une réforme éducative", en: "an educational reform" },
          { fr: "l'éducation de base gratuite", en: "free basic education" },
          { fr: "l'éducation inclusive", en: "inclusive education" },
          { fr: "l'égalité des genres", en: "gender equality" },
          { fr: "les écoles rurales isolées", en: "isolated rural schools" },
          { fr: "les bourses d'études", en: "scholarships / study grants" },
          { fr: "une pédagogie innovante", en: "innovative teaching methods" },
          { fr: "la formation professionnelle", en: "vocational training" },
          { fr: "l'enseignement à distance", en: "distance/remote learning" },
        ],
      },
      {
        heading: "⏳ Récit au Passé & Pronoms",
        subheading: 'Dossier 2 • Structures',
        color: 'ts-amber',
        items: [
          { fr: "Quand j'étais au lycée,...", en: "When I was in high school,..." },
          { fr: "Il y avait de grands défis scolaires.", en: "There were big academic challenges." },
          { fr: "Les professeurs nous encourageaient toujours.", en: "Teachers always encouraged us." },
          { fr: "Soudain, l'université a offert des bourses.", en: "Suddenly, the university offered scholarships." },
          { fr: "Les étudiantes les ont acceptées avec joie.", en: "The students accepted them with joy." },
          { fr: "Je lui ai demandé des conseils.", en: "I asked him/her for advice." },
          { fr: "Nous y avons étudié pendant des années.", en: "We studied there for years." },
          { fr: "J'en ai gardé d'excellents souvenirs.", en: "I kept great memories from it." },
        ],
      },
    ],
  },
  {
    id: 'niveau2',
    label: 'Niveau 2',
    sublabel: '100% Français',
    icon: Zap,
    color: 'ltab-indigo',
    sections: [
      {
        heading: "1. Le Décor & Les Souvenirs (L'Imparfait)",
        subheading: 'Contexte, Ambiance & Routines',
        color: 'ts-sky',
        items: [
          { fr: "Autrefois, le taux de scolarisation était très faible dans les régions isolées." },
          { fr: "Chaque matin, les élèves marchaient plusieurs kilomètres pour rejoindre l'école." },
          { fr: "Les infrastructures manquaient de moyens mais les professeurs gardaient espoir." },
          { fr: "Nous étudiions avec passion malgré les inégalités scolaires de départ." },
          { fr: "Pendant que nous révisions à la bibliothèque, l'ambiance était calme et studieuse." },
        ],
      },
      {
        heading: "2. Événements & Actions Clés (Le Passé Composé)",
        subheading: 'Changements, Réformes & Ruptures',
        color: 'ts-amber',
        items: [
          { fr: "Un jour, le ministère a lancé une grande réforme éducative." },
          { fr: "Les autorités ont investi dans de nouvelles infrastructures modernes." },
          { fr: "De nombreux étudiants défavorisés ont reçu une bourse d'études essentielle." },
          { fr: "Elle est entrée à l'université après avoir brillamment réussi ses examens." },
          { fr: "La communauté scolaire s'est mobilisée pour favoriser l'éducation inclusive." },
          { fr: "Les inspecteurs sont venus pour évaluer les progrès réalisés." },
        ],
      },
      {
        heading: '3. Maîtrise des Pronoms (COD, COI, Y, EN)',
        subheading: 'Économie & Richesse de la Langue',
        color: 'ts-emerald',
        items: [
          { fr: "Cette réforme scolaire ? Le gouvernement l'a adoptée sans hésiter." },
          { fr: "Les élèves ont besoin de soutien : les enseignants leur apportent des ressources." },
          { fr: "L'université publique est essentielle : tous les jeunes doivent pouvoir y accéder." },
          { fr: "Les manuels scolaires coûtent cher mais l'État en distribue gratuitement." },
          { fr: "Quand un étudiant rencontre une difficulté, je la lui explique patiemment." },
        ],
      },
    ],
  },
  {
    id: 'niveau3',
    label: 'Niveau 3',
    sublabel: 'Autonomie',
    icon: Star,
    color: 'ltab-violet',
    sections: [
      {
        heading: "🌟 Formules d'Impact & Connecteurs",
        subheading: 'Style Rhétorique & Plaidoyer',
        color: 'ts-violet',
        items: [
          { fr: "Tandis que les disparités persistent, l'accès universel au savoir demeure un droit fondamental." },
          { fr: "Non seulement l'éducation instruit les esprits, mais elle réduit aussi les fractures sociales." },
          { fr: "Face aux défis du siècle, investir dans les écoles rurales constitue une priorité absolue." },
          { fr: "C'est grâce à une pédagogie inclusive que chaque enfant trouve sa voie." },
          { fr: "Bien que les réformes soient exigeantes, elles garantissent l'égalité des chances pour demain." },
          { fr: "En définitive, le savoir représente le levier le plus puissant contre la précarité." },
        ],
      },
      {
        heading: '📌 Mémento Grammaire Express',
        subheading: 'Imparfait, Passé Composé & Pronoms',
        color: 'ts-slate',
        items: [
          { fr: "IMPARFAIT : Radical de 'nous' au présent + -ais, -ais, -ait, -ions, -iez, -aient (ex: nous finissons -> je finissais)." },
          { fr: "PASSÉ COMPOSÉ : [Sujet] + Avoir/Être au présent + Participe Passé (ex: il a appris, nous avons compris)." },
          { fr: "DR & MRS VANDERTRAMP : 17 verbes avec ÊTRE + accord obligatoire du participe avec le sujet (-e, -s, -es)." },
          { fr: "PRONOMS COD : le, la, l', les (répond à « Qui ? » ou « Quoi ? » après le verbe)." },
          { fr: "PRONOMS COI : lui, leur (répond à « À qui ? » pour les personnes uniquement)." },
          { fr: "PRONOMS Y & EN : Y = lieu ou 'à + chose' | EN = quantité ou 'de + chose'." },
          { fr: "ORDRE STRICT : me/te/se/nous/vous ➔ le/la/les ➔ lui/leur ➔ y ➔ en ➔ Verbe." },
        ],
      },
    ],
  },
];

// ── Checklist ──────────────────────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  { id: 'cl1', label: "Vocabulaire de l'éducation et de l'inclusion (Dossier 1)", badge: "Lexique Éducation", color: "badge-sky" },
  { id: 'cl2', label: "Au moins un verbe à l'Imparfait (décor, habitude ou souvenir)", badge: "Imparfait", color: "badge-amber" },
  { id: 'cl3', label: "Au moins une action précise au Passé Composé (événement)", badge: "Passé Composé", color: "badge-indigo" },
  { id: 'cl4', label: "Au moins un pronom complément utilisé avec soin (COD, COI, Y ou EN)", badge: "Pronoms Objets", color: "badge-emerald" },
];

// ── Utils ──────────────────────────────────────────────────────────────────────
function countWords(t) { return t.trim() === '' ? 0 : t.trim().split(/\s+/).length; }
function countSentences(t) { if (!t.trim()) return 0; const m = t.match(/[^.!?]*[.!?]+/g); return m ? m.length : 0; }

export default function TribuneAcademique() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState({ cl1: false, cl2: false, cl3: false, cl4: false });
  const [openTab, setOpenTab] = useState(null);

  const textareaRef = useRef(null);

  const wordCount = countWords(text);
  const sentenceCount = countSentences(text);
  const MIN_WORDS = 60;
  const progressPct = Math.min(100, Math.round((wordCount / MIN_WORDS) * 100));

  // Insert at textarea cursor
  const insertAtCursor = useCallback((phrase) => {
    const el = textareaRef.current;
    if (!el) { setText(prev => prev + phrase); return; }
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const before = text.slice(0, start);
    const after = text.slice(end);
    const needsSpace = before.length > 0 && !/\s$/.test(before);
    const insert = (needsSpace ? ' ' : '') + phrase;
    setText(before + insert + after);
    setTimeout(() => {
      el.focus();
      const p = start + insert.length;
      el.setSelectionRange(p, p);
    }, 0);
  }, [text]);

  const handleAccentClick = useCallback((char) => insertAtCursor(char), [insertAtCursor]);

  const handleCopy = async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleReset = () => {
    setText('');
    setChecklist({ cl1: false, cl2: false, cl3: false, cl4: false });
    textareaRef.current?.focus();
  };

  const toggleCheck = (id) => setChecklist(prev => ({ ...prev, [id]: !prev[id] }));

  const handleTabClick = (tabId) => {
    setOpenTab(prev => (prev === tabId ? null : tabId));
  };

  const activeTabData = TOOLBOX_TABS.find(t => t.id === openTab);

  return (
    <div className="tj-outer-wrapper fade-in">

      {/* ══ LEFT: TOOLBOX STRIP + SLIDING PANEL ══════════════════════════ */}
      <div className="tj-toolbox-area">

        {/* Vertical tab strip — always visible */}
        <div className="tj-level-tabs-strip" role="tablist" aria-label="Boîte à Outils — Niveaux">
          <div className="tj-toolbox-label">🛠️ Boîte à Outils</div>
          {TOOLBOX_TABS.map(tab => {
            const Icon = tab.icon;
            const isAct = openTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isAct}
                aria-controls={`tj-panel-${tab.id}`}
                className={`tj-level-tab ${tab.color} ${isAct ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
                title={`${tab.label} — ${tab.sublabel}`}
              >
                <Icon size={15} />
                <span className="tj-ltab-main">{tab.label}</span>
                <span className="tj-ltab-sub">{tab.sublabel}</span>
                <ChevronRight size={12} className={`tj-ltab-arrow ${isAct ? 'rotated' : ''}`} />
              </button>
            );
          })}
        </div>

        {/* Sliding panel — expands to the right of the strip */}
        <div
          id={openTab ? `tj-panel-${openTab}` : undefined}
          className={`tj-toolbox-panel ${openTab ? 'open' : ''}`}
          role="tabpanel"
          aria-label={activeTabData ? `${activeTabData.label} — ${activeTabData.sublabel}` : 'Boîte à Outils'}
        >
          <div className="tj-toolbox-panel-inner">
            {activeTabData && (
              <>
                <div className="tjp-header">
                  <div>
                    <span className="tjp-title">{activeTabData.label}</span>
                    <span className="tjp-sub">{activeTabData.sublabel}</span>
                  </div>
                  <button type="button" className="tjp-close" onClick={() => setOpenTab(null)} aria-label="Fermer">
                    <X size={14} />
                  </button>
                </div>

                <p className="tjp-hint">Cliquez sur une phrase → elle s'insère au curseur.</p>

                <div className="tjp-sections">
                  {activeTabData.sections.map((section, sIdx) => (
                    <div key={sIdx} className={`tjp-section ${section.color}`}>
                      <div className="tjp-section-head">
                        <span className="tjp-section-title">{section.heading}</span>
                        <span className="tjp-section-sub">{section.subheading}</span>
                      </div>
                      <ul className="tjp-items">
                        {section.items.map((item, iIdx) => (
                          <li key={iIdx}>
                            <button
                              type="button"
                              className="tjp-item-btn"
                              onClick={() => insertAtCursor(item.fr + ' ')}
                              title={`Insérer : ${item.fr}`}
                            >
                              <span className="tjp-fr">{item.fr}</span>
                              {item.en && <span className="tjp-en">— {item.en}</span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══ RIGHT: MAIN WRITING CONTENT ══════════════════════════════════ */}
      <div className="tj-main-content">

        {/* Header card */}
        <div className="tj-header-card">
          <div className="tj-header-top">
            <div>
              <div className="tj-unit-badge">
                <GraduationCap size={13} />
                Unité 2 • Plaidoyer & Récit Académique
              </div>
              <h2 className="tj-title">Tribune Académique — Récit & Plaidoyer pour l'Éducation</h2>
            </div>
            <div className="tj-tense-legend">
              <span className="tj-legend-pill legend-lexique">📚 Dossier 1 = Lexique Éducation</span>
              <span className="tj-legend-pill legend-present">⏳ Dossier 2 = Pronoms & Temps du Passé</span>
            </div>
          </div>

          <div className="tj-prompt-box">
            <span className="tj-prompt-label">📝 Consigne de rédaction :</span>
            <p className="tj-prompt-text">
              « Vous êtes un(e) étudiant(e) ou délégué(e) engagé(e) pour le droit au savoir. Rédigez un court plaidoyer ou un récit d'expérience <strong>(5 à 8 phrases / 60 mots min.)</strong> sur l'accès à l'école, les inégalités scolaires ou une réforme éducative.
              Plantez le décor ou vos souvenirs à l'<strong>imparfait</strong>, racontez les événements au <strong>passé composé</strong>, utilisez le vocabulaire de l'éducation{' '}
              <span className="tj-lex-hl">(Dossier 1 : scolarisation, bourses d'études, inclusion...)</span> et enrichissez votre texte avec des pronoms compléments{' '}
              <span className="tj-pres-hl">(Dossier 2 : COD, COI, Y, EN)</span> pour éviter les répétitions. »
            </p>
          </div>

          <div className="tj-checklist">
            <span className="tj-checklist-title">✅ Liste de vérification pédagogique :</span>
            <div className="tj-checklist-grid">
              {CHECKLIST_ITEMS.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`tj-check-item ${checklist[item.id] ? 'checked' : ''}`}
                  aria-pressed={checklist[item.id]}
                >
                  <span className={`tj-check-box ${checklist[item.id] ? 'checked' : ''}`}>
                    {checklist[item.id] && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="tj-check-label">{item.label}</span>
                  <span className={`tj-check-badge ${item.color}`}>{item.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Writing card */}
        <div className="tj-writing-card">

          {/* Quick chips */}
          <div className="tj-chips-row">
            <span className="tj-chips-label">Insérer :</span>
            {QUICK_CHIPS.map(chip => (
              <button
                key={chip.label}
                type="button"
                onClick={() => insertAtCursor(chip.phrase)}
                className={`tj-chip ${chip.color}`}
                title={`Insérer « ${chip.phrase.trim()} »`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="tj-textarea-wrapper">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={e => setText(e.target.value)}
              className="tj-textarea"
              rows={9}
              placeholder="« Quand j'étais élève au lycée, notre école manquait d'infrastructures modernes. Pourtant, les enseignants nous encourageaient chaque jour avec une grande dévotion. Soudain, le gouvernement a voté une réforme éducative et a offert des bourses d'études... »"
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              aria-label="Zone de rédaction académique"
            />
            <span className="tj-char-hint">
              {wordCount} mot{wordCount !== 1 ? 's' : ''} • {sentenceCount} phrase{sentenceCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Progress bar */}
          <div className="tj-progress-row">
            <span className="tj-progress-label">Objectif : {wordCount} / {MIN_WORDS} mots min.</span>
            <div className="tj-progress-track" role="progressbar" aria-valuenow={wordCount} aria-valuemin={0} aria-valuemax={MIN_WORDS}>
              <div className={`tj-progress-fill ${wordCount >= MIN_WORDS ? 'done' : ''}`} style={{ width: `${progressPct}%` }} />
            </div>
            {wordCount >= MIN_WORDS && <span className="tj-progress-done">✨ Objectif atteint avec succès !</span>}
          </div>

          {/* Accent toolbars */}
          <div className="tj-accent-section">
            <div className="tj-accent-row">
              <span className="tj-accent-label">Accents min. :</span>
              {LOWER_ACCENTS.map(char => (
                <button
                  key={char}
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleAccentClick(char)}
                  className="tj-accent-btn"
                >
                  {char}
                </button>
              ))}
            </div>
            <div className="tj-accent-row">
              <span className="tj-accent-label">Accents maj. :</span>
              {UPPER_ACCENTS.map(char => (
                <button
                  key={char}
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleAccentClick(char)}
                  className="tj-accent-btn tj-accent-btn--upper"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          {/* Action bar */}
          <div className="tj-action-bar">
            <div className="tj-stats-pill">
              <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
              <span className="tj-stats-sep">•</span>
              <span>{sentenceCount} phrase{sentenceCount !== 1 ? 's' : ''}</span>
              {wordCount >= 100 && (
                <>
                  <span className="tj-stats-sep">•</span>
                  <span className="tj-over-target">Richesse d'expression remarquable !</span>
                </>
              )}
            </div>
            <div className="tj-action-btns">
              <button
                type="button"
                onClick={handleReset}
                className="tj-btn tj-btn--ghost"
                disabled={!text.trim()}
              >
                <RefreshCw size={14} /> Recommencer
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className={`tj-btn ${copied ? 'tj-btn--success' : 'tj-btn--primary'}`}
                disabled={!text.trim()}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copié !' : 'Copier mon plaidoyer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
