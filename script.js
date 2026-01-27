function searchClient() {
  const input = document.getElementById("searchInput").value.trim();

  if (!input) {
    alert("من فضلك أدخل اسم العميل أو رقم الهاتف");
    return;
  }

  // بيانات تجريبية (مكان Google Sheet لاحقًا)
  const client = {
    name: "أحمد محمد",
    plan: "سنوي",
    end: "31 / 12 / 2025"
  };

  document.getElementById("clientName").textContent = client.name;
  document.getElementById("clientPlan").textContent = client.plan;
  document.getElementById("clientEnd").textContent = client.end;

  document.getElementById("clientData").classList.remove("hidden");
}
