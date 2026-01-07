async function save() {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;

  if (!name || !phone) return alert("أكمل البيانات");

  const data = await fetch("contracts.json").then(r => r.json());

  data.push({
    name,
    phone,
    address,
    date: new Date().toLocaleDateString("ar-EG")
  });

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "contracts.json";
  a.click();

  window.open(`https://wa.me/201150402031?text=تم%20إضافة%20تعاقد%20جديد%20${name}`);
}
