import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store?.user || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear state and redirect
      dispatch(removeUser());
      window.location.href = "/login";
  
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="navbar bg-info-content shadow-sm">
        {/* Logo - Left Side */}
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl italic hover:bg-transparent active:bg-transparent focus:bg-transparent"
          >
            DevBuddy
          </Link>
        </div>

        {/* Middle Section - Only for logged-in users */}
        {user && (
          <div className="flex justify-center flex-1 gap-2">
            <Link
              to="/connections"
              className="btn btn-neutral btn-sm rounded-2xl sm:btn-md"
            >
              <span className="hidden sm:inline">Connections</span>
              <div className="badge badge-sm badge-primary ml-1">👤</div>
            </Link>

            <Link
              to="/requests"
              className="btn btn-neutral btn-sm rounded-2xl sm:btn-md"
            >
              <span className="hidden sm:inline">Requests</span>
              <div className="badge badge-sm badge-primary ml-1">✉️</div>
            </Link>
          </div>
        )}

        {/* Right Section - Always present */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <>
              {/* Desktop view */}
              <div className="hidden md:flex md:items-center md:gap-2">
                <div className="my-auto mr-2">Welcome💗, {user?.firstName}</div>
                <div className="dropdown dropdown-end">
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
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout}>Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile view - hamburger menu */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            // Login Button for both desktop and mobile
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden bg-base-100 p-4 shadow-md absolute w-full z-20">
          <div className="text-center mb-2">Welcome💗, {user?.firstName}</div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                alt="profile-user"
                src={user.photoUrl}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ul className="menu menu-sm w-full">
            <li className="text-center">
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
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
