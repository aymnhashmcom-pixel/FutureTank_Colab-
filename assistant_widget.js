// assistant_widget.js
// Minimal embedded assistant bubble + modal. Reads ft_db from localStorage.

(function(){
  // create widget container
  if(document.getElementById('ft-assistant-widget')) return;

  const w = document.createElement('div');
  w.id = 'ft-assistant-widget';
  w.style.position = 'fixed';
  w.style.right = '18px';
  w.style.bottom = '18px';
  w.style.zIndex = 99999;
  document.body.appendChild(w);

  // bubble button
  const btn = document.createElement('button');
  btn.id = 'ft-open-assistant';
  btn.title = 'تحدث مع المساعد';
  btn.innerText = '🤖';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.borderRadius = '50%';
  btn.style.border = 'none';
  btn.style.fontSize = '22px';
  btn.style.cursor = 'pointer';
  btn.style.background = 'linear-gradient(180deg,#7fd3ff,#53b8ea)';
  btn.style.color = '#042b36';
  w.appendChild(btn);

  // overlay modal
  const overlay = document.createElement('div');
  overlay.id = 'ft-chat-overlay';
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.right = '18px';
  overlay.style.bottom = '86px';
  overlay.style.width = '360px';
  overlay.style.maxWidth = '92vw';
  overlay.style.height = '420px';
  overlay.style.background = '#fff';
  overlay.style.borderRadius = '12px';
  overlay.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
  overlay.style.overflow = 'hidden';
  overlay.style.zIndex = 999999;
  overlay.setAttribute('aria-hidden','true');
  document.body.appendChild(overlay);

  overlay.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-bottom:1px solid #eef6fa">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:40px;height:40px;border-radius:8px;background:linear-gradient(180deg,#dff4ff,#7fd3ff);display:grid;place-items:center">🤖</div>
        <div>
          <div style="font-weight:700">المساعد الذكي — FutureTank</div>
          <div style="font-size:12px;color:#6b6f76">اسأل عن: المنتجات، الخدمات، الحجز، الدفع</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button id="playWelcome" style="border:0;background:transparent;cursor:pointer">🔊</button>
        <button id="closeChat" style="border:0;background:transparent;cursor:pointer;font-size:18px">✖</button>
      </div>
    </div>
    <div id="chatMessages" style="padding:12px;height:270px;overflow:auto;background:#fbfeff"></div>
    <div style="display:flex;padding:10px;border-top:1px solid #eef6fa;gap:8px">
      <input id="chatInput" placeholder="اكتب رسالتك..." style="flex:1;padding:10px;border-radius:10px;border:1px solid #e6eef5" />
      <button id="chatSend" class="btn" style="padding:8px 12px;border-radius:10px">إرسال</button>
    </div>
  `;

  // helpers
  const messagesEl = overlay.querySelector('#chatMessages');
  const input = overlay.querySelector('#chatInput');
  const sendBtn = overlay.querySelector('#chatSend');
  const closeBtn = overlay.querySelector('#closeChat');
  const playWelcomeBtn = overlay.querySelector('#playWelcome');

  function loadDB(){
    try { return JSON.parse(localStorage.getItem('ft_db')||'{}'); }
    catch(e){ return {}; }
  }

  function append(who, text){
    const d = document.createElement('div');
    d.style.marginBottom = '8px';
    d.style.whiteSpace = 'pre-wrap';
    d.style.fontSize = '14px';
    if(who==='user'){
      d.style.textAlign = 'right';
      d.innerHTML = `<div style="display:inline-block;background:#e8fbff;padding:8px;border-radius:10px">${text}</div>`;
    } else {
      d.style.textAlign = 'left';
      d.innerHTML = `<div style="display:inline-block;background:#f1f6f9;padding:8px;border-radius:10px">${text}</div>`;
    }
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function knowledgeReply(q){
    const db = loadDB();
    const t = q.toLowerCase();

    if(t.includes('خدمات') || t.includes('ما هي خدمات') || t.includes('اي خدمة')){
      if(db.services && db.services.length) return db.services.map(s=>s.name).join(' — ');
      return 'توريد/تركيب/صيانة/تعقيم';
    }
    if(t.includes('منتج') || t.includes('ما هي المنتجات') || t.includes('خزانات') || t.includes('فلاتر')){
      if(db.products && db.products.length) return db.products.map(p=>p.name).join(' — ');
      return 'خزانات وفلاتر';
    }
    if(t.includes('احجز') || t.includes('حجز')){
      return 'للحجز استخدم زر "احجز خدمة الآن" في الصفحة أو اتصل ' + ((db.company && db.company.phone) || '01150402031');
    }
    if((t.includes('كيف') && t.includes('ادفع')) || t.includes('طريقة الدفع') || t.includes('الدفع')){
      return 'طريقة الدفع: اتصالات كاش على رقم ' + ((db.company && db.company.phone) || '01150402031');
    }
    if(t.includes('اتصال')||t.includes('واتس')||t.includes('هاتف')){
      return 'هاتف/واتساب: ' + ((db.company && db.company.phone) || '01150402031');
    }

    // fallback friendly
    return (db.aiFallback && db.aiFallback.reply) || 'أنا هنا للمساعدة — اكتب: "ما هي خدماتكم؟" أو "كيف أدفع؟"';
  }

  function tryPlayWelcome(){
    const db = loadDB();
    const txt = (db.welcome && db.welcome.trim()) ? db.welcome : 'أهلاً بكم في فيوتشرتانك. نقاء الماء هو هدفنا. كيف أساعدك اليوم؟';
    if('speechSynthesis' in window){
      try {
        const utter = new SpeechSynthesisUtterance(txt);
        utter.lang = 'ar-SA';
        const v = speechSynthesis.getVoices().find(v=>v.lang && v.lang.startsWith('ar')) || null;
        if(v) utter.voice = v;
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
      } catch(e){ console.warn('TTS error', e); }
    } else {
      alert('المتصفح لا يدعم تحويل النص لصوت.');
    }
  }

  // interactions
  btn.addEventListener('click', ()=>{
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
    overlay.setAttribute('aria-hidden', overlay.style.display==='none' ? 'true' : 'false');
    if(overlay.style.display === 'block'){
      append('bot', 'أنا هنا للمساعدة — اسألني عن: الخدمات، المنتجات، الحجز، أو طرق الدفع.');
      // try play welcome if permitted in settings
      const db = loadDB();
      if(db.settings && db.settings.autoplayWelcome) tryPlayWelcome();
    }
  });

  closeBtn.addEventListener('click', ()=> { overlay.style.display='none'; overlay.setAttribute('aria-hidden','true'); });

  function handleSend(){
    const q = input.value.trim();
    if(!q) return;
    append('user', q);
    input.value = '';
    const r = knowledgeReply(q);
    setTimeout(()=> append('bot', r), 300);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e)=> { if(e.key === 'Enter') handleSend(); });
  playWelcomeBtn.addEventListener('click', tryPlayWelcome);

})();
