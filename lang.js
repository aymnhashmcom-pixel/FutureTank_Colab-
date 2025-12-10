/* lang.js - simple language toggle placeholder */
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('langToggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{ if(btn.innerText==='EN') btn.innerText='AR'; else btn.innerText='EN'; alert('تبديل اللغة - مفعّل (تجريبي)'); });
});
