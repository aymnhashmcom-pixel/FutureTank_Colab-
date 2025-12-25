import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase.js";

document.getElementById("contractForm").addEventListener("submit", async e => {
  e.preventDefault();

  await addDoc(collection(db, "contracts"), {
    name: contractForm.name.value,
    phone: contractForm.phone.value,
    service: contractForm.service.value,
    createdAt: serverTimestamp(),
    status: "active"
  });

  alert("✅ تم التعاقد بنجاح");
  contractForm.reset();
});
