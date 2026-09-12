const app=document.querySelector('#app');
const LS='onfait_v4',LEGACY='onfait_v3';
const base={name:'',scope:'Moi',saved:[],rec:0,taste:{}};
const get=k=>{try{return localStorage.getItem(k)}catch{return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch{}},del=k=>{try{localStorage.removeItem(k)}catch{}};
function load(){try{const raw=get(LS)||get(LEGACY)||'{}';const x=JSON.parse(raw);return {...base,...x,taste:x.taste&&typeof x.taste==='object'?x.taste:{},saved:Array.isArray(x.saved)?x.saved.map(y=>({...y,likes:y.likes||0,comments:Array.isArray(y.comments)?y.comments:[]})):[]}}catch{del(LS);return {...base,taste:{},saved:[]}}}
let st=load();
