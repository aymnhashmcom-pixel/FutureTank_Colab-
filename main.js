const GLOBAL_API = "ضع_رابط_الـ_Web_App_الجديد_هنا"; 

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
