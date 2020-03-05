const express = require("express");
const router = express.Router();
const { controlInterface } = require("../../services");

controlInterface.on("data", data => {
  if (data.type === "LIGHT_TIME") {
    console.log(data);
  }

  if (data.type === "SIREN_TIME") {
    console.log(data);
  }

  if (data.type === "VOLTAGE") {
    console.log(data);
  }
});

router.route("/lightTime").get((req, res) => {
  controlInterface.sendData({ type: "GET_LIGHT_TIME" });
  res.send("OK").status(200);
});

router.route("/sirenTime").get((req, res) => {
  controlInterface.sendData({ type: "GET_SIREN_TIME" });
  res.send("OK").status(200);
});

router.route("/voltage").get((req, res) => {
  controlInterface.sendData({ type: "GET_VOLTAGE" });
  res.send("OK").status(200);
});
router.route("/").post((req, res) => {
  const { control, data } = req.body;
  if (control === "lightOn") {
    if (data) controlInterface.sendData({ type: "LIGHT_ON" });
    else controlInterface.sendData({ type: "LIGHT_OFF" });
    res.json({ control, data: data }).status(200);
  } else if (control === "sirenOn") {
    if (data) controlInterface.sendData({ type: "SIREN_ON" });
    else controlInterface.sendData({ type: "SIREN_OFF" });
    res.json({ control, data: data }).status(200);
  } else if (control === "sirenTime") {
    controlInterface.sendData({
      type: "SET_SIREN_TIME",
      payload: req.body.data
    });
    res.json({ control, data }).status(200);
  } else if (control === "lightTime") {
    controlInterface.sendData({
      type: "SET_LIGHT_TIME",
      payload: req.body.data
    });
    res.json({ control, data }).status(200);
  }
});

module.exports = router;
