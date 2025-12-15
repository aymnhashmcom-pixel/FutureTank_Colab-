const FT_KEY = "ft_contracts";
const FT_SENT_KEY = "ft_sent_notifications";

// تحميل البيانات
function ftLoad() {
  return JSON.parse(localStorage.getItem(FT_KEY) || "[]");
}

// حفظ البيانات
function ftSave(data) {
  localStorage.setItem(FT_KEY, JSON.stringify(data));
}

// حساب الزيارة القادمة
function ftNextVisit(last, cycle) {
  const d = new Date(last);
  d.setDate(d.getDate() + Number(cycle));
  return d.toISOString().split("T")[0];
}

// إضافة عقد
function ftAddContract(form) {
  const data = ftLoad();
  const c = {
    id: Date.now(),
    client: form.client.value,
    phone: form.phone.value,
    service: form.service.value,
    cycle: form.cycle.value,
    period: form.period.value,
    startDate: form.startDate.value,
    lastVisit: form.lastVisit.value,
    cost: form.cost.value,
  };
  data.push(c);
  ftSave(data);
  form.reset();
  ftRender();
}

// حذف عقد
function ftDelete(id) {
  ftSave(ftLoad().filter(c => c.id !== id));
  ftRender();
}

// رسالة واتساب
function ftWhatsApp(c) {
  const next = ftNextVisit(c.lastVisit, c.cycle);
  const text = `
السلام عليكم
نود إفادتكم بموعد زيارة

الخدمة: ${c.service}
العميل: ${c.client}

📅 الموعد: ${next}
💰 تكلفة الزيارة: ${c.cost} جنيه

🔔 يتم الدفع عقب انتهاء الأعمال مباشرة
عبر اتصالات كاش:
01150402031

فريق FutureTank
`;
  return `https://wa.me/2${c.phone}?text=${encodeURIComponent(text)}`;
}

// عرض العقود
function ftRender() {
  const body = document.getElementById("contractsBody");
  if (!body) return;
  body.innerHTML = "";
  ftLoad().forEach(c => {
    const next = ftNextVisit(c.lastVisit, c.cycle);
    body.innerHTML += `
<tr>
<td>${c.client}</td>
<td>${c.service}</td>
<td>${c.cycle} يوم</td>
<td>${c.lastVisit}</td>
<td>${next}</td>
<td>${c.cost} جنيه</td>
<td><a href="${ftWhatsApp(c)}" target="_blank">واتساب</a></td>
<td><button onclick="ftDelete(${c.id})">✖</button></td>
</tr>`;
  });
}

// 🔔 فحص الزيارات قبل 5 أيام
function ftCheckUpcoming(days = 5) {
  const today = new Date();
  const sent = JSON.parse(localStorage.getItem(FT_SENT_KEY) || "[]");

  ftLoad().forEach(c => {
    const next = new Date(ftNextVisit(c.lastVisit, c.cycle));
    const diff = Math.ceil((next - today) / (1000 * 60 * 60 * 24));

    if (diff === days && !sent.includes(c.id)) {
      alert(`🔔 زيارة قريبة بعد ${days} أيام:\n${c.client} – ${c.service}`);
      sent.push(c.id);
    }
  });

  localStorage.setItem(FT_SENT_KEY, JSON.stringify(sent));
}

// تشغيل تلقائي عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  ftRender();
  ftCheckUpcoming(5);
});
