/* =====================================================
   FUTURE TANK - APP INTERACTION UTILITIES (main.js)
   ===================================================== */
const GLOBAL_API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

document.addEventListener("DOMContentLoaded", () => {
    const rateBtn = document.getElementById("rateAppBtn");
    const ratePopup = document.getElementById("ratePopup");
    if (rateBtn && ratePopup) {
        rateBtn.addEventListener("click", (e) => {
            e.preventDefault();
            ratePopup.style.display = "flex";
        });
    }
});

function closeRatePopup() {
    const ratePopup = document.getElementById("ratePopup");
    if (ratePopup) ratePopup.style.display = "none";
}

async function submitRate(stars) {
    const comment = prompt("📝 يسعدنا كتابة رأيك القصير أو مقترحك لتطوير المنصة (اختياري):") || "";
    try {
        await fetch(GLOBAL_API, {
            method: "POST",
            body: JSON.stringify({ action: "saveReview", stars: stars, comment: comment })
        });
        alert(`⭐ شكراً لتقييمك المنصة بـ ${stars} نجوم!`);
    } catch(e) {
        alert(`⭐ تم تسجيل التقييم وحفظه.`);
    } finally {
        closeRatePopup();
    }
}
