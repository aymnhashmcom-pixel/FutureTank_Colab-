// system.js — core data layer (light & safe)
// استخدم هذا الملف كبديل آمن للمشكلة السابقة.

export const SYS = {
  version: "1.0.0",
  siteTitle: "فيوتشرتانك",
  slogan: "نقاء الماء هو هدفنا"
};

const STORAGE_KEY = 'futuretank_system_v1';

function defaultData(){
  return {
    settings: {
      siteTitle: SYS.siteTitle,
      slogan: SYS.slogan,
      welcomeMessage: "مرحباً! أنا مساعد فيوتشرتانك — اسألني عن الخدمات أو الحجز.",
      welcomeAudio: "" // قاعدة64 للصوت لو حطيتها
    },
    products: [],
    services: [],
    invoices: [],
    users: []
  };
}

export function loadSystem(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) {
      const d = defaultData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      return d;
    }
    return JSON.parse(raw);
  }catch(e){
    console.error("loadSystem error", e);
    const d = defaultData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    return d;
  }
}

export function saveSystem(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getSetting(key){
  const d = loadSystem();
  return d.settings?.[key];
}

export function setSetting(key, value){
  const d = loadSystem();
  d.settings = d.settings || {};
  d.settings[key] = value;
  saveSystem(d);
}

export function playWelcomeAudio(){
  const d = loadSystem();
  if(!d.settings || !d.settings.welcomeAudio) return false;
  try{
    const a = new Audio(d.settings.welcomeAudio);
    a.play();
    return true;
  }catch(e){
    console.warn("playWelcomeAudio failed", e);
    return false;
  }
}
