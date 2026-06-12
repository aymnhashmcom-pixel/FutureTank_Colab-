async function searchClient() {
  const phone = document.getElementById("searchInput").value;
  const data = await getApiData("clientPortal", { phone: phone });
  
  if (data && data.success) {
      document.getElementById("name").textContent = data.name;
      document.getElementById("phone").textContent = data.phone;
      document.getElementById("address").textContent = data.address;
      document.getElementById("service").textContent = data.service;
      document.getElementById("cost").textContent = data.cost;
      document.getElementById("account_status").textContent = data.account_status;
      document.getElementById("contract_no").textContent = data.contract_no;
  } else {
      alert("❌ رقم غير مسجل!");
  }
}
