const express = require("express");
const router = express.Router();

const { db } = require("../../services");

router.route("/register").post((req, res) => {
  const { token } = req.body;
  db.query("devices", ["token", "==", token])
    .then(docs => {
      if (docs.length === 0) {
        db.addDoc("devices", { token })
          .then(() => res.json("Token saved").status(200))
          .catch(err => res.json("Token invalid").status(401));
      } else {
        res.json("Token saved").status(200);
      }
    })
    .catch(err => res.json("server error").status(500));
});

module.exports = router;
