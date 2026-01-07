function addContract() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const status = document.getElementById("status");

  if (!name || !phone) {
    status.innerText = "❌ أكمل البيانات";
    return;
  }

  const contracts =
    JSON.parse(localStorage.getItem("contracts")) || [];

  const existing = contracts.find(c => c.phone === phone);
  if (existing) {
    status.innerText = "⚠️ هذا الرقم مسجل بالفعل";
    return;
  }

  const contract = {
    name,
    phone,
    address,
    lastRenewal: new Date().toLocaleDateString("ar-EG")
  };

  contracts.push(contract);
  localStorage.setItem("contracts", JSON.stringify(contracts));

  status.innerText = "✅ تم حفظ التعاقد بنجاح";

  window.open(
    "https://wa.me/201150402031?text=" +
      encodeURIComponent("تم إضافة تعاقد جديد للعميل " + name)
  );
}
