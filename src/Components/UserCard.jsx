import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // If no user data, simply return null (preserving the original behavior)
  if (!user) return null;

  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = user;
  const skillsString = Array.isArray(skills) ? skills.join(", ") : skills;

  // Handle sending request (interested or ignore)
  const handleSendRequest = async (userId, status) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });

      // Remove user from feed after sending request
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(`Error sending ${status} request:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-inherit w-full max-w-sm shadow-lg border border-gray-700 rounded-3xl overflow-hidden relative">
      {/* Image that matches top right and left boundaries */}
      <div className="w-full relative">
        <div className="absolute inset-x-0 top-0 h-40 sm:h-52 rounded-t-3xl overflow-hidden">
          <img
            src={photoUrl}
            alt="profile-background"
            className="w-full h-full object-cover object-center opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
        <div className="relative pt-6 sm:pt-10 flex justify-center">
          <img
            src={photoUrl}
            alt="profile-pic"
            className="rounded-full object-cover h-36 w-36 sm:h-48 sm:w-48 border-4 border-gray-800 shadow-lg z-10"
          />
        </div>
      </div>
      
      <div className="card-body items-center text-center text-white p-4 sm:p-6 pt-0 sm:pt-0">
        <h2 className="card-title text-xl sm:text-2xl font-bold mt-3 sm:mt-4">
          {firstName} {lastName}
        </h2>
        <p className="text-xs sm:text-sm">
          {age} yrs{gender && ` (${gender})`}
        </p>
        <p className="my-1 sm:my-2 text-sm sm:text-base line-clamp-2">
          {about}
        </p>
        <p className="text-xs sm:text-sm italic">{skillsString}</p>
        <div className="card-actions mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 w-full">
          <button 
            className="btn btn-error text-white shadow-md hover:bg-gray-600 w-full sm:flex-1 transition-all duration-300"
            onClick={() => handleSendRequest(_id, 'ignored')}
            disabled={isLoading}
          >
            Ignore 💔
          </button>
          <button 
            className="btn btn-success text-white shadow-md hover:bg-teal-600 w-full sm:flex-1 transition-all duration-300"
            onClick={() => handleSendRequest(_id, 'interested')}
            disabled={isLoading}
          >
            Interested ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
