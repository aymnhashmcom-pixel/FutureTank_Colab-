const FT_KEY = "ft_contracts";

// تحميل البيانات
function ftLoad() {
  return JSON.parse(localStorage.getItem(FT_KEY) || "[]");
}

// حفظ البيانات
function ftSave(data) {
  localStorage.setItem(FT_KEY, JSON.stringify(data));
}

// إضافة عقد
function ftAddContract(form) {
  const data = ftLoad();

  const cycle = parseInt(form.cycle.value);
  const lastVisit = new Date(form.lastVisit.value);
  const nextVisit = new Date(lastVisit);
  nextVisit.setDate(lastVisit.getDate() + cycle);

  data.push({
    id: Date.now(),
    client: form.client.value,
    phone: form.phone.value,
    service: form.service.value,
    cycle,
    period: form.period.value,
    startDate: form.startDate.value,
    lastVisit: form.lastVisit.value,
    nextVisit: nextVisit.toISOString().split("T")[0],
    cost: form.cost.value
  });

  ftSave(data);
  form.reset();
  ftRender();
}

// حذف عقد
function ftDelete(id) {
  if (!confirm("تأكيد حذف العقد؟")) return;
  ftSave(ftLoad().filter(c => c.id !== id));
  ftRender();
}

// تم التنفيذ
function ftDone(id) {
  const data = ftLoad();
  const c = data.find(x => x.id === id);
  if (!c) return;

  const today = new Date();
  c.lastVisit = today.toISOString().split("T")[0];

  const next = new Date(today);
  next.setDate(today.getDate() + c.cycle);
  c.nextVisit = next.toISOString().split("T")[0];

  ftSave(data);
  ftRender();
}

// رسالة واتساب
function ftWhats(c) {
  const msg = `
السلام عليكم
نود إفادتكم بموعد زيارة

الخدمة: ${c.service}
العميل: ${c.client}

📅 الموعد: ${c.nextVisit}
💰 تكلفة الزيارة: ${c.cost} جنيه

🔔 يتم الدفع عقب انتهاء الأعمال مباشرة
عبر اتصالات كاش:
01150402031

فريق FutureTank
`.trim();

  return `https://wa.me/20${c.phone}?text=${encodeURIComponent(msg)}`;
}

// توليد أوامر الشغل (X أيام قبل الموعد)
function ftGenerateWorkOrders(days) {
  const today = new Date();
  const data = ftLoad();

  const due = data.filter(c => {
    const v = new Date(c.nextVisit);
    const diff = (v - today) / (1000 * 60 * 60 * 24);
    return diff <= days && diff >= 0;
  });

  if (!due.length) {
    alert("لا توجد زيارات مستحقة حالياً");
    return;
  }

  due.forEach(c => window.open(ftWhats(c), "_blank"));
}

// عرض الجدول
function ftRender() {
  const body = document.getElementById("contractsBody");
  if (!body) return;

  body.innerHTML = "";
  ftLoad().forEach(c => {
    body.innerHTML += `
<tr>
<td>${c.client}</td>
<td>${c.service}</td>
<td>${c.cycle} يوم</td>
<td>${c.lastVisit}</td>
<td>${c.nextVisit}</td>
<td>${c.cost} جنيه</td>
<td><a href="${ftWhats(c)}" target="_blank">واتساب</a></td>
<td>
<button onclick="ftDone(${c.id})">✔</button>
<button onclick="ftDelete(${c.id})">✖</button>
</td>
</tr>`;
  });
}

document.addEventListener("DOMContentLoaded", ftRender);
