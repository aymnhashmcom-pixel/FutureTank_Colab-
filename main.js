const GLOBAL_API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

async function getApiData(action, params = {}) {
    let url = new URL(GLOBAL_API);
    url.searchParams.append("action", action);
    for (let key in params) url.searchParams.append(key, params[key]);
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) { return { success: false, error: e.message }; }
}

document.addEventListener("DOMContentLoaded", () => {
    const rateBtn = document.getElementById("rateAppBtn");
    const ratePopup = document.getElementById("ratePopup");
    if (rateBtn && ratePopup) {
        rateBtn.addEventListener("click", (e) => { e.preventDefault(); ratePopup.style.display = "flex"; });
    }
});

function closeRatePopup() {
    const ratePopup = document.getElementById("ratePopup");
    if (ratePopup) ratePopup.style.display = "none";
}

async function submitRate(stars) {
    const comment = prompt("📝 يسعدنا كتابة رأيك:");
    try {
        await fetch(GLOBAL_API, { method: "POST", body: JSON.stringify({ action: "saveReview", stars, comment }) });
        alert("شكراً لتقييمك!");
    } catch(e) { alert("تم الحفظ."); } finally { closeRatePopup(); }
}
