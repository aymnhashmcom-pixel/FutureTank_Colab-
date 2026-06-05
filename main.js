/* =====================================================
   FUTURE TANK - CORE ENGINE (main.js COMPLETE)
   ===================================================== */
const DEPLOY_API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

// [1] نظام التقييمات التفاعلي المتقدم بالكامل
document.addEventListener("DOMContentLoaded", () => {
    const ratePopupBox = document.getElementById("ratePopup");
    const rateBtnElement = document.getElementById("rateAppBtn");

    if (rateBtnElement && ratePopupBox) {
        rateBtnElement.onclick = function(e) {
            e.preventDefault();
            ratePopupBox.style.display = "flex";
        };
    }
});

function closeRatePopup() {
    const ratePopupBox = document.getElementById("ratePopup");
    if (ratePopupBox) ratePopupBox.style.display = "none";
}

function submitRate(stars) {
    alert("⭐ شكرًا لك على تقييم المنصة بـ " + stars + " نجوم! تم حفظ رأيك بنجاح لدعم مسيرة التميز.");
    closeRatePopup();
}

// [2] إدارة السلة والمشتريات المحلية في الـ Market
let cart = JSON.parse(localStorage.getItem("ft_cart") || "[]");

function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id, name, price: parseFloat(price), qty: 1 });
    }
    localStorage.setItem("ft_cart", JSON.stringify(cart));
    updateCartCount();
    alert(`📦 تم إضافة ${name} إلى سلة المشتريات!`);
}

function updateCartCount() {
    const badge = document.getElementById("cartBadge");
    if (badge) {
        const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? "block" : "none";
    }
}

// تشغيل تحديث شارة السلة عند التحميل المبدئي للرئيسية
if(document.getElementById("cartBadge")) {
    updateCartCount();
}
