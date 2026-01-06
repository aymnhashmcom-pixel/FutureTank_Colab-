function getDB() {
  return JSON.parse(localStorage.getItem("ft_db")) || {
    customers: [],
    products: [],
    orders: []
  };
}

function saveDB(db) {
  localStorage.setItem("ft_db", JSON.stringify(db));
}

function loadSelectors() {
  const db = getDB();

  orderCustomer.innerHTML = "<option value=''>اختر العميل</option>";
  db.customers.forEach(c => {
    orderCustomer.innerHTML += `<option value="${c.name}">${c.name}</option>`;
  });

  orderProduct.innerHTML = "<option value=''>اختر المنتج</option>";
  db.products?.forEach(p => {
    orderProduct.innerHTML += `<option value="${p.name}">${p.name}</option>`;
  });
}

function addOrder() {
  const customer = orderCustomer.value;
  const product = orderProduct.value;
  const status = orderStatus.value;

  if (!customer || !product) return alert("اختر العميل والمنتج");

  const db = getDB();
  db.orders.push({
    id: Date.now(),
    customer,
    product,
    status,
    date: new Date().toLocaleDateString("ar-EG")
  });

  saveDB(db);
  location.reload();
}

function deleteOrder(id) {
  if (!confirm("حذف الطلب؟")) return;

  const db = getDB();
  db.orders = db.orders.filter(o => o.id !== id);
  saveDB(db);
  location.reload();
}

function renderOrders() {
  const db = getDB();
  const box = document.getElementById("ordersList");

  if (!db.orders.length) {
    box.innerHTML = "لا يوجد طلبات";
    return;
  }

  box.innerHTML = "";
  db.orders.forEach(o => {
    box.innerHTML += `
      <div class="item">
        <strong>${o.customer}</strong>
        <p>📦 ${o.product}</p>
        <p class="status">الحالة: ${o.status}</p>
        <small>${o.date}</small><br>
        <button onclick="deleteOrder(${o.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

loadSelectors();
renderOrders();
