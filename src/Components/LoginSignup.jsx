import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginSignup = () => {
  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "male",
    photoUrl: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || `Something Went Wrong`);
      console.error("Error in Login Handler", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create the signup data object
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.email,
        password: formData.password,
        gender: formData.gender,
      };
      
      // Only add photoUrl to the request if it's not empty
      // This allows Mongoose to use the default value when photoUrl is not provided
      if (formData.photoUrl && formData.photoUrl.trim() !== "") {
        signupData.photoUrl = formData.photoUrl;
      }
      
      const res = await axios.post(
        BASE_URL + "/signup",
        signupData,
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || `Something Went Wrong`);
      console.error("Error in Signup Handler", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md bg-info-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl sm:text-2xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLogin}>
              <div className="form-control mt-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-accent-content rounded-lg w-full"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <p>
                  New User?{" "}
                  <span
                    className="text-blue-400 cursor-pointer hover:underline"
                    onClick={toggleForm}
                  >
                    Go for Signup
                  </span>
                </p>
              </div>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup}>
              <div className="form-control mt-4">
                <label className="label" htmlFor="firstName">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="lastName">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="gender">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="select select-bordered bg-white text-black w-full"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="photoUrl">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  id="photoUrl"
                  name="photoUrl"
                  type="text"
                  placeholder="Enter photo URL (optional)"
                  className="input input-bordered bg-white text-black w-full"
                  value={formData.photoUrl}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-accent-content rounded-lg w-full"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-4 text-center">
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-blue-400 cursor-pointer hover:underline"
                    onClick={toggleForm}
                  >
                    Back to Login
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;