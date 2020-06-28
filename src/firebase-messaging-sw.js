importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyAyTzXvUInb0aItW2KyVAlq5FzRQVSbxmY',
    authDomain: 'espanol-entre-amigos.firebaseapp.com',
    databaseURL: 'https://espanol-entre-amigos.firebaseio.com',
    projectId: 'espanol-entre-amigos',
    storageBucket: 'espanol-entre-amigos.appspot.com',
    messagingSenderId: '891949617179',
    appId: '1:891949617179:web:f9093ca827f32acf07a8be',
    measurementId: 'G-0G922NQS1C'
});

const messaging = firebase.messaging();

messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
messaging.onMessage = messaging.onMessage.bind(messaging);
