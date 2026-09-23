/**
 * TribuneJournalistique.jsx
 * « Tribune Journalistique — L'Enquête au Présent (Tier 1 UDL) »
 * 
 * Interactive writing activity based on Dossiers 1 & 2 (FI11 Unité 1).
 * Layout: [Left pull-tab toolbox] | [Main writing canvas]
 * Replicated from MystereAuPasse (FI9) with 100% fidelity in design, ergonomics, and responsiveness.
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  X, Copy, RefreshCw, Check, BookOpen, Zap, Star, FileText, ChevronRight, Newspaper, Scale, ShieldCheck
} from 'lucide-react';
import './TribuneJournalistique.css';

// ── Accents ────────────────────────────────────────────────────────────────────
const LOWER_ACCENTS = ['é','è','ê','ë','à','â','ù','û','î','ï','ô','ç','œ'];
const UPPER_ACCENTS = ['É','È','Ê','Ë','À','Â','Ù','Û','Î','Ï','Ô','Ç','Œ'];

// ── Quick chips ────────────────────────────────────────────────────────────────
const QUICK_CHIPS = [
  { label: '📰 Selon notre enquête,', phrase: 'Selon notre enquête, ', color: 'chip-sky' },
  { label: '⚡ En exclusivité,', phrase: 'En exclusivité, ', color: 'chip-amber' },
  { label: '🔍 D\'après les sources,', phrase: "D'après les sources fiables, ", color: 'chip-blue' },
  { label: '🛑 Face à la censure,', phrase: 'Face à la censure, ', color: 'chip-rose' },
  { label: '🗣️ La rédaction affirme que', phrase: 'La rédaction affirme que ', color: 'chip-violet' },
  { label: '⚖️ En toute impartialité,', phrase: 'En toute impartialité, ', color: 'chip-emerald' },
  { label: '➔ En conclusion,', phrase: 'En conclusion, ', color: 'chip-sky' },
];

// ── Toolbox tabs (Based on Dossiers 1 & 2) ─────────────────────────────────────
const TOOLBOX_TABS = [
  {
    id: 'niveau1',
    label: 'Niveau 1',
    sublabel: 'Guidé & Trad.',
    icon: BookOpen,
    color: 'ltab-sky',
    sections: [
      {
        heading: '📰 Le Lexique des Médias',
        subheading: 'Dossier 1',
        color: 'ts-sky',
        items: [
          { fr: "la liberté de la presse", en: "freedom of the press" },
          { fr: "une source fiable et vérifiée", en: "a reliable and verified source" },
          { fr: "la censure gouvernementale", en: "government censorship" },
          { fr: "la désinformation sur les réseaux", en: "disinformation on social networks" },
          { fr: "un journaliste d'investigation", en: "an investigative journalist" },
          { fr: "la déontologie et l'impartialité", en: "journalistic ethics and impartiality" },
          { fr: "la liberté d'expression", en: "freedom of expression" },
          { fr: "un lanceur d'alerte courageux", en: "a brave whistleblower" },
        ],
      },
      {
        heading: '✍️ Verbes Réguliers (-ER, -IR, -RE)',
        subheading: 'Dossier 2 • Présent',
        color: 'ts-amber',
        items: [
          { fr: "Le journaliste vérifie ses informations.", en: "The journalist verifies his info." },
          { fr: "Nous dénonçons les abus de pouvoir.", en: "We denounce abuses of power." },
          { fr: "Les reporters publient des révélations.", en: "Reporters publish revelations." },
          { fr: "La rédaction choisit la transparence.", en: "The editorial team chooses transparency." },
          { fr: "Les citoyens réagissent aux nouvelles.", en: "Citizens react to the news." },
          { fr: "La presse défend les droits démocratiques.", en: "The press defends democratic rights." },
          { fr: "Ils répondent aux questions difficiles.", en: "They answer hard questions." },
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
        heading: "1. Lancer l'enquête & Poser les faits",
        subheading: 'Salle de Rédaction',
        color: 'ts-indigo',
        items: [
          { fr: "Dans la salle de rédaction, nous analysons chaque dossier." },
          { fr: "Selon notre enquête exclusive sur le terrain,..." },
          { fr: "Les journalistes recueillent des témoignages capitaux." },
          { fr: "Le rédacteur en chef confirme la véracité des faits." },
          { fr: "Cette information sensible suscite un vif débat public." },
        ],
      },
      {
        heading: "2. Verbes Clés & Auxiliaires",
        subheading: 'Être, Avoir, Faire, Devoir...',
        color: 'ts-amber',
        items: [
          { fr: "Les médias ont la responsabilité d'éclairer les citoyens." },
          { fr: "Nous sommes les garants d'une information authentique." },
          { fr: "Les reporters font face à de nombreuses pressions." },
          { fr: "Un gouvernement démocratique ne doit jamais censurer la vérité." },
          { fr: "Les journalistes peuvent enquêter sans crainte de représailles." },
          { fr: "Nous savons que l'indépendance de la presse n'a pas de prix." },
        ],
      },
      {
        heading: '3. Déontologie & Vérité',
        subheading: 'Éthique & Démocratie',
        color: 'ts-emerald',
        items: [
          { fr: "Pour rester impartiaux, nous confrontons toutes les sources." },
          { fr: "La manipulation de l'opinion menace notre société civile." },
          { fr: "Sans liberté d'expression, aucune démocratie ne peut fonctionner." },
          { fr: "En conclusion, informer le public demeure notre devoir absolu." },
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
        subheading: 'Style Journalistique',
        color: 'ts-violet',
        items: [
          { fr: "Tandis que la désinformation gagne du terrain, la presse rétablit les faits." },
          { fr: "Non seulement nous publions la vérité, mais nous protégeons aussi nos sources." },
          { fr: "Face aux tentatives d'intimidation, les professionnels refusent de céder." },
          { fr: "C'est pourquoi la transparence des institutions s'avère indispensable." },
          { fr: "Bien que la vérité dérange parfois, les citoyens ont le droit légitime de savoir." },
        ],
      },
      {
        heading: '📌 Rappel Grammaire Express',
        subheading: 'Terminaisons au Présent',
        color: 'ts-slate',
        items: [
          { fr: "1er groupe (-ER) : -e, -es, -e, -ons, -ez, -ent (ex: je publie, ils publient)" },
          { fr: "2e groupe (-IR) : -is, -is, -it, -issons, -issez, -issent (ex: nous réagissons)" },
          { fr: "3e groupe (-RE) : -s, -s, -, -ons, -ez, -ent (ex: elle défend, nous attendons)" },
          { fr: "ÊTRE : je suis, tu es, il est, nous sommes, vous êtes, ils sont" },
          { fr: "AVOIR : j'ai, tu as, il a, nous avons, vous avez, ils ont" },
          { fr: "FAIRE : je fais, tu fais, il fait, nous faisons, vous faites, ils font" },
          { fr: "ÉCRIRE : j'écris, tu écris, il écrit, nous écrivons, vous écrivez, ils écrivent" },
          { fr: "PRENDRE : je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent" },
        ],
      },
    ],
  },
];

// ── Checklist ──────────────────────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  { id: 'cl1', label: "Vocabulaire de la presse et des médias (Dossier 1)", badge: "Lexique Presse", color: "badge-sky" },
  { id: 'cl2', label: "Conjugaison correcte d'un verbe régulier (-ER, -IR ou -RE)", badge: "Présent Régulier", color: "badge-amber" },
  { id: 'cl3', label: "Utilisation d'un verbe clé (Être, Avoir, Faire, Devoir, Pouvoir)", badge: "Verbe Clé", color: "badge-indigo" },
  { id: 'cl4', label: "Réflexion sur l'impartialité ou la liberté d'expression", badge: "Déontologie & Société", color: "badge-emerald" },
];

// ── Utils ──────────────────────────────────────────────────────────────────────
function countWords(t) { return t.trim() === '' ? 0 : t.trim().split(/\s+/).length; }
function countSentences(t) { if (!t.trim()) return 0; const m = t.match(/[^.!?]*[.!?]+/g); return m ? m.length : 0; }

// ── Component ──────────────────────────────────────────────────────────────────
export default function TribuneJournalistique() {
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
              <div className="tj-unit-badge"><FileText size={12} />Unité 1 • Tribune Journalistique & Déontologie</div>
              <h2 className="tj-title">Tribune Journalistique — L'Enquête au Présent (Tier 1 UDL)</h2>
            </div>
            <div className="tj-tense-legend">
              <span className="tj-legend-pill legend-lexique">📰 Dossier 1 = Lexique Presse</span>
              <span className="tj-legend-pill legend-present">⚡ Dossier 2 = Présent de l'Indicatif</span>
            </div>
          </div>

          <div className="tj-prompt-box">
            <span className="tj-prompt-label">📝 Consigne de rédaction :</span>
            <p className="tj-prompt-text">
              « Vous êtes un journaliste d'investigation en salle de rédaction. Rédigez un court article ou une déclaration de presse <strong>(5 à 8 phrases)</strong> sur l'importance d'informer le public avec impartialité.
              Utilisez le vocabulaire de la presse{' '}
              <span className="tj-lex-hl">(Dossier 1 : sources fiables, censure, déontologie...)</span> et conjuguez vos verbes au présent de l'indicatif{' '}
              <span className="tj-pres-hl">(Dossier 2 : -ER, -IR, -RE, être/avoir...)</span>. »
            </p>
          </div>

          <div className="tj-checklist">
            <span className="tj-checklist-title">✅ Liste de vérification :</span>
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
              placeholder="« Dans la salle de rédaction, nous vérifions chaque information sensible. Les journalistes d'investigation défendent la liberté de la presse avec courage... »"
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              aria-label="Zone d'écriture journalistique"
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
            {wordCount >= MIN_WORDS && <span className="tj-progress-done">✨ Objectif atteint !</span>}
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
                  <span className="tj-over-target">Excellente richesse de vocabulaire !</span>
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
                {copied ? 'Copié !' : 'Copier mon article'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
