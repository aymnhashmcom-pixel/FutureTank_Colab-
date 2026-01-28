const API =
  "https://script.google.com/macros/s/AKfycbwFU-0YAoqGHyZnHNOQwimoHzzJ6EqX8D-vWiY2DsL8E---HDxUkgNu3tyQ15itWJrd/exec";

/* ===============================
   بوابة العملاء
================================ */
function searchClient() {
  const phone = document.getElementById("searchInput").value.trim();

  if (!phone) {
    alert("من فضلك أدخل رقم الهاتف");
    return;
  }

  fetch(API + "?phone=" + encodeURIComponent(phone))
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.error) {
        alert("العميل غير موجود");
        return;
      }

      const box = document.getElementById("clientData");
      box.style.display = "block";

      setText("name", data.name);
      setText("phone", data.phone);
      setText("address", data.address);
      setText("service", data.service);
      setText("months", data.contract_months);
      setText("visits", data.visits);
      setText("cost", data.cost ? data.cost + " جنيه" : "—");

      setText("start", formatDate(data.contract_date));
      setText("end", formatDate(data.end_date));
      setText("last", formatDate(data.last_visit));
      setText("next", formatDate(data.next_visit));
      setText("remaining", data.remaining_days);

      // زر واتساب
      const msg = `
السلام عليكم
أرغب في تجديد التعاقد
الاسم: ${data.name || ""}
الهاتف: ${data.phone || ""}
الخدمة: ${data.service || ""}
      `;

      const renewBtn = document.querySelector(".renew-btn");
      if (renewBtn) {
        renewBtn.href =
          "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
      }
    })
    .catch(() => {
      alert("حدث خطأ في الاتصال");
    });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "—";
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ar-EG");
}

/* ===============================
   فلترة الخدمات والمنتجات
   تقبل active أو نشط
================================ */
function isActive(status) {
  if (!status) return false;
  return status === "active" || status === "نشط";
}
