import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const userData = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if(userData) return; // if already data in redux store , no need for API calling
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401){  // if token expired or loggedOut
        return navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchUser();
  },[])

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