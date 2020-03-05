const request = require("request");
const Scanner = require("../Scanner");
class NodeMCU {
  constructor(controlInterface) {
    this.controlInterface = controlInterface;
    this.controlInterface.on("data", this._handleControlData.bind(this));

    this.address = null;
    this.port = null;
    this.baseUrl;
    this.authKey = "authkey=1234567890";
    this.connected = false;
    this.scanner = new Scanner({
      ip: "192.168.43",
      timeout: 2000,
      ports: [80, 554]
    });

    this.connectCheck = setInterval(() => {
      if (!this.connected) {
        this._locate();
      }
    }, 2000);
    this.scanner.on("end", devices => {
      if (devices) {
        for (const key in devices) {
          if (devices.hasOwnProperty(key)) {
            if (!devices[key].find(port => port === 554)) {
              this.address = key;
              this.port = devices[key];
              console.log(key);
              this.baseUrl = `http://${this.address}:${parseInt(this.port)}`;
              this.connected = true;
              this._connect();
            }
          }
        }
      }
    });
  }

  _locate() {
    this.scanner.scan();
  }

  _handleControlData(data) {
    const { type } = data;
    if (type === "NODE_MCU_ADDRESS") this._connect(data.payload);
    else if (type === "GET_VOLTAGE") this._getVoltage();
    else if (type === "SIREN_ON") this._sirenOn();
    else if (type === "SIREN_OFF") this._sirenOff();
    else if (type === "SET_SIREN_TIME") this._setSirenTime(data.payload);
    else if (type === "GET_SIREN_TIME") this._getSirenTime(data.payload);
    else if (type === "LIGHT_ON") this._lightOn();
    else if (type === "LIGHT_OFF") this._lightOff();
    else if (type === "SET_LIGHT_TIME") this._setLightTime(data.payload);
    else if (type === "GET_LIGHT_TIME") this._getLightTime(data.payload);
  }

  _connect() {
    this.sendRequest({
      uri: `${this.baseUrl}/serverconnected?${this.authKey}`,
      method: "GET"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }

  _sirenOn() {
    this.sendRequest({
      uri: `${this.baseUrl}/siren?state=on&${this.authKey}`,
      method: "GET"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _sirenOff() {
    this.sendRequest({
      uri: `${this.baseUrl}/siren?state=off&${this.authKey}`,
      method: "GET"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _setSirenTime(data) {
    this.sendRequest({
      uri: `${this.baseUrl}/sirentime?time=${data}&${this.authKey}`,
      method: "POST"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _getSirenTime() {
    this.sendRequest({
      uri: `${this.baseUrl}/getsirentime?${this.authKey}`,
      method: "GET"
    })
      .then(res =>
        this.controlInterface.sendData({
          type: "SIREN_TIME",
          payload: res.body
        })
      )
      .catch(err => console.log(err));
  }
  _lightOn() {
    this.sendRequest({
      uri: `${this.baseUrl}/lights?state=on&${this.authKey}`,
      method: "GET"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _lightOff() {
    this.sendRequest({
      uri: `${this.baseUrl}/lights?state=off&${this.authKey}`,
      method: "GET"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _setLightTime(data) {
    this.sendRequest({
      uri: `${this.baseUrl}/lightstime?time=${data}&${this.authKey}`,
      method: "POST"
    })
      .then(res => console.log(res.body))
      .catch(err => console.log(err));
  }
  _getLightTime() {
    this.sendRequest({
      uri: `${this.baseUrl}/getlightstime?${this.authKey}`,
      method: "GET"
    })
      .then(res =>
        this.controlInterface.sendData({
          type: "LIGHT_TIME",
          payload: res.body
        })
      )
      .catch(err => console.log(err));
  }

  _getVoltage() {
    this.sendRequest({
      uri: `${this.baseUrl}/voltage?${this.authKey}`,
      method: "GET"
    })
      .then(res => {
        console.log(res.body);
        this.controlInterface.sendData({
          type: "VOLTAGE",
          payload: res.body
        });
      })
      .catch(err => console.log(err));
  }

  sendRequest(options) {
    return new Promise((resolve, reject) => {
      request(options, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  }
}

module.exports = controlInterface => new NodeMCU(controlInterface);
