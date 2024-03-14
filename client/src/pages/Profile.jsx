import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"></img>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"></input>
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"></input>
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"></input>
        <button class="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span class="text-red-700 cursor-pointer">Delete account</span>
        <span class="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
// flex-col:put them vertically
// for text : text-center, for img: self-center
// mx-auto:margin-right: auto; margin-left: auto; i.e. to be in center
