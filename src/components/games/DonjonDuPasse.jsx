import React, { useState, useCallback, useMemo } from 'react';
import { 
  Shield, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Trophy, 
  Key, 
  Lock, 
  ChevronRight, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Award,
  HelpCircle
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   DUNGEON DATA & QUESTIONS (UNITÉ 2 : ÉDUCATION & GRAMMAIRE)
═══════════════════════════════════════════════════════════════════ */
const CHAMBERS = [
  {
    id: 1,
    num: "I",
    title: "La Crypte des Auxiliaires",
    subtitle: "Passé Composé : Avoir, Être & Accords Spécifiques",
    theme: "📚 Bourses scolaires & Inscriptions universitaires",
    color: "#d97706", // Amber / Bronze
    bgGlow: "rgba(217, 119, 6, 0.14)",
    borderColor: "#b45309",
    icon: "🕯️",
    lore: "Une brume millénaire enveloppe la crypte. Pour franchir la herse de bronze, vous devez maîtriser les mystères des auxiliaires et l'accord du participe passé !",
    questions: [
      {
        id: "1-1",
        label: "Déplacement & Maison d'Être",
        context: "Parcours universitaire d'une étudiante émérite",
        sentenceBefore: "Après l'obtention de son diplôme, Émilie ",
        blank: "__________",
        sentenceAfter: " à l'université de la Sorbonne pour poursuivre ses recherches.",
        targetRule: "Verbe de mouvement (DR & MRS VANDERTRAMP) avec sujet féminin singulier.",
        options: [
          "est allée",
          "a allé",
          "a allée",
          "est allé"
        ],
        answer: 0,
        explanation: "✔ Le verbe « aller » fait partie des verbes de mouvement de la maison d'Être (DR & MRS VANDERTRAMP). Avec l'auxiliaire ÊTRE, le participe passé s'accorde obligatoirement en genre et en nombre avec le sujet : Émilie (fém. sing.) → « est allée »."
      },
      {
        id: "1-2",
        label: "Accord du COD placé avant Avoir",
        context: "Financement des bourses académiques",
        sentenceBefore: "Les bourses d'études que les lauréates ",
        blank: "__________",
        sentenceAfter: " ont permis de financer l'ensemble de leur scolarité.",
        targetRule: "Le pronom relatif « que » remplace le COD « les bourses d'études » (féminin pluriel), placé avant avoir.",
        options: [
          "ont reçues",
          "ont reçu",
          "sont reçues",
          "ont recevies"
        ],
        answer: 0,
        explanation: "✔ Avec l'auxiliaire AVOIR, le participe passé s'accorde avec le Complément d'Objet Direct (COD) si celui-ci est placé AVANT le verbe. Le pronom relatif « que » reprend « les bourses d'études » (féminin pluriel) → accord féminin pluriel : « ont reçues »."
      },
      {
        id: "1-3",
        label: "Verbes Pronominaux au Passé Composé",
        context: "Mobilisation pour la réforme éducative",
        sentenceBefore: "Face aux nouvelles réformes scolaires, tous les délégués de classe ",
        blank: "__________",
        sentenceAfter: " pour faire entendre la voix des lycéens.",
        targetRule: "Verbe pronominal (« se mobiliser ») au passé composé avec un sujet masculin pluriel.",
        options: [
          "se sont mobilisés",
          "ont se mobilisé",
          "se sont mobilisé",
          "s'ont mobilisés"
        ],
        answer: 0,
        explanation: "✔ Tous les verbes pronominaux (« se mobiliser ») se conjuguent obligatoirement avec l'auxiliaire ÊTRE au passé composé. Le sujet étant « tous les délégués » (masculin pluriel), le participe s'accorde : « se sont mobilisés »."
      }
    ]
  },
  {
    id: 2,
    num: "II",
    title: "La Galerie des Souvenirs",
    subtitle: "Le Duel Temporel : Imparfait vs Passé Composé",
    theme: "🏫 Vie scolaire & Événements inattendus",
    color: "#2563eb", // Deep Cobalt
    bgGlow: "rgba(37, 99, 235, 0.14)",
    borderColor: "#1d4ed8",
    icon: "🕰️",
    lore: "Des échos d'anciennes salles de classe résonnent dans ce couloir. Seuls ceux qui distinguent l'arrière-plan narratif (l'imparfait) de la rupture soudaine (le passé composé) pourront avancer !",
    questions: [
      {
        id: "2-1",
        label: "Action d'Arrière-Plan vs Événement Soudain",
        context: "Une séance d'étude interrompue",
        sentenceBefore: "Pendant que les élèves ",
        blank: "__________",
        sentenceAfter: " attentivement la leçon, le signal d'alarme a retenti soudainement.",
        fullSentenceContext: "Pendant que les élèves [écoutaient] attentivement la leçon, le signal d'alarme [a retenti] soudainement.",
        targetRule: "Action continue d'arrière-plan (imparfait) interrompue par un événement soudain.",
        options: [
          "écoutaient",
          "ont écouté",
          "écoutent",
          "avaient écouté"
        ],
        answer: 0,
        explanation: "✔ « Pendant que » introduit une action continue en cours d'accomplissement servant de décor d'arrière-plan. On utilise donc l'imparfait : « écoutaient », interrompu ensuite par l'alarme (« a retenti », au passé composé)."
      },
      {
        id: "2-2",
        label: "État Psychologique vs Changement Brutal",
        context: "La proclamation solennelle des résultats",
        sentenceBefore: "Avant la proclamation des résultats, les candidates ",
        blank: "__________",
        sentenceAfter: " très anxieuses, mais l'annonce officielle leur a apporté un immense soulagement.",
        targetRule: "Description d'un état d'esprit ou sentiment continu dans le passé.",
        options: [
          "étaient",
          "ont été",
          "seraient",
          "fussent"
        ],
        answer: 0,
        explanation: "✔ La description d'un état psychologique, émotionnel ou d'une attitude durable dans le passé s'exprime à l'imparfait : « les candidates étaient très anxieuses ». L'événement ponctuel qui modifie cet état est au passé composé (« a apporté »)."
      },
      {
        id: "2-3",
        label: "Habitude & Routine Répétée dans le Passé",
        context: "Règlement et coutumes du collège",
        sentenceBefore: "À cette époque-là, chaque vendredi matin, le proviseur ",
        blank: "__________",
        sentenceAfter: " une assemblée générale pour féliciter les initiatives solidaires.",
        targetRule: "Action habituelle et répétitive dans le passé (« chaque vendredi matin »).",
        options: [
          "organisait",
          "a organisé",
          "organise",
          "avait organisée"
        ],
        answer: 0,
        explanation: "✔ L'expression temporelle « chaque vendredi matin » marque une habitude récurrente et systématique dans le passé. Cette valeur d'itérativité/habitude requiert impérativement l'imparfait : « organisait »."
      }
    ]
  },
  {
    id: 3,
    num: "III",
    title: "La Salle des Énigmes",
    subtitle: "Pronoms Compléments : COD, COI, Y et EN",
    theme: "🌍 Politiques éducatives & Enquêtes pédagogiques",
    color: "#9333ea", // Purple / Amethyst
    bgGlow: "rgba(147, 51, 234, 0.15)",
    borderColor: "#7e22ce",
    icon: "🗝️",
    lore: "Des runes anciennes s'illuminent sur les parois. Les pronoms sont les clés de voûte de la langue française : remplacez judicieusement les compléments pour dissiper l'illusion !",
    questions: [
      {
        id: "3-1",
        label: "Pronom COD direct avec auxiliaire avoir",
        context: "Recrutement des nouveaux enseignants",
        sentenceBefore: "— L'inspecteur a-t-il auditionné les nouvelles enseignantes ?\n— Oui, il ",
        blank: "__________",
        sentenceAfter: " auditionnées pendant plus de deux heures.",
        targetRule: "« Auditionner quelqu'un » = COD féminin pluriel (« les ») placé avant avoir.",
        options: [
          "les a",
          "leur a",
          "lui a",
          "en a"
        ],
        answer: 0,
        explanation: "✔ Le verbe « auditionner » appelle un Complément d'Objet Direct (auditionner qui ? → les nouvelles enseignantes = féminin pluriel). Le pronom COD est « les ». Placé avant avoir, il commande l'accord du participe : « il les a auditionnées »."
      },
      {
        id: "3-2",
        label: "Pronom Adverbial Y (à + chose / lieu)",
        context: "Participation aux ateliers de tutorat",
        sentenceBefore: "— Vos camarades s'intéressent-ils aux ateliers de soutien scolaire ?\n— Absolument, ils ",
        blank: "__________",
        sentenceAfter: " participent deux fois par semaine.",
        targetRule: "« Participer à quelque chose » (à + nom inanimé / activité) se remplace par Y.",
        options: [
          "y",
          "en",
          "les",
          "leur"
        ],
        answer: 0,
        explanation: "✔ On dit « participer À quelque chose » (aux ateliers = préposition « à » + groupe nominal non animé). On remplace donc ce complément indirect par le pronom adverbial « y » : « ils y participent »."
      },
      {
        id: "3-3",
        label: "Pronom Adverbial EN (quantité / de + nom)",
        context: "Consultation d'ouvrages spécialisés",
        sentenceBefore: "— Avez-vous emprunté des manuels pédagogiques à la bibliothèque ?\n— Oui, nous ",
        blank: "__________",
        sentenceAfter: " avons emprunté plusieurs pour notre exposé.",
        targetRule: "Remplacement d'un nom introduit par « des » ou exprimant une quantité (« plusieurs ») par EN.",
        options: [
          "en",
          "y",
          "les",
          "leur"
        ],
        answer: 0,
        explanation: "✔ Lorsqu'un complément est introduit par un article partitif/indéfini (« des manuels ») ou quantifié par un mot de quantité (« plusieurs »), on utilise le pronom « en » : « nous en avons emprunté plusieurs »."
      }
    ]
  },
  {
    id: 4,
    num: "IV",
    title: "Le Sanctuaire Final",
    subtitle: "Doubles Pronoms & Synthèse Magistrale",
    theme: "🎓 Égalité des chances & Grands jalons historiques",
    color: "#dc2626", // Crimson / Ruby
    bgGlow: "rgba(220, 38, 38, 0.15)",
    borderColor: "#b91c1c",
    icon: "🚪",
    lore: "L'ultime porte du donjon est scellée par les maîtres de la grammaire. Seule une maîtrise parfaite de l'ordre des doubles pronoms et des temps du passé brisera le sceau définitif !",
    questions: [
      {
        id: "4-1",
        label: "Double Pronom : COD (le/la) + COI (lui/leur)",
        context: "Transmission du rapport officiel",
        sentenceBefore: "— Avez-vous transmis la synthèse sur l'égalité des genres à la ministre ?\n— Oui, nous ",
        blank: "__________",
        sentenceAfter: " transmise dès la première heure ce matin.",
        targetRule: "Ordre strict : COD (« la », pour la synthèse) avant COI 3e personne (« lui », pour la ministre).",
        options: [
          "la lui avons",
          "lui l'avons",
          "l'en avons",
          "la leur avons"
        ],
        answer: 0,
        explanation: "✔ L'ordre obligatoire en français pour la 3e personne place le pronom COD (« la », féminin singulier pour la synthèse) AVANT le pronom COI (« lui », à la ministre). Le COD « la » étant avant avoir, le participe s'accorde : « nous la lui avons transmise »."
      },
      {
        id: "4-2",
        label: "Double Pronom : COI (leur) + EN",
        context: "Communication avec le corps professoral",
        sentenceBefore: "— Les directeurs ont-ils parlé du nouveau calendrier scolaire aux professeurs ?\n— Oui, ils ",
        blank: "__________",
        sentenceAfter: " ont parlé lors du conseil pédagogique d'hier.",
        targetRule: "« Parler à quelqu'un » (COI pluriel = leur) « de quelque chose » (de + nom = en).",
        options: [
          "leur en",
          "les en",
          "en leur",
          "lui en"
        ],
        answer: 0,
        explanation: "✔ On dit « parler À quelqu'un » (COI pluriel → « leur ») « DE quelque chose » (du nouveau calendrier → « en »). Le pronom personnel précède toujours le pronom adverbial « en » : « ils leur en ont parlé »."
      },
      {
        id: "4-3",
        label: "Synthèse Historique : Événement Ponctuel & Contexte Époque",
        context: "Histoire de l'accès des femmes à l'enseignement supérieur",
        sentenceBefore: "Lorsque cette université prestigieuse ",
        blank: "__________",
        sentenceAfter: " ses portes en 1895, les femmes n'avaient pas encore accès à toutes les filières.",
        targetRule: "Événement historique ponctuel et daté (« en 1895 ») au passé composé.",
        options: [
          "a ouvert",
          "ouvrait",
          "a ouverte",
          "eut ouvri"
        ],
        answer: 0,
        explanation: "✔ « En 1895 » constitue un repère temporel historique précis et ponctuel, marquant un événement achevé qui fait progresser la chronologie : passé composé « a ouvert ». Pas d'accord car le COD « ses portes » est placé après le verbe !"
      }
    ]
  }
];

/* ── Web Audio API Helper (Clean synthetic retro dungeon sounds) ───── */
function playSound(type, soundEnabled) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      // Pleasant mystical chime (two rising harmonics)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      const now = ctx.currentTime;
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      osc2.frequency.setValueAtTime(659.25, now);
      osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else if (type === 'error') {
      // Low dungeon ward buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'victory') {
      // Triumph fanfare
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      });
    }
  } catch {
    // Ignore audio failures if browser blocks autoplay or Web Audio is restricted
  }
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function DonjonDuPasse({ onBack }) {
  const [currentChamberIdx, setCurrentChamberIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedChambers, setCompletedChambers] = useState([]);
  const [showChamberClearModal, setShowChamberClearModal] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [torchHealth, setTorchHealth] = useState(3); // 3 torches per chamber
  const [chamberScore, setChamberScore] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);

  const currentChamber = CHAMBERS[currentChamberIdx];
  const currentQuestion = currentChamber.questions[currentQuestionIdx];

  // Handle selecting an option
  const handleSelectOption = (idx) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      playSound('correct', soundEnabled);
      setChamberScore((prev) => prev + 1);
      setTotalCorrectCount((prev) => prev + 1);
    } else {
      playSound('error', soundEnabled);
      setTorchHealth((prev) => Math.max(0, prev - 1));
    }
  };

  // Move to next question or end of chamber
  const handleNextStep = () => {
    // If answer was wrong and torches depleted, allow retry of current question
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (isCorrect) {
      const nextQ = currentQuestionIdx + 1;
      if (nextQ < currentChamber.questions.length) {
        setCurrentQuestionIdx(nextQ);
      } else {
        // Chamber cleared!
        const newCompleted = [...new Set([...completedChambers, currentChamber.id])];
        setCompletedChambers(newCompleted);

        if (currentChamberIdx + 1 < CHAMBERS.length) {
          setShowChamberClearModal(true);
        } else {
          // Final Victory!
          setIsGameFinished(true);
          playSound('victory', soundEnabled);
        }
      }
    } else {
      // If student got it wrong, let them re-attempt with 1 torch restored
      if (torchHealth <= 1) {
        setTorchHealth(3);
      }
    }
  };

  // Advance to next chamber from modal
  const handleProceedToNextChamber = () => {
    setShowChamberClearModal(false);
    setCurrentChamberIdx((prev) => prev + 1);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTorchHealth(3);
    setChamberScore(0);
  };

  // Replay complete game
  const handleRestartGame = () => {
    setCurrentChamberIdx(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCompletedChambers([]);
    setShowChamberClearModal(false);
    setIsGameFinished(false);
    setTorchHealth(3);
    setChamberScore(0);
    setTotalCorrectCount(0);
  };

  // Jump to unlocked chamber if clicked in map
  const handleSelectChamber = (idx) => {
    if (idx === currentChamberIdx) return;
    // Allow jumping to any chamber that has already been unlocked or cleared
    const isUnlocked = idx === 0 || completedChambers.includes(CHAMBERS[idx - 1].id);
    if (isUnlocked) {
      setCurrentChamberIdx(idx);
      setCurrentQuestionIdx(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setTorchHealth(3);
      setChamberScore(0);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 20%, #170d2b 0%, #0a0814 60%, #05040a 100%)',
      color: '#f3e8ff',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      padding: '20px 16px 60px',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: 960,
        margin: '0 auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#e9d5ff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <ArrowLeft size={18} />
          Retour aux Ateliers
        </button>

        {/* Title Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: 22,
            filter: 'drop-shadow(0 0 8px #a855f7)'
          }}>🏰</span>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: 0.5,
              background: 'linear-gradient(135deg, #fef08a, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Le Donjon du Passé
            </h1>
            <span style={{ fontSize: 11, color: '#a855f7', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
              Quête Grammaticale • Unité 2
            </span>
          </div>
        </div>

        {/* Sound & Torches Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Torch HP */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 20,
            padding: '4px 12px',
          }}>
            {[1, 2, 3].map((t) => (
              <Flame
                key={t}
                size={16}
                style={{
                  color: t <= torchHealth ? '#fbbf24' : '#4b5563',
                  filter: t <= torchHealth ? 'drop-shadow(0 0 4px #f59e0b)' : 'none',
                  transition: 'color 0.3s'
                }}
              />
            ))}
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fef08a', marginLeft: 4 }}>
              Flammes
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              padding: 8,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: soundEnabled ? '#c084fc' : '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={soundEnabled ? "Couper le son" : "Activer le son"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* ── Chamber Navigation Steps ──────────────────────────────────── */}
      <div style={{
        maxWidth: 960,
        margin: '0 auto 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 10
      }}>
        {CHAMBERS.map((ch, idx) => {
          const isCurrent = idx === currentChamberIdx;
          const isDone = completedChambers.includes(ch.id);
          const isUnlocked = idx === 0 || completedChambers.includes(CHAMBERS[idx - 1].id);

          return (
            <div
              key={ch.id}
              onClick={() => handleSelectChamber(idx)}
              style={{
                background: isCurrent 
                  ? `linear-gradient(135deg, ${ch.color}28, rgba(30, 20, 60, 0.75))` 
                  : 'rgba(25, 20, 45, 0.55)',
                border: isCurrent 
                  ? `2px solid ${ch.color}` 
                  : isDone 
                  ? '1px solid #10b98188' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 14,
                padding: '12px 14px',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                opacity: isUnlocked ? 1 : 0.45,
                transition: 'all 0.25s',
                boxShadow: isCurrent ? `0 0 20px ${ch.color}44` : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: isCurrent ? ch.color : isDone ? '#34d399' : '#a78bfa',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}>
                  Chambre {ch.num}
                </span>
                <span>
                  {isDone ? (
                    <CheckCircle2 size={16} color="#34d399" />
                  ) : isUnlocked ? (
                    <Key size={15} color={ch.color} />
                  ) : (
                    <Lock size={15} color="#6b7280" />
                  )}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f3e8ff', marginBottom: 2 }}>
                {ch.title}
              </div>
              <div style={{ fontSize: 11, color: '#c4b5fd', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main Dungeon Arena ───────────────────────────────────────── */}
      {!isGameFinished ? (
        <div style={{
          maxWidth: 820,
          margin: '0 auto',
          background: 'rgba(23, 16, 46, 0.85)',
          border: `2px solid ${currentChamber.borderColor}`,
          borderRadius: 20,
          padding: '28px 24px',
          boxShadow: `0 10px 40px ${currentChamber.bgGlow}, 0 0 1px 1px ${currentChamber.borderColor}44`,
          backdropFilter: 'blur(12px)',
          position: 'relative'
        }}>
          {/* Chamber Header & Lore */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: 16,
            marginBottom: 20,
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20 }}>{currentChamber.icon}</span>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: currentChamber.color,
                  letterSpacing: 0.5
                }}>
                  Chambre {currentChamber.num} : {currentChamber.title}
                </h2>
              </div>
              <p style={{
                margin: 0,
                fontSize: 13,
                color: '#d8b4fe',
                fontStyle: 'italic',
                maxWidth: 600,
                lineHeight: 1.4
              }}>
                {currentChamber.lore}
              </p>
            </div>

            {/* Question Progress Dots */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 1 }}>
                Épreuve {currentQuestionIdx + 1} / {currentChamber.questions.length}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {currentChamber.questions.map((_, qIndex) => {
                  const isQActive = qIndex === currentQuestionIdx;
                  const isQPassed = qIndex < currentQuestionIdx;
                  return (
                    <div
                      key={qIndex}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: isQPassed 
                          ? '#10b981' 
                          : isQActive 
                          ? currentChamber.color 
                          : 'rgba(255, 255, 255, 0.15)',
                        border: isQActive ? `2px solid #fef08a` : '2px solid transparent',
                        boxShadow: isQActive ? `0 0 8px ${currentChamber.color}` : 'none',
                        transition: 'all 0.3s'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Theme & Topic Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: 12,
            color: '#f5d0fe',
            fontWeight: 600,
            marginBottom: 16
          }}>
            <BookOpen size={14} color="#d946ef" />
            <span>Thématique : {currentChamber.theme}</span>
          </div>

          {/* Challenge Sentence Box */}
          <div style={{
            background: 'rgba(10, 6, 25, 0.7)',
            border: '1px solid rgba(192, 132, 252, 0.25)',
            borderRadius: 14,
            padding: '20px 22px',
            marginBottom: 24,
            position: 'relative',
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#c084fc',
              letterSpacing: 1,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Sparkles size={14} />
              <span>Complétez la formule sacrée :</span>
            </div>

            <div style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: '#faf5ff',
              fontWeight: 500,
              whiteSpace: 'pre-line'
            }}>
              {currentQuestion.sentenceBefore}
              <span style={{
                display: 'inline-block',
                minWidth: 120,
                padding: '2px 10px',
                margin: '0 6px',
                borderRadius: 6,
                background: isAnswered 
                  ? isCorrect 
                    ? 'rgba(16, 185, 129, 0.25)' 
                    : 'rgba(239, 68, 68, 0.25)' 
                  : 'rgba(217, 119, 6, 0.2)',
                border: isAnswered 
                  ? isCorrect 
                    ? '2px solid #10b981' 
                    : '2px solid #ef4444' 
                  : '2px dashed #f59e0b',
                color: isAnswered 
                  ? isCorrect 
                    ? '#34d399' 
                    : '#f87171' 
                  : '#fef08a',
                fontWeight: 700,
                textAlign: 'center',
                textShadow: isAnswered ? '0 0 10px currentColor' : 'none',
                transition: 'all 0.25s'
              }}>
                {isAnswered ? currentQuestion.options[selectedOption] : "_____ ? _____"}
              </span>
              {currentQuestion.sentenceAfter}
            </div>

            {/* Target rule hint preview */}
            <div style={{
              marginTop: 12,
              fontSize: 12,
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <HelpCircle size={13} />
              <span>Indice : {currentQuestion.targetRule}</span>
            </div>
          </div>

          {/* Options Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            marginBottom: 24
          }}>
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isThisTheCorrectAnswer = optIdx === currentQuestion.answer;

              let btnBg = 'rgba(30, 20, 55, 0.65)';
              let btnBorder = '1px solid rgba(192, 132, 252, 0.25)';
              let textColor = '#f3e8ff';

              if (isAnswered) {
                if (isThisTheCorrectAnswer) {
                  btnBg = 'rgba(16, 185, 129, 0.25)';
                  btnBorder = '2px solid #10b981';
                  textColor = '#6ee7b7';
                } else if (isSelected && !isCorrect) {
                  btnBg = 'rgba(239, 68, 68, 0.25)';
                  btnBorder = '2px solid #ef4444';
                  textColor = '#fca5a5';
                } else {
                  btnBg = 'rgba(20, 15, 40, 0.4)';
                  btnBorder = '1px solid rgba(255, 255, 255, 0.08)';
                  textColor = '#9ca3af';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 12,
                    background: btnBg,
                    border: btnBorder,
                    color: textColor,
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 4px 16px rgba(0, 0, 0, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnswered) {
                      e.currentTarget.style.background = 'rgba(147, 51, 234, 0.25)';
                      e.currentTarget.style.borderColor = currentChamber.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnswered) {
                      e.currentTarget.style.background = btnBg;
                      e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.25)';
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.1)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#e9d5ff'
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </span>

                  {isAnswered && (
                    <span>
                      {isThisTheCorrectAnswer ? (
                        <CheckCircle2 size={18} color="#34d399" />
                      ) : isSelected ? (
                        <XCircle size={18} color="#f87171" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Pedagogical Feedback Panel */}
          {isAnswered && (
            <div style={{
              background: isCorrect ? 'rgba(6, 78, 59, 0.4)' : 'rgba(127, 29, 29, 0.4)',
              border: isCorrect ? '1px solid #059669' : '1px solid #dc2626',
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 20,
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 700,
                color: isCorrect ? '#6ee7b7' : '#fca5a5',
                marginBottom: 6
              }}>
                {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                <span>{isCorrect ? "Incantation Correcte !" : "Le Sortilège a Échoué !"}</span>
              </div>
              <p style={{
                margin: '0 0 14px',
                fontSize: 13.5,
                lineHeight: 1.55,
                color: isCorrect ? '#d1fae5' : '#fee2e2'
              }}>
                {currentQuestion.explanation}
              </p>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNextStep}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 22px',
                    borderRadius: 10,
                    background: isCorrect 
                      ? 'linear-gradient(135deg, #059669, #10b981)' 
                      : 'linear-gradient(135deg, #b91c1c, #ef4444)',
                    border: 'none',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                    transition: 'transform 0.15s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isCorrect ? (
                    currentQuestionIdx + 1 < currentChamber.questions.length ? (
                      <>
                        <span>Épreuve Suivante</span>
                        <ChevronRight size={16} />
                      </>
                    ) : (
                      <>
                        <span>Déverrouiller la Chambre</span>
                        <Key size={16} />
                      </>
                    )
                  ) : (
                    <>
                      <span>Recommencer cette épreuve</span>
                      <RotateCcw size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── Victory Screen ─────────────────────────────────────────── */
        <div style={{
          maxWidth: 680,
          margin: '30px auto',
          background: 'linear-gradient(145deg, rgba(35, 15, 65, 0.95), rgba(15, 8, 30, 0.95))',
          border: '2px solid #fbbf24',
          borderRadius: 24,
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(251, 191, 36, 0.25)',
          animation: 'fadeIn 0.5s ease'
        }}>
          <div style={{
            fontSize: 54,
            marginBottom: 10,
            filter: 'drop-shadow(0 0 16px #fbbf24)'
          }}>
            🏆
          </div>
          <h2 style={{
            margin: '0 0 10px',
            fontSize: '2rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #fef08a, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 1
          }}>
            Le Donjon du Passé est Vaincu !
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#e9d5ff',
            lineHeight: 1.6,
            maxWidth: 520,
            margin: '0 auto 28px'
          }}>
            Félicitations ! Vous avez brisé tous les sorts grammaticaux. Le passé composé, l'imparfait et les pronoms n'ont plus aucun secret pour vous !
          </p>

          {/* Badges Earned */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: 32
          }}>
            <div style={{
              background: 'rgba(217, 119, 6, 0.15)',
              border: '1px solid rgba(217, 119, 6, 0.4)',
              borderRadius: 14,
              padding: '14px',
            }}>
              <Award size={24} color="#fbbf24" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fef08a' }}>
                Maître du Passé Composé
              </div>
              <div style={{ fontSize: 11, color: '#fde68a', opacity: 0.8 }}>
                Auxiliaires & Accords COD
              </div>
            </div>

            <div style={{
              background: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              borderRadius: 14,
              padding: '14px',
            }}>
              <ClockIcon size={24} color="#60a5fa" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: 13, color: '#93c5fd' }}>
                Gardien de l'Imparfait
              </div>
              <div style={{ fontSize: 11, color: '#bfdbfe', opacity: 0.8 }}>
                Habitudes & Ruptures
              </div>
            </div>

            <div style={{
              background: 'rgba(147, 51, 234, 0.15)',
              border: '1px solid rgba(147, 51, 234, 0.4)',
              borderRadius: 14,
              padding: '14px',
            }}>
              <Sparkles size={24} color="#c084fc" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: 13, color: '#e9d5ff' }}>
                Souverain des Pronoms
              </div>
              <div style={{ fontSize: 11, color: '#ddd6fe', opacity: 0.8 }}>
                COD, COI, Y & EN
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={handleRestartGame}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#f3e8ff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={16} />
              Rejouer le Donjon
            </button>

            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                border: 'none',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(124, 58, 237, 0.4)'
              }}
            >
              <Trophy size={16} />
              Retourner aux Ateliers
            </button>
          </div>
        </div>
      )}

      {/* ── Modal: Chamber Cleared ──────────────────────────────────── */}
      {showChamberClearModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 5, 20, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 16
        }}>
          <div style={{
            maxWidth: 480,
            width: '100%',
            background: 'linear-gradient(145deg, #231238, #130a24)',
            border: `2px solid ${currentChamber.color}`,
            borderRadius: 20,
            padding: '30px 24px',
            textAlign: 'center',
            boxShadow: `0 0 40px ${currentChamber.bgGlow}`
          }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🗝️</div>
            <h3 style={{
              margin: '0 0 8px',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: currentChamber.color
            }}>
              Chambre {currentChamber.num} Débloquée !
            </h3>
            <p style={{
              fontSize: 14,
              color: '#e9d5ff',
              lineHeight: 1.5,
              margin: '0 0 24px'
            }}>
              Vous avez triomphé des énigmes de <strong>{currentChamber.title}</strong>. La porte vers la chambre suivante vient de s'ouvrir !
            </p>
            <button
              onClick={handleProceedToNextChamber}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 12,
                background: `linear-gradient(135deg, ${currentChamber.color}, #7c3aed)`,
                border: 'none',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
              }}
            >
              <span>Pénétrer dans la Chambre {CHAMBERS[currentChamberIdx + 1]?.num}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ClockIcon({ size = 20, color = 'currentColor', style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
