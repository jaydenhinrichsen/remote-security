const FtpSrv = require("ftp-srv");
const bunyan = require("bunyan");

// Utils
const { getFilePath, parseFilePath } = require("./utils");

const quietLog = bunyan.createLogger({
  name: "quiet-logger",
  level: 60
});

/**
 * @class FTP <Singleton>
 */
class FTP {
  constructor(db, notifications) {
    this.host = process.env.HOST_ADDRESS;
    this.username = process.env.FTP_USERNAME;
    this.password = process.env.FTP_PASSWORD;

    this.db = db;
    this.notifications = notifications;

    this.server = new FtpSrv({
      log: quietLog,
      url: `ftp://${this.host}:${process.env.FTP_PORT}`,
      pasv_url: this.host,
      pasv_range: "6000-7000"
    });

    this.server.on("login", this._handleLogin.bind(this));
  }

  /**
   * @private
   *
   * @description Authenticate a new ftp login
   * @param {Object} data
   */
  _handleLogin(data, resolve, reject) {
    const { connection, username, password } = data;

    if (username === this.username && password === this.password) {
      connection.on("STOR", this._handleSTOR.bind(this));
      resolve();
    } else {
      reject();
    }
  }

  /**
   * @private
   * @description
   * Handle file upload from camera.
   * Create a new file document in database.
   * Send a notification to saved devices. (Only for .jpg files)
   *
   * @param {Object} error
   * @param {String} filename
   */
  _handleSTOR(error, filename) {
    console.log("A camera is uploading a file...");
    this.db
      .query("devices")
      .then(devices => {
        devices.forEach(device => {
          this.notifications.send({
            token: device.token,
            webpush: {
              data: {
                title: `Motion detected.`,
                body: `Click to view a live feed`
              }
            }
          });
        });
      })
      .catch(err => console.log(err));
    console.log(filename);
    if (filename) {
      if (filename.includes("test")) {
        return;
      } else if (filename.includes(".mp4")) {
        const filePath = getFilePath(filename);
        const { cameraName, date, ext } = parseFilePath(filePath);
        console.log("File uploaded");
        // Create a file doc
        this.db.addDoc("files", {
          camera: `/cameras/${cameraName}`,
          path: filePath,
          parsedDate: date,
          date: new Date().toISOString(),
          ext: ext
        });
      } else if (filename.includes(".jpg")) {
        const filePath = getFilePath(filename);
        const { cameraName, date, ext } = parseFilePath(filePath);

        // Create a file doc
        this.db.addDoc("files", {
          camera: `/cameras/${cameraName}`,
          path: filePath,
          parsedDate: date,
          date: new Date().toISOString(),
          ext: ext
        });

        console.log("Image uploaded");
        // Send a notification to all devices
      }
    }
  }

  /**
   * @public
   * @description Start the ftp server
   */
  listen() {
    this.server
      .listen()
      .then(() => console.log(`Listening for FTP connections`));
  }
}

module.exports = (db, notifications) => new FTP(db, notifications);
