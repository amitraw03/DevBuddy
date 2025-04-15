import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res?.data));
      navigate("/");
      
    } catch (error) {
      setError(error?.response?.data || `Something Went Wrong`)
      console.error("Error in Login Handler", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md bg-info-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl sm:text-2xl font-bold">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="form-control mt-4">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white text-black w-full"
                required
                value={email} // Controlled input
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
                
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered bg-white text-black w-full"
                required
                value={password} // Controlled input
                onChange={(e) => setPassword(e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;