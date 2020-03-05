/*
The application services are initialized in this file and exported for 
use across the application. 
Note
  The express app middleware applied in the server.js file, otherwise
  an error occurs where the services are not initialized, resulting in
  them being undefined.
*/

// Firebase
const serviceAccount = require("./firebase_app_key.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_URL
});

// Express
const app = require("express")();

// HTTP server
const httpServer = require("http").createServer();
httpServer.on("request", app);

// Websocket server
const ws = require("ws");
const wss = new ws.Server({ server: httpServer });

// Services
const db = require("./database")(admin.firestore());
const notifications = require("./notifications")(admin.messaging());
const ftp = require("./ftp")(db, notifications);
const controlInterface = require("./control-interface")();
const cameras = require("./cameras")(controlInterface, db, wss);

module.exports = {
  admin,
  db,
  app,
  ftp,
  controlInterface,
  cameras,
  httpServer,
  wss
};
