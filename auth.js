<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>🤖 المساعد الذكي — FutureTank</title>

<style>
body{
  font-family: Tahoma;
  background:#f4f9ff;
  padding:20px;
}
#chat{
  background:#fff;
  border-radius:10px;
  padding:15px;
  max-width:700px;
  margin:auto;
}
.msg{
  margin:10px 0;
}
.user{
  text-align:left;
  color:#0a58ca;
}
.bot{
  text-align:right;
  color:#198754;
}
input,button{
  padding:10px;
  font-size:16px;
}
img{
  max-width:200px;
  border-radius:10px;
  margin-top:8px;
}
</style>
</head>

<body>

<h2>🤖 المساعد الذكي — فيوتشر تانك</h2>

<div id="chat">
  <div class="msg bot">أنا هنا للمساعدة — اسألني عن الخزانات أو الصيانة.</div>
</div>

<br>

<input id="input" placeholder="اكتب سؤالك هنا..." style="width:70%">
<button onclick="send()">إرسال</button>

<script>
function send(){
  const input = document.getElementById("input");
  const text = input.value.trim();
  if(!text) return;

  addMsg(text,"user");
  input.value = "";

  const reply = getResponse(text);
  setTimeout(()=>addMsg(reply,"bot"),400);
}

function addMsg(text,type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerHTML = text;
  document.getElementById("chat").appendChild(div);
}

function getResponse(message){
  const db = JSON.parse(localStorage.getItem("ft_db") || "{}");
  const products = db.products || [];
  const services = db.services || [];

  message = message.toLowerCase();

  // البحث في المنتجات
  for(const p of products){
    if(message.includes(p.name.toLowerCase())){
      return `
<b>${p.name}</b><br>
💰 السعر: ${p.price} جنيه<br>
${p.desc || ""}<br>
${p.image ? `<img src="${p.image}">` : ""}
<br>
<a href="booking.html?type=product&name=${encodeURIComponent(p.name)}">📦 احجز الآن</a>
`;
    }
  }

  // البحث في الخدمات
  for(const s of services){
    if(message.includes(s.name.toLowerCase())){
      return `
<b>${s.name}</b><br>
🧰 خدمة متاحة<br>
${s.desc || ""}<br>
${s.image ? `<img src="${s.image}">` : ""}
<br>
<a href="booking.html?type=service&name=${encodeURIComponent(s.name)}">📅 احجز الخدمة</a>
`;
    }
  }

  return `
❓ لم أفهم سؤالك<br>
جرب تسأل عن:
<ul>
<li>🛒 المنتجات</li>
<li>🧰 الخدمات</li>
<li>📦 حجز</li>
<li>📞 خدمة العملاء</li>
</ul>
`;
}
</script>

</body>
</html>
