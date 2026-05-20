importScripts(
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
"https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({

apiKey:
"AIzaSyBmWKWIPtVjUYXGOF77Zstmz3ROpvKIDog",

authDomain:
"futuretank-68c26.firebaseapp.com",

projectId:
"futuretank-68c26",

storageBucket:
"futuretank-68c26.firebasestorage.app",

messagingSenderId:
"481083621438",

appId:
"1:481083621438:web:db01077aef0511792c516f"

});

const messaging =
firebase.messaging();

messaging.onBackgroundMessage(
function(payload){

self.registration.showNotification(

payload.notification.title,

{

body:
payload.notification.body,

icon:
"./icon-192.png",

badge:
"./icon-192.png"

}

);

}
);
