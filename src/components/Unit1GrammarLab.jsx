import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Lightbulb, 
  AlertTriangle, 
  Mic, 
  ShieldCheck, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Eye,
  Filter
} from 'lucide-react';
import './Unit1GrammarLab.css';

// All raw data from GRAMMAR_DATA preserved 100%
const REGULAR_ER = {
  infinitive: "Parler",
  category: "regular-er",
  title: "Verbe en -ER (1er Groupe)",
  rules: [
    "Pour conjuguer un verbe régulier en -ER, on enlève la terminaison -ER de l'infinitif pour trouver le radical.",
    "Ensuite, on ajoute les terminaisons suivantes : -e, -es, -e, -ons, -ez, -ent."
  ],
  conjugation: [
    { pronoun: "Je", verb: "parle", stem: "parl", ending: "e", silent: true },
    { pronoun: "Tu", verb: "parles", stem: "parl", ending: "es", silent: true },
    { pronoun: "Il/Elle/On", verb: "parle", stem: "parl", ending: "e", silent: true },
    { pronoun: "Nous", verb: "parlons", stem: "parl", ending: "ons", silent: false },
    { pronoun: "Vous", verb: "parlez", stem: "parl", ending: "ez", silent: false },
    { pronoun: "Ils/Elles", verb: "parlent", stem: "parl", ending: "ent", silent: true }
  ]
};

const REGULAR_IR = {
  infinitive: "Finir",
  category: "regular-ir",
  title: "Verbe en -IR (2ème Groupe)",
  rules: [
    "Pour conjuguer un verbe régulier en -IR (2ème groupe), on enlève la terminaison -IR.",
    "Ensuite, on ajoute les terminaisons : -is, -is, -it, -issons, -issez, -issent."
  ],
  conjugation: [
    { pronoun: "Je", verb: "finis", stem: "fin", ending: "is", silent: false },
    { pronoun: "Tu", verb: "finis", stem: "fin", ending: "is", silent: false },
    { pronoun: "Il/Elle/On", verb: "finit", stem: "fin", ending: "it", silent: false },
    { pronoun: "Nous", verb: "finissons", stem: "fin", ending: "issons", silent: false },
    { pronoun: "Vous", verb: "finissez", stem: "fin", ending: "issez", silent: false },
    { pronoun: "Ils/Elles", verb: "finissent", stem: "fin", ending: "issent", silent: false }
  ]
};

const REGULAR_RE = {
  infinitive: "Vendre",
  category: "regular-re",
  title: "Verbe en -RE (3ème Groupe Régulier)",
  rules: [
    "Pour conjuguer un verbe régulier en -RE, on enlève la terminaison -RE.",
    "On ajoute ensuite les terminaisons : -s, -s, - (rien), -ons, -ez, -ent."
  ],
  conjugation: [
    { pronoun: "Je", verb: "vends", stem: "vend", ending: "s", silent: true },
    { pronoun: "Tu", verb: "vends", stem: "vend", ending: "s", silent: true },
    { pronoun: "Il/Elle/On", verb: "vend", stem: "vend", ending: "", silent: true },
    { pronoun: "Nous", verb: "vendons", stem: "vend", ending: "ons", silent: false },
    { pronoun: "Vous", verb: "vendez", stem: "vend", ending: "ez", silent: false },
    { pronoun: "Ils/Elles", verb: "vendent", stem: "vend", ending: "ent", silent: true }
  ]
};

const BOOT_VERBS = [
  {
    infinitive: "Venir",
    rules: ["Radical en vien- pour la botte, ven- pour nous/vous."],
    conjugation: [
      { pronoun: "Je", verb: "viens", stem: "vien", ending: "s", isBoot: true },
      { pronoun: "Tu", verb: "viens", stem: "vien", ending: "s", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "vient", stem: "vien", ending: "t", isBoot: true },
      { pronoun: "Nous", verb: "venons", stem: "ven", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "venez", stem: "ven", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "viennent", stem: "vienn", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Tenir",
    rules: ["Même conjugaison que venir (radical tien- / ten-)."],
    conjugation: [
      { pronoun: "Je", verb: "tiens", stem: "tien", ending: "s", isBoot: true },
      { pronoun: "Tu", verb: "tiens", stem: "tien", ending: "s", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "tient", stem: "tien", ending: "t", isBoot: true },
      { pronoun: "Nous", verb: "tenons", stem: "ten", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "tenez", stem: "ten", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "tiennent", stem: "tienn", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Prendre",
    rules: ["Prend- au singulier, pren- au pluriel, prenne- à la 3e personne du pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "prends", stem: "prend", ending: "s", isBoot: true },
      { pronoun: "Tu", verb: "prends", stem: "prend", ending: "s", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "prend", stem: "prend", ending: "", isBoot: true },
      { pronoun: "Nous", verb: "prenons", stem: "pren", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "prenez", stem: "pren", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "prennent", stem: "prenn", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Acheter",
    rules: ["Accent grave (è) pour les personnes de la botte."],
    conjugation: [
      { pronoun: "J'", verb: "achète", stem: "achèt", ending: "e", isBoot: true },
      { pronoun: "Tu", verb: "achètes", stem: "achèt", ending: "es", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "achète", stem: "achèt", ending: "e", isBoot: true },
      { pronoun: "Nous", verb: "achetons", stem: "achet", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "achetez", stem: "achet", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "achètent", stem: "achèt", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Préférer",
    rules: ["L'accent aigu devient accent grave (è) dans la botte."],
    conjugation: [
      { pronoun: "Je", verb: "préfère", stem: "préfèr", ending: "e", isBoot: true },
      { pronoun: "Tu", verb: "préfères", stem: "préfèr", ending: "es", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "préfère", stem: "préfèr", ending: "e", isBoot: true },
      { pronoun: "Nous", verb: "préférons", stem: "préfér", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "préférez", stem: "préfér", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "préfèrent", stem: "préfèr", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Appeler",
    rules: ["Double consonne (ll) dans la botte."],
    conjugation: [
      { pronoun: "J'", verb: "appelle", stem: "appell", ending: "e", isBoot: true },
      { pronoun: "Tu", verb: "appelles", stem: "appell", ending: "es", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "appelle", stem: "appell", ending: "e", isBoot: true },
      { pronoun: "Nous", verb: "appelons", stem: "appel", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "appelez", stem: "appel", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "appellent", stem: "appell", ending: "ent", isBoot: true }
    ]
  },
  {
    infinitive: "Payer",
    rules: ["Le 'y' devient 'i' dans la botte (paie ou paye)."],
    conjugation: [
      { pronoun: "Je", verb: "paie", stem: "pai", ending: "e", isBoot: true },
      { pronoun: "Tu", verb: "paies", stem: "pai", ending: "es", isBoot: true },
      { pronoun: "Il/Elle/On", verb: "paie", stem: "pai", ending: "e", isBoot: true },
      { pronoun: "Nous", verb: "payons", stem: "pay", ending: "ons", isBoot: false },
      { pronoun: "Vous", verb: "payez", stem: "pay", ending: "ez", isBoot: false },
      { pronoun: "Ils/Elles", verb: "paient", stem: "pai", ending: "ent", isBoot: true }
    ]
  }
];

const IRREGULAR_PILLARS = [
  {
    infinitive: "Être",
    group: "Auxiliaire & Super-Irrégulier",
    rules: ["Verbe d'état fondamental. Radical imprévisible."],
    conjugation: [
      { pronoun: "Je", verb: "suis", stem: "sui", ending: "s" },
      { pronoun: "Tu", verb: "es", stem: "e", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "est", stem: "es", ending: "t" },
      { pronoun: "Nous", verb: "sommes", stem: "somm", ending: "es" },
      { pronoun: "Vous", verb: "êtes", stem: "êt", ending: "es" },
      { pronoun: "Ils/Elles", verb: "sont", stem: "son", ending: "t" }
    ]
  },
  {
    infinitive: "Avoir",
    group: "Auxiliaire & Super-Irrégulier",
    rules: ["Verbe de possession. Formes très courtes (ai, as, a, ont)."],
    conjugation: [
      { pronoun: "J'", verb: "ai", stem: "a", ending: "i" },
      { pronoun: "Tu", verb: "as", stem: "a", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "a", stem: "a", ending: "" },
      { pronoun: "Nous", verb: "avons", stem: "av", ending: "ons" },
      { pronoun: "Vous", verb: "avez", stem: "av", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "ont", stem: "on", ending: "t" }
    ]
  },
  {
    infinitive: "Aller",
    group: "Super-Irrégulier",
    rules: ["Change de radical selon la personne (v-, all-, v-)."],
    conjugation: [
      { pronoun: "Je", verb: "vais", stem: "vai", ending: "s" },
      { pronoun: "Tu", verb: "vas", stem: "va", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "va", stem: "va", ending: "" },
      { pronoun: "Nous", verb: "allons", stem: "all", ending: "ons" },
      { pronoun: "Vous", verb: "allez", stem: "all", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "vont", stem: "von", ending: "t" }
    ]
  },
  {
    infinitive: "Faire",
    group: "Super-Irrégulier",
    rules: ["Attention à vous faites (pas de -ez) et ils font !"],
    conjugation: [
      { pronoun: "Je", verb: "fais", stem: "fai", ending: "s" },
      { pronoun: "Tu", verb: "fais", stem: "fai", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "fait", stem: "fai", ending: "t" },
      { pronoun: "Nous", verb: "faisons", stem: "fais", ending: "ons" },
      { pronoun: "Vous", verb: "faites", stem: "fait", ending: "es" },
      { pronoun: "Ils/Elles", verb: "font", stem: "fon", ending: "t" }
    ]
  },
  {
    infinitive: "Pouvoir",
    group: "Famille -OIR",
    rules: ["Terminaisons en -x, -x, -t."],
    conjugation: [
      { pronoun: "Je", verb: "peux", stem: "peu", ending: "x" },
      { pronoun: "Tu", verb: "peux", stem: "peu", ending: "x" },
      { pronoun: "Il/Elle/On", verb: "peut", stem: "peu", ending: "t" },
      { pronoun: "Nous", verb: "pouvons", stem: "pouv", ending: "ons" },
      { pronoun: "Vous", verb: "pouvez", stem: "pouv", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "peuvent", stem: "peuv", ending: "ent" }
    ]
  },
  {
    infinitive: "Vouloir",
    group: "Famille -OIR",
    rules: ["Terminaisons en -x, -x, -t."],
    conjugation: [
      { pronoun: "Je", verb: "veux", stem: "veu", ending: "x" },
      { pronoun: "Tu", verb: "veux", stem: "veu", ending: "x" },
      { pronoun: "Il/Elle/On", verb: "veut", stem: "veu", ending: "t" },
      { pronoun: "Nous", verb: "voulons", stem: "voul", ending: "ons" },
      { pronoun: "Vous", verb: "voulez", stem: "voul", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "veulent", stem: "veul", ending: "ent" }
    ]
  },
  {
    infinitive: "Devoir",
    group: "Famille -OIR",
    rules: ["Terminaisons en -s, -s, -t."],
    conjugation: [
      { pronoun: "Je", verb: "dois", stem: "doi", ending: "s" },
      { pronoun: "Tu", verb: "dois", stem: "doi", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "doit", stem: "doi", ending: "t" },
      { pronoun: "Nous", verb: "devons", stem: "dev", ending: "ons" },
      { pronoun: "Vous", verb: "devez", stem: "dev", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "doivent", stem: "doiv", ending: "ent" }
    ]
  },
  {
    infinitive: "Savoir",
    group: "Famille -OIR",
    rules: ["Radical sai- au singulier, sav- au pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "sais", stem: "sai", ending: "s" },
      { pronoun: "Tu", verb: "sais", stem: "sai", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "sait", stem: "sai", ending: "t" },
      { pronoun: "Nous", verb: "savons", stem: "sav", ending: "ons" },
      { pronoun: "Vous", verb: "savez", stem: "sav", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "savent", stem: "sav", ending: "ent" }
    ]
  },
  {
    infinitive: "Voir",
    group: "Famille -OIR",
    rules: ["Radical voi- / voy- au pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "vois", stem: "voi", ending: "s" },
      { pronoun: "Tu", verb: "vois", stem: "voi", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "voit", stem: "voi", ending: "t" },
      { pronoun: "Nous", verb: "voyons", stem: "voy", ending: "ons" },
      { pronoun: "Vous", verb: "voyez", stem: "voy", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "voient", stem: "voi", ending: "ent" }
    ]
  },
  {
    infinitive: "Mettre",
    group: "Grand Irrégulier",
    rules: ["Un seul 't' au singulier (mets, met), deux 'tt' au pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "mets", stem: "met", ending: "s" },
      { pronoun: "Tu", verb: "mets", stem: "met", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "met", stem: "met", ending: "" },
      { pronoun: "Nous", verb: "mettons", stem: "mett", ending: "ons" },
      { pronoun: "Vous", verb: "mettez", stem: "mett", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "mettent", stem: "mett", ending: "ent" }
    ]
  },
  {
    infinitive: "Dire",
    group: "Grand Irrégulier",
    rules: ["Attention à vous dites (sans -ez) !"],
    conjugation: [
      { pronoun: "Je", verb: "dis", stem: "di", ending: "s" },
      { pronoun: "Tu", verb: "dis", stem: "di", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "dit", stem: "di", ending: "t" },
      { pronoun: "Nous", verb: "disons", stem: "dis", ending: "ons" },
      { pronoun: "Vous", verb: "dites", stem: "dit", ending: "es" },
      { pronoun: "Ils/Elles", verb: "disent", stem: "dis", ending: "ent" }
    ]
  },
  {
    infinitive: "Lire",
    group: "Grand Irrégulier",
    rules: ["Le radical gagne un 's' sonore [z] au pluriel (lisons)."],
    conjugation: [
      { pronoun: "Je", verb: "lis", stem: "li", ending: "s" },
      { pronoun: "Tu", verb: "lis", stem: "li", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "lit", stem: "li", ending: "t" },
      { pronoun: "Nous", verb: "lisons", stem: "lis", ending: "ons" },
      { pronoun: "Vous", verb: "lisez", stem: "lis", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "lisent", stem: "lis", ending: "ent" }
    ]
  },
  {
    infinitive: "Écrire",
    group: "Grand Irrégulier",
    rules: ["Le radical gagne un 'v' au pluriel (écrivons)."],
    conjugation: [
      { pronoun: "J'", verb: "écris", stem: "écri", ending: "s" },
      { pronoun: "Tu", verb: "écris", stem: "écri", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "écrit", stem: "écri", ending: "t" },
      { pronoun: "Nous", verb: "écrivons", stem: "écriv", ending: "ons" },
      { pronoun: "Vous", verb: "écrivez", stem: "écriv", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "écrivent", stem: "écriv", ending: "ent" }
    ]
  },
  {
    infinitive: "Boire",
    group: "Grand Irrégulier",
    rules: ["Boi- au singulier, buv- à nous/vous, boiv- à ils/elles."],
    conjugation: [
      { pronoun: "Je", verb: "bois", stem: "boi", ending: "s" },
      { pronoun: "Tu", verb: "bois", stem: "boi", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "boit", stem: "boi", ending: "t" },
      { pronoun: "Nous", verb: "buvons", stem: "buv", ending: "ons" },
      { pronoun: "Vous", verb: "buvez", stem: "buv", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "boivent", stem: "boiv", ending: "ent" }
    ]
  },
  {
    infinitive: "Croire",
    group: "Grand Irrégulier",
    rules: ["Croi- au singulier, croy- à nous/vous."],
    conjugation: [
      { pronoun: "Je", verb: "crois", stem: "croi", ending: "s" },
      { pronoun: "Tu", verb: "crois", stem: "croi", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "croit", stem: "croi", ending: "t" },
      { pronoun: "Nous", verb: "croyons", stem: "croy", ending: "ons" },
      { pronoun: "Vous", verb: "croyez", stem: "croy", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "croient", stem: "croi", ending: "ent" }
    ]
  },
  {
    infinitive: "Sortir",
    group: "Grand Irrégulier (-IR 3e groupe)",
    rules: ["Pas de -iss- ! Singulier sors/sort, pluriel sortons."],
    conjugation: [
      { pronoun: "Je", verb: "sors", stem: "sor", ending: "s" },
      { pronoun: "Tu", verb: "sors", stem: "sor", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "sort", stem: "sor", ending: "t" },
      { pronoun: "Nous", verb: "sortons", stem: "sort", ending: "ons" },
      { pronoun: "Vous", verb: "sortez", stem: "sort", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "sortent", stem: "sort", ending: "ent" }
    ]
  },
  {
    infinitive: "Partir",
    group: "Grand Irrégulier (-IR 3e groupe)",
    rules: ["Pas de -iss- ! Radical part- au pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "pars", stem: "par", ending: "s" },
      { pronoun: "Tu", verb: "pars", stem: "par", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "part", stem: "par", ending: "t" },
      { pronoun: "Nous", verb: "partons", stem: "part", ending: "ons" },
      { pronoun: "Vous", verb: "partez", stem: "part", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "partent", stem: "part", ending: "ent" }
    ]
  },
  {
    infinitive: "Dormir",
    group: "Grand Irrégulier (-IR 3e groupe)",
    rules: ["Dors/dort au singulier, dormons au pluriel."],
    conjugation: [
      { pronoun: "Je", verb: "dors", stem: "dor", ending: "s" },
      { pronoun: "Tu", verb: "dors", stem: "dor", ending: "s" },
      { pronoun: "Il/Elle/On", verb: "dort", stem: "dor", ending: "t" },
      { pronoun: "Nous", verb: "dormons", stem: "dorm", ending: "ons" },
      { pronoun: "Vous", verb: "dormez", stem: "dorm", ending: "ez" },
      { pronoun: "Ils/Elles", verb: "dorment", stem: "dorm", ending: "ent" }
    ]
  }
];

export default function Unit1GrammarLab() {
  const [activeTab, setActiveTab] = useState('reguliers');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const subjectOptions = [
    { label: "Tous", value: null },
    { label: "Je / J'", value: "Je" },
    { label: "Tu", value: "Tu" },
    { label: "Il / Elle / On", value: "Il/Elle/On" },
    { label: "Nous", value: "Nous" },
    { label: "Vous", value: "Vous" },
    { label: "Ils / Elles", value: "Ils/Elles" }
  ];

  // Filter verbs based on search
  const matchesSearch = (infinitive) => {
    if (!searchQuery.trim()) return true;
    return infinitive.toLowerCase().includes(searchQuery.trim().toLowerCase());
  };

  // Check if pronoun matches selected subject filter
  const matchesSubject = (rowPronoun, filter) => {
    if (!filter) return true;
    if (filter === 'Je') {
      return rowPronoun === 'Je' || rowPronoun === "J'";
    }
    return rowPronoun === filter;
  };

  return (
    <div className="grammar-lab-container">
      {/* Header & Mission Briefing */}
      <div className="grammar-lab-header">
        <div className="header-top-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <span className="badge-classified">Dossier d'Enquête</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Unité 1 : Le Présent de l'Indicatif</span>
            </div>
            <h3 className="grammar-lab-title">
              <Compass className="text-accent" size={28} />
              Laboratoire Linguistique : Les Dossiers du Présent
            </h3>
          </div>

          {/* Search Bar */}
          <div className="grammar-search-box">
            <Search size={16} className="search-icon-pos" />
            <input 
              type="text" 
              className="grammar-search-input"
              placeholder="Rechercher un verbe (ex: boire)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* 4 Investigative Navigation Tabs */}
        <div className="grammar-nav-pills">
          <button 
            className={`grammar-nav-pill ${activeTab === 'reguliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('reguliers')}
          >
            <Layers size={16} />
            <span>1. Les Réguliers & Radar (-ER, -IR, -RE)</span>
          </button>

          <button 
            className={`grammar-nav-pill ${activeTab === 'bottine' ? 'active' : ''}`}
            onClick={() => setActiveTab('bottine')}
          >
            <Sparkles size={16} />
            <span>2. Les Verbes à Bottine (7 Verbes)</span>
          </button>

          <button 
            className={`grammar-nav-pill ${activeTab === 'irreguliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('irreguliers')}
          >
            <ShieldCheck size={16} />
            <span>3. Les Piliers Irréguliers & -OIR</span>
          </button>

          <button 
            className={`grammar-nav-pill ${activeTab === 'lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('lab')}
          >
            <Lightbulb size={16} />
            <span>4. Guide des Pièges & Oral</span>
          </button>
        </div>

        {/* Interactive Subject Highlight Radar */}
        <div className="subject-radar-bar">
          <span className="radar-label">
            <Filter size={14} />
            Radar Sujet :
          </span>
          <div className="subject-pills">
            {subjectOptions.map(opt => (
              <button
                key={opt.label}
                className={`subject-pill-btn ${selectedSubject === opt.value ? 'active' : ''}`}
                onClick={() => setSelectedSubject(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODULE 1: LES RÉGULIERS & RADAR DES TERMINAISONS */}
      {/* ============================================================ */}
      {activeTab === 'reguliers' && (
        <div className="animate-in">
          {/* Pedagogical Callout */}
          <div className="callout-box callout-tip">
            <Lightbulb size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#f59e0b' }} />
            <div>
              <div className="callout-title">Astuce de Morphologie : La formule universelle</div>
              <div>
                Pour tous les verbes réguliers : <strong>Infinitif - Terminaison (-ER, -IR, -RE) = Radical de base</strong>.
                Ajoutez ensuite les terminaisons spécifiques au groupe. Notez que les terminaisons en <span className="ending-silent">-e, -es, -e, -ent</span> au singulier et à la 3e personne du pluriel sont <strong>totalement muettes</strong> à l'oral !
              </div>
            </div>
          </div>

          <div className="verb-matrix-grid">
            {/* -ER VERB */}
            {matchesSearch(REGULAR_ER.infinitive) && (
              <div className="case-file-card">
                <div className="case-card-header">
                  <div className="case-verb-infinitive">
                    <span>{REGULAR_ER.infinitive}</span>
                  </div>
                  <span className="case-verb-tag tag-regular">1er Groupe (-ER)</span>
                </div>
                <p className="case-card-desc">
                  Radical régulier : <strong>parl-</strong> | Terminaisons : <em>-e, -es, -e, -ons, -ez, -ent</em>
                </p>
                <div className="conjugation-rows">
                  {REGULAR_ER.conjugation
                    .filter(row => matchesSubject(row.pronoun, selectedSubject))
                    .map((row, idx) => {
                      const isSelected = !!selectedSubject;
                      return (
                        <div key={idx} className={`conjugation-item ${isSelected ? 'highlighted' : ''}`}>
                          <span className="conj-pronoun">{row.pronoun}</span>
                          <span className="conj-form">
                            <span className="stem-part">{row.stem}</span>
                            <span className={row.silent ? 'ending-silent' : 'ending-part'}>{row.ending}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* -IR VERB */}
            {matchesSearch(REGULAR_IR.infinitive) && (
              <div className="case-file-card">
                <div className="case-card-header">
                  <div className="case-verb-infinitive">
                    <span>{REGULAR_IR.infinitive}</span>
                  </div>
                  <span className="case-verb-tag tag-regular">2e Groupe (-IR)</span>
                </div>
                <p className="case-card-desc">
                  Radical régulier : <strong>fin-</strong> | Terminaisons avec <strong>-iss-</strong> au pluriel
                </p>
                <div className="conjugation-rows">
                  {REGULAR_IR.conjugation
                    .filter(row => matchesSubject(row.pronoun, selectedSubject))
                    .map((row, idx) => {
                      const isSelected = !!selectedSubject;
                      return (
                        <div key={idx} className={`conjugation-item ${isSelected ? 'highlighted' : ''}`}>
                          <span className="conj-pronoun">{row.pronoun}</span>
                          <span className="conj-form">
                            <span className="stem-part">{row.stem}</span>
                            <span className="ending-part">{row.ending}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* -RE VERB */}
            {matchesSearch(REGULAR_RE.infinitive) && (
              <div className="case-file-card">
                <div className="case-card-header">
                  <div className="case-verb-infinitive">
                    <span>{REGULAR_RE.infinitive}</span>
                  </div>
                  <span className="case-verb-tag tag-regular">3e Groupe (-RE)</span>
                </div>
                <p className="case-card-desc">
                  Radical régulier : <strong>vend-</strong> | Il/Elle ne prend <strong>aucune terminaison</strong> (-d nu)
                </p>
                <div className="conjugation-rows">
                  {REGULAR_RE.conjugation
                    .filter(row => matchesSubject(row.pronoun, selectedSubject))
                    .map((row, idx) => {
                      const isSelected = !!selectedSubject;
                      return (
                        <div key={idx} className={`conjugation-item ${isSelected ? 'highlighted' : ''}`}>
                          <span className="conj-pronoun">{row.pronoun}</span>
                          <span className="conj-form">
                            <span className="stem-part">{row.stem}</span>
                            <span className={row.silent ? 'ending-silent' : 'ending-part'}>{row.ending || '∅'}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Orthographic Variants Dossier: -ger and -cer */}
          <div className="callout-box callout-warning" style={{ marginTop: '1.75rem' }}>
            <AlertTriangle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
            <div>
              <div className="callout-title">⚠️ Surveillance Orthographique : Les verbes en -GER et -CER</div>
              <div style={{ marginTop: '0.35rem' }}>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li>
                    <strong>Verbes en -GER (Manger, Voyager, Partager) :</strong> On ajoute un <strong>e</strong> euphonique devant le « o » de <em>nous</em> pour préserver le son doux [ʒ] : <code>nous mang<strong>e</strong>ons</code>, <code>nous voyag<strong>e</strong>ons</code>.
                  </li>
                  <li>
                    <strong>Verbes en -CER (Commencer, Lancer, Avancer) :</strong> Le « c » prend une cédille devant le « o » de <em>nous</em> pour préserver le son [s] : <code>nous commen<strong>ç</strong>ons</code>, <code>nous avan<strong>ç</strong>ons</code>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 2: LES VERBES À BOTTINE (CHANGEMENT DE RADICAL) */}
      {/* ============================================================ */}
      {activeTab === 'bottine' && (
        <div className="animate-in">
          {/* Visual Boot Explanation Box */}
          <div className="boot-visual-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fbbf24', fontWeight: 'bold' }}>
              <Sparkles size={20} />
              <span>Pourquoi la « Bottine » ? La règle visuelle fondamentale</span>
            </div>
            <p style={{ margin: '0.5rem 0', opacity: 0.9, fontSize: '0.92rem' }}>
              Sur les 6 personnes du verbe, <strong>4 personnes subissent une mutation de radical</strong> (Je, Tu, Il/Elle, Ils/Elles), formant visuellement le contour d'une bottine. Les personnes <strong>Nous et Vous restent fidèles au radical régulier de base</strong> !
            </p>
            <div className="boot-grid-explainer">
              <div className="boot-zone">
                <strong style={{ color: '#fbbf24' }}>🥾 Dans la Bottine (Mutation phonétique)</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', opacity: 0.85 }}>
                  Je, Tu, Il/Elle, Ils/Elles : accent grave (è), double consonne (ll, nn), ou diphtongue (ien).
                </p>
              </div>
              <div className="non-boot-zone">
                <strong style={{ color: '#38bdf8' }}>❄️ Hors de la Bottine (Forme régulière)</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', opacity: 0.85 }}>
                  Nous & Vous : conservent la voyelle et l'accent d'origine de l'infinitif (ex: <em>nous achetons</em>, <em>vous venez</em>).
                </p>
              </div>
            </div>
          </div>

          <div className="verb-matrix-grid">
            {BOOT_VERBS.filter(v => matchesSearch(v.infinitive)).map((v, i) => (
              <div key={i} className="case-file-card">
                <div className="case-card-header">
                  <div className="case-verb-infinitive">
                    <span>{v.infinitive}</span>
                  </div>
                  <span className="case-verb-tag tag-boot">Verbe Bottine</span>
                </div>
                <p className="case-card-desc">
                  {v.rules[0]}
                </p>
                <div className="conjugation-rows">
                  {v.conjugation
                    .filter(row => matchesSubject(row.pronoun, selectedSubject))
                    .map((row, idx) => {
                      const isSelected = !!selectedSubject;
                      return (
                        <div 
                          key={idx} 
                          className={`conjugation-item ${row.isBoot ? 'boot-row' : ''} ${isSelected ? 'highlighted' : ''}`}
                        >
                          <span className="conj-pronoun">
                            {row.pronoun} {row.isBoot && <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>🥾</span>}
                          </span>
                          <span className="conj-form">
                            <span className={row.isBoot ? 'ending-accent' : 'stem-part'}>{row.stem}</span>
                            <span className="ending-part">{row.ending}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 3: LES PILIERS IRRÉGULIERS & FAMILLE -OIR */}
      {/* ============================================================ */}
      {activeTab === 'irreguliers' && (
        <div className="animate-in">
          {/* Callout Info */}
          <div className="callout-box callout-oral">
            <Mic size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#10b981' }} />
            <div>
              <div className="callout-title">Guide Phonétique des Verbes en -OIR</div>
              <div>
                Les verbes en <strong>-OIR (Pouvoir, Vouloir, Devoir, Savoir, Voir)</strong> ont une phonétique très distincte : 
                singulier en [ø] ou [wa] (<em>je peux, je dois</em>) et pluriel articulé (<em>nous pouvons, nous devons</em>). 
                Notez les terminaisons uniques en <strong>-x, -x, -t</strong> pour <em>pouvoir</em> et <em>vouloir</em> !
              </div>
            </div>
          </div>

          <div className="verb-matrix-grid">
            {IRREGULAR_PILLARS.filter(v => matchesSearch(v.infinitive)).map((v, i) => (
              <div key={i} className="case-file-card">
                <div className="case-card-header">
                  <div className="case-verb-infinitive">
                    <span>{v.infinitive}</span>
                  </div>
                  <span className="case-verb-tag tag-irregular">{v.group}</span>
                </div>
                <p className="case-card-desc">
                  {v.rules[0]}
                </p>
                <div className="conjugation-rows">
                  {v.conjugation
                    .filter(row => matchesSubject(row.pronoun, selectedSubject))
                    .map((row, idx) => {
                      const isSelected = !!selectedSubject;
                      return (
                        <div key={idx} className={`conjugation-item ${isSelected ? 'highlighted' : ''}`}>
                          <span className="conj-pronoun">{row.pronoun}</span>
                          <span className="conj-form">
                            <span className="stem-part">{row.stem}</span>
                            <span className="ending-part">{row.ending}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 4: GUIDE DES PIÈGES & ORAL */}
      {/* ============================================================ */}
      {activeTab === 'lab' && (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Pro Tips Box */}
          <div className="callout-box callout-tip">
            <Lightbulb size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#f59e0b' }} />
            <div>
              <div className="callout-title" style={{ fontSize: '1.05rem' }}>💡 Les 3 Exceptions Majeures en « -EZ »</div>
              <div style={{ marginTop: '0.4rem' }}>
                En règle générale, le pronom <strong>Vous</strong> se termine toujours par <strong>-EZ</strong>. 
                Cependant, il existe exactement <strong>trois verbes d'usage quotidien</strong> qui ne respectent pas cette règle et se terminent en <strong>-TES</strong> :
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <strong>Vous êtes</strong> (Être)
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <strong>Vous faites</strong> (Faire)
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <strong>Vous dites</strong> (Dire)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Traps Box */}
          <div className="callout-box callout-warning">
            <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
            <div>
              <div className="callout-title" style={{ fontSize: '1.05rem' }}>⚠️ Le Piège Acoustique du « -ENT » Pluriel</div>
              <div style={{ marginTop: '0.4rem' }}>
                Contrairement aux mots comme <em>« le président »</em> ou <em>« souvent »</em>, <strong>la terminaison verbale -ENT est 100% muette</strong> :
                <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                  <li><em>Ils parlent</em> se prononce exactement comme <em>Il parle</em> [paʁl].</li>
                  <li><em>Ils étudient</em> se prononce exactement comme <em>Il étudie</em> [etydi].</li>
                  <li><em>Ils écrivent</em> se prononce [ekʁiv], sans jamais prononcer le « ent ».</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Oral Pronunciation & Liaisons */}
          <div className="callout-box callout-oral">
            <Mic size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#10b981' }} />
            <div>
              <div className="callout-title" style={{ fontSize: '1.05rem' }}>🔊 Les Liaisons Déterminantes à l'Oral</div>
              <div style={{ marginTop: '0.4rem' }}>
                La liaison change complètement le sens de la phrase entre AVOIR et ÊTRE :
                <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                  <li>
                    <strong>Ils ont [il.z‿ɔ̃] (Avoir)</strong> : Le « s » se lie en son <strong>[Z]</strong> vibrant.
                  </li>
                  <li>
                    <strong>Ils sont [il.sɔ̃] (Être)</strong> : Pas de liaison avec le « s », le verbe commence par le son <strong>[S]</strong> sifflant.
                  </li>
                  <li>
                    <strong>Vous avez [vu.z‿ave]</strong> vs <strong>Vous savez</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparative Table */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '0.85rem' }}>
            <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
              <Eye size={20} />
              Tableau Comparatif des Terminaisons au Présent
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="radar-comparison-table">
                <thead>
                  <tr>
                    <th>Pronom</th>
                    <th>1er Groupe (-ER)</th>
                    <th>2e Groupe (-IR)</th>
                    <th>3e Groupe (-RE)</th>
                    <th>Verbes en -OIR (-x)</th>
                  </tr>
                </thead>
                <tbody>
                  {matchesSubject('Je', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Je</strong></td>
                      <td><span className="ending-silent">-e</span></td>
                      <td><span className="ending-part">-is</span></td>
                      <td><span className="ending-part">-s</span></td>
                      <td><span className="ending-accent">-x</span> / -s</td>
                    </tr>
                  )}
                  {matchesSubject('Tu', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Tu</strong></td>
                      <td><span className="ending-silent">-es</span></td>
                      <td><span className="ending-part">-is</span></td>
                      <td><span className="ending-part">-s</span></td>
                      <td><span className="ending-accent">-x</span> / -s</td>
                    </tr>
                  )}
                  {matchesSubject('Il/Elle/On', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Il / Elle / On</strong></td>
                      <td><span className="ending-silent">-e</span></td>
                      <td><span className="ending-part">-it</span></td>
                      <td><span className="stem-part">∅</span> (rien)</td>
                      <td><span className="ending-part">-t</span></td>
                    </tr>
                  )}
                  {matchesSubject('Nous', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Nous</strong></td>
                      <td><span className="ending-part">-ons</span></td>
                      <td><span className="ending-part">-issons</span></td>
                      <td><span className="ending-part">-ons</span></td>
                      <td><span className="ending-part">-ons</span></td>
                    </tr>
                  )}
                  {matchesSubject('Vous', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Vous</strong></td>
                      <td><span className="ending-part">-ez</span></td>
                      <td><span className="ending-part">-issez</span></td>
                      <td><span className="ending-part">-ez</span></td>
                      <td><span className="ending-part">-ez</span> (ou -tes)</td>
                    </tr>
                  )}
                  {matchesSubject('Ils/Elles', selectedSubject) && (
                    <tr className={selectedSubject ? 'row-highlighted' : ''}>
                      <td><strong>Ils / Elles</strong></td>
                      <td><span className="ending-silent">-ent</span></td>
                      <td><span className="ending-part">-issent</span></td>
                      <td><span className="ending-silent">-ent</span></td>
                      <td><span className="ending-silent">-ent</span></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
