const express = require("express");
const app = express();
app.use("/api/cameras", require("./cameras"));
app.use("/api/files", require("./files"));
app.use("/api/notifications", require("./notifications"));
app.use("/api/system", require("./system"));

module.exports = app;
