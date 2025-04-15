import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  // Initialize state with the user's current profile data
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "18");
  const [gender, setGender] = useState(user?.gender || "male");
  const [about, setAbout] = useState(user?.about || "");
  const dispatch = useDispatch();

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      // PATCH request to update profile
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log("Profile updated:", res?.data?.data);
      dispatch(addUser(res?.data?.data));
      // Show toast notification upon successful update
      toast.success("Profile updated successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("There was an error updating your profile.");
    }
  };

  return (
    <div className="card bg-info-content h-screen w-full md:max-w-xl shadow-xl p-6 rounded-3xl overflow-auto">
      <h2 className="card-title text-xl sm:text-2xl font-bold mb-4">
        Edit Profile
      </h2>
      <form onSubmit={handleSaveProfile}>
        {/* First Name */}
        <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered bg-white text-black w-full"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="form-control mt-4">
          <label className="label" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered bg-white text-black w-full"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div className="form-control mt-4">
          <label className="label" htmlFor="photoUrl">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered bg-white text-black w-full"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="form-control mt-4">
          <label className="label" htmlFor="age">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            className="input input-bordered bg-white text-black w-full"
            id="age"
            value={age}
            min="18"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Gender (Dropdown) */}
        <div className="form-control mt-4">
          <label className="label" htmlFor="gender">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select select-bordered bg-white text-black w-full"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>

        {/* About (Textarea) */}
        <div className="form-control mt-4">
          <label className="label" htmlFor="about">
            <span className="label-text">About</span>
          </label>
          <textarea
            className="textarea textarea-bordered bg-white text-black w-full"
            id="about"
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent-content rounded-lg w-full">
            Save Profile
          </button>
        </div>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
