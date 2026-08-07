export const IMPARFAIT_FILL_DATA = [
  {
    id: 1,
    text: "Avant la création des aides sociales, la précarité (être) ___ beaucoup plus visible.",
    options: ["était", "étaient", "a été", "est"],
    correctIdx: 0,
    explanation: "Le sujet est 'la précarité' (elle). Le verbe être à l'imparfait : j'étais, tu étais, il/elle était."
  },
  {
    id: 2,
    text: "Autrefois, les associations caritatives (organiser) ___ des collectes chaque semaine.",
    options: ["organisait", "ont organisé", "organisaient", "organisent"],
    correctIdx: 2,
    explanation: "Sujet pluriel (les associations). L'imparfait pour une habitude dans le passé : ils/elles organisaient."
  },
  {
    id: 3,
    text: "Quand j'étais jeune, nous n'(avoir) ___ pas de problème de logement.",
    options: ["avons", "avions", "avaient", "aviez"],
    correctIdx: 1,
    explanation: "Le sujet est 'nous'. Avoir à l'imparfait : nous avions."
  },
  {
    id: 4,
    text: "En général, les bénévoles (finir) ___ la distribution des repas à 20h.",
    options: ["finissaient", "finissent", "ont fini", "finissait"],
    correctIdx: 0,
    explanation: "Sujet pluriel 'les bénévoles'. Finir (groupe 2) à l'imparfait : ils/elles finissaient."
  },
  {
    id: 5,
    text: "Tous les hivers, les sans-abri (faire) ___ face au froid extrême.",
    options: ["fesaient", "font", "faisaient", "ont fait"],
    correctIdx: 2,
    explanation: "Faire à l'imparfait (faux irrégulier) : ils faisaient. Attention à l'orthographe (fais- pas fes-)."
  }
];

export const PC_FILL_DATA = [
  {
    id: 1,
    text: "L'année dernière, le gouvernement (augmenter) ___ le SMIC.",
    options: ["a augmenté", "est augmenté", "augmentait", "ont augmenté"],
    correctIdx: 0,
    explanation: "Le verbe 'augmenter' utilise l'auxiliaire AVOIR. Le sujet est 'le gouvernement' (il)."
  },
  {
    id: 2,
    text: "Malheureusement, le nombre de personnes sous le seuil de pauvreté (monter) ___ l'hiver dernier.",
    options: ["a monté", "est monté", "sont montés", "est montés"],
    correctIdx: 1,
    explanation: "'Monter' est un verbe de DR & MRS VANDERTRAMP, donc il utilise l'auxiliaire ÊTRE. Le sujet (le nombre) est masculin singulier."
  },
  {
    id: 3,
    text: "Les bénévoles des Restos du Cœur (venir) ___ aider dans notre quartier.",
    options: ["ont venu", "sont venus", "est venus", "sont venu"],
    correctIdx: 1,
    explanation: "'Venir' utilise l'auxiliaire ÊTRE. Le sujet 'Les bénévoles' est masculin pluriel, donc on ajoute un 's' (venus)."
  },
  {
    id: 4,
    text: "Mon ami (perdre) ___ son emploi et a dû demander le RSA.",
    options: ["est perdu", "a perdit", "a perdu", "avait perdu"],
    correctIdx: 2,
    explanation: "Le verbe 'perdre' (-RE) utilise l'auxiliaire AVOIR. Le participe passé est 'perdu'."
  },
  {
    id: 5,
    text: "Elles (se mobiliser) ___ pour lutter contre l'exclusion sociale.",
    options: ["ont mobilisé", "se sont mobilisé", "se sont mobilisées", "sont mobilisées"],
    correctIdx: 2,
    explanation: "C'est un verbe pronominal (se mobiliser), donc auxiliaire ÊTRE. Le sujet 'Elles' est féminin pluriel -> mobilisées."
  }
];

export const MIXED_FILL_DATA = [
  {
    id: 1,
    text: "La situation (être) ___ difficile, quand soudain une association est intervenue.",
    options: ["a été", "était", "est", "étaient"],
    correctIdx: 1,
    explanation: "L'imparfait ('était') sert à planter le décor (contexte), interrompu par le passé composé ('est intervenue')."
  },
  {
    id: 2,
    text: "Il pleuvait quand nous (distribuer) ___ les repas aux sans-abri.",
    options: ["distribuions", "avons distribué", "avons distribués", "distribuait"],
    correctIdx: 1,
    explanation: "L'action précise qui se passe dans le décor (il pleuvait) est au passé composé (avons distribué)."
  },
  {
    id: 3,
    text: "Je (chercher) ___ un emploi depuis des mois, et un jour on m'a appelé.",
    options: ["a cherché", "cherchais", "cherchait", "ai cherché"],
    correctIdx: 1,
    explanation: "L'action continue dans le passé (contexte) est à l'imparfait (cherchais)."
  },
  {
    id: 4,
    text: "Le coût de la vie augmentait sans cesse, alors les étudiants (faire) ___ la grève.",
    options: ["faisaient", "ont faire", "ont fait", "font"],
    correctIdx: 2,
    explanation: "La grève est l'action soudaine/l'événement principal, donc passé composé (ont fait)."
  },
  {
    id: 5,
    text: "Ils n'___ (avoir) pas de logement, jusqu'au jour où la mairie leur a donné un appartement.",
    options: ["ont eu", "avaient", "avions", "ont"],
    correctIdx: 1,
    explanation: "L'état prolongé de ne pas avoir de logement (décor) utilise l'imparfait (avaient)."
  }
];
