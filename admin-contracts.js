import {
  db,
  collection,
  getDocs
} from "./firebase.js";

const table = document.getElementById("contractsTable");

const snap = await getDocs(collection(db, "contracts"));

snap.forEach(docu => {
  const d = docu.data();
  table.innerHTML += `
    <tr>
      <td>${d.clientName}</td>
      <td>${d.services.map(s => s.serviceName).join(", ")}</td>
      <td>${d.nextVisit || "-"}</td>
      <td>${d.services.reduce((t,s)=>t+s.price,0)} جنيه</td>
    </tr>
  `;
});
