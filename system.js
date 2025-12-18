let DB = null;

async function loadDB(){
  if(DB) return DB;
  const res = await fetch("database.json");
  DB = await res.json();
  return DB;
}

function getDB(){
  return DB;
}

function getClientByCode(code){
  return DB.clients.find(c => c.code === code);
}

function getContractsByClient(code){
  return DB.contracts.filter(c => c.clientCode === code);
}

function isRenewDue(contract){
  const today = new Date();
  const renew = new Date(contract.renewDate);
  return renew <= today;
}
