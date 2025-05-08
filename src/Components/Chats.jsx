import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoSend, IoArrowBack } from "react-icons/io5";

const Chats = () => {
  const { targetId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connection || []);

  // Hide global footer
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  const targetUser = connections.find(
    (conn) => conn?._id?.toString() === targetId?.toString()
  );

  if (!connections.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
        <div className="max-w-md w-full bg-base-100 rounded-box p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-error mb-4">User Not Found</h1>
          <button 
            onClick={() => navigate('/connections')}
            className="btn btn-primary w-full"
          >
            Return to Connections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-base-200">
      {/* Header */}
      <div className="flex items-center p-4 bg-base-100 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-circle hover:bg-base-200"
        >
          <IoArrowBack className="text-xl" />
        </button>
        <div className="flex items-center gap-3 ml-2 flex-1">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img 
                src={targetUser?.photoUrl || "/default-avatar.png"} 
                alt={targetUser.firstName}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {targetUser.firstName} {targetUser.lastName}
            </h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Example Messages - Replace with dynamic data */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={targetUser.photoUrl} alt="User" />
            </div>
          </div>
          <div className="chat-header text-sm opacity-75 mb-1">
            {targetUser.firstName}
            <time className="ml-2">09:41</time>
          </div>
          <div className="chat-bubble bg-base-100">Hi there!</div>
        </div>

        <div className="chat chat-end">
          <div className="chat-header text-sm opacity-75 mb-1">
            You
            <time className="ml-2">09:42</time>
          </div>
          <div className="chat-bubble bg-primary text-primary-content">
            Hello! 👋
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full bg-base-200 focus:outline-none"
          />
          <button className="btn btn-circle btn-primary">
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;