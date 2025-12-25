import {
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "./firebase.js";

portalForm.addEventListener("submit", async e => {
  e.preventDefault();
  const phone = portalForm.phone.value;

  const q = query(
    collection(db, "contracts"),
    where("phone", "==", phone)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    alert("❌ لا يوجد تعاقد");
    return;
  }

  snap.forEach(async d => {
    await updateDoc(doc(db, "contracts", d.id), {
      status: "renewed"
    });
  });

  alert("🔁 تم تجديد التعاقد");
});
