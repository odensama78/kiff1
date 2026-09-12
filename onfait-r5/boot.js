let pendingInvite=parseInvite();
let ui={tab:'discover',sheet:st.name&&pendingInvite?{step:'invite',invite:pendingInvite}:null,ticket:null};
render();
