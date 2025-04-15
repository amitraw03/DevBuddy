import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store?.user || null);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="navbar bg-info-content shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevBuddy
          </Link>
        </div>

        {user && (
          <>
            {/* Desktop view */}
            <div className="hidden md:flex md:gap-2">
              <div className="my-auto -mr-4"> Welcome💗, {user?.firstName}</div>
              <div className="dropdown dropdown-end mx-8">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="profile-user" src={user.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile view - hamburger menu */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden bg-base-100 p-4 shadow-md absolute w-full z-20">
          <div className="text-center mb-2">Welcome💗, {user?.firstName}</div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img alt="profile-user" src={user.photoUrl} className="w-full h-full object-cover" />
            </div>
          </div>
          <ul className="menu menu-sm w-full">
            <li className="text-center">
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li className="text-center">
              <a>Settings</a>
            </li>
            <li className="text-center">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;