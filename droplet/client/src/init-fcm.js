import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp(); // firebase app config

const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey("YOUR_PUBLIC_KEY");

export { messaging };
