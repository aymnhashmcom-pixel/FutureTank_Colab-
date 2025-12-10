/* system.js - small helper to provide defaults and load data from localStorage */
function loadSystem(){
  try {
    const db = JSON.parse(localStorage.getItem('ft_db')||'{}');
    return { db };
  } catch(e){
    return { db:{} };
  }
}
(function initDefault(){
  const cur = localStorage.getItem('ft_db');
  if(!cur){
    const sample = {
      company:{ name:'فيوتشر تانك', phone:'01150402031' },
      welcome:'أهلاً بكم في فيوتشرتانك. نقاء الماء هو هدفنا. كيف أساعدك اليوم؟',
      products:[ {name:'خزان بلاستيك سعة 1000 لتر', price:'2500'},{name:'فلتر منزلي 5 مراحل', price:'3200'} ],
      services:[ {name:'توريد وتركيب خزانات المياه'},{name:'صيانة وإصلاح خزانات المياه'},{name:'تطهير وتعقيم خزانات مياه الشرب'},{name:'توريد وتركيب فلاتر المياه'},{name:'صيانة وإصلاح فلاتر المياه'} ]
    };
    localStorage.setItem('ft_db', JSON.stringify(sample));
  }
})();
