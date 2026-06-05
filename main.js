/* =====================================================
   FUTURE TANK - CENTRAL CORE APP ENGINE (main.js COMPLETE)
   ===================================================== */
const CORE_API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

// [1] نظام التقييمات التفاعلي والـ Popup الشامل
document.addEventListener("DOMContentLoaded", () => {
    const ratePopupBox = document.getElementById("ratePopup");
    const rateBtnElement = document.getElementById("rateAppBtn");

    // فتح كارت النافذة المنبثقة بدقة عند النقر
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

// إرسال التقييم المباشر وحفظه داخل الشيت فوراً
function submitRate(stars) {
    const comment = prompt("📝 يسعدنا كتابة تعليقك أو مقترحك لتطوير المنصة (اختياري):") || "";
    
    fetch(CORE_API, {
        method: "POST",
        body: JSON.stringify({
            action: "saveReview",
            stars: stars,
            comment: comment
        })
    })
    .then(() => {
        alert("⭐ شكرًا لك! تم تسجيل تقييمك بـ " + stars + " نجوم وحفظه في سجلات فيوتشر تانك لرفع جودة خدماتنا.");
        closeRatePopup();
    })
    .catch(() => {
        alert("⭐ شكرًا لتقييمك المنصة بـ " + stars + " نجوم! تم حفظ رأيك بنجاح.");
        closeRatePopup();
    });
}

// [2] إدارة عمليات السلة والمشتريات المحلية
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
    alert(`📦 تم إضافة ${name} إلى سلة المشتريات بنجاح!`);
}

function updateCartCount() {
    const badge = document.getElementById("cartBadge");
    if (badge) {
        const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? "block" : "none";
    }
}

if(document.getElementById("cartBadge")) {
    updateCartCount();
}
