import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import SwiperCore from "swiper"; // to use navigation
// import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaSearch } from "react-icons/fa"; //fa:font awesome

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // SwiperCore.use([Navigation]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // each time we hit the search icon, it reflect to the query(window.location.search) and redirect to that url
  const handleSubmit = (e) => {
    e.preventDefault();

    // set the new url
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    //navigate to the new url
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res1 = await axios.get("/api/listing/get?offer=true&limit=4");
        const res = res1.data;
        setOfferListings(res);
        fetchRentListings(); // so this is step by step calling, so the page is going to be loaded better
      } catch (err) {
        console.log(err);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res1 = await axios.get("/api/listing/get?type=rent&limit=4");
        const res = res1.data;
        setRentListings(res);
        fetchSaleListings();
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res1 = await axios.get("/api/listing/get?type=sale&limit=4");
        const res = res1.data;
        setSaleListings(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top*/}
      <div className="relative flex items-center justify-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mern-estate-345f5.appspot.com/o/61f2b0e1f0a732ae15de4d98_open-house-ideas-header-image-scaled.jpeg?alt=media&token=9a61bd20-c808-4d78-b3c6-944d6c805d25"
          alt="loading home image..."
          className="h-[250px] sm:h-[500px] object-cover w-full mx-auto brightness-75 "></img>
        <div className="absolute flex flex-col items-center z-10 w-full px-4 sm:w-1/2">
          <p className="text-white sm:text-4xl text-2xl  font-serif font-bold ">
            Agents. Tours. Loans. Homes.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 sm:p-7 p-2 rounded-lg w-full flex flex-row items-center mt-3 sm:mt-7">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full sm:w-auto flex-grow "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-blue-500  text-md sm:text-2xl" />
            </button>
          </form>
        </div>
      </div>

      {/* listing results for offer, sale and rent*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                to="/search?offer=true"
                className="text-sm text-blue-800 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                to="/search?type=rent"
                className="text-sm text-blue-800 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                to="/search?type=sale"
                className="text-sm text-blue-800 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
