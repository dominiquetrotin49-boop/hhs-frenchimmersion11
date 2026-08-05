import React, { useRef, useEffect, useState } from 'react';
import './DontLookDown.css';
import { UNIT_2_VOCAB } from '../../data/vocabulary';

// --- GAME CONSTANTS ---
const GRAVITY = 1500;
const JUMP_FORCE = -750;
const MOVE_SPEED = 200; // Slowed down
const WIDTH = 800;
const HEIGHT = 600;
const TOTAL_HEIGHT = 6000;

// Levels (Zones):
// Z1: 6000 to 4500 (Rue de Paris)
// Z2: 4500 to 3000 (Toits en zinc)
// Z3: 3000 to 1500 (Tour Eiffel)
// Z4: 1500 to 0 (Nuages)

const GRAMMAR_QUESTIONS = [
  { q: "Je ___ (aller) au cinéma.", opts: ["vais", "vas", "va"], ans: 0 },
  { q: "Tu ___ (avoir) un stylo ?", opts: ["a", "as", "ai"], ans: 1 },
  { q: "Il ___ (être) très intelligent.", opts: ["est", "es", "suis"], ans: 0 },
  { q: "Nous ___ (faire) du sport.", opts: ["faisons", "faites", "font"], ans: 0 },
  { q: "Vous ___ (pouvoir) m'aider ?", opts: ["pouvez", "pouvons", "peuvent"], ans: 0 },
  { q: "Ils ___ (vouloir) un croissant.", opts: ["voulons", "voulez", "veulent"], ans: 2 },
  { q: "Je ___ (devoir) partir maintenant.", opts: ["dois", "doit", "devons"], ans: 0 },
  { q: "Elle ___ (savoir) la réponse.", opts: ["sais", "sait", "savent"], ans: 1 },
  { q: "Nous ___ (voir) la Tour Eiffel.", opts: ["voyons", "voyez", "voient"], ans: 0 },
  { q: "Tu ___ (prendre) le métro ?", opts: ["prends", "prend", "prenons"], ans: 0 },
  { q: "Vous ___ (mettre) un manteau.", opts: ["mettons", "mettez", "mettent"], ans: 1 },
  { q: "Ils ___ (lire) un livre.", opts: ["lit", "lisons", "lisent"], ans: 2 },
  { q: "Je ___ (dire) la vérité.", opts: ["dis", "dit", "disons"], ans: 0 },
  { q: "Tu ___ (écrire) une lettre.", opts: ["écris", "écrit", "écrivent"], ans: 0 },
  { q: "Elle ___ (venir) de Paris.", opts: ["viens", "vient", "venons"], ans: 1 },
  { q: "Nous ___ (tenir) la corde.", opts: ["tenons", "tenez", "tiennent"], ans: 0 },
  { q: "Vous ___ (connaître) ce film ?", opts: ["connaissez", "connais", "connaissent"], ans: 0 }
];

const VOCAB_QUESTIONS = UNIT_2_VOCAB.slice(0, 17).map(v => {
  const opts = [v.word, ...v.wrongOptions].sort(() => Math.random() - 0.5);
  return {
    q: `Vocabulaire: "${v.definition}"`,
    opts: opts,
    ans: opts.indexOf(v.word)
  };
});

const QUESTIONS = [...GRAMMAR_QUESTIONS, ...VOCAB_QUESTIONS];

const generatePlatforms = () => {
  const platforms = [];
  // Sol (Ground)
  platforms.push({ id: 'ground', x: 0, y: TOTAL_HEIGHT, w: WIDTH, h: 40, type: 'castle' });
  
  const addCheckpoint = (level, yPos, isStart = false) => {
    if (!isStart) {
      platforms.push({ id: `chk_${level}_floor`, x: WIDTH/2 - 150, y: yPos, w: 300, h: 40, type: 'castle' });
    }
    // Barrier spans entire width 150px above floor to block further progress
    platforms.push({ id: `chk_${level}_barrier`, x: 0, y: yPos - 150, w: WIDTH, h: 20, type: 'barrier', level: level });
    // Sensor in the middle of the floor
    platforms.push({ id: `chk_${level}_sensor`, x: WIDTH/2 - 60, y: yPos - 80, w: 120, h: 80, type: 'sensor', level: level });
  };

  // Level 0 Gate (Start of game)
  addCheckpoint(0, TOTAL_HEIGHT, true);

  let currentY = TOTAL_HEIGHT - 220;
  let idCounter = 1;
  let hasGate4500 = false;
  let hasGate3000 = false;
  let hasGate1500 = false;
  let hasVictory = false;

  while (currentY > 100) {
    if (!hasGate4500 && currentY <= 4650) {
       platforms.push({ id: `plat_${idCounter++}`, x: 80, y: 4620, w: 140, h: 30, type: 'castle' });
       addCheckpoint(1, 4500);
       hasGate4500 = true;
       currentY = 4300;
       continue;
    }
    if (!hasGate3000 && currentY <= 3150) {
       platforms.push({ id: `plat_${idCounter++}`, x: 80, y: 3120, w: 140, h: 30, type: 'anvil' });
       addCheckpoint(2, 3000);
       hasGate3000 = true;
       currentY = 2800;
       continue;
    }
    if (!hasGate1500 && currentY <= 1650) {
       platforms.push({ id: `plat_${idCounter++}`, x: 80, y: 1620, w: 140, h: 30, type: 'towel' });
       addCheckpoint(3, 1500);
       hasGate1500 = true;
       currentY = 1300;
       continue;
    }
    if (!hasVictory && currentY <= 250) {
       platforms.push({ id: `plat_${idCounter++}`, x: 80, y: 220, w: 140, h: 30, type: 'book' });
       platforms.push({ id: 'victory_pad', x: WIDTH/2 - 200, y: 100, w: 400, h: 40, type: 'victory' });
       hasVictory = true;
       break;
    }

    // --- Staircase Path Generation (Matching user's zig-zag drawing) ---
    const w = 130 + Math.random() * 20; // Slightly more uniform width
    
    // Triangle wave with period 750px. 
    // Checkpoints are every 1500px, so 1500 % 750 === 0.
    // This perfectly synchronizes the staircase to hit the exact edge at every checkpoint!
    const cycle = (currentY % 750) / 750; // 0.0 to 1.0
    let t = cycle * 2; // 0.0 to 2.0
    if (t > 1) t = 2 - t; // Triangle wave: 0.0 -> 1.0 -> 0.0
    
    // t=0 (at checkpoints) -> X=150 (Left edge)
    // t=1 (halfway) -> X=650 (Right edge)
    let pathCenter = 150 + t * 500; 
    
    let x = pathCenter - w/2; 
    
    // Clamp to screen bounds just in case
    if (x < 10) x = 10;
    if (x + w > WIDTH - 10) x = WIDTH - w - 10;
    
    let type = 'castle';
    if (currentY <= 4500 && currentY > 3000) {
       const medievalTypes = ['table', 'banner', 'platter', 'anvil'];
       type = medievalTypes[Math.floor(Math.random() * medievalTypes.length)];
    } else if (currentY <= 3000 && currentY > 1500) {
       const beachTypes = ['towel', 'longchair', 'umbrella', 'sandcastle'];
       type = beachTypes[Math.floor(Math.random() * beachTypes.length)];
    } else if (currentY <= 1500) {
       const classTypes = ['desk', 'blackboard', 'book', 'ruler'];
       type = classTypes[Math.floor(Math.random() * classTypes.length)];
    }
    
    platforms.push({ id: `plat_${idCounter++}`, x, y: currentY, w, h: 30, type });
    currentY -= (90 + Math.random() * 30); // Consistent gap around 90-120
  }
  return platforms;
};

export default function DontLookDown({ onBack }) {
  const canvasRef = useRef(null);
  
  // Game State
  const [activeModal, setActiveModal] = useState(null); // 'question', 'victory'
  const [currentQ, setCurrentQ] = useState(null);
  const [qState, setQState] = useState(null);
  const [questionsToPass, setQuestionsToPass] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [interactionHint, setInteractionHint] = useState(null);
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  // Refs for Game Engine
  const platformsRef = useRef(generatePlatforms());
  const gatesClearedRef = useRef({ 0: false, 1: false, 2: false, 3: false });
  const gameLoopRef = useRef(null);
  const keys = useRef({});
  const audioElRef = useRef(null);
  const unusedQuestionsRef = useRef([...Array(QUESTIONS.length).keys()]);
  const texturesRef = useRef({});

  useEffect(() => {
    const loadTex = (name, url) => {
      const img = new Image();
      img.src = url;
      texturesRef.current[name] = img;
    };
    loadTex('stone', '/assets/stone_texture_1785755214327.jpg');
    loadTex('wood', '/assets/wood_texture_1785755241167.jpg');
    loadTex('metal', '/assets/metal_texture_1785755250281.jpg');
    loadTex('fabric', '/assets/fabric_texture_1785755259803.jpg');
    loadTex('leather', '/assets/leather_texture_1785755269784.jpg');
    loadTex('chalkboard', '/assets/chalkboard_texture_1785755279285.jpg');
  }, []);


  const playerRef = useRef({
    x: WIDTH / 2,
    y: TOTAL_HEIGHT - 30,
    vx: 0,
    vy: 0,
    size: 30,
    facingRight: true,
    isGrounded: false,
    jumpsRemaining: 2
  });

  const cameraRef = useRef({ y: TOTAL_HEIGHT - HEIGHT });

  // Use refs to avoid stale state in closures
  const stateRef = useRef({ activeModal, currentInteraction });

  useEffect(() => {
    stateRef.current = { activeModal, currentInteraction };
  }, [activeModal, currentInteraction]);

  // Init Engine
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isModalActive = stateRef.current.activeModal;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (!isModalActive) e.preventDefault();
      }
      
      const key = e.key.toLowerCase();
      
      // Jump Logic & Interaction
      if (!isModalActive && !keys.current[key]) {
        if (key === 'w' || key === 'z' || key === 'arrowup' || key === ' ') {
          
          // Check for Interaction first
          if (key === ' ' && stateRef.current.currentInteraction) {
            triggerGate(stateRef.current.currentInteraction.level);
            keys.current[key] = true;
            return;
          }

          const p = playerRef.current;
          if (p.isGrounded) {
            p.vy = JUMP_FORCE;
            p.isGrounded = false;
            p.jumpsRemaining = 1;
          } else if (p.jumpsRemaining > 0) {
            p.vy = JUMP_FORCE * 0.9;
            p.jumpsRemaining = 0;
          }
        }
      }
      
      keys.current[key] = true;
    };
    const handleKeyUp = (e) => keys.current[e.key.toLowerCase()] = false;

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(gameLoopRef.current);
    // Removed obsolete audio cleanup
    };
  }, []);

  useEffect(() => {
    const audio = new window.Audio('/music/golden_waystone.mp3');
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

  // Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05); // cap dt
      lastTime = time;

      update(dt);
      draw(ctx, time);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
  }, []);

  const triggerGate = (level) => {
    if (gatesClearedRef.current[level]) return;
    
    // Stop player
    playerRef.current.vx = 0;
    playerRef.current.vy = 0;
    
    setQuestionsToPass(5); // Now requires 5 questions
    setCorrectAnswers(0);
    askQuestion();
  };

  const askQuestion = () => {
    if (unusedQuestionsRef.current.length === 0) {
       // Reset if exhausted
       unusedQuestionsRef.current = [...Array(QUESTIONS.length).keys()];
    }
    
    // Pick random unused index
    const randIdx = Math.floor(Math.random() * unusedQuestionsRef.current.length);
    const qIdx = unusedQuestionsRef.current[randIdx];
    
    // Remove it from unused
    unusedQuestionsRef.current.splice(randIdx, 1);
    
    const q = QUESTIONS[qIdx];
    setCurrentQ(q);
    setQState(null);
    setActiveModal('question');
  };

  const handleAnswer = (idx) => {
    if (qState !== null) return;
    
    if (idx === currentQ.ans) {
      setQState('correct');
      setCorrectAnswers(c => {
        const newC = c + 1;
        setTimeout(() => {
          if (newC >= 5) { // 5 correct needed to pass gate
            setActiveModal(null);
            // Unlock all gates that match the active level interaction
            if (stateRef.current.currentInteraction) {
               gatesClearedRef.current[stateRef.current.currentInteraction.level] = true;
            }
          } else {
            askQuestion(); // Next question
          }
        }, 1000);
        return newC;
      });
    } else {
      setQState('wrong');
      setTimeout(() => {
        askQuestion();
      }, 1500);
    }
  };

  const update = (dt) => {
    if (stateRef.current.activeModal) return;

    const p = playerRef.current;
    
    // Horizontal Movement
    if (keys.current['a'] || keys.current['q'] || keys.current['arrowleft']) {
      p.vx = -MOVE_SPEED;
      p.facingRight = false;
    } else if (keys.current['d'] || keys.current['arrowright']) {
      p.vx = MOVE_SPEED;
      p.facingRight = true;
    } else {
      // Friction
      p.vx *= 0.8; 
      if (Math.abs(p.vx) < 10) p.vx = 0;
    }

    // Gravity with Terminal Velocity to prevent tunneling through thin platforms
    p.vy += GRAVITY * dt;
    if (p.vy > 550) p.vy = 550;

    // Apply Physics & 4-way solid collision
    p.isGrounded = false;
    let newX = p.x + p.vx * dt;
    let newY = p.y + p.vy * dt;

    // Screen Wrap X
    if (newX < -p.size) newX = WIDTH;
    else if (newX > WIDTH) newX = -p.size;

    // Floor fallback
    if (newY > TOTAL_HEIGHT - p.size/2) {
      newY = TOTAL_HEIGHT - p.size/2;
      p.vy = 0;
      p.isGrounded = true;
      p.jumpsRemaining = 2;
    }

    let activeSensor = null;

    // AABB 4-way resolution
    for (let plat of platformsRef.current) {
      // Ignore cleared barriers
      if (plat.type === 'barrier' && gatesClearedRef.current[plat.level]) continue;

      const phx = p.size / 2;
      const phy = p.size / 2;
      const plhx = plat.w / 2;
      const plhy = plat.h / 2;

      const pcx = newX;
      const pcy = newY;
      const plcx = plat.x + plhx;
      const plcy = plat.y + plhy;

      const dx = pcx - plcx;
      const dy = pcy - plcy;

      const intersectX = Math.abs(dx) - (phx + plhx);
      const intersectY = Math.abs(dy) - (phy + plhy);

      if (intersectX < 0 && intersectY < 0) {
        
        // Sensor overlapping
        if (plat.type === 'sensor') {
          if (!gatesClearedRef.current[plat.level]) {
             activeSensor = plat;
          }
          continue;
        }

        // Victory overlapping
        if (plat.type === 'victory') {
           if (!stateRef.current.activeModal) {
              setActiveModal('victory');
           }
        }

        // Ignore cleared barriers
        if (plat.type === 'barrier' && gatesClearedRef.current[plat.level]) {
          continue;
        }

        // Solid Resolution (Castle platforms and Active Barriers)
        if (intersectX > intersectY) {
          if (dx > 0) { newX -= intersectX; p.vx = 0; }
          else { newX += intersectX; p.vx = 0; }
        } else {
          if (dy > 0) { newY -= intersectY; p.vy = 0; }
          else { 
            newY += intersectY; 
            p.vy = 0; 
            p.isGrounded = true; 
            p.jumpsRemaining = 2; 
          }
        }
      }
    }

    // --- Fall-Catch Mechanism ---
    let catchY = TOTAL_HEIGHT;
    if (gatesClearedRef.current[3]) catchY = 1500;
    else if (gatesClearedRef.current[2]) catchY = 3000;
    else if (gatesClearedRef.current[1]) catchY = 4500;
    
    if (newY > catchY + 100) {
       newY = catchY - 50;
       newX = WIDTH / 2;
       p.vy = 0;
    }

    p.x = newX;
    p.y = newY;

    // Update hints for sensors
    if (activeSensor) {
      setInteractionHint("Appuyez sur ESPACE pour ouvrir la Porte !");
      setCurrentInteraction(activeSensor);
    } else {
      setInteractionHint(null);
      setCurrentInteraction(null);
    }

    // Camera Tracking (Smooth follow)
    const camTarget = p.y - HEIGHT * 0.6; // Keep player in lower half
    if (camTarget < cameraRef.current.y) {
       // Scroll up immediately if player goes high
       cameraRef.current.y = camTarget;
    } else {
       // Slowly pan down if player falls (so they can see where they fall)
       cameraRef.current.y += (camTarget - cameraRef.current.y) * 0.1;
    }
    
    // Clamp Camera
    if (cameraRef.current.y > TOTAL_HEIGHT - HEIGHT) cameraRef.current.y = TOTAL_HEIGHT - HEIGHT;
    if (cameraRef.current.y < 0) cameraRef.current.y = 0;
  };

  const draw = (ctx, time) => {
    const getPattern = (ctx, name) => {
      const img = texturesRef.current[name];
      if (img && img.complete && img.naturalWidth > 0) {
        if (!img.pattern) img.pattern = ctx.createPattern(img, 'repeat');
        return img.pattern;
      }
      return null;
    };
    // Clear
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    const camY = cameraRef.current.y;
    // Global Shadow Setup
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 8;

    ctx.save();
    ctx.translate(0, -cameraRef.current.y);

    // Helper function for wood texture
    const drawWood = (x, y, w, h, baseColor, darkColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = darkColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i = 2; i < h; i += 4) {
         ctx.moveTo(x, y + i);
         ctx.lineTo(x + w, y + i + Math.sin(x*0.1)*2);
      }
      ctx.stroke();
    };

    for (let plat of platformsRef.current) {
      if (plat.y + plat.h < cameraRef.current.y || plat.y > cameraRef.current.y + HEIGHT + 200) continue; // Culling
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 8;
      
      if (plat.type === 'castle') {
        // Skeuomorphic Castle Stones
        ctx.fillStyle = getPattern(ctx, 'stone') || '#64748b';
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        
        // Horizontal mortar line
        ctx.beginPath();
        ctx.moveTo(plat.x, plat.y + plat.h/2);
        ctx.lineTo(plat.x + plat.w, plat.y + plat.h/2);
        ctx.stroke();
        
        // Vertical mortar lines
        for(let i=20; i<plat.w; i+=40) {
          // Top row
          ctx.beginPath();
          ctx.moveTo(plat.x + i, plat.y);
          ctx.lineTo(plat.x + i, plat.y + plat.h/2);
          ctx.stroke();
          // Bottom row (staggered)
          if (plat.x + i + 20 < plat.x + plat.w) {
            ctx.beginPath();
            ctx.moveTo(plat.x + i + 20, plat.y + plat.h/2);
            ctx.lineTo(plat.x + i + 20, plat.y + plat.h);
            ctx.stroke();
          }
        }
      } else if (plat.type === 'table') {
        // Medieval Wooden Table
        ctx.fillStyle = getPattern(ctx, 'wood') || '#78350f';
        ctx.fillRect(plat.x, plat.y, plat.w, 12); // Tabletop
        // Legs
        ctx.fillRect(plat.x + 10, plat.y + 12, 10, plat.h - 12);
        ctx.fillRect(plat.x + plat.w - 20, plat.y + 12, 10, plat.h - 12);
        // Tablecloth
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(plat.x + 20, plat.y, plat.w - 40, 16);
      } else if (plat.type === 'banner') {
        // Suspended Medieval Banner
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(plat.x, plat.y + 5);
        ctx.lineTo(plat.x + plat.w, plat.y + 5); // Rope/Rod
        ctx.stroke();
        
        ctx.fillStyle = '#b91c1c'; // Royal red
        ctx.beginPath();
        ctx.moveTo(plat.x + 10, plat.y + 5);
        ctx.lineTo(plat.x + plat.w - 10, plat.y + 5);
        ctx.lineTo(plat.x + plat.w - 10, plat.y + plat.h + 10);
        ctx.lineTo(plat.x + plat.w/2, plat.y + plat.h - 5); // Cutout
        ctx.lineTo(plat.x + 10, plat.y + plat.h + 10);
        ctx.fill();
        // Golden Fleur-de-lis (simplified)
        ctx.fillStyle = getPattern(ctx, 'wood') || '#fde047';
        ctx.beginPath();
        ctx.arc(plat.x + plat.w/2, plat.y + 20, 6, 0, Math.PI*2);
        ctx.fill();
      } else if (plat.type === 'platter') {
        // Giant Silver Platter
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.ellipse(plat.x + plat.w/2, plat.y + 15, plat.w/2, 15, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.ellipse(plat.x + plat.w/2, plat.y + 12, plat.w/2 - 10, 10, 0, 0, Math.PI*2);
        ctx.fill();
        // A cheese wheel on it
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(plat.x + plat.w/2 - 20, plat.y + 8, 12, 0, Math.PI*2);
        ctx.fill();
      } else if (plat.type === 'anvil') {
        // Metallic Anvil
        let grad = ctx.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.h);
        grad.addColorStop(0, '#94a3b8');
        grad.addColorStop(0.5, '#475569');
        grad.addColorStop(1, '#1e293b');
        ctx.fillStyle = grad;
        
        ctx.fillRect(plat.x + 20, plat.y, plat.w - 40, 10); // Top
        ctx.beginPath();
        ctx.moveTo(plat.x + 30, plat.y + 10);
        ctx.lineTo(plat.x + plat.w - 30, plat.y + 10);
        ctx.lineTo(plat.x + plat.w - 10, plat.y + plat.h);
        ctx.lineTo(plat.x + 10, plat.y + plat.h); // Base
        ctx.fill();
        // Horn
        ctx.beginPath();
        ctx.moveTo(plat.x + 20, plat.y);
        ctx.lineTo(plat.x - 10, plat.y + 5);
        ctx.lineTo(plat.x + 20, plat.y + 10);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(plat.x + 20, plat.y, plat.w - 40, 2);
      } else if (plat.type === 'towel') {
        // Beach Towel
        ctx.fillStyle = '#38bdf8'; // Blue
        ctx.fillRect(plat.x, plat.y, plat.w, 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc'; // White stripes
        for(let i=10; i<plat.w; i+=20) {
          ctx.fillRect(plat.x + i, plat.y, 10, 10);
        }
        // Fringes
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(plat.x - 5, plat.y, 5, 10);
        ctx.fillRect(plat.x + plat.w, plat.y, 5, 10);
      } else if (plat.type === 'longchair') {
        // Transat (Deckchair)
        ctx.fillStyle = getPattern(ctx, 'wood') || '#b45309';
        ctx.fillRect(plat.x, plat.y + 10, plat.w, 5); // base
        ctx.beginPath();
        ctx.moveTo(plat.x + 10, plat.y + 15);
        ctx.lineTo(plat.x + 30, plat.y - 15); // backrest support
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#b45309';
        ctx.stroke();
        // Fabric
        ctx.fillStyle = '#ef4444'; // Red fabric
        ctx.beginPath();
        ctx.moveTo(plat.x + plat.w - 10, plat.y + 10);
        ctx.lineTo(plat.x + 25, plat.y + 10);
        ctx.lineTo(plat.x + 35, plat.y - 15);
        ctx.fill();
      } else if (plat.type === 'umbrella') {
        // Beach Umbrella
        // Sand base
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.ellipse(plat.x + plat.w/2, plat.y + 10, plat.w/2, 10, 0, 0, Math.PI*2);
        ctx.fill();
        // Pole
        ctx.fillStyle = '#d4d4d8';
        ctx.fillRect(plat.x + plat.w/2 - 2, plat.y - 30, 4, 40);
        // Canopy
        ctx.fillStyle = '#22c55e'; // Green/white
        ctx.beginPath();
        ctx.arc(plat.x + plat.w/2, plat.y - 30, plat.w/2 + 10, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(plat.x + plat.w/2, plat.y - 30 - (plat.w/2 + 10));
        ctx.lineTo(plat.x + plat.w/2 + 10, plat.y - 30);
        ctx.lineTo(plat.x + plat.w/2 - 10, plat.y - 30);
        ctx.fill();
      } else if (plat.type === 'sandcastle') {
        // Sandcastle
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(plat.x, plat.y + 10, plat.w, 10); // Base
        ctx.fillRect(plat.x + 10, plat.y - 10, 20, 20); // Left tower
        ctx.fillRect(plat.x + plat.w - 30, plat.y - 10, 20, 20); // Right tower
        ctx.fillRect(plat.x + 30, plat.y - 5, plat.w - 60, 15); // Middle
        ctx.shadowBlur = 0;
        // Crenellations
        ctx.fillStyle = getPattern(ctx, 'wood') || '#fde047';
        for(let i=10; i<plat.w-10; i+=15) {
          ctx.fillRect(plat.x + i, plat.y - 15, 8, 10);
        }
      } else if (plat.type === 'desk') {
        // Classroom Desk
        drawWood(plat.x, plat.y, plat.w, 10, '#d97706', '#92400e'); // Wood top
        
        // Metal legs
        let metalGrad = ctx.createLinearGradient(0, plat.x, 0, plat.x+20);
        metalGrad.addColorStop(0, '#cbd5e1');
        metalGrad.addColorStop(1, '#475569');
        ctx.fillStyle = metalGrad;
        ctx.fillRect(plat.x + 10, plat.y + 10, 8, 20);
        ctx.fillRect(plat.x + plat.w - 18, plat.y + 10, 8, 20);
        
        // Notebook on top
        ctx.shadowBlur = 4; // localized shadow for notebook
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(plat.x + plat.w/2 - 15, plat.y - 6, 30, 6);
        ctx.shadowBlur = 12; // reset
        ctx.fillStyle = '#ef4444'; // Red pen
        ctx.fillRect(plat.x + plat.w/2 + 18, plat.y - 4, 10, 2);
      } else if (plat.type === 'blackboard') {
        // Blackboard
        ctx.fillStyle = getPattern(ctx, 'chalkboard') || '#064e3b';
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        
        ctx.shadowBlur = 0;
        // Chalk dust texture
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        for(let i=0; i<100; i++) {
           ctx.fillRect(plat.x + Math.random()*plat.w, plat.y + Math.random()*plat.h, 2, 2);
        }
        
        // Wood frame
        ctx.strokeStyle = '#78350f'; 
        ctx.lineWidth = 6;
        ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
        
        // Chalk scribbles
        ctx.fillStyle = '#f8fafc';
        ctx.font = '16px "Comic Sans MS", cursive, sans-serif';
        ctx.fillText('A + B = C', plat.x + 20, plat.y + 22);
      } else if (plat.type === 'book') {
        // Detailed Giant Book
        ctx.fillStyle = getPattern(ctx, 'leather') || '#1e3a8a';
        ctx.fillRect(plat.x, plat.y + 5, plat.w, 25);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fbbf24'; // Gold trim
        ctx.fillRect(plat.x + 5, plat.y + 5, plat.w - 10, 2);
        ctx.fillRect(plat.x + 5, plat.y + 28, plat.w - 10, 2);
        
        // Pages
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(plat.x + 5, plat.y + 10, plat.w - 10, 15);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=12; i<25; i+=3) {
           ctx.moveTo(plat.x + 5, plat.y + i);
           ctx.lineTo(plat.x + plat.w - 5, plat.y + i);
        }
        ctx.stroke();
        
        // Spine
        ctx.fillStyle = getPattern(ctx, 'metal') || '#172554';
        ctx.fillRect(plat.x, plat.y + 5, 8, 25);
      } else if (plat.type === 'ruler') {
        // Wooden/Yellow Ruler
        ctx.fillStyle = getPattern(ctx, 'wood') || '#fde047';
        ctx.fillRect(plat.x, plat.y, plat.w, 15);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#1e293b'; // Black ticks
        for(let i=5; i<plat.w; i+=10) {
           ctx.fillRect(plat.x + i, plat.y, 2, i%30 === 5 ? 10 : 5);
        }
      } else if (plat.type === 'barrier') {
        if (!gatesClearedRef.current[plat.level]) {
          // Draw magical barrier
          ctx.fillStyle = `rgba(168, 85, 247, ${0.5 + Math.sin(time/200)*0.2})`;
          ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          for(let i=0; i<plat.w; i+=50) {
             ctx.fillRect(plat.x + i + Math.sin(time/500)*10, plat.y, 4, plat.h);
          }
        }
      } else if (plat.type === 'sensor') {
        if (!gatesClearedRef.current[plat.level]) {
          // Draw glowing question mark station
          ctx.fillStyle = getPattern(ctx, 'wood') || '#fde047';
          ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
          ctx.fillStyle = '#1e293b';
          ctx.font = '30px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('❓', plat.x + plat.w/2, plat.y + plat.h/2 + 10);
        }
      } else if (plat.type === 'victory') {
        ctx.fillStyle = getPattern(ctx, 'wood') || '#fde047';
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        ctx.fillStyle = '#1e293b';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏆 SOMMET 🏆', plat.x + plat.w/2, plat.y + 22);
      }
    }

    // --- Draw Skeuomorphic Hamster ---
    const p = playerRef.current;
    const py = p.y;
    
    ctx.save();
    ctx.translate(p.x, py);
    if (!p.facingRight) ctx.scale(-1, 1);
    
    const scaleRatio = p.size / 24;
    ctx.scale(scaleRatio, scaleRatio);

    // Disable global shadow for individual body parts to avoid messy overlap, 
    // we'll draw one crisp shadow for the hamster.
    ctx.shadowColor = 'transparent';

    // Hamster Drop Shadow (on the ground/platform)
    if (p.isGrounded) {
       ctx.fillStyle = 'rgba(0,0,0,0.3)';
       ctx.beginPath();
       ctx.ellipse(0, p.size/2 + 2, p.size/1.5, 4, 0, 0, Math.PI*2);
       ctx.fill();
    }

    // Ears
    ctx.fillStyle = '#d97706'; 
    ctx.beginPath();
    ctx.arc(-8, -10, 7, 0, Math.PI * 2);
    ctx.arc(8, -10, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbcfe8'; // Inner ear
    ctx.beginPath();
    ctx.arc(-8, -10, 4, 0, Math.PI * 2);
    ctx.arc(8, -10, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (Radial gradient for 3D fur effect)
    let furGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, p.size/1.5);
    furGrad.addColorStop(0, '#fbbf24'); // Highlight
    furGrad.addColorStop(0.7, '#f59e0b'); // Base orange
    furGrad.addColorStop(1, '#b45309'); // Shadow edge
    
    ctx.fillStyle = furGrad;
    ctx.beginPath();
    ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Belly
    let bellyGrad = ctx.createRadialGradient(0, 4, 1, 0, 4, p.size/2.5);
    bellyGrad.addColorStop(0, '#ffffff');
    bellyGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bellyGrad;
    ctx.beginPath();
    ctx.arc(0, 4, p.size/2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(4, -4, 3, 0, Math.PI*2); // Big eye
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(5, -5, 1.2, 0, Math.PI*2); // Catchlight
    ctx.fill();

    // Nose & Whiskers
    ctx.fillStyle = '#f472b6'; 
    ctx.beginPath();
    ctx.arc(10, 1, 2.5, 0, Math.PI*2);
    ctx.fill();
    
    // Whiskers
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(9, 1); ctx.lineTo(16, -2);
    ctx.moveTo(9, 1.5); ctx.lineTo(17, 1.5);
    ctx.moveTo(9, 2); ctx.lineTo(15, 5);
    ctx.stroke();

    ctx.restore();
    ctx.restore(); // restore global context
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[800px] mb-4 items-center">
        <button className="back-btn m-0" onClick={onBack}>← Quitter</button>
        <h2 className="text-accent m-0">Ne Regarde Pas En Bas (Unité 2)</h2>
      </div>

      <div className="dld-container" style={{ '--cam-y': cameraRef.current ? cameraRef.current.y : 0 }}>
        
        <div className="dld-hud">
          <div className="hud-panel">
            <span>🏰 Sommet : {Math.max(0, Math.floor((TOTAL_HEIGHT - HEIGHT - cameraRef.current.y)/10))}m</span>
          </div>
          <button 
            onClick={toggleMusic}
            className="hud-panel cursor-pointer hover:bg-gray-100 transition border-0"
            style={{ pointerEvents: 'auto' }}
          >
            {musicPlaying ? '🎵 Musique: ON' : '🎵 Musique: OFF'}
          </button>
        </div>

        <canvas 
          ref={canvasRef} 
          width={WIDTH} 
          height={HEIGHT} 
          className="dld-canvas"
        />

        {interactionHint && !activeModal && (
          <div className="interaction-hint">
            {interactionHint}
          </div>
        )}

        {/* MODALS */}
        {activeModal === 'question' && currentQ && (
          <div className="game-overlay">
            <div className="modal-content">
              <h2>Porte de Grammaire</h2>
              <p className="text-sm text-gray-500 mb-2">Réponses correctes requises : {correctAnswers} / 5</p>
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
            </div>
          </div>
        )}

        {activeModal === 'victory' && (
          <div className="game-overlay" onClick={onBack}>
            <div className="modal-content">
              <h2 className="text-amber-500 text-3xl">🎉 SOMMET ATTEINT ! 🎉</h2>
              <p className="text-lg">Félicitations ! Vous avez grimpé tout en haut sans jamais regarder en bas (ou presque) !</p>
              <p className="text-sm italic mt-4 opacity-75">(Cliquez pour quitter)</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center max-w-[800px] text-gray-600">
        <p><strong>Comment jouer :</strong> Utilisez A/D ou les Flèches Gauche/Droite pour vous déplacer. Espace ou W pour sauter ! Montez le plus haut possible. Aux portes magiques, répondez aux questions sur les verbes irréguliers pour passer ! Si vous tombez... eh bien, vous redescendez.</p>
      </div>
    </div>
  );
}
