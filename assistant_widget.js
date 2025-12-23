/* ===============================
   FutureTank Smart Assistant
   Version: Final Stable
   =============================== */

(function () {

  /* ====== الإعدادات العامة ====== */
  const COMPANY_NAME = "FutureTank";
  const WHATSAPP_NUMBER = "201150402031"; // 01150402031
  const WELCOME_TEXT = `
👋 أهلاً بحضرتك في *FutureTank*
متخصصون في خزانات المياه وخدمات التعقيم 🌊
يسعدنا خدمتك
كيف نقدر نساعدك اليوم؟
`;

  const VOICE_TEXT = "أهلاً بحضرتك في فيوتشر تانك، يسعدنا خدمتك";

  /* ====== عناصر الصفحة ====== */
  const chatBox = document.getElementById("assistantMessages");
  const input = document.getElementById("assistantInput");
  const sendBtn = document.getElementById("assistantSend");

  if (!chatBox || !input || !sendBtn) return;

  /* ====== أدوات ====== */
  function addMessage(text, from = "bot") {
    const msg = document.createElement("div");
    msg.className = from === "bot" ? "bot-msg" : "user-msg";
    msg.innerHTML = text.replace(/\n/g, "<br>");
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function speakOnce() {
    if (localStorage.getItem("ft_voice_played")) return;
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(VOICE_TEXT);
    utterance.lang = "ar-EG";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
    localStorage.setItem("ft_voice_played", "yes");
  }

  function openWhatsApp(msg = "") {
    const text = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  /* ====== تحميل البيانات من الموقع ====== */
  function getProductsText() {
    if (!window.ft_products || window.ft_products.length === 0)
      return "حالياً لا توجد منتجات متاحة.";

    return window.ft_products.map(p =>
      `• ${p.name} – ${p.price} جنيه`
    ).join("<br>");
  }

  function getServicesText() {
    if (!window.ft_services || window.ft_services.length === 0)
      return "حالياً لا توجد خدمات متاحة.";

    return window.ft_services.map(s =>
      `• ${s.name} – ${s.price} جنيه`
    ).join("<br>");
  }

  /* ====== الذكاء البسيط ====== */
  function handleMessage(text) {
    const msg = text.toLowerCase();

    // تحيات
    if (msg.includes("السلام") || msg.includes("اهلا") || msg.includes("مرحبا")) {
      addMessage("🌸 أهلاً وسهلاً بحضرتك، نورتنا");
      return;
    }

    // شكر
    if (msg.includes("شكرا") || msg.includes("تسلم")) {
      addMessage("🤍 العفو يا فندم، تحت أمرك في أي وقت");
      return;
    }

    // منتجات
    if (msg.includes("منتج") || msg.includes("خزان")) {
      addMessage("🛒 المنتجات المتاحة:<br>" + getProductsText());
      addMessage("تحب أساعدك تختار أو نكمّل على واتساب؟ 💬");
      return;
    }

    // خدمات
    if (msg.includes("خدمة") || msg.includes("تعقيم") || msg.includes("صيانة")) {
      addMessage("🧰 خدماتنا:<br>" + getServicesText());
      addMessage("تحب تحجز خدمة دلوقتي؟ 💬");
      return;
    }

    // واتساب
    if (msg.includes("واتس") || msg.includes("تواصل") || msg.includes("موبايل")) {
      openWhatsApp("السلام عليكم، محتاج استفسار");
      return;
    }

    // حجز
    if (msg.includes("احجز") || msg.includes("حجز")) {
      addMessage("تمام 👍 هنتواصل مع حضرتك فوراً على واتساب");
      openWhatsApp("طلب حجز خدمة");
      return;
    }

    // افتراضي
    addMessage("😊 ممكن توضّح أكتر؟ أو تحب نكمّل مباشرة على واتساب");
  }

  /* ====== الأحداث ====== */
  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => handleMessage(text), 400);
  });

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
  });

  /* ====== بدء التشغيل ====== */
  setTimeout(() => {
    addMessage(WELCOME_TEXT);
    speakOnce();
  }, 600);

})();
