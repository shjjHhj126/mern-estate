const express = require("express");
const { signup, login, google } = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", google);

module.exports = authRouter;
