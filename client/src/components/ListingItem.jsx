import React from "react";
import { Link } from "react-router-dom";
import { MdBathroom, MdBathtub, MdBed, MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[260px] object-cover hover:scale-105 transition-scale duration-300"></img>
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate  text-slate-700 font-semibold text-lg ">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="truncate text-sm text-gray-600 w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-700 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrize.toLocaleString("en-US")
              : listing.regularPrize.toLocaleString("en-US")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className="text-slate-700 flex gap-5 items-center text-slate-500">
            <div className="flex gap-2 items-center">
              <MdBed />
              <div className="font-bold text-sm">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <MdBathtub />
              <div className="font-bold text-sm">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
