const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

//next is one of the arguments!
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //hash the password:hashSync already include await, no need to type await
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("user created successfully"); //201 means created
  } catch (err) {
    //use the middleware
    next(err);
  }
};

const signin = async (req, res, next) => {
  //get the data from req
  const { email, password } = req.body;
  try {
    //check if the email exists
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    //check the password is correct or not
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    //create a jwt token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //set the cookie
    const { password: password_2, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //on production, true, on localhost, false
      })
      .json({ status: 200, data: rest });
  } catch (err) {
    next(err); //call the error handling middleware in index.js
  }
};

module.exports = {
  signup,
  signin,
};
