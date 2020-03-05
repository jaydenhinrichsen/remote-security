const { admin } = require("../../services");
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      admin
        .auth()
        .getUser(decodedToken.sub)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => res.status(500).json({ msg: "Server Error" }));
};
