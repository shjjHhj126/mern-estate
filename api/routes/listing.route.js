const express = require("express");
const verifyToken = require("../utils/verifyUser");
const createListing = require("../controllers/listing.controller");

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);

module.exports = listingRouter;
