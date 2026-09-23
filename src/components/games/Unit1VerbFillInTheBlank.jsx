import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Award, 
  BookOpen, 
  PenTool, 
  Search, 
  ShieldCheck, 
  Newspaper,
  ChevronRight,
  Info
} from 'lucide-react';
import Unit1NewsroomFillInTheBlank from './Unit1NewsroomFillInTheBlank';
import './Unit1VerbFillInTheBlank.css';

const ACCENT_KEYS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', "'"];

// ==========================================
// 1. ACTIVITÉ 1 : VERBES EN -ER (1er GROUPE)
// ==========================================
const ACTIVITY_ER = {
  id: 'er',
  title: "Activité 1 : Les Verbes en -ER (1er Groupe)",
  subtitle: "Le quotidien en salle de rédaction & le reportage",
  badgeText: "1er Groupe Régulier (-ER)",
  badgeClass: "er",
  rule: {
    title: "Règle de conjugaison au présent",
    formula: "Radical de l'infinitif + -e, -es, -e, -ons, -ez, -ent",
    examples: "Je vérifie, Tu vérifies, Il/Elle vérifie, Nous vérifions, Vous vérifiez, Ils/Elles vérifient"
  },
  questions: [
    {
      id: 1,
      infinitive: "vérifier",
      subject: "la journaliste d'investigation (elle)",
      before: "Dans la salle de rédaction, la journaliste d'investigation ",
      after: " scrupuleusement la provenance de ses documents confidentiels avant la conférence de presse.",
      expected: "vérifie",
      accepted: ["vérifie", "verifie"],
      hint: "Sujet : « la journaliste » (3e pers. du singulier) | Radical : vérifi- | Terminaison : -e",
      explanation: "Avec « la journaliste » (elle), on retire -er et on ajoute la terminaison -e."
    },
    {
      id: 2,
      infinitive: "interviewer",
      subject: "mon collègue et moi (nous)",
      before: "Pour préparer le grand dossier d'enquête du dimanche, mon collègue et moi ",
      after: " plusieurs lanceurs d'alerte sous le couvert de l'anonymat.",
      expected: "interviewons",
      accepted: ["interviewons"],
      hint: "Sujet : « mon collègue et moi » (1re pers. du pluriel = nous) | Radical : interview- | Terminaison : -ons",
      explanation: "« Mon collègue et moi » équivaut à « nous » : on ajoute la terminaison -ons."
    },
    {
      id: 3,
      infinitive: "publier",
      subject: "je",
      before: "En tant que pigiste indépendant, je ",
      after: " régulièrement des analyses approfondies sur la liberté de la presse dans le monde.",
      expected: "publie",
      accepted: ["publie"],
      hint: "Sujet : « je » (1re pers. du singulier) | Radical : publi- | Terminaison : -e",
      explanation: "Avec le pronom « je », les verbes réguliers en -er prennent la terminaison -e."
    },
    {
      id: 4,
      infinitive: "respecter",
      subject: "vous",
      before: "Pour préserver la confiance du public et l'éthique du média, vous ",
      after: " rigoureusement les principes déontologiques de la Charte de Munich.",
      expected: "respectez",
      accepted: ["respectez"],
      hint: "Sujet : « vous » (2e pers. du pluriel) | Radical : respect- | Terminaison : -ez",
      explanation: "Avec le pronom « vous », on ajoute la terminaison -ez."
    },
    {
      id: 5,
      infinitive: "enquêter",
      subject: "les reporters (ils)",
      before: "Face aux rumeurs qui circulent sur les réseaux sociaux, les reporters ",
      after: " patiemment sur le terrain pour démêler le vrai du faux.",
      expected: "enquêtent",
      accepted: ["enquêtent", "enquetent"],
      hint: "Sujet : « les reporters » (3e pers. du pluriel = ils) | Radical : enquêt- | Terminaison : -ent",
      explanation: "Avec le sujet pluriel « les reporters » (ils), on ajoute la terminaison muette -ent."
    },
    {
      id: 6,
      infinitive: "dénoncer",
      subject: "tu",
      before: "Dans ton dernier éditorial percutant, tu ",
      after: " avec un grand courage les tentatives d'ingérence politique dans l'information.",
      expected: "dénonces",
      accepted: ["dénonces", "denonces"],
      hint: "Sujet : « tu » (2e pers. du singulier) | Radical : dénonc- | Terminaison : -es",
      explanation: "Avec le pronom « tu », les verbes en -er prennent la terminaison -es."
    },
    {
      id: 7,
      infinitive: "diffuser",
      subject: "la rédaction (elle)",
      before: "Dès qu'une nouvelle d'importance internationale est confirmée, la rédaction ",
      after: " un bulletin d'alerte spéciale sur son application mobile.",
      expected: "diffuse",
      accepted: ["diffuse"],
      hint: "Sujet : « la rédaction » (3e pers. du singulier = elle) | Radical : diffus- | Terminaison : -e",
      explanation: "« La rédaction » est un nom singulier féminin (elle) : la terminaison est -e."
    },
    {
      id: 8,
      infinitive: "consulter",
      subject: "on",
      before: "Dans un journalisme responsable, on ",
      after: " au minimum deux sources primaires et indépendantes avant de valider un scoop.",
      expected: "consulte",
      accepted: ["consulte"],
      hint: "Sujet : « on » (3e pers. du singulier) | Radical : consult- | Terminaison : -e",
      explanation: "Le pronom « on » se conjugue toujours à la 3e personne du singulier : terminaison -e."
    },
    {
      id: 9,
      infinitive: "partager",
      subject: "beaucoup d'internautes (ils)",
      before: "Malheureusement, beaucoup d'internautes ",
      after: " des publications sensationnalistes sans vérifier au préalable l'origine des faits.",
      expected: "partagent",
      accepted: ["partagent"],
      hint: "Sujet : « beaucoup d'internautes » (3e pers. du pluriel = ils) | Radical : partag- | Terminaison : -ent",
      explanation: "« Beaucoup d'internautes » est un sujet pluriel (ils) : la terminaison est -ent."
    },
    {
      id: 10,
      infinitive: "informer",
      subject: "nous",
      before: "Notre mission première en démocratie consiste à rester neutres lorsque nous ",
      after: " les citoyens sur les enjeux électoraux majeurs.",
      expected: "informons",
      accepted: ["informons"],
      hint: "Sujet : « nous » (1re pers. du pluriel) | Radical : inform- | Terminaison : -ons",
      explanation: "Avec le pronom « nous », on ajoute la terminaison -ons."
    }
  ]
};

// ==========================================
// 2. ACTIVITÉ 2 : VERBES EN -IR (2e GROUPE)
// ==========================================
const ACTIVITY_IR = {
  id: 'ir',
  title: "Activité 2 : Les Verbes en -IR (2e Groupe)",
  subtitle: "L'éthique, la rigueur d'enquête & le discernement",
  badgeText: "2e Groupe Régulier (-IR avec -iss-)",
  badgeClass: "ir",
  rule: {
    title: "Règle de conjugaison au présent",
    formula: "Radical de l'infinitif + -is, -is, -it, -issons, -issez, -issent",
    examples: "Je choisis, Tu choisis, Il/Elle choisit, Nous choisissons, Vous choisissez, Ils/Elles choisissent"
  },
  questions: [
    {
      id: 1,
      infinitive: "choisir",
      subject: "le rédacteur en chef (il)",
      before: "Après un débat argumenté en conférence de rédaction, le rédacteur en chef ",
      after: " le sujet d'actualité qui figurera en une du quotidien.",
      expected: "choisit",
      accepted: ["choisit"],
      hint: "Sujet : « le rédacteur en chef » (3e pers. du singulier) | Radical : chois- | Terminaison : -it",
      explanation: "Avec le sujet « le rédacteur en chef » (il), le 2e groupe prend la terminaison -it."
    },
    {
      id: 2,
      infinitive: "réfléchir",
      subject: "nous",
      before: "Avant de relayer un témoignage polémique sur les ondes, nous ",
      after: " longuement aux répercussions sur la vie privée des témoins.",
      expected: "réfléchissons",
      accepted: ["réfléchissons", "reflechissons"],
      hint: "Sujet : « nous » (1re pers. du pluriel) | Radical : réfléch- | Terminaison : -issons",
      explanation: "Avec « nous », les verbes du 2e groupe prennent la terminaison élargie -issons."
    },
    {
      id: 3,
      infinitive: "agir",
      subject: "tu",
      before: "Quand tu couvres des manifestations sous haute tension dans la rue, tu ",
      after: " toujours avec calme, prudence et professionnalisme.",
      expected: "agis",
      accepted: ["agis"],
      hint: "Sujet : « tu » (2e pers. du singulier) | Radical : ag- | Terminaison : -is",
      explanation: "Avec le pronom « tu », la terminaison du 2e groupe au présent est -is."
    },
    {
      id: 4,
      infinitive: "réussir",
      subject: "la jeune reporter (elle)",
      before: "Grâce à des mois d'investigation méticuleuse, la jeune reporter ",
      after: " à mettre au jour un cas grave de conflit d'intérêts.",
      expected: "réussit",
      accepted: ["réussit", "reussit"],
      hint: "Sujet : « la jeune reporter » (3e pers. du singulier = elle) | Radical : réuss- | Terminaison : -it",
      explanation: "« La jeune reporter » est à la 3e personne du singulier : terminaison -it."
    },
    {
      id: 5,
      infinitive: "avertir",
      subject: "je (j')",
      before: "Si je détecte une erreur de chiffre dans une dépêche urgente, j' ",
      after: " immédiatement la rédaction en chef pour rectifier l'information.",
      expected: "avertis",
      accepted: ["avertis"],
      hint: "Sujet : « je / j' » (1re pers. du singulier) | Radical : avert- | Terminaison : -is",
      explanation: "Avec « je », la terminaison des verbes en -ir du 2e groupe est -is."
    },
    {
      id: 6,
      infinitive: "établir",
      subject: "vous et votre équipe (vous)",
      before: "Avant de lancer votre série de reportages à l'étranger, vous et votre équipe ",
      after: " une liste rigoureuse de contacts vérifiés sur place.",
      expected: "établissez",
      accepted: ["établissez", "etablissez"],
      hint: "Sujet : « vous et votre équipe » (2e pers. du pluriel = vous) | Radical : établ- | Terminaison : -issez",
      explanation: "« Vous et votre équipe » correspond à « vous » : la terminaison est -issez."
    },
    {
      id: 7,
      infinitive: "définir",
      subject: "les associations de journalistes (elles)",
      before: "Pour protéger les correspondants de guerre, les associations de journalistes ",
      after: " des règles strictes de sécurité et de déontologie.",
      expected: "définissent",
      accepted: ["définissent", "definissent"],
      hint: "Sujet : « les associations » (3e pers. du pluriel = elles) | Radical : défin- | Terminaison : -issent",
      explanation: "Avec le sujet pluriel « les associations » (elles), on ajoute la terminaison -issent."
    },
    {
      id: 8,
      infinitive: "approfondir",
      subject: "le journaliste d'enquête (il)",
      before: "Loin de se contenter d'un simple communiqué officiel, le journaliste d'enquête ",
      after: " son travail en interrogeant des experts neutres.",
      expected: "approfondit",
      accepted: ["approfondit"],
      hint: "Sujet : « le journaliste d'enquête » (3e pers. du singulier) | Radical : approfond- | Terminaison : -it",
      explanation: "Sujet singulier masculin (il) : la terminaison du 2e groupe est -it."
    },
    {
      id: 9,
      infinitive: "réagir",
      subject: "les lecteurs (ils)",
      before: "Dès la publication du dossier spécial sur l'environnement, les lecteurs ",
      after: " nombreux sur le forum pour partager leur point de vue.",
      expected: "réagissent",
      accepted: ["réagissent", "reagissent"],
      hint: "Sujet : « les lecteurs » (3e pers. du pluriel = ils) | Radical : réag- | Terminaison : -issent",
      explanation: "Avec « les lecteurs » (ils), on ajoute la terminaison plurielle -issent."
    },
    {
      id: 10,
      infinitive: "garantir",
      subject: "notre rédaction et moi (nous)",
      before: "En refusant toute pression financière ou politique, notre rédaction et moi ",
      after: " une totale indépendance éditoriale au lectorat.",
      expected: "garantissons",
      accepted: ["garantissons"],
      hint: "Sujet : « notre rédaction et moi » (1re pers. du pluriel = nous) | Radical : garant- | Terminaison : -issons",
      explanation: "« Notre rédaction et moi » équivaut à « nous » : la terminaison est -issons."
    }
  ]
};

// ==========================================
// 3. ACTIVITÉ 3 : VERBES EN -RE (3e GROUPE)
// ==========================================
const ACTIVITY_RE = {
  id: 're',
  title: "Activité 3 : Les Verbes en -RE (3e Groupe Régulier)",
  subtitle: "Dans les coulisses des médias & la diffusion publique",
  badgeText: "3e Groupe Régulier (-s, -s, -, -ons, -ez, -ent)",
  badgeClass: "re",
  rule: {
    title: "Règle de conjugaison au présent (type Attendre / Vendre)",
    formula: "Radical de l'infinitif + -s, -s, - (rien), -ons, -ez, -ent",
    examples: "J'attends, Tu attends, Il/Elle attend, Nous attendons, Vous attendez, Ils/Elles attendent"
  },
  questions: [
    {
      id: 1,
      infinitive: "attendre",
      subject: "le photographe de presse (il)",
      before: "Posté au pied de la tribune officielle, le photographe de presse ",
      after: " avec patience le moment décisif pour capturer le cliché de la semaine.",
      expected: "attend",
      accepted: ["attend"],
      hint: "Sujet : « le photographe » (3e pers. du singulier) | Radical : attend- | Terminaison : aucune (-) car le radical finit déjà par 'd'",
      explanation: "À la 3e personne du singulier des verbes en -dre réguliers, on n'ajoute rien après le d : « il attend »."
    },
    {
      id: 2,
      infinitive: "répondre",
      subject: "les porte-paroles (ils)",
      before: "Au cours de la conférence de presse retransmise en direct, les porte-paroles ",
      after: " sans détour aux questions pointues des journalistes.",
      expected: "répondent",
      accepted: ["répondent", "repondent"],
      hint: "Sujet : « les porte-paroles » (3e pers. du pluriel = ils) | Radical : répond- | Terminaison : -ent",
      explanation: "Avec « les porte-paroles » (ils), on ajoute la terminaison plurielle -ent."
    },
    {
      id: 3,
      infinitive: "entendre",
      subject: "je (j')",
      before: "En arrivant dans la salle des dépêches à l'heure du bouclage, j' ",
      after: " l'effervescence de toute l'équipe et le cliquetis incessant des claviers.",
      expected: "entends",
      accepted: ["entends"],
      hint: "Sujet : « je / j' » (1re pers. du singulier) | Radical : entend- | Terminaison : -s",
      explanation: "Avec « je », la terminaison des verbes réguliers en -re est -s."
    },
    {
      id: 4,
      infinitive: "défendre",
      subject: "les journalistes indépendants et moi (nous)",
      before: "Face aux tentatives d'intimidation judiciaire, les journalistes indépendants et moi ",
      after: " avec fermeté le secret professionnel des sources.",
      expected: "défendons",
      accepted: ["défendons", "defendons"],
      hint: "Sujet : « les journalistes et moi » (1re pers. du pluriel = nous) | Radical : défend- | Terminaison : -ons",
      explanation: "Sujet équivalent à « nous » : on ajoute la terminaison -ons."
    },
    {
      id: 5,
      infinitive: "perdre",
      subject: "tu",
      before: "Si tu publies un scoop sensationnel sans aucune preuve vérifiable, tu ",
      after: " immédiatement toute crédibilité auprès de ton lectorat.",
      expected: "perds",
      accepted: ["perds"],
      hint: "Sujet : « tu » (2e pers. du singulier) | Radical : perd- | Terminaison : -s",
      explanation: "Avec le pronom « tu », la terminaison régulière en -re est -s."
    },
    {
      id: 6,
      infinitive: "rendre",
      subject: "cette enquête choc (elle)",
      before: "Ce matin, la parution de cette enquête choc ",
      after: " publiques des informations sensibles sur la corruption institutionnelle.",
      expected: "rend",
      accepted: ["rend"],
      hint: "Sujet : « cette enquête » (3e pers. du singulier = elle) | Radical : rend- | Terminaison : aucune (-)",
      explanation: "Au singulier (elle), le verbe régulier en -dre conserve son 'd' final sans terminaison ajoutée : « elle rend »."
    },
    {
      id: 7,
      infinitive: "prétendre",
      subject: "ce site anonyme (il)",
      before: "Même si ce site anonyme ",
      after: " révéler des vérités cachées, ses affirmations ne reposent sur aucun fait attesté.",
      expected: "prétend",
      accepted: ["prétend", "pretend"],
      hint: "Sujet : « ce site anonyme » (3e pers. du singulier = il) | Radical : prétend- | Terminaison : aucune (-)",
      explanation: "Avec « il », les verbes en -endre réguliers gardent le 'd' sans -t ni -s : « il prétend »."
    },
    {
      id: 8,
      infinitive: "correspondre",
      subject: "les données recueillies (elles)",
      before: "Après une vérification croisée approfondie, les données recueillies ",
      after: " parfaitement aux témoignages livrés par les experts.",
      expected: "correspondent",
      accepted: ["correspondent"],
      hint: "Sujet : « les données » (3e pers. du pluriel = elles) | Radical : correspond- | Terminaison : -ent",
      explanation: "Avec le sujet pluriel « les données » (elles), on ajoute la terminaison -ent."
    },
    {
      id: 9,
      infinitive: "suspendre",
      subject: "la direction du journal (elle)",
      before: "Dans l'attente des conclusions du comité d'éthique, la direction du journal ",
      after: " la diffusion de l'article litigieux.",
      expected: "suspend",
      accepted: ["suspend"],
      hint: "Sujet : « la direction » (3e pers. du singulier = elle) | Radical : suspend- | Terminaison : aucune (-)",
      explanation: "Avec un sujet au singulier (elle), la 3e personne reste « elle suspend »."
    },
    {
      id: 10,
      infinitive: "vendre",
      subject: "vous",
      before: "Dans votre kiosque à journaux situé sur les grands boulevards, vous ",
      after: " des éditions imprimées aux passants dès six heures du matin.",
      expected: "vendez",
      accepted: ["vendez"],
      hint: "Sujet : « vous » (2e pers. du pluriel) | Radical : vend- | Terminaison : -ez",
      explanation: "Avec le pronom « vous », la terminaison est -ez : « vous vendez »."
    }
  ]
};

// ===============================================
// 4. ACTIVITÉ 4 : VERBES IRRÉGULIERS (AU PRÉSENT)
// ===============================================
const ACTIVITY_IRR = {
  id: 'irr',
  title: "Activité 4 : Les Verbes Irréguliers au Présent",
  subtitle: "Les grands piliers de la langue au cœur des débats et de l'enquête",
  badgeText: "Verbes Irréguliers Clés (Faire, Pouvoir, Savoir, Devoir, Aller, etc.)",
  badgeClass: "irr",
  rule: {
    title: "Rappel : Les Verbes Irréguliers Clés au Présent",
    formula: "Attention aux radicaux modifiés et aux terminaisons en -s/-x, -s/-x, -t/-d",
    examples: "faire (nous faisons, vous faites, ils font) • pouvoir (je peux, ils peuvent) • aller (je vais, ils vont) • prendre (ils prennent)"
  },
  questions: [
    {
      id: 1,
      infinitive: "faire",
      subject: "mes collègues et moi (nous)",
      before: "Pour vérifier chaque détail avant l'impression du journal, mes collègues et moi ",
      after: " une relecture collective extrêmement attentive.",
      expected: "faisons",
      accepted: ["faisons"],
      hint: "Sujet : « mes collègues et moi » (1re pers. du pluriel = nous) | Verbe irrégulier : faire",
      explanation: "« Mes collègues et moi » équivaut à « nous » : avec faire, la forme au présent est « nous faisons »."
    },
    {
      id: 2,
      infinitive: "pouvoir",
      subject: "les citoyens (ils)",
      before: "Dans une société démocratique transparente, les citoyens ",
      after: " accéder librement aux archives publiques et aux données ouvertes.",
      expected: "peuvent",
      accepted: ["peuvent"],
      hint: "Sujet : « les citoyens » (3e pers. du pluriel = ils) | Verbe irrégulier : pouvoir",
      explanation: "Avec le sujet pluriel « les citoyens » (ils), le verbe pouvoir prend la forme « ils peuvent »."
    },
    {
      id: 3,
      infinitive: "écrire",
      subject: "je (j')",
      before: "Tous les vendredis matin, j' ",
      after: " une chronique d'analyse sur les bouleversements du paysage médiatique.",
      expected: "écris",
      accepted: ["écris", "ecris"],
      hint: "Sujet : « je / j' » (1re pers. du singulier) | Verbe irrégulier : écrire",
      explanation: "Avec « je », le verbe irrégulier écrire se termine par un -s : « j'écris »."
    },
    {
      id: 4,
      infinitive: "devoir",
      subject: "vous",
      before: "En tant que futurs reporters sur le terrain, vous ",
      after: " protéger l'anonymat de vos informateurs en toute circonstance.",
      expected: "devez",
      accepted: ["devez"],
      hint: "Sujet : « vous » (2e pers. du pluriel) | Verbe irrégulier : devoir",
      explanation: "Avec le pronom « vous », la conjugaison de devoir au présent est « vous devez »."
    },
    {
      id: 5,
      infinitive: "savoir",
      subject: "on",
      before: "Dans la salle de rédaction, on ",
      after: " bien que la course au scoop ne doit jamais l'emporter sur l'exactitude des faits.",
      expected: "sait",
      accepted: ["sait"],
      hint: "Sujet : « on » (3e pers. du singulier) | Verbe irrégulier : savoir",
      explanation: "Avec « on », savoir se termine par un -t : « on sait »."
    },
    {
      id: 6,
      infinitive: "prendre",
      subject: "les rédacteurs (ils)",
      before: "Avant de lancer une enquête sur un sujet sensible, les rédacteurs ",
      after: " le temps de consulter l'équipe juridique du journal.",
      expected: "prennent",
      accepted: ["prennent"],
      hint: "Sujet : « les rédacteurs » (3e pers. du pluriel = ils) | Verbe irrégulier : prendre",
      explanation: "À la 3e personne du pluriel, prendre double sa consonne « n » : « ils prennent »."
    },
    {
      id: 7,
      infinitive: "dire",
      subject: "tu",
      before: "Lorsque tu témoignes devant une commission d'enquête publique, tu ",
      after: " la vérité sans craindre les pressions politiques.",
      expected: "dis",
      accepted: ["dis"],
      hint: "Sujet : « tu » (2e pers. du singulier) | Verbe irrégulier : dire",
      explanation: "Avec le pronom « tu », la forme du verbe dire au présent est « tu dis »."
    },
    {
      id: 8,
      infinitive: "aller",
      subject: "le correspondant spécial (il)",
      before: "Pour couvrir les manifestations citoyennes de l'intérieur, le correspondant spécial ",
      after: " directement à la rencontre des participants sur le terrain.",
      expected: "va",
      accepted: ["va"],
      hint: "Sujet : « le correspondant spécial » (3e pers. du singulier = il) | Verbe irrégulier : aller",
      explanation: "Le verbe super-irrégulier aller change de radical : « il va »."
    },
    {
      id: 9,
      infinitive: "vouloir",
      subject: "nous",
      before: "Pour lutter efficacement contre la désinformation, nous ",
      after: " promouvoir l'éducation aux médias dans toutes les écoles.",
      expected: "voulons",
      accepted: ["voulons"],
      hint: "Sujet : « nous » (1re pers. du pluriel) | Verbe irrégulier : vouloir",
      explanation: "Avec « nous », le verbe vouloir se conjugue « nous voulons »."
    },
    {
      id: 10,
      infinitive: "mettre",
      subject: "la lanceuse d'alerte (elle)",
      before: "En transmettant ces documents exclusifs au journal, la lanceuse d'alerte ",
      after: " sa propre sécurité en péril pour informer l'opinion publique.",
      expected: "met",
      accepted: ["met"],
      hint: "Sujet : « la lanceuse d'alerte » (3e pers. du singulier = elle) | Verbe irrégulier : mettre",
      explanation: "Avec « elle », le verbe mettre s'écrit « elle met » (conserve son 't' sans terminaison ajoutée)."
    }
  ]
};

function normalizeAnswer(str) {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ');
}

export default function Unit1VerbFillInTheBlank() {
  const [activeTab, setActiveTab] = useState('er'); // 'er' | 'ir' | 're' | 'irr' | 'vocab'

  // Per-activity states for er, ir, re, irr
  const [answersByActivity, setAnswersByActivity] = useState({
    er: Array(ACTIVITY_ER.questions.length).fill(''),
    ir: Array(ACTIVITY_IR.questions.length).fill(''),
    re: Array(ACTIVITY_RE.questions.length).fill(''),
    irr: Array(ACTIVITY_IRR.questions.length).fill('')
  });

  const [submittedByActivity, setSubmittedByActivity] = useState({
    er: false,
    ir: false,
    re: false,
    irr: false
  });

  const [visibleHints, setVisibleHints] = useState({});
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const inputRefs = useRef({});

  // Active activity config
  const currentActivity = 
    activeTab === 'er' ? ACTIVITY_ER :
    activeTab === 'ir' ? ACTIVITY_IR :
    activeTab === 're' ? ACTIVITY_RE :
    activeTab === 'irr' ? ACTIVITY_IRR : null;

  const currentAnswers = currentActivity ? (answersByActivity[activeTab] || []) : [];
  const isCurrentSubmitted = currentActivity ? !!submittedByActivity[activeTab] : false;

  const handleInputChange = (index, value) => {
    if (!currentActivity) return;
    setAnswersByActivity(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map((ans, i) => (i === index ? value : ans))
    }));
  };

  const handleInsertAccent = (char) => {
    if (!currentActivity) return;
    const targetIdx = activeInputIndex !== null ? activeInputIndex : 0;
    const inputEl = inputRefs.current[`${activeTab}-${targetIdx}`];
    const currentVal = currentAnswers[targetIdx] || '';

    if (inputEl) {
      const start = inputEl.selectionStart ?? currentVal.length;
      const end = inputEl.selectionEnd ?? currentVal.length;
      const newVal = currentVal.substring(0, start) + char + currentVal.substring(end);

      handleInputChange(targetIdx, newVal);

      setTimeout(() => {
        inputEl.focus();
        inputEl.setSelectionRange(start + char.length, start + char.length);
      }, 10);
    } else {
      handleInputChange(targetIdx, currentVal + char);
    }
  };

  const toggleHint = (qId) => {
    const key = `${activeTab}-${qId}`;
    setVisibleHints(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isQuestionCorrect = (q, userVal) => {
    const cleanUser = normalizeAnswer(userVal);
    if (!cleanUser) return false;
    return q.accepted.some(acc => normalizeAnswer(acc) === cleanUser);
  };

  const calculateScore = (activity) => {
    const ansList = answersByActivity[activity.id] || [];
    let count = 0;
    activity.questions.forEach((q, idx) => {
      if (isQuestionCorrect(q, ansList[idx])) {
        count++;
      }
    });
    return count;
  };

  const handleSubmit = () => {
    if (!currentActivity) return;
    setSubmittedByActivity(prev => ({
      ...prev,
      [activeTab]: true
    }));

    setTimeout(() => {
      const scorecard = document.getElementById('verb-scorecard-section');
      if (scorecard) {
        scorecard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const handleReset = () => {
    if (!currentActivity) return;
    setAnswersByActivity(prev => ({
      ...prev,
      [activeTab]: Array(currentActivity.questions.length).fill('')
    }));
    setSubmittedByActivity(prev => ({
      ...prev,
      [activeTab]: false
    }));
  };

  const handleRetryErrors = () => {
    if (!currentActivity) return;
    const currentAns = answersByActivity[activeTab];
    const updated = currentAns.map((ans, idx) => {
      const q = currentActivity.questions[idx];
      return isQuestionCorrect(q, ans) ? ans : '';
    });

    setAnswersByActivity(prev => ({
      ...prev,
      [activeTab]: updated
    }));
    setSubmittedByActivity(prev => ({
      ...prev,
      [activeTab]: false
    }));
  };

  // If user selects journalistic vocabulary tab
  if (activeTab === 'vocab') {
    return (
      <div className="verb-fill-container">
        {/* Navigation Tabs */}
        <div className="verb-subnav">
          <button 
            className="verb-nav-btn"
            onClick={() => setActiveTab('er')}
          >
            <PenTool size={16} />
            <span>1. Verbes en -ER</span>
          </button>

          <button 
            className="verb-nav-btn"
            onClick={() => setActiveTab('ir')}
          >
            <Search size={16} />
            <span>2. Verbes en -IR</span>
          </button>

          <button 
            className="verb-nav-btn"
            onClick={() => setActiveTab('re')}
          >
            <ShieldCheck size={16} />
            <span>3. Verbes en -RE</span>
          </button>

          <button 
            className="verb-nav-btn"
            onClick={() => setActiveTab('irr')}
          >
            <Sparkles size={16} />
            <span>4. Verbes Irréguliers</span>
          </button>

          <button 
            className="verb-nav-btn active-vocab"
            onClick={() => setActiveTab('vocab')}
          >
            <Newspaper size={16} />
            <span>Atelier Vocabulaire Journalistique</span>
          </button>
        </div>

        {/* Existing 20-item journalism vocab component */}
        <Unit1NewsroomFillInTheBlank />
      </div>
    );
  }

  const score = currentActivity ? calculateScore(currentActivity) : 0;
  const totalQuestions = currentActivity ? currentActivity.questions.length : 0;
  const filledCount = currentAnswers.filter(a => a.trim().length > 0).length;

  const getVerdict = (pts) => {
    if (pts === 10) {
      return {
        stamp: "EXEMPLAIRE — MAÎTRISE ABSOLUE",
        title: "Félicitations de la Rédaction !",
        subtext: "Votre maîtrise de la conjugaison est irréprochable. Vous conjuguez avec la précision d'un grand reporter !",
        color: "#10b981"
      };
    }
    if (pts >= 8) {
      return {
        stamp: "BON À TIRER — MENTION TRÈS BIEN",
        title: "Très beau travail d'écriture !",
        subtext: "L'immense majorité de vos verbes est correctement conjuguée. Quelques détails à polir et vos articles seront parfaits.",
        color: "#38bdf8"
      };
    }
    if (pts >= 5) {
      return {
        stamp: "ENQUÊTE EN COURS",
        title: "Bonne progression !",
        subtext: "Vous maîtrisez le radical, mais surveillez les terminaisons spécifiques du groupe. Cliquez sur « Réessayer les erreurs » pour progresser !",
        color: "#f59e0b"
      };
    }
    return {
      stamp: "RELECTURE EXIGÉE",
      title: "Révisez les règles de conjugaison",
      subtext: "Consultez l'encadré de règle au sommet de l'activité pour bien repérer le sujet et la terminaison correspondante.",
      color: "#ef4444"
    };
  };

  const verdict = getVerdict(score);

  return (
    <div className="verb-fill-container">
      {/* 1. Subnav Switching Tabs */}
      <div className="verb-subnav">
        <button 
          className={`verb-nav-btn ${activeTab === 'er' ? 'active-er' : ''}`}
          onClick={() => setActiveTab('er')}
        >
          <PenTool size={16} />
          <span>1. Verbes en -ER</span>
        </button>

        <button 
          className={`verb-nav-btn ${activeTab === 'ir' ? 'active-ir' : ''}`}
          onClick={() => setActiveTab('ir')}
        >
          <Search size={16} />
          <span>2. Verbes en -IR</span>
        </button>

        <button 
          className={`verb-nav-btn ${activeTab === 're' ? 'active-re' : ''}`}
          onClick={() => setActiveTab('re')}
        >
          <ShieldCheck size={16} />
          <span>3. Verbes en -RE</span>
        </button>

        <button 
          className={`verb-nav-btn ${activeTab === 'irr' ? 'active-irr' : ''}`}
          onClick={() => setActiveTab('irr')}
        >
          <Sparkles size={16} />
          <span>4. Verbes Irréguliers</span>
        </button>

        <button 
          className="verb-nav-btn"
          onClick={() => setActiveTab('vocab')}
        >
          <Newspaper size={16} />
          <span>Atelier Vocabulaire Journalistique</span>
        </button>
      </div>

      {/* 2. Activity Masthead Header */}
      <div className="verb-masthead">
        <div className={`verb-masthead-badge ${currentActivity.badgeClass}`}>
          <Sparkles size={14} />
          <span>{currentActivity.badgeText}</span>
        </div>

        <h2 className="verb-masthead-title">
          {currentActivity.title}
        </h2>
        <p className="verb-masthead-desc">
          {currentActivity.subtitle}. Complétez chaque phrase en conjuguant le verbe entre parenthèses au <strong>présent de l'indicatif</strong> selon son sujet.
        </p>

        {/* Grammar Rule Callout Card */}
        <div className={`verb-rule-card ${currentActivity.badgeClass}`}>
          <div className="verb-rule-title">
            <BookOpen size={16} />
            <span>{currentActivity.rule.title}</span>
          </div>
          <div className="verb-rule-formula">
            {currentActivity.rule.formula}
          </div>
          <p className="verb-rule-sub">
            <em>Exemples clés :</em> {currentActivity.rule.examples}
          </p>
        </div>
      </div>

      {/* 3. Toolbar: French Accents & Progress */}
      <div className="verb-toolbar">
        <div className="verb-accents-wrapper">
          <span className="verb-accents-label">Caractères :</span>
          {ACCENT_KEYS.map((char) => (
            <button
              key={char}
              type="button"
              className="verb-accent-key"
              onClick={() => handleInsertAccent(char)}
              title={`Insérer ${char}`}
            >
              {char}
            </button>
          ))}
        </div>

        <div className="verb-progress-pill">
          <span>Complétés :</span>
          <strong style={{ color: filledCount === totalQuestions ? '#4ade80' : '#38bdf8' }}>
            {filledCount} / {totalQuestions}
          </strong>
        </div>
      </div>

      {/* 4. Questions List */}
      <div className="verb-questions-list">
        {currentActivity.questions.map((q, idx) => {
          const userVal = currentAnswers[idx] || '';
          const isCorrect = isQuestionCorrect(q, userVal);
          const hintKey = `${activeTab}-${q.id}`;
          const isHintOpen = !!visibleHints[hintKey];

          let cardStateClass = '';
          if (isCurrentSubmitted) {
            cardStateClass = isCorrect ? 'correct' : 'incorrect';
          }

          return (
            <div 
              key={q.id} 
              className={`verb-qcard ${cardStateClass}`}
              onClick={() => setActiveInputIndex(idx)}
            >
              <div className="verb-qcard-top">
                <span className="verb-qnum">
                  Phrase {q.id} sur {totalQuestions}
                </span>

                <button
                  type="button"
                  className="verb-hint-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHint(q.id);
                  }}
                  title="Afficher l'aide grammaticale"
                >
                  <HelpCircle size={14} />
                  <span>{isHintOpen ? 'Masquer l\'indice' : 'Indice sujet'}</span>
                </button>
              </div>

              {/* The Sentence with Blank */}
              <div className="verb-sentence">
                <span>{q.before}</span>
                
                <span className="verb-inline-blank">
                  <input
                    ref={(el) => (inputRefs.current[`${activeTab}-${idx}`] = el)}
                    type="text"
                    className={`verb-input ${isCurrentSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                    value={userVal}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onFocus={() => setActiveInputIndex(idx)}
                    placeholder="verbe..."
                    disabled={isCurrentSubmitted}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <span className={`verb-prompt-infinitive ${currentActivity.badgeClass}`}>
                    ({q.infinitive})
                  </span>
                </span>

                <span>{q.after}</span>
              </div>

              {/* Hint Box */}
              {isHintOpen && (
                <div className="verb-hint-box animate-in">
                  <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Indice : </strong> {q.hint}
                  </div>
                </div>
              )}

              {/* Post-Submission Feedback */}
              {isCurrentSubmitted && (
                <div className={`verb-feedback-box ${isCorrect ? 'correct' : 'incorrect'} animate-in`}>
                  {isCorrect ? (
                    <CheckCircle2 size={20} style={{ flexShrink: 0, color: '#22c55e', marginTop: '2px' }} />
                  ) : (
                    <XCircle size={20} style={{ flexShrink: 0, color: '#ef4444', marginTop: '2px' }} />
                  )}

                  <div className="verb-ans-breakdown">
                    <div className="verb-ans-expected">
                      {isCorrect ? (
                        <span>Bravo ! Forme correcte : <strong>{q.expected}</strong></span>
                      ) : (
                        <span>Forme attendue : <strong>{q.expected}</strong></span>
                      )}
                    </div>
                    <div className="verb-ans-explanation">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Scorecard when Submitted */}
      {isCurrentSubmitted && (
        <div id="verb-scorecard-section" className="verb-scorecard">
          <div 
            className="verb-scorecard-stamp"
            style={{ color: verdict.color, borderColor: verdict.color }}
          >
            {verdict.stamp}
          </div>

          <h3 className="verb-scorecard-title">
            {verdict.title}
          </h3>

          <div className="verb-scorecard-score" style={{ color: verdict.color }}>
            {score} / {totalQuestions}
          </div>

          <p className="verb-scorecard-sub">
            {verdict.subtext}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {score < totalQuestions && (
              <button 
                className="verb-action-btn verb-btn-retry"
                onClick={handleRetryErrors}
              >
                <RotateCcw size={18} />
                <span>Corriger mes erreurs ({totalQuestions - score})</span>
              </button>
            )}

            <button 
              className="verb-action-btn verb-btn-reset"
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              <span>Recommencer l'activité</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Main Action Bar */}
      {!isCurrentSubmitted && (
        <div className="verb-actions-bar">
          <button 
            type="button" 
            className="verb-action-btn verb-btn-submit"
            onClick={handleSubmit}
          >
            <Send size={18} />
            <span>Vérifier mes réponses ({filledCount}/{totalQuestions})</span>
          </button>

          {filledCount > 0 && (
            <button 
              type="button" 
              className="verb-action-btn verb-btn-reset"
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              <span>Effacer tout</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
