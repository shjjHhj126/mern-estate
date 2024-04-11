import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// {listing}:select listing from props
export default function Contact({ listing, contact, setContact }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res1 = await axios.get(`/api/user/${listing.userRef}`);
        const res = res1.data;
        setLandlord(res);
        setContact(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2 p-5 m-5">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Enter your message here..."
            className="w-full border rounded-lg p-3"
            onChange={onChange}></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Estate Marketplace Website regarding ${listing.name}&body=${message}`}
            className=" bg-slate-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
