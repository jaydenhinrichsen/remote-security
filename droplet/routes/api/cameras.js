const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { db } = require("../../services");

router.route("/").post(auth, (req, res) => {
  db.addDoc("cameras", req.body)
    .then(ref => console.log("New camera created", ref))
    .catch(err => console.log(err));
});

router.route("/").get(auth, (req, res) => {
  db.query("cameras")
    .then(docs => res.json(docs).status(200))
    .catch(err => console.log(err));
});

module.exports = router;
