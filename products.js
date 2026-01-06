const STORAGE_KEY = "ft_products";

document.addEventListener("DOMContentLoaded", loadProducts);

function loadProducts() {
  const grid = document.getElementById("productsGrid");
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (products.length === 0) {
    grid.innerHTML = "<p>لا توجد منتجات حالياً</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    let media = "";
    if (p.media) {
      media = p.mediaType === "video"
        ? `<video src="${p.media}" controls></video>`
        : `<img src="${p.media}">`;
    }

    card.innerHTML = `
      ${media}
      <h3>${p.name}</h3>
      <small>${p.brand || ""}</small><br>
      <small>القسم: ${p.category}</small><br>
      <strong>${p.price}</strong>
    `;

    grid.appendChild(card);
  });
}
