function getDB() {
  return JSON.parse(localStorage.getItem("ft_db")) || { customers: [] };
}

function saveDB(db) {
  localStorage.setItem("ft_db", JSON.stringify(db));
}

function addCustomer() {
  const name = custName.value.trim();
  const phone = custPhone.value.trim();
  const address = custAddress.value.trim();

  if (!name || !phone) return alert("الاسم ورقم الهاتف مطلوبان");

  const db = getDB();
  db.customers.push({
    id: Date.now(),
    name,
    phone,
    address
  });

  saveDB(db);
  location.reload();
}

function deleteCustomer(id) {
  if (!confirm("هل تريد حذف العميل؟")) return;

  const db = getDB();
  db.customers = db.customers.filter(c => c.id !== id);
  saveDB(db);
  location.reload();
}

function renderCustomers() {
  const db = getDB();
  const box = document.getElementById("customersList");

  if (!db.customers || !db.customers.length) {
    box.innerHTML = "لا يوجد عملاء بعد";
    return;
  }

  box.innerHTML = "";
  db.customers.forEach(c => {
    box.innerHTML += `
      <div class="item">
        <strong>${c.name}</strong>
        <p>📞 ${c.phone}</p>
        <p>${c.address || ""}</p>
        <button onclick="deleteCustomer(${c.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

renderCustomers();
