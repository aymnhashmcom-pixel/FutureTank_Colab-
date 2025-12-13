function normalizeArabic(text) {
  const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];

  arabicNumbers.forEach((num, i) => {
    text = text.replace(new RegExp(num, 'g'), englishNumbers[i]);
  });

  return text;
}

function ftReply(message) {
  let msg = message.toLowerCase();
  msg = normalizeArabic(msg);

  let replies = [];

  // ترحيب
  if (msg.includes("السلام") || msg.includes("مرحبا")) {
    replies.push(ftWelcome());
  }

  // شراء / منتجات
  if (
    msg.includes("اشتري") ||
    msg.includes("شراء") ||
    msg.includes("خزان") ||
    msg.includes("فلتر") ||
    msg.includes("1000")
  ) {
    replies.push(`🛒 منتجات ${FT_COMPANY.name_ar}:
${FT_COMPANY.products.map(p => `• ${p.name} — ${p.price}`).join("\n")}

🛡️ ضمان 10 سنوات`);
  }

  // صيانة / كسر / مشكلة
  if (
    msg.includes("صيانة") ||
    msg.includes("كسر") ||
    msg.includes("مشكلة") ||
    msg.includes("تصليح")
  ) {
    replies.push(`🔧 خدمات الصيانة:
• صيانة وإصلاح خزانات المياه
• تطهير وتعقيم خزانات الشرب

🛡️ ضمان 5 سنوات`);
  }

  // حجز
  if (msg.includes("حجز") || msg.includes("عايز")) {
    replies.push(`📅 للحجز والاستفسار:
📞 ${FT_COMPANY.phone}
💬 واتساب: https://wa.me/2${FT_COMPANY.whatsapp}`);
  }

  if (replies.length > 0) {
    return replies.join("\n\n——————————\n\n");
  }

  return `أنا مساعد ${FT_COMPANY.name_ar} 🤖  
ممكن تسألني عن:
- شراء خزان
- صيانة خزان
- الأسعار
- الحجز`;
                                                                }
