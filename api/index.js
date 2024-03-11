const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
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

app.use(express.json()); //to allow jsoon as input as the server

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

//Routes
app.use("/api/user", userRouter); //'api/user' is the base path. It acts as a prefix for userRouter.When a request is made to the server with a URL that starts with /api/user, Express will match it to this middleware, and the middleware function will be executed.
app.use("/api/auth", authRouter);

//middleware for handling error
//use next to go to the next middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
  });
});
