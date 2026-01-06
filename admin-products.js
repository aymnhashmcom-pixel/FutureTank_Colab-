function getDB() {
  return JSON.parse(localStorage.getItem("ft_db")) || { products: [] };
}

function saveDB(db) {
  localStorage.setItem("ft_db", JSON.stringify(db));
}

function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function addProduct() {
  const name = productName.value.trim();
  const price = productPrice.value;
  const desc = productDesc.value.trim();
  const file = productImage.files[0];

  if (!name || !price) return alert("اسم المنتج والسعر مطلوبان");

  const db = getDB();

  const saveProduct = (img = "") => {
    db.products.push({
      id: Date.now(),
      name,
      price,
      desc,
      image: img
    });
    saveDB(db);
    location.reload();
  };

  if (file) {
    readImage(file, saveProduct);
  } else {
    saveProduct();
  }
}

function deleteProduct(id) {
  if (!confirm("هل تريد حذف المنتج؟")) return;

  const db = getDB();
  db.products = db.products.filter(p => p.id !== id);
  saveDB(db);
  location.reload();
}

function renderProducts() {
  const db = getDB();
  const box = document.getElementById("productsList");

  if (!db.products || !db.products.length) {
    box.innerHTML = "لا توجد منتجات بعد";
    return;
  }

  box.innerHTML = "";
  db.products.forEach(p => {
    box.innerHTML += `
      <div class="item">
        <strong>${p.name}</strong>
        <p>💰 ${p.price} جنيه</p>
        <p>${p.desc || ""}</p>
        ${p.image ? `<img src="${p.image}">` : ""}
        <button onclick="deleteProduct(${p.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

renderProducts();
