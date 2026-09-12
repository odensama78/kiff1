const refine={
  Resto:{question:'Quel genre d’endroit ?',options:['Très bon','Instagrammable','Calme','Animé','Pas cher','Surprends-moi']},
  Film:{question:'Quel genre de film ?',options:['Comédie','Thriller','Drame','Action','Animation','Horreur','Surprends-moi']},
  Café:{question:'Quelle ambiance ?',options:['Cosy','Beau','Calme','Terrasse','Gourmand','Surprends-moi']},
  Marché:{question:'Quel genre de marché ?',options:['Alimentaire','Vintage','Brocante','Créateurs','Fleurs','Surprends-moi']},
  Culture:{question:'Tu veux voir quoi ?',options:['Photo','Art contemporain','Histoire','Immersif','Architecture','Surprends-moi']},
  Balade:{question:'Quel type de balade ?',options:['Parc','Bord de l’eau','Quartier','Nature','Avec café','Surprends-moi']},
  Activité:{question:'Tu veux quelle énergie ?',options:['Bowling','Arcade','Escape game','Karaoké','Atelier','Surprends-moi']},
  Sport:{question:'Tu veux bouger comment ?',options:['Escalade','Padel','Badminton','Piscine','Karting','Surprends-moi']},
  Shopping:{question:'Tu veux chiner quoi ?',options:['Vintage','Déco','Livres','Sneakers','Créateurs','Surprends-moi']},
  Nuit:{question:'Quelle ambiance ce soir ?',options:['Calme','Rooftop','Musique live','Animé','Sans alcool','Surprends-moi']},
  Famille:{question:'Quel rythme ?',options:['Très simple','En intérieur','Dehors','Animaux','Ludique','Surprends-moi']},
  'Bien-être':{question:'Tu veux quoi comme pause ?',options:['Spa','Massage','Hammam','Head spa','Soin','Surprends-moi']},
  Club:{question:'Tu veux danser sur quoi ?',options:['Afro / hip-hop','House / techno','Latino','Généraliste','Bar dansant','Surprends-moi']},
  Live:{question:'Tu veux voir quoi en live ?',options:['Stand-up','Concert','Jazz','Théâtre','Impro','Surprends-moi']},
  Nature:{question:'Tu veux quel décor ?',options:['Forêt','Lac','Parc','Rivière','Randonnée','Surprends-moi']},
  Escapade:{question:'Tu veux t’éloigner combien ?',options:['Très proche','< 1 heure','Demi-journée','Journée','En train','Surprends-moi']},
  Jeux:{question:'Tu veux jouer à quoi ?',options:['VR','Laser game','Quiz','Jeux de société','Billard','Surprends-moi']},
  Créatif:{question:'Tu veux fabriquer quoi ?',options:['Poterie','Peinture','Cuisine','Parfum','Fleurs','Surprends-moi']},
  Gourmand:{question:'Tu veux quoi comme plaisir ?',options:['Pâtisserie','Street food','Food court','Goûter','Dégustation','Surprends-moi']},
  Aventure:{question:'Quel niveau d’adrénaline ?',options:['Tranquille','Physique','Hauteur','Vitesse','Très différent','Surprends-moi']},
  Eau:{question:'Tu veux l’eau comment ?',options:['Piscine','Bateau','Lac','Paddle','Spa','Surprends-moi']},
  Animaux:{question:'Tu veux voir quoi ?',options:['Aquarium','Ferme','Chevaux','Zoo','Café animaux','Surprends-moi']},
  Curiosité:{question:'Tu veux nourrir quoi ?',options:['Science','Espace','Technique','Livres','Interactif','Surprends-moi']},
  Surprise:{question:'À quel point ?',options:['Facile','Un peu nouveau','Très différent','Petit budget','Dehors','Carte blanche']}
};
const whenBy={
  Film:['Aujourd’hui','Ce soir','Demain','Ce week-end','Cette semaine'],
  Marché:['Samedi matin','Dimanche matin','Ce week-end','Cette semaine','Plus tard'],
  Balade:['Maintenant','Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Nuit:['Ce soir','Vendredi','Samedi','Ce week-end','Plus tard'],
  Café:['Maintenant','Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Resto:['Ce soir','Demain','Ce week-end','Cette semaine','Date libre'],
  'Bien-être':['Aujourd’hui','Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Club:['Ce soir','Vendredi','Samedi','Ce week-end','Plus tard'],
  Live:['Ce soir','Demain','Vendredi','Ce week-end','Cette semaine'],
  Nature:['Maintenant','Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Escapade:['Demain','Ce week-end','Samedi','Dimanche matin','Plus tard'],
  Jeux:['Ce soir','Demain','Ce week-end','Cette semaine','Plus tard'],
  Créatif:['Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Gourmand:['Maintenant','Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Aventure:['Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Eau:['Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Animaux:['Cet après-midi','Ce week-end','Cette semaine','Plus tard'],
  Curiosité:['Cet après-midi','Ce week-end','Cette semaine','Plus tard']
};
const save=()=>set(LS,JSON.stringify(st));
function fatal(e){console.error(e);app.innerHTML=`<div class="fatal"><div><div class="brand">onfait?</div><h1>Un souci a coupé l’écran.</h1><button class="primary darkPrimary" onclick="del('${LS}');location.reload()">Réessayer</button></div></div>`}
window.addEventListener('error',e=>fatal(e.error||e.message));window.addEventListener('unhandledrejection',e=>fatal(e.reason));
const ico={
 d:'<svg viewBox="0 0 24 24"><path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z"/></svg>',
 s:'<svg viewBox="0 0 24 24"><path d="M6 4.5h12v15.2l-6-3.8-6 3.8z"/></svg>',
 p:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.7"/><path d="M5 20c1.1-3.8 3.5-5.6 7-5.6s5.9 1.8 7 5.6"/></svg>',
 share:'<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.3 10.9l7.4-4.5M8.3 13.1l7.4 4.5"/></svg>',
 cal:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
 invite:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c.8-3.5 2.8-5.2 5.5-5.2 1.5 0 2.8.5 3.8 1.5M18 11v7M14.5 14.5h7"/></svg>',
 trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></svg>',
 photo:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M5 18l5-5 3 3 2-2 4 4"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>'
};
