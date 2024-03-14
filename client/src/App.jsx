import React, { Profiler } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function App() {
  //<Header /> put just under <BrowserRouter> so that the Header component shows in every pages
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
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
