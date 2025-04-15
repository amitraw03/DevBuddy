import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending requests from API
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/requests-pending`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle request response (accept/reject)
  const handleRequestResponse = async (requestId, action) => {
    try {
      await axios.post(`${BASE_URL}/request/respond/${action}/${requestId}`, {}, {
        withCredentials: true,
      });
      // Refresh requests after responding
      fetchRequests();
    } catch (error) {
      console.error(`Error ${action} request:`, error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold font-serif  mb-6 text-center rounded-4xl">Connection Requests</h1>
      
      {requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {requests.map((request) => {
            const { _id, fromUserId,  createdAt } = request;
            const { firstName, lastName, about, photoUrl, age, gender, skills } = fromUserId;
            
            // Format date
            const requestDate = new Date(createdAt).toLocaleDateString();
            
            return (
              <div
                key={_id}
                className="bg-base-200 rounded-3xl shadow p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
                  {/* Photo with responsive sizing */}
                  <div className="flex-shrink-0">
                    <img
                      src={photoUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  
                  {/* User Info with better spacing and responsive text */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold">{firstName} {lastName}</h2>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      {age} yrs, {gender}
                    </div>
                    {about && (
                      <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 sm:line-clamp-3">
                        {about}
                      </p>
                    )}
                    
                    {/* Skills with responsive design */}
                    {skills && skills.length > 0 && (
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2">
                        {skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full transition-colors duration-300 hover:bg-purple-500"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 3 && (
                          <span className="text-xs text-gray-500">+{skills.length - 3} more</span>
                        )}
                      </div>
                    )}
                    
                    {/* Request date */}
                    <div className="text-xs text-gray-400 mt-2">
                      Requested on: {requestDate}
                    </div>
                  </div>
                </div>
                
                {/* Action buttons with improved mobile layout */}
                <div className="flex justify-center gap-3 mt-4">
                  <button 
                    onClick={() => handleRequestResponse(_id, 'accepted')}
                    className="btn btn-sm btn-success flex-1 sm:flex-none max-w-28"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleRequestResponse(_id, 'rejected')}
                    className="btn btn-sm btn-error flex-1 sm:flex-none max-w-28"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20 bg-base-200 rounded-3xl">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-xl sm:text-2xl text-gray-500">No pending requests</h2>
          <p className="text-gray-400 mt-2">When someone sends you a connection request, it will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Requests;