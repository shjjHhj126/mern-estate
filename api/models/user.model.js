//the requirements and rulses for the users (i.e. Schema)
const mongoose = require("mongoose");

//{ timestamps: true }:record create and update time
const userSchema = new mongoose.Schema(
  {
    user: {
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
