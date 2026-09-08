const people = [
  { id:'lyse', name:'Lyse', initial:'L', color:'#9a7f8b', status:'open to talk', open:true, x:50, y:21, last:'put on that song you showed me', when:'18m' },
  { id:'mum', name:'Mum', initial:'M', color:'#9b8b6d', status:'around', open:false, x:19, y:42, last:'made dinner · thinking of you', when:'1h' },
  { id:'jo', name:'Jo', initial:'J', color:'#788d82', status:'in my bubble', open:false, x:82, y:43, last:'rough day. still here though.', when:'3h' },
  { id:'sarah', name:'Sarah', initial:'S', color:'#7e8da0', status:'busy', open:false, x:23, y:72, last:'saw this tiny dog and laughed', when:'5h' },
  { id:'max', name:'Max', initial:'M', color:'#947e70', status:'offline', open:false, x:77, y:73, last:'football later maybe', when:'yesterday' },
  { id:'nia', name:'Nia', initial:'N', color:'#8f8299', status:'around', open:false, x:50, y:80, last:'the sky is stupidly pink tonight', when:'yesterday' }
];

const defaultMoments = [
  {person:'Lyse',initial:'L',color:'#9a7f8b',when:'18m',body:'put on that song you showed me',context:'left here · no reply expected'},
  {person:'Mum',initial:'M',color:'#9b8b6d',when:'1h',body:'Made dinner. Saved you some anyway.',context:'a small moment'},
  {person:'Jo',initial:'J',color:'#788d82',when:'3h',body:'rough day. still here though.',context:'in my bubble'},
  {person:'Sarah',initial:'S',color:'#7e8da0',when:'5h',body:'Saw this tiny dog with a jacket and immediately thought of you.',context:'left here · no reply expected'}
];

const $ = (id) => document.getElementById(id);
const screens = ['onboarding','home','moments','me'];
let selectedPerson = null;
let moments = JSON.parse(localStorage.getItem('vela-moments') || 'null') || defaultMoments;
let state = JSON.parse(localStorage.getItem('vela-state') || 'null') || { onboarded:false, door:false, status:'around' };

function persist(){
  localStorage.setItem('vela-state', JSON.stringify(state));
  localStorage.setItem('vela-moments', JSON.stringify(moments));
}

function setScreen(name){
  screens.forEach(s => $(s).classList.toggle('hidden', s !== name));
  if(name === 'moments') renderMoments();
  if(name === 'me') renderSelf();
}

function renderRoom(){
  const room = $('room');
  room.querySelectorAll('.person-node').forEach(n=>n.remove());
  people.forEach(p => {
    const btn = document.createElement('button');
    btn.className = `person-node ${p.open ? 'open-person' : ''}`;
    btn.style.left = `${p.x}%`; btn.style.top = `${p.y}%`;
    btn.dataset.person = p.id;
    btn.innerHTML = `<span class="avatar" style="background:${p.color}">${p.initial}</span><span class="name">${p.name}</span><span class="status">${p.status}</span>`;
    btn.addEventListener('click', () => openPerson(p));
    room.appendChild(btn);
  });
}

function renderMoments(){
  $('momentsStream').innerHTML = moments.map(m => `
    <article class="moment">
      <div class="moment-avatar" style="background:${m.color}">${m.initial}</div>
      <div>
        <div class="moment-meta"><strong>${escapeHtml(m.person)}</strong><span>${escapeHtml(m.when)}</span></div>
        <p class="moment-body">${escapeHtml(m.body)}</p>
        <p class="moment-context">${escapeHtml(m.context)}</p>
      </div>
    </article>`).join('');
}

function renderSelf(){
  const copy = {
    around:'People can leave things. No reply expected.',
    bubble:'Low bandwidth. Your silence is already explained.',
    talk:'Your door is open for a conversation.',
    busy:'You are living. People can leave things for later.',
    offline:'Away without needing to explain where you went.'
  };
  $('selfStatusBig').textContent = state.status === 'bubble' ? 'in my bubble' : state.status === 'talk' ? 'open to talk' : state.status;
  $('selfStatusSub').textContent = copy[state.status];
  document.querySelectorAll('#statusPicker button').forEach(b => b.classList.toggle('selected', b.dataset.status === state.status));
}

function openPerson(p){
  selectedPerson = p;
  $('sheetAvatar').textContent = p.initial;
  $('sheetAvatar').style.background = p.color;
  $('personName').textContent = p.name;
  $('personStatus').textContent = p.status + (p.open ? ' · door open' : '');
  $('personLast').innerHTML = `<span style="font-size:10px;color:#8a857d;text-transform:uppercase;letter-spacing:.12em">LAST THING LEFT HERE · ${p.when}</span><br><span style="display:inline-block;margin-top:7px">“${escapeHtml(p.last)}”</span>`;
  $('personSheet').classList.remove('hidden');
}

function closePerson(){ $('personSheet').classList.add('hidden'); }
function showToast(text){
  const t = $('toast'); t.textContent = text; t.classList.remove('hidden');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(()=>t.classList.add('hidden'), 2200);
}
function escapeHtml(v){ return String(v).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function pulseFromPerson(){
  if(!selectedPerson) return;
  const node = document.querySelector(`[data-person="${selectedPerson.id}"]`);
  if(node){
    const wave = document.createElement('span'); wave.className='touch-wave';
    const r = $('room').getBoundingClientRect(), n = node.getBoundingClientRect();
    wave.style.left = `${n.left-r.left+n.width/2-25}px`; wave.style.top = `${n.top-r.top+n.height/2-25}px`;
    $('room').appendChild(wave); setTimeout(()=>wave.remove(),1400);
  }
}

$('startBtn').addEventListener('click', () => { state.onboarded=true; persist(); setScreen('home'); });
$('demoSkip').addEventListener('click', () => { state.onboarded=true; persist(); setScreen('home'); });
$('closeSheet').addEventListener('click', closePerson);
$('personSheet').addEventListener('click', e => { if(e.target === $('personSheet')) closePerson(); });
$('touchBtn').addEventListener('click', () => {
  const p = selectedPerson; closePerson(); pulseFromPerson();
  if(navigator.vibrate) navigator.vibrate(18);
  showToast(`a quiet touch went to ${p.name}`);
  $('ambientText').textContent = `You thought of ${p.name}. Nothing else is required.`;
  setTimeout(()=>$('ambientText').textContent='Nothing needs your attention.',4200);
});
$('dropBtn').addEventListener('click', () => {
  if(!selectedPerson) return; $('composerPerson').textContent = selectedPerson.name.toUpperCase();
  $('dropText').value=''; $('charCount').textContent='0/180';
  closePerson(); $('composerSheet').classList.remove('hidden'); setTimeout(()=>$('dropText').focus(),200);
});
$('needBtn').addEventListener('click', () => {
  if(!selectedPerson) return; const p=selectedPerson; closePerson();
  showToast(`${p.name} will get one real notification`);
});
$('closeComposer').addEventListener('click', ()=>$('composerSheet').classList.add('hidden'));
$('composerSheet').addEventListener('click', e => { if(e.target === $('composerSheet')) $('composerSheet').classList.add('hidden'); });
$('dropText').addEventListener('input', e=>$('charCount').textContent=`${e.target.value.length}/180`);
$('sendDrop').addEventListener('click', () => {
  const body = $('dropText').value.trim(); if(!body || !selectedPerson) return showToast('leave at least one little thing');
  moments.unshift({person:`You → ${selectedPerson.name}`,initial:'E',color:'#20231f',when:'now',body,context:'left here · no reply expected'});
  persist(); $('composerSheet').classList.add('hidden'); showToast(`left quietly for ${selectedPerson.name}`);
});
$('photoStub').addEventListener('click',()=>showToast('photo drop is ready for native camera wiring'));
$('voiceStub').addEventListener('click',()=>showToast('voice drop is ready for native recorder wiring'));
$('openDoorBtn').addEventListener('click',()=>{
  state.door=!state.door; persist();
  $('openDoorBtn').classList.toggle('open',state.door); $('openDoorBtn').setAttribute('aria-pressed',String(state.door));
  $('doorLabel').textContent=state.door?'Door open · 30m':'Door closed';
  showToast(state.door?'your people can see you’re open to talk':'door closed quietly');
});
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>setScreen(b.dataset.view === 'room' ? 'home' : b.dataset.view)));
document.querySelectorAll('.back-home').forEach(b=>b.addEventListener('click',()=>setScreen('home')));
document.querySelectorAll('#statusPicker button').forEach(b=>b.addEventListener('click',()=>{
  state.status=b.dataset.status; if(state.status==='talk') state.door=true; persist(); renderSelf();
  $('openDoorBtn').classList.toggle('open',state.door); $('doorLabel').textContent=state.door?'Door open · 30m':'Door closed';
  showToast(`you’re ${b.querySelector('span').textContent}`);
}));

const hour = new Date().getHours(); $('dayGreeting').textContent = hour < 12 ? 'Good morning.' : hour < 18 ? 'Good afternoon.' : 'Good evening.';
renderRoom();
$('openDoorBtn').classList.toggle('open',state.door); $('doorLabel').textContent=state.door?'Door open · 30m':'Door closed';
if(state.onboarded) setScreen('home');
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
