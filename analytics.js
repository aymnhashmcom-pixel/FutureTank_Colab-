const db = JSON.parse(localStorage.getItem("ft_db")) || {
  customers: [],
  services: [],
  products: [],
  contracts: [],
  orders: []
};

const now = new Date();

customersCount.innerText = db.customers?.length || 0;
servicesCount.innerText  = db.services?.length || 0;
productsCount.innerText  = db.products?.length || 0;
ordersCount.innerText    = db.orders?.length || 0;

let active = 0;
let expired = 0;

(db.contracts || []).forEach(c => {
  const end = new Date(c.end);
  end > now ? active++ : expired++;
});

contractsActive.innerText  = active;
contractsExpired.innerText = expired;
