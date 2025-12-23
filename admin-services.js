import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

const servicesRef = collection(db, "services");

async function loadServices() {
  const snapshot = await getDocs(servicesRef);
  const list = document.getElementById("servicesList");
  list.innerHTML = "";

  snapshot.forEach(docSnap => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${docSnap.data().name}
      <button onclick="deleteService('${docSnap.id}')">❌</button>
    `;
    list.appendChild(li);
  });
}

window.addService = async function () {
  const name = document.getElementById("serviceSelect").value;
  if (!name) return alert("اختر خدمة");

  const q = query(servicesRef, where("name", "==", name));
  const exist = await getDocs(q);
  if (!exist.empty) return alert("الخدمة موجودة بالفعل");

  await addDoc(servicesRef, {
    name,
    active: true,
    createdAt: new Date()
  });

  loadServices();
};

window.deleteService = async function (id) {
  await deleteDoc(doc(db, "services", id));
  loadServices();
};

loadServices();
