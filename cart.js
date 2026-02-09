// ====== إعداد السلة ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== إضافة منتج ======
function addToCart(name, price) {
  cart.push({
    name: name,
    price: price,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ تم إضافة المنتج إلى السلة");
}

// ====== عرض السلة ======
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalSpan = document.getElementById("total");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>🛒 السلة فارغة</p>";
    totalSpan.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItemsDiv.innerHTML += `
      <div class="card">
        <strong>${item.name}</strong><br>
        السعر: ${item.price} جنيه<br>
        <button onclick="removeItem(${index})">❌ حذف</button>
      </div>
    `;
  });

  totalSpan.textContent = total;
}

// ====== حذف عنصر ======
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ====== واتساب ======
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("❌ السلة فارغة");
    return;
  }

  let message = "🛒 طلب جديد:%0A";

  cart.forEach(item => {
    message += `- ${item.name} : ${item.price} جنيه%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `%0Aالإجمالي: ${total} جنيه`;

  window.open(`https://wa.me/?text=${message}`, "_blank");
}
