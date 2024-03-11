const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

//next is one of the arguments!
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //hash the password:hashSync already include await, no need to type await
  console.log(process.env.SECRET);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully"); //201 means created
  } catch (err) {
    //use the middleware
    next(err);
  }
};

module.exports = signup;
