export const NOVEL_CHAPTERS = [
  {
    id: 1,
    number: "Chapitre 1",
    title: "Le Premier Scoop",
    theme: "Médias, Presse & Opinion",
    grammarFocus: "Présent de l'indicatif & Expressions d'opinion",
    summary: "Léa et Hugo découvrent un mystérieux carnet ancien dans le grenier du journal du lycée.",
    content: [
      {
        id: "p1",
        speaker: "lea",
        speakerName: "Léa",
        text: "Regarde Hugo ! Je viens de trouver ce vieux dossier derrière les armoires de la rédaction du journal. Il était caché sous une pile de journaux de 1985 !",
        audioText: "Regarde Hugo ! Je viens de trouver ce vieux dossier derrière les armoires de la rédaction du journal. Il était caché sous une pile de journaux de 1985 !",
        audioSrc: "/audio/novel_c1_p1.mp3"
      },
      {
        id: "p2",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Attends Léa, laisse-moi prendre une photo d'abord. À mon avis, ce n'est pas un dossier ordinaire. La couverture en cuir porte un symbole très étrange.",
        audioText: "Attends Léa, laisse-moi prendre une photo d'abord. À mon avis, ce n'est pas un dossier ordinaire. La couverture en cuir porte un symbole très étrange.",
        audioSrc: "/audio/novel_c1_p2.mp3"
      },
      {
        id: "p3",
        speaker: "lea",
        speakerName: "Léa",
        text: "D'après moi, c'est le carnet d'un ancien journaliste de notre lycée ! Écoute ce qu'il a écrit sur la première page : 'La vérité sur la ville de Harwood se trouve dans les cinq trésors du patrimoine...'",
        audioText: "D'après moi, c'est le carnet d'un ancien journaliste de notre lycée ! Écoute ce qu'il a écrit sur la première page : La vérité sur la ville de Harwood se trouve dans les cinq trésors du patrimoine...",
        audioSrc: "/audio/novel_c1_p3.mp3"
      },
      {
        id: "p4",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Je pense que nous tenons notre premier grand scoop pour l'édition de ce mois-ci ! Mais nous devons vérifier nos sources avant de publier l'article.",
        audioText: "Je pense que nous tenons notre premier grand scoop pour l'édition de ce mois-ci ! Mais nous devons vérifier nos sources avant de publier l'article.",
        audioSrc: "/audio/novel_c1_p4.mp3"
      },
      {
        id: "p5",
        speaker: "lea",
        speakerName: "Léa",
        text: "Tu as raison Hugo. En tant que jeunes journalistes, nous respectons la liberté de la presse et la vérité. Regarde, le premier indice parle d'une école innovante et d'une fresque mystérieuse...",
        audioText: "Tu as raison Hugo. En tant que jeunes journalistes, nous respectons la liberté de la presse et la vérité. Regarde, le premier indice parle d'une école innovante et d'une fresque mystérieuse...",
        audioSrc: "/audio/novel_c1_p5.mp3"
      }
    ],
    vocabList: [
      { word: "Un scoop", definition: "Une nouvelle exclusive ou sensationnelle publiée en premier par un journaliste." },
      { word: "Une source", definition: "L'origine d'une information (une personne, un document ou un témoin)." },
      { word: "La liberté de la presse", definition: "Le droit pour les journalistes de publier des informations sans censure." },
      { word: "À mon avis / D'après moi", definition: "Expressions pour donner son opinion personnelle avec nuance." },
      { word: "La rédaction", definition: "L'équipe de journalistes et le bureau où l'on prépare le journal." },
      { word: "Vérifier", definition: "Contrôler si une information est vraie et exacte avant de la partager." }
    ],
    quiz: [
      {
        id: 1,
        question: "Où Léa a-t-elle trouvé le mystérieux dossier ?",
        options: [
          "Dans la bibliothèque municipale.",
          "Derrière les armoires de la rédaction du journal du lycée.",
          "Dans le bureau du directeur."
        ],
        correctIdx: 1,
        explanation: "Léa a trouvé le dossier caché derrière les armoires de la rédaction."
      },
      {
        id: 2,
        question: "Quelle expression Hugo utilise-t-il pour exprimer son opinion ?",
        options: [
          "À mon avis...",
          "Par conséquent...",
          "Tandis que..."
        ],
        correctIdx: 0,
        explanation: "Hugo dit : 'À mon avis, ce n'est pas un dossier ordinaire.'"
      },
      {
        id: 3,
        question: "D'après Léa, quel devoir est essentiel pour des jeunes journalistes ?",
        options: [
          "Publier des rumeurs sans vérifier.",
          "Respecter la liberté de la presse et vérifier la vérité.",
          "Garder toutes les informations secrètes."
        ],
        correctIdx: 1,
        explanation: "Léa rappelle l'importance de la vérité et de la liberté de la presse."
      }
    ]
  },
  {
    id: 2,
    number: "Chapitre 2",
    title: "L'École de Demain",
    theme: "Éducation & Projets d'Avenir",
    grammarFocus: "Verbes pronominaux & Conditionnel de souhait",
    summary: "Léa et Hugo s'entraident pour explorer une école éco-responsable et déchiffrer le deuxième indice.",
    locked: false,
    content: [
      {
        id: "c2_p1",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Regarde Léa ! Pour déchiffrer le deuxième indice du carnet, nous devons visiter la nouvelle école éco-responsable de la ville.",
        audioText: "Regarde Léa ! Pour déchiffrer le deuxième indice du carnet, nous devons visiter la nouvelle école éco-responsable de la ville."
      },
      {
        id: "c2_p2",
        speaker: "lea",
        speakerName: "Léa",
        text: "J'aimerais comprendre comment les élèves s'organisent ici. Ils se passionnent pour l'environnement et s'entraident tous les jours !",
        audioText: "J'aimerais comprendre comment les élèves s'organisent ici. Ils se passionnent pour l'environnement et s'entraident tous les jours !"
      },
      {
        id: "c2_p3",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Si nous pouvions créer notre propre école innovante, nous intègrerions des studios de photographie et des ateliers de journalisme.",
        audioText: "Si nous pouvions créer notre propre école innovante, nous intègrerions des studios de photographie et des ateliers de journalisme."
      }
    ],
    vocabList: [
      { word: "S'entraider", definition: "S'aider mutuellement face à une tâche ou une difficulté." },
      { word: "Se passionner", definition: "Avoir un intérêt très fort et enthousiaste pour un sujet." },
      { word: "Une école inclusive", definition: "Une école qui accueille et s'adapte à tous les élèves sans exception." },
      { word: "Le conditionnel", definition: "Mode verbal utilisé pour exprimer un souhait, un conseil ou une hypothèse." }
    ],
    quiz: [
      {
        id: 1,
        question: "Quel verbe pronominal montre la solidarité entre les élèves ?",
        options: [
          "S'entraider",
          "Se disputer",
          "Se coucher"
        ],
        correctIdx: 0,
        explanation: "'S'entraider' signifie s'aider mutuellement."
      }
    ]
  },
  {
    id: 3,
    number: "Chapitre 3",
    title: "Alerte Numérique",
    theme: "Cybersécurité & Empreinte Numérique",
    grammarFocus: "Pronoms Objets Directs et Indirects (COD/COI)",
    summary: "Un mystérieux hacker tente d'effacer les photos de l'enquête. Léa et Hugo doivent protéger leurs données.",
    locked: false,
    content: [
      {
        id: "c3_p1",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Léa, mon ordinateur clignote ! Quelqu'un essaie de supprimer mes photos d'enquête à distance !",
        audioText: "Léa, mon ordinateur clignote ! Quelqu'un essaie de supprimer mes photos d'enquête à distance !"
      },
      {
        id: "c3_p2",
        speaker: "lea",
        speakerName: "Léa",
        text: "Ne te laisse pas faire ! Il faut LES sécuriser immédiatement. Envoie-MOI les fichiers et change ton mot de passe !",
        audioText: "Ne te laisse pas faire ! Il faut LES sécuriser immédiatement. Envoie-MOI les fichiers et change ton mot de passe !"
      }
    ],
    vocabList: [
      { word: "La cybersécurité", definition: "L'ensemble des moyens pour protéger les données et systèmes informatiques." },
      { word: "Le hameçonnage", definition: "Technique frauduleuse pour piéger une personne et obtenir ses mots de passe." },
      { word: "Les pronoms objets", definition: "Mots qui remplacent les noms pour éviter les répétitions (le, la, les, lui, leur...)." }
    ],
    quiz: [
      {
        id: 1,
        question: "Dans la phrase 'Il faut les sécuriser', que remplace le pronom 'les' ?",
        options: [
          "Les photos d'enquête.",
          "Les ordinateurs du lycée.",
          "Les professeurs."
        ],
        correctIdx: 0,
        explanation: "'Les' remplace 'les photos d'enquête'."
      }
    ]
  },
  {
    id: 4,
    number: "Chapitre 4",
    title: "Le Vol de la Fresque",
    theme: "Arts, Cinéma & Patrimoine Culturel",
    grammarFocus: "Passé Composé vs Imparfait & Connecteurs logiques",
    summary: "Une fresque murale disparaît pendant un festival. Léa et Hugo mènent l'enquête au passé.",
    locked: false,
    content: [
      {
        id: "c4_p1",
        speaker: "lea",
        speakerName: "Léa",
        text: "Hier soir, il faisait nuit et la ville dormait paisiblement quand soudain, le voleur s'est introduit dans la galerie d'art !",
        audioText: "Hier soir, il faisait nuit et la ville dormait paisiblement quand soudain, le voleur s'est introduit dans la galerie d'art !"
      },
      {
        id: "c4_p2",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Tout d'abord, nous avons observé les traces d'empreintes. Ensuite, nous avons trouvé cette bobine de film de cinéma !",
        audioText: "Tout d'abord, nous avons observé les traces d'empreintes. Ensuite, nous avons trouvé cette bobine de film de cinéma !"
      }
    ],
    vocabList: [
      { word: "Un chef-d'œuvre", definition: "Une œuvre d'art exceptionnelle et remarquable." },
      { word: "Une fresque murale", definition: "Une grande peinture réalisée directement sur un mur." },
      { word: "L'imparfait", definition: "Temps du passé utilisé pour décrire le décor, la météo et les habitudes." },
      { word: "Le passé composé", definition: "Temps du passé utilisé pour les actions précises et achevées." }
    ],
    quiz: [
      {
        id: 1,
        question: "Quel temps décrit la météo et le décor dans 'il faisait nuit' ?",
        options: [
          "L'imparfait",
          "Le passé composé",
          "Le présent"
        ],
        correctIdx: 0,
        explanation: "'Faisait' est à l'imparfait pour planter le décor."
      }
    ]
  },
  {
    id: 5,
    number: "Chapitre 5",
    title: "Opération Planète Green",
    theme: "Environnement & Développement Durable",
    grammarFocus: "Le Futur Simple & le Futur Antérieur",
    summary: "Léa et Hugo protègent la forêt locale menacée et rédigent un engagement écologique au futur.",
    locked: false,
    content: [
      {
        id: "c5_p1",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "Demain, nous planterons des arbres dans le parc et nous sensibiliserons tous les élèves du lycée.",
        audioText: "Demain, nous planterons des arbres dans le parc et nous sensibiliserons tous les élèves du lycée."
      },
      {
        id: "c5_p2",
        speaker: "lea",
        speakerName: "Léa",
        text: "Quand nous aurons publié notre rapport écologique, la municipalité prendra des mesures pour protéger la biodiversité !",
        audioText: "Quand nous aurons publié notre rapport écologique, la municipalité prendra des mesures pour protéger la biodiversité !"
      }
    ],
    vocabList: [
      { word: "La biodiversité", definition: "La variété des espèces vivantes dans un écosystème." },
      { word: "Le développement durable", definition: "Mode d'organisation qui préserve les ressources pour les générations futures." },
      { word: "Le futur simple", definition: "Temps utilisé pour exprimer des projets ou événements à venir." }
    ],
    quiz: [
      {
        id: 1,
        question: "Quelle forme verbale exprime un projet à venir au futur simple ?",
        options: [
          "Nous planterons",
          "Nous avons planté",
          "Nous plantions"
        ],
        correctIdx: 0,
        explanation: "'Planterons' est le verbe planter au futur simple avec 'nous'."
      }
    ]
  },
  {
    id: 6,
    number: "Chapitre 6",
    title: "Le Sommet de la Francophonie",
    theme: "Citoyenneté & Engagement Francophone",
    grammarFocus: "Le Subjonctif Présent & la Conclusion du Récit",
    summary: "Léa et Hugo présentent leur documentaire au grand Sommet des Jeunes à Paris et révèlent la vérité.",
    locked: false,
    content: [
      {
        id: "c6_p1",
        speaker: "lea",
        speakerName: "Léa",
        text: "Il faut que nous fassions entendre notre voix ! Bien que ce projet soit ambitieux, les jeunes francophones ont le pouvoir de changer les choses.",
        audioText: "Il faut que nous fassions entendre notre voix ! Bien que ce projet soit ambitieux, les jeunes francophones ont le pouvoir de changer les choses."
      },
      {
        id: "c6_p2",
        speaker: "hugo",
        speakerName: "Hugo",
        text: "En conclusion, le secret du carnet nous a appris la solidarité et le respect de notre culture. Bravo Léa, nous avons réussi !",
        audioText: "En conclusion, le secret du carnet nous a appris la solidarité et le respect de notre culture. Bravo Léa, nous avons réussi !"
      }
    ],
    vocabList: [
      { word: "Le subjonctif présent", definition: "Mode exprimant le doute, la nécessité, le souhait ou l'obligation (ex: il faut que nous fassions)." },
      { word: "L'engagement citoyen", definition: "L'implication active d'un individu dans la vie publique pour le bien de la communauté." },
      { word: "La francophonie", definition: "L'ensemble des personnes et des pays qui utilisent la langue française." }
    ],
    quiz: [
      {
        id: 1,
        question: "Quelle expression déclenche le subjonctif présent dans 'Il faut que nous fassions' ?",
        options: [
          "Il faut que...",
          "Je sais que...",
          "Il est certain que..."
        ],
        correctIdx: 0,
        explanation: "'Il faut que' exprime l'obligation et nécessite le subjonctif."
      }
    ]
  }
];
