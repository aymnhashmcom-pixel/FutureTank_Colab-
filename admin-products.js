const STORAGE_KEY = "ft_products";
const form = document.getElementById("productForm");
const list = document.getElementById("productsList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("media").files[0];

  const product = {
    id: Date.now(),
    name: name.value,
    brand: brand.value || "",
    category: category.value,
    price: price.value,
    media: "",
    mediaType: ""
  };

  if (file) {
    const base64 = await toBase64(file);
    product.media = base64;
    product.mediaType = file.type.startsWith("video") ? "video" : "image";
  }

  const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  form.reset();
  renderProducts();
});

function renderProducts() {
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
        <strong>${p.name}</strong><br>
        ${p.category} – ${p.price}<br>
        <button onclick="removeProduct(${p.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

function removeProduct(id) {
  let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  renderProducts();
}

function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

renderProducts();
