import React, { useRef } from 'react';

const GAME_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Le Donjon du Passé</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0a0a0f;font-family:'Georgia',serif;overflow:hidden;user-select:none;}
  #canvas-container{position:fixed;inset:0;}
  canvas{display:block;width:100%!important;height:100%!important;}
  #hud{position:fixed;top:0;left:0;right:0;z-index:10;pointer-events:none;}
  #hud-top{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:linear-gradient(180deg,rgba(0,0,0,.85) 0%,transparent 100%);}
  #chamber-label{color:#f5c842;font-size:14px;font-variant:small-caps;letter-spacing:2px;text-shadow:0 0 8px #f5c84299;}
  #progress-bar{display:flex;gap:6px;}
  .pip{width:18px;height:18px;border-radius:50%;border:2px solid #f5c842;background:transparent;transition:background .4s;}
  .pip.done{background:#f5c842;}
  #hud-bottom{position:fixed;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 16px 16px;background:linear-gradient(0deg,rgba(0,0,0,.9) 0%,transparent 100%);}
  #context-box{background:rgba(30,10,50,.82);border:1px solid #7a3fa0;border-radius:8px;padding:10px 18px;max-width:780px;width:100%;text-align:center;color:#e0c8ff;font-size:13px;line-height:1.6;pointer-events:none;}
  #context-box strong{color:#f5c842;}
  #slots-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:860px;pointer-events:auto;}
  .slot{min-width:90px;padding:8px 14px;border-radius:6px;border:2px dashed #7a3fa0;background:rgba(30,10,50,.6);color:#ccc;font-size:12px;text-align:center;cursor:pointer;transition:all .25s;position:relative;margin-top:20px;}
  .slot.filled{border-color:#f5c842;background:rgba(60,40,10,.6);color:#f5c842;}
  .slot-label{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:10px;color:#9f7fd4;white-space:nowrap;font-variant:small-caps;letter-spacing:1px;}
  #palette{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:860px;pointer-events:auto;}
  .rune{padding:7px 14px;border-radius:6px;border:1px solid #7a3fa0;background:rgba(90,20,140,.45);color:#d8a0ff;font-size:12px;cursor:pointer;transition:all .2s;}
  .rune:hover{background:rgba(130,40,200,.5);border-color:#c07aff;color:#fff;transform:translateY(-2px);}
  .rune.used{opacity:.3;cursor:default;transform:none;}
  #action-row{display:flex;gap:10px;pointer-events:auto;}
  .action-btn{padding:9px 22px;border-radius:7px;border:none;font-size:13px;font-family:'Georgia',serif;cursor:pointer;letter-spacing:1px;font-variant:small-caps;transition:all .2s;}
  #btn-validate{background:linear-gradient(135deg,#7b2ff7,#4f0e9c);color:#fff;border:1px solid #b06aff;}
  #btn-validate:hover{background:linear-gradient(135deg,#9b4fff,#6b1fd0);}
  #btn-reset{background:rgba(40,10,80,.6);color:#c090f0;border:1px solid #5a2f8a;}
  #btn-reset:hover{background:rgba(60,20,100,.7);}
  #feedback{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:50;max-width:560px;width:90%;border-radius:12px;padding:22px 28px;text-align:center;display:none;pointer-events:auto;}
  #feedback.success{background:rgba(20,70,30,.95);border:2px solid #4ade80;color:#bbf7d0;}
  #feedback.error{background:rgba(70,10,10,.95);border:2px solid #f87171;color:#fecaca;}
  #feedback h3{font-size:17px;margin-bottom:8px;}
  #feedback p{font-size:13px;line-height:1.6;margin-bottom:14px;}
  #feedback button{padding:8px 20px;border-radius:6px;border:none;cursor:pointer;font-size:13px;font-family:'Georgia',serif;}
  #feedback.success button{background:#16a34a;color:#fff;}
  #feedback.error button{background:#b91c1c;color:#fff;}
  #victory{position:fixed;inset:0;z-index:100;background:rgba(5,2,20,.96);display:none;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;padding:30px;}
  #victory h1{color:#f5c842;font-size:32px;text-shadow:0 0 20px #f5c84299;letter-spacing:3px;}
  #victory p{color:#d8c090;font-size:15px;max-width:500px;line-height:1.7;}
  #victory button{padding:12px 30px;border-radius:8px;border:1px solid #f5c842;background:rgba(60,40,0,.8);color:#f5c842;font-size:15px;cursor:pointer;letter-spacing:2px;font-family:'Georgia',serif;}
  #flicker{position:fixed;inset:0;pointer-events:none;z-index:2;animation:flick 0.08s infinite alternate;}
  @keyframes flick{from{opacity:0}to{opacity:.025}}
</style>
</head>
<body>
<div id="canvas-container"><canvas id="c"></canvas></div>
<div id="flicker"></div>
<div id="hud">
  <div id="hud-top">
    <div id="chamber-label">⚔ Chambre I</div>
    <div id="progress-bar">
      <div class="pip" id="pip0"></div>
      <div class="pip" id="pip1"></div>
      <div class="pip" id="pip2"></div>
      <div class="pip" id="pip3"></div>
    </div>
  </div>
  <div id="hud-bottom">
    <div id="context-box">Chargement…</div>
    <div id="slots-row"></div>
    <div id="palette"></div>
    <div id="action-row">
      <button class="action-btn" id="btn-reset">↺ Réinitialiser</button>
      <button class="action-btn" id="btn-validate">⚡ Valider la formule</button>
    </div>
  </div>
</div>
<div id="feedback">
  <h3 id="fb-title"></h3>
  <p id="fb-body"></p>
  <button id="fb-btn"></button>
</div>
<div id="victory">
  <h1>🏆 Évasion Réussie !</h1>
  <p>Vous maîtrisez le passé composé, l'imparfait et les pronoms objets !<br>Le donjon ne peut plus vous retenir — vous êtes libre !</p>
  <p style="font-size:13px;color:#a89060;margin-top:6px;">Vocabulaire : réforme éducative · bourses d'études · scolarisation · pédagogie · infrastructures · égalité des genres</p>
  <button id="btn-rejouer">↺ Rejouer le Donjon</button>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const CHAMBERS = [
  {
    id:1, title:"Chambre I — Passé Composé & Accord COD",
    theme:"📚 Réforme éducative & Bourses d'études",
    context:"Les inspecteurs ont examiné les nouvelles <strong>réformes éducatives</strong>. Ils ont demandé les statistiques, et le ministre <strong>les</strong> a analysées toute la nuit.",
    instruction:"Reconstituez la phrase sur les <strong>bourses d'études</strong> — attention à l'accord du participe passé !",
    slots:[
      {label:"sujet",answer:"le comité"},
      {label:"pronom COD",answer:"les"},
      {label:"auxiliaire + participe",answer:"a approuvées"},
      {label:"circonstanciel",answer:"lors de la réunion"}
    ],
    runes:["le comité","les","a approuvées","lors de la réunion","a approuvé","leur a approuvé","les approuvait"],
    feedback_error:"⚠ Accord obligatoire ! Le pronom COD <em>les</em> (= les bourses, féminin pluriel) précède l'auxiliaire <em>avoir</em> → participe accordé : <em>approuvées</em>.",
    feedback_success:"✔ Parfait ! <em>Les</em> (COD féminin pluriel) avant <em>avoir</em> → accord : <em>approuvées</em>. Les bourses ont bien été approuvées !"
  },
  {
    id:2, title:"Chambre II — Imparfait vs. Passé Composé & COI (lui)",
    theme:"🏫 Infrastructures scolaires & Scolarisation",
    context:"Quand les <strong>infrastructures scolaires</strong> étaient insuffisantes, les directeurs avaient du mal à tout gérer. Les parents leur signalaient les problèmes régulièrement.",
    instruction:"Imparfait = description continue. Passé composé = action précise. Le COI <em>lui</em> est-il accordé ?",
    slots:[
      {label:"subordonnée imparfait",answer:"Pendant que l'école manquait de ressources"},
      {label:"pronom COI",answer:"lui"},
      {label:"passé composé",answer:"ont soumis"},
      {label:"COD",answer:"un rapport détaillé"}
    ],
    runes:["Pendant que l'école manquait de ressources","lui","ont soumis","un rapport détaillé","l'ont soumis","lui ont soumise","avaient soumis"],
    feedback_error:"⚠ <em>Lui</em> est un COI (complément d'objet indirect) → pas d'accord du participe ! On écrit <em>ont soumis</em>, jamais <em>soumise</em>.",
    feedback_success:"✔ Exact ! COI <em>lui</em> → participe invariable : <em>ont soumis</em>. Bien joué !"
  },
  {
    id:3, title:"Chambre III — Pronoms adverbiaux y & en",
    theme:"🌍 Taux de scolarisation & Égalité des genres",
    context:"Le taux de <strong>scolarisation</strong> avait longtemps été un défi dans les zones rurales. Le gouvernement <strong>y</strong> travaillait depuis des années, et cette année il <strong>en</strong> a amélioré plusieurs indicateurs.",
    instruction:"Placez <em>y</em> (lieu / idée) et <em>en</em> (quantité / partie) — attention aux temps !",
    slots:[
      {label:"imparfait + y",answer:"y travaillaient sans cesse"},
      {label:"pronom en",answer:"en"},
      {label:"passé composé",answer:"ont réduit"},
      {label:"quantité",answer:"plusieurs"}
    ],
    runes:["y travaillaient sans cesse","en","ont réduit","plusieurs","y ont réduit","en travaillaient","ont réduits"],
    feedback_error:"⚠ <em>Y</em> remplace un lieu ou une idée (ici : les inégalités de <strong>scolarisation</strong>). <em>En</em> indique une quantité. Vérifiez aussi le temps du verbe !",
    feedback_success:"✔ Bravo ! <em>Y travaillaient</em> (imparfait, continu) + <em>en ont réduit plusieurs</em> (PC, action ponctuelle avec quantité)."
  },
  {
    id:4, title:"Chambre IV — Verbes pronominaux au Passé Composé",
    theme:"🎓 Égalité des genres & Pédagogie inclusive",
    context:"La nouvelle <strong>pédagogie inclusive</strong> a changé les mentalités. Quand la cloche sonnait, les élèves se dépêchaient. Mais face à la réforme sur l'<strong>égalité des genres</strong>, les enseignantes ont réagi autrement.",
    instruction:"Les verbes pronominaux se conjuguent avec <em>être</em> — et le participe s'accorde avec le sujet !",
    slots:[
      {label:"subordonnée",answer:"Lorsque la réforme a été annoncée"},
      {label:"pronom réfléchi",answer:"se"},
      {label:"être + participe accordé",answer:"sont mobilisées"},
      {label:"but",answer:"pour la défendre"}
    ],
    runes:["Lorsque la réforme a été annoncée","se","sont mobilisées","pour la défendre","ont mobilisé","se sont mobilisé","s'est mobilisées"],
    feedback_error:"⚠ Verbe pronominal → auxiliaire <em>être</em> au passé composé ! Sujet féminin pluriel (<em>les enseignantes</em>) → accord : <em>mobilisées</em> (avec -es).",
    feedback_success:"✔ Parfait ! Pronominal + être → accord féminin pluriel : <em>sont mobilisées</em>. La réforme sur l'égalité des genres est bien défendue !"
  }
];

const W=()=>window.innerWidth, H=()=>window.innerHeight;
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(W(),H());
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=0.85;

const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x070310,0.055);
scene.background=new THREE.Color(0x050208);

const camera=new THREE.PerspectiveCamera(65,W()/H(),0.1,80);
camera.position.set(0,2.4,7);
camera.lookAt(0,1.2,0);

scene.add(new THREE.AmbientLight(0x1a0a2e,0.6));

function makeTorch(x,y,z){
  const l=new THREE.PointLight(0xff8800,2.2,9);
  l.position.set(x,y,z);
  l.castShadow=true;
  l.shadow.mapSize.width=256;
  l.shadow.mapSize.height=256;
  scene.add(l);
  const f=new THREE.Mesh(new THREE.ConeGeometry(0.05,0.18,6),new THREE.MeshBasicMaterial({color:0xff6600}));
  f.position.set(x,y+0.09,z);
  scene.add(f);
  const s=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.06,0.2,8),new THREE.MeshStandardMaterial({color:0x3a2010,roughness:0.9}));
  s.position.set(x,y-0.1,z);
  scene.add(s);
  return l;
}
const torchLights=[makeTorch(-3.5,2.6,0),makeTorch(3.5,2.6,0),makeTorch(0,2.6,-4)];

function stoneTex(w,h,dark){
  const c=document.createElement('canvas');
  c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  ctx.fillStyle=dark?'#1a1225':'#2a1e3a';
  ctx.fillRect(0,0,w,h);
  for(let i=0;i<400;i++){
    const px=Math.random()*w,py=Math.random()*h,r=Math.random()*4+1,v=Math.floor(Math.random()*30)+(dark?8:15);
    ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);
    ctx.fillStyle='rgb('+v+','+(v*.7|0)+','+(v*1.1|0)+')';ctx.fill();
  }
  ctx.strokeStyle=dark?'#0d0818':'#150f22';ctx.lineWidth=2;
  for(let row=0;row<h;row+=40){
    const off=(row/40%2)*60;
    for(let col=off;col<w+80;col+=120){ctx.beginPath();ctx.rect(col,row,110,36);ctx.stroke();}
  }
  return new THREE.CanvasTexture(c);
}

function makeWall(w,h,x,y,z,ry){
  const mat=new THREE.MeshStandardMaterial({map:stoneTex(512,256,false),roughness:0.95,metalness:0});
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);
  mesh.position.set(x,y,z);mesh.rotation.y=ry;mesh.receiveShadow=true;scene.add(mesh);
}

const floorMat=new THREE.MeshStandardMaterial({map:stoneTex(512,512,true),roughness:1,metalness:0});
floorMat.map.wrapS=floorMat.map.wrapT=THREE.RepeatWrapping;
floorMat.map.repeat.set(3,3);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(18,18),floorMat);
floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);

const ceilMat=new THREE.MeshStandardMaterial({map:stoneTex(256,256,true),roughness:1,metalness:0});
const ceil=new THREE.Mesh(new THREE.PlaneGeometry(18,18),ceilMat);
ceil.rotation.x=Math.PI/2;ceil.position.y=5.5;scene.add(ceil);

makeWall(18,6,0,2.75,-5.5,0);
makeWall(18,6,0,2.75,9,Math.PI);
makeWall(11,6,-9,2.75,0,Math.PI/2);
makeWall(11,6,9,2.75,0,-Math.PI/2);

function buildDoor(){
  const g=new THREE.Group();
  const door=new THREE.Mesh(new THREE.BoxGeometry(1.8,3.2,0.15),new THREE.MeshStandardMaterial({color:0x2a1508,roughness:0.8,metalness:0.3}));
  g.add(door);
  const bm=new THREE.MeshStandardMaterial({color:0x1a1a1a,metalness:0.9,roughness:0.2});
  [-0.9,0,0.9].forEach(dy=>{const b=new THREE.Mesh(new THREE.BoxGeometry(1.85,0.12,0.2),bm);b.position.y=dy;g.add(b);});
  const rune=new THREE.Mesh(new THREE.CircleGeometry(0.18,16),new THREE.MeshBasicMaterial({color:0x8b00ff}));
  rune.position.set(0,0.4,0.1);g.add(rune);
  g.position.set(0,1.6,-5.3);scene.add(g);return g;
}
const vaultDoor=buildDoor();

const pedestals=[];
function makePedestal(x,z){
  const pm=new THREE.MeshStandardMaterial({color:0x1e0a30,roughness:0.7,metalness:0.2});
  const base=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.3,0.7),pm);
  base.position.set(x,0.15,z);base.castShadow=true;base.receiveShadow=true;scene.add(base);
  const top=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.05,0.6),pm);
  top.position.set(x,0.32,z);scene.add(top);
  const cm=new THREE.MeshStandardMaterial({color:0x6600cc,emissive:0x3300aa,emissiveIntensity:0.8,roughness:0.1,metalness:0.3});
  const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(0.14,0),cm);
  crystal.position.set(x,0.52,z);scene.add(crystal);
  pedestals.push({base,top,crystal});
}
[-4.5,-1.5,1.5,4.5].forEach(x=>makePedestal(x,1.5));

// Pillars
function makePillar(x,z){
  const mat=new THREE.MeshStandardMaterial({map:stoneTex(128,256,false),roughness:0.9,metalness:0});
  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.35,4.5,8),mat);
  shaft.position.set(x,2.25,z);shaft.castShadow=true;scene.add(shaft);
  const cap=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.3,0.9),mat);
  cap.position.set(x,4.65,z);scene.add(cap);
}
[[-3.5,-1],[-3.5,3],[3.5,-1],[3.5,3]].forEach(([x,z])=>makePillar(x,z));

const pCount=120;
const pGeo=new THREE.BufferGeometry();
const pPos=new Float32Array(pCount*3);
for(let i=0;i<pCount;i++){pPos[i*3]=(Math.random()-.5)*16;pPos[i*3+1]=Math.random()*5;pPos[i*3+2]=(Math.random()-.5)*10;}
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
const particles=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0xaa66ff,size:0.04,transparent:true,opacity:0.45}));
scene.add(particles);

let runeBlocks=[];
let chamberIndex=0;
let slotValues=[];

function makeRuneBlock(label,i,total){
  const angle=(i/total)*Math.PI*1.8-Math.PI*0.9;
  const radius=2.8+(i%2)*0.4;
  const x=Math.sin(angle)*radius;
  const z=-0.5+Math.cos(angle)*radius*0.35;
  const y=0.6+Math.sin(i*1.3)*0.3;
  const mat=new THREE.MeshStandardMaterial({color:0x3a1060,emissive:0x1a0040,emissiveIntensity:0.5,roughness:0.4,metalness:0.4});
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.35,0.15),mat);
  mesh.position.set(x,y,z);mesh.castShadow=true;scene.add(mesh);
  return{mesh,label,x,y,z,baseY:y};
}

function animateRuneToSlot(rb,tx,ty,tz){
  const sx=rb.mesh.position.x,sy=rb.mesh.position.y,sz=rb.mesh.position.z;
  const dur=0.5,t0=performance.now();
  function step(t){
    const p=Math.min((t-t0)/(dur*1000),1),e=1-Math.pow(1-p,3);
    rb.mesh.position.set(sx+(tx-sx)*e,sy+(ty-sy)*e,sz+(tz-sz)*e);
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function loadChamber(idx){
  chamberIndex=idx;
  const ch=CHAMBERS[idx];
  document.getElementById('chamber-label').textContent='⚔ '+ch.title.split('—')[0].trim();
  for(let i=0;i<4;i++)document.getElementById('pip'+i).classList.toggle('done',i<idx);
  document.getElementById('context-box').innerHTML=
    '<strong style="color:#f5c842;font-size:11px;letter-spacing:1px;font-variant:small-caps;">'+ch.theme+'</strong><br>'+
    '<em>'+ch.instruction+'</em><br><br>'+ch.context;
  slotValues=ch.slots.map(()=>null);
  renderSlots();
  renderPalette(ch);
  runeBlocks.forEach(rb=>scene.remove(rb.mesh));
  runeBlocks=ch.runes.map((label,i)=>makeRuneBlock(label,i,ch.runes.length));
  pedestals.forEach(p=>{p.crystal.material.color.setHex(0x6600cc);p.crystal.material.emissive.setHex(0x3300aa);});
  vaultDoor.position.x=0;vaultDoor.rotation.y=0;
}

function renderSlots(){
  const ch=CHAMBERS[chamberIndex];
  const row=document.getElementById('slots-row');
  row.innerHTML='';
  ch.slots.forEach((s,i)=>{
    const div=document.createElement('div');
    div.className='slot'+(slotValues[i]?' filled':'');
    div.innerHTML='<span class="slot-label">'+s.label+'</span>'+(slotValues[i]||'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    div.addEventListener('click',()=>{
      if(slotValues[i]){slotValues[i]=null;renderSlots();renderPalette(CHAMBERS[chamberIndex]);}
    });
    row.appendChild(div);
  });
}

function renderPalette(ch){
  const pal=document.getElementById('palette');
  pal.innerHTML='';
  ch.runes.forEach((label,ri)=>{
    const used=slotValues.includes(label);
    const btn=document.createElement('button');
    btn.className='rune'+(used?' used':'');
    btn.textContent=label;btn.disabled=used;
    btn.addEventListener('click',()=>{
      if(used)return;
      const emptyIdx=slotValues.indexOf(null);
      if(emptyIdx===-1)return;
      slotValues[emptyIdx]=label;
      renderSlots();renderPalette(ch);
      const rb=runeBlocks[ri];
      if(rb)animateRuneToSlot(rb,(emptyIdx-1.5)*1.0,0.5,-2);
      if(pedestals[emptyIdx]){pedestals[emptyIdx].crystal.material.color.setHex(0xffcc00);pedestals[emptyIdx].crystal.material.emissive.setHex(0x886600);}
    });
    pal.appendChild(btn);
  });
}

function openDoor(){
  const sx=vaultDoor.position.x,t0=performance.now();
  function step(t){const p=Math.min((t-t0)/700,1);vaultDoor.position.x=sx-2.2*(1-Math.pow(1-p,2));if(p<1)requestAnimationFrame(step);}
  requestAnimationFrame(step);
}

function showFeedback(type,title,body,btnLabel){
  const fb=document.getElementById('feedback');
  fb.className=type;
  document.getElementById('fb-title').textContent=title;
  document.getElementById('fb-body').innerHTML=body;
  document.getElementById('fb-btn').textContent=btnLabel;
  fb.style.display='block';
  document.getElementById('fb-btn').onclick=()=>{
    fb.style.display='none';
    if(type==='success'){chamberIndex<3?loadChamber(chamberIndex+1):showVictory();}
  };
}

function showVictory(){document.getElementById('victory').style.display='flex';}

document.getElementById('btn-validate').addEventListener('click',()=>{
  const ch=CHAMBERS[chamberIndex];
  if(slotValues.includes(null)){showFeedback('error','🪄 Formule incomplète !','Placez toutes les runes dans les emplacements avant de valider.','Continuer');return;}
  const correct=ch.slots.every((s,i)=>slotValues[i]===s.answer);
  if(correct){
    pedestals.forEach(p=>{p.crystal.material.color.setHex(0x00ff88);p.crystal.material.emissive.setHex(0x00aa44);});
    openDoor();
    showFeedback('success','✨ Formule acceptée !',ch.feedback_success,chamberIndex<3?'Chambre suivante →':'🏆 Terminer !');
  } else {
    pedestals.forEach(p=>{p.crystal.material.color.setHex(0xff2200);p.crystal.material.emissive.setHex(0xaa1100);});
    setTimeout(()=>pedestals.forEach(p=>{p.crystal.material.color.setHex(0x6600cc);p.crystal.material.emissive.setHex(0x3300aa);}),800);
    showFeedback('error','❌ Mauvaise formule !',ch.feedback_error,'Réessayer');
  }
});

document.getElementById('btn-reset').addEventListener('click',()=>loadChamber(chamberIndex));
document.getElementById('btn-rejouer').addEventListener('click',()=>{document.getElementById('victory').style.display='none';loadChamber(0);});

let t=0;
function animate(){
  requestAnimationFrame(animate);t+=0.016;
  torchLights.forEach((l,i)=>{l.intensity=2.0+Math.sin(t*7+i*2.3)*0.4+Math.sin(t*13+i)*0.15;});
  pedestals.forEach((p,i)=>{p.crystal.position.y=0.52+Math.sin(t*1.8+i)*0.04;p.crystal.rotation.y+=0.012;});
  runeBlocks.forEach((rb,i)=>{rb.mesh.position.y=rb.baseY+Math.sin(t*1.2+i*0.9)*0.06;rb.mesh.rotation.y=Math.sin(t*0.5+i)*0.15;});
  const dr=vaultDoor.children[vaultDoor.children.length-1];
  if(dr&&dr.material)dr.material.color.setHSL(0.75,1,0.45+Math.sin(t*3)*0.15);
  const pa=pGeo.attributes.position.array;
  for(let i=0;i<pCount;i++){pa[i*3+1]+=0.004;if(pa[i*3+1]>5.2)pa[i*3+1]=0;}
  pGeo.attributes.position.needsUpdate=true;
  camera.position.x=Math.sin(t*0.15)*0.12;
  camera.position.y=2.4+Math.sin(t*0.22)*0.06;
  renderer.render(scene,camera);
}

window.addEventListener('resize',()=>{camera.aspect=W()/H();camera.updateProjectionMatrix();renderer.setSize(W(),H());});
loadChamber(0);
animate();
</script>
</body>
</html>`;

export default function DonjonDuPasse({ onBack }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#050208' }}>
      <button
        onClick={onBack}
        style={{
          position: 'fixed', top: 12, right: 16, zIndex: 2000,
          background: 'rgba(30,10,60,0.85)', border: '1px solid #7a3fa0',
          color: '#d8a0ff', padding: '6px 14px', borderRadius: 6,
          cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: 13,
          fontVariant: 'small-caps', letterSpacing: 1
        }}
      >
        ✕ Quitter le Donjon
      </button>
      <iframe
        srcDoc={GAME_HTML}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Le Donjon du Passé"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
