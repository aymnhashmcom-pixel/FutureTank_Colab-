/* assistant_widget.js: floating assistant bubble that opens assistant.html or a modal */
(function(){
  function createWidget(){
    if(document.getElementById('ft-open-assistant')) return;
    const btn = document.createElement('button'); btn.id='ft-open-assistant';
    btn.title='تحدث مع المساعد'; btn.innerText='🤖';
    btn.style.position='fixed'; btn.style.right='18px'; btn.style.bottom='18px';
    btn.style.zIndex='9999'; btn.style.background='linear-gradient(90deg,#19a6ff,#7ed6ff)';
    btn.style.border='0'; btn.style.padding='12px'; btn.style.borderRadius='50%'; btn.style.fontSize='20px';
    btn.style.cursor='pointer'; document.body.appendChild(btn);
    btn.addEventListener('click', ()=>{
      const win = window.open('assistant.html','_blank');
      if(!win) window.location.href='assistant.html';
    });
  }
  document.addEventListener('DOMContentLoaded', createWidget);
})();
