import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "/api/auth/google",
        {
          // send the data directly as the second argument to axios.post
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          // specify headers separately from the data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //res is correct but the persist does not changed
      dispatch(signInSuccess(result));
      navigate("/");
    } catch (err) {
      console.log("could not sign in with google", err);
    }
  };
  return (
    //type="button", when clicked it, it will not submit the form
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg 
    uppercase hover:opacity-95">
      continue with google
    </button>
  );
}
