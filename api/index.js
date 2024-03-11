const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//connect to db, mongoose.connect returns a promise
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connect to db!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
