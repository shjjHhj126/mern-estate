const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} = require("../controllers/listing.controller");

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.put("/update/:id", verifyToken, updateListing);
listingRouter.get("/get/:id", verifyToken, getListing);

module.exports = listingRouter;
