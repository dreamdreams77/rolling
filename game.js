// ════════════════════════════════════════════════════════════════════
// UNTZEE WARS — BATTLE SYSTEM
// ════════════════════════════════════════════════════════════════════

const PERSONAL=[
  '✨ A fairy never gives up.',
  '🌿 The willow remembers everything.',
  '⚡ Untzee flows through me.',
  '💫 This is my destiny.',
  '🗡️ For everyone waiting in the shadows.',
];

const STORY_OPEN=[
  "Seven ages ago the Willow Accord bound every fae-clan to guard the untzee crystals — twinned shards of dice-luck and card-fate that keep the world's elements from tearing loose.",
  "When the Hollow Court broke the Accord, its iron legions marched south and the clans fell one grove at a time. Only Noom Wolliw escaped the fall of the Last Grove, a single shard sewn into her wing.",
  "Now she walks alone toward Ashveil, the one-winged general who broke the Accord, betting every fight on the turn of a card and the fall of the dice.",
];

const WAVE_STORY=[
  '📖 The border patrols have already heard the Hollow Court is on the march.',
  '📖 Past the checkpoint, the old forest itself seems to be hiding from what comes next.',
  '📖 The mechanized line looms ahead — the Court builds its soldiers now, it no longer breeds them.',
  '📖 Refugee trails cross the road here. Wolliw presses on before the enemy finds them first.',
  '📖 The Hollow Court\'s elite guard holds the last bridge before the capital.',
  '📖 Twin war-engines block the capital gate. Beyond them, only the tower remains.',
  '📖 At the tower\'s peak, a single silhouette waits with one wing unfurled.',
  '📖 The tower is empty now. Empty, but not quiet — the shard in her wing won\'t stop humming.',
];

const ENEMY_FLAVOR={
  trooper:'Conscripted from the border towns, armored in whatever the Court could spare.',
  mech:'A hollow shell of a soldier, animated by a shard of stolen untzee-craft.',
  beast:'Once a forest guardian, twisted feral by the Court\'s dark alchemy.',
  alien:'A rift-caller summoned through a tear the Court cut in the world itself.',
  boss:'A siege-engine built to grind fortress gates — and anything else — to rubble.',
  seph:'The general who broke the Accord. He remembers every clan he ended.',
  echo:'Not him. Something that remembers being him, and hasn\'t learned yet that he\'s gone.',
};

// Battle dialogue — fires once per fight when the enemy's HP first drops
// to or below `at` (percent). spk:'e' is the enemy speaking, 'p' is Wolliw.
// Listed highest-at-to-lowest so a single big hit still reveals lines in order.
const ENEMY_TAUNTS={
  trooper:[
    {at:65,spk:'e',txt:'"Just hold the line till reinforcements—"'},
    {at:25,spk:'e',txt:'"—reinforcements aren\'t coming, are they."'},
  ],
  mech:[
    {at:60,spk:'e',txt:'*internal alarms blare in a language no one programmed*'},
    {at:20,spk:'e',txt:'*a stolen shard flickers inside its chest, unstable*'},
  ],
  beast:[
    {at:60,spk:'e',txt:'It bares teeth that were never meant to be this sharp.'},
    {at:20,spk:'e',txt:'Something in its eyes remembers being afraid of fire, once.'},
  ],
  alien:[
    {at:60,spk:'e',txt:'The rift behind its eyes flickers, hungry for home.'},
    {at:20,spk:'e',txt:'It keens — a sound with no throat shaped for it.'},
  ],
  boss:[
    {at:75,spk:'e',txt:'⚠ TARGET ACQUIRED. ESCALATING.'},
    {at:45,spk:'e',txt:'*it vents molten coolant, cannons glowing brighter*'},
    {at:15,spk:'e',txt:'⚠ CORE INTEGRITY FAILING. CONTINUING ANYWAY.'},
  ],
  // Also fires for the postgame Echo (same spr) — it repeats his exact words on purpose.
  seph:[
    {at:80,spk:'e',txt:'"...still following me, little bird?"'},
    {at:65,spk:'p',txt:'"You taught me to fly. Not to run."'},
    {at:50,spk:'e',txt:'"I taught you to survive. The Council taught you to wait. Look what waiting cost the Grove."'},
    {at:35,spk:'e',txt:'"I tore this wing off myself so I\'d never have to wait for permission again."'},
    {at:20,spk:'p',txt:'"You could have come back for the rest of us."'},
    {at:10,spk:'e',txt:'"...I know."'},
  ],
};

const CODEX=[
  {id:'accord',title:'The Willow Accord',unlock:0,
    text:'Seven ages of peace, kept by a single vow: every fae-clan would guard its own untzee crystal, and none would draw on its power beyond its own borders. The Accord never promised safety. It promised restraint.'},
  {id:'court',title:'The Hollow Court',unlock:0,
    text:'They do not call themselves an army. They call themselves a correction — the old treaties torn down, the crystals seized, and "protection" redefined as whoever holds the most power to give it.'},
  {id:'wolliw',title:'Noom Wolliw',unlock:0,
    text:'Once a warden-in-training at the Last Grove, now the last of it. She carries her clan\'s shard sewn into her wing because there is nowhere left to set it down.'},
  {id:'bestiary-trooper',title:'Bestiary: Elite Trooper',unlock:0,
    text:'The Hollow Court drafts from the border towns it "protects" first. An Elite Trooper is rarely a volunteer — just whoever couldn\'t run fast enough when the recruiters came through, handed a rifle and a rank to make it feel like a choice.'},
  {id:'bestiary-mech',title:'Bestiary: Combat Mech',unlock:0,
    text:'No pilot, no mind of its own — just a stolen untzee shard wired straight into a war-frame\'s reflexes. Cheaper than training a soldier, and it never asks why it\'s fighting.'},
  {id:'bestiary-beast',title:'Bestiary: Savage Beast',unlock:0,
    text:'Every wood the Court marches through had guardians once — creatures the old clans kept as wardens of their own. The Court\'s alchemists don\'t tame them. They just turn the fear up until nothing else is left.'},
  {id:'bestiary-alien',title:'Bestiary: Alien Entity',unlock:0,
    text:'Untzee power isn\'t supposed to tear holes in anything but the Accord. The Court found out it can tear holes in the world too, and started fishing on the other side for things willing to fight for it.'},
  {id:'wingoath',title:'Wing-Oaths',unlock:2,
    text:'Among the fae-clans, a wing is not just a wing. To break the Accord — to draw untzee power beyond the vow\'s bounds — is to sever the oath, and the oath does not let go quietly. No Accord-breaker has ever kept both wings.'},
  {id:'warden',title:'The Warden Who Didn\'t Come',unlock:4,
    text:'Before the Last Grove fell, it had a Warden — sworn to hold the line until the Council\'s word arrived. The word arrived late. The Warden never waited for one again. No record says where he went, only that he left with one wing fewer than he came with.'},
  {id:'ashveil',title:'Ashveil, Unveiled',unlock:7,
    text:'The Hollow Court\'s general was once the Last Grove\'s Warden — the one who taught Noom Wolliw to fly, before he taught himself to stop asking permission. He broke the Accord the night the Council\'s answer came too late to save anyone but her. He spent every year since insisting that was mercy.'},
  {id:'echo',title:'The Echo at the Tower',unlock:8,
    text:'Some say a shard remembers too much — that grief given a fight to hold onto will always look for a shape to wear again. Whether it is truly him or only what the tower kept, it repeats every word exactly as he said it.'},
];

const ACHIEVEMENTS=[
  {id:'first_blood',icon:'🩸',name:'First Blood',desc:'Win your first battle.'},
  {id:'elementalist',icon:'🌈',name:'Elementalist',desc:'Land a weakness hit with all four elements.'},
  {id:'flawless',icon:'💎',name:'Flawless Victory',desc:'Win a battle without taking any damage.'},
  {id:'comeback',icon:'🔥',name:'Against The Odds',desc:'Win a battle after dropping below 15% HP.'},
  {id:'lorekeeper',icon:'📖',name:'Lore Keeper',desc:'Open the Codex.'},
  {id:'trueending',icon:'👻',name:'True Ending',desc:'Lay Ashveil\'s Echo to rest.'},
];

const MAT={
  fire:{name:'Fire',icon:'🔥',type:'dmg',el:'fire',col:'#ff4f1f',mp:8,pow:28,desc:'Single target flame'},
  ice:{name:'Ice',icon:'❄',type:'dmg',el:'ice',col:'#7ecfff',mp:8,pow:28,desc:'Single target chill'},
  thunder:{name:'Thunder',icon:'⚡',type:'dmg',el:'thunder',col:'#f7d84b',mp:8,pow:28,desc:'Single target shock'},
  wind:{name:'Wind',icon:'💨',type:'dmg',el:'wind',col:'#4cff9f',mp:8,pow:28,desc:'Single target gust'},
  all:{name:'All',icon:'🌊',type:'dmg',el:'all',col:'#29b6f6',mp:14,pow:16,desc:'Hit all enemies'},
  cure:{name:'Cure',icon:'💚',type:'heal',el:'restore',col:'#00ff88',mp:6,pow:0,desc:'Restore 30 HP'},
  wall:{name:'Wall',icon:'🛡',type:'buff',el:'dark',col:'#c05aff',mp:12,pow:0,desc:'Reduce damage 4 turns'},
};

const COMBOS={
  bloom:{name:'Fourfold Bloom',icon:'🌪️',mat:['fire','ice','thunder','wind'],mp:24,effect:'limit'},
  ember:{name:'Twin Ember',icon:'🔥',mat:['fire','wind'],mp:18,effect:'limit'},
};

const ENEMIES={
  trooper:{name:'Elite Trooper',spr:'trooper',hp:45,mp:0,atk:12,def:6,spd:1.4,weak:['ice'],res:[]},
  mech:{name:'Combat Mech',spr:'mech',hp:60,mp:20,atk:14,def:8,spd:1.2,weak:['thunder'],res:['fire']},
  beast:{name:'Savage Beast',spr:'beast',hp:55,mp:0,atk:16,def:5,spd:1.6,weak:['wind'],res:[]},
  alien:{name:'Alien Entity',spr:'alien',hp:50,mp:25,atk:12,def:7,spd:1.3,weak:['dark'],res:['ice']},
  boss:{name:'Iron Warden',spr:'boss',hp:95,mp:30,atk:18,def:10,spd:1.1,weak:['ice','wind'],res:['fire']},
  seph:{name:'Ashveil',spr:'seph',hp:120,mp:50,atk:22,def:12,spd:1.4,weak:[],res:[]},
  echo:{name:'Ashveil\'s Echo',spr:'seph',hp:150,mp:50,atk:24,def:13,spd:1.5,weak:['wind'],res:['ice']},
};

const ARENA_TINTS={
  trooper:'rgba(126,207,255,0.15)',
  mech:'rgba(255,165,0,0.12)',
  beast:'rgba(255,79,31,0.15)',
  alien:'rgba(192,90,255,0.14)',
  boss:'rgba(255,50,0,0.18)',
  seph:'rgba(100,100,200,0.16)',
};

const GLOW_P_COLS={
  trooper:'rgba(126,207,255,0.25)',
  mech:'rgba(255,165,0,0.28)',
  beast:'rgba(255,79,31,0.3)',
  alien:'rgba(192,90,255,0.28)',
  boss:'rgba(255,50,0,0.32)',
  seph:'rgba(100,100,200,0.3)',
};

const DIFFICULTIES={
  easy:{label:'Easy',mult:0.8},
  normal:{label:'Normal',mult:1},
  hard:{label:'Hard',mult:1.25},
};

let S={
  wave:1,
  enemy:null,
  player:{hp:100,maxHp:100,mp:50,maxMp:50,atk:18,def:8,spd:2,limit:0,wall:false,wallT:0},
  pAtb:0,eAtb:0,pTurn:false,eAtb:0,over:false,
  eq:[],combo:null,items:{potion:3,ether:2},stats:{dealt:0,crits:0,spells:0,bestHit:0},
  battleFlags:{tookDamage:false,wasLowHp:false},
  atbT:null,lineIdx:0,pStatus:{},eStatus:{},
  hand:[],pendingCard:null,dice:[1,1,1,1,1],held:[false,false,false,false,false],rollsLeft:3,rolled:false,spinning:false,
  streak:0,tauntFired:new Set(),maxWaveCleared:0,muted:false,difficulty:'normal',
  lifetime:{dealt:0,crits:0,wins:0,bestHit:0,weakElements:[]},achievements:{},codexViewed:false,
};

// ── SAVE / LOAD ──
const SAVE_KEY='untzee-save-v1';
function saveProgress(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      maxWaveCleared:S.maxWaveCleared,eq:S.eq,items:S.items,
      muted:S.muted,difficulty:S.difficulty,
      lifetime:S.lifetime,achievements:S.achievements,codexViewed:S.codexViewed,
    }));
  }catch(e){/* storage unavailable — progress just won't persist */}
}
function loadProgress(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw)return;
    const data=JSON.parse(raw);
    if(typeof data.maxWaveCleared==='number')S.maxWaveCleared=data.maxWaveCleared;
    if(Array.isArray(data.eq))S.eq=data.eq.filter(id=>MAT[id]).slice(0,4);
    if(data.items&&typeof data.items.potion==='number'&&typeof data.items.ether==='number')S.items=data.items;
    if(typeof data.muted==='boolean')S.muted=data.muted;
    if(typeof data.difficulty==='string'&&DIFFICULTIES[data.difficulty])S.difficulty=data.difficulty;
    if(data.lifetime&&typeof data.lifetime==='object')Object.assign(S.lifetime,data.lifetime);
    if(data.achievements&&typeof data.achievements==='object')S.achievements=data.achievements;
    if(typeof data.codexViewed==='boolean')S.codexViewed=data.codexViewed;
  }catch(e){/* corrupt or unavailable — keep defaults */}
}

const WAVES=[
  ['trooper','trooper','mech'],
  ['beast','alien'],
  ['mech','mech','boss'],
  ['beast','trooper','alien'],
  ['boss','alien','mech'],
  ['boss','boss'],
  ['seph'],
  ['echo'],
];

// ── PIXEL-ART SPRITES — hand-authored grids rendered to a low-res canvas
// and stretched with image-rendering:pixelated, replacing the old flat
// CSS-box body parts with actual shaded pixel art. ──
function rowFrom(width,segs,fill='.'){
  const a=new Array(width).fill(fill);
  segs.forEach(([s,e,ch])=>{for(let i=s;i<=e;i++)a[i]=ch;});
  return a;
}
function buildRows(width,specs){return specs.map(segs=>rowFrom(width,segs));}

const SPRITES={
  player:{pal:{R:'#2a8a62',S:'#eaf8f0',E:'#123322',W:'#8fe0c0',B:'#a8e6cf',D:'#5ec9a0',G:'#c8f0df'},
    rows:buildRows(16,[
      [],
      [[6,9,'R']],
      [[5,10,'R']],
      [[5,5,'R'],[6,9,'S'],[10,10,'R']],
      [[5,5,'R'],[6,9,'S'],[10,10,'R'],[7,7,'E'],[8,8,'E']],
      [[6,9,'S']],
      [[2,3,'W'],[6,9,'B'],[12,13,'W']],
      [[1,4,'W'],[5,10,'B'],[11,14,'W']],
      [[1,4,'W'],[5,10,'B'],[11,14,'W']],
      [[2,3,'W'],[5,5,'S'],[6,9,'D'],[10,10,'S'],[11,12,'W']],
      [[5,10,'D']],
      [[4,11,'B']],
      [[4,11,'B']],
      [[4,11,'D']],
      [[5,10,'B']],
      [[5,10,'D']],
      [[6,9,'B']],
      [],
      [[7,8,'G']],
      [[7,8,'G']],
    ])},
  trooper:{pal:{H:'#5a7aaa',V:'#7ecfff',B:'#4a6a9a',L:'#1a3a6a',R:'#2a4a7a'},
    rows:buildRows(16,[
      [[6,9,'H']],
      [[5,10,'H']],
      [[5,10,'H'],[6,9,'V']],
      [[6,9,'H']],
      [[5,10,'B']],
      [[5,10,'B'],[11,12,'R']],
      [[5,10,'B'],[12,13,'R']],
      [[5,10,'B'],[13,14,'R']],
      [[5,10,'B']],
      [[5,10,'B']],
      [[5,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
      [[5,7,'L'],[9,10,'L']],
    ])},
  mech:{pal:{C:'#3a3a0a',E:'#ff4f1f',A:'#2a2a0a',Ac:'#ff8c5a'},
    rows:buildRows(16,[
      [[6,9,'E']],
      [[5,10,'C']],
      [[5,10,'C'],[6,9,'Ac']],
      [[4,11,'C']],
      [[2,3,'A'],[4,11,'C'],[12,13,'A']],
      [[2,3,'A'],[4,11,'C'],[12,13,'A']],
      [[2,3,'A'],[4,11,'C'],[12,13,'A'],[7,8,'Ac']],
      [[2,3,'A'],[4,11,'C'],[12,13,'A']],
      [[4,11,'C']],
      [[4,11,'C']],
      [[5,10,'C']],
      [[5,10,'C']],
      [[5,7,'A'],[9,10,'A']],
      [[5,7,'A'],[9,10,'A']],
      [[5,7,'A'],[9,10,'A']],
      [[5,7,'A'],[9,10,'A']],
      [[5,7,'A'],[9,10,'A']],
      [[5,7,'A'],[9,10,'A']],
      [],
      [],
      [],
    ])},
  beast:{pal:{F:'#2a0a0a',M:'#3a1a1a',Ey:'#ff4f1f',T:'#1a0a0a'},
    rows:buildRows(16,[
      [[5,10,'M']],
      [[4,11,'M'],[5,5,'Ey'],[10,10,'Ey']],
      [[4,11,'M']],
      [[3,12,'F']],
      [[2,13,'F']],
      [[1,14,'F'],[14,15,'T']],
      [[1,14,'F'],[14,15,'T']],
      [[1,14,'F']],
      [[2,13,'F']],
      [[2,4,'T'],[6,9,'F'],[11,13,'T']],
      [[2,4,'T'],[11,13,'T']],
      [[2,4,'T'],[11,13,'T']],
      [[2,4,'T'],[11,13,'T']],
      [],
    ])},
  alien:{pal:{P:'#3a1a5a',Pl:'#2a0a4a',Ey:'#c05aff',Te:'#a03aff'},
    rows:buildRows(16,[
      [[6,9,'P']],
      [[5,10,'P'],[7,7,'Ey'],[8,8,'Ey']],
      [[5,10,'P']],
      [[6,9,'P']],
      [[5,10,'Pl']],
      [[4,11,'Pl'],[2,3,'Te'],[12,13,'Te']],
      [[4,11,'Pl'],[1,3,'Te'],[12,14,'Te']],
      [[4,11,'Pl'],[2,3,'Te'],[12,13,'Te']],
      [[5,10,'Pl'],[3,4,'Te'],[11,12,'Te']],
      [[5,10,'Pl']],
      [[6,9,'Pl']],
      [[6,9,'Pl']],
      [[6,9,'Pl']],
      [[6,9,'Pl']],
      [[6,9,'Pl']],
      [],
      [],
      [],
      [],
    ])},
  boss:{pal:{Bo:'#4a1a0a',Ey:'#ff4f1f',Sh:'#3a0a00',Ac:'#ff8c5a'},
    rows:buildRows(16,[
      [[6,9,'Bo']],
      [[5,10,'Bo'],[6,9,'Ey']],
      [[5,10,'Bo']],
      [[4,11,'Bo']],
      [[2,3,'Sh'],[4,11,'Bo'],[12,13,'Sh']],
      [[1,3,'Sh'],[4,11,'Bo'],[12,14,'Sh']],
      [[1,3,'Sh'],[4,11,'Bo'],[12,14,'Sh']],
      [[2,3,'Sh'],[4,11,'Bo'],[12,13,'Sh']],
      [[4,11,'Bo']],
      [[4,11,'Bo']],
      [[4,11,'Bo']],
      [[5,10,'Bo']],
      [[5,10,'Bo']],
      [[5,7,'Sh'],[9,10,'Sh']],
      [[5,7,'Sh'],[9,10,'Sh']],
      [[5,7,'Sh'],[9,10,'Sh']],
      [[5,7,'Sh'],[9,10,'Sh']],
      [[5,7,'Sh'],[9,10,'Sh']],
      [[5,7,'Sh'],[9,10,'Sh']],
    ])},
  seph:{pal:{Co:'#1a1a2e',Sk:'#e0e0f0',Ha:'#9090bb',Wg:'#242444',Bl:'#a0c0ff'},
    rows:buildRows(16,[
      [[7,8,'Sk']],
      [[6,9,'Sk']],
      [[6,9,'Sk']],
      [[6,9,'Sk']],
      [[7,8,'Ha']],
      [[6,9,'Co']],
      [[5,10,'Co'],[12,15,'Wg']],
      [[5,10,'Co'],[11,15,'Wg']],
      [[5,10,'Co'],[11,14,'Wg']],
      [[5,10,'Co'],[12,14,'Wg']],
      [[5,10,'Co'],[13,14,'Wg']],
      [[5,10,'Co']],
      [[5,10,'Co'],[13,13,'Bl']],
      [[5,10,'Co'],[13,13,'Bl']],
      [[5,10,'Co'],[13,13,'Bl']],
      [[5,10,'Co'],[13,13,'Bl']],
      [[5,10,'Co'],[13,13,'Bl']],
      [[5,10,'Co']],
      [[5,10,'Co']],
      [[5,10,'Co']],
      [[5,10,'Co']],
    ])},
};
function renderPixelSprite(canvas,key){
  const sp=SPRITES[key];if(!sp||!canvas)return;
  const rows=sp.rows,w=rows[0].length,h=rows.length;
  canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,w,h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const ch=rows[y][x];if(ch==='.')continue;
    ctx.fillStyle=sp.pal[ch]||'#fff';
    ctx.fillRect(x,y,1,1);
  }
}

// ── AMBIENT PARTICLES ──
(function initParticles(){
  const cv=document.getElementById('particle-cv');
  if(!cv)return;
  const ctx=cv.getContext('2d');
  let w=0,h=0,parts=[];
  function resize(){
    w=cv.width=cv.offsetWidth||window.innerWidth;
    h=cv.height=cv.offsetHeight||window.innerHeight;
  }
  function spawn(){
    const far=Math.random()<0.55;
    return{
      x:Math.random()*w,y:h+Math.random()*40,
      r:far?0.6+Math.random()*1.1:1.8+Math.random()*2.6,
      vy:far?0.12+Math.random()*0.22:0.35+Math.random()*0.7,
      vx:(Math.random()-0.5)*(far?0.25:0.5),
      a:far?0.08+Math.random()*0.14:0.18+Math.random()*0.32,
      hue:Math.random()<0.7?'168,230,207':'255,140,90',
      wob:Math.random()*Math.PI*2,
      blur:far?0:1+Math.random()*1.5,
    };
  }
  function init(){
    resize();
    const n=Math.min(70,Math.floor((w*h)/20000));
    parts=Array.from({length:n},()=>{const p=spawn();p.y=Math.random()*h;return p;});
  }
  function tickParticles(){
    ctx.clearRect(0,0,w,h);
    parts.forEach(p=>{
      p.wob+=0.02;
      p.y-=p.vy;p.x+=p.vx+Math.sin(p.wob)*0.15;
      if(p.y<-10){Object.assign(p,spawn());p.y=h+10;}
      if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;
      ctx.filter=p.blur?`blur(${p.blur}px)`:'none';
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.hue},${p.a})`;
      ctx.fill();
    });
    ctx.filter='none';
    requestAnimationFrame(tickParticles);
  }
  window.addEventListener('resize',resize);
  init();
  requestAnimationFrame(tickParticles);
})();

// ── LOG ──
function log(txt,cls='lo'){
  const b=document.getElementById('blog');
  const e=document.createElement('div');
  e.className=`log-entry ${cls}`;e.textContent=txt;b.appendChild(e);
  b.scrollTop=b.scrollHeight;
}

// ── DAMAGE ──
function elMod(el){
  if(!el||!S.enemy)return 1;
  if(S.enemy.weak.includes(el))return 1.5;
  if(S.enemy.res.includes(el))return 0.6;
  return 1;
}
function calcD(atk,def,mul,el){return Math.floor(atk*mul*elMod(el) - def*0.5 + Math.random()*8)}
function popD(d,cls,tar){
  const t=document.querySelector(tar);if(!t)return;
  const p=document.createElement('div');p.style.cssText=`
    position:absolute;left:${t.offsetLeft+t.offsetWidth/2}px;top:${t.offsetTop-20}px;
    font-family:Orbitron,sans-serif;font-weight:700;font-size:1.4rem;pointer-events:none;
    animation:popFl .8s ease both;z-index:100`;
  p.textContent=d;p.className=cls;
  const c={dp:'#00e676',dk:'#ff9800',dh:'#00ff88',dw:'#f7d84b',dr:'#8a8f96'}[cls]||'#fff';
  p.style.color=c;p.style.textShadow=`0 0 8px ${c}`;
  document.getElementById('arena').appendChild(p);
  const st=p.style;st.setProperty('--dur','0.8s');
}

// ── ANIMATIONS ──
function atkSlide(src,tgt){
  const s=document.querySelector('#'+src),t=document.querySelector('#'+tgt);
  s.classList.add('attack-'+(src==='cw-p'?'r':'l'));
  setTimeout(()=>s.classList.remove('attack-'+(src==='cw-p'?'r':'l')),500);
}
function hitFl(el){
  const e=document.querySelector('#'+el);e.classList.add('hit');
  setTimeout(()=>e.classList.remove('hit'),450);
}
function screenShake(){
  const b=document.getElementById('sc-battle');b.classList.add('shake');
  setTimeout(()=>b.classList.remove('shake'),400);
}
function shockwave(){
  const sw=document.getElementById('shockwave');sw.classList.add('go');
  setTimeout(()=>sw.classList.remove('go'),800);
}
function chromaFlash(){
  const ch=document.getElementById('chroma');ch.classList.add('go');
  setTimeout(()=>ch.classList.remove('go'),600);
}
function camPunch(){
  const a=document.getElementById('arena');a.classList.remove('punch');void a.offsetWidth;
  a.classList.add('punch');setTimeout(()=>a.classList.remove('punch'),350);
}
function impactBurst(sel,color,count=10){
  const arena=document.getElementById('arena');const t=document.querySelector(sel);
  if(!t||!arena)return;
  const ar=arena.getBoundingClientRect(),tr=t.getBoundingClientRect();
  const x=tr.left-ar.left+tr.width/2,y=tr.top-ar.top+tr.height/2;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    p.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:4px;height:4px;border-radius:50%;
      background:${color};box-shadow:0 0 6px ${color};pointer-events:none;z-index:150`;
    arena.appendChild(p);
    const ang=Math.random()*Math.PI*2,dist=18+Math.random()*38;
    const dx=Math.cos(ang)*dist,dy=Math.sin(ang)*dist;
    const anim=p.animate([
      {transform:'translate(-50%,-50%) scale(1)',opacity:1},
      {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0.3)`,opacity:0}
    ],{duration:380+Math.random()*260,easing:'ease-out'});
    anim.onfinish=()=>p.remove();
  }
}

// ── WEB AUDIO API — SOUND DESIGN ──
const AC=new(window.AudioContext||window.webkitAudioContext)();
document.addEventListener('pointerdown',()=>{if(AC.state==='suspended')AC.resume();},{once:true});
function playHit(){
  if(S.muted)return;
  const o=AC.createOscillator(),g=AC.createGain();
  o.type='sine';o.frequency.setValueAtTime(200,AC.currentTime);
  o.frequency.exponentialRampToValueAtTime(80,AC.currentTime+0.1);
  g.gain.setValueAtTime(0.3,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.12);
  o.connect(g);g.connect(AC.destination);
  o.start(AC.currentTime);o.stop(AC.currentTime+0.12);
}
function playCrit(){
  if(S.muted)return;
  const o=AC.createOscillator(),g=AC.createGain();
  o.type='triangle';o.frequency.setValueAtTime(350,AC.currentTime);
  o.frequency.exponentialRampToValueAtTime(150,AC.currentTime+0.15);
  g.gain.setValueAtTime(0.4,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+0.2);
  o.connect(g);g.connect(AC.destination);
  o.start(AC.currentTime);o.stop(AC.currentTime+0.2);
}
function playMagic(el){
  if(S.muted)return;
  const freqs={fire:320,ice:240,thunder:400,wind:280,all:300,restore:350,dark:180};
  const f=freqs[el]||250;
  const o=AC.createOscillator(),g=AC.createGain(),f2=AC.createBiquadFilter();
  o.type='square';o.frequency.setValueAtTime(f,AC.currentTime);
  o.frequency.exponentialRampToValueAtTime(f*1.8,AC.currentTime+0.08);
  o.frequency.exponentialRampToValueAtTime(f*0.5,AC.currentTime+0.16);
  f2.type='lowpass';f2.frequency.setValueAtTime(1200,AC.currentTime);
  g.gain.setValueAtTime(0.25,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+0.18);
  o.connect(f2);f2.connect(g);g.connect(AC.destination);
  o.start(AC.currentTime);o.stop(AC.currentTime+0.18);
}
function playLimitSound(){
  if(S.muted)return;
  const o=AC.createOscillator(),g=AC.createGain();
  o.type='sawtooth';o.frequency.setValueAtTime(500,AC.currentTime);
  o.frequency.exponentialRampToValueAtTime(800,AC.currentTime+0.1);
  o.frequency.exponentialRampToValueAtTime(200,AC.currentTime+0.25);
  g.gain.setValueAtTime(0.35,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+0.3);
  o.connect(g);g.connect(AC.destination);
  o.start(AC.currentTime);o.stop(AC.currentTime+0.3);
}

// ── ENEMY LOGIC ──
function checkTaunts(){
  const list=ENEMY_TAUNTS[S.enemy.spr];if(!list)return;
  const pct=(S.enemy.hp/S.enemy.maxHp)*100;
  list.forEach(t=>{
    if(!S.tauntFired.has(t.at)&&pct<=t.at){
      S.tauntFired.add(t.at);
      log(t.txt,t.spk==='p'?'ltp':'lta');
    }
  });
}
function applyED(d){
  if(S.over)return;
  S.enemy.hp-=d;
  if(S.enemy.hp<=0)S.enemy.hp=0;
  checkTaunts();
  if(S.enemy.hp<=0&&!S.over){S.over=true;onWin();}
  updateBars();
}
function dealToPlayer(d){
  if(S.player.wall)d=Math.floor(d*0.5);
  if(d>0)S.battleFlags.tookDamage=true;
  S.player.hp-=d;
  if(S.player.hp>0&&S.player.hp/S.player.maxHp<0.15)S.battleFlags.wasLowHp=true;
  if(S.player.hp<=0){S.player.hp=0;S.over=true;onLose();}
  if(S.player.wall){
    S.player.wallT--;
    if(S.player.wallT<=0){S.player.wall=false;removeStatus('p-status','wall');}
  }
  return d;
}
function enemyAtkHit(mult,cls,verb){
  atkSlide('cw-e','cw-p');
  const crit=Math.random()<0.12;
  const atk=S.eStatus.weaken?S.enemy.atk*0.7:S.enemy.atk;
  let d=calcD(atk,S.player.def,mult);if(crit)d=Math.floor(d*1.5);
  playHit();
  setTimeout(()=>{
    hitFl('cw-p');impactBurst('#cw-p','#ff4f1f',crit?14:7);if(crit)camPunch();
    d=dealToPlayer(d);
    log(`${S.enemy.name} ${verb} for ${d}!`,cls);updateBars();chkEnd();
  },230);
}
function enemyTurn(){
  if(S.over)return;
  if(S.eStatus.slow){
    S.eStatus.slow.t--;
    if(S.eStatus.slow.t<=0){delete S.eStatus.slow;removeStatus('e-status','slow');}
  }
  if(S.eStatus.weaken){
    S.eStatus.weaken.t--;
    if(S.eStatus.weaken.t<=0){delete S.eStatus.weaken;removeStatus('e-status','weaken');}
  }
  if(S.enemy.mp>=10&&Math.random()<0.3){
    S.enemy.mp-=10;playMagic('dark');
    enemyAtkHit(1.15,'ls','casts a dark bolt');
    if(!S.pStatus.silence&&Math.random()<0.4){
      S.pStatus.silence={t:1};
      addStatus('p-status','silence','🔇 Silenced');
      setTimeout(()=>log('🔇 The dark bolt leaves your fingers numb — spells falter next turn.','lm'),260);
    }
    return;
  }
  if(S.enemy.hp<S.enemy.maxHp*0.35&&Math.random()<0.35){
    const heal=Math.floor(S.enemy.maxHp*0.15);
    S.enemy.hp=Math.min(S.enemy.maxHp,S.enemy.hp+heal);
    log(`${S.enemy.name} regenerates ${heal} HP!`,'lh');
    updateBars();chkEnd();
    return;
  }
  enemyAtkHit(0.95,'ls','attacks');
}
function chLim(v){S.player.limit=Math.min(100,S.player.limit+v);updateBars()}
function chkEnd(){if(S.over){clearInterval(S.atbT)}}

// ── MATCH ──
function startBattle(){
  if(S.wave>WAVES.length)S.wave=1;
  const wave=WAVES[Math.min(S.wave-1,WAVES.length-1)];
  const eName=wave[Math.floor(Math.random()*wave.length)];
  const e=ENEMIES[eName];
  const scale=(1+(S.wave-1)*0.05)*DIFFICULTIES[S.difficulty].mult;
  const hp=Math.round(e.hp*scale),atk=Math.round(e.atk*scale);
  const w={...e,hp,atk,maxHp:hp};
  S.enemy=w;S.over=false;S.pTurn=false;S.pAtb=0;S.eAtb=0;S.streak=0;S.tauntFired=new Set();
  S.player.hp=100;S.player.mp=50;S.player.limit=0;S.player.wall=false;S.player.wallT=0;
  S.pStatus={};S.eStatus={};
  S.stats={dealt:0,crits:0,spells:0,bestHit:0};
  S.battleFlags={tookDamage:false,wasLowHp:false};
  buildEnemySprite(w.spr);
  document.getElementById('b-ename').textContent='⚔ '+w.name;
  document.getElementById('arena-ename').textContent=w.name;
  document.getElementById('arena-tint').style.background=ARENA_TINTS[w.spr]||'rgba(255,79,31,0.12)';
  document.getElementById('glow-p').style.background=
    `radial-gradient(ellipse at center,${GLOW_P_COLS[w.spr]||'var(--willow-glow)'} 0%,transparent 72%)`;
  buildSegBars();renderLoadout();updateWeakRow();updateBars();
  document.getElementById('blog').innerHTML='';
  document.getElementById('p-status').innerHTML='';
  document.getElementById('e-status').innerHTML='';
  
  // Initialize turn indicators
  document.getElementById('p-turn-ind').classList.remove('active');
  document.getElementById('e-turn-ind').classList.add('active');
  
  showSc('sc-battle');
  log('BATTLE START — '+w.name+' appears!','ls');
  if(WAVE_STORY[S.wave-1])log(WAVE_STORY[S.wave-1],'lm');
  if(S.combo)log(`✨ ${S.combo.icon} ${S.combo.name} armed!`,'lc');
  log('🧚 Noom Wolliw takes the field.','lo');
  if(S.wave===7){
    log('🗡️ "The willow forgets no one." — Ashveil','ls');
    log('🧚 She knows that voice. She wishes she didn\'t.','lo');
  }
  if(S.wave===8){
    log('👻 The voice again — same words, same weight, wrong eyes.','ls');
    log('🧚 "You\'re not him." Her hand doesn\'t shake this time.','lo');
  }
  clearInterval(S.atbT);S.atbT=setInterval(tick,75);
}

function buildEnemySprite(spr){
  const c=document.getElementById('enemy-spr');
  const cls={trooper:'se-trooper',mech:'se-mech',beast:'se-beast',alien:'se-alien',boss:'se-boss',seph:'se-seph'}[spr]||'se-boss';
  const sizes={trooper:{w:48,h:64},mech:{w:52,h:68},beast:{w:60,h:54},alien:{w:60,h:70},boss:{w:68,h:80},seph:{w:70,h:90}};
  const sz=sizes[spr]||{w:60,h:70};
  c.className=`spr-e ${cls}`;c.style.width=sz.w+'px';c.style.height=sz.h+'px';c.innerHTML='';
  if(spr==='boss'||spr==='seph'){
    const aura=document.createElement('div');aura.className=spr==='boss'?'eb2-aura':'es-aura';c.appendChild(aura);
  }
  const cv=document.createElement('canvas');cv.className='pix-cv';c.appendChild(cv);
  renderPixelSprite(cv,spr);
}

// ── SEGMENTED PIP BARS ──
const SEGS={hp:20,mp:12,atb:10,lim:10};
function buildSegBars(){
  ['p-hp-t','p-mp-t','p-atb-t','p-lim-t','e-hp-t','e-atb-t'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;el.innerHTML='';
    const key=id.includes('hp')?'hp':id.includes('mp')?'mp':id.includes('atb')?'atb':'lim';
    const n=SEGS[key]||10;
    for(let i=0;i<n;i++){const s=document.createElement('div');s.className='bseg off';el.appendChild(s);}
  });
}
function updateBars(){
  const p=S.player,e=S.enemy;
  updSeg('p-hp-t',p.hp,p.maxHp,'hp');
  updSeg('p-mp-t',p.mp,p.maxMp,'mp');
  updSeg('p-atb-t',S.pAtb,100,'atb');
  updSeg('p-lim-t',p.limit,100,'lim');
  updSeg('e-hp-t',Math.max(0,e.hp),e.maxHp,'hp',true);
  updSeg('e-atb-t',S.eAtb,100,'atb',true);
  document.getElementById('p-hp-v').textContent=`${Math.max(0,p.hp)}/${p.maxHp}`;
  document.getElementById('p-mp-v').textContent=`${Math.max(0,p.mp)}/${p.maxMp}`;
  document.getElementById('p-atb-pct').textContent=Math.floor(S.pAtb)+'%';
  document.getElementById('p-lim-pct').textContent=Math.floor(p.limit)+'%';
  document.getElementById('e-hp-v').textContent=`${Math.max(0,e.hp)}/${e.maxHp}`;
  document.getElementById('e-atb-pct').textContent=Math.floor(S.eAtb)+'%';
  const pAtbT=document.getElementById('p-atb-t');pAtbT.className='btrack'+(S.pTurn?' atb-ready':'');
  const eAtbT=document.getElementById('e-atb-t');eAtbT.className='btrack'+(S.eAtb>=90?' atb-ready-e':'');
  // Turn indicators
  const pTI=document.getElementById('p-turn-ind');
  const eTI=document.getElementById('e-turn-ind');
  if(pTI && eTI){
    if(S.pTurn){pTI.classList.add('active');eTI.classList.remove('active');}
    else{pTI.classList.remove('active');eTI.classList.add('active');}
  }
}
function updSeg(id,val,max,type,enemy=false){
  const el=document.getElementById(id);if(!el)return;
  const segs=el.querySelectorAll('.bseg');if(!segs.length)return;
  const filled=Math.round((val/max)*segs.length);
  const pct=val/max;
  segs.forEach((s,i)=>{
    if(i<filled){
      if(type==='hp'){s.className='bseg on-hp'+(pct<0.26?' lo':pct<0.51?' mid':'');}
      else if(type==='mp'){s.className='bseg on-mp';}
      else if(type==='atb'){s.className=`bseg ${enemy?'on-atbe':'on-atb'}`;}
      else if(type==='lim'){s.className='bseg on-lim';}
    } else s.className='bseg off';
  });
}

function renderLoadout(){
  const r=document.getElementById('lo-row');r.innerHTML='';
  S.eq.forEach(id=>{const m=MAT[id];const d=document.createElement('div');d.className='lo-orb';
    d.style.background=m.col+'22';d.style.borderColor=m.col+'55';d.textContent=m.icon;r.appendChild(d);});
  if(S.combo){const s=document.createElement('span');s.className='lo-combo';s.textContent='✨'+S.combo.name;r.appendChild(s);}
}
function updateWeakRow(){
  const e=S.enemy,p=[];
  if(e.weak.length)p.push(`Weak: ${e.weak.map(w=>`<span class="w">${w}</span>`).join(', ')}`);
  if(e.res.length)p.push(`Resist: ${e.res.map(r=>`<span class="r">${r}</span>`).join(', ')}`);
  document.getElementById('weak-row').innerHTML=p.join(' · ');
}

// ── TICK ──
function tick(){
  if(S.over)return;
  if(!S.pTurn){S.pAtb+=S.player.spd*2.2;if(S.pAtb>=100){S.pAtb=100;S.pTurn=true;onReady();}}
  S.eAtb+=S.enemy.spd*1.9*(S.eStatus.slow?0.55:1);
  if(S.eAtb>=100&&!S.over){S.eAtb=0;enemyTurn();}
  updateBars();
}
function onReady(){
  const l=document.getElementById('atb-lbl');l.textContent='★ READY — PLAY A CARD';l.className='rdy';
  renderHand();
  if(Math.random()<0.18){const ln=PERSONAL[S.lineIdx%PERSONAL.length];S.lineIdx++;setTimeout(()=>log(ln,'lo'),300);}
}

// ── ACTIONS ──
function endTurn(){
  S.pTurn=false;S.pAtb=0;S.pendingCard=null;
  if(S.pStatus.silence){
    S.pStatus.silence.t--;
    if(S.pStatus.silence.t<=0){delete S.pStatus.silence;removeStatus('p-status','silence');}
  }
  const l=document.getElementById('atb-lbl');l.textContent='ATB CHARGING...';l.className='wait';
  document.getElementById('arow').innerHTML='';
}

// ── UNO HAND — CARD-BASED ACTION SELECT ──
function buildHand(){
  const hand=[
    {kind:'atk',name:'Strike',icon:'⚔',col:'#9aa5b1',mp:0,el:null,pow:30},
    {kind:'atk',name:'Wild',icon:'🌈',col:'#c05aff',mp:10,el:'all',pow:26},
    {kind:'drawtwo',name:'Draw Two',icon:'✌️',col:'#ff5e5e',mp:6},
  ];
  if(S.combo){
    hand.push({kind:'combo',name:S.combo.name,icon:S.combo.icon,col:'#f7d84b',mp:S.combo.mp});
  }else{
    S.eq.forEach(id=>{
      const m=MAT[id];
      hand.push({kind:m.type==='heal'?'heal':m.type==='buff'?'buff':'dmg',
        name:m.name,icon:m.icon,col:m.col,mp:m.mp,pow:m.pow,el:m.el});
    });
  }
  if(S.player.limit>=100)hand.push({kind:'limit',name:'Willowbloom',icon:'🌸',col:'#ff6d00',mp:0});
  return hand;
}
function renderHand(){
  S.pendingCard=null;
  const r=document.getElementById('arow');r.innerHTML='';
  const handWrap=document.createElement('div');handWrap.className='uno-hand';
  S.hand=buildHand();
  S.hand.forEach(card=>{
    const low=card.mp>0&&S.player.mp<card.mp;
    const silenced=S.pStatus.silence&&!['atk','drawtwo'].includes(card.kind);
    const dis=low||silenced;
    const c=document.createElement('div');c.className='uno-card'+(dis?' disabled':'');
    c.style.setProperty('--card-col',card.col);
    c.innerHTML=`<div class="uc-corner">${card.icon}</div><div class="uc-icon">${card.icon}</div>`+
      `<div class="uc-name">${card.name}</div>${silenced?'<div class="uc-mp">SILENCED</div>':card.mp?`<div class="uc-mp">${card.mp}MP</div>`:''}`;
    if(!dis)c.onclick=()=>selectCard(card);
    handWrap.appendChild(c);
  });
  if(S.items.potion>0){const b=document.createElement('button');b.className='act act-itm';b.style.minWidth='110px';
    b.innerHTML=`🧪 POTION×${S.items.potion}<span class="act-sub">+150 HP</span>`;b.onclick=doPotion;handWrap.appendChild(b);}
  if(S.items.ether>0){const b=document.createElement('button');b.className='act act-itm';b.style.minWidth='110px';
    b.innerHTML=`🧿 ETHER×${S.items.ether}<span class="act-sub">+40 MP</span>`;b.onclick=doEther;handWrap.appendChild(b);}
  r.appendChild(handWrap);
}
function selectCard(card){
  if(!S.pTurn||S.over)return;
  if(card.mp>0&&S.player.mp<card.mp)return;
  if(card.kind==='buff'||card.kind==='limit'){resolveCard(card,1,'');return;}
  S.pendingCard=card;S.dice=[1,1,1,1,1];S.held=[false,false,false,false,false];S.rollsLeft=3;S.rolled=false;S.spinning=false;
  drawDiceUI(card);
}

// ── YAHTZEE DICE — POWER ROLL ──
const PIP_LAYOUTS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function pipHTML(v){
  const cells=PIP_LAYOUTS[v]||[];
  let html='<div class="pip-grid">';
  for(let i=0;i<9;i++)html+=`<span class="pip${cells.includes(i)?' on':''}"></span>`;
  return html+'</div>';
}
function scoreDice(dice){
  const counts={};dice.forEach(v=>counts[v]=(counts[v]||0)+1);
  const vals=Object.values(counts).sort((a,b)=>b-a);
  const uniq=Object.keys(counts).map(Number);
  const has=seq=>seq.every(v=>uniq.includes(v));
  if(vals[0]===5)return{mult:2.5,label:'YAHTZEE!!'};
  if(vals[0]===4)return{mult:1.8,label:'FOUR OF A KIND'};
  if(vals[0]===3&&vals[1]===2)return{mult:1.5,label:'FULL HOUSE'};
  if(has([1,2,3,4,5])||has([2,3,4,5,6]))return{mult:1.4,label:'LARGE STRAIGHT'};
  if(has([1,2,3,4])||has([2,3,4,5])||has([3,4,5,6]))return{mult:1.25,label:'SMALL STRAIGHT'};
  if(vals[0]===3)return{mult:1.15,label:'THREE OF A KIND'};
  if(vals[0]===2&&vals[1]===2)return{mult:1.05,label:'TWO PAIR'};
  return{mult:0.85,label:'BUST'};
}
function drawDiceUI(card){
  const r=document.getElementById('arow');r.innerHTML='';
  const wrap=document.createElement('div');wrap.className='dice-panel';
  const info=document.createElement('div');info.className='dice-info';
  const spinning=!!S.spinning;
  const sc=S.rolled&&!spinning?scoreDice(S.dice):{mult:1,label:spinning?'ROLLING...':'ROLL TO BEGIN'};
  const momentum=1+Math.min(S.streak,5)*0.03;
  const streakTag=S.streak>0?` <span style="color:var(--thunder)">🔥×${momentum.toFixed(2)}</span>`:'';
  info.innerHTML=`<span>${card.icon} ${card.name} — roll for power${streakTag}</span><span class="dice-score">${sc.label} ×${sc.mult.toFixed(2)}</span>`;
  wrap.appendChild(info);
  const row=document.createElement('div');row.className='dice-row';
  S.dice.forEach((v,i)=>{
    const spin=spinning&&!S.held[i];
    const d=document.createElement('div');d.className='die'+(S.held[i]?' held':'')+(spin?' rolling':'');
    d.innerHTML=(S.rolled||spinning)?pipHTML(v):'<span class="die-q">?</span>';
    if(S.rolled&&!spinning&&S.rollsLeft>0)d.onclick=()=>{S.held[i]=!S.held[i];drawDiceUI(card);};
    row.appendChild(d);
  });
  wrap.appendChild(row);
  const btns=document.createElement('div');btns.className='dice-btns';
  const rollBtn=document.createElement('button');rollBtn.className='act act-mag';
  rollBtn.textContent=spinning?'🎲 ROLLING...':S.rollsLeft>0?`🎲 ROLL (${S.rollsLeft} left)`:'NO ROLLS LEFT';
  rollBtn.disabled=spinning||S.rollsLeft<=0;rollBtn.onclick=()=>doRoll(card);
  const confirmBtn=document.createElement('button');confirmBtn.className='act act-atk';
  confirmBtn.textContent='✓ LOCK IN';confirmBtn.disabled=spinning||!S.rolled;
  confirmBtn.onclick=()=>{const s=scoreDice(S.dice);resolveCard(card,s.mult,s.label);};
  const backBtn=document.createElement('button');backBtn.className='act act-itm';
  backBtn.disabled=spinning;
  backBtn.textContent='↩ CHOOSE ANOTHER';backBtn.onclick=renderHand;
  btns.appendChild(rollBtn);btns.appendChild(confirmBtn);btns.appendChild(backBtn);
  wrap.appendChild(btns);
  r.appendChild(wrap);
}
function doRoll(card){
  if(S.rollsLeft<=0||S.spinning)return;
  S.rollsLeft--;
  playHit();
  const finalDice=S.dice.map((v,i)=>S.held[i]?v:1+Math.floor(Math.random()*6));
  S.spinning=true;
  let ticks=0;
  const tumble=setInterval(()=>{
    ticks++;
    S.dice=S.dice.map((v,i)=>S.held[i]?v:1+Math.floor(Math.random()*6));
    drawDiceUI(card);
    if(ticks>=7){
      clearInterval(tumble);
      S.dice=finalDice;S.rolled=true;S.spinning=false;
      playHit();
      drawDiceUI(card);
    }
  },65);
}

// ── CARD RESOLUTION ──
function resolveCard(card,mult,label){
  if(!S.pTurn||S.over)return;
  endTurn();
  if(card.mp>0)S.player.mp-=card.mp;
  let tag=label?` — ${label}`:'';
  if(label){
    const momentum=1+Math.min(S.streak,5)*0.03;
    if(momentum>1){mult*=momentum;tag+=` (streak ×${momentum.toFixed(2)})`;}
    if(label==='BUST')S.streak=0;else S.streak=Math.min(S.streak+1,5);
  }
  switch(card.kind){
    case 'atk':{
      atkSlide('cw-p','cw-e');
      const d=calcD(S.player.atk,S.enemy.def,mult,card.el);
      const crit=mult>=1.8;
      if(crit){S.stats.crits++;playCrit();}else playHit();
      setTimeout(()=>{hitFl('cw-e');impactBurst('#cw-e',crit?'#ffd700':'#ff8c5a',crit?16:8);if(crit)camPunch();
        S.stats.dealt+=d;if(d>S.stats.bestHit)S.stats.bestHit=d;
        applyED(d);
        log(`${card.icon} ${card.name}${tag} hits for ${d}!`,crit?'lk':'lp');
        chLim(crit?18:12);chkEnd();},230);
      break;
    }
    case 'dmg':{
      S.stats.spells++;playMagic(card.el);
      let d=calcD(S.player.atk,S.enemy.def,(card.pow/30)*mult,card.el);
      if(card.el==='all')d=Math.floor(d*0.7);
      const weak=S.enemy.weak.includes(card.el),res=S.enemy.res.includes(card.el);
      popD(d,weak?'dw':res?'dr':'dp','cw-e');
      impactBurst('#cw-e',card.col,weak?14:8);
      if(weak){
        screenShake();camPunch();log(`${card.icon} ${card.name}${tag} — WEAKNESS! hits for ${d}!`,'lk');
        if(!S.lifetime.weakElements.includes(card.el)){S.lifetime.weakElements.push(card.el);checkAchievements();}
      }
      else if(res)log(`${card.icon} ${card.name}${tag} — resisted... hits for ${d}.`,'lm');
      else log(`${card.icon} ${card.name}${tag} hits for ${d}!`,'lm');
      S.stats.dealt+=d;if(d>S.stats.bestHit)S.stats.bestHit=d;
      applyED(d);
      if(card.el==='ice'&&!S.over&&!S.eStatus.slow){
        S.eStatus.slow={t:3};
        addStatus('e-status','slow','❄️ Slowed');
        log('❄ The chill sinks into its joints — it slows.','lm');
      }
      if(card.el==='thunder'&&!S.over&&S.eAtb>0){
        S.eAtb=0;updateBars();
        log('⚡ The jolt scrambles its rhythm — its charge resets!','lm');
      }
      if(card.el==='wind'&&!S.over&&!S.eStatus.weaken){
        S.eStatus.weaken={t:3};
        addStatus('e-status','weaken','💨 Weakened');
        log('💨 The gale tears at its footing — its next blows will land soft.','lm');
      }
      chLim(weak?12:8);chkEnd();
      break;
    }
    case 'heal':{
      playMagic('restore');
      const a=Math.floor((card.pow+30)*mult);
      S.player.hp=Math.min(S.player.maxHp,S.player.hp+a);
      popD(a,'dh','cw-p');impactBurst('#cw-p',card.col,10);log(`${card.icon} ${card.name}${tag} restores ${a} HP!`,'lh');
      updateBars();chkEnd();
      break;
    }
    case 'drawtwo':{
      let total=0;
      const strike=()=>{if(S.over)return;const d=calcD(S.player.atk,S.enemy.def,0.7*mult);total+=d;
        S.stats.dealt+=d;if(d>S.stats.bestHit)S.stats.bestHit=d;
        popD(d,'dk','cw-e');impactBurst('#cw-e','#ff5e5e',10);applyED(d);playHit();};
      atkSlide('cw-p','cw-e');
      setTimeout(strike,120);
      setTimeout(()=>{strike();
        log(`✌️ Draw Two${tag} deals ${total}!`,'lk');
        chLim(20);chkEnd();},320);
      break;
    }
    case 'combo':{
      playMagic('fire');playLimitSound();
      let total=0;
      const strike=()=>{if(S.over)return;const d=calcD(S.player.atk*1.2,S.enemy.def,(S.combo.mat.length/4)*mult);total+=d;
        S.stats.dealt+=d;if(d>S.stats.bestHit)S.stats.bestHit=d;
        popD(d,'dk','cw-e');impactBurst('#cw-e','#ff8c5a',12);applyED(d);playHit();};
      setTimeout(()=>{screenShake();camPunch();strike();},100);
      setTimeout(()=>{atkSlide('cw-p','cw-e');strike();},250);
      setTimeout(()=>{strike();},400);
      setTimeout(()=>{
        log(`✨ ${S.combo.icon} ${S.combo.name}${tag} deals ${total}!`,'lk');
        chLim(30);chkEnd();},500);
      break;
    }
    case 'buff':{
      S.player.wallT=4;
      if(!S.player.wall){S.player.wall=true;addStatus('p-status','wall','🛡️ Wall');}
      impactBurst('#cw-p',card.col,10);log(`${card.icon} Wall rises!`,'lh');
      updateBars();
      break;
    }
    case 'limit':{
      S.player.limit=0;
      screenShake();camPunch();chromaFlash();playLimitSound();shockwave();
      setTimeout(()=>{
        let d=calcD(S.player.atk*2.5,S.enemy.def,1.5);
        popD(d,'dk','cw-e');impactBurst('#cw-e','#ff6d00',26);
        log(`🌸 WILLOWBLOOM! ${d} damage!`,'lk');
        S.stats.dealt+=d;if(d>S.stats.bestHit)S.stats.bestHit=d;
        applyED(d);chkEnd();
      },300);
      break;
    }
  }
}
function doPotion(){
  if(!S.pTurn||S.over||S.items.potion<1)return;endTurn();
  S.items.potion--;const a=150;S.player.hp=Math.min(S.player.maxHp,S.player.hp+a);
  popD(a,'dh','cw-p');impactBurst('#cw-p','#4cff9f',10);log('🧪 Potion restores '+a+' HP!','lh');updateBars();chkEnd();
  saveProgress();
}
function doEther(){
  if(!S.pTurn||S.over||S.items.ether<1)return;endTurn();
  S.items.ether--;const a=40;S.player.mp=Math.min(S.player.maxMp,S.player.mp+a);
  log('🧿 Ether restores '+a+' MP!','lh');updateBars();chkEnd();
  saveProgress();
}
function addStatus(row,type,label){
  const r=document.getElementById(row);if(!r)return;
  const e=document.createElement('div');e.className=`sbadge ${type}`;e.textContent=label;r.appendChild(e);
}
function removeStatus(row,type){
  const r=document.getElementById(row);if(!r)return;
  const b=r.querySelector('.sbadge.'+type);if(b)b.remove();
}

// ── RESULTS ──
function onWin(){
  clearInterval(S.atbT);
  log(`✨ ${S.enemy.name} defeated!`,'lc');
  log(`📊 Dealt ${S.stats.dealt} damage. ${S.stats.crits} critical hits!`,'lm');
  const clearedWave=S.wave;
  S.maxWaveCleared=Math.max(S.maxWaveCleared,clearedWave);
  S.lifetime.wins++;S.lifetime.dealt+=S.stats.dealt;S.lifetime.crits+=S.stats.crits;
  S.lifetime.bestHit=Math.max(S.lifetime.bestHit,S.stats.bestHit);
  unlockAch('first_blood');
  if(!S.battleFlags.tookDamage)unlockAch('flawless');
  if(S.battleFlags.wasLowHp)unlockAch('comeback');
  if(clearedWave===8)unlockAch('trueending');
  checkAchievements();
  saveProgress();
  const wasFinal=clearedWave===7;
  const wasEcho=clearedWave===8;
  S.wave++;
  if(wasFinal){
    setTimeout(()=>log('🏆 Ashveil falls, and the last wing folds still.','lk'),1200);
    setTimeout(()=>log('🧚 "...I know," he said. It was the last true thing he ever told her.','lo'),2600);
    setTimeout(()=>log('📖 The untzee shard in Wolliw\'s wing flares once, then settles into an ordinary, quiet light.','lm'),4000);
    setTimeout(()=>log('📖 The Hollow Court\'s legions scatter without their general. The willow, at long last, stops waiting.','lm'),5400);
    setTimeout(()=>showSc('sc-prep'),7400);
  }else if(wasEcho){
    setTimeout(()=>log('🏆 The echo scatters like startled light, and doesn\'t come back.','lk'),1200);
    setTimeout(()=>log('🧚 "Rest now," she tells it — tells him — tells whatever is left. "I did."','lo'),2600);
    setTimeout(()=>log('📖 The shard goes quiet for good this time. The willow was right: it forgets no one, but it can still let go.','lm'),4200);
    setTimeout(()=>showSc('sc-prep'),6200);
  }else{
    setTimeout(()=>showSc('sc-prep'),2000);
  }
}
function onLose(){
  clearInterval(S.atbT);
  log(`💔 Noom Wolliw was defeated...`,'ls');
  log(`📖 The shard dims, but doesn't go dark. There will be another fight.`,'lm');
  log(`📊 Made it to Wave ${S.wave}.`,'lm');
  S.wave=1;
  setTimeout(()=>{showSc('sc-prep');},2000);
}

// ── SCREENS ──
function showSc(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── COMBOS ──
function computeCombo(){
  const have=new Set(S.eq);
  S.combo=null;
  for(const key of Object.keys(COMBOS)){
    const need=[...new Set(COMBOS[key].mat)];
    if(need.every(el=>have.has(el))){S.combo=COMBOS[key];break;}
  }
}

// ── TITLE SCREEN ──
function revealWaveSelect(){
  const grid=document.getElementById('wave-grid');grid.innerHTML='';
  const maxWave=S.maxWaveCleared>=7?8:7;
  for(let i=1;i<=maxWave;i++){const b=document.createElement('div');b.className='t-wb';
    b.textContent=i===8?'WAVE 8 ✦':`WAVE ${i}`;b.onclick=()=>{S.wave=i;showPrep();};grid.appendChild(b);}
  document.getElementById('t-waves').classList.add('show');
}
function toggleLore(){
  const l=document.getElementById('t-lore');
  if(l.classList.contains('show')){l.classList.remove('show');return;}
  l.innerHTML=STORY_OPEN.map(p=>`<p style="margin-bottom:8px">${p}</p>`).join('');
  l.classList.add('show');
}

// ── PREP SCREEN ──
function showPrep(){
  computeCombo();
  const diffEl=document.getElementById('diff-btns');diffEl.innerHTML='';
  Object.keys(DIFFICULTIES).forEach(id=>{
    const b=document.createElement('button');b.className='diff-btn'+(S.difficulty===id?' active':'');
    b.textContent=DIFFICULTIES[id].label;
    b.onclick=()=>{S.difficulty=id;saveProgress();showPrep();};
    diffEl.appendChild(b);
  });
  const slots=document.getElementById('slot-row');slots.innerHTML='';
  for(let i=0;i<4;i++){
    const sl=document.createElement('div');sl.className='slot'+(i<S.eq.length?' filled':'');
    if(i<S.eq.length){sl.textContent=MAT[S.eq[i]].icon;
      sl.onclick=()=>{S.eq.splice(i,1);showPrep();}
      const x=document.createElement('div');x.className='slot-x';x.textContent='✕';sl.appendChild(x);
    }else{sl.textContent='─';
      sl.onclick=()=>{
        const g=document.getElementById('mat-grid').querySelectorAll('.mat-orb');
        g.forEach(mo=>{const id=Array.from(g).indexOf(mo);mo.onclick=()=>{S.eq.push(Object.keys(MAT)[id]);showPrep();};});
      };
    }
    slots.appendChild(sl);
  }

  const mats=document.getElementById('mat-grid');mats.innerHTML='';
  Object.keys(MAT).forEach(id=>{
    const m=MAT[id];const o=document.createElement('div');o.className='mat-orb';
    o.style.background=m.col+'22';o.style.borderColor=m.col+'55';
    o.innerHTML=`<span class="mi">${m.icon}</span><span class="mn">${m.name}</span><span class="mc">${m.mp}MP</span>`;
    o.onclick=()=>{if(S.eq.length<4&&!S.eq.includes(id)){S.eq.push(id);showPrep();}};
    mats.appendChild(o);
  });

  const el=document.getElementById('enemy-list');el.innerHTML='';
  Object.keys(ENEMIES).forEach(id=>{
    if(id==='echo'&&S.maxWaveCleared<7)return;
    const e=ENEMIES[id];
    const ew=document.createElement('div');ew.className='ei-wrap';
    ew.innerHTML=`<div class="ei-emj">${{trooper:'🪖',mech:'⚙️',beast:'🦾',alien:'👽',boss:'💣',seph:'⚔️',echo:'👻'}[id]}</div>
      <div><div class="ei-name">${e.name}</div><div class="ei-st">HP: <b>${e.hp}</b> ATK: <b>${e.atk}</b> DEF: <b>${e.def}</b></div>
      ${ENEMY_FLAVOR[id]?`<div class="ei-tip" style="margin:4px 0 0">${ENEMY_FLAVOR[id]}</div>`:''}
      ${e.weak.length?`<div class="ei-tags">${e.weak.map(w=>`<div class="ei-tag">Weak: ${w}</div>`).join('')}</div>`:''}
      </div>`;
    el.appendChild(ew);
  });

  const cg=document.createElement('div');cg.className='ei-wrap';cg.style.background='rgba(0,0,0,0.5)';
  cg.style.borderColor='var(--thunder)';
  cg.innerHTML=`<div class="ei-emj">✨</div><div><div class="ei-name" style="color:var(--thunder)">Combos</div>
    <div class="ei-st">Equip every orb a fusion needs to unlock its card in battle.</div>
    ${Object.keys(COMBOS).map(cid=>{const c=COMBOS[cid];const need=[...new Set(c.mat)];
      const unlocked=need.every(elId=>S.eq.includes(elId));
      return `<div class="ei-tip"${unlocked?' style="color:var(--thunder);border-left-color:var(--thunder)"':''}>${c.icon} ${c.name} (${need.map(elId=>MAT[elId].icon).join(' ')})${unlocked?' — READY':''}</div>`;}).join('')}
    </div>`;
  el.appendChild(cg);

  saveProgress();
  showSc('sc-prep');
}

// ── CODEX ──
function renderCodex(){
  const el=document.getElementById('codex-list');el.innerHTML='';
  CODEX.forEach(c=>{
    const unlocked=S.maxWaveCleared>=c.unlock;
    const w=document.createElement('div');w.className='ei-wrap'+(unlocked?'':' codex-locked');
    if(unlocked){
      w.innerHTML=`<div class="ei-emj">📖</div><div><div class="ei-name">${c.title}</div><div class="ei-st" style="line-height:1.8">${c.text}</div></div>`;
    }else{
      w.innerHTML=`<div class="ei-emj">🔒</div><div><div class="ei-name">???</div><div class="ei-st">Clear Wave ${c.unlock} to unlock.</div></div>`;
    }
    el.appendChild(w);
  });
}
function showCodex(){
  renderCodex();showSc('sc-codex');
  if(!S.codexViewed){S.codexViewed=true;saveProgress();checkAchievements();}
}

// ── HELP ──
const HELP_CONTENT=[
  {h:'Turn Order',b:'Everyone charges an ATB gauge over time. When yours fills, you act; when the enemy\'s fills, they do.'},
  {h:'Playing A Card',b:'On your turn, pick an Uno-style card: a physical Strike, an elemental spell, Wall, or (once charged) your Willowbloom limit break.'},
  {h:'Rolling For Power',b:'Most cards send you to a Yahtzee roll. You get 3 rolls — hold any dice you want to keep between them — then Lock In. The poker-style result (Three of a Kind, Full House, Yahtzee...) sets your damage multiplier. A BUST still does something, just less.'},
  {h:'Streaks',b:'Landing consecutive non-BUST rolls builds a small stacking bonus, shown next to the dice. One BUST resets it, so a hot streak is worth protecting.'},
  {h:'Elements',b:'Fire, Ice, Thunder and Wind each hit an enemy\'s listed weakness for 1.5x damage, or its resistance for 0.6x — check "Weak:" / "Resist:" under the enemy\'s HP bar before you commit.'},
  {h:'Secondary Effects',b:'Ice also slows the enemy\'s charge, Thunder resets it outright, and Wind weakens their next few attacks. Purely elemental damage cards double as crowd control.'},
  {h:'Fusion Cards',b:'Equip every orb a combo needs (see the Combos panel in Prep) and a fusion card appears in battle, replacing your single-element spells with one bigger hit.'},
  {h:'Items & Limit',b:'Potions and Ethers are always available on your turn. Landing hits fills your Limit gauge — at 100% you can unleash Willowbloom for a huge blast.'},
];
function renderHelp(){
  const el=document.getElementById('help-list');el.innerHTML='';
  HELP_CONTENT.forEach(h=>{
    const r=document.createElement('div');r.className='help-row';
    r.innerHTML=`<div class="help-h">${h.h}</div><div class="help-b">${h.b}</div>`;
    el.appendChild(r);
  });
}
function showHelp(){renderHelp();showSc('sc-help');}

// ── STATS & ACHIEVEMENTS ──
function unlockAch(id){
  if(S.achievements[id])return;
  S.achievements[id]=true;
  const a=ACHIEVEMENTS.find(x=>x.id===id);
  if(a)log(`🏆 Achievement Unlocked: ${a.icon} ${a.name}`,'lc');
  saveProgress();
}
function checkAchievements(){
  if(S.lifetime.wins>=1)unlockAch('first_blood');
  if(['fire','ice','thunder','wind'].every(e=>S.lifetime.weakElements.includes(e)))unlockAch('elementalist');
  if(S.codexViewed)unlockAch('lorekeeper');
  if(S.maxWaveCleared>=8)unlockAch('trueending');
}
function renderStats(){
  const el=document.getElementById('stats-list');el.innerHTML='';
  const rows=[
    ['Waves Cleared (Best)',S.maxWaveCleared],
    ['Battles Won',S.lifetime.wins],
    ['Total Damage Dealt',S.lifetime.dealt],
    ['Total Critical Hits',S.lifetime.crits],
    ['Best Single Hit',S.lifetime.bestHit],
  ];
  rows.forEach(([label,val])=>{
    const r=document.createElement('div');r.className='stat-row';
    r.innerHTML=`<span>${label}</span><b>${val}</b>`;
    el.appendChild(r);
  });
  const hdr=document.createElement('div');hdr.className='help-h';hdr.style.margin='14px 0 4px';
  hdr.textContent='Achievements';
  el.appendChild(hdr);
  ACHIEVEMENTS.forEach(a=>{
    const unlocked=!!S.achievements[a.id];
    const r=document.createElement('div');r.className='ach-row'+(unlocked?'':' locked');
    r.innerHTML=`<div class="ach-icon">${unlocked?a.icon:'🔒'}</div>`+
      `<div><div class="ach-name">${unlocked?a.name:'???'}</div><div class="ach-desc">${unlocked?a.desc:'Not yet unlocked.'}</div></div>`;
    el.appendChild(r);
  });
}
function showStats(){renderStats();showSc('sc-stats');}

// ── INIT ──
renderPixelSprite(document.getElementById('pix-player'),'player');
loadProgress();
if(S.maxWaveCleared>0){
  const bw=document.getElementById('best-wave');
  bw.textContent=`✦ Best run: Wave ${S.maxWaveCleared} cleared`;
  bw.style.display='block';
}
function updateMuteBtn(){
  const b=document.getElementById('mute-btn');
  b.textContent=S.muted?'🔇':'🔊';
}
updateMuteBtn();
document.getElementById('mute-btn').onclick=()=>{
  S.muted=!S.muted;updateMuteBtn();saveProgress();
};
document.getElementById('btn-start').onclick=startBattle;
document.getElementById('btn-codex').onclick=showCodex;
document.getElementById('btn-codex-back').onclick=()=>showSc('sc-prep');
document.getElementById('btn-help').onclick=showHelp;
document.getElementById('btn-help-back').onclick=()=>showSc('sc-prep');
document.getElementById('btn-stats').onclick=showStats;
document.getElementById('btn-stats-back').onclick=()=>showSc('sc-prep');
document.getElementById('t-press').onclick=revealWaveSelect;
document.getElementById('ded').onclick=toggleLore;
document.addEventListener('keydown',e=>{
  if(e.code==='Space')revealWaveSelect();
  if(!S.pTurn)return;
  const cards=document.querySelectorAll('.uno-card:not(.disabled)');
  if(cards.length&&e.key>='1'&&e.key<='9'){cards[parseInt(e.key)-1]?.click();return;}
  if(e.key>='1'&&e.key<='5'){
    const btns=document.querySelectorAll('.act:not(:disabled)');
    btns[parseInt(e.key)-1]?.click();
  }
});

// ── ANIMATIONS CSS FIX ──
const st=document.createElement('style');
st.textContent=`
@keyframes popFl{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-60px)}}
.dp{color:#00e676!important}.dk{color:#ff9800!important}.dh{color:#00ff88!important}
`;
document.head.appendChild(st);

// ── PWA: OFFLINE SUPPORT ──
if('serviceWorker' in navigator && location.protocol!=='file:'){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{/* offline support just won't be available */});
  });
}
