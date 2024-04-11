import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { logInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res1 = await axios.post(
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
      const res = res1.data;
      dispatch(logInSuccess(res)); //store the info in persist
      navigate("/");
    } catch (err) {
      console.log("could not sign in with google", err);
    }
  };
  return (
    //type="button", when clicked it, it will not submit the form

    <button
      type="button"
      onClick={handleGoogleClick}
      className="border border-spacing-0 border-blue-500 text-blue-500 p-3 rounded-lg 
  uppercase hover:opacity-95 flex items-center justify-center gap-4">
      <FcGoogle className="text-3xl" />
      continue with google
    </button>
  );
}
