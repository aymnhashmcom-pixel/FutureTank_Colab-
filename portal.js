async function renew() {
  const phone = document.getElementById("phone").value;
  const data = await fetch("contracts.json").then(r => r.json());

  const client = data.find(c => c.phone === phone);

  if (!client) {
    document.getElementById("result").innerHTML = "❌ لا يوجد تعاقد";
    return;
  }

  document.getElementById("result").innerHTML = `
    <p><b>الاسم:</b> ${client.name}</p>
    <p><b>العنوان:</b> ${client.address}</p>
    <p><b>آخر تجديد:</b> ${client.date}</p>
    <button onclick="confirmRenew('${client.name}')">جدد التعاقد</button>
  `;
}

function confirmRenew(name) {
  alert("✅ تم تأكيد التجديد");
  window.location.href =
    `https://wa.me/201150402031?text=تم%20تجديد%20تعاقد%20${name}`;
}
