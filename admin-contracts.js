import {
  db,
  collection,
  getDocs
} from "./firebase.js";

const table = document.getElementById("contractsTable");

const snap = await getDocs(collection(db, "contracts"));

snap.forEach(d => {
  const c = d.data();
  table.innerHTML += `
    <tr>
      <td>${c.name}</td>
      <td>${c.service}</td>
      <td>${c.status}</td>
    </tr>
  `;
});
