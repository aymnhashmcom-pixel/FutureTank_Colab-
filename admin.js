async function addContract() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const status = document.getElementById("status");

  if (!name || !phone) {
    status.innerText = "❌ أكمل البيانات";
    return;
  }

  const response = await fetch("contracts.json");
  const contracts = await response.json();

  contracts.push({
    name,
    phone,
    address,
    date: new Date().toLocaleDateString("ar-EG")
  });

  const blob = new Blob(
    [JSON.stringify(contracts, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "contracts.json";
  a.click();

  status.innerText = "✅ تم حفظ التعاقد – ارفع الملف على GitHub";

  window.open(
    "https://wa.me/201150402031?text=تم%20إضافة%20تعاقد%20جديد%20للعميل%20" + name
  );
}
