import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase.js";

document.getElementById("contractForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const serviceId = document.getElementById("service").value;
  const serviceName = document.querySelector("#service option:checked").text;
  const price = document.getElementById("price").value;

  await addDoc(collection(db, "contracts"), {
    clientName: name,
    phone,
    services: [
      {
        serviceId,
        serviceName,
        price: Number(price)
      }
    ],
    startDate: new Date().toISOString().slice(0,10),
    endDate: "",
    nextVisit: "",
    status: "active",
    createdAt: serverTimestamp()
  });

  alert("✅ تم تسجيل التعاقد بنجاح");
  e.target.reset();
});
