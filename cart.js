let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ تم إضافة المنتج إلى السلة");
}

function loadCart() {
  const cartList = document.getElementById("cartList");
  const totalBox = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartList.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.price} جنيه</p>
        <button onclick="removeItem(${index})">❌ حذف</button>
      </div>
    `;
  });

  totalBox.innerText = "الإجمالي: " + total + " جنيه";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let message = "🛒 طلب جديد:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} (${item.price} جنيه)%0A`;
    total += item.price;
  });

  message += `%0Aالإجمالي: ${total} جنيه`;

  window.open(
    "https://wa.me/201150402031?text=" + message,
    "_blank"
  );
    }
