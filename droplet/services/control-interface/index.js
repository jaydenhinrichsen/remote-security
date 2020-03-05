const net = require("net");
const { EventEmitter } = require("events");

/**
 * @class ControlInterface <Singleton>
 * @description
 * A persistent connection with the Android server used
 * to send and receive control commands.
 * All data send or received has the following format:
 * {
 *   type: <String>,
 *   payload: <Any>
 * }
 *
 * @todo
 * Add better logging for debugging
 */
class ControlInterface extends EventEmitter {
  constructor() {
    super();
    this.server = net.createServer(this._handleConnection.bind(this));
    this.server.maxConnections = 1; // We expect only one connection(Android server)
    this.socket = null;
  }

  /**
   * @private
   * @description Setup listeners when the Android server connects
   * @param {Socket} socket
   */
  _handleConnection(socket) {
    this.socket = socket;
    this.socket.on("error", this._handleSocketError.bind(this));
    this.socket.on("close", this._handleSocketClose.bind(this));
    this.socket.on("data", this._handleData.bind(this));
  }

  _handleSocketClose() {
    this._log("Connection closed");
  }

  _handleSocketError(err) {
    this._log(err.message);
  }

  /**
   * @private
   * @description
   * Parse an incoming command from the Android server and emit
   * the data as an event
   * @emits data
   * @param {Buffer} buffer
   */
  _handleData(buffer) {
    try {
      const data = JSON.parse(buffer.toString());
      this.emit("data", data);
      this._log(`Received ${data.type} from Android`);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @public
   * @description Send a JSON object to the Android server
   * @param {Object} obj
   */
  sendData(obj) {
    if (this.socket) {
      const data = JSON.stringify(obj);
      this.socket.write(data);

      this._log(`Sent ${obj.type} to Android`);
    }
  }

  _log(message) {
    console.log(`Control Interface: ${message}`);
  }

  /**
   * @public
   * @description Start the control server
   */
  listen() {
    this.server.listen(process.env.CONTROL_INTERFACE_PORT, () => {
      this._log(`listening on port ${process.env.CONTROL_INTERFACE_PORT}`);
    });
  }
}

module.exports = () => new ControlInterface();
