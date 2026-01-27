const API = "https://script.google.com/macros/s/AKfycbxHE2unMaaiYKL0-u20jPa3pFoF1cnY7GYqe5rvIKcP8MrtPcQk-3hK5v-rRGaLNJdB/exec";

// ===== Services =====
function loadServices(){
  fetch(API + "?type=services")
    .then(r=>r.json())
    .then(data=>{
      const box = document.getElementById("servicesList");
      box.innerHTML = "";
      data.forEach(s=>{
        box.innerHTML += `
          <div class="card">
            <img src="${s.image}" alt="${s.name}">
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
            <span>${s.price} جنيه</span>
          </div>
        `;
      });
    });
}

// ===== Products =====
function loadProducts(){
  fetch(API + "?type=products")
    .then(r=>r.json())
    .then(data=>{
      const box = document.getElementById("productsList");
      box.innerHTML = "";
      data.forEach(p=>{
        box.innerHTML += `
          <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <span>${p.price} جنيه</span>
          </div>
        `;
      });
    });
}
