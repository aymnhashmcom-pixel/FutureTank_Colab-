let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

function renderCart(){
    if(!cartContainer || !totalElement) return;
    
    cartContainer.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartContainer.innerHTML = "<h3>🛒 السلة فارغة</h3>";
        totalElement.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {
        const cleanPrice = parseFloat(
            String(item.price)
            .replace("جنيه","")
            .replace("ج","")
            .replace(/,/g,"")
            .trim()
        ) || 0;

        total += cleanPrice;

        cartContainer.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>السعر: ${cleanPrice} جنيه</p>
                <button onclick="removeItem(${index})">❌ حذف</button>
            </div>
        `;
    });

    totalElement.innerText = total;
}

function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// تشغيل العرض الأولي للسلة
renderCart();

const whatsappBtn = document.getElementById("whatsapp-order");
if(whatsappBtn){
    whatsappBtn.onclick = function(){
        if(cart.length === 0){
            alert("السلة فارغة");
            return;
        }

        let message = "السلام عليكم\n";
        message += "أرغب في طلب المنتجات التالية:\n\n";

        cart.forEach(item => {
            message += `🔹 ${item.name} - ${item.price} جنيه\n`;
        });

        message += `\n💰 الإجمالي: ${totalElement.innerText} جنيه`;

        window.open(
            `https://wa.me/201150402031?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };
}
