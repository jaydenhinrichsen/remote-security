const net = require("net");
const ffmpeg = require("fluent-ffmpeg");
/**
 * @class Camera
 */
class Camera {
  constructor(info) {
    this.info = info;
    this.clients = {};
    this.isPlaying = false;
    this.server = net.createServer(this._handleConnection.bind(this));
    this.server.maxConnections = 1;
    this.server.listen(this.info.port, process.env.HOST_ADDRESS, () => {
      this._log(`listening on port ${this.info.port}`);
    });
  }

  /**
   * @private
   * @description Handle a new connection for this camera
   * @param {Socket} socket
   */
  _handleConnection(socket) {
    socket.on("close", () => {
      this.server.close();
    });

    socket.on("error", err => {
      this.server.close();
      this._log(err.message);
    });

    this._startFfmpeg(socket);
  }

  /**
   * @private
   * @description Start the ffmpeg encoder process
   * @todo
   *   Refacor the Android rtsp client tp send the raw stream with both channels
   * @param {Socket} socket
   */
  _startFfmpeg(socket) {
    try {
      let ffmpegProcess = ffmpeg(socket)
      .videoCodec("mpeg1video")
      .format("mpegts")
      .inputFPS(20)
      .videoBitrate(1000)
      .outputOptions("-bf", "0")
      .on("error", err => console.log(err));

    ffmpegProcess.pipe().on("data", chunk => {
      for (const key in this.clients) {
        if (this.clients.hasOwnProperty(key)) {
          const client = this.clients[key];
          client.send(chunk);
        }
      }
    });
    } catch (error) {
      this._log(error.message)
    }

    this._log("Android connected");
  }
  _log(message) {
    console.log(`${this.info.name}: ${message}`);
  }
}
module.exports = Camera;
