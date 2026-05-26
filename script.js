/* ===============================
API
================================ */

const API =
"https://script.google.com/macros/s/AKfycbzfVDO9Fmy5sqvIkIjHRBTyZuIFzuo_cr0nUZ2u0QD0RSQMPmSd35KVIiq94UAARbC2/exec";

/* ===============================
بوابة العملاء
================================ */

function searchClient(){

const phone =
document.getElementById(
"searchInput"
).value.trim();

if(!phone){

alert("من فضلك أدخل رقم الهاتف");

return;

}

fetch(
API +
"?phone=" +
encodeURIComponent(phone)
)

.then(res=>res.json())

.then(data=>{

if(!data || data.error){

alert("العميل غير موجود");

return;

}

document.getElementById(
"clientData"
).style.display="block";

setText("name",data.name);
setText("phone",data.phone);
setText("address",data.address);
setText("service",data.service);
setText("months",data.contract_months);
setText("visits",data.visits);
setText("cost",
data.cost
?
data.cost+" جنيه"
:
"—"
);

setText("start",
formatDate(data.contract_date)
);

setText("end",
formatDate(data.end_date)
);

setText("last",
formatDate(data.last_visit)
);

setText("next",
formatDate(data.next_visit)
);

setText("remaining",
data.remaining_days
);

const msg = `🛠️ طلب تجديد تعاقد

👤 الاسم:
${data.name}

📞 الهاتف:
${data.phone}

💧 الخدمة:
${data.service}
`;

const renewBtn =
document.querySelector(
".renew-btn"
);

if(renewBtn){

renewBtn.href =
"https://wa.me/201150402031?text="
+
encodeURIComponent(msg);

}

})

.catch(()=>{

alert("حدث خطأ في الاتصال");

});

}

function setText(id,value){

const el =
document.getElementById(id);

if(el){

el.textContent =
value || "—";

}

}

function formatDate(d){

if(!d){

return "—";

}

return new Date(d)
.toLocaleDateString("ar-EG");

}

/* ===============================
تحميل الخدمات
================================ */

function loadServices(){

fetch(
API +
"?type=services"
)

.then(res=>res.json())

.then(data=>{

const list =
document.getElementById(
"servicesList"
);

if(!list){

return;

}

list.innerHTML="";

if(data.length===0){

list.innerHTML =
"<p style='text-align:center'>لا توجد خدمات حالياً</p>";

return;

}

data.forEach(item=>{

list.innerHTML += `

<div class="card">

<img
src="${item.image}"
alt="${item.name}">

<h3>
${item.name}
</h3>

<p>
${item.desc}
</p>

<strong>
${item.price} جنيه
</strong>

<br><br>

<button
class="action-btn"
onclick="orderService(
'${item.name}',
'${item.price}'
)">

🛠️ اطلب الخدمة الآن

</button>

</div>

`;

});

});

}

/* ===============================
طلب خدمة
================================ */

function orderService(name,price){

const customerName =
prompt("اكتب الاسم");

if(!customerName){

return;

}

const customerPhone =
prompt("اكتب رقم الهاتف");

if(!customerPhone){

return;

}

const customerAddress =
prompt("اكتب العنوان");

if(!customerAddress){

return;

}

const payment =
"الدفع عند الاستلام";

const message = `🛠️ طلب خدمة جديد

👤 الاسم:
${customerName}

📞 الهاتف:
${customerPhone}

📍 العنوان:
${customerAddress}

💧 الخدمة:
${name}

💰 السعر:
${price} جنيه

💳 طريقة الدفع:
${payment}
`;

fetch(API,{

method:"POST",

body:JSON.stringify({

action:"saveOrder",

name:customerName,

phone:customerPhone,

address:customerAddress,

payment:payment,

items:name,

total:price

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

window.open(

"https://wa.me/201150402031?text="
+
encodeURIComponent(message),

"_blank"

);

alert("✅ تم إرسال الطلب");

}

});

}

/* ===============================
تحميل المنتجات
================================ */

function loadProducts(){

fetch(
API +
"?type=products"
)

.then(res=>res.json())

.then(data=>{

const list =
document.getElementById(
"productsList"
);

if(!list){

return;

}

list.innerHTML="";

if(data.length===0){

list.innerHTML =
"<p style='text-align:center'>لا توجد منتجات حالياً</p>";

return;

}

data.forEach(item=>{

list.innerHTML += `

<div class="card">

<img
src="${item.image}"
alt="${item.name}">

<h3>
${item.name}
</h3>

<p>
${item.desc}
</p>

<strong>
${item.price} جنيه
</strong>

<br><br>

<button
class="action-btn"
onclick="orderProduct(
'${item.name}',
'${item.price}'
)">

🛒 اطلب المنتج الآن

</button>

</div>

`;

});

});

}

/* ===============================
طلب منتج
================================ */

function orderProduct(name,price){

const customerName =
prompt("اكتب الاسم");

if(!customerName){

return;

}

const customerPhone =
prompt("اكتب رقم الهاتف");

if(!customerPhone){

return;

}

const customerAddress =
prompt("اكتب العنوان");

if(!customerAddress){

return;

}

const payment =
"الدفع عند الاستلام";

const message = `🛒 طلب منتج جديد

👤 الاسم:
${customerName}

📞 الهاتف:
${customerPhone}

📍 العنوان:
${customerAddress}

📦 المنتج:
${name}

💰 السعر:
${price} جنيه

💳 طريقة الدفع:
${payment}
`;

fetch(API,{

method:"POST",

body:JSON.stringify({

action:"saveOrder",

name:customerName,

phone:customerPhone,

address:customerAddress,

payment:payment,

items:name,

total:price

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

window.open(

"https://wa.me/201150402031?text="
+
encodeURIComponent(message),

"_blank"

);

alert("✅ تم إرسال الطلب");

}

});

}
