const ADMIN_PASSWORD = "Future2025";
const SESSION_KEY = "ft_admin_logged";

// لو الصفحة Admin
if (document.body.dataset.admin === "true") {
  if (localStorage.getItem(SESSION_KEY) !== "true") {
    window.location.href = "admin-login.html";
  }
}

function adminLogin() {
  const input = document.getElementById("adminPassword").value;
  if (input === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, "true");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ كلمة المرور غير صحيحة");
  }
}

function adminLogout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}
