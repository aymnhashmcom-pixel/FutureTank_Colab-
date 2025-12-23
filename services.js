import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

const serviceSelect = document.getElementById("service");

async function loadServices() {
  const q = query(collection(db, "services"), where("active", "==", true));
  const snapshot = await getDocs(q);

  serviceSelect.innerHTML = "<option>اختر الخدمة</option>";
  snapshot.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc.data().name;
    opt.textContent = doc.data().name;
    serviceSelect.appendChild(opt);
  });
}

window.sendRequest = async function () {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = serviceSelect.value;

  if (!name || !phone || !service) {
    return alert("أكمل البيانات");
  }

  await addDoc(collection(db, "service_requests"), {
    name,
    phone,
    service,
    createdAt: new Date()
  });

  window.open(
    `https://wa.me/2${phone}?text=طلب خدمة:%0A${service}`,
    "_blank"
  );
};

loadServices();
