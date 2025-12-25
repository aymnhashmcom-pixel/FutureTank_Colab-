import {
  db,
  collection,
  getDocs
} from "./firebase.js";

const box = document.getElementById("servicesBox");

const snap = await getDocs(collection(db, "services"));

snap.forEach(docu => {
  const s = docu.data();
  box.innerHTML += `
    <div>
      <img src="${s.image}" width="100%">
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <b>💰 ${s.price} جنيه</b><br>
      <a href="contract.html">احجز خدمة الآن</a>
    </div>
  `;
});
