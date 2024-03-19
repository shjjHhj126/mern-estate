const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const Listing = require("../models/listing.model");

const test = (req, res) => {
  res.send("api route is working");
};
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        //$set:telling mongodb to only update the fields specified within the $set while keeping other fields unchanged
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // if don't add { new: true }, you'll get the prev info
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  //req.user.id is getting from verifyUser
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (err) {
    next(err);
  }
};
const getUserListings = async (req, res, next) => {
  // console.log(req.user.id);
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings"));
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found"));
    const { password: password2, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
};
