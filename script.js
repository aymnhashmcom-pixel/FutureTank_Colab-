const API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

function searchClient() {
  const phoneInput = document.getElementById("searchInput");
  const phone = phoneInput ? phoneInput.value.trim() : "";

  if (!phone) {
    alert("من فضلك أدخل رقم الهاتف");
    return;
  }

  const resultBox = document.getElementById("clientData");
  if(resultBox) resultBox.innerHTML = "<p style='text-align:center'>⏳ جاري جلب بيانات التعاقد...</p>";

  // طلب البيانات باستخدام Action مخصص للبوابة
  fetch(`${API}?action=clientPortal&phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.success) {
        alert("❌ عفواً، هذا الرقم غير مسجل في نظام التعاقدات.");
        return;
      }

      // إظهار القسم وتعبئة البيانات
      document.getElementById("clientData").style.display = "block";
      
      setText("name", data.name);
      setText("phone", data.phone);
      setText("address", data.address);
      setText("service", data.service);
      setText("months", data.contract_months + " شهر");
      setText("visits", data.visits);
      setText("cost", data.cost + " جنيه");
      setText("start", formatDate(data.contract_date));
      setText("end", formatDate(data.end_date));
      setText("last", formatDate(data.last_visit));
      setText("next", formatDate(data.next_visit));
      setText("remaining", data.remaining_days);

      // تحديث رابط واتساب للتجديد
      const msg = `تجديد تعاقد:\nالاسم: ${data.name}\nالهاتف: ${data.phone}`;
      const renewBtn = document.querySelector(".renew-btn");
      if (renewBtn) renewBtn.href = "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
    })
    .catch(err => {
      console.error(err);
      alert("خطأ في الاتصال بالسيرفر");
    });
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val || "—";
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG");
}
