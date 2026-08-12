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
const TEMPLE = 4; // Single Central Master Sanctuary Temple for Questions!
const PIER = 5;

// Build map with ONE single central Master Sanctuary Temple at cols 2-4, rows 2-3
const map = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,4,4,4,0,0,0,2,0,0,1,1,1,1,1,1,1,0,2], // Master Sanctuary Temple (3x2 tiles)
  [2,0,4,4,4,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,5,5,0,1,1,1,0,2],
  [2,2,2,0,0,0,3,0,0,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,1,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,2], // (Removed lower station)
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
    { "q": "Comment dit-on 'journalist' ?", "opts": ["le journal", "le journaliste", "le média"], "ans": 1 },
    { "q": "La liberté de la ___ est importante.", "opts": ["source", "presse", "vérité"], "ans": 1 },
    { "q": "Il faut vérifier la ___ d'une information.", "opts": ["source", "censure", "rédaction"], "ans": 0 },
    { "q": "Un article qui révèle un secret est un ___.", "opts": ["scoop", "titre", "kiosque"], "ans": 0 },
    { "q": "L'ensemble des journaux imprimés s'appelle la presse ___.", "opts": ["numérique", "écrite", "télévisée"], "ans": 1 },
    { "q": "Le titre d'un article en gros caractères est la ___.", "opts": ["une", "page", "lettre"], "ans": 0 },
    { "q": "Un journaliste qui travaille à son compte est un ___.", "opts": ["rédacteur", "pigiste", "éditeur"], "ans": 1 },
    { "q": "Une fausse information est souvent appelée une ___.", "opts": ["fake news (infox)", "dépêche", "chronique"], "ans": 0 },
    { "q": "L'abonnement à un journal permet de le ___.", "opts": ["recevoir", "vendre", "supprimer"], "ans": 0 },
    { "q": "Un bref résumé de l'actualité à la radio est un ___.", "opts": ["flash info", "roman", "poème"], "ans": 0 }
  ],
  "2": [
    { "q": "Elle ___ (aller) au lycée tous les jours.", "opts": ["vas", "va", "vont"], "ans": 1 },
    { "q": "Nous ___ (avoir) un cours de français.", "opts": ["avons", "avez", "ont"], "ans": 0 },
    { "q": "Ils ___ (être) très motivés.", "opts": ["sont", "sommes", "êtes"], "ans": 0 },
    { "q": "Je ___ (faire) mes devoirs à la bibliothèque.", "opts": ["fais", "fait", "faisons"], "ans": 0 },
    { "q": "Vous ___ (pouvoir) m'expliquer cette leçon ?", "opts": ["pouvez", "pouvons", "peuvent"], "ans": 0 }
  ],
  "3": [
    { "q": "Tu ___ (devoir) réviser les verbes.", "opts": ["dois", "doit", "devons"], "ans": 0 },
    { "q": "Elles ___ (prendre) le bus de huit heures.", "opts": ["prennent", "prends", "prenez"], "ans": 0 },
    { "q": "Nous ___ (vouloir) réussir notre projet.", "opts": ["voulons", "voulez", "veulent"], "ans": 0 },
    { "q": "Je ___ (savoir) la réponse à la question.", "opts": ["sais", "sait", "savent"], "ans": 0 },
    { "q": "Vous ___ (venir) à la réunion du club ?", "opts": ["venez", "venons", "viennent"], "ans": 0 }
  ],
  "4": [
    { "q": "J'ai vu cette vidéo, je l'ai ___ aimée.", "opts": ["beaucoup", "très", "trop"], "ans": 0 },
    { "q": "Combien de livres as-tu ? J'___ ai trois.", "opts": ["y", "les", "en"], "ans": 2 },
    { "q": "Je te conseille ___ lire cet article.", "opts": ["à", "de", "pour"], "ans": 1 },
    { "q": "Il ___ offre des fleurs. (à sa mère)", "opts": ["l'", "la", "lui"], "ans": 2 },
    { "q": "Vous ___ avez parlé hier. (à vos amis)", "opts": ["les", "leur", "y"], "ans": 1 }
  ]
};

export default function Fishtopia({ onBack }) {
  const canvasRef = useRef(null);
  
  const [coins, setCoins] = useState(0);
  const [bait, setBait] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [rodLevel, setRodLevel] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  const [interactionHint, setInteractionHint] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [caughtFish, setCaughtFish] = useState(null);
  
  const getPlayerLevel = () => {
    if (coins >= 400) return 4;
    if (coins >= 150) return 3;
    if (coins >= 50) return 2;
    return 1;
  };
  const playerLevel = getPlayerLevel();
  
  const [currentQ, setCurrentQ] = useState(null);
  const [qState, setQState] = useState(null);

  const playerRef = useRef({
    x: 6.5 * TILE,
    y: 4.5 * TILE,
    vx: 0,
    vy: 0,
    speed: 3,
    size: 24,
    color: '#f59e0b'
  });

  const keys = useRef({});
  const gameLoopRef = useRef(null);
  const stateRef = useRef({ activeModal, bait, rodLevel }); 
  const texturesRef = useRef({});

  useEffect(() => {
    stateRef.current = { activeModal, bait, rodLevel };
  }, [activeModal, bait, rodLevel]);

  useEffect(() => {
    const loadTex = (name, url) => {
      const img = new Image();
      img.src = url;
      texturesRef.current[name] = img;
    };
    loadTex('zelda_bg_level1', '/assets/francotopia_bg_level1.jpg');
    loadTex('zelda_bg_level2', '/assets/francotopia_bg_level2.jpg');
    loadTex('zelda_bg_level3', '/assets/francotopia_bg_level3.jpg');
    loadTex('zelda_bg_level4', '/assets/francotopia_bg_level4.jpg');
  }, []);

  useEffect(() => {
    playerRef.current.x = 6.5 * TILE;
    playerRef.current.y = 4.5 * TILE;

    const handleKeyDown = (e) => {
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      update(dt);
      draw(ctx, time);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, []);

  const getTile = (x, y) => {
    const col = Math.floor(x / TILE);
    const row = Math.floor(y / TILE);
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return 2;
    return map[row][col];
  };

  const checkCollision = (px, py, size) => {
    const colSize = size * 0.7; 
    const corners = [
      { x: px - colSize/2, y: py - colSize/2 },
      { x: px + colSize/2, y: py - colSize/2 },
      { x: px - colSize/2, y: py + colSize/2 },
      { x: px + colSize/2, y: py + colSize/2 }
    ];

    for (let c of corners) {
      const tile = getTile(c.x, c.y);
      if (tile === TREE || tile === WATER || tile === MARKET || tile === TEMPLE) {
        return true;
      }
    }
    return false;
  };

  const getInteractionTarget = () => {
    const p = playerRef.current;
    const checkDist = TILE * 1.5;
    const tilesToCheck = [
      getTile(p.x, p.y - checkDist),
      getTile(p.x, p.y + checkDist),
      getTile(p.x - checkDist, p.y),
      getTile(p.x + checkDist, p.y),
    ];
    
    if (tilesToCheck.includes(TEMPLE)) return 'station';
    if (tilesToCheck.includes(MARKET)) return 'market';
    if (tilesToCheck.includes(WATER) && getTile(p.x, p.y) === PIER) return 'fish';
    if (tilesToCheck.includes(WATER)) return 'fish';
    
    return null;
  };

  const update = (dt) => {
    if (stateRef.current.activeModal) return;

    const p = playerRef.current;
    let dx = 0;
    let dy = 0;

    if (keys.current['w'] || keys.current['z'] || keys.current['arrowup']) dy = -p.speed;
    if (keys.current['s'] || keys.current['arrowdown']) dy = p.speed;
    if (keys.current['a'] || keys.current['q'] || keys.current['arrowleft']) dx = -p.speed;
    if (keys.current['d'] || keys.current['arrowright']) dx = p.speed;

    if (dx !== 0 && dy !== 0) {
      const length = Math.sqrt(dx*dx + dy*dy);
      dx = (dx / length) * p.speed;
      dy = (dy / length) * p.speed;
    }

    p.vx = dx;
    p.vy = dy;

    if (!checkCollision(p.x + dx, p.y, p.size)) {
      p.x += dx;
    }
    if (!checkCollision(p.x, p.y + dy, p.size)) {
      p.y += dy;
    }

    const target = getInteractionTarget();
    if (target === 'station') setInteractionHint("ESPACE pour entrer dans le Sanctuaire des Questions !");
    else if (target === 'market') setInteractionHint("ESPACE pour ouvrir le Marché d'Hyrule");
    else if (target === 'fish') setInteractionHint("ESPACE pour pêcher dans le Lac (Coûte 1 Appât)");
    else setInteractionHint(null);
  };

  // --- DRAW FUNCTION (ZELDA THEME WITH BEAUTIFUL BACKGROUNDS) ---
  const draw = (ctx, time) => {
    const rLevel = stateRef.current.rodLevel;
    
    // Select Zelda Background image according to Beach Rod Level
    let bgKey = 'zelda_bg_level1';
    let zoneTitle = "📍 Région 1 : Lac de la Sagesse";

    if (rLevel === 2) {
      bgKey = 'zelda_bg_level2';
      zoneTitle = "📍 Région 2 : Côte d'Émeraude";
    } else if (rLevel === 3) {
      bgKey = 'zelda_bg_level3';
      zoneTitle = "📍 Région 3 : Dunes Dorées";
    } else if (rLevel === 4) {
      bgKey = 'zelda_bg_level4';
      zoneTitle = "📍 Région 4 : Lagon Tropical";
    }

    const bgImg = texturesRef.current[bgKey];
    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
      ctx.drawImage(bgImg, 0, 0, WIDTH, HEIGHT);
    } else {
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // --- OVERLAY ZELDA GAME OBJECTS ---
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = map[r][c];
        const x = c * TILE;
        const y = r * TILE;

        if (tile === TEMPLE) {
          // Draw ONLY at top-left corner of 3x2 Master Sanctuary Temple block to avoid overlap
          if (c === 2 && r === 2) {
            ctx.save();
            const tW = 3 * TILE; // 120px wide
            const tH = 2 * TILE; // 80px high
            
            // Temple Base Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.roundRect(x, y + 10, tW, tH, 12);
            ctx.fill();

            // Ancient Stone Wall
            ctx.fillStyle = '#64748b';
            ctx.beginPath();
            ctx.roundRect(x, y, tW, tH, 10);
            ctx.fill();

            // Golden Roof Trim
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(x + 4, y, tW - 8, 8);

            // Entrance Arch
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(x + tW/2, y + tH - 10, 18, Math.PI, 0);
            ctx.fillRect(x + tW/2 - 18, y + tH - 10, 36, 18);
            ctx.fill();

            // Glowing Altar Rune Light inside entrance
            const pulse = Math.sin(time / 200) * 0.3 + 0.7;
            ctx.fillStyle = `rgba(56, 189, 248, ${pulse})`;
            ctx.beginPath();
            ctx.arc(x + tW/2, y + tH - 10, 8, 0, Math.PI*2);
            ctx.fill();

            // Golden Triforce Crest emblem on forehead of Temple
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.moveTo(x + tW/2, y + 14);
            ctx.lineTo(x + tW/2 - 12, y + 32);
            ctx.lineTo(x + tW/2 + 12, y + 32);
            ctx.closePath();
            ctx.fill();

            // Pillar Accents
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(x + 8, y + 10, 8, tH - 15);
            ctx.fillRect(x + tW - 16, y + 10, 8, tH - 15);

            ctx.restore();
          }
        } else if (tile === MARKET) {
          // Merchant's Trading Post
          ctx.save();
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.fillRect(x, y + 10, TILE, TILE);
          
          ctx.fillStyle = '#b45309';
          ctx.fillRect(x, y + 10, TILE, 20);
          
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(x - 5, y - 5, TILE/2 + 5, 20);
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(x + TILE/2, y - 5, TILE/2 + 5, 20);
          
          ctx.fillStyle = 'white';
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🏪', x + TILE/2, y + 25);
          ctx.restore();
        }
      }
    }

    // --- DRAW HAMSTER (KEEP EXACT SAME CHARACTER) ---
    const p = playerRef.current;
    
    // Player Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + p.size/2 - 2, p.size/2 + 2, p.size/4, 0, 0, Math.PI*2);
    ctx.fill();

    const isMoving = p.vx !== 0 || p.vy !== 0;
    const bob = isMoving ? Math.sin(time / 60) * (p.size/12) : 0;
    
    ctx.save();
    ctx.translate(p.x, p.y + bob);
    const scale = p.size / 24;
    ctx.scale(scale, scale);

    // Fishing Rod (on back)
    ctx.save();
    let poleColor = '#78350f';
    if (rLevel === 2) poleColor = '#cbd5e1';
    else if (rLevel === 3) poleColor = '#fbbf24';
    else if (rLevel === 4) poleColor = '#38bdf8';
    
    const angle = p.vx !== 0 ? Math.PI/4 + Math.sin(time/100)*0.1 : Math.PI/4;
    ctx.rotate(angle);
    ctx.fillStyle = poleColor;
    ctx.fillRect(-2, -35, 4, 50);
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
    ctx.fillStyle = '#fbcfe8'; 
    ctx.beginPath();
    ctx.arc(-8, -10, 3, 0, Math.PI * 2);
    ctx.arc(8, -10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Body
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
    
    // Belly
    const bellyGrad = ctx.createRadialGradient(0, 2, 1, 0, 4, 8);
    bellyGrad.addColorStop(0, '#ffffff');
    bellyGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bellyGrad;
    ctx.beginPath();
    ctx.arc(0, 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    let eyeOffsetX = 0;
    if (p.vx > 0) eyeOffsetX = 2;
    if (p.vx < 0) eyeOffsetX = -2;

    // Eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-4 + eyeOffsetX, -2, 2.5, 0, Math.PI*2);
    ctx.arc(4 + eyeOffsetX, -2, 2.5, 0, Math.PI*2);
    ctx.fill();
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

    ctx.restore();
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
        alert("Vous n'avez plus d'appât ! Rendez-vous au Sanctuaire des Questions.");
      }
    }
  };

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
    if (qState !== null) return;
    if (idx === currentQ.ans) {
      setQState('correct');
      setBait(b => b + 3);
      setTimeout(() => setActiveModal(null), 1000);
    } else {
      setQState('wrong');
      setTimeout(() => setActiveModal(null), 1500);
    }
  };

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
        <h2 className="text-accent m-0 font-extrabold tracking-wider text-2xl uppercase" style={{ color: '#facc15', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          🗡️ Francotopia : La Légende d'Hyrule (Unité 1)
        </h2>
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
          <div className="hud-panel font-extrabold">
            <span className="text-emerald-600">Niv. Joueur : {playerLevel}</span> | Canne : {RODS[rodLevel - 1].name}
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
              <h2>🏛️ Sanctuaire des Questions</h2>
              <p className="text-lg mb-4 font-bold">{currentQ.q}</p>
              
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

              {qState === 'correct' && <p className="text-success font-bold mt-2">+3 Appâts de la Déesse !</p>}
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
              <h2>🏪 Le Marché d'Hyrule</h2>
              
              <div className="shop-items">
                <div className="shop-item bg-amber-50 border-amber-200">
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
              <h2 className="text-amber-500 text-3xl font-black">🏆 VICTOIRE D'HYRULE ! 🏆</h2>
              <p>Vous avez attrapé la créature légendaire d'Hyrule...</p>
              <div className="fish-icon" style={{ fontSize: '100px' }}>{caughtFish.icon}</div>
              <h3 className="text-4xl font-bold rarity-Legendary mb-4">{caughtFish.name}</h3>
              <p className="text-lg font-bold">Félicitations, vous êtes le Héros Légendaire de Francotopia !</p>
              <p className="text-sm italic mt-4 opacity-75">(Cliquez pour continuer à jouer)</p>
            </div>
          </div>
        )}

      </div>
      
      <div className="mt-4 text-center max-w-[800px] text-gray-600">
        <p><strong>Objectif :</strong> Explorez la carte d'Hyrule ! Rendez-vous au grand <strong>Sanctuaire des Questions 🏛️</strong> pour gagner des appâts en répondant aux quiz. Allez au ponton pour pêcher et revendez vos poissons au Marché 🏪 !</p>
      </div>
    </div>
  );
}
