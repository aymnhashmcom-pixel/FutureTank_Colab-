// ===============================
// system.js — FutureTank System
// نسخة خفيفة تعمل فوراً بدون أي إضافات
// ===============================

// تحميل بيانات النظام
export function loadSystem() {
    const data = localStorage.getItem('futuretank_system');
    if (!data) {
        const defaultData = {
            welcomeAudio: "",
            products: [],
            services: [],
            invoices: [],
            settings: {
                siteTitle: "فيوتشرتانك",
                slogan: "نقاء الماء هو هدفنا"
            }
        };
        localStorage.setItem('futuretank_system', JSON.stringify(defaultData));
        return defaultData;
    }
    return JSON.parse(data);
}

// حفظ البيانات
export function saveSystem(newData) {
    localStorage.setItem('futuretank_system', JSON.stringify(newData));
}

// تحديث إعداد
export function updateSetting(key, value) {
    const data = loadSystem();
    data.settings[key] = value;
    saveSystem(data);
}

// إضافة منتج
export function addProduct(product) {
    const data = loadSystem();
    data.products.push(product);
    saveSystem(data);
}

// حذف منتج
export function deleteProduct(index) {
    const data = loadSystem();
    data.products.splice(index, 1);
    saveSystem(data);
}

// إضافة خدمة
export function addService(service) {
    const data = loadSystem();
    data.services.push(service);
    saveSystem(data);
}

// حذف خدمة
export function deleteService(index) {
    const data = loadSystem();
    data.services.splice(index, 1);
    saveSystem(data);
}

// حفظ رسالة ترحيب صوتية
export function saveWelcomeAudio(base64audio) {
    const data = loadSystem();
    data.welcomeAudio = base64audio;
    saveSystem(data);
}

// تشغيل رسالة الترحيب
export function playWelcomeAudio() {
    const data = loadSystem();
    if (!data.welcomeAudio) {
        alert("❗ لا يوجد تسجيل ترحيب حتى الآن");
        return;
    }
    const audio = new Audio(data.welcomeAudio);
    audio.play();
}
