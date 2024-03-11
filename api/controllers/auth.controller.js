const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //hash the password:hashSync already include await, no need to type await
  console.log(process.env.SECRET);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully"); //201 means created
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = signup;
