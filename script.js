const API =
  "https://script.google.com/macros/s/AKfycbwFU-0YAoqGHyZnHNOQwimoHzzJ6EqX8D-vWiY2DsL8E---HDxUkgNu3tyQ15itWJrd/exec";

function searchClient() {
  const phoneInput = document.getElementById("searchInput");
  const phone = phoneInput.value.trim();

  if (!phone) {
    alert("من فضلك أدخل رقم الهاتف");
    return;
  }

  fetch(API + "?phone=" + encodeURIComponent(phone))
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert("العميل غير موجود");
        return;
      }

      // إظهار البوكس
      const box = document.getElementById("clientData");
      box.classList.remove("hidden");

      // تعبئة البيانات
      document.getElementById("name").textContent = data.name || "—";
      document.getElementById("phone").textContent = data.phone || "—";
      document.getElementById("address").textContent = data.address || "—";
      document.getElementById("service").textContent = data.service || "—";
      document.getElementById("months").textContent = data.contract_months || "—";
      document.getElementById("visits").textContent = data.visits || "—";
      document.getElementById("cost").textContent = data.cost || "—";

      document.getElementById("start").textContent = formatDate(
        data.contract_date
      );
      document.getElementById("end").textContent = formatDate(data.end_date);
      document.getElementById("last").textContent = formatDate(data.last_visit);
      document.getElementById("next").textContent = formatDate(data.next_visit);
      document.getElementById("remaining").textContent =
        data.remaining_days || "—";

      // تحديث زر واتساب
      const msg = `
السلام عليكم
أرغب في تجديد التعاقد
الاسم: ${data.name}
الهاتف: ${data.phone}
الخدمة: ${data.service}
      `;

      const renewBtn = document.querySelector(".renew-btn");
      renewBtn.href =
        "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
    })
    .catch(() => {
      alert("حدث خطأ في الاتصال");
    });
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ar-EG");
}
