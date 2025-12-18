const DB_KEY = "futuretank_db";

function loadDB(){
  return JSON.parse(localStorage.getItem(DB_KEY)) || {
    services: [],
    products: [],
    clients: [],
    contracts: []
  };
}

function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
