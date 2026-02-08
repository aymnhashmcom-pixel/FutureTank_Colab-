// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ تم إضافة المنتج إلى السلة");
}

// للعرض في صفحة cart.html
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>السعر: ${item.price} جنيه</p>
        <p>الكمية: ${item.qty}</p>
        <button onclick="removeItem(${index})">❌ حذف</button>
      </div>
    `;
  });

  totalEl.innerText = total + " جنيه";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
