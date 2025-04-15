import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  // Fetch connections from API
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
    //   console.log(res.data.data);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {connection && connection.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {connection.map((conn) => {
            const { id, firstName, lastName, about, skills, photoUrl } = conn;
            return (
              <div 
                key={id} 
                className="bg-base-100 rounded-3xl shadow p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg  hover:border-rose-200 border-1 border-transparent cursor-pointer"
              >
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 transition-transform duration-300 hover:scale-110"
                />
                <h2 className="text-xl font-semibold mb-2">{firstName} {lastName}</h2>
                {about && <p className="text-gray-600 text-sm mb-3">{about}</p>}
                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full transition-colors duration-300 hover:bg-purple-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-500">No connections found</h2>
        </div>
      )}
    </div>
  );
};

export default Connections;