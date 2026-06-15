const API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

function searchClient() {
  const phoneInput = document.getElementById("searchInput");
  const phone = phoneInput ? phoneInput.value.trim() : "";

  if (!phone) { alert("من فضلك أدخل رقم الهاتف المتعاقد به"); return; }

  const resultBox = document.getElementById("clientData");
  if (resultBox) resultBox.style.display = "none";

  fetch(`${API}?action=clientPortal&phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.success) {
        alert("❌ عفواً، هذا الرقم غير مسجل في نظام التعاقدات الحالي لدينا.");
        return;
      }

      if (resultBox) resultBox.style.display = "block";
      
      let cleanPhone = data.phone;
      if(String(cleanPhone).length === 10 && !String(cleanPhone).startsWith("0")) {
          cleanPhone = "0" + cleanPhone;
      }

      document.getElementById("name").textContent = data.name || "—";
      document.getElementById("phone").textContent = cleanPhone || "—";
      document.getElementById("address").textContent = data.address || "—";
      document.getElementById("service").textContent = data.service || "—";
      document.getElementById("months").textContent = data.contract_months ? data.contract_months + " شهر" : "—";
      document.getElementById("visits").textContent = data.visits || "—";
      document.getElementById("cost").textContent = data.cost ? data.cost + " جنيه" : "—";
      document.getElementById("start").textContent = formatDate(data.contract_date);
      document.getElementById("end").textContent = formatDate(data.end_date);
      document.getElementById("last").textContent = formatDate(data.last_visit);
      document.getElementById("next").textContent = formatDate(data.next_visit);
      document.getElementById("remaining").textContent = data.remaining_days || "0";
      
      document.getElementById("sub_type").textContent = data.sub_type || "—";
      document.getElementById("pay_status").textContent = data.pay_status || "—";
      document.getElementById("contract_no").textContent = data.contract_no || "—";
      document.getElementById("pay_method").textContent = data.pay_method || "—";
      document.getElementById("installment").textContent = data.installment || "—";
      document.getElementById("next_installment").textContent = formatDate(data.next_installment);
      document.getElementById("notes").textContent = data.notes || "—";
      document.getElementById("account_status").textContent = data.account_status || "—";

      const msg = `🛠️ طلب تجديد تعاقد بأسعار المنصة الرسمية\n👤 الاسم: ${data.name}\n📞 الهاتف: ${cleanPhone}\n📜 رقم العقد: ${data.contract_no}`;
      const renewBtn = document.getElementById("whatsappRenewBtn");
      if (renewBtn) renewBtn.href = "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
    })
    .catch(() => alert("حدث خطأ في الاتصال بالسيرفر الرئيسي، يرجى إعادة المحاولة."));
}

function formatDate(d) {
  if (!d || d === "—") return "—";
  return new Date(d).toLocaleDateString("ar-EG");
}
