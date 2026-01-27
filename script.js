const API_URL =
  "https://script.google.com/macros/s/AKfycbxHE2unMaaiYKL0-u20jPa3pFoF1cnY7GYqe5rvIKcP8MrtPcQk-3hK5v-rRGaLNJdB/exec";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("ar-EG");
}

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
      document.getElementById("clientPhone").textContent = data.phone;
      document.getElementById("clientAddress").textContent = data.address;
      document.getElementById("clientService").textContent = data.service;

      document.getElementById("contractMonths").textContent = data.contract_months;
      document.getElementById("visitsCount").textContent = data.visits;
      document.getElementById("contractCost").textContent = data.cost;

      document.getElementById("contractDate").textContent = formatDate(data.contract_date);
      document.getElementById("contractEnd").textContent = formatDate(data.end_date);
      document.getElementById("lastVisit").textContent = formatDate(data.last_visit);
      document.getElementById("nextVisit").textContent = formatDate(data.next_visit);

      document.getElementById("remainingDays").textContent = data.remaining_days;

      const msg = "مرحبا ارغب في تجديد التعاقد مع Future Tank";
      document.getElementById("renewBtn").href =
        `https://wa.me/201150402031?text=${encodeURIComponent(msg)}`;
    })
    .catch(() => {
      alert("حدث خطأ في الاتصال بالسيرفر");
    });
}
