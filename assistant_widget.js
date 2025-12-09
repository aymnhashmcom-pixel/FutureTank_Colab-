let currentLang = "ar";

const responses = {
    ar: {
        greeting: "مرحبًا بك في Future Tank! كيف أقدر أساعدك؟",
        fallback: "لم أفهم رسالتك جيدًا، ممكن توضح أكثر؟ 😊",
        keywords: {
            "خدمات": "نقدّم أفضل خدمات الخزانات والعدادات… كيف نقدر نخدمك؟",
            "فيوتشر تانك": "Future Tank هي شركة متخصصة في الخزانات والعدادات.",
            "خزانات": "نوفر جميع أنواع الخزانات والتوريدات.",
            "tank": "Future Tank توفر خدمات متكاملة.",
            "الاسعار": "يرجى تحديد الخدمة المطلوبة للحصول على السعر المناسب."
        }
    },

    en: {
        greeting: "Welcome to Future Tank! How can I assist you?",
        fallback: "I didn't fully understand, could you clarify? 😊",
        keywords: {
            "service": "We provide high-quality tank and meter solutions.",
            "future tank": "Future Tank is specialized in tanks and meters.",
            "tank": "We offer all tank-related services.",
            "price": "Please specify the service you want the price for."
        }
    }
};

function addMessage(text, sender) {
    const box = document.getElementById("assistant-messages");
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.textContent = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function getReply(msg) {
    msg = msg.toLowerCase();

    const set = responses[currentLang].keywords;

    for (let key in set) {
        if (msg.includes(key)) {
            return set[key];
        }
    }

    return responses[currentLang].fallback;
}

document.getElementById("assistant-send").addEventListener("click", () => {
    const input = document.getElementById("assistant-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");

    setTimeout(() => {
        addMessage(getReply(text), "bot");
    }, 400);

    input.value = "";
});

document.getElementById("lang-ar").onclick = () => {
    currentLang = "ar";
    document.getElementById("assistant-title").textContent = "مساعد Future Tank";
    document.getElementById("assistant-input").placeholder = "اكتب رسالتك...";
    document.getElementById("lang-ar").classList.add("active");
    document.getElementById("lang-en").classList.remove("active");
};

document.getElementById("lang-en").onclick = () => {
    currentLang = "en";
    document.getElementById("assistant-title").textContent = "Future Tank Assistant";
    document.getElementById("assistant-input").placeholder = "Type your message...";
    document.getElementById("lang-en").classList.add("active");
    document.getElementById("lang-ar").classList.remove("active");
};

// 🚀 فتح تلقائي عند الدخول
window.onload = () => {
    setTimeout(() => {
        addMessage(responses[currentLang].greeting, "bot");
    }, 500);
};
