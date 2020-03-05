require("./env");
const controlInterface = require("./control-interface")();
controlInterface.connect();

const cameras = require("./cameras")(controlInterface);
const nodeMCU = require("./nodemcu")(controlInterface);
