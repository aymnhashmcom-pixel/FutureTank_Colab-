let DB = null;

async function loadDB(){
  if(DB) return DB;
  const res = await fetch("database.json");
  DB = await res.json();
  return DB;
}

function saveDB(){
  localStorage.setItem("ft_db", JSON.stringify(DB));
}

/* ===== Clients ===== */
function getClient(code){
  return DB.clients.find(c=>c.code===code);
}

/* ===== Contracts ===== */
function getContractsByClient(code){
  return DB.contracts.filter(c=>c.clientCode===code);
}

function isRenewDue(contract){
  const now = new Date();
  const renew = new Date(contract.renewDate);
  return renew <= now;
}

/* ===== Renew Contract ===== */
function renewContract(contractId){
  const contract = DB.contracts.find(c=>c.contractId===contractId);
  if(!contract) return null;

  const newRenew = new Date(contract.renewDate);
  newRenew.setFullYear(newRenew.getFullYear()+1);

  contract.renewDate = newRenew.toISOString().split("T")[0];

  DB.renewRequests = DB.renewRequests || [];
  DB.renewRequests.push({
    contractId,
    date:new Date().toISOString()
  });

  saveDB();
  return contract;
                       }
