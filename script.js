/* script.js - populate page from localStorage db */
function loadDB(){ return JSON.parse(localStorage.getItem('ft_db') || '{}'); }
document.addEventListener('DOMContentLoaded', ()=>{
  const db = loadDB();
  document.getElementById('prodWarranty')?.innerText = db.productWarranty || '10 سنوات';
  document.getElementById('srvWarranty')?.innerText = db.serviceWarranty || '5 سنوات';
  document.getElementById('phone').innerText = (db.company && db.company.phone) || '01150402031';
  document.getElementById('footerPhone').innerText = (db.company && db.company.phone) || '01150402031';
  const pl = document.getElementById('productsList');
  pl.innerHTML = (db.products||[]).map(p=>`<div class="product"><strong>${p.name}</strong><div>${p.price ? p.price + ' ج.م' : ''}</div></div>`).join('') || 'لا توجد منتجات حالياً';
  const sl = document.getElementById('servicesList');
  sl.innerHTML = (db.services||[]).map(s=>`<div>${s.name}</div>`).join('') || 'لا توجد خدمات حالياً';
});
