//the requirements and rulses for the users (i.e. Schema)
const mongoose = require("mongoose");

//{ timestamps: true }:record create and update time
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); //auto create users in db cuz "User"

module.exports = User;
