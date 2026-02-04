let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة ✅");
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  let total = 0;
  container.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="card">
        <h4>${item.name}</h4>
        <p>${item.price} جنيه × ${item.qty}</p>
        <button onclick="removeItem(${i})">❌ حذف</button>
      </div>
    `;
  });

  totalEl.innerText = total;
}

function checkoutWhatsApp() {
  let message = "🛒 طلب جديد:\n";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} × ${item.qty} (${item.price * item.qty} جنيه)\n`;
    total += item.price * item.qty;
  });

  message += `\nالإجمالي: ${total} جنيه`;
  window.open(`https://wa.me/201150402031?text=${encodeURIComponent(message)}`);
}
