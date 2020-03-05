const path = require("path");

// Credentials
process.env.FTP_USERNAME = "FTP_USERNAME";
process.env.FTP_PASSWORD = "FTP_PASSWORD";

// Ports/Addresses
process.env.WEB_SERVER_PORT = 5000;
process.env.CONTROL_INTERFACE_PORT = 6000;
process.env.FTP_PORT = 21;
process.env.HOST_ADDRESS = "SERVER_IP";

// Paths
process.env.ROOT_DIR = path.resolve(__dirname);
process.env.STATIC_BUILD = path.join(__dirname, "client/build");
process.env.STATIC_BUILD_INDEX = path.join(
  __dirname,
  "client/build/index.html"
);

// Keys
process.env.PUBLIC_VAPID_KEY = "PUBLIC_KEY";
process.env.PRIVATE_VAPID_KEY = "PRIVATE_KEY";
process.env.FIRESTORE_URL = "FIRESTORE_URL";
