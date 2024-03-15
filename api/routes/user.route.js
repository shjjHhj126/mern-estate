const express = require("express");
const { test, updateUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyUser");

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/update/:id", verifyToken, updateUser);

module.exports = userRouter;
