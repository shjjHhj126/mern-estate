import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import {
  FaBath,
  FaBed,
  FaChair,
  FaCircle,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res1 = await axios.get(`/api/listing/get/${params.listingId}`);
        const res = res1.data;
        if (res.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(res);
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">something went wrong</p>
      )}
      {listing && !loading && !error && (
        <div className="bg-white w-full">
          {/*image section */}
          <div className=" w-full bg-gray-500">
            <Swiper navigation style={{ height: "100%", width: "100%" }}>
              {listing.imageUrls.map((url) => (
                <SwiperSlide
                  key={url}
                  style={{ height: "100%", width: "100%" }}>
                  <div
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="h-[500px] w-full" //why have to set to fix height or it will shrink to 0?
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <hr />
          <p className="text-2xl font-serif p-3">{listing.name}</p>
          <div className="flex flex-col sm:flex-row">
            <div className=" flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <div className="flex gap-4">
                <p className="flex bg-gray-200 font-semibold w-full max-w-[100px] text-black text-center p-1 rounded-md items-center gap-2">
                  <FaCircle className="text-red-500 text-xs" />
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-blue-500 w-full max-w-[100px] text-white text-center p-1 rounded-md">
                    {((listing.regularPrize - listing.discountPrize) /
                      listing.regularPrize) *
                      100}
                    % OFF
                  </p>
                )}
              </div>
              <p className="text-3xl font-bold">
                $
                {listing.offer
                  ? listing.discountPrize.toLocaleString("en-US")
                  : listing.regularPrize.toLocaleString("en-US")}
                {listing.type === "rent" && "/month"}
              </p>
              <p className="flex items-center gap-2 text-slate-600 text-lg">
                <FaMapMarkerAlt className="text-black-700" />
                {listing.address}
              </p>

              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <ul className=" text-gray-700 font-normal text-base flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="bg-gray-100 flex items-center gap-3 rounded-lg p-2 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="bg-gray-100 flex items-center gap-3 rounded-lg p-2 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="bg-gray-100 flex items-center gap-3 rounded-lg p-2 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="bg-gray-100 flex items-center gap-3 rounded-lg p-2 whitespace-nowrap">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            </div>

            <div>
              {currentUser && listing.userRef !== currentUser._id && (
                <div className="border border-solid border-gray-300 p-5 m-5 rounded-lg">
                  <div className="p-5">
                    <button className="bg-blue-500 text-white font-bold rounded-md p-3 hover:opacity-95 w-full">
                      Request a tour
                      <p className="font-normal text-sm">
                        as early as today 11:00 am
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <div className="border border-solid border-gray-300 rounded-md p-5 m-5">
                    <div className="p-5">
                      <button
                        onClick={() => setContact(true)}
                        className="bg-white border border-blue-500 text-blue-500 w-full rounded-lg p-3 hover:opacity-95 font-semibold">
                        Contact landlord
                      </button>
                    </div>
                  </div>
                )}
              {contact && (
                <Contact
                  listing={listing}
                  contact={contact}
                  setContact={setContact}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// <Contact listing={listing} /> pass a prop named listing, and its value is the listing object
