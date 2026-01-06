function getDB() {
  return JSON.parse(localStorage.getItem("ft_db")) || {
    customers: [],
    services: [],
    contracts: []
  };
}

function saveDB(db) {
  localStorage.setItem("ft_db", JSON.stringify(db));
}

function loadSelectors() {
  const db = getDB();

  contractCustomer.innerHTML = "<option value=''>اختر العميل</option>";
  db.customers.forEach(c => {
    contractCustomer.innerHTML += `<option value="${c.name}">${c.name}</option>`;
  });

  contractService.innerHTML = "<option value=''>اختر الخدمة</option>";
  db.services?.forEach(s => {
    contractService.innerHTML += `<option value="${s.name}">${s.name}</option>`;
  });
}

function addContract() {
  const customer = contractCustomer.value;
  const service = contractService.value;
  const start = startDate.value;
  const months = parseInt(monthsInput = months.value);

  if (!customer || !service || !start) {
    alert("أكمل البيانات");
    return;
  }

  const startD = new Date(start);
  const endD = new Date(startD);
  endD.setMonth(endD.getMonth() + months);

  const db = getDB();
  db.contracts.push({
    id: Date.now(),
    customer,
    service,
    start: startD.toISOString(),
    end: endD.toISOString()
  });

  saveDB(db);
  location.reload();
}

function deleteContract(id) {
  if (!confirm("حذف العقد؟")) return;

  const db = getDB();
  db.contracts = db.contracts.filter(c => c.id !== id);
  saveDB(db);
  location.reload();
}

function renderContracts() {
  const db = getDB();
  const box = document.getElementById("contractsList");
  const now = new Date();

  if (!db.contracts.length) {
    box.innerHTML = "لا يوجد عقود";
    return;
  }

  box.innerHTML = "";
  db.contracts.forEach(c => {
    const end = new Date(c.end);
    const active = end > now;

    box.innerHTML += `
      <div class="item">
        <strong>${c.customer}</strong>
        <p>🧰 ${c.service}</p>
        <p class="${active ? "active" : "expired"}">
          ${active ? "ساري حتى" : "منتهي"}: ${end.toLocaleDateString("ar-EG")}
        </p>
        <button onclick="deleteContract(${c.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

loadSelectors();
renderContracts();
