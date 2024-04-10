const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "config.env" });
// dotenv.config();

//create a dynamic path : __dirname
const cur_dir = path.resolve();

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
app.use(
  cors({
    origin: "http://localhost:5173", //the frontend port, idk why
    credentials: true,
  })
); //default:allow from anywhere
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
//to prevent preflight request cuz by cors

//Routes
app.use("/api/user", userRouter); //'api/user' is the base path. It acts as a prefix for userRouter.When a request is made to the server with a URL that starts with /api/user, Express will match it to this middleware, and the middleware function will be executed.
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//create static path
app.use(express.static(path.join(cur_dir, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(cur_dir, "client/dist/index.html"));
});

//error handling middleware
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
