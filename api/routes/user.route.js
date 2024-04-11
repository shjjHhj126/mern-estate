const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyUser");

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);
userRouter.get("/:id", verifyToken, getUser);

module.exports = userRouter;
