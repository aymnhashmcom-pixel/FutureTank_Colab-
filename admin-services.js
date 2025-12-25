import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "./firebase.js";

const form = document.getElementById("serviceForm");
const list = document.getElementById("servicesList");

async function loadServices() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "services"));
  snap.forEach(d => {
    const s = d.data();
    list.innerHTML += `
      <div>
        <b>${s.name}</b><br>
        💰 ${s.price} جنيه
        <button onclick="deleteService('${d.id}')">🗑 حذف</button>
      </div>
      <hr>
    `;
  });
}

window.deleteService = async (id) => {
  await deleteDoc(doc(db, "services", id));
  loadServices();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const name = form.name.value;
    const desc = form.description.value;
    const price = Number(form.price.value);
    const image = form.image.value;
    const video = form.video.value;

    await addDoc(collection(db, "services"), {
      name,
      description: desc,
      price,
      image,
      video
    });

    alert("✅ تم حفظ الخدمة");
    form.reset();
    loadServices();

  } catch (err) {
    alert("❌ فشل الحفظ");
  }
});

loadServices();
