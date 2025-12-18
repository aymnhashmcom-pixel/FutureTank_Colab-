const DB_KEY = "ft_db";

function getDB(){
  let db = localStorage.getItem(DB_KEY);
  if(!db){
    db = {
      products: [],
      services: [],
      clients: [],
      contracts: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
  return JSON.parse(db);
}

function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
