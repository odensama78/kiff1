function start(){const n=document.querySelector('#name')?.value.trim();if(n){st.name=n;save();if(pendingInvite)ui.sheet={step:'invite',invite:pendingInvite};render()}}
function go(x){ui.tab=x;ui.sheet=null;render()}
function scope(){st.scope=st.scope==='Moi'?'Nous':'Moi';save();render()}
function skip(){const r=currentRec();signal(r.c,'',-.2,'swipe_left');advanceRec();render()}
function want(){const r=currentRec();signal(r.c,'',.58,'swipe_right');ui.sheet={step:'refine',idx:recs.indexOf(r),recId:r.id};render()}
function manual(){const r=currentRec();ui.sheet={step:'manual',idx:recs.indexOf(r),recId:r.id};render()}
function useIdea(){const q=document.querySelector('#idea')?.value.trim();if(q){ui.sheet={...ui.sheet,step:'where',manualQuery:q,manualCategory:inferCategory(q),refinement:''};render()}}
function pickRefinement(m){const r=recs[ui.sheet.idx]||recs[0];signal(r.c,m,.3,'refine');ui.sheet={...ui.sheet,refinement:m,step:r.c==='Film'?'whenFirst':'where'};render()}
function pickWhenBeforePlace(w){ui.sheet={...ui.sheet,when:w,step:'where'};render()}
function closeSheet(){ui.sheet=null;render()}
function searchCity(){const city=document.querySelector('#city')?.value.trim();if(city)search({city})}
function geo(){navigator.geolocation?.getCurrentPosition(p=>search({lat:p.coords.latitude,lng:p.coords.longitude}),()=>toast('Localisation refusée'),{timeout:7000,maximumAge:300000})}
async function search(loc){const old=ui.sheet;ui.sheet={...old,...loc,step:'loading'};render();const c=new AbortController(),t=setTimeout(()=>c.abort(),12000);try{const r=recs[old.idx]||recs[0],query=buildSearchQuery(r,old),res=await fetch('/api?op=search',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query,mood:old.refinement,category:r.c,when:old.when||'',scope:st.scope,tastes:topTasteTerms(),...loc}),signal:c.signal}),d=await res.json();if(!res.ok)throw Error(d.error||'Recherche indisponible');ui.sheet={...old,...loc,step:'places',places:d.places||[]};if(!ui.sheet.places.length)ui.sheet.error='Rien trouvé ici.'}catch(e){ui.sheet={...old,...loc,step:'places',places:[],error:e.name==='AbortError'?'La recherche a pris trop de temps.':e.message}}finally{clearTimeout(t);render()}}
function choose(i){const p=ui.sheet.places[i];const r=recs[ui.sheet.idx]||recs[0];if(r.c==='Film'&&ui.sheet.when){saveSelected(p,ui.sheet.when);return}ui.sheet={...ui.sheet,step:'when',place:p};render()}
function pickWhen(w){saveSelected(ui.sheet.place,w)}
function saveSelected(p,w){const r=recs[ui.sheet.idx]||recs[0],cat=ui.sheet.manualCategory||r.c,x={id:'p'+Date.now(),category:cat,title:ui.sheet.manualQuery||r.t,place:p.displayName?.text||'Lieu',address:p.formattedAddress||'',when:w,refinement:ui.sheet.refinement||'',photoName:p.photoName||'',rating:p.rating||null,userRatingCount:p.userRatingCount||null,googleMapsUri:p.googleMapsUri||'',likes:0,comments:[],createdAt:Date.now(),scope:st.scope};st.saved.unshift(x);signal(cat,ui.sheet.refinement||'',1.3,'save');const b=tasteBucket();if(b.current===r.id)advanceRec();else save();ui.sheet=null;ui.ticket=x;render()}
function closeTicket(){ui.ticket=null;ui.tab='saved';render()}
function detail(i){ui.sheet={step:'detail',item:st.saved[i],index:i};render()}
function resetAll(){del(LS);del(LEGACY);st={...base,saved:[]};ui={tab:'discover',sheet:null,ticket:null};render()}
function toast(x){const d=document.createElement('div');d.className='toast';d.textContent=x;document.body.append(d);setTimeout(()=>d.remove(),1700)}
