export const UNIT_1_VOCAB = [
  {
    id: 1,
    word: "Liberté de la presse",
    definition: "Le droit pour les médias d'opérer sans censure excessive ni ingérence.",
    sentence: "Dans une vraie démocratie, la _____ est protégée par la loi.",
    wrongOptions: ["Propagande", "Censure", "Désinformation"]
  },
  {
    id: 2,
    word: "Transparence",
    definition: "L'ouverture et la responsabilité dans les actions des gouvernements et organisations.",
    sentence: "Les citoyens exigent plus de _____ sur le budget de l'État.",
    wrongOptions: ["Répression", "Société civile", "Menace"]
  },
  {
    id: 3,
    word: "Journalisme",
    definition: "La profession qui consiste à collecter, évaluer, créer et présenter des informations.",
    sentence: "Le bon _____ demande de vérifier ses sources avant de publier.",
    wrongOptions: ["Cyber-harcèlement", "Gouvernement", "Biais"]
  },
  {
    id: 4,
    word: "Indépendance journalistique",
    definition: "La capacité d'informer sans pression externe, politique ou culturelle.",
    sentence: "Sans _____, les articles risquent d'être manipulés par les politiciens.",
    wrongOptions: ["Opinion publique", "Répression", "Censure"]
  },
  {
    id: 5,
    word: "Censure",
    definition: "La suppression ou l'interdiction de communications publiques jugées inacceptables.",
    sentence: "Le gouvernement a utilisé la _____ pour cacher le scandale.",
    wrongOptions: ["Transparence", "Démocratie", "Liberté de la presse"]
  },
  {
    id: 6,
    word: "Propagande",
    definition: "Des informations biaisées ou trompeuses utilisées pour promouvoir un point de vue.",
    sentence: "Pendant la guerre, la _____ a été utilisée pour manipuler l'opinion.",
    wrongOptions: ["Journalisme", "Indépendance", "Transparence"]
  },
  {
    id: 7,
    word: "Désinformation",
    definition: "La diffusion de fausses informations dans le but de tromper ou de manipuler.",
    sentence: "Les réseaux sociaux sont parfois accusés de répandre de la _____.",
    wrongOptions: ["Liberté", "Société civile", "Régulation"]
  },
  {
    id: 8,
    word: "Opinion publique",
    definition: "L'ensemble des croyances, attitudes et jugements collectifs d'une population.",
    sentence: "L'_____ a été choquée par les révélations du journaliste.",
    wrongOptions: ["Répression", "Censure", "Propagande"]
  },
  {
    id: 9,
    word: "Société civile",
    definition: "L'ensemble des ONG et associations qui œuvrent pour le bien-être social et politique.",
    sentence: "La _____ a organisé une marche pour défendre les droits humains.",
    wrongOptions: ["Régulation des médias", "Désinformation", "Censure"]
  },
  {
    id: 10,
    word: "Répression",
    definition: "L'usage de la force ou de mesures coercitives par un État pour contrôler sa population.",
    sentence: "Les journalistes ont fui le pays à cause de la _____ violente du régime.",
    wrongOptions: ["Transparence", "Liberté d'expression", "Indépendance"]
  }
];

// Helper to get 4 random options (1 correct, 3 wrong)
export function generateQuestionOptions(vocabItem) {
  const options = [vocabItem.word, ...vocabItem.wrongOptions];
  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
}

export const UNIT_2_VOCAB = [
  {
    id: 1,
    word: "Système éducatif",
    definition: "L'organisation des écoles et institutions d'enseignement dans un pays.",
    sentence: "Chaque pays possède un _____ différent selon son histoire.",
    wrongOptions: ["Pédagogie", "Infrastructures", "Réforme"]
  },
  {
    id: 2,
    word: "Scolarisation",
    definition: "Le fait de suivre une scolarité dans une école.",
    sentence: "La _____ des enfants est obligatoire jusqu'à un certain âge.",
    wrongOptions: ["Éducation à distance", "Bourse", "Formation professionnelle"]
  },
  {
    id: 3,
    word: "Inégalités éducatives",
    definition: "Disparités d'accès à l'éducation en fonction du genre, du lieu de résidence, ou de la classe sociale.",
    sentence: "Le gouvernement lutte contre les _____ entre les villes et les campagnes.",
    wrongOptions: ["Égalité des genres", "Inclusions", "Succès académiques"]
  },
  {
    id: 4,
    word: "Réforme éducative",
    definition: "Modification ou amélioration d'un système éducatif pour en améliorer l'efficacité ou l'équité.",
    sentence: "Le ministre a proposé une nouvelle _____ pour moderniser les écoles.",
    wrongOptions: ["Pédagogie", "Taux de scolarisation", "Éducation gratuite"]
  },
  {
    id: 5,
    word: "Éducation de base",
    definition: "Enseignement primaire et secondaire, considéré comme essentiel pour tous les enfants.",
    sentence: "L'_____ est un droit fondamental garanti par l'ONU.",
    wrongOptions: ["Enseignement supérieur", "Formation professionnelle", "Université"]
  },
  {
    id: 6,
    word: "Éducation inclusive",
    definition: "Une éducation qui cherche à intégrer tous les enfants, indépendamment de leurs besoins ou origine.",
    sentence: "L'_____ permet aux élèves en situation de handicap d'étudier avec les autres.",
    wrongOptions: ["Éducation spécialisée", "Éducation privée", "Éducation élitiste"]
  },
  {
    id: 7,
    word: "Taux de scolarisation",
    definition: "Le pourcentage d'enfants en âge scolaire qui sont inscrits à l'école.",
    sentence: "Le _____ a fortement augmenté en Afrique cette dernière décennie.",
    wrongOptions: ["Taux de réussite", "Taux de natalité", "Scolarité"]
  },
  {
    id: 8,
    word: "Égalité des genres",
    definition: "Principe visant à garantir les mêmes opportunités éducatives pour les filles et les garçons.",
    sentence: "Promouvoir l'_____ permet d'autonomiser les jeunes filles.",
    wrongOptions: ["Inégalités éducatives", "Éducation rurale", "Ségrégation"]
  },
  {
    id: 9,
    word: "Écoles rurales",
    definition: "Écoles situées dans des zones isolées souvent confrontées à des manques d'infrastructures.",
    sentence: "Les _____ manquent souvent d'accès à internet.",
    wrongOptions: ["Universités", "Écoles urbaines", "Écoles privées"]
  },
  {
    id: 10,
    word: "Bourses d'études",
    definition: "Aide financière pour permettre aux étudiants de poursuivre leurs études.",
    sentence: "L'État offre des _____ aux étudiants issus de familles modestes.",
    wrongOptions: ["Frais d'inscription", "Dettes étudiantes", "Infrastructures"]
  },
  {
    id: 11,
    word: "Taux de réussite",
    definition: "Le pourcentage d'élèves qui réussissent à terminer leur cursus scolaire avec un diplôme.",
    sentence: "Le _____ au baccalauréat a été très élevé cette année.",
    wrongOptions: ["Taux de scolarisation", "Éducation gratuite", "Pédagogie"]
  },
  {
    id: 12,
    word: "Éducation gratuite",
    definition: "Système dans lequel l'État prend en charge les frais d'inscription et autres coûts scolaires.",
    sentence: "Grâce à l'_____, tous les enfants peuvent aller à l'école publique sans payer.",
    wrongOptions: ["Bourses d'études", "Éducation privée", "Scolarisation payante"]
  },
  {
    id: 13,
    word: "Universités africaines",
    definition: "Institutions d'enseignement supérieur qui offrent des programmes diplômants dans divers domaines.",
    sentence: "Plusieurs _____ sont aujourd'hui reconnues à l'échelle internationale.",
    wrongOptions: ["Écoles primaires", "Lycées", "Écoles maternelles"]
  },
  {
    id: 14,
    word: "Infrastructures scolaires",
    definition: "Les bâtiments, équipements et ressources nécessaires pour soutenir l'enseignement.",
    sentence: "Pour améliorer l'apprentissage, il faut investir dans de meilleures _____.",
    wrongOptions: ["Pédagogies", "Systèmes éducatifs", "Bourses"]
  },
  {
    id: 15,
    word: "Pédagogie",
    definition: "Méthodes d'enseignement utilisées pour former les élèves.",
    sentence: "Le professeur utilise une _____ innovante basée sur les jeux éducatifs.",
    wrongOptions: ["Administration", "Infrastructure", "Financement"]
  },
  {
    id: 16,
    word: "Formation professionnelle",
    definition: "Enseignement visant à préparer les étudiants à des métiers spécifiques.",
    sentence: "La _____ permet d'apprendre rapidement un métier manuel ou technique.",
    wrongOptions: ["Éducation de base", "Pédagogie", "Formation académique"]
  },
  {
    id: 17,
    word: "Éducation à distance",
    definition: "Forme d'éducation qui utilise la technologie pour enseigner à distance.",
    sentence: "Pendant la pandémie, l'_____ est devenue indispensable.",
    wrongOptions: ["Éducation rurale", "Écoles privées", "Enseignement présentiel"]
  }
];

export const UNIT_3_VOCAB = [
  {
    id: 1,
    word: "Technologie personnelle",
    definition: "Les appareils et applications numériques utilisés par les individus.",
    sentence: "Les smartphones sont la forme de _____ la plus commune.",
    wrongOptions: ["E-réputation", "Cybersécurité", "Données personnelles"]
  },
  {
    id: 2,
    word: "E-réputation",
    definition: "L'image ou la perception qu'une personne projette sur Internet et les réseaux sociaux.",
    sentence: "Il est important de protéger son _____ pour sa future carrière.",
    wrongOptions: ["Bulle de filtre", "Hameçonnage", "Temps d'écran"]
  },
  {
    id: 3,
    word: "Identité numérique",
    definition: "L'ensemble des traces laissées en ligne (publications, profils, données).",
    sentence: "Chaque photo que tu postes construit ton _____.",
    wrongOptions: ["Hygiène numérique", "Empreinte numérique", "Désinformation"]
  },
  {
    id: 4,
    word: "Bulle de filtre",
    definition: "Un état d'isolement intellectuel où on n'est exposé qu'à des informations qui confirment nos croyances.",
    sentence: "L'algorithme de TikTok l'a enfermé dans une véritable _____.",
    wrongOptions: ["Cyber-harcèlement", "Cybersécurité", "Dépendance numérique"]
  },
  {
    id: 5,
    word: "Désinformation",
    definition: "La propagation intentionnelle d'informations fausses ou trompeuses.",
    sentence: "Vérifie toujours tes sources pour lutter contre la _____.",
    wrongOptions: ["E-réputation", "Paramètres de confidentialité", "Hameçonnage"]
  },
  {
    id: 6,
    word: "Dépendance numérique",
    definition: "L'usage excessif et compulsif des technologies, au point d'interférer avec la vie quotidienne.",
    sentence: "Il passe 10 heures par jour sur son téléphone, c'est une vraie _____.",
    wrongOptions: ["Déconnexion numérique", "Bulle de filtre", "Hygiène numérique"]
  },
  {
    id: 7,
    word: "Déconnexion numérique",
    definition: "Le fait de prendre des pauses ou de s'abstenir d'utiliser des appareils connectés.",
    sentence: "Le week-end, je pratique la _____ totale en éteignant mon portable.",
    wrongOptions: ["Cybersécurité", "Hameçonnage", "Dépendance numérique"]
  },
  {
    id: 8,
    word: "Hygiène numérique",
    definition: "L'ensemble des bonnes pratiques visant à assurer la santé physique et mentale lors de l'utilisation des technologies.",
    sentence: "Ne pas regarder les écrans avant de dormir fait partie d'une bonne _____.",
    wrongOptions: ["Empreinte numérique", "E-réputation", "Économie de l'attention"]
  },
  {
    id: 9,
    word: "Temps d'écran",
    definition: "La durée que l'on passe à utiliser des appareils électroniques.",
    sentence: "Mes parents ont limité mon _____ à 2 heures par jour.",
    wrongOptions: ["Bulle de filtre", "Paramètres de confidentialité", "Harcèlement en ligne"]
  },
  {
    id: 10,
    word: "Fatigue visuelle",
    definition: "L'inconfort des yeux causé par l'utilisation prolongée d'écrans.",
    sentence: "Regarder son ordinateur toute la journée donne une _____.",
    wrongOptions: ["Dépendance numérique", "Cybersécurité", "Identité numérique"]
  },
  {
    id: 11,
    word: "Empreinte numérique",
    definition: "L'ensemble des données qu'une personne crée et laisse en utilisant des appareils et services.",
    sentence: "Effacer son historique aide à réduire son _____.",
    wrongOptions: ["E-réputation", "Bulle de filtre", "Hameçonnage"]
  },
  {
    id: 12,
    word: "Données personnelles",
    definition: "Les informations qui permettent d'identifier un individu (nom, adresse, localisation).",
    sentence: "Les applications collectent tes _____ pour te cibler avec des publicités.",
    wrongOptions: ["Technologies personnelles", "Paramètres de confidentialité", "Désinformation"]
  },
  {
    id: 13,
    word: "Hameçonnage",
    definition: "Technique frauduleuse pour obtenir des informations personnelles en se faisant passer pour une entité de confiance.",
    sentence: "Ce faux e-mail de la banque était une tentative de _____.",
    wrongOptions: ["Cyber-harcèlement", "Bulle de filtre", "Dépendance numérique"]
  },
  {
    id: 14,
    word: "Cybersécurité",
    definition: "Les mesures pour protéger les systèmes informatiques et les données personnelles.",
    sentence: "Utiliser un mot de passe complexe est une règle de base en _____.",
    wrongOptions: ["E-réputation", "Identité numérique", "Économie de l'attention"]
  },
  {
    id: 15,
    word: "Paramètres de confidentialité",
    definition: "Les outils et réglages qui permettent de contrôler qui peut voir vos informations.",
    sentence: "J'ai changé mes _____ pour que mon profil Instagram soit privé.",
    wrongOptions: ["Données personnelles", "Temps d'écran", "Hameçonnage"]
  },
  {
    id: 16,
    word: "Harcèlement en ligne",
    definition: "L'utilisation d'outils numériques pour intimider, menacer ou humilier une personne de manière répétée.",
    sentence: "Le _____ peut avoir de graves conséquences psychologiques sur les jeunes.",
    wrongOptions: ["Hameçonnage", "Bulle de filtre", "Économie de l'attention"]
  },
  {
    id: 17,
    word: "Économie de l'attention",
    definition: "Le modèle économique où les entreprises rivalisent pour capter le temps des utilisateurs.",
    sentence: "Les réseaux sociaux utilisent des notifications constantes dans cette _____.",
    wrongOptions: ["Cybersécurité", "E-réputation", "Hygiène numérique"]
  }
];

export const UNIT_3_SONG_VOCAB = [
  {
    id: 101,
    word: "Dépendant",
    definition: "Qui ne peut pas se passer de quelque chose ou quelqu'un.",
    sentence: "Il est complètement _____ de son téléphone portable.",
    wrongOptions: ["Absorbé", "Quotidien", "Pratique"]
  },
  {
    id: 102,
    word: "Quotidien",
    definition: "Ce qui se fait tous les jours.",
    sentence: "Les réseaux sociaux font partie intégrante de notre _____.",
    wrongOptions: ["Équilibre", "Compagnie", "Joies"]
  },
  {
    id: 103,
    word: "Absorbé",
    definition: "Très concentré sur quelque chose, au point d'en oublier le reste.",
    sentence: "Il est tellement _____ par son écran qu'il n'écoute personne.",
    wrongOptions: ["Dépendant", "Conscience", "Remplacer"]
  },
  {
    id: 104,
    word: "Joies",
    definition: "Plaisirs, moments agréables.",
    sentence: "Il faut retrouver les _____ simples de la vie réelle.",
    wrongOptions: ["Équilibre", "Dossiers", "Repères"]
  },
  {
    id: 105,
    word: "Équilibre",
    definition: "Situation dans laquelle différentes forces sont en harmonie.",
    sentence: "Il est crucial de trouver un bon _____ entre les écrans et la vraie vie.",
    wrongOptions: ["Conscience", "Pratique", "Quotidien"]
  },
  {
    id: 106,
    word: "Conscience",
    definition: "La capacité de percevoir et de comprendre les choses.",
    sentence: "Il faut prendre _____ des dangers de la dépendance numérique.",
    wrongOptions: ["Compagnie", "Dépendant", "Équilibre"]
  },
  {
    id: 107,
    word: "Pratique",
    definition: "Qui est utile et fonctionnel.",
    sentence: "Avoir un GPS sur son téléphone est très _____.",
    wrongOptions: ["Absorbé", "Envoûté", "Quotidien"]
  },
  {
    id: 108,
    word: "Compagnie",
    definition: "Le fait d'être en présence de quelqu'un.",
    sentence: "Il préfère la _____ de son téléphone plutôt que ses amis.",
    wrongOptions: ["Joies", "Conscience", "Dossiers"]
  },
  {
    id: 109,
    word: "Remplacer",
    definition: "Mettre à la place de quelque chose ou quelqu'un.",
    sentence: "Rien ne peut _____ une vraie conversation en face à face.",
    wrongOptions: ["Bombarder", "Ralentir", "Absorber"]
  },
  {
    id: 110,
    word: "Bombarde",
    definition: "Envoyer beaucoup de quelque chose de manière intensive.",
    sentence: "La technologie nous _____ de publicités tous les jours.",
    wrongOptions: ["Remplacer", "Pixélisé", "Envoûter"]
  }
];

export const UNIT_4_VOCAB = [
  { id: 111, word: "Le chômage", definition: "Absence d'emploi pour une personne.", sentence: "À cause de la crise, beaucoup de jeunes font face au _____.", wrongOptions: ["Le SMIC", "La précarité", "Le salaire"] },
  { id: 112, word: "La précarité", definition: "Instabilité de la situation financière ou sociale.", sentence: "Vivre avec des contrats courts plonge les travailleurs dans la _____.", wrongOptions: ["Richesse", "Stabilité", "Solidarité"] },
  { id: 113, word: "Le coût de la vie", definition: "Montant nécessaire pour payer les dépenses essentielles.", sentence: "Avec l'inflation, le _____ a considérablement augmenté.", wrongOptions: ["Chômage", "Pouvoir d'achat", "Salaire"] },
  { id: 114, word: "Les inégalités sociales", definition: "Différences marquées entre les groupes sociaux.", sentence: "L'école tente de réduire les _____ dès le plus jeune âge.", wrongOptions: ["Injustices", "Égalités", "Aides"] },
  { id: 115, word: "Le SMIC", definition: "Salaire minimum légal en France.", sentence: "Elle travaille à plein temps mais ne gagne que le _____.", wrongOptions: ["RSA", "Chômage", "Revenu"] },
  { id: 116, word: "Les discriminations", definition: "Traitement injuste d'un individu en raison de son origine ou sexe.", sentence: "Les _____ à l'embauche touchent particulièrement les minorités.", wrongOptions: ["Séparations", "Égalités", "Aides sociales"] },
  { id: 117, word: "L'exclusion sociale", definition: "Marginalisation des individus n'ayant pas accès aux opportunités.", sentence: "La perte de logement conduit souvent à _____.", wrongOptions: ["La pauvreté", "L'intégration", "L'insertion"] },
  { id: 118, word: "Le mal-logement", definition: "Conditions de logement insuffisantes ou inadaptées.", sentence: "L'association lutte contre le _____ en rénovant des appartements.", wrongOptions: ["Sans-abri", "Chômage", "Loyer"] },
  { id: 119, word: "Les sans-abri (SDF)", definition: "Personnes vivant dans la rue ou sans domicile fixe.", sentence: "En hiver, des centres d'hébergement ouvrent pour accueillir les _____.", wrongOptions: ["Chômeurs", "Travailleurs", "Locataires"] },
  { id: 120, word: "L'insécurité alimentaire", definition: "Difficulté à se procurer une alimentation suffisante.", sentence: "À cause de l'inflation, beaucoup d'étudiants souffrent d'_____.", wrongOptions: ["Inégalité", "Faim", "Obésité"] },
  { id: 121, word: "La fracture numérique", definition: "Inégalité d'accès aux technologies de l'information.", sentence: "Les personnes âgées sont particulièrement touchées par la _____.", wrongOptions: ["Connexion", "Pauvreté", "Dématérialisation"] },
  { id: 122, word: "Une association caritative", definition: "Organisation qui aide les personnes dans le besoin.", sentence: "Les Restos du Cœur sont une célèbre _____ française.", wrongOptions: ["Entreprise", "Mairie", "Banque"] },
  { id: 123, word: "Les aides sociales", definition: "Prestations financières de l'État pour soutenir les plus démunis.", sentence: "Sans les _____, beaucoup de familles ne pourraient pas s'en sortir.", wrongOptions: ["Dépenses", "Taxes", "Impôts"] },
  { id: 124, word: "Le RSA", definition: "Allocation pour les personnes sans ressources (Revenu de Solidarité Active).", sentence: "Depuis qu'il a perdu son emploi, il touche le _____ pour survivre.", wrongOptions: ["SMIC", "Chômage", "Prime"] },
  { id: 125, word: "L'insertion professionnelle", definition: "Processus d'aide pour intégrer une personne au marché du travail.", sentence: "Cette formation vise l'_____ des jeunes sans diplôme.", wrongOptions: ["Exclusion", "École", "Répression"] },
  { id: 126, word: "Une statistique", definition: "Donnée chiffrée qui mesure un phénomène.", sentence: "La dernière _____ montre que la pauvreté augmente en France.", wrongOptions: ["Histoire", "Règle", "Mesure"] },
  { id: 127, word: "Un témoignage", definition: "Récit personnel d'une expérience vécue.", sentence: "Le _____ bouleversant de cette mère isolée a ému tout le monde.", wrongOptions: ["Mensonge", "Livre", "Rapport"] },
  { id: 128, word: "Vivre sous le seuil de pauvreté", definition: "Avoir des revenus inférieurs au minimum nécessaire.", sentence: "Plus de 9 millions de personnes en France sont contraintes de _____.", wrongOptions: ["Gagner au loto", "Travailler dur", "Toucher le SMIC"] },
  { id: 129, word: "Tirer la sonnette d'alarme", definition: "Avertir d'une situation urgente ou dangereuse.", sentence: "Les ONG doivent _____ face à la crise du logement.", wrongOptions: ["Fermer les yeux", "Faire la grève", "Aider les autres"] },
  { id: 130, word: "Briser le cercle vicieux", definition: "Mettre fin à une situation qui s'auto-entretient.", sentence: "L'éducation est la clé pour _____ de la pauvreté.", wrongOptions: ["Tourner en rond", "Créer un problème", "Avoir de la chance"] }
];
