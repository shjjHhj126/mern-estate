const express = require("express");
const {
  signup,
  login,
  google,
  logout,
} = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/google", google);

module.exports = authRouter;
