const net = require("net");
const { EventEmitter } = require("events");

class Scanner extends EventEmitter {
  constructor({ ip, timeout, ports }) {
    super();
    this.ip = ip || undefined;
    this.timeout = timeout || 1000;
    this.ports = ports || undefined;
    this.scanInterval = null;
    this.devices = undefined;
  }

  /**
   * @public
   * @description Start the scanner
   */
  scan() {
    if (this.ip) {
      this._scan();
    } else {
      throw new Error("Please specify a base IP address.");
    }
  }

  stop() {
    clearInterval(this.scanInterval);
  }

  /**
   * @private
   * @description Check a host:port combination
   * @param {Number} port
   * @param {String} host
   */
  _scan() {
    for (let i = 0; i < 255; i++) {
      if (this.ports) {
        for (let j = 0; j < this.ports.length; j++) {
          this._check(this.ports[j], `${this.ip}.${i}`);
        }
      } else {
        throw new Error("Please specify a list of ports to check.");
      }
    }

    if (this.devices) {
      this.emit("end", this.devices);
      this.devices = {};
    }
  }

  /**
   * @private
   * @description Check a host:port combination
   * @param {Number} port
   * @param {String} host
   */
  _check(port, host) {
    let socket = new net.Socket();
    socket.setTimeout(this.timeout);
    socket.on("connect", () => this._handleConnect(socket, port, host));
    socket.on("timeout", () => this._handleTimeout(socket));

    // Handle errors silently
    socket.on("error", () => null);
    socket.on("close", () => null);

    socket.connect(port, host);
  }
  /**
   * @private
   * @description Handle a successful connection
   * @param {Socket} socket
   * @param {Number} port
   * @param {String} host
   */
  _handleConnect(socket, port, host) {
    this.emit("device", { port, host });
    if (!this.devices) {
      this.devices = {};
    }

    if (this.devices[host]) {
      this.devices[host].push(port);
    } else {
      this.devices[host] = [port];
    }
    socket.end();
  }

  _handleTimeout(socket) {
    socket.destroy();
  }
}

module.exports = Scanner;
