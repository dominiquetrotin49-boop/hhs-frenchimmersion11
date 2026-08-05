import React, { useRef, useEffect, useState } from 'react';
import './Fishtopia.css';

// --- GAME CONSTANTS ---
const TILE = 40;
const COLS = 20;
const ROWS = 15;
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;

// Tile types
const GRASS = 0;
const WATER = 1;
const TREE = 2;
const MARKET = 3;
const STATION = 4;
const PIER = 5;

// Build map
const map = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,4,0,0,0,0,0,2,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,5,5,0,1,1,1,0,2],
  [2,2,2,0,0,0,3,0,0,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,4,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const FISH_TYPES = [
  { name: "Sardine", rarity: "Common", value: 2, icon: "🐟" },
  { name: "Petit Crabe", rarity: "Common", value: 4, icon: "🦀" },
  { name: "Poisson-Clown", rarity: "Rare", value: 15, icon: "🐠" },
  { name: "Poisson-Globe", rarity: "Rare", value: 20, icon: "🐡" },
  { name: "Requin Blanc", rarity: "Epic", value: 60, icon: "🦈" },
  { name: "Pieuvre Géante", rarity: "Epic", value: 80, icon: "🐙" },
  { name: "Kraken des Abysses", rarity: "Legendary", value: 250, icon: "🦑" },
  { name: "Léviathan Doré", rarity: "Legendary", value: 500, icon: "🐉" }
];

const RODS = [
  { id: 1, name: "Canne en Bois", cost: 0, rates: [0.90, 0.10, 0.0, 0.0] },
  { id: 2, name: "Canne en Fibre", cost: 50, rates: [0.50, 0.40, 0.10, 0.0] },
  { id: 3, name: "Canne en Or", cost: 200, rates: [0.10, 0.40, 0.40, 0.10] },
  { id: 4, name: "Canne en Diamant", cost: 500, rates: [0.0, 0.10, 0.50, 0.40] }
];

const QUESTIONS = {
  "1": [
    {
      "q": "Comment dit-on 'journalist' ?",
      "opts": [
        "le journal",
        "le journaliste",
        "le média"
      ],
      "ans": 1
    },
    {
      "q": "La liberté de la ___ est importante.",
      "opts": [
        "source",
        "presse",
        "vérité"
      ],
      "ans": 1
    },
    {
      "q": "Il faut vérifier la ___ d'une information.",
      "opts": [
        "source",
        "censure",
        "rédaction"
      ],
      "ans": 0
    },
    {
      "q": "Un article qui révèle un secret est un ___.",
      "opts": [
        "scoop",
        "titre",
        "kiosque"
      ],
      "ans": 0
    },
    {
      "q": "L'ensemble des journaux imprimés s'appelle la presse ___.",
      "opts": [
        "numérique",
        "écrite",
        "télévisée"
      ],
      "ans": 1
    },
    {
      "q": "Le titre d'un article en gros caractères est la ___.",
      "opts": [
        "une",
        "page",
        "lettre"
      ],
      "ans": 0
    },
    {
      "q": "Un journaliste qui travaille à son compte est un ___.",
      "opts": [
        "rédacteur",
        "pigiste",
        "éditeur"
      ],
      "ans": 1
    },
    {
      "q": "Une fausse information est souvent appelée une ___.",
      "opts": [
        "fake news (infox)",
        "dépêche",
        "chronique"
      ],
      "ans": 0
    },
    {
      "q": "L'abonnement à un journal permet de le ___.",
      "opts": [
        "recevoir",
        "vendre",
        "supprimer"
      ],
      "ans": 0
    },
    {
      "q": "Un bref résumé de l'actualité à la radio est un ___.",
      "opts": [
        "flash info",
        "roman",
        "poème"
      ],
      "ans": 0
    },
    {
      "q": "La personne qui dirige un journal est le rédacteur en ___.",
      "opts": [
        "chef",
        "directeur",
        "maître"
      ],
      "ans": 0
    },
    {
      "q": "Un article d'opinion s'appelle une ___.",
      "opts": [
        "chronique",
        "interview",
        "reportage"
      ],
      "ans": 0
    },
    {
      "q": "Pour lire le journal papier, on l'achète au ___.",
      "opts": [
        "kiosque",
        "cinéma",
        "restaurant"
      ],
      "ans": 0
    },
    {
      "q": "Une entrevue avec une célébrité est une ___.",
      "opts": [
        "interview",
        "dépêche",
        "annonce"
      ],
      "ans": 0
    },
    {
      "q": "Le lieu où les journalistes écrivent s'appelle la ___.",
      "opts": [
        "rédaction",
        "boulangerie",
        "gare"
      ],
      "ans": 0
    }
  ],
  "2": [
    {
      "q": "Je ___ (parler) à la radio.",
      "opts": [
        "parles",
        "parle",
        "parlons"
      ],
      "ans": 1
    },
    {
      "q": "Nous ___ (regarder) les informations.",
      "opts": [
        "regarde",
        "regardons",
        "regardez"
      ],
      "ans": 1
    },
    {
      "q": "Tu ___ (écouter) le podcast.",
      "opts": [
        "écoutes",
        "écoute",
        "écoutent"
      ],
      "ans": 0
    },
    {
      "q": "Ils ___ (publier) l'article en ligne.",
      "opts": [
        "publie",
        "publient",
        "publions"
      ],
      "ans": 1
    },
    {
      "q": "Vous ___ (travailler) pour quel journal ?",
      "opts": [
        "travaillez",
        "travaillent",
        "travailles"
      ],
      "ans": 0
    },
    {
      "q": "Elle ___ (chercher) ses clés.",
      "opts": [
        "cherches",
        "cherche",
        "cherchent"
      ],
      "ans": 1
    },
    {
      "q": "Nous ___ (aimer) lire la presse.",
      "opts": [
        "aimons",
        "aimez",
        "aiment"
      ],
      "ans": 0
    },
    {
      "q": "Tu ___ (trouver) le bon article ?",
      "opts": [
        "trouve",
        "trouves",
        "trouvez"
      ],
      "ans": 1
    },
    {
      "q": "Je ___ (jouer) aux jeux vidéo.",
      "opts": [
        "joue",
        "joues",
        "jouent"
      ],
      "ans": 0
    },
    {
      "q": "Elles ___ (danser) très bien.",
      "opts": [
        "danse",
        "dansent",
        "dansons"
      ],
      "ans": 1
    },
    {
      "q": "Vous ___ (manger) une pomme.",
      "opts": [
        "mangeons",
        "mangent",
        "mangez"
      ],
      "ans": 2
    },
    {
      "q": "Il ___ (donner) son opinion.",
      "opts": [
        "donnes",
        "donnent",
        "donne"
      ],
      "ans": 2
    },
    {
      "q": "Nous ___ (commencer) le devoir.",
      "opts": [
        "commencons",
        "commençons",
        "commencez"
      ],
      "ans": 1
    },
    {
      "q": "Tu ___ (préférer) quel journal ?",
      "opts": [
        "préfères",
        "préfère",
        "préférez"
      ],
      "ans": 0
    },
    {
      "q": "Je ___ (acheter) ce magazine.",
      "opts": [
        "achete",
        "achète",
        "achètes"
      ],
      "ans": 1
    }
  ],
  "3": [
    {
      "q": "Je ___ (vendre) mon ordinateur.",
      "opts": [
        "vends",
        "vend",
        "vendez"
      ],
      "ans": 0
    },
    {
      "q": "Tu ___ (finir) tes devoirs.",
      "opts": [
        "finis",
        "finit",
        "finissons"
      ],
      "ans": 0
    },
    {
      "q": "Nous ___ (attendre) le bus.",
      "opts": [
        "attendez",
        "attendons",
        "attendent"
      ],
      "ans": 1
    },
    {
      "q": "Ils ___ (choisir) le bon article.",
      "opts": [
        "choisit",
        "choisissent",
        "choisissez"
      ],
      "ans": 1
    },
    {
      "q": "Elle ___ (répondre) aux questions.",
      "opts": [
        "répond",
        "réponds",
        "répondent"
      ],
      "ans": 0
    },
    {
      "q": "Vous ___ (réussir) votre examen.",
      "opts": [
        "réussissez",
        "réussissons",
        "réussissent"
      ],
      "ans": 0
    },
    {
      "q": "Je ___ (perdre) souvent mes clés.",
      "opts": [
        "perds",
        "perd",
        "perdons"
      ],
      "ans": 0
    },
    {
      "q": "Ils ___ (entendre) un bruit.",
      "opts": [
        "entends",
        "entend",
        "entendent"
      ],
      "ans": 2
    },
    {
      "q": "Tu ___ (réfléchir) au problème.",
      "opts": [
        "réfléchis",
        "réfléchit",
        "réfléchissez"
      ],
      "ans": 0
    },
    {
      "q": "Nous ___ (descendre) l'escalier.",
      "opts": [
        "descendez",
        "descendons",
        "descendent"
      ],
      "ans": 1
    },
    {
      "q": "Elle ___ (grandir) vite.",
      "opts": [
        "grandis",
        "grandit",
        "grandissent"
      ],
      "ans": 1
    },
    {
      "q": "Vous ___ (rendre) le livre.",
      "opts": [
        "rendez",
        "rendons",
        "rendent"
      ],
      "ans": 0
    },
    {
      "q": "Je ___ (rougir) facilement.",
      "opts": [
        "rougis",
        "rougit",
        "rougissent"
      ],
      "ans": 0
    },
    {
      "q": "Ils ___ (défendre) cette idée.",
      "opts": [
        "défendent",
        "défend",
        "défendons"
      ],
      "ans": 0
    },
    {
      "q": "Tu ___ (agir) rapidement.",
      "opts": [
        "agit",
        "agis",
        "agissons"
      ],
      "ans": 1
    }
  ],
  "4": [
    {
      "q": "Je vais ___ donner à mon collègue. (le scoop)",
      "opts": [
        "le lui",
        "lui le",
        "le leur"
      ],
      "ans": 0
    },
    {
      "q": "Nous ___ lisons tous les matins. (les journaux)",
      "opts": [
        "leur",
        "les",
        "en"
      ],
      "ans": 1
    },
    {
      "q": "Ils viennent ___ (publier) un article choquant.",
      "opts": [
        "de publier",
        "publient",
        "publié"
      ],
      "ans": 0
    },
    {
      "q": "Tu ___ parles de ce podcast ? (à ta sœur)",
      "opts": [
        "la",
        "lui",
        "y"
      ],
      "ans": 1
    },
    {
      "q": "Je ne veux pas ___ entendre parler !",
      "opts": [
        "en",
        "y",
        "le"
      ],
      "ans": 0
    },
    {
      "q": "Il faut que je ___ montre. (les photos à Paul)",
      "opts": [
        "les lui",
        "lui les",
        "les leur"
      ],
      "ans": 0
    },
    {
      "q": "As-tu pensé ___ tes devoirs ?",
      "opts": [
        "à faire",
        "de faire",
        "faire"
      ],
      "ans": 0
    },
    {
      "q": "Elle refuse ___ parler aux journalistes.",
      "opts": [
        "à",
        "de",
        "pour"
      ],
      "ans": 1
    },
    {
      "q": "Nous ___ allons ce soir. (au cinéma)",
      "opts": [
        "en",
        "les",
        "y"
      ],
      "ans": 2
    },
    {
      "q": "Combien de livres as-tu ? J'___ ai trois.",
      "opts": [
        "y",
        "les",
        "en"
      ],
      "ans": 2
    },
    {
      "q": "Je te conseille ___ lire cet article.",
      "opts": [
        "à",
        "de",
        "pour"
      ],
      "ans": 1
    },
    {
      "q": "Il ___ offre des fleurs. (à sa mère)",
      "opts": [
        "l'",
        "la",
        "lui"
      ],
      "ans": 2
    },
    {
      "q": "Vous ___ avez parlé hier. (à vos amis)",
      "opts": [
        "les",
        "leur",
        "y"
      ],
      "ans": 1
    },
    {
      "q": "C'est difficile ___ comprendre ce texte.",
      "opts": [
        "à",
        "de",
        "pour"
      ],
      "ans": 1
    },
    {
      "q": "Je ___ donne le stylo. (à toi)",
      "opts": [
        "le te",
        "te le",
        "te la"
      ],
      "ans": 1
    }
  ]
};


export default function Fishtopia({ onBack }) {
  const canvasRef = useRef(null);
  
  // Game State
  const [coins, setCoins] = useState(0);
  const [bait, setBait] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [rodLevel, setRodLevel] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  const [interactionHint, setInteractionHint] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'shop', 'question', 'fish_result', 'victory'
  const [caughtFish, setCaughtFish] = useState(null);
  
  // Player Level Logic
  const getPlayerLevel = () => {
    if (coins >= 400) return 4;
    if (coins >= 150) return 3;
    if (coins >= 50) return 2;
    return 1;
  };
  const playerLevel = getPlayerLevel();
  
  // Question State
  const [currentQ, setCurrentQ] = useState(null);
  const [qState, setQState] = useState(null); // null, correct, wrong

  // Player Entity
  const playerRef = useRef({
    x: 3.5 * TILE,
    y: 3.5 * TILE,
    vx: 0,
    vy: 0,
    speed: 3,
    size: 48,
    color: '#f59e0b'
  });

  const keys = useRef({});
  const gameLoopRef = useRef(null);
  const stateRef = useRef({ activeModal, bait, rodLevel }); 

  useEffect(() => {
    stateRef.current = { activeModal, bait, rodLevel };
  }, [activeModal, bait, rodLevel]);

  // Input Handling & Init
  useEffect(() => {
    // Force reset position on mount (fixes hot-reload issues if stuck)
    playerRef.current.x = 3.5 * TILE;
    playerRef.current.y = 3.5 * TILE;

    const handleKeyDown = (e) => {
      // Empêcher le défilement de l'écran avec les flèches / espace
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (!stateRef.current.activeModal) e.preventDefault();
      }

      const key = e.key.toLowerCase();
      keys.current[key] = true;
      
      if (e.code === 'Space' && !stateRef.current.activeModal) {
        handleInteract();
      }
    };
    const handleKeyUp = (e) => keys.current[e.key.toLowerCase()] = false;

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- AUDIO LOGIC ---
  const audioElRef = useRef(null);

  useEffect(() => {
    const audio = new window.Audio('/music/amber_road.mp3');
    audio.loop = true;
    audioElRef.current = audio;
    
    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioElRef.current) return;
    
    if (musicPlaying) {
      audioElRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioElRef.current.play().catch(e => console.log("Audio play failed:", e));
      setMusicPlaying(true);
    }
  };

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let lastTime = performance.now();
    
    const textureData = [
      { name: 'lake_grass', src: '/env/lake_grass.jpg' },
      { name: 'lake_water', src: '/env/lake_water.jpg' },
      { name: 'bretagne_rock', src: '/env/bretagne_rock.jpg' },
      { name: 'bretagne_water', src: '/env/bretagne_water.jpg' },
      { name: 'capecod_sand', src: '/env/capecod_sand.jpg' },
      { name: 'capecod_water', src: '/env/capecod_water.jpg' },
      { name: 'tahiti_sand', src: '/env/tahiti_sand.jpg' }
    ];
    
    const patterns = {};
    textureData.forEach(tex => {
      const img = new Image();
      img.src = tex.src;
      img.onload = () => {
        const p = ctx.createPattern(img, 'repeat');
        let scale = 0.25;
        if (tex.name === 'bretagne_rock') {
          scale = 0.0625; // 75% smaller than 0.25
        }
        p.setTransform(new DOMMatrix().scale(scale, scale));
        patterns[tex.name] = p;
      };
    });

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      update(dt);
      draw(ctx, time, patterns);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, []);

  const getTile = (x, y) => {
    const col = Math.floor(x / TILE);
    const row = Math.floor(y / TILE);
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return 2; // Treat out of bounds as solid tree
    return map[row][col];
  };

  const checkCollision = (px, py, size) => {
    // Make the collision box slightly smaller than the visual size for forgiving movement
    const colSize = size * 0.7; 
    // Check 4 corners of player bounding box
    const corners = [
      { x: px - colSize/2, y: py - colSize/2 },
      { x: px + colSize/2, y: py - colSize/2 },
      { x: px - colSize/2, y: py + colSize/2 },
      { x: px + colSize/2, y: py + colSize/2 }
    ];

    for (let c of corners) {
      const tile = getTile(c.x, c.y);
      if (tile === TREE || tile === WATER || tile === MARKET || tile === STATION) {
        return true;
      }
    }
    return false;
  };

  const getInteractionTarget = () => {
    const p = playerRef.current;
    // Look a bit ahead in the direction of movement, or just around player
    const checkDist = TILE;
    const tilesToCheck = [
      getTile(p.x, p.y - checkDist), // up
      getTile(p.x, p.y + checkDist), // down
      getTile(p.x - checkDist, p.y), // left
      getTile(p.x + checkDist, p.y), // right
    ];
    
    if (tilesToCheck.includes(STATION)) return 'station';
    if (tilesToCheck.includes(MARKET)) return 'market';
    if (tilesToCheck.includes(WATER) && getTile(p.x, p.y) === PIER) return 'fish';
    if (tilesToCheck.includes(WATER)) return 'fish';
    
    return null;
  };

  const update = (dt) => {
    if (stateRef.current.activeModal) return; // Pause movement when modal is open

    const p = playerRef.current;
    let dx = 0;
    let dy = 0;

    if (keys.current['w'] || keys.current['z'] || keys.current['arrowup']) dy = -p.speed;
    if (keys.current['s'] || keys.current['arrowdown']) dy = p.speed;
    if (keys.current['a'] || keys.current['q'] || keys.current['arrowleft']) dx = -p.speed;
    if (keys.current['d'] || keys.current['arrowright']) dx = p.speed;

    // Normalize diagonal speed
    if (dx !== 0 && dy !== 0) {
      const length = Math.sqrt(dx*dx + dy*dy);
      dx = (dx / length) * p.speed;
      dy = (dy / length) * p.speed;
    }

    p.vx = dx;
    p.vy = dy;

    // Try X movement
    if (!checkCollision(p.x + dx, p.y, p.size)) {
      p.x += dx;
    }
    // Try Y movement
    if (!checkCollision(p.x, p.y + dy, p.size)) {
      p.y += dy;
    }

    // Update hint
    const target = getInteractionTarget();
    if (target === 'station') setInteractionHint("ESPACE pour répondre aux questions");
    else if (target === 'market') setInteractionHint("ESPACE pour ouvrir le Marché");
    else if (target === 'fish') setInteractionHint("ESPACE pour pêcher (Coûte 1 Appât)");
    else setInteractionHint(null);
  };

  const draw = (ctx, time, patterns) => {
    const rLevel = stateRef.current.rodLevel;
    let grassPattern, waterPattern, grassColor, waterColor, shoreColor;
    
    if (rLevel === 1) { // Lake
      grassPattern = patterns?.lake_grass;
      waterPattern = patterns?.lake_water;
      grassColor = '#4ade80';
      shoreColor = '#fef08a'; // Sand edge
      waterColor = '#0ea5e9';
    } else if (rLevel === 2) { // Bretagne
      grassPattern = patterns?.bretagne_rock;
      waterPattern = patterns?.bretagne_water;
      grassColor = '#64748b';
      shoreColor = '#475569'; // rocky shore
      waterColor = '#1e3a8a';
    } else if (rLevel === 3) { // Cape Cod
      grassPattern = patterns?.capecod_sand;
      waterPattern = patterns?.capecod_water;
      grassColor = '#fde047';
      shoreColor = '#fcd34d'; // deeper sand
      waterColor = '#2563eb';
    } else { // Tahiti
      grassPattern = patterns?.tahiti_sand;
      waterPattern = patterns?.capecod_water;
      grassColor = '#84cc16';
      shoreColor = '#fef08a'; // bright sand
      waterColor = '#06b6d4';
    }

    // 1. Base Grass & Texture
    ctx.fillStyle = grassPattern || grassColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    if (grassPattern && rLevel === 2) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // light tint to brighten rocks
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else if (!grassPattern) {
      // Fallback details
      ctx.fillStyle = '#22c55e';
      for (let i = 0; i < WIDTH; i += 40) {
        for (let j = 0; j < HEIGHT; j += 40) {
          if ((i/40 + j/40) % 3 === 0) {
            ctx.fillRect(i + 10, j + 10, 4, 8);
            ctx.fillRect(i + 25, j + 20, 4, 6);
          }
        }
      }
    }

    // 2. Shores (Blobby overlapping circles)
    ctx.fillStyle = shoreColor;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (map[r][c] === WATER) {
          const x = c * TILE;
          const y = r * TILE;
          ctx.beginPath();
          ctx.arc(x + TILE/2, y + TILE/2, TILE/2 + 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 3. Organic Water
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (map[r][c] === WATER) {
          const x = c * TILE;
          const y = r * TILE;
          ctx.beginPath();
          ctx.arc(x + TILE/2, y + TILE/2, TILE/2 + 9, 0, Math.PI * 2);
          ctx.fillStyle = waterPattern || waterColor;
          ctx.fill();
          if (waterPattern && rLevel === 4) {
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'; // bright cyan tint for tahiti
            ctx.fill();
          }
        }
      }
    }

    // 4. Water Waves & Objects
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = map[r][c];
        const x = c * TILE;
        const y = r * TILE;

        if (tile === WATER) {
          // Animated Water Waves
          const waveOffset = Math.sin(time / 500 + c + r) * 5;
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(x + 5 + waveOffset, y + 10, 15, 3);
          ctx.fillRect(x + 15 - waveOffset, y + 25, 20, 3);
        } else if (tile === TREE) {
          // Shadow
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          ctx.beginPath();
          ctx.ellipse(x + TILE/2, y + TILE - 5, TILE/2 - 2, 8, 0, 0, Math.PI*2);
          ctx.fill();
          
          // Trunk
          ctx.fillStyle = rLevel === 4 ? '#b45309' : '#78350f'; // lighter trunk in tahiti
          ctx.fillRect(x + TILE/2 - 6, y + TILE/2, 12, 20);
          
          let darkGreen, midGreen, highlightGreen;
          if (rLevel === 2) { // Bretagne (Pine colors)
            darkGreen = '#064e3b'; midGreen = '#022c22'; highlightGreen = '#047857';
          } else if (rLevel === 4) { // Tahiti (Palm colors)
            darkGreen = '#059669'; midGreen = '#10b981'; highlightGreen = '#34d399';
          } else { // Lake / Cape Cod (Oak colors)
            darkGreen = '#14532d'; midGreen = '#166534'; highlightGreen = '#15803d';
          }

          // Leaves (Layered for 3D effect)
          if (rLevel === 4) {
            // Draw Palm leaves
            ctx.fillStyle = darkGreen;
            ctx.save();
            ctx.translate(x + TILE/2, y + TILE/2 - 5);
            for(let i=0; i<5; i++) {
              ctx.rotate((Math.PI * 2) / 5);
              ctx.beginPath();
              ctx.ellipse(0, -12, 5, 16, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
            // Center of palm
            ctx.fillStyle = highlightGreen;
            ctx.beginPath();
            ctx.arc(x + TILE/2, y + TILE/2 - 5, 6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = darkGreen; // Dark base
            ctx.beginPath();
            ctx.arc(x + TILE/2, y + TILE/2 - 5, TILE/2 + 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = midGreen; // Mid green
            ctx.beginPath();
            ctx.arc(x + TILE/2, y + TILE/2 - 12, TILE/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = highlightGreen; // Highlight
            ctx.beginPath();
            ctx.arc(x + TILE/2 - 5, y + TILE/2 - 15, TILE/3, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (tile === PIER) {
          // Shadow on water
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(x, y + 5, TILE, TILE);
          // Planks
          ctx.fillStyle = '#854d0e';
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#422006';
          for (let p = 5; p < TILE; p += 10) {
            ctx.fillRect(x, y + p, TILE, 2); // Plank dividers
          }
          // Nails
          ctx.fillStyle = '#a8a29e';
          ctx.fillRect(x + 5, y + 2, 2, 2);
          ctx.fillRect(x + TILE - 7, y + 2, 2, 2);
        } else if (tile === MARKET) {
          // Shadow
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(x, y + 10, TILE, TILE);
          
          // Table
          ctx.fillStyle = '#b45309';
          ctx.fillRect(x, y + 10, TILE, 20);
          // Canopy
          ctx.fillStyle = '#ef4444'; // Red stripe
          ctx.fillRect(x - 5, y - 5, TILE/2 + 5, 20);
          ctx.fillStyle = '#f8fafc'; // White stripe
          ctx.fillRect(x + TILE/2, y - 5, TILE/2 + 5, 20);
          // Sign
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🐟', x + TILE/2, y + 25);
        } else if (tile === STATION) {
          // Shadow
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(x+5, y + 10, TILE-10, TILE-5);
          
          // Desk
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(x + 5, y + 15, TILE - 10, 20);
          // Monitor
          ctx.fillStyle = '#334155';
          ctx.fillRect(x + 10, y + 5, TILE - 20, 15);
          // Screen glow
          const glow = Math.abs(Math.sin(time / 300));
          ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + glow * 0.4})`; 
          ctx.fillRect(x + 12, y + 7, TILE - 24, 11);
        }
      }
    }

    // Draw Player (Hamster)
    const p = playerRef.current;
    
    // Player Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + p.size/2 - 2, p.size/2 + 2, p.size/4, 0, 0, Math.PI*2);
    ctx.fill();

    // Bobbing animation if moving
    const isMoving = p.vx !== 0 || p.vy !== 0;
    const bob = isMoving ? Math.sin(time / 60) * (p.size/12) : 0;
    
    ctx.save();
    ctx.translate(p.x, p.y + bob);
    // The original hardcoded drawing used size=24. We scale by (current size / 24)
    const scale = p.size / 24;
    ctx.scale(scale, scale);

    // Fishing Rod (on back)
    ctx.save();
    let poleColor = '#78350f'; // Wood
    if (rLevel === 2) poleColor = '#cbd5e1'; // Fiber
    else if (rLevel === 3) poleColor = '#fbbf24'; // Gold
    else if (rLevel === 4) poleColor = '#38bdf8'; // Diamond
    
    const angle = p.vx !== 0 ? Math.PI/4 + Math.sin(time/100)*0.1 : Math.PI/4;
    ctx.rotate(angle);
    ctx.fillStyle = poleColor;
    ctx.fillRect(-2, -35, 4, 50); // pole
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(0, 15);
    ctx.stroke();
    ctx.restore();

    // Feet
    const swing = isMoving ? Math.sin(time / 50) * 4 : 0;
    const breath = !isMoving ? Math.sin(time / 200) * 0.05 : 0;
    
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(-5, 10 + swing, 3.5, 0, Math.PI*2);
    ctx.arc(5, 10 - swing, 3.5, 0, Math.PI*2);
    ctx.fill();

    // Ears
    ctx.fillStyle = '#b45309'; 
    ctx.beginPath();
    ctx.arc(-8, -10, 6, 0, Math.PI * 2);
    ctx.arc(8, -10, 6, 0, Math.PI * 2);
    ctx.fill();
    // Inner ears
    ctx.fillStyle = '#fbcfe8'; 
    ctx.beginPath();
    ctx.arc(-8, -10, 3, 0, Math.PI * 2);
    ctx.arc(8, -10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (3D Sphere effect and breathing)
    ctx.save();
    ctx.scale(1, 1 + breath);
    
    const bodyGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 12);
    bodyGrad.addColorStop(0, '#fbbf24');
    bodyGrad.addColorStop(0.8, '#d97706');
    bodyGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Belly (3D Sphere effect)
    const bellyGrad = ctx.createRadialGradient(0, 2, 1, 0, 4, 8);
    bellyGrad.addColorStop(0, '#ffffff');
    bellyGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bellyGrad;
    ctx.beginPath();
    ctx.arc(0, 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Direction logic for eyes
    let eyeOffsetX = 0;
    if (p.vx > 0) eyeOffsetX = 2;
    if (p.vx < 0) eyeOffsetX = -2;

    // Eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-4 + eyeOffsetX, -2, 2.5, 0, Math.PI*2);
    ctx.arc(4 + eyeOffsetX, -2, 2.5, 0, Math.PI*2);
    ctx.fill();
    // Eye shine
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-4.5 + eyeOffsetX, -3, 1, 0, Math.PI*2);
    ctx.arc(3.5 + eyeOffsetX, -3, 1, 0, Math.PI*2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#f472b6'; 
    ctx.beginPath();
    ctx.arc(eyeOffsetX, 2, 2, 0, Math.PI*2);
    ctx.fill();

    ctx.restore(); // Restore main scale and translation
  };

  const handleInteract = () => {
    const target = getInteractionTarget();
    if (!target) return;

    if (target === 'station') {
      openQuestion();
    } else if (target === 'market') {
      setActiveModal('shop');
    } else if (target === 'fish') {
      if (stateRef.current.bait > 0) {
        fish();
      } else {
        alert("Vous n'avez plus d'appât ! Allez répondre à des questions.");
      }
    }
  };

  // --- FISHING LOGIC ---
  const fish = () => {
    setBait(b => b - 1);
    const rod = RODS[stateRef.current.rodLevel - 1];
    const rand = Math.random();
    
    let cumulative = 0;
    let caughtRarityIdx = 0;
    for (let i = 0; i < rod.rates.length; i++) {
      cumulative += rod.rates[i];
      if (rand <= cumulative) {
        caughtRarityIdx = i;
        break;
      }
    }
    
    const rarities = ["Common", "Rare", "Epic", "Legendary"];
    const rarity = rarities[caughtRarityIdx];
    
    let possibleFish = FISH_TYPES.filter(f => f.rarity === rarity);
    
    if (stateRef.current.rodLevel < 4) {
      possibleFish = possibleFish.filter(f => f.name !== "Léviathan Doré");
    }
    
    const caught = possibleFish[Math.floor(Math.random() * possibleFish.length)];
    
    setCaughtFish(caught);
    setInventory(inv => [...inv, caught]);
    
    if (caught.name === "Léviathan Doré") {
      setActiveModal('victory');
    } else {
      setActiveModal('fish_result');
    }
  };

  const unusedQuestionsRef = useRef({});

  // --- QUESTION LOGIC ---
  const openQuestion = () => {
    if (!unusedQuestionsRef.current[rodLevel] || unusedQuestionsRef.current[rodLevel].length === 0) {
      unusedQuestionsRef.current[rodLevel] = [...QUESTIONS[rodLevel]].sort(() => Math.random() - 0.5);
    }
    const q = unusedQuestionsRef.current[rodLevel].pop();
    setCurrentQ(q);
    setQState(null);
    setActiveModal('question');
  };

  const handleAnswer = (idx) => {
    if (qState !== null) return; // Prevent double click
    if (idx === currentQ.ans) {
      setQState('correct');
      setBait(b => b + 3);
      setTimeout(() => setActiveModal(null), 1000);
    } else {
      setQState('wrong');
      setTimeout(() => setActiveModal(null), 1500);
    }
  };

  // --- SHOP LOGIC ---
  const sellAll = () => {
    const totalValue = inventory.reduce((sum, fish) => sum + fish.value, 0);
    setCoins(c => c + totalValue);
    setInventory([]);
  };

  const buyRod = (level) => {
    const rod = RODS[level - 1];
    if (coins >= rod.cost && rodLevel < level) {
      setCoins(c => c - rod.cost);
      setRodLevel(level);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[800px] mb-4 items-center">
        <button className="back-btn m-0" onClick={onBack}>← Quitter Francotopia</button>
        <h2 className="text-accent m-0">Francotopia (Unité 1)</h2>
        <button 
          onClick={toggleMusic} 
          style={{ background: musicPlaying ? '#f59e0b' : '#94a3b8', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {musicPlaying ? '🎵 Musique: ON' : '🎵 Musique: OFF'}
        </button>
      </div>

      <div className="fishtopia-container">
        <canvas 
          ref={canvasRef} 
          width={WIDTH} 
          height={HEIGHT} 
          className="fishtopia-canvas"
        />

        <div className="fishtopia-hud">
          <div className="hud-panel">
            <div className="hud-item" title="Pièces d'or">💰 {coins}</div>
            <div className="hud-item" title="Appâts">🪱 {bait}</div>
            <div className="hud-item" title="Sac à dos">🎒 {inventory.length}</div>
          </div>
          <div className="hud-panel">
            <span className="text-blue-600">Joueur Niv. {playerLevel}</span> | Canne Niv. {rodLevel}
          </div>
        </div>

        {interactionHint && !activeModal && (
          <div className="interaction-hint">
            {interactionHint}
          </div>
        )}

        {/* MODALS */}
        {activeModal === 'question' && currentQ && (
          <div className="game-overlay">
            <div className="modal-content">
              <h2>Station de Quiz</h2>
              <p className="text-lg mb-4">{currentQ.q}</p>
              
              <div className="q-options">
                {currentQ.opts.map((opt, i) => {
                  let btnClass = "";
                  if (qState !== null) {
                    if (i === currentQ.ans) btnClass = "correct";
                    else btnClass = "wrong opacity-50";
                  }
                  return (
                    <button key={i} className={btnClass} onClick={() => handleAnswer(i)}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {qState === 'correct' && <p className="text-success font-bold mt-2">+3 Appâts !</p>}
              {qState === 'wrong' && <p className="text-danger font-bold mt-2">Incorrect !</p>}
            </div>
          </div>
        )}

        {activeModal === 'fish_result' && caughtFish && (
          <div className="game-overlay" onClick={() => setActiveModal(null)}>
            <div className="modal-content fish-alert cursor-pointer">
              <h2 className={`rarity-${caughtFish.rarity}`}>Poisson Attrapé !</h2>
              <div className="fish-icon">{caughtFish.icon}</div>
              <h3 className="text-2xl font-bold">{caughtFish.name}</h3>
              <p className="text-gray-500 mb-4">{caughtFish.rarity} - Valeur: {caughtFish.value} 💰</p>
              <p className="text-sm italic opacity-50">(Cliquez pour continuer)</p>
            </div>
          </div>
        )}

        {activeModal === 'shop' && (
          <div className="game-overlay">
            <div className="modal-content">
              <h2>Le Marché</h2>
              
              <div className="shop-items">
                <div className="shop-item bg-blue-50 border-blue-200">
                  <div>
                    <strong>Vendre Poissons</strong>
                    <p className="text-sm m-0">Vendre {inventory.length} poisson(s)</p>
                  </div>
                  <button onClick={sellAll} disabled={inventory.length === 0}>
                    Vendre Tout
                  </button>
                </div>

                {RODS.slice(1).map(rod => (
                  <div key={rod.id} className="shop-item">
                    <div>
                      <strong>{rod.name}</strong>
                      <p className="text-sm m-0">Coût : {rod.cost} 💰</p>
                    </div>
                    <button 
                      onClick={() => buyRod(rod.id)}
                      disabled={coins < rod.cost || rodLevel >= rod.id}
                      style={{ background: rodLevel >= rod.id ? '#10b981' : '' }}
                    >
                      {rodLevel >= rod.id ? 'Possédé' : 'Acheter'}
                    </button>
                  </div>
                ))}
              </div>

              <button className="close-btn" onClick={() => setActiveModal(null)}>Fermer</button>
            </div>
          </div>
        )}

        {activeModal === 'victory' && caughtFish && (
          <div className="game-overlay" onClick={() => setActiveModal(null)}>
            <div className="modal-content fish-alert cursor-pointer" style={{ border: '4px solid #f59e0b', boxShadow: '0 0 50px #f59e0b' }}>
              <h2 className="text-amber-500 text-3xl">VICTOIRE !</h2>
              <p>Vous avez attrapé le légendaire...</p>
              <div className="fish-icon" style={{ fontSize: '100px' }}>{caughtFish.icon}</div>
              <h3 className="text-4xl font-bold rarity-Legendary mb-4">{caughtFish.name}</h3>
              <p className="text-lg">Félicitations, vous êtes le Maître Pêcheur de Francotopia ! Vous avez atteint le niveau maximal et pêché la créature la plus rare de l'océan.</p>
              <p className="text-sm italic mt-4 opacity-75">(Cliquez pour continuer à jouer)</p>
            </div>
          </div>
        )}

      </div>
      
      <div className="mt-4 text-center max-w-[800px] text-gray-600">
        <p><strong>Objectif :</strong> Vendez vos poissons au marché (🏪) pour accumuler de l'Or (💰). À 50, 150 et 400 pièces d'Or, vous monterez de <strong>Niveau</strong> ! Un niveau supérieur débloque des questions plus difficiles. Achetez la Canne en Diamant et essayez de pêcher le légendaire Léviathan Doré (🐉) !</p>
        <p className="mt-2 text-sm">Utilisez W,A,S,D ou Z,Q,S,D pour vous déplacer. Allez aux stations (❓) pour gagner des appâts en répondant à des questions. Allez au ponton (🌊) pour pêcher avec Espace.</p>
      </div>
    </div>
  );
}
