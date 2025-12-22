// =======================
// Firebase init (لو موجود سيبه)
// =======================

// =======================
// إضافة منتج
// =======================
async function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();
  const video = document.getElementById("productVideo").value.trim();
  const status = document.getElementById("productStatus");

  status.innerText = "⏳ جاري الإضافة...";

  // تحقق بسيط جدًا (بدون تعقيد)
  if (!name || !price || !image) {
    status.innerText = "❌ من فضلك أدخل الاسم والسعر ورابط الصورة";
    return;
  }

  // تحقق من رابط الصورة
  if (!image.match(/\.(jpg|jpeg|png)$/i)) {
    status.innerText = "❌ رابط الصورة يجب أن ينتهي بـ jpg أو png";
    return;
  }

  try {
    await firebase.firestore().collection("products").add({
      name: name,
      price: Number(price),
      image: image,
      video: video || "",
      createdAt: new Date()
    });

    status.innerText = "✅ تم إضافة المنتج بنجاح";

    // تفريغ الحقول
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productVideo").value = "";

    loadProducts();

  } catch (error) {
    console.error(error);
    status.innerText = "❌ فشل الإضافة";
  }
}

// =======================
// تحميل المنتجات
// =======================
function loadProducts() {
  const list = document.getElementById("productsList");
  list.innerHTML = "⏳ تحميل...";

  firebase.firestore().collection("products")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      list.innerHTML = "";

      snapshot.forEach(doc => {
        const p = doc.data();

        list.innerHTML += `
          <div class="item">
            <img src="${p.image}" style="width:80px;border-radius:6px"><br>
            <strong>${p.name}</strong> – ${p.price} جنيه
            <br>
            <button onclick="deleteProduct('${doc.id}')">🗑 حذف</button>
          </div>
        `;
      });

      if (snapshot.empty) {
        list.innerHTML = "لا يوجد منتجات";
      }
    });
}

// =======================
// حذف منتج
// =======================
function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من الحذف؟")) return;

  firebase.firestore().collection("products").doc(id).delete();
}

// تحميل تلقائي
document.addEventListener("DOMContentLoaded", loadProducts);
