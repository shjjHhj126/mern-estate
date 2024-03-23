import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  // const [positions, setPositions] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const geocodingClient = mapboxSdk({
    accessToken: import.meta.env.VITE_MAP_TOKEN,
  });

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    // Store the map object in state
    setMap(newMap);

    // Cleanup function to remove the map when the component unmounts
    return () => {
      newMap.remove();
    };
  }, []); //cleanup function, used when Map is unmounted

  useEffect(() => {
    if (listings.length === 0 || !map) return;

    const geocodingClient = mapboxSdk({
      accessToken: import.meta.env.VITE_MAP_TOKEN,
    });

    const markListingsOnMap = async () => {
      for (const listing of listings) {
        const query = `${listing.address}, ${listing.city}, ${listing.country}`;

        try {
          const response = await geocodingClient
            .forwardGeocode({
              query: query,
              limit: 1,
            })
            .send();

          const features = response.body.features;

          if (features && features.length > 0) {
            const [lng, lat] = features[0].center;

            // Add marker
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          }
        } catch (error) {
          console.log("Error geocoding address:", error);
        }
      }
    };

    markListingsOnMap();
  }, [listings, map]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || " ",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        order: orderFromUrl || "desc",
        sort: sortFromUrl || "createdAt",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res1 = await axios.get(`/api/listing/get?${searchQuery}`);
      const res = res1.data;
      if (res.length >= 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(res);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  const onShowMoreClick = async () => {
    const listingLength = listings.length;
    const startIndex = listingLength;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();
    const res1 = await axios.get(`api/listing/get?${searchQuery}`);
    const res = res1.data;
    if (res.length < 8) {
      setShowMore(false);
    }
    setListings([...listings, ...res]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/*takes up the entire height of the screen*/}
      {/* Search bar */}
      <div className="p-7 bg-slate-200 border-b-2 items-center justify-around sticky top-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-8 items-center">
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border p-3 rounded-lg w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-row gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-row gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3 onChange={handleChange}
                checked={sidebardata.furnished}"
              onChange={handleChange}
              defaultValue={"createAt_desc"}>
              <option value="regularPrize_desc">Price high to low</option>
              <option value="regularPrize_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white p-3 uppercase hover: opacity-95 rounded-lg flex-1 h-12 ">
            search
          </button>
        </form>
      </div>

      {/* Main content */}
      <div className="flex flex-row flex-1 overflow-hidden">
        {/*overflow-hidden: any content overflowing from this container will be hidden. */}
        <div className="relative flex-1 p-7">
          {/* relative : in the relative position of its parent */}
          <div className="absolute inset-0">
            {/* absolute:be in the absolute position of its parent, the key to be fixed while scrolling 
            not use fixed cuz "fixed" fix to the viewpoint, not container
            inset-0:take up all the space */}
            <div id="map" className="w-full min-h-screen"></div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-7">
          {/*overflow-auto:scrolling enabled */}
          <div className="flex flex-1 flex-wrap gap-4 justify-around">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            {showMore && (
              <button
                className="text-green-700 hover:underline p-7 text-center"
                onClick={onShowMoreClick}>
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
