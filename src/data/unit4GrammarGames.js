export const IMPARFAIT_FILL_DATA = [
  {
    id: 1,
    text: "Autrefois, les élèves (aller) ___ à l'école de leur quartier sans uniforme.",
    options: ["allaient", "allait", "sont allés", "vont"],
    correctIdx: 0,
    explanation: "Sujet pluriel 'les élèves'. L'imparfait exprime une habitude ou routine passée : ils/elles allaient."
  },
  {
    id: 2,
    text: "Pendant que le professeur expliquait la leçon, la classe (écouter) ___ attentivement.",
    options: ["écoutait", "ont écouté", "écoutaient", "écoute"],
    correctIdx: 0,
    explanation: "Le sujet est 'la classe' (singulier, elle). L'imparfait décrit une action continue en arrière-plan : écoutait."
  },
  {
    id: 3,
    text: "Quand nous étions au lycée, nous (étudier) ___ à la bibliothèque chaque après-midi.",
    options: ["étudions", "étudiions", "étudiaient", "avons étudié"],
    correctIdx: 1,
    explanation: "Le sujet est 'nous'. Étudier à l'imparfait pour décrire une habitude répétée au passé (attention au double -i) : nous étudiions."
  },
  {
    id: 4,
    text: "À cette époque, le système éducatif (favoriser) ___ l'accès aux manuels scolaires gratuits.",
    options: ["favorisait", "favorisaient", "a favorisé", "favorise"],
    correctIdx: 0,
    explanation: "Le sujet est 'le système éducatif' (il). L'imparfait sert à décrire un état ou une situation générale du passé : favorisait."
  },
  {
    id: 5,
    text: "L'ancienne école du village (présenter) ___ de grandes fenêtres lumineuses.",
    options: ["présentait", "présentaient", "a présenté", "présente"],
    correctIdx: 0,
    explanation: "Le sujet est 'l'ancienne école' (singulier). L'imparfait sert à décrire les caractéristiques physiques d'un bâtiment : présentait."
  }
];

export const PC_FILL_DATA = [
  {
    id: 1,
    text: "Hier soir, le ministre de l'Éducation (annoncer) ___ une grande réforme scolaire.",
    options: ["a annoncé", "est annoncé", "annonçait", "ont annoncé"],
    correctIdx: 0,
    explanation: "Le verbe 'annoncer' utilise l'auxiliaire AVOIR. L'événement ponctuel et terminé hier soir demande le passé composé : a annoncé."
  },
  {
    id: 2,
    text: "Les nouveaux étudiants (entrer) ___ dans la salle de classe sous les applaudissements.",
    options: ["ont entré", "sont entrés", "est entré", "sont entré"],
    correctIdx: 1,
    explanation: "'Entrer' (verbe de déplacement) se conjugue avec l'auxiliaire ÊTRE au passé composé. Accord avec le sujet masculin pluriel 'les nouveaux étudiants' -> -és (sont entrés)."
  },
  {
    id: 3,
    text: "La directrice de l'école (écrire) ___ une lettre d'encouragement à tous les parents.",
    options: ["a écrit", "est écrite", "écrivait", "a écris"],
    correctIdx: 0,
    explanation: "Le verbe 'écrire' utilise l'auxiliaire AVOIR. Le participe passé est 'écrit'. Sujet féminin singulier : a écrit."
  },
  {
    id: 4,
    text: "La scolarisation des filles (devenir) ___ une priorité absolue pour le gouvernement.",
    options: ["est devenue", "a devenu", "est devenu", "sont devenues"],
    correctIdx: 0,
    explanation: "'Devenir' (changement d'état / DR & MRS VANDERTRAMP) se conjugue avec ÊTRE. Le sujet 'la scolarisation' est féminin singulier -> accord -e (est devenue)."
  },
  {
    id: 5,
    text: "Elles (se passionner) ___ pour la pédagogie moderne après ce stage pratique.",
    options: ["ont passionné", "se sont passionnées", "se sont passionné", "sont passionnées"],
    correctIdx: 1,
    explanation: "Verbe pronominal (se passionner) -> auxiliaire ÊTRE. Sujet 'Elles' (féminin pluriel) -> accord en -es (se sont passionnées)."
  }
];

export const MIXED_FILL_DATA = [
  {
    id: 1,
    text: "Les élèves (écouter) ___ tranquillement l'explication quand soudain la sonnerie a retenti.",
    options: ["écoutaient", "a écouté", "écoutait", "écoutent"],
    correctIdx: 0,
    explanation: "L'imparfait ('écoutaient') décrit l'action continue d'arrière-plan, interrompue by l'action soudaine au passé composé ('a retenti')."
  },
  {
    id: 2,
    text: "Il (faire) ___ beau dans la cour de récréation quand les enfants ont commencé à jouer.",
    options: ["a fait", "faisait", "faisaient", "fait"],
    correctIdx: 1,
    explanation: "Le temps qu'il faisait (contexte météorologique) se décrit à l'imparfait (faisait), tandis que le début du jeu est une action ponctuelle (ont commencé)."
  },
  {
    id: 3,
    text: "Pendant que les enseignants préparaient la rentrée, l'ordinateur de l'école (casser) ___.",
    options: ["cassait", "a cassé", "est cassé", "a cassée"],
    correctIdx: 1,
    explanation: "La préparation de la rentrée est le contexte en cours (préparaient), et la panne de l'ordinateur est l'incident soudain au passé composé (a cassé)."
  },
  {
    id: 4,
    text: "Le système de bourses (aider) ___ beaucoup d'étudiants jusqu'à ce que la loi change.",
    options: ["aidait", "a aidé", "aiderait", "aident"],
    correctIdx: 0,
    explanation: "L'aide continue fournie par le système de bourses (état durable dans le passé) requiert l'imparfait (aidait)."
  },
  {
    id: 5,
    text: "Quand le jeune chercheur (trouver) ___ sa voie, il s'est immédiatement inscrit à l'université.",
    options: ["trouvait", "a trouvé", "a trouvée", "est trouvé"],
    correctIdx: 1,
    explanation: "Trouver sa voie est le déclencheur d'une décision ponctuelle (événement clé), exprimé au passé composé (a trouvé)."
  }
];
