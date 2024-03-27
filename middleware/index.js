const jwt = require("jsonwebtoken");
const JWT_SCERET = process.env.JWT_SCERET;
module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, JWT_SCERET, function (err, decoded) {
        console.log(err, decoded);
        if (err) {
          req.user = { isAuthenticated: false };
          if (err.name === "TokenExpiredError")
            return res
              .status(401)
              .send({ success: false, msg: "Access Token Expired" });
          else
            return res.status(401).send({ success: false, msg: "JWT Error" });
        } else {
          req.user = decoded.sub;
          req.user.isAuthenticated = true;
          next();
        }
      });
    } else {
      req.user = { isAuthenticated: false };
      next();
    }
  });
};
