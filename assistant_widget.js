// assistant_widget.js — بسيط: زر مساعد يفتح assistant.html في نافذة جديدة

import { loadSystem, playWelcomeAudio } from './system.js';

function createWidget(){

  // لو موجود قبل كده ما تعملش حاجة
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

  // تخصيص الزر
  const btn = document.getElementById('ft-open-assistant');
  btn.style.cssText = `
    background: var(--accent);
    color: #fff;
    border: 0;
    padding: 12px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
  `;

  // فتح صفحة المساعد
  btn.addEventListener('click', ()=>{
    const win = window.open('assistant.html', '_blank');
    if(!win){
      window.location.href = 'assistant.html';
    }
  });

}

// تفعيل الودجت بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', createWidget);
