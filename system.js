// ===== FutureTank System =====
const DB_KEY = "ft_db";

function loadDB(){
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}");
}

function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ===== Contracts =====
function ftAddContract(form){
  const db = loadDB();
  db.contracts = db.contracts || [];

  const cycleDays = parseInt(form.cycle.value);
  const last = new Date(form.lastVisit.value);
  const next = new Date(last);
  next.setDate(last.getDate() + cycleDays);

  db.contracts.push({
    id: Date.now(),
    client: form.client.value,
    phone: form.phone.value,
    service: form.service.value,
    cycle: cycleDays,
    period: form.period.value,
    startDate: form.startDate.value,
    lastVisit: form.lastVisit.value,
    nextVisit: next.toISOString().split("T")[0],
    cost: form.cost.value,
    status: "قادم",
    notes: ""
  });

  saveDB(db);
  form.reset();
  renderContracts();
}

function deleteContract(id){
  const db = loadDB();
  db.contracts = db.contracts.filter(c=>c.id!==id);
  saveDB(db);
  renderContracts();
}

// ===== Execution سجل التنفيذ =====
function updateExecution(id, status, notes){
  const db = loadDB();
  const c = db.contracts.find(c=>c.id===id);
  if(!c) return;

  c.status = status;
  c.notes = notes;

  if(status === "تم التنفيذ"){
    c.lastVisit = c.nextVisit;
    const next = new Date(c.lastVisit);
    next.setDate(next.getDate() + c.cycle);
    c.nextVisit = next.toISOString().split("T")[0];
  }

  saveDB(db);
  renderContracts();
}

// ===== Render =====
function renderContracts(){
  const db = loadDB();
  const body = document.getElementById("contractsBody");
  if(!body) return;
  body.innerHTML = "";

  (db.contracts || []).forEach(c=>{
    const msg = encodeURIComponent(
`السلام عليكم
نود إفادتكم بموعد زيارة

الخدمة: ${c.service}
العميل: ${c.client}

📅 الموعد: ${c.nextVisit}
💰 تكلفة الزيارة: ${c.cost} جنيه

🔔 يتم الدفع عقب انتهاء الأعمال مباشرة
عبر اتصالات كاش:
01150402031

فريق FutureTank`
    );

    const tr = document.createElement("tr");
    tr.innerHTML = `
<td>${c.client}<br>${c.phone}</td>
<td>${c.service}</td>
<td>${c.cycle} يوم</td>
<td>${c.lastVisit}</td>
<td>${c.nextVisit}</td>
<td>${c.cost} جنيه</td>
<td>${c.status || "قادم"}</td>

<td>
<select onchange="updateExecution(${c.id}, this.value, this.nextElementSibling.value)">
  <option ${c.status==="قادم"?"selected":""}>قادم</option>
  <option ${c.status==="تم التنفيذ"?"selected":""}>تم التنفيذ</option>
  <option ${c.status==="مؤجل"?"selected":""}>مؤجل</option>
</select>
<textarea placeholder="ملاحظات" style="width:100%">${c.notes||""}</textarea>
</td>

<td>
<a target="_blank"
href="https://wa.me/2${c.phone}?text=${msg}">
واتساب
</a>
</td>

<td>
<button onclick="deleteContract(${c.id})">✖</button>
</td>
    `;
    body.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", renderContracts);
