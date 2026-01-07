document.addEventListener("DOMContentLoaded", () => {

  const products = [
    {
      name: "خزان مياه بولي إيثيلين",
      category: "خزانات مياه",
      price: "12,000 جنيه مصري",
      image: "https://via.placeholder.com/300x200?text=FutureTank"
    },
    {
      name: "فلتر مياه 5 مراحل",
      category: "فلاتر مياه",
      price: "4,500 جنيه مصري",
      image: "https://via.placeholder.com/300x200?text=Filter"
    },
    {
      name: "جهاز رياضي منزلي",
      category: "أجهزة رياضية",
      price: "8,200 جنيه مصري",
      image: "https://via.placeholder.com/300x200?text=Gym"
    }
  ];

  const container = document.getElementById("products");

  if (!container) return;

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

});
