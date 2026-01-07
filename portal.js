function renew() {
  const phone = document.getElementById("phone").value;
  if (!phone) return alert("ادخل رقم الموبايل");

  document.getElementById("result").innerHTML = `
    <hr>
    <p><b>العميل:</b> ${phone}</p>
    <p><b>الحالة:</b> منتهي</p>
    <button onclick="confirmRenew()">جدد التعاقد الآن</button>
  `;
}

function confirmRenew() {
  alert("✅ تم تجديد التعاقد بنجاح");
  window.location.href = "https://wa.me/201150402031?text=تم%20تجديد%20التعاقد";
}
