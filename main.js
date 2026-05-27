const ratePopup = document.getElementById("ratePopup");
const installBtn = document.getElementById("installApp");

let deferredPrompt;
let allReviews = [];
let showAll = false;

/* INSTALL */
function isAppInstalled(){
return window.matchMedia("(display-mode: standalone)").matches
|| window.navigator.standalone === true
|| localStorage.getItem("ft_installed")==="yes";
}

if(installBtn){

if(isAppInstalled()){
installBtn.style.display="none";
}else{
installBtn.style.display="block";
}

window.addEventListener("beforeinstallprompt",(e)=>{
e.preventDefault();
deferredPrompt=e;

if(!isAppInstalled()){
installBtn.style.display="block";
}
});

installBtn.onclick=async()=>{

if(deferredPrompt){
deferredPrompt.prompt();
const choice = await deferredPrompt.userChoice;

if(choice.outcome==="accepted"){
localStorage.setItem("ft_installed","yes");
installBtn.style.display="none";
}
}
};

window.addEventListener("appinstalled",()=>{
localStorage.setItem("ft_installed","yes");
installBtn.style.display="none";
});

}

/* RATE */
const rateBtn = document.getElementById("rateAppBtn");

if(rateBtn){
rateBtn.onclick=()=>{
ratePopup.style.display="flex";
};
}

function closeRatePopup(){
if(ratePopup) ratePopup.style.display="none";
}

/* SHARE */
const shareBtn = document.getElementById("shareAppBtn");

if(shareBtn){

shareBtn.onclick=async()=>{

const shareData = {
title:"Future Tank",
text:"💧 حمّل تطبيق Future Tank",
url:window.location.origin
};

if(navigator.share){
await navigator.share(shareData);
}else{
navigator.clipboard.writeText(shareData.url);
alert("تم نسخ الرابط");
}

};

  }
