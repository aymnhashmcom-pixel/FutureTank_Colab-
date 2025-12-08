// assistant_widget.js — بسيط: يضيف فقاعة مساعد + يفتح assistant.html
import { loadSystem, playWelcomeAudio } from './system.js';

function createWidget(){
  // إذا موجود مسبقاً اوقف
  if(document.querySelector('#ft-assistant-widget')) return;
  const w = document.createElement('div');
  w.id = 'ft-assistant-widget';
  w.innerHTML = `
    <button id="ft-open-assistant" title="تحدث مع المساعد">🤖</button>
  `;
  Object.assign(w.style, {
    position: 'fixed',
    right: '18px',
    bottom: '18px',
    zIndex: 9999
  });
  document.body.appendChild(w);

  const btn = document.getElementById('ft-open-assistant');
  btn.style.cssText = 'background:var(--accent);color:#fff;border:0;padding:12px;border-radius:50%;font-size:20px;cursor:pointer';
  btn.addEventListener('click', ()=>{
    // افتح صفحة المساعد في تبويب جديد أو نافذة
    const win = window.open('assistant.html', '_blank');
    if(!win) {
      // لو منعه البوب اب افتح في نفس النافذة
      window.location.href = 'assistant.html';
    }
  });

  // شغّل رسالة الترحيب لو موجودة
  const sys = loadSystem();
  if(sys.settings && sys.settings.welcomeAudio){
    // لا تشغّل تلقائياً لو بدك تحكم: هنا نشغّل فقط لو أردت.
    // playWelcomeAudio();
  }
}

// تهيئة بعد DOM
document.addEventListener('DOMContentLoaded', createWidget);
