const Camera = require("./Camera");
/**
 * @class Cameras <Singleton>
 */
class Cameras {
  constructor(controlInterface) {
    this.controlInterface = controlInterface;

    this.cameras = {};
    this.controlInterface.on("data", this._handleControlData.bind(this));
  }

  _handleControlData(data) {
    const { type } = data;
    if (type === "SETUP_CAMERAS") this._setupCameras(data.payload);
    else if (type === "START_STREAM") this._startStream(data.payload);
    else if (type === "STOP_STREAM") this._stopStream(data.payload);
    else if (type === "PAUSE_STREAM") this._pauseStream(data.payload);
    else if (type === "RESTART") console.log(data);
  }

  _setupCameras(cameras) {
    this.cameras = {}; // Handle the case where the droplet restarted
    for (const key in cameras) {
      if (cameras.hasOwnProperty(key)) {
        const camera = cameras[key];
        this.cameras[key] = new Camera(camera);
      }
    }
    this.controlInterface.sendData({ type: "SETUP_COMPLETE" });
  }
  _startStream(camera_name) {
    if (this.cameras) {
      this.cameras[camera_name].start();
      this.controlInterface.sendData({
        type: "STREAM_STARTED",
        payload: camera_name
      });
    }
  }
  _stopStream(camera_name) {
    if (this.cameras) {
      this.cameras[camera_name].stop();
      this.controlInterface.sendData({
        type: "STREAM_STOPPED",
        payload: camera_name
      });
    }
  }
  _pauseStream(camera_name) {
    if (this.cameras) {
      this.cameras[camera_name].pause();
      this.controlInterface.sendData({
        type: "STREAM_PAUSED",
        payload: camera_name
      });
    }
  }
  _restart() {}
}

module.exports = controlInterface => new Cameras(controlInterface);
