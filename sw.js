const CACHE_NAME = "futuretank-v5";

const urlsToCache = [

"./",
"./index.html",
"./style.css",
"./manifest.json",
"./icon-192.png",
"./icon-512.png",
"./services.html",
"./shop.html",
"./assistant.html",
"./portal.html",
"./track-order.html"

];

/* INSTALL */

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>{

return cache.addAll(urlsToCache);

})

);

/* تفعيل مباشر */

self.skipWaiting();

}
);

/* ACTIVATE */

self.addEventListener(
"activate",
event=>{

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

/* تحديث مباشر */

self.clients.claim();

}
);

/* FETCH */

self.addEventListener(
"fetch",
event=>{

event.respondWith(

fetch(event.request)
.then(response=>{

const clone =
response.clone();

caches.open(CACHE_NAME)
.then(cache=>{

cache.put(
event.request,
clone
);

});

return response;

})
.catch(()=>{

return caches.match(
event.request
);

})

);

}
);
