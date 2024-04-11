const { default: mongoose } = require("mongoose");
const Listing = require("../models/listing.model");
const errorHandler = require("../utils/error");
const { default: axios } = require("axios");

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
const getListing = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
const getListings = async (req, res, next) => {
  console.log("req.query:", req.query);
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    if (offer === undefined || offer === false || offer === "false") {
      offer = { $in: [false, true] }; //$in:search inside the database, offer can be both true and false
    }
    if (
      furnished === undefined ||
      furnished === false ||
      furnished === "false"
    ) {
      furnished = { $in: [true, false] }; //$in:search inside the database, offer can be both true and false
    }

    if (parking === undefined || parking === false || parking === "false") {
      parking = { $in: [true, false] }; //$in:search inside the database, offer can be both true and false
    }
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] }; //$in:search inside the database, offer can be both true and false
    }
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    console.log(listings);

    return res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
};
// $options: "i", do not care about the uppercase or lowercase
// [sort]: order, eg. createAt : desc
