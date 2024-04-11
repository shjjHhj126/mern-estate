import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Header from "./components/Header";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "https://mern-estate-pce3.onrender.com";

axios.defaults.withCredentials = true;

export default function App() {
  //<Header /> put just under <BrowserRouter> so that the Header component shows in every pages
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
//path in <Route>:When the current URL matches the specified path pattern, the associated component specified in the element prop will be rendered.

// <Route element={<PrivateRoute />}>
//   <Route path="/profile" element={<Profile />} />
// </Route>
// The PrivateRoute component is used to protect the /profile route
// When the root path is accessed, it determines whether to render the child routes based on the authentication status.
