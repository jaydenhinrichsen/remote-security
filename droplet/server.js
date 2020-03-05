require("./env");
const express = require("express");
const path = require("path");
const { app, httpServer, controlInterface, ftp } = require("./services");

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("cors")({ origin: true }));
app.use(require("./routes/api"));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Start the services
httpServer.listen(process.env.WEB_SERVER_PORT, () => {
  console.log("HTTP server listening");
});

// ftp.listen();
controlInterface.listen();
