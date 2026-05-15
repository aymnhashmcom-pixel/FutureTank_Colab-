const CACHE_NAME = "futuretank-v1";

const urlsToCache = [

"/FutureTank_Colab-/",
"/FutureTank_Colab-/index.html",
"/FutureTank_Colab-/style.css",
"/FutureTank_Colab-/shop.html",
"/FutureTank_Colab-/category.html",
"/FutureTank_Colab-/cart.html",
"/FutureTank_Colab-/checkout.html",
"/FutureTank_Colab-/payment.html",
"/FutureTank_Colab-/track-order.html"

];

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>{

return cache.addAll(urlsToCache);

})

);

}
);

self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches.match(event.request)
.then(response=>{

return response || fetch(event.request);

})

);

}
);
