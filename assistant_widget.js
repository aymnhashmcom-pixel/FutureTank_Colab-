(function(){

function getDB(){
  return JSON.parse(localStorage.getItem("ft_db") || "{}");
}

function getProducts(){
  return JSON.parse(localStorage.getItem("ft_products") || "[]");
}

function reply(q){
  q = q.toLowerCase();

  // ترحيب
  if(q.includes("السلام") || q.includes("مرحبا") || q.includes("صباح") || q.includes("مساء")){
    return "أهلاً بيك 👋 نورت فيوتشر تانك، تحب أساعدك في إيه؟";
  }

  // تعريف
  if(q.includes("انت مين") || q.includes("من انت")){
    return "أنا المساعد الذكي لفيوتشر تانك، متخصص في الخزانات والصيانة.";
  }

  // عرض منتجات
  if(q.includes("خزان") || q.includes("منتج")){
    const p = getProducts();
    if(!p.length) return "حالياً لا توجد منتجات مضافة.";
    return p.map(x=>`${x.name} — ${x.price} جنيه`).join(" | ");
  }

  // سعر 1000 لتر
  if(q.includes("1000")){
    const p = getProducts().find(x=>x.name.includes("1000"));
    return p ? `سعر ${p.name} هو ${p.price} جنيه` : "خزان 1000 لتر غير مسجل حالياً";
  }

  // تركيب
  if(q.includes("تركيب")){
    return "نوفر توريد وتركيب داخل القاهرة والمحافظات 👍";
  }

  // حجز
  if(q.includes("حجز")){
    return "للحجز اضغط زر واتساب أو اكتب (احجز الآن)";
  }

  // واتساب
  if(q.includes("واتس") || q.includes("واتساب")){
    return "تواصل معنا على واتساب: 01150402031";
  }

  return "ممكن توضّح سؤالك أكتر؟ 😊";
}

// ربط بالواجهة
window.FutureTankAssistant = {
  reply,
  welcome(){
    return "أنا هنا للمساعدة — اسألني عن الخزانات أو الصيانة.";
  }
};

})();
