// تعتمد على GLOBAL_API الموجود في main.js
async function searchClient() {
  const phone = document.getElementById("searchInput").value;
  const data = await getApiData("clientPortal", { phone: phone });
  
  if (data.success) {
      document.getElementById("name").textContent = data.name;
      document.getElementById("phone").textContent = data.phone;
      document.getElementById("address").textContent = data.address;
      document.getElementById("service").textContent = data.service;
      document.getElementById("cost").textContent = data.cost;
      document.getElementById("contract_no").textContent = data.contract_no;
      document.getElementById("account_status").textContent = data.account_status;
  } else {
      alert("رقم غير مسجل!");
  }
}
