/* ===============================
   FutureTank Smart Assistant
   Company-aware / Data-aware
================================ */

const FT_COMPANY = {
  name_ar: "فيوتشر تانك",
  name_en: "FutureTank",
  slogan: "نقاء الماء هو هدفنا",
  phone: "01150402031",
  whatsapp: "01150402031",
  services: [
    "توريد وتركيب خزانات المياه",
    "صيانة وإصلاح خزانات المياه",
    "تطهير وتعقيم خزانات مياه الشرب",
    "توريد وتركيب فلاتر المياه",
    "صيانة وإصلاح فلاتر المياه"
  ],
  products: [
    { name: "خزان مياه بلاستيك 1000 لتر", price: "2500 ج.م" },
    { name: "فلتر مياه منزلي 5 مراحل", price: "3200 ج.م" }
  ],
  payments: "الدفع متاح عبر اتصالات كاش أو عند الاستلام"
};

function ftWelcome() {
  return `مرحبًا بك في ${FT_COMPANY.name_ar} 👋  
${FT_COMPANY.slogan}

شركة متخصصة في:
- خزانات المياه
- فلاتر المياه
- التركيب والصيانة والتعقيم

اسألني عن:
🔹 المنتجات  
🔹 الخدمات  
🔹 الأسعار  
🔹 الحجز  
🔹 طرق الدفع  
🔹 خدمة العملاء`;
}

function ftReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("مرحبا") || msg.includes("السلام")) {
    return ftWelcome();
  }

  if (msg.includes("اسم") || msg.includes("شركة")) {
    return `${FT_COMPANY.name_ar} (${FT_COMPANY.name_en})  
${FT_COMPANY.slogan}`;
  }

  if (msg.includes("خدمة")) {
    return `خدمات ${FT_COMPANY.name_ar}:
${FT_COMPANY.services.map(s => "• " + s).join("\n")}

🛡️ ضمان 5 سنوات على أعمال الصيانة`;
  }

  if (msg.includes("منتج") || msg.includes("خزان") || msg.includes("فلتر")) {
    return `منتجاتنا المتاحة:
${FT_COMPANY.products.map(p => `• ${p.name} — ${p.price}`).join("\n")}

🛡️ ضمان 10 سنوات على المنتجات`;
  }

  if (msg.includes("سعر") || msg.includes("كام") || msg.includes("بكم")) {
    return `الأسعار الحالية:
${FT_COMPANY.products.map(p => `• ${p.name}: ${p.price}`).join("\n")}`;
  }

  if (msg.includes("حجز")) {
    return `لحجز خدمة من ${FT_COMPANY.name_ar}:
👉 استخدم زر "احجز خدمة الآن" في الصفحة
📞 أو تواصل مباشرة: ${FT_COMPANY.phone}`;
  }

  if (msg.includes("دفع") || msg.includes("فلوس")) {
    return `طرق الدفع:
${FT_COMPANY.payments}
📞 للاستفسار: ${FT_COMPANY.phone}`;
  }

  if (msg.includes("واتساب") || msg.includes("تواصل")) {
    return `خدمة العملاء:
📞 ${FT_COMPANY.phone}
💬 واتساب: https://wa.me/2${FT_COMPANY.whatsapp}`;
  }

  return `أنا مساعد ${FT_COMPANY.name_ar} 🤖  
اكتب مثلًا:
- ما هي خدماتكم؟
- أسعار الخزانات
- حجز خدمة
- طريقة الدفع`;
}

/* ربط المساعد بالواجهة */
window.FutureTankAssistant = {
  welcome: ftWelcome,
  reply: ftReply
};
