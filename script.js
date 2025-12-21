import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore();

/* إضافة منتج */
window.addProduct = async function () {
  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();
  const video = document.getElementById("productVideo").value.trim();

  if (!name || !price || !image) {
    alert("⚠️ الاسم والسعر ورابط الصورة مطلوبين");
    return;
  }

  document.getElementById("productStatus").innerText = "⏳ جاري الإضافة...";

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      image,
      video,
      createdAt: new Date()
    });

    document.getElementById("productStatus").innerText = "✅ تم إضافة المنتج";
    loadProducts();
  } catch (e) {
    document.getElementById("productStatus").innerText = "❌ حدث خطأ";
    console.error(e);
  }
};

/* تحميل المنتجات */
async function loadProducts() {
  const list = document.getElementById("productsList");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));
  snapshot.forEach(docu => {
    const p = docu.data();
    list.innerHTML += `
      <div class="item">
        <b>${p.name}</b> – ${p.price} جنيه
        <button onclick="deleteProduct('${docu.id}')">🗑 حذف</button>
      </div>
    `;
  });
}

window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

loadProducts();
