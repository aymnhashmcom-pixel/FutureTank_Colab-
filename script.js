const API_URL = "https://script.google.com/macros/s/AKfycbxHE2unMaaiYKL0-u20jPa3pFoF1cnY7GYqe5rvIKcP8MrtPcQk-3hK5v-rRGaLNJdB/exec";

function searchClient() {
  const phone = document.getElementById("searchInput").value.trim();
  if (!phone) {
    alert("من فضلك اكتب رقم الهاتف");
    return;
  }

  fetch(`${API_URL}?phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert("العميل غير موجود");
        return;
      }

      document.getElementById("clientData").classList.remove("hidden");

      document.getElementById("name").textContent      = data.name || "-";
      document.getElementById("phone").textContent     = data.phone || "-";
      document.getElementById("address").textContent   = data.address || "-";
      document.getElementById("service").textContent   = data.service || "-";
      document.getElementById("months").textContent    = data.contract_months || "-";
      document.getElementById("visits").textContent    = data.visits || "-";
      document.getElementById("cost").textContent      = data.cost || "-";
      document.getElementById("start").textContent     = formatDate(data.contract_date);
      document.getElementById("end").textContent       = formatDate(data.end_date);
      document.getElementById("last").textContent      = formatDate(data.last_visit);
      document.getElementById("next").textContent      = formatDate(data.next_visit);
      document.getElementById("remaining").textContent = data.remaining_days;

    })
    .catch(() => {
      alert("حدث خطأ في الاتصال");
    });
}

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("ar-EG");
}
