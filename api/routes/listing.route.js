const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  createListing,
  deleteListing,
  updateListing,
} = require("../controllers/listing.controller");

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.put("/update/:id", verifyToken, updateListing);

module.exports = listingRouter;
