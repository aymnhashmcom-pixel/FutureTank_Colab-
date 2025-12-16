// ===== FutureTank System =====
const DB_KEY = "ft_db";

function loadDB(){
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}");
}
function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ===== WhatsApp =====
function wa(phone, msg){
  const url = `https://wa.me/2${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url,"_blank");
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

// ===== Execution =====
function updateExecution(id){
  const db = loadDB();
  const c = db.contracts.find(c=>c.id===id);
  if(!c) return;

  c.status = "تم التنفيذ";
  c.lastVisit = c.nextVisit;

  const next = new Date(c.lastVisit);
  next.setDate(next.getDate()+c.cycle);
  c.nextVisit = next.toISOString().split("T")[0];

  db.logs = db.logs || [];
  db.logs.push({
    client:c.client,
    service:c.service,
    date:new Date().toISOString().split("T")[0]
  });

  // رسالة بعد التنفيذ
  wa(c.phone,
`تم تنفيذ خدمة:
${c.service}
نشكر ثقتك في FutureTank 💧
موعد الزيارة القادمة: ${c.nextVisit}`);

  saveDB(db);
  renderContracts();
}

// ===== Reminders =====
function ftGenerateWorkOrders(days){
  const db = loadDB();
  const today = new Date();
  const target = new Date();
  target.setDate(today.getDate()+days);

  (db.contracts||[]).forEach(c=>{
    const d = new Date(c.nextVisit);
    if(d.toDateString() === target.toDateString()){
      wa(c.phone,
`تذكير بموعد زيارة:
${c.service}
📅 ${c.nextVisit}
FutureTank 💧`);
    }
  });
}

// ===== Render =====
function renderContracts(){
  const db = loadDB();
  const body = document.getElementById("contractsBody");
  if(!body) return;

  body.innerHTML = "";
  (db.contracts||[]).forEach(c=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
<td>${c.client}</td>
<td>${c.service}</td>
<td>${c.cycle} يوم</td>
<td>${c.lastVisit}</td>
<td>${c.nextVisit}</td>
<td>${c.cost} جنيه</td>
<td>
<button onclick="wa('${c.phone}',
'استفسار بخصوص عقد ${c.client} — FutureTank')">
💬 واتساب
</button>
</td>
<td>
<button onclick="deleteContract(${c.id})">✖</button>
</td>
    `;
    body.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded",renderContracts);
