const { default: mongoose } = require("mongoose");
const Listing = require("../models/listing.model");
const errorHandler = require("../utils/error");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
const deleteListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const listing = await Listing.findById(req.params.id);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (err) {
    next(err);
  }
};
const updateListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const listing = await Listing.findById(req.params.id);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //return the updated one, not the old one
    );
    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
};
module.exports = { createListing, deleteListing, updateListing };
