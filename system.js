// تحميل قاعدة البيانات مرة واحدة
async function initDB(){
  if(!localStorage.getItem("ft_db")){
    const res = await fetch("database.json");
    const data = await res.json();
    localStorage.setItem("ft_db", JSON.stringify(data));
  }
}
initDB();

// جلب البيانات
function getDB(){
  return JSON.parse(localStorage.getItem("ft_db"));
}

// حفظ البيانات
function saveDB(data){
  localStorage.setItem("ft_db", JSON.stringify(data));
}
