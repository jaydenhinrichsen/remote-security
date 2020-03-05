const _ = require("lodash");
const uuid = require("uuid/v4");

const Camera = require("./Camera");
/**
 * @class Cameras <Singleton>
 */
class Cameras {
  constructor(controlInterface, db, wss) {
    this.controlInterface = controlInterface;
    this.db = db;
    this.cameras = {};
    this.isReady = false;
    this.controlInterface.on("data", this._handleControlData.bind(this));
    this.wss = wss;
    this.wss.on("connection", this._handleWebsocketClient.bind(this));
  }

  _handleWebsocketClient(ws, req) {
    ws.client_id = uuid();
    ws.camera = req.url.replace("/", " ").trim();
    if (this.cameras[ws.camera]) {
      this.cameras[ws.camera].clients[ws.client_id] = ws;

      if (!this.cameras[ws.camera].isPlaying) {
        this._startStream(ws.camera);
      }
    }

    ws.on("close", () => {
      try {
        if (!_.isEmpty(this.cameras[ws.camera])) {
          delete this.cameras[ws.camera].clients[ws.client_id];
        }
        if (_.isEmpty(this.cameras[ws.camera].clients)) {
          this._pauseStream(ws.camera);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  /**
   * @private
   * @description Handle a command from the Android server
   * @param {Object} data
   */
  _handleControlData(data) {
    const { type } = data;
    if (type === "CONTROL_CONNECTED") {
      this._setupCameras();
    } else if (type === "SETUP_COMPLETE") {
      this.isReady = true;
    } else if (type === "STREAM_STARTED") {
      this.cameras[data.payload].isPlaying = true;
    } else if (type === "STREAM_STOPPED") {
      return;
    } else if (type === "STREAM_PAUSED") {
      return;
    } else if (type === "RESTART_COMPLETE") {
      return;
    }
  }

  _setupCameras() {
    this.db.query("cameras").then(docs => {
      let freePort = 10000; // Todo: make a 'findFreePort' function. This is risky..
      let camerasInfo = {};
      docs.forEach(camera => {
        camerasInfo[camera.name] = { ...camera, port: freePort };
        this.cameras[camera.name] = new Camera(camerasInfo[camera.name]);
        freePort += 1;
      });
      this.controlInterface.sendData({
        type: "SETUP_CAMERAS",
        payload: camerasInfo
      });
    });
  }

  _startStream(camera_name) {
    if (this.isReady) {
      this.controlInterface.sendData({
        type: "START_STREAM",
        payload: camera_name
      });
    }
  }
  _stopStream(camera_name) {
    try {
      if (this.cameras[camera_name].isPlaying) {
        this.cameras[camera_name].isPlaying = false;
        this.controlInterface.sendData({
          type: "STOP_STREAM",
          payload: camera_name
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  _pauseStream(camera_name) {
    try {
      if (this.cameras[camera_name].isPlaying) {
        this.cameras[camera_name].isPlaying = false;
        this.controlInterface.sendData({
          type: "PAUSE_STREAM",
          payload: camera_name
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  _restart() {}
}

module.exports = (controlInterface, db, wss) =>
  new Cameras(controlInterface, db, wss);
