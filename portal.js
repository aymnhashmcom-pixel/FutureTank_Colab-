import {
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "./firebase.js";

const form = document.getElementById("portalForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const phone = document.getElementById("phone").value;

  const q = query(
    collection(db, "contracts"),
    where("phone", "==", phone)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    alert("❌ لا يوجد تعاقد بهذا الرقم");
    return;
  }

  snap.forEach(async (c) => {
    await updateDoc(doc(db, "contracts", c.id), {
      status: "renewed",
      endDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().slice(0,10)
    });
  });

  alert("🔁 تم تجديد التعاقد بنجاح");
});
