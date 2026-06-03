const API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec";

/* 🔍 بوابة العملاء المتكاملة */
function searchClient() {
  const phoneInput = document.getElementById("searchInput");
  const phone = phoneInput ? phoneInput.value.trim() : "";

  if (!phone) {
    alert("من فضلك أدخل رقم الهاتف");
    return;
  }

  const resultBox = document.getElementById("clientData");
  if (resultBox) resultBox.style.display = "none";

  fetch(`${API}?action=clientPortal&phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.success) {
        alert("❌ عفواً، هذا الرقم غير مسجل في نظام التعاقدات لدينا.");
        return;
      }

      if (resultBox) resultBox.style.display = "block";
      
      // تعبئة البيانات الأساسية والتفصيلية بالكامل
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
      
      // الحقول المتقدمة الجديدة التي كانت تظهر فارغة
      setText("sub_type", data.sub_type);
      setText("pay_status", data.pay_status);
      setText("contract_no", data.contract_no);
      setText("pay_method", data.pay_method);
      setText("installment", data.installment);
      setText("next_installment", formatDate(data.next_installment));
      setText("notes", data.notes);
      setText("account_status", data.account_status);

      // تحديث رابط الواتساب للتجديد الفوري
      const msg = `🛠️ طلب تجديد تعاقد بأسعار المنصة\n👤 الاسم: ${data.name}\n📞 الهاتف: ${data.phone}\n📜 رقم العقد: ${data.contract_no}`;
      const renewBtn = document.querySelector(".renew-btn");
      if (renewBtn) renewBtn.href = "https://wa.me/201150402031?text=" + encodeURIComponent(msg);
    })
    .catch(() => alert("حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً."));
}

/* 💧 تحميل الخدمات بالصور من الشيت */
function loadServices() {
  const list = document.getElementById("servicesList");
  const selectBox = document.getElementById("serviceSelect"); // لصفحة عميل جديد
  
  if (!list && !selectBox) return;

  fetch(`${API}?action=services`)
    .then(res => res.json())
    .then(data => {
      if (selectBox) {
        // إذا كنا في صفحة "عميل جديد" نملأ القائمة المنسدلة بكل الخدمات المتوفرة
        selectBox.innerHTML = data.map(s => `<option value="${s.name}">${s.name} - ${s.price} ج</option>`).join('');
        return;
      }

      if (list) {
        list.innerHTML = "";
        if (data.length === 0) {
          list.innerHTML = "<p style='text-align:center'>لا توجد خدمات حالياً</p>";
          return;
        }
        data.forEach(item => {
          list.innerHTML += `
            <div class="card" style="background:#fff; border-radius:12px; padding:15px; box-shadow:0 2px 10px rgba(0,0,0,0.05); text-align:center; margin-bottom:15px;">
              <img src="${item.image}" alt="${item.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
              <h3 style="color:#0b6fc2; margin:10px 0;">${item.name}</h3>
              <p style="color:#666; font-size:14px;">${item.desc}</p>
              <strong style="color:#ff9800; font-size:16px;">${item.price} جنيه</strong>
              <br><br>
              <button class="action-btn" onclick="orderService('${item.name}','${item.price}')" style="background:#0b6fc2; color:#fff; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:bold; width:100%;">🛠️ اطلب الخدمة الآن</button>
            </div>
          `;
        });
      }
    });
}

function orderService(name, price) {
  const cName = prompt("اكتب الاسم بالكامل:");
  if (!cName) return;
  const cPhone = prompt("اكتب رقم الهاتف:");
  if (!cPhone) return;
  const cAddress = prompt("اكتب العنوان بالتفصيل:");
  if (!cAddress) return;

  fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "saveOrder", name: cName, phone: cPhone, address: cAddress, items: name, total: price })
  })
  .then(res => res.json())
  .then(data => {
    const whatsappMsg = `🛠️ طلب خدمة جديد\n👤 الاسم: ${cName}\n📞 الهاتف: ${cPhone}\n📍 العنوان: ${cAddress}\n💧 الخدمة: ${name}\n💰 السعر: ${price} جنيه`;
    window.open(`https://wa.me/201150402031?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
    alert("✅ تم تسجيل طلبك بنجاح وجاري التواصل معك.");
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "—";
}

function formatDate(d) {
  if (!d || d === "—") return "—";
  return new Date(d).toLocaleDateString("ar-EG");
}

// تشغيل جلب الخدمات تلقائياً عند تحميل الصفحة
window.onload = function() {
  loadServices();
};
