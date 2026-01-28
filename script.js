const API =
  "https://script.google.com/macros/s/AKfycbwFU-0YAoqGHyZnHNOQwimoHzzJ6EqX8D-vWiY2DsL8E---HDxUkgNu3tyQ15itWJrd/exec";

/* ===============================
   أدوات مساعدة
================================ */
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ar-EG");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "—";
}

function isActive(status) {
  if (!status) return false;
  return status === "active" || status === "نشط";
}

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
    .then(res => res.json())
    .then(data => {
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
      setText("cost", data.cost ? data.cost + " جنيه" : "—");

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
      `;

      const renewBtn = document.querySelector(".renew-btn");
      if (renewBtn) {
        renewBtn.href =
          "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
      }
    })
    .catch(() => alert("حدث خطأ في الاتصال"));
}

/* ===============================
   تحميل الخدمات
================================ */
function loadServices() {
  fetch(API + "?type=services")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("servicesList");
      list.innerHTML = "";

      if (!data || !data.length) {
        list.innerHTML = "<p style='text-align:center'>لا توجد خدمات حالياً</p>";
        return;
      }

      data.forEach(item => {
        if (!isActive(item.status)) return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <strong>${item.price} جنيه</strong>
        `;

        list.appendChild(card);
      });
    })
    .catch(() => {
      document.getElementById("servicesList").innerHTML =
        "<p style='text-align:center'>خطأ في تحميل الخدمات</p>";
    });
}

/* ===============================
   تحميل المنتجات
================================ */
function loadProducts() {
  fetch(API + "?type=products")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productsList");
      list.innerHTML = "";

      if (!data || !data.length) {
        list.innerHTML = "<p style='text-align:center'>لا توجد منتجات حالياً</p>";
        return;
      }

      data.forEach(item => {
        if (!isActive(item.status)) return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <strong>${item.price} جنيه</strong>
        `;

        list.appendChild(card);
      });
    })
    .catch(() => {
      document.getElementById("productsList").innerHTML =
        "<p style='text-align:center'>خطأ في تحميل المنتجات</p>";
    });
}
