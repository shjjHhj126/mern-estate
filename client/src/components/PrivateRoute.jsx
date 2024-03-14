import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user); //get the state.user from store in redux
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
  //if user exists, go to child route(i.e. /profile in App.js, allowing access to the protected content), else go to sign-in page
}
