import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; //useSelector to read data from the store, useDispatch to dispatch actions
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({}); //{}:initial value
  const { loading, error } = useSelector((state) => state.user); //(state) => state.user: set the initial state as initialState
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json", // Specify the Content-Type header
        },
        body: JSON.stringify(formData),
      });
      dispatch(signInSuccess(res.data));
      navigate("/"); //go to another page
    } catch (err) {
      //err.response.data.message:axios's way to get self-defined error structure in the backend(error handling middleware)
      dispatch(signInFailure(err.response.data.message));
    }
  };

  return (
    //mx-auto:center the element horizontally within its parent .
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}></input>
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ">
          {loading ? "Loading..." : "sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Donnot an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
