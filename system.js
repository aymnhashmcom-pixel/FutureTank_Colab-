function loadDB(){
  return JSON.parse(localStorage.getItem("ft_db") || "{}");
}

function saveDB(db){
  localStorage.setItem("ft_db", JSON.stringify(db));
}

function daysBetween(d1, d2){
  const diff = new Date(d2) - new Date(d1);
  return Math.ceil(diff / (1000*60*60*24));
}

function getRenewAlerts(){
  const db = loadDB();
  const today = new Date().toISOString().split("T")[0];

  return (db.clients || []).filter(c=>{
    if(!c.end) return false;
    return daysBetween(today, c.end) <= 10;
  });
}
