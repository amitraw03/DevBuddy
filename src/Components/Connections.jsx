import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch connections from API
  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Render connection cards when connections exist
  const renderConnectionCards = () => {
    return (
      <div className="space-y-6">
        {connection.map((conn) => {
          const { _id, firstName, lastName, about, skills, photoUrl } = conn;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-base-100 rounded-2xl shadow p-6 border border-transparent hover:border-rose-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Info Section */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>
                {about && <p className="text-gray-500 text-sm mt-1">{about}</p>}
                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-purple-600 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Button */}
              <div className="sm:ml-auto">
                <Link
                  to={`/chat/${_id}`}
                  className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-blue-600 shadow-md transition duration-300"
                  title="Chat"
                >
                  💬
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render empty state with simpler UI similar to Requests component
  const renderEmptyState = () => {
    return (
      <div className="text-center py-16 sm:py-20 bg-base-200 rounded-3xl">
        <div className="text-5xl mb-4">👥</div>
        <h2 className="text-xl sm:text-2xl text-gray-500">
          No connections found
        </h2>
        <p className="text-gray-400 mt-2">
          Connect with people to grow your professional network
        </p>
        <Link to="/">
          <button className="btn btn-primary mt-6">Find People</button>
        </Link>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {connection && connection.length > 0
        ? renderConnectionCards()
        : renderEmptyState()}
    </div>
  );
};

export default Connections;
