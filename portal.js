function checkContract() {
  const phone = document.getElementById("phone").value.trim();
  const result = document.getElementById("result");

  const contracts =
    JSON.parse(localStorage.getItem("contracts")) || [];

  const client = contracts.find(c => c.phone === phone);

  if (!client) {
    result.innerHTML = "❌ لا يوجد تعاقد بهذا الرقم";
    return;
  }

  result.innerHTML = `
    <p><b>الاسم:</b> ${client.name}</p>
    <p><b>العنوان:</b> ${client.address}</p>
    <p><b>آخر تجديد:</b> ${client.lastRenewal}</p>
    <button onclick="renewContract('${client.phone}')">
      🔁 جدد التعاقد
    </button>
  `;
}

function renewContract(phone) {
  const contracts =
    JSON.parse(localStorage.getItem("contracts")) || [];

  const client = contracts.find(c => c.phone === phone);
  if (!client) return;

  client.lastRenewal = new Date().toLocaleDateString("ar-EG");
  localStorage.setItem("contracts", JSON.stringify(contracts));

  window.open(
    "https://wa.me/201150402031?text=" +
      encodeURIComponent("تم تجديد تعاقد العميل " + client.name)
  );

  alert("✅ تم تجديد التعاقد بنجاح");
}
