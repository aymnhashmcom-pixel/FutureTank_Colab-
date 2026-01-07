const container = document.getElementById("products-container");
const products = JSON.parse(localStorage.getItem("ft_products")) || [];

container.innerHTML = "";

products.forEach(p => {
  container.innerHTML += `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>القسم: ${p.category}</p>
      <strong>${p.price}</strong>
    </div>
  `;
});
