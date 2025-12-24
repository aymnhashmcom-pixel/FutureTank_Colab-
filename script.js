/* ===============================
   FutureTank Unified System
   Clean Mode - LocalStorage Only
================================ */

const FT_DB_KEY = "ft_db";

function getDB() {
  return JSON.parse(localStorage.getItem(FT_DB_KEY)) || {
    services: [],
    products: [],
    clients: [],
    contracts: []
  };
}

function saveDB(db) {
  localStorage.setItem(FT_DB_KEY, JSON.stringify(db));
}

console.log("✅ FutureTank running in CLEAN MODE");
