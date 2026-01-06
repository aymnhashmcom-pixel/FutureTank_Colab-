/*********************************
 *  Admin Products Logic
 *  FutureTank
 *********************************/

const STORAGE_KEY = "ft_products";

/* تحميل المنتجات عند فتح الصفحة */
document.addEventListener("DOMContentLoaded", loadProducts);

/* إضافة منتج */
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const brand = document.getElementById("productBrand").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = document.getElementById("productPrice").value;
  const description = document.getElementById("productDescription").value.trim();
  const mediaInput = document.getElementById("productMedia");

  if (!name || !price) {
    alert("⚠️ اسم المنتج والسعر مطلوبين");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    brand,
    category,
    price,
    description,
    media: null,
    mediaType: null
  };

  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      product.media = e.target.result;
      product.mediaType = file.type.startsWith("video") ? "video" : "image";
      saveProduct(product);
    };

    reader.readAsDataURL(file);
  } else {
    saveProduct(product);
  }
}

/* حفظ المنتج */
function saveProduct(product) {
  const products = getProducts();
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  clearForm();
  loadProducts();
}

/* تحميل وعرض المنتجات */
function loadProducts() {
  const list = document.getElementById("productsList");
  list.innerHTML = "";

  const products = getProducts();

  if (products.length === 0) {
    list.innerHTML = "<p>لا توجد منتجات حالياً</p>";
    return;
  }

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "product-item";

    let mediaHTML = "";
    if (product.media) {
      if (product.mediaType === "video") {
        mediaHTML = `<video src="${product.media}" muted></video>`;
      } else {
        mediaHTML = `<img src="${product.media}">`;
      }
    }

    item.innerHTML = `
      ${mediaHTML}
      <div style="flex:1">
        <strong>${product.name}</strong><br>
        <small>${product.brand || ""}</small><br>
        <small>القسم: ${product.category}</small><br>
        <small>السعر: ${product.price}</small>
      </div>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">حذف</button>
    `;

    list.appendChild(item);
  });
}

/* حذف منتج */
function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من حذف المنتج؟")) return;

  let products = getProducts();
  products = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  loadProducts();
}

/* أدوات مساعدة */
function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productBrand").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productMedia").value = "";
      }
