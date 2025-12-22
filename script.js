const db = firebase.firestore();

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();
  const video = document.getElementById("productVideo").value.trim();
  const status = document.getElementById("productStatus");

  if (!name || !price || !image) {
    status.innerText = "❌ برجاء إدخال الاسم والسعر ورابط الصورة";
    return;
  }

  status.innerText = "⏳ جاري الإضافة...";

  db.collection("products").add({
    name,
    price,
    image,
    video,
    createdAt: new Date()
  })
  .then(() => {
    status.innerText = "✅ تم إضافة المنتج بنجاح";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productVideo").value = "";
    loadProducts();
  })
  .catch(err => {
    status.innerText = "❌ فشل الإضافة";
    console.error(err);
  });
}

function loadProducts() {
  const list = document.getElementById("productsList");
  list.innerHTML = "";

  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const p = doc.data();
      list.innerHTML += `
        <div>
          <b>${p.name}</b> – ${p.price} جنيه
        </div>
      `;
    });
  });
}

loadProducts();
