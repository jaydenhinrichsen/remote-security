const net = require("net");
const { EventEmitter } = require("events");

const RECONNECT_TIMEOUT = 5000;

/**
 * @class ControlInterface <Singleton>
 */
class ControlInterface extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
  }

  /**
   * @public
   * @description
   * Attempt to connect to the droplet
   */
  connect() {
    this.socket = new net.createConnection({
      host: process.env.DROPLET_ADDRESS,
      port: process.env.DROPLET_CONTROL_PORT,
      readable: true,
      writable: true
    });
    this.socket.once("connect", this._handleConnect.bind(this));
    this.socket.once("error", this._handleSocketError.bind(this));
    this.socket.once("close", this._handleSocketClose.bind(this));
    this.socket.on("data", this._handleData.bind(this));
  }

  _handleConnect() {
    console.log("Control Interface: Connected");
    this.sendData({ type: "CONTROL_CONNECTED" });
  }

  _handleSocketClose() {
    console.log("Control Interface: connection closed");
    this._reconnect();
  }

  _handleSocketError(err) {
    console.log("Control Interface:", err.message);
  }

  _reconnect() {
    console.log("Attempting to reconnect...");
    setTimeout(() => {
      this.socket.removeAllListeners();
      this.connect();
    }, RECONNECT_TIMEOUT);
  }

  _handleData(buffer) {
    const data = JSON.parse(buffer.toString());
    this.emit("data", data);
    this._log(`Received ${data.type} from Droplet`);
  }

  sendData(obj) {
    if (this.socket) {
      const data = JSON.stringify(obj);
      this.socket.write(data);
      this._log(`Sent ${obj.type} to Droplet`);
    }
  }

  _log(message) {
    console.log(`Control Interface: ${message}`);
  }
}

module.exports = () => new ControlInterface();
