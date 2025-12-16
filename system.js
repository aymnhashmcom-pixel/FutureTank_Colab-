// ===== FutureTank System v7 =====
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
  const cycle = parseInt(form.cycle.value);
  const last = new Date(form.lastVisit.value);
  const next = new Date(last);
  next.setDate(last.getDate() + cycle);

  db.contracts.push({
    id: Date.now(),
    client: form.client.value,
    phone: form.phone.value,
    service: form.service.value,
    cycle,
    period: form.period.value,
    startDate: form.startDate.value,
    lastVisit: form.lastVisit.value,
    nextVisit: next.toISOString().split("T")[0],
    cost: Number(form.cost.value),
    status: "قادم"
  });

  saveDB(db);
  form.reset();
  renderContracts();
}

function deleteContract(id){
  const db = loadDB();
  db.contracts = (db.contracts||[]).filter(c=>c.id!==id);
  saveDB(db);
  renderContracts();
}

// ===== Execution + Finance =====
function executeVisit(id){
  const db = loadDB();
  const c = db.contracts.find(x=>x.id===id);
  if(!c) return;

  c.status = "تم التنفيذ";
  c.lastVisit = c.nextVisit;
  const next = new Date(c.lastVisit);
  next.setDate(next.getDate() + c.cycle);
  c.nextVisit = next.toISOString().split("T")[0];

  // 💰 تسجيل الدخل
  db.finance = db.finance || [];
  db.finance.push({
    type: "دخل",
    client: c.client,
    service: c.service,
    amount: c.cost,
    date: new Date().toISOString().split("T")[0]
  });

  saveDB(db);
  location.reload();
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
<button onclick="executeVisit(${c.id})">تم التنفيذ</button>
</td>
<td>
<button onclick="deleteContract(${c.id})">✖</button>
</td>
    `;
    body.appendChild(tr);
  });
}
