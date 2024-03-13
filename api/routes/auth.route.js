const express = require("express");
const { signup, signin, google } = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google);

module.exports = authRouter;
