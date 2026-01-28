const API = "https://script.google.com/macros/s/AKfycbw_3BPEWUkLFirsOGUp77QDK7tRftx8QPO7sBexroEeSzdoI1UrAcMf_93fo_WOz8Hq/exec";

// ===== Services =====
function loadServices(){
  fetch(API + "?type=services")
    .then(r => r.json())
    .then(data => {
      const box = document.getElementById("servicesList");
      if(!box) return;
      box.innerHTML = "";
      data.forEach(s => {
        box.innerHTML += `
          <div class="card">
            <img src="${s.image}" alt="${s.name}">
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
            <strong>${s.price} جنيه</strong>
          </div>
        `;
      });
    });
}

// ===== Products =====
function loadProducts(){
  fetch(API + "?type=products")
    .then(r => r.json())
    .then(data => {
      const box = document.getElementById("productsList");
      if(!box) return;
      box.innerHTML = "";
      data.forEach(p => {
        box.innerHTML += `
          <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <strong>${p.price} جنيه</strong>
          </div>
        `;
      });
    });
}
