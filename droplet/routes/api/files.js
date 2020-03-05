const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { db } = require("../../services");

router.route("/").get(auth, (req, res) => {
  db.query("files")
    .then(docs => res.json(docs).status(200))
    .catch(err => console.log(err));
});

module.exports = router;
