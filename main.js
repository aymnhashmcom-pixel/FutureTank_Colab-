const GLOBAL_API = "ضع_هنا_رابط_الـ_Web_App_الجديد";

async function getApiData(action, params = {}) {
    let url = new URL(GLOBAL_API);
    url.searchParams.append("action", action);
    for (let key in params) url.searchParams.append(key, params[key]);
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) { return { success: false, error: e.message }; }
}

// دالة مريحة لعرض التواريخ
function formatDate(d) {
    return (!d || d === "—") ? "—" : d; 
}
