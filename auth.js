// ===== FutureTank Auth =====
const USER_KEY = "ft_user";

function login(role){
  localStorage.setItem(USER_KEY, role);
  location.href = "dashboard.html";
}

function logout(){
  localStorage.removeItem(USER_KEY);
  location.href = "index.html";
}

function currentUser(){
  return localStorage.getItem(USER_KEY);
}

function requireRole(role){
  const u = currentUser();
  if(u !== role){
    alert("غير مصرح بالدخول");
    history.back();
  }
}
