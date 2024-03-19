import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logOutStart,
  logOutFailure,
  logOutSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";

// image/* : MIME type, .jpeg in MIME type is image/jpeg
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches("image/.*")

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]); //[file], an array of dependecies, everytime items in dependency array changes, it rerender again.

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; //unique file name
    const storageRef = ref(storage, fileName); //points to where to store
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadErr(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData({ ...formData, avatar: downloadURL });

        const res1 = await axios.post(`/api/user/update/${currentUser._id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = res1.data;
        if (res.success === false) {
          dispatch(updateUserFailure(res.message));
          return;
        }
        dispatch(updateUserSuccess(res));
        setUpdateSuccess(true);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res1 = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = res1.data;
      if (res.success === false) {
        dispatch(updateUserFailure(res.message));
        return;
      }
      dispatch(updateUserSuccess(res));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.response.data.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res1 = await axios.delete(`/api/user/delete/${currentUser._id}`);
      const res = res1.data;
      if (res.success === false) {
        dispatch(deleteUserFailure(res.message));
        return;
      }
      dispatch(deleteUserSuccess(res));
    } catch (err) {
      // console.log(err);
      dispatch(deleteUserFailure(err.response.data.message));
    }
  };
  const handleLogOut = async () => {
    try {
      dispatch(logOutStart());
      const res1 = await axios.get("/api/auth/logout");
      const res = res1.data;

      console.log(res);
      if (res.success === false) {
        dispatch(logOutFailure(res.message));
        return;
      }
      dispatch(logOutSuccess(res));
    } catch (err) {
      dispatch(logOutFailure(err.response.data.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      console.log(currentUser);
      const res1 = await axios.get(`/api/user/listings/${currentUser._id}`);
      const res = res1.data;
      if (res.success === false) {
        setShowListingsError(true);
        return;
      }
      setListings(res);
    } catch (err) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res1 = await axios.delete(`/api/listing/delete/${listingId}`);
      const res = res1.data;
      if (res.success === false) {
        console.log(res.message);
        return;
      }
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      ); //!
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"></img>
        <p className="text-sm self-center">
          {fileUploadErr ? (
            <span className="text-red-700">
              Error Image Upload (image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}></input>
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 p-3 text-white rounded-lg text-center uppercase"
          to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleLogOut} className="text-red-700 cursor-pointer">
          Log out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full ">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {listings && listings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {listings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="border p-3 rounded-lg flex justify-between items-center gap-4">
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="w-16 h-16 object-contain"></img>
                </Link>
                <Link
                  className=" text-slate-700 font-semibold hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}>
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase">
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
// flex-col:put them vertically
// for text : text-center, for img: self-center
// mx-auto:margin-right: auto; margin-left: auto; i.e. to be in center

// onClick={() => handleListingDelete(listing.id)}, this arrow function is
// used to invoke handleListingDelete(listing.id), so it doesn't take any arguments explicitly.
