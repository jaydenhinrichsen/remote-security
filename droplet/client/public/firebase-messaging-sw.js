importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp(); // firebase app config

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function({ data }) {
  // Customize notification here
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
