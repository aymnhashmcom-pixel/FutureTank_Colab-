let db = [];

fetch('database.json')
  .then(res => res.json())
  .then(data => {
    db = data.contracts || [];
  });

function searchContract() {
  const phone = document.getElementById('phone').value.trim();
  const result = document.getElementById('result');
  result.innerHTML = '';

  const contract = db.find(c => c.phone === phone);

  if (!contract) {
    result.innerHTML = '<div class="info">❌ لا يوجد تعاقد بهذا الرقم</div>';
    return;
  }

  result.innerHTML = `
    <div class="info">
      <p><strong>الاسم:</strong> ${contract.name}</p>
      <p><strong>نوع التعاقد:</strong> ${contract.type}</p>
      <p><strong>تاريخ الانتهاء:</strong> ${contract.endDate}</p>
      <p><strong>الحالة:</strong> ${contract.status}</p>
      <button onclick="renew('${phone}')">🔁 جدّد التعاقد الآن</button>
    </div>
  `;
}

function renew(phone) {
  const contract = db.find(c => c.phone === phone);
  if (!contract) return;

  const newDate = new Date();
  newDate.setFullYear(newDate.getFullYear() + 1);

  contract.endDate = newDate.toISOString().split('T')[0];
  contract.status = 'نشط';

  localStorage.setItem('ft_last_renew', JSON.stringify(contract));

  document.getElementById('result').innerHTML = `
    <div class="success">
      ✅ تم تجديد التعاقد بنجاح<br>
      سيتم التواصل معكم على هذا الرقم<br><br>
      📞 خدمة العملاء: 01150402031
    </div>
  `;
}
