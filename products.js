const container = document.getElementById("products-container");
const products = JSON.parse(localStorage.getItem("ft_products")) || [];

container.innerHTML = "";

products.forEach(product => {
  container.innerHTML += `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>القسم: ${product.category}</p>
      <strong>${product.price}</strong>
    </div>
  `;
});
