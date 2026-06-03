/* 👥 نظام التقييمات التفاعلي */
const ratePopupBox = document.getElementById("ratePopup");
const rateBtnElement = document.getElementById("rateAppBtn");

if (rateBtnElement && ratePopupBox) {
  rateBtnElement.onclick = function(e) {
    e.preventDefault();
    ratePopupBox.style.display = "flex";
  };
}

function closeRatePopup() {
  if (ratePopupBox) ratePopupBox.style.display = "none";
}

function submitRate(stars) {
  alert("⭐ شكرًا لك على تقييم المنصة بـ " + stars + " نجوم! تم حفظ رأيك لدعم جودة الخدمات.");
  closeRatePopup();
}
