const API_URL =
  "https://script.google.com/macros/s/AKfycbxHE2unMaaiYKL0-u20jPa3pFoF1cnY7GYqe5rvIKcP8MrtPcQk-3hK5v-rRGaLNJdB/exec";

function searchClient() {
  const phone = document.getElementById("phoneInput").value.trim();

  if (!phone) {
    alert("من فضلك أدخل رقم الموبايل");
    return;
  }

  fetch(`${API_URL}?phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(data => {

      if (data.error) {
        document.getElementById("clientData").classList.add("hidden");
        document.getElementById("errorMsg").classList.remove("hidden");
        return;
      }

      document.getElementById("errorMsg").classList.add("hidden");
      document.getElementById("clientData").classList.remove("hidden");

      document.getElementById("clientName").textContent = data.name;
      document.getElementById("clientService").textContent = data.service;
      document.getElementById("clientEnd").textContent =
        new Date(data.end_date).toLocaleDateString("ar-EG");

      document.getElementById("remainingDays").textContent =
        data.remaining_days + " يوم";

      const msg = "مرحبا ارغب في تجديد التعاقد مع Future Tank";
      document.getElementById("renewBtn").href =
        `https://wa.me/201150402031?text=${encodeURIComponent(msg)}`;
    })
    .catch(err => {
      console.error(err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    });
}
