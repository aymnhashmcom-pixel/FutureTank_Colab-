// ===== FutureTank System =====
const DB_KEY = "ft_db";

// ===== Helpers =====
function loadDB(){
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}");
}
function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
function todayStr(){
  return new Date().toISOString().split("T")[0];
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

// ===== Delete =====
function deleteContract(id){
  const db = loadDB();
  db.contracts = db.contracts.filter(c => c.id !== id);
  saveDB(db);
  renderContracts();
}

// ===== Execution Update =====
function updateExecution(id, status, notes=""){
  const db = loadDB();
  const c = db.contracts.find(x => x.id === id);
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

// ===== Auto Status Check (NEW) =====
function evaluateStatus(c){
  const today = todayStr();
  if(c.status !== "تم التنفيذ" && c.nextVisit < today){
    return "متأخر";
  }
  return c.status || "قادم";
}

// ===== Render Contracts =====
function renderContracts(){
  const db = loadDB();
  const body = document.getElementById("contractsBody");
  if(!body) return;

  body.innerHTML = "";

  (db.contracts || []).forEach(c=>{
    const status = evaluateStatus(c);

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
<td>${c.client}</td>
<td>${c.service}</td>
<td>${c.cycle} يوم</td>
<td>${c.lastVisit}</td>
<td>${c.nextVisit}</td>
<td>${c.cost} جنيه</td>
<td style="color:${status==='متأخر'?'red':'green'};font-weight:bold">
  ${status}
</td>
<td>
  <a target="_blank" href="https://wa.me/2${c.phone}?text=${msg}">واتساب</a>
</td>
<td>
  <button onclick="deleteContract(${c.id})">✖</button>
</td>
    `;
    body.appendChild(tr);
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", renderContracts);
