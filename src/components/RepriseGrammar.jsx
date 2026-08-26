import React, { useState } from 'react';
import { BookOpen, AlertCircle, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

const QUESTION_RULES = [
  {
    id: "intonation",
    title: "L'Intonation",
    subtitle: "Registre familier / oral",
    trigger: "Oral & Familier",
    explanation: "C'est la méthode la plus simple et la plus courante à l'oral. On garde l'ordre habituel des mots de la phrase affirmative et on monte l'intonation de la voix à la fin.",
    ruleText: "Sujet + Verbe + Complément + ?",
    exampleAffirmative: <>Tu parles français.</>,
    exampleNegative: <>Tu parles français <strong className="text-blue-400">?</strong></>,
    tips: "À l'oral, la voix monte sur la dernière syllabe pour marquer l'interrogation."
  },
  {
    id: "est-ce-que",
    title: "Est-ce que",
    subtitle: "Registre standard / neutre",
    trigger: "Standard & Neutre",
    explanation: "Cette structure s'utilise dans toutes les situations, à l'oral comme à l'écrit. Il suffit de placer la locution « Est-ce que » au début de la phrase affirmative.",
    ruleText: "Est-ce que + Sujet + Verbe + ?",
    exampleAffirmative: <>Tu parles français.</>,
    exampleNegative: <><strong className="text-blue-400">Est-ce que</strong> tu parles français ?</>,
    tips: "« Est-ce que » devient « Est-ce qu' » devant une voyelle ou un 'h' muet (ex: Est-ce qu'il étudie ?)."
  },
  {
    id: "inversion",
    title: "L'Inversion",
    subtitle: "Registre soutenu / écrit",
    trigger: "Formel & Écrit",
    explanation: "Principalement utilisé à l'écrit ou dans un registre très soigné. On échange la place du sujet (pronom personnel) et du verbe, reliés par un trait d'union.",
    ruleText: "Verbe-Pronom + Complément + ?",
    exampleAffirmative: <>Tu parles français.</>,
    exampleNegative: <><strong className="text-blue-400">Parles-tu</strong> français ?</>,
    tips: "Vowel smoothing : Si le verbe se termine par une voyelle et le pronom commence par une voyelle (il/elle/on), on insère '-t-' (ex: Aime-t-il le café ?). Noun subjects : Si le sujet est un nom, on le garde au début et on ajoute le pronom après le verbe (ex: Marie parle-t-elle français ?)."
  },
  {
    id: "mots-interrogatifs",
    title: "Mots Interrogatifs",
    subtitle: "Questions ouvertes (Information)",
    trigger: "Questions ouvertes",
    explanation: "Pour obtenir une information spécifique (lieu, temps, cause, manière, etc.), on place un mot interrogatif au début de la phrase. On peut ensuite utiliser la structure 'Est-ce que' ou l'inversion.",
    ruleText: "Mot Interrogatif + [Est-ce que / Inversion] + ?",
    exampleAffirmative: <>Tu habites à Paris.</>,
    exampleNegative: <><strong className="text-blue-400">Où</strong> habites-tu ? / <strong className="text-blue-400">Où est-ce que</strong> tu habites ?</>,
    tips: "Les principaux mots interrogatifs : Où (lieu), Quand (temps), Pourquoi (cause), Comment (manière), Qui (personne), Combien (quantité). Pour 'Que' (chose), on utilise 'Que voulez-vous ?' (formel) ou 'Tu veux quoi ?' (informel)."
  }
];

const NEGATION_RULES = [
  {
    id: "pas",
    title: "Ne ... pas",
    subtitle: "La négation standard",
    trigger: "Affirmation générale",
    explanation: "C'est la forme de négation de base en français. Elle encadre le verbe conjugué aux temps simples.",
    ruleText: "Sujet + ne + Verbe + pas",
    exampleAffirmative: <>Je comprends le suspect.</>,
    exampleNegative: <>Je <strong className="text-blue-400">ne</strong> comprends <strong className="text-blue-400">pas</strong> le suspect.</>,
    tips: "Le « ne » devient « n' » devant une voyelle ou un « h » muet (exemple : Je n'avoue pas)."
  },
  {
    id: "jamais",
    title: "Ne ... jamais",
    subtitle: "Contraire de : toujours / souvent",
    trigger: "toujours / parfois / souvent",
    explanation: "Utilisé pour exprimer une absence totale de fréquence ou de répétition dans le temps.",
    ruleText: "Sujet + ne + Verbe + jamais",
    exampleAffirmative: <>Il avoue <strong className="text-amber-500">toujours</strong> la vérité.</>,
    exampleNegative: <>Il <strong className="text-blue-400">n'</strong>avoue <strong className="text-blue-400">jamais</strong> la vérité.</>,
    tips: "Remplace complètement le mot 'toujours' dans la phrase négative."
  },
  {
    id: "rien",
    title: "Ne ... rien",
    subtitle: "Contraire de : tout / quelque chose",
    trigger: "tout / quelque chose",
    explanation: "Sert à nier des objets, des choses ou des actions. 'Rien' peut être placé comme complément ou comme sujet de la phrase.",
    ruleText: "Sujet + ne + Verbe + rien",
    exampleAffirmative: <>J'ai trouvé <strong className="text-amber-500">quelque chose</strong> dans le coffre.</>,
    exampleNegative: <>Je <strong className="text-blue-400">n'</strong>ai <strong className="text-blue-400">rien</strong> trouvé dans le coffre.</>,
    tips: "Aux temps composés (comme le passé composé), 'rien' se place entre l'auxiliaire et le participe passé."
  },
  {
    id: "personne",
    title: "Ne ... personne",
    subtitle: "Contraire de : quelqu'un / tout le monde",
    trigger: "quelqu'un / tout le monde",
    explanation: "Sert à nier l'existence ou la présence d'êtres humains. Peut être complément d'objet direct ou sujet.",
    ruleText: "Sujet + ne + Verbe + personne",
    exampleAffirmative: <>Le détective soupçonne <strong className="text-amber-500">quelqu'un</strong>.</>,
    exampleNegative: <>Le détective <strong className="text-blue-400">ne</strong> soupçonne <strong className="text-blue-400">personne</strong>.</>,
    tips: "Attention ! Aux temps composés, 'personne' se place APRÈS le participe passé (ex: Je n'ai vu personne)."
  },
  {
    id: "plus",
    title: "Ne ... plus",
    subtitle: "Contraire de : encore",
    trigger: "encore",
    explanation: "Indique la fin d'une action en cours ou un changement d'état. L'action s'est arrêtée.",
    ruleText: "Sujet + ne + Verbe + plus",
    exampleAffirmative: <>Le suspect habite <strong className="text-amber-500">encore</strong> à cette adresse.</>,
    exampleNegative: <>Le suspect <strong className="text-blue-400">n'</strong>habite <strong className="text-blue-400">plus</strong> à cette adresse.</>,
    tips: "S'utilise pour exprimer la notion de 'no longer' ou 'not anymore' en anglais."
  },
  {
    id: "aucun",
    title: "Ne ... aucun(e)",
    subtitle: "Contraire de : un / des / plusieurs",
    trigger: "un / des / quelques / plusieurs",
    explanation: "Exprime une quantité nulle absolue. L'adjectif 'aucun' s'accorde en genre (aucun ou aucune) avec le nom auquel il se rapporte.",
    ruleText: "Sujet + ne + Verbe + aucun(e) + Nom",
    exampleAffirmative: <>J'ai trouvé <strong className="text-amber-500">plusieurs</strong> indices dans le bureau.</>,
    exampleNegative: <>Je <strong className="text-blue-400">n'</strong>ai trouvé <strong className="text-blue-400">aucun</strong> indice dans le bureau.</>,
    tips: "Le nom qui suit 'aucun(e)' est presque toujours au singulier."
  }
];

export default function RepriseGrammar() {
  const [activeRuleId, setActiveRuleId] = useState("intonation");

  const rulesList = [...QUESTION_RULES, ...NEGATION_RULES];
  const activeRule = rulesList.find(r => r.id === activeRuleId) || rulesList[0];
  const isQuestion = QUESTION_RULES.some(r => r.id === activeRule.id);

  return (
    <div className="rg-container animate-in">
      <style>{STYLE_BLOCK}</style>

      {/* Header */}
      <div className="rg-header">
        <div className="rg-title-group">
          <h2>Fiche de Grammaire : Reprise 📚</h2>
          <p>Révisez les structures fondamentales pour poser des questions et utiliser la négation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Directory Sidebar */}
        <div className="lg:col-span-4 rg-sidebar">
          <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 px-2">
            Index des fiches
          </div>
          <div className="flex flex-col gap-2">
            {rulesList.map((rule) => {
              const isActive = rule.id === activeRuleId;
              return (
                <button
                  key={rule.id}
                  onClick={() => setActiveRuleId(rule.id)}
                  className={`rg-folder-tab ${isActive ? 'active' : ''}`}
                >
                  <BookOpen size={16} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                  <div className="text-left">
                    <div className="font-bold text-sm leading-tight text-slate-100">
                      {rule.title}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {rule.subtitle}
                    </div>
                  </div>
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Dossier Panel */}
        <div className="lg:col-span-8 rg-main-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">
                Fiche d'instruction : {activeRule.title}
              </h3>
            </div>

            {/* Explanation box */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Description :</h4>
              <p className="text-slate-200 leading-relaxed text-base font-medium">
                {activeRule.explanation}
              </p>
            </div>

            {/* Structure box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850 mb-6 font-mono text-center">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Structure syntaxique</div>
              <span className="text-lg font-bold text-blue-400">{activeRule.ruleText}</span>
            </div>

            {/* Side-by-Side Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Forme Affirmative
                </div>
                <span className="text-sm font-semibold text-slate-300">{activeRule.exampleAffirmative}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-blue-900/30 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">
                  {isQuestion ? "Forme Interrogative" : "Forme Négative"}
                </div>
                <span className="text-sm font-bold text-slate-100">{activeRule.exampleNegative}</span>
              </div>
            </div>

            {/* Helpful tips */}
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/10 text-slate-300">
              <div className="flex gap-2.5">
                <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-xs font-black uppercase text-blue-400 tracking-wider block mb-1">Règle d'usage</span>
                  <p className="text-xs leading-relaxed font-medium text-slate-355">{activeRule.tips}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt to try in practice */}
          <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>💡 Conseil : Retrouvez ces structures dans les activités de révision de l'onglet pratique !</span>
          </div>
        </div>

      </div>

      {/* Special Rule Panel based on active tab */}
      {!isQuestion && (
        <div className="rg-special-panel mt-2">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-base text-slate-100 mb-1">La Règle Spéciale : L'Article Partitif et Indéfini (de / d')</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                À la négation, les articles indéfinis (<strong className="text-blue-400">un, une, des</strong>) et partitifs (<strong className="text-blue-400">du, de la, de l'</strong>) se transforment systématiquement en <strong className="text-emerald-400">de</strong> (ou <strong className="text-emerald-450">d'</strong> devant une voyelle).
              </p>
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Affirmatif :</div>
                  <span className="text-sm font-semibold text-slate-300">Je mange <strong className="text-red-400">une</strong> pomme. / Je bois <strong className="text-red-400">de l'</strong>eau.</span>
                </div>
                <div>
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Négatif :</div>
                  <span className="text-sm font-bold text-slate-100">Je <strong className="text-blue-400">ne</strong> mange <strong className="text-blue-400">pas</strong> <strong className="text-emerald-400">de</strong> pomme. / Je <strong className="text-blue-400">ne</strong> bois <strong className="text-blue-400">pas</strong> <strong className="text-emerald-450">d'</strong>eau.</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 italic">
                * Exception importante : Cette transformation n'a pas lieu avec le verbe être (ex: C'est un livre $\rightarrow$ Ce n'est pas un livre).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STYLE_BLOCK = `
  .rg-container {
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

  .rg-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .rg-title-group h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.3rem 0;
    background: linear-gradient(135deg, #60a5fa, #3b82f6, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .rg-title-group p {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin: 0;
  }

  .rg-sidebar {
    background: rgba(15, 23, 42, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rg-folder-tab {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: #cbd5e1;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }

  .rg-folder-tab:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: white;
  }

  .rg-folder-tab.active {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .rg-main-panel {
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 1.5rem;
  }

  .rg-special-panel {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 18px;
    padding: 1.5rem;
  }
`;
