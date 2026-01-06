// قراءة قاعدة البيانات
function getDB() {
  return JSON.parse(localStorage.getItem("ft_db")) || { services: [] };
}

// حفظ قاعدة البيانات
function saveDB(db) {
  localStorage.setItem("ft_db", JSON.stringify(db));
}

// قراءة الصورة
function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// إضافة خدمة
function addService() {
  const name = serviceName.value.trim();
  const desc = serviceDesc.value.trim();
  const file = serviceImage.files[0];

  if (!name) return alert("اسم الخدمة مطلوب");

  const db = getDB();

  const saveService = (img = "") => {
    db.services.push({
      id: Date.now(),
      name,
      desc,
      image: img
    });
    saveDB(db);
    location.reload();
  };

  if (file) {
    readImage(file, saveService);
  } else {
    saveService();
  }
}

// حذف خدمة
function deleteService(id) {
  if (!confirm("هل تريد حذف الخدمة؟")) return;

  const db = getDB();
  db.services = db.services.filter(s => s.id !== id);
  saveDB(db);
  location.reload();
}

// عرض الخدمات
function renderServices() {
  const db = getDB();
  const box = document.getElementById("servicesList");

  if (!db.services.length) {
    box.innerHTML = "لا توجد خدمات بعد";
    return;
  }

  box.innerHTML = "";
  db.services.forEach(s => {
    box.innerHTML += `
      <div class="item">
        <strong>${s.name}</strong>
        <p>${s.desc || ""}</p>
        ${s.image ? `<img src="${s.image}">` : ""}
        <button onclick="deleteService(${s.id})">🗑️ حذف</button>
      </div>
    `;
  });
}

renderServices();
