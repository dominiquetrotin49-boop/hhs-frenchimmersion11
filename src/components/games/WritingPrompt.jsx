import React, { useState, useRef } from 'react';
import { BookOpen, RefreshCw, Send, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { analyzeFrenchText } from '../../utils/frenchTextAnalyzer';

const WRITING_PROMPTS = [
  {
    id: 1,
    title: "Votre routine matinale",
    prompt: "Décrivez votre routine du matin au présent. Qu'est-ce que vous faites en premier ? Que mangez-vous ?"
  },
  {
    id: 2,
    title: "Vos loisirs préférés",
    prompt: "Parlez de vos loisirs préférés. Pourquoi aimez-vous ces activités et quand les pratiquez-vous ?"
  },
  {
    id: 3,
    title: "Votre meilleur(e) ami(e)",
    prompt: "Décrivez votre meilleur(e) ami(e). Comment est-il ou elle physiquement et mentalement ?"
  },
  {
    id: 4,
    title: "Votre maison de rêve",
    prompt: "Décrivez votre maison ou appartement de rêve au présent. Quels meubles ou pièces y a-t-il ?"
  }
];

const UNIT1_PROMPTS = [
  {
    id: 1,
    title: "Votre héros ou héroïne préféré(e)",
    prompt: "Décrivez votre héros ou héroïne préféré(e) (réel ou fictif) au présent. Quelles sont ses qualités morales et ses pouvoirs ?"
  },
  {
    id: 2,
    title: "Le portrait d'un anti-héros",
    prompt: "Présentez un anti-héros célèbre (de livre ou de film) au présent. Expliquez pourquoi ce personnage est complexe et quelles sont ses faiblesses."
  },
  {
    id: 3,
    title: "Si vous étiez un super-héros",
    prompt: "Si vous étiez un super-héros, quel serait votre pouvoir spécial ? Décrivez vos actions quotidiennes pour sauver le monde au présent."
  },
  {
    id: 4,
    title: "Le rival ou le méchant",
    prompt: "Décrivez un méchant ou un rival marquant d'une histoire au présent. Quelles sont ses motivations et ses traits de caractère principaux ?"
  }
];

const ACCENTS = ["é", "è", "à", "ù", "ç", "â", "ê", "î", "ô", "û", "ë", "ï", "œ"];

export default function WritingPrompt({ onBack, unitId }) {
  const promptsList = unitId === '1' ? UNIT1_PROMPTS : WRITING_PROMPTS;

  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  
  const textareaRef = useRef(null);
  const activePrompt = promptsList[promptIdx];

  const handleAccentClick = (char) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const currentVal = el.value;

    const newVal = currentVal.slice(0, start) + char + currentVal.slice(end);
    
    // Check characters count
    if (newVal.length > 150) return;

    setText(newVal);

    setTimeout(() => {
      el.focus();
      const newPos = start + char.length;
      el.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= 150) {
      setText(val);
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    const result = analyzeFrenchText(text.trim(), { unitId: '1' });
    setFeedback(result);
  };

  const handleNextPrompt = () => {
    setPromptIdx(prev => (prev + 1) % promptsList.length);
    setText("");
    setFeedback(null);
    setError(null);
  };

  const handleReset = () => {
    setText("");
    setFeedback(null);
    setError(null);
  };

  return (
    <div className="wp-container animate-in">
      <style>{STYLE_BLOCK}</style>

      {/* Header */}
      <div className="wp-header">
        <div className="wp-title-group">
          <h2>Atelier d'Écriture : Le Présent 📝</h2>
          <p>Entraînez-vous à rédiger au présent et recevez des corrections grammaticales immédiates.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleNextPrompt} className="wp-secondary-btn flex items-center gap-2">
            <RefreshCw size={14} />
            Sujet suivant
          </button>
          {onBack && (
            <button onClick={onBack} className="wp-reset-btn">
              ← Retour
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Panel: Prompt & Input */}
        <div className="lg:col-span-6 wp-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">
                Sujet d'écriture (Niveau Intermédiaire-Bas)
              </h3>
            </div>

            {/* Prompt Display */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6">
              <h4 className="text-sm font-bold text-slate-200 mb-1">{activePrompt.title}</h4>
              <p className="text-sm text-slate-350 leading-relaxed font-medium">
                {activePrompt.prompt}
              </p>
            </div>

            {/* Accent Bar */}
            <div className="mb-2">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                Accents utiles :
              </div>
              <div className="flex flex-wrap gap-1">
                {ACCENTS.map((char) => (
                  <button
                    key={char}
                    onClick={() => handleAccentClick(char)}
                    className="accent-key-btn"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Input */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Rédigez votre réponse ici (en français)..."
                className="wp-textarea"
                rows="6"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
              />
              <div className="absolute right-3 bottom-3 text-xs text-slate-500 font-mono">
                {text.length} / 150 caract.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
            <button
              onClick={handleReset}
              disabled={!text.trim()}
              className="wp-secondary-btn"
            >
              Effacer
            </button>
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="wp-primary-btn"
            >
              <Send size={14} />
              Soumettre pour correction
            </button>
          </div>
        </div>

        {/* Right Panel: Feedback Report */}
        <div className="lg:col-span-6 wp-panel flex flex-col justify-between">
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-widest text-purple-400">
                  Rapport de Correction Pédagogique
                </h3>
              </div>

              {/* Error banner */}
              {error && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-200 flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Empty state before submit */}
              {!feedback && !error && (
                <div className="text-center py-16 text-slate-500">
                  <HelpCircle size={40} className="mx-auto opacity-40 mb-3" />
                  <p className="text-sm font-semibold">Aucun texte soumis pour le moment.</p>
                  <p className="text-xs text-slate-400 mt-1">Rédigez votre réponse et cliquez sur Soumettre pour recevoir vos corrections.</p>
                </div>
              )}

              {/* Feedback Content */}
              {feedback && (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  
                  {/* Score */}
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: feedback.score >= 7 ? '#16a34a' : feedback.score >= 5 ? '#d97706' : '#dc2626' }}>{feedback.score}</span>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#94a3b8' }}>/ 10</span>
                    </div>
                  </div>

                  {/* General feedback */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Retour général</span>
                    <p className="text-sm text-slate-200 leading-relaxed font-semibold italic">
                      "{feedback.generalFeedback}"
                    </p>
                  </div>

                  {/* Perfect work check */}
                  {feedback.isValid && (
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-emerald-100 flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-400" size={20} />
                      <div>
                        <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block mb-0.5">Zéro faute !</span>
                        <p className="text-xs font-medium">Excellent travail ! Votre orthographe et accords de verbes/adjectifs sont corrects.</p>
                      </div>
                    </div>
                  )}

                  {/* Verbs feedback */}
                  {feedback.verbAgreements && feedback.verbAgreements.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block">Accords de verbes (présent)</span>
                      {feedback.verbAgreements.map((err, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-red-500/10 bg-red-950/5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-red-300">Sujet : « {err.subject} »</span>
                            <span className="line-through text-slate-500">{err.error}</span>
                            <span className="text-emerald-400 font-bold">➔ {err.correction}</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed mt-1">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Adjectives feedback */}
                  {feedback.adjectiveAgreements && feedback.adjectiveAgreements.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block">Accord des adjectifs</span>
                      {feedback.adjectiveAgreements.map((err, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-orange-500/10 bg-orange-950/5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-orange-300">Nom qualifié : « {err.noun} »</span>
                            <span className="line-through text-slate-500">{err.error}</span>
                            <span className="text-emerald-400 font-bold">➔ {err.correction}</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed mt-1">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Noun Genders feedback */}
                  {feedback.nounGenders && feedback.nounGenders.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">Genre des noms & articles</span>
                      {feedback.nounGenders.map((err, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-amber-500/10 bg-amber-950/5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="line-through text-slate-500">{err.error}</span>
                            <span className="text-emerald-400 font-bold">➔ {err.correction}</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed mt-1">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Spelling feedback */}
                  {feedback.spellingErrors && feedback.spellingErrors.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">Orthographe</span>
                      {feedback.spellingErrors.map((err, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-blue-500/10 bg-blue-950/5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="line-through text-slate-500">{err.error}</span>
                            <span className="text-emerald-400 font-bold">➔ {err.correction}</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed mt-1">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Word Choices & Prepositions feedback */}
                  {feedback.wordChoices && feedback.wordChoices.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">Vocabulaire & Prépositions</span>
                      {feedback.wordChoices.map((err, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-purple-500/10 bg-purple-950/5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="line-through text-slate-500">{err.error}</span>
                            <span className="text-emerald-400 font-bold">➔ {err.correction}</span>
                          </div>
                          <p className="text-slate-400 leading-relaxed mt-1">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Structure & Grammar Notes */}
                  {feedback.structureNotes && feedback.structureNotes.length > 0 && (
                    <div className="space-y-2">
                      <span style={{ fontSize: '10px', fontWeight: 900, color: '#0891b2', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Structure & Conjugaisons</span>
                      {feedback.structureNotes.map((note, idx) => (
                        <div key={idx} style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', background: note.type === 'success' ? 'rgba(22,163,74,0.05)' : note.type === 'warning' ? 'rgba(217,119,6,0.05)' : 'rgba(220,38,38,0.05)', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                          {note.type === 'success' && '✅ '}
                          {note.type === 'warning' && '⚠️ '}
                          {note.type === 'error' && '❌ '}
                          {note.msg}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-500 italic mt-4 text-center">
              💡 Révisez la conjugaison du présent de l'indicatif et l'accord des adjectifs dans l'onglet "Grammaire" !
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const STYLE_BLOCK = `
  .wp-container {
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

  .wp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .wp-title-group h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.3rem 0;
    background: linear-gradient(135deg, #60a5fa, #3b82f6, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .wp-title-group p {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin: 0;
  }

  .wp-panel {
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 1.5rem;
  }

  .accent-key-btn {
    width: 28px;
    height: 32px;
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 6px;
    color: #93c5fd;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .accent-key-btn:hover:not(:disabled) {
    background: rgba(59, 130, 246, 0.25);
    color: white;
    transform: translateY(-1px);
  }

  .wp-textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(15, 23, 42, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    resize: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .wp-textarea:focus {
    border-color: #3b82f6;
    background: rgba(15, 23, 42, 0.85);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
  }

  .wp-primary-btn {
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: 1px solid #2563eb;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .wp-primary-btn:hover:not(:disabled) {
    background: #2563eb;
  }

  .wp-primary-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wp-secondary-btn {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .wp-secondary-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .wp-reset-btn {
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

  .wp-reset-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .wp-loader {
    width: 36px;
    height: 36px;
    border: 4px solid rgba(59, 130, 246, 0.2);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: wp-spin 1s infinite linear;
  }

  @keyframes wp-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
