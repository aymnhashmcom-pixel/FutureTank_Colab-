const products = [
  {
    name: "خزان مياه بولي إيثيلين",
    category: "خزانات مياه",
    price: "12 ألف جنيه مصري",
    image: "https://i.imgur.com/8QfQY5y.png"
  },
  {
    name: "فلتر مياه 5 مراحل",
    category: "فلاتر مياه",
    price: "4,500 جنيه مصري",
    image: "https://i.imgur.com/4AiXzf8.png"
  },
  {
    name: "جهاز رياضي منزلي",
    category: "أجهزة رياضية",
    price: "8,200 جنيه مصري",
    image: "https://i.imgur.com/1KegWPz.png"
  }
];

const container = document.getElementById("products");

products.forEach(p => {
  container.innerHTML += `
    <div class="product-card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>القسم: ${p.category}</p>
      <strong>${p.price}</strong>
    </div>
  `;
});
