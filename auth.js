// auth.js — نظام صلاحيات FutureTank (نسخة مستقرة)

function loginAdmin(password) {
  if (password === "Future2025") {
    localStorage.setItem("ft_role", "admin");
    alert("✅ تم تسجيل الدخول كمسؤول");
    return true;
  } else {
    alert("❌ كلمة السر غير صحيحة");
    return false;
  }
}

function requireRole(role) {
  const currentRole = localStorage.getItem("ft_role");
  if (currentRole !== role) {
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:80px;font-family:Tahoma">
        <h2>⛔ غير مصرح بالدخول</h2>
        <p>هذه الصفحة مخصصة للإدارة فقط</p>
      </div>
    `;
    throw new Error("Access denied");
  }
}

function logoutAdmin() {
  localStorage.removeItem("ft_role");
  location.href = "index.html";
}
