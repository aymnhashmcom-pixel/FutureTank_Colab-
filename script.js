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
      if (!data || data.error) {
        alert("العميل غير موجود");
        return;
      }

      const box = document.getElementById("clientData");
      box.classList.remove("hidden");

      setText("name", data.name);
      setText("phone", data.phone);
      setText("address", data.address);
      setText("service", data.service);
      setText("months", data.contract_months);
      setText("visits", data.visits);
      setText("cost", data.cost);

      setText("start", formatDate(data.contract_date));
      setText("end", formatDate(data.end_date));
      setText("last", formatDate(data.last_visit));
      setText("next", formatDate(data.next_visit));
      setText("remaining", data.remaining_days);

      const msg = `
السلام عليكم
أرغب في تجديد التعاقد
الاسم: ${data.name || ""}
الهاتف: ${data.phone || ""}
الخدمة: ${data.service || ""}
      `.trim();

      const renewBtn = document.querySelector(".renew-btn");
      if (renewBtn) {
        renewBtn.href =
          "https://wa.me/201150402031?text=" +
          encodeURIComponent(msg);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("حدث خطأ في الاتصال");
    });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value ? value : "—";
}

function formatDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("ar-EG");
}

/* ===== دعم active / نشط ===== */
function isActive(status) {
  if (!status) return false;
  const s = status.toString().toLowerCase();
  return s === "active" || s === "نشط";
}
