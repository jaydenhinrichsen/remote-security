const net = require("net");
const { RTSPClient, H264Transport } = require("yellowstone/dist");

class Camera {
  constructor(info) {
    this.info = info;
    this.socket = new net.createConnection({
      host: process.env.DROPLET_ADDRESS,
      port: this.info.port,
      readable: true,
      writable: true
    });
    this.socket.on("error", err => {
      // this.rtspClient = null;
      // this.h264 = null;
      // this.socket.removeAllListeners();
      // console.log(err);
    });
    this.rtspClient = new RTSPClient(this.info.username, this.info.password);
    this.h264 = null;
  }

  start() {
    try {
      this.rtspClient
        .connect(this.info.streamURL, { connection: "tcp" })
        .then(details => {
          this.rtspClient.play();
          const h264 = new H264Transport(this.rtspClient, this.socket, details);
          h264.stream.on("error", err => {
            this.rtspClient.close(true);
            h264.stream.destroy();
            console.log(err);
          });
        })
        .catch(err => {
          this.rtspClient.close();
          this.h264 = null;
          this.socket.removeAllListeners();
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  stop() {
    if (this.rtspClient) {
      this.rtspClient.close();
    }
  }

  pause() {
    if (this.rtspClient) {
      this.rtspClient.pause();
    }
  }
}

module.exports = Camera;
