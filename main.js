const GLOBAL_API = "https://script.google.com/macros/s/AKfycbyt89cTue2f-c1Fk1VM_2KEgBW0fhFXFyq6mckjRx3mCjWZ45TdNk1vZQIEVLuFDAA/exec"; 

// دالة جلب البيانات الموحدة
async function getApiData(action, params = {}) {
    let url = new URL(GLOBAL_API);
    url.searchParams.append("action", action);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error("خطأ في الاتصال:", e);
        return { success: false, error: e.message };
    }
}

// دالة تنسيق التاريخ
function formatDate(d) {
    if (!d || d === "—") return "—";
    return new Date(d).toLocaleDateString("ar-EG");
}
