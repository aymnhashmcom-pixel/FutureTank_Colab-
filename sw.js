const CACHE_NAME = "futuretank-cache-v3";

const urlsToCache = [

"./",
"./index.html",
"./style.css",
"./script.js",
"./manifest.json",
"./icon-192.png",
"./icon-512.png",
"./shop.html",
"./market.html",
"./track-order.html"

];

/* ===============================
INSTALL
================================ */

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(urlsToCache);

})

);

self.skipWaiting();

});

/* ===============================
ACTIVATE
================================ */

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

});

/* ===============================
FETCH
================================ */

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

});

/* ===============================
PUSH NOTIFICATIONS
================================ */

self.addEventListener("push",function(event){

let data = {

notification:{

title:"Future Tank",

body:"📦 يوجد تحديث جديد",

icon:"./icon-192.png"

}

};

if(event.data){

data = event.data.json();

}

self.registration.showNotification(

data.notification.title,

{

body:data.notification.body,

icon:data.notification.icon,

badge:"./icon-192.png",

vibrate:[200,100,200],

data:{

url:"./index.html"

}

}

);

});

/* ===============================
NOTIFICATION CLICK
================================ */

self.addEventListener(

"notificationclick",

function(event){

event.notification.close();

event.waitUntil(

clients.openWindow("./index.html")

);

}

);
