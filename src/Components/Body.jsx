import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      // List of protected paths for which we want to force a login on 401
      const protectedPaths = ["/profile", "/connections", "/requests"];
      if (
        error.response &&
        error.response.status === 401 &&
        protectedPaths.includes(location.pathname)
      ) {
        // If on a protected route, redirect to login
        navigate("/login");
      }
      // Otherwise, log the error and leave userData as null
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mb-16 sm:mb-20 md:mb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
