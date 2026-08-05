import React, { useState, useEffect } from 'react';
import { Users, Timer, CheckCircle, ArrowRight, Play, Square, Award } from 'lucide-react';
import './Games.css';

const SCENARIOS = [
  {
    id: 'dubois',
    title: "La Demande d'Aide (Madame Dubois)",
    description: "Madame Dubois (55 ans) a perdu son emploi après la fermeture de l'usine locale. Elle n'arrive plus à payer son loyer. Elle se présente à la commission pour demander une aide financière d'urgence et un accompagnement vers l'emploi.",
    roles: [
      { name: "Madame Dubois", objective: "Convaincre la commission qu'elle a besoin d'une aide financière immédiate.", vocab: ["chômage", "loyer", "désespoir", "factures"] },
      { name: "Travailleur(se) Social(e)", objective: "Évaluer la situation de Madame Dubois et proposer un plan d'aide (RSA, etc.).", vocab: ["RSA", "aides sociales", "logement", "accompagnement"] },
      { name: "Conseiller(ère) Pôle Emploi", objective: "Proposer des formations pour sa reconversion.", vocab: ["insertion professionnelle", "formation", "compétences"] },
      { name: "Maire de la Ville", objective: "Rappeler les limites du budget municipal tout en montrant de l'empathie.", vocab: ["budget", "solidarité", "limites", "priorités"] },
      { name: "Représentant(e) Association", objective: "Proposer une aide alimentaire d'urgence (ex: Restos du Cœur).", vocab: ["association caritative", "insécurité alimentaire", "bénévoles"] }
    ]
  },
  {
    id: 'antoine',
    title: "Le Dossier du Jeune Diplômé (Antoine)",
    description: "Antoine (24 ans) a un master mais ne trouve pas de travail. Il vit de petits boulots (précarité) et n'arrive pas à louer un appartement car il n'a pas de garants. Il demande de l'aide pour un logement social.",
    roles: [
      { name: "Antoine", objective: "Expliquer sa précarité et demander un accès prioritaire à un logement.", vocab: ["précarité", "CDD", "garants", "injustice"] },
      { name: "Bailleur Social", objective: "Expliquer qu'il y a une liste d'attente de plusieurs années.", vocab: ["liste d'attente", "logement social", "dossier"] },
      { name: "Membre de la Mairie", objective: "Tenter de trouver une solution temporaire (Foyer Jeunes Travailleurs).", vocab: ["solution temporaire", "jeunes", "foyer"] },
      { name: "Travailleur(se) Social(e)", objective: "Orienter Antoine vers des aides spécifiques pour les jeunes.", vocab: ["aides au logement", "mission locale"] }
    ]
  },
  {
    id: 'diallo',
    title: "Le Non-Recours et Logement Indigne (M. Diallo)",
    description: "Monsieur Diallo (40 ans) travaille au SMIC, mais vit dans un logement insalubre avec ses deux enfants. Il ne savait pas qu'il avait droit à des aides. La commission doit l'aider à faire valoir ses droits et trouver un nouveau logement.",
    roles: [
      { name: "Monsieur Diallo", objective: "Raconter ses conditions de vie difficiles et son ignorance des aides.", vocab: ["mal-logement", "SMIC", "insalubre", "enfants"] },
      { name: "Inspecteur(trice) de l'Habitat", objective: "Confirmer que le logement actuel est dangereux et doit être fermé.", vocab: ["danger", "loi", "propriétaire", "amende"] },
      { name: "Travailleur(se) Social(e)", objective: "Calculer les droits de M. Diallo et l'aider à remplir les dossiers.", vocab: ["droits", "formulaires", "allocations", "APL"] },
      { name: "Membre d'une Association", objective: "Dénoncer les propriétaires qui profitent de la misère (marchands de sommeil).", vocab: ["inégalités", "loyer abusif", "justice"] }
    ]
  },
  {
    id: 'chen',
    title: "Précarité et Micro-Entrepreneur (Mme Chen)",
    description: "Madame Chen a créé sa petite entreprise, mais à cause de la hausse du coût de la vie, elle ne gagne plus assez pour vivre. Elle n'a pas le droit au chômage et risque de tout perdre. Elle demande un prêt d'honneur ou une subvention.",
    roles: [
      { name: "Madame Chen", objective: "Plaider pour une aide financière pour sauver son entreprise.", vocab: ["coût de la vie", "faillite", "travail dur", "inflation"] },
      { name: "Conseiller(ère) Économique", objective: "Analyser les chiffres de l'entreprise et voir si elle est viable.", vocab: ["rentabilité", "chiffres", "dettes", "statistique"] },
      { name: "Banquier(ère) (Partenaire de la Ville)", objective: "Refuser un prêt classique, mais proposer un microcrédit.", vocab: ["microcrédit", "risque", "garantie"] },
      { name: "Travailleur(se) Social(e)", objective: "S'assurer que Mme Chen a de quoi manger en attendant (aide alimentaire).", vocab: ["urgence", "insécurité alimentaire", "secours"] }
    ]
  }
];

const TIMER_DURATION = 45 * 60; // 45 minutes

export default function Unit4RoleplayGame() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerRunning, setTimerRunning] = useState(false);
  const [report, setReport] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(TIMER_DURATION);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFinish = () => {
    setFinished(true);
    setTimerRunning(false);
  };

  if (finished) {
    return (
      <div className="game-container game-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px' }}>
          <Award size={64} style={{ color: '#f1c40f', marginBottom: '1rem' }} />
          <h2 className="text-gradient">Commission Terminée !</h2>
          <p style={{ margin: '1rem 0' }}>Votre décision a été enregistrée :</p>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic', marginBottom: '2rem' }}>
            "{report || "Aucune décision n'a été saisie."}"
          </div>
          <button className="play-btn" onClick={() => { setFinished(false); setSelectedScenario(null); setReport(""); resetTimer(); }}>Retourner aux scénarios</button>
        </div>
      </div>
    );
  }

  if (selectedScenario) {
    return (
      <div className="game-container game-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Header */}
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>{selectedScenario.title}</h2>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>Jeu de Rôle : La Commission d'Aide Sociale</p>
            </div>
            <button className="back-btn" style={{ position: 'relative', top: 0, left: 0 }} onClick={() => setSelectedScenario(null)}>
              ← Retour
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            
            {/* Left Column: Roles & Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-panel">
                <h3><Users size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> La Situation</h3>
                <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{selectedScenario.description}</p>
              </div>

              <div className="glass-panel">
                <h3>Rôles à distribuer</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {selectedScenario.roles.map((r, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>{r.name}</h4>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>Objectif:</strong> {r.objective}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {r.vocab.map((v, j) => (
                          <span key={j} style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Timer & Report */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-panel" style={{ textAlign: 'center' }}>
                <h3><Timer size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Chronomètre</h3>
                <div style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', margin: '1rem 0' }}>
                  {formatTime(timeLeft)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button onClick={toggleTimer} className="play-btn" style={{ padding: '0.5rem 1rem', background: timerRunning ? 'var(--danger)' : 'var(--success)' }}>
                    {timerRunning ? <Square size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={resetTimer} className="play-btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)' }}>
                    Reset
                  </button>
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1rem' }}>Temps recommandé pour le débat : 45 minutes.</p>
              </div>

              <div className="glass-panel" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3>Décision de la Commission</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>Quelle est la décision finale ? Quelles aides accordez-vous ?</p>
                <textarea 
                  style={{ width: '100%', flexGrow: 1, minHeight: '150px', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', resize: 'none' }}
                  placeholder="Rédigez la décision finale de la commission ici..."
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
                <button className="play-btn btn-success" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={handleFinish}>
                  <CheckCircle size={20} /> Entériner la décision
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container game-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient">Jeu de Rôle : La Commission d'Aide Sociale</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto' }}>
            Divisez la classe en petits groupes. Chaque groupe choisit un scénario. Distribuez les rôles, préparez vos arguments en utilisant le vocabulaire et les connecteurs logiques, puis lancez le débat !
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {SCENARIOS.map(scenario => (
            <div key={scenario.id} className="game-card glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>{scenario.title}</h3>
              <p style={{ flexGrow: 1, lineHeight: '1.5', opacity: 0.9 }}>{scenario.description}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}><Users size={16} style={{ display: 'inline', verticalAlign: 'bottom', marginRight: '4px' }} /> {scenario.roles.length} Rôles</span>
                <button className="play-btn" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setSelectedScenario(scenario)}>
                  Sélectionner <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
