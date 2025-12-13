function ftReply(message) {
  const msg = message.toLowerCase();
  let replies = [];

  if (msg.includes("مرحبا") || msg.includes("السلام")) {
    replies.push(ftWelcome());
  }

  if (msg.includes("اسم") || msg.includes("شركة")) {
    replies.push(`${FT_COMPANY.name_ar} (${FT_COMPANY.name_en})  
${FT_COMPANY.slogan}`);
  }

  if (msg.includes("خزان") || msg.includes("فلتر") || msg.includes("منتج")) {
    replies.push(`🧰 المنتجات المتاحة:
${FT_COMPANY.products.map(p => `• ${p.name} — ${p.price}`).join("\n")}

🛡️ ضمان 10 سنوات`);
  }

  if (msg.includes("صيانة") || msg.includes("مشكلة") || msg.includes("تصليح")) {
    replies.push(`🔧 خدمات الصيانة:
• صيانة وإصلاح خزانات المياه
• تعقيم وتطهير خزانات الشرب

🛡️ ضمان 5 سنوات`);
  }

  if (msg.includes("سعر") || msg.includes("كام") || msg.includes("بكم")) {
    replies.push(`💰 الأسعار:
${FT_COMPANY.products.map(p => `• ${p.name}: ${p.price}`).join("\n")}`);
  }

  if (msg.includes("حجز")) {
    replies.push(`📅 لحجز خدمة:
📞 ${FT_COMPANY.phone}
💬 واتساب: https://wa.me/2${FT_COMPANY.whatsapp}`);
  }

  if (msg.includes("دفع") || msg.includes("فلوس")) {
    replies.push(`💳 طرق الدفع:
${FT_COMPANY.payments}`);
  }

  if (replies.length > 0) {
    return replies.join("\n\n——————————\n\n");
  }

  return `أنا مساعد ${FT_COMPANY.name_ar} 🤖  
ممكن تسألني عن:
- الخزانات
- الصيانة
- الأسعار
- الحجز
- طرق الدفع`;
      }
