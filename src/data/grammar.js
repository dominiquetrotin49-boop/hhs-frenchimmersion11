export const GRAMMAR_DATA = [
  {
    id: 'er',
    title: 'Les verbes en -ER',
    rules: [
      "Pour conjuguer un verbe régulier en -ER, on enlève la terminaison -ER de l'infinitif pour trouver le radical.",
      "Ensuite, on ajoute les terminaisons suivantes : -e, -es, -e, -ons, -ez, -ent."
    ],
    example: {
      infinitive: 'Parler',
      conjugation: [
        { pronoun: 'Je', verb: 'parle' },
        { pronoun: 'Tu', verb: 'parles' },
        { pronoun: 'Il/Elle/On', verb: 'parle' },
        { pronoun: 'Nous', verb: 'parlons' },
        { pronoun: 'Vous', verb: 'parlez' },
        { pronoun: 'Ils/Elles', verb: 'parlent' }
      ]
    },
    irregulars: [
      {
        infinitive: 'Aller',
        conjugation: [
          { pronoun: 'Je', verb: 'vais' },
          { pronoun: 'Tu', verb: 'vas' },
          { pronoun: 'Il/Elle/On', verb: 'va' },
          { pronoun: 'Nous', verb: 'allons' },
          { pronoun: 'Vous', verb: 'allez' },
          { pronoun: 'Ils/Elles', verb: 'vont' }
        ]
      }
    ]
  },
  {
    id: 'ir',
    title: 'Les verbes en -IR',
    rules: [
      "Pour conjuguer un verbe régulier en -IR (2ème groupe), on enlève la terminaison -IR.",
      "Ensuite, on ajoute les terminaisons : -is, -is, -it, -issons, -issez, -issent."
    ],
    example: {
      infinitive: 'Finir',
      conjugation: [
        { pronoun: 'Je', verb: 'finis' },
        { pronoun: 'Tu', verb: 'finis' },
        { pronoun: 'Il/Elle/On', verb: 'finit' },
        { pronoun: 'Nous', verb: 'finissons' },
        { pronoun: 'Vous', verb: 'finissez' },
        { pronoun: 'Ils/Elles', verb: 'finissent' }
      ]
    },
    irregulars: [
      {
        infinitive: 'Sortir',
        conjugation: [
          { pronoun: 'Je', verb: 'sors' },
          { pronoun: 'Tu', verb: 'sors' },
          { pronoun: 'Il/Elle/On', verb: 'sort' },
          { pronoun: 'Nous', verb: 'sortons' },
          { pronoun: 'Vous', verb: 'sortez' },
          { pronoun: 'Ils/Elles', verb: 'sortent' }
        ]
      },
      {
        infinitive: 'Partir',
        conjugation: [
          { pronoun: 'Je', verb: 'pars' },
          { pronoun: 'Tu', verb: 'pars' },
          { pronoun: 'Il/Elle/On', verb: 'part' },
          { pronoun: 'Nous', verb: 'partons' },
          { pronoun: 'Vous', verb: 'partez' },
          { pronoun: 'Ils/Elles', verb: 'partent' }
        ]
      },
      {
        infinitive: 'Venir',
        conjugation: [
          { pronoun: 'Je', verb: 'viens' },
          { pronoun: 'Tu', verb: 'viens' },
          { pronoun: 'Il/Elle/On', verb: 'vient' },
          { pronoun: 'Nous', verb: 'venons' },
          { pronoun: 'Vous', verb: 'venez' },
          { pronoun: 'Ils/Elles', verb: 'viennent' }
        ]
      }
    ]
  },
  {
    id: 're',
    title: 'Les verbes en -RE',
    rules: [
      "Pour conjuguer un verbe régulier en -RE, on enlève la terminaison -RE.",
      "On ajoute ensuite les terminaisons : -s, -s, - (rien), -ons, -ez, -ent."
    ],
    example: {
      infinitive: 'Vendre',
      conjugation: [
        { pronoun: 'Je', verb: 'vends' },
        { pronoun: 'Tu', verb: 'vends' },
        { pronoun: 'Il/Elle/On', verb: 'vend' },
        { pronoun: 'Nous', verb: 'vendons' },
        { pronoun: 'Vous', verb: 'vendez' },
        { pronoun: 'Ils/Elles', verb: 'vendent' }
      ]
    },
    irregulars: [
      {
        infinitive: 'Prendre',
        conjugation: [
          { pronoun: 'Je', verb: 'prends' },
          { pronoun: 'Tu', verb: 'prends' },
          { pronoun: 'Il/Elle/On', verb: 'prend' },
          { pronoun: 'Nous', verb: 'prenons' },
          { pronoun: 'Vous', verb: 'prenez' },
          { pronoun: 'Ils/Elles', verb: 'prennent' }
        ]
      },
      {
        infinitive: 'Faire',
        conjugation: [
          { pronoun: 'Je', verb: 'fais' },
          { pronoun: 'Tu', verb: 'fais' },
          { pronoun: 'Il/Elle/On', verb: 'fait' },
          { pronoun: 'Nous', verb: 'faisons' },
          { pronoun: 'Vous', verb: 'faites' },
          { pronoun: 'Ils/Elles', verb: 'font' }
        ]
      },
      {
        infinitive: 'Dire',
        conjugation: [
          { pronoun: 'Je', verb: 'dis' },
          { pronoun: 'Tu', verb: 'dis' },
          { pronoun: 'Il/Elle/On', verb: 'dit' },
          { pronoun: 'Nous', verb: 'disons' },
          { pronoun: 'Vous', verb: 'dites' },
          { pronoun: 'Ils/Elles', verb: 'disent' }
        ]
      }
    ]
  },
  {
    id: 'aux',
    title: 'Les Auxiliaires',
    rules: [
      "Les verbes Être et Avoir sont essentiels en français.",
      "Ils sont très irréguliers au présent de l'indicatif."
    ],
    example: null,
    irregulars: [
      {
        infinitive: 'Être',
        conjugation: [
          { pronoun: 'Je', verb: 'suis' },
          { pronoun: 'Tu', verb: 'es' },
          { pronoun: 'Il/Elle/On', verb: 'est' },
          { pronoun: 'Nous', verb: 'sommes' },
          { pronoun: 'Vous', verb: 'êtes' },
          { pronoun: 'Ils/Elles', verb: 'sont' }
        ]
      },
      {
        infinitive: 'Avoir',
        conjugation: [
          { pronoun: 'J\'', verb: 'ai' },
          { pronoun: 'Tu', verb: 'as' },
          { pronoun: 'Il/Elle/On', verb: 'a' },
          { pronoun: 'Nous', verb: 'avons' },
          { pronoun: 'Vous', verb: 'avez' },
          { pronoun: 'Ils/Elles', verb: 'ont' }
        ]
      }
    ]
  }
];


export const GRAMMAR_DATA_UNIT_2 = [
  {
    "id": "grp1",
    "title": "Groupe 1 : Les Super Irréguliers",
    "rules": [
      "Ces 4 verbes sont les plus fréquents et les plus irréguliers du français.",
      "Il n'y a pas de règle générale, il faut les apprendre par cœur !"
    ],
    "example": null,
    "irregulars": [
      {
        "infinitive": "Être",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "suis"
          },
          {
            "pronoun": "Tu",
            "verb": "es"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "est"
          },
          {
            "pronoun": "Nous",
            "verb": "sommes"
          },
          {
            "pronoun": "Vous",
            "verb": "êtes"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "sont"
          }
        ]
      },
      {
        "infinitive": "Avoir",
        "conjugation": [
          {
            "pronoun": "J'",
            "verb": "ai"
          },
          {
            "pronoun": "Tu",
            "verb": "as"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "a"
          },
          {
            "pronoun": "Nous",
            "verb": "avons"
          },
          {
            "pronoun": "Vous",
            "verb": "avez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "ont"
          }
        ]
      },
      {
        "infinitive": "Aller",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "vais"
          },
          {
            "pronoun": "Tu",
            "verb": "vas"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "va"
          },
          {
            "pronoun": "Nous",
            "verb": "allons"
          },
          {
            "pronoun": "Vous",
            "verb": "allez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "vont"
          }
        ]
      },
      {
        "infinitive": "Faire",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "fais"
          },
          {
            "pronoun": "Tu",
            "verb": "fais"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "fait"
          },
          {
            "pronoun": "Nous",
            "verb": "faisons"
          },
          {
            "pronoun": "Vous",
            "verb": "faites"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "font"
          }
        ]
      }
    ]
  },
  {
    "id": "grp2",
    "title": "Groupe 2 : Les verbes en -OIR",
    "rules": [
      "Les verbes en -OIR ont souvent un radical qui change et des terminaisons en -x, -x, -t ou -s, -s, -t."
    ],
    "example": null,
    "irregulars": [
      {
        "infinitive": "Pouvoir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "peux"
          },
          {
            "pronoun": "Tu",
            "verb": "peux"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "peut"
          },
          {
            "pronoun": "Nous",
            "verb": "pouvons"
          },
          {
            "pronoun": "Vous",
            "verb": "pouvez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "peuvent"
          }
        ]
      },
      {
        "infinitive": "Vouloir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "veux"
          },
          {
            "pronoun": "Tu",
            "verb": "veux"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "veut"
          },
          {
            "pronoun": "Nous",
            "verb": "voulons"
          },
          {
            "pronoun": "Vous",
            "verb": "voulez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "veulent"
          }
        ]
      },
      {
        "infinitive": "Devoir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "dois"
          },
          {
            "pronoun": "Tu",
            "verb": "dois"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "doit"
          },
          {
            "pronoun": "Nous",
            "verb": "devons"
          },
          {
            "pronoun": "Vous",
            "verb": "devez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "doivent"
          }
        ]
      },
      {
        "infinitive": "Savoir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "sais"
          },
          {
            "pronoun": "Tu",
            "verb": "sais"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "sait"
          },
          {
            "pronoun": "Nous",
            "verb": "savons"
          },
          {
            "pronoun": "Vous",
            "verb": "savez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "savent"
          }
        ]
      },
      {
        "infinitive": "Voir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "vois"
          },
          {
            "pronoun": "Tu",
            "verb": "vois"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "voit"
          },
          {
            "pronoun": "Nous",
            "verb": "voyons"
          },
          {
            "pronoun": "Vous",
            "verb": "voyez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "voient"
          }
        ]
      }
    ]
  },
  {
    "id": "grp3",
    "title": "Groupe 3 : Les verbes \"Botte\" (Changement de radical)",
    "rules": [
      "Dans ces verbes, le radical change pour les pronoms au singulier (je, tu, il/elle) et la 3ème personne du pluriel (ils/elles).",
      "Visuellement, ces pronoms forment une 'botte' dans le tableau de conjugaison. Nous et Vous gardent un radical régulier."
    ],
    "example": null,
    "irregulars": [
      {
        "infinitive": "Venir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "viens"
          },
          {
            "pronoun": "Tu",
            "verb": "viens"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "vient"
          },
          {
            "pronoun": "Nous",
            "verb": "venons"
          },
          {
            "pronoun": "Vous",
            "verb": "venez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "viennent"
          }
        ]
      },
      {
        "infinitive": "Tenir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "tiens"
          },
          {
            "pronoun": "Tu",
            "verb": "tiens"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "tient"
          },
          {
            "pronoun": "Nous",
            "verb": "tenons"
          },
          {
            "pronoun": "Vous",
            "verb": "tenez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "tiennent"
          }
        ]
      },
      {
        "infinitive": "Prendre",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "prends"
          },
          {
            "pronoun": "Tu",
            "verb": "prends"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "prend"
          },
          {
            "pronoun": "Nous",
            "verb": "prenons"
          },
          {
            "pronoun": "Vous",
            "verb": "prenez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "prennent"
          }
        ]
      },
      {
        "infinitive": "Acheter",
        "conjugation": [
          {
            "pronoun": "J'",
            "verb": "achète"
          },
          {
            "pronoun": "Tu",
            "verb": "achètes"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "achète"
          },
          {
            "pronoun": "Nous",
            "verb": "achetons"
          },
          {
            "pronoun": "Vous",
            "verb": "achetez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "achètent"
          }
        ]
      },
      {
        "infinitive": "Préférer",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "préfère"
          },
          {
            "pronoun": "Tu",
            "verb": "préfères"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "préfère"
          },
          {
            "pronoun": "Nous",
            "verb": "préférons"
          },
          {
            "pronoun": "Vous",
            "verb": "préférez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "préfèrent"
          }
        ]
      },
      {
        "infinitive": "Appeler",
        "conjugation": [
          {
            "pronoun": "J'",
            "verb": "appelle"
          },
          {
            "pronoun": "Tu",
            "verb": "appelles"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "appelle"
          },
          {
            "pronoun": "Nous",
            "verb": "appelons"
          },
          {
            "pronoun": "Vous",
            "verb": "appelez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "appellent"
          }
        ]
      },
      {
        "infinitive": "Payer",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "paie"
          },
          {
            "pronoun": "Tu",
            "verb": "paies"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "paie"
          },
          {
            "pronoun": "Nous",
            "verb": "payons"
          },
          {
            "pronoun": "Vous",
            "verb": "payez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "paient"
          }
        ]
      }
    ]
  },
  {
    "id": "grp4",
    "title": "Groupe 4 : Les autres grands irréguliers",
    "rules": [
      "Ces verbes sont très fréquents au quotidien. Leurs pluriels (nous, vous, ils) ont souvent des consonnes doubles ou modifiées (ex: disons/dites, buvons/boivent)."
    ],
    "example": null,
    "irregulars": [
      {
        "infinitive": "Mettre",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "mets"
          },
          {
            "pronoun": "Tu",
            "verb": "mets"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "met"
          },
          {
            "pronoun": "Nous",
            "verb": "mettons"
          },
          {
            "pronoun": "Vous",
            "verb": "mettez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "mettent"
          }
        ]
      },
      {
        "infinitive": "Dire",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "dis"
          },
          {
            "pronoun": "Tu",
            "verb": "dis"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "dit"
          },
          {
            "pronoun": "Nous",
            "verb": "disons"
          },
          {
            "pronoun": "Vous",
            "verb": "dites"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "disent"
          }
        ]
      },
      {
        "infinitive": "Lire",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "lis"
          },
          {
            "pronoun": "Tu",
            "verb": "lis"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "lit"
          },
          {
            "pronoun": "Nous",
            "verb": "lisons"
          },
          {
            "pronoun": "Vous",
            "verb": "lisez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "lisent"
          }
        ]
      },
      {
        "infinitive": "Écrire",
        "conjugation": [
          {
            "pronoun": "J'",
            "verb": "écris"
          },
          {
            "pronoun": "Tu",
            "verb": "écris"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "écrit"
          },
          {
            "pronoun": "Nous",
            "verb": "écrivons"
          },
          {
            "pronoun": "Vous",
            "verb": "écrivez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "écrivent"
          }
        ]
      },
      {
        "infinitive": "Boire",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "bois"
          },
          {
            "pronoun": "Tu",
            "verb": "bois"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "boit"
          },
          {
            "pronoun": "Nous",
            "verb": "buvons"
          },
          {
            "pronoun": "Vous",
            "verb": "buvez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "boivent"
          }
        ]
      },
      {
        "infinitive": "Croire",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "crois"
          },
          {
            "pronoun": "Tu",
            "verb": "crois"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "croit"
          },
          {
            "pronoun": "Nous",
            "verb": "croyons"
          },
          {
            "pronoun": "Vous",
            "verb": "croyez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "croient"
          }
        ]
      },
      {
        "infinitive": "Sortir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "sors"
          },
          {
            "pronoun": "Tu",
            "verb": "sors"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "sort"
          },
          {
            "pronoun": "Nous",
            "verb": "sortons"
          },
          {
            "pronoun": "Vous",
            "verb": "sortez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "sortent"
          }
        ]
      },
      {
        "infinitive": "Partir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "pars"
          },
          {
            "pronoun": "Tu",
            "verb": "pars"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "part"
          },
          {
            "pronoun": "Nous",
            "verb": "partons"
          },
          {
            "pronoun": "Vous",
            "verb": "partez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "partent"
          }
        ]
      },
      {
        "infinitive": "Dormir",
        "conjugation": [
          {
            "pronoun": "Je",
            "verb": "dors"
          },
          {
            "pronoun": "Tu",
            "verb": "dors"
          },
          {
            "pronoun": "Il/Elle/On",
            "verb": "dort"
          },
          {
            "pronoun": "Nous",
            "verb": "dormons"
          },
          {
            "pronoun": "Vous",
            "verb": "dormez"
          },
          {
            "pronoun": "Ils/Elles",
            "verb": "dorment"
          }
        ]
      }
    ]
  }
];


export const GRAMMAR_DATA_UNIT_3 = [
  {
    "id": "cod",
    "title": "1. Les Pronoms COD (le, la, l', les)",
    "rules": [
      "Le Complément d'Objet Direct (COD) répond à la question 'Qui ?' ou 'Quoi ?' après le verbe.",
      "Il n'y a pas de préposition entre le verbe et le COD.",
      "Les pronoms COD remplacent une personne ou une chose spécifique.",
      "Pronoms : me, te, le, la, l', nous, vous, les.",
      "Le pronom se place toujours AVANT le verbe conjugué."
    ],
    "example": {
      "infinitive": "Exemples avec COD",
      "conjugation": [
        {
          "pronoun": "Je télécharge",
          "verb": "le fichier -> Je le télécharge."
        },
        {
          "pronoun": "Tu protèges",
          "verb": "tes données -> Tu les protèges."
        },
        {
          "pronoun": "Il efface",
          "verb": "son empreinte -> Il l'efface."
        }
      ]
    },
    "irregulars": []
  },
  {
    "id": "coi",
    "title": "2. Les Pronoms COI (lui, leur)",
    "rules": [
      "Le Complément d'Objet Indirect (COI) répond à la question 'À qui ?'.",
      "Il s'utilise avec des verbes construits avec la préposition 'À' (parler à, donner à, envoyer à...).",
      "ATTENTION : lui et leur ne remplacent QUE des personnes animées.",
      "Pronoms : me, te, lui, nous, vous, leur.",
      "Se place aussi AVANT le verbe."
    ],
    "example": {
      "infinitive": "Exemples avec COI",
      "conjugation": [
        {
          "pronoun": "J'écris",
          "verb": "à l'informaticien -> Je lui écris."
        },
        {
          "pronoun": "Elle parle",
          "verb": "aux hackers -> Elle leur parle."
        }
      ]
    },
    "irregulars": []
  },
  {
    "id": "yen",
    "title": "3. Les Pronoms Y et EN",
    "rules": [
      "Le pronom Y remplace un lieu (Je vais à Paris -> J'y vais) ou une chose introduite par 'À' (Je pense à mon mot de passe -> J'y pense).",
      "Le pronom EN remplace une quantité (J'ai beaucoup d'applications -> J'en ai beaucoup) ou une chose introduite par 'DE' (Je parle de la cybersécurité -> J'en parle).",
      "Y et EN ne remplacent presque jamais des personnes."
    ],
    "example": {
      "infinitive": "Exemples Y / EN",
      "conjugation": [
        {
          "pronoun": "Je vais",
          "verb": "sur le dark web -> J'y vais."
        },
        {
          "pronoun": "Je supprime",
          "verb": "des spams -> J'en supprime."
        },
        {
          "pronoun": "Tu as",
          "verb": "un antivirus ? -> Oui, j'en ai un."
        }
      ]
    },
    "irregulars": []
  },
  {
    "id": "ordre",
    "title": "4. L'Ordre des Doubles Pronoms",
    "rules": [
      "Quand on utilise deux pronoms dans la même phrase, il faut respecter un ordre très strict avant le verbe :",
      "1️⃣ Me, Te, Se, Nous, Vous (Personne qui subit)",
      "2️⃣ Le, La, L', Les (Le COD)",
      "3️⃣ Lui, Leur (Le COI, la cible)",
      "4️⃣ Y (Le lieu, 'à' + chose)",
      "5️⃣ En (Quantité, 'de' + chose)",
      "ASTUCE : Pensez à l'ordre alphabétique pour (Le/La/Les) et (Lui/Leur) : L(e) vient avant L(u)."
    ],
    "example": {
      "infinitive": "Exemples d'ordre",
      "conjugation": [
        {
          "pronoun": "Je donne le mot de passe",
          "verb": "à mon frère -> Je le lui donne. (2 puis 3)"
        },
        {
          "pronoun": "Tu me prêtes",
          "verb": "ton ordinateur ? -> Tu me le prêtes. (1 puis 2)"
        },
        {
          "pronoun": "Il parle de la bulle de filtre",
          "verb": "à ses amis -> Il leur en parle. (3 puis 5)"
        }
      ]
    },
    "irregulars": []
  }
];

export const GRAMMAR_DATA_UNIT_4 = [
  {
    id: 'connecteurs',
    title: 'Les Connecteurs Logiques',
    rules: [
      "Les connecteurs logiques servent à structurer un texte et à lier les idées entre elles.",
      "L'introduction des causes : d'abord, tout d'abord, premièrement, en premier lieu.",
      "L'ajout d'idées : ensuite, de plus, en outre.",
      "L'opposition : cependant, par contre, néanmoins, en revanche, toutefois.",
      "La conséquence : par conséquent, donc, c'est pourquoi.",
      "La conclusion : en conclusion, pour conclure, finalement, enfin."
    ],
    example: {
      infinitive: 'Exemples d\'utilisation',
      conjugation: [
        { pronoun: "D'abord", verb: "il y a un manque de logements." },
        { pronoun: "De plus", verb: "le coût de la vie augmente." },
        { pronoun: "Cependant", verb: "des associations apportent leur aide." },
        { pronoun: "Par conséquent", verb: "il faut agir rapidement." },
        { pronoun: "En conclusion", verb: "la pauvreté reste un défi majeur." }
      ]
    },
    irregulars: []
  },
  {
    id: 'imparfait_pc',
    title: 'L\'imparfait et le Passé Composé',
    rules: [
      "L'imparfait décrit une situation passée, un contexte, une habitude ou un état (ex: Il faisait froid, elle habitait en ville).",
      "Le passé composé exprime une action précise et terminée dans le passé (ex: L'usine a fermé, elle est partie).",
      "Le passé composé se forme avec l'auxiliaire (Avoir ou Être) au présent + le participe passé du verbe.",
      "Souvent, l'imparfait plante le décor et le passé composé interrompt avec une action soudaine."
    ],
    example: {
      infinitive: 'Différence (Contexte vs Action)',
      conjugation: [
        { pronoun: "Imparfait", verb: "Avant, Madame Dubois travaillait (habitude) à l'usine." },
        { pronoun: "Imparfait", verb: "L'usine était (état) la principale source d'emploi." },
        { pronoun: "Passé Composé", verb: "Un jour, l'usine a fermé (action précise)." },
        { pronoun: "Passé Composé", verb: "Elle est tombée (action soudaine) au chômage." }
      ]
    },
    irregulars: [
      {
        infinitive: 'Avoir et Être au Passé Composé',
        conjugation: [
          { pronoun: "J'ai eu", verb: "(Avoir)" },
          { pronoun: "J'ai été", verb: "(Être)" }
        ]
      }
    ]
  },
  {
    id: 'reflechis',
    title: 'Les Verbes Réfléchis et Réciproques',
    rules: [
      "Les verbes pronominaux se conjuguent avec un pronom réfléchi de la même personne que le sujet (me, te, se, nous, vous, se).",
      "Un verbe est réfléchi quand le sujet fait l'action sur lui-même (ex: je me lave, il se réveille).",
      "Un verbe est réciproque quand l'action est mutuelle entre plusieurs personnes (ex: ils se regardent, nous nous aidons).",
      "Au passé composé, TOUS les verbes pronominaux utilisent l'auxiliaire ÊTRE."
    ],
    example: {
      infinitive: 'Se battre (Réciproque/Réfléchi)',
      conjugation: [
        { pronoun: "Je", verb: "me bats" },
        { pronoun: "Tu", verb: "te bats" },
        { pronoun: "Il/Elle", verb: "se bat" },
        { pronoun: "Nous", verb: "nous battons" },
        { pronoun: "Vous", verb: "vous battez" },
        { pronoun: "Ils/Elles", verb: "se battent" }
      ]
    },
    irregulars: [
      {
        infinitive: 'Au passé composé (avec ÊTRE)',
        conjugation: [
          { pronoun: "Elle", verb: "s'est réveillée" },
          { pronoun: "Nous", verb: "nous sommes aidés" },
          { pronoun: "Ils", verb: "se sont rencontrés" }
        ]
      }
    ]
  }
];
