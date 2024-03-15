const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  //check if the token is correct or not
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user; //just id
    next(); //updateUser
  });
};
module.exports = verifyToken;