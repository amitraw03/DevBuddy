import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { createSocketConnection } from "../utils/socket";

const Chats = () => {
  const { targetId } = useParams(); // to extract targetId from path
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const currId = currentUser?._id;
  const [messages, setMessages] = useState([]);  // this state var to display ongoing messages
  const [newMessage, setNewMessage] = useState("");
  const connections = useSelector((state) => state.connection || []);

  useEffect(() => {
    const socket = createSocketConnection(); // create connection once the page loads & emit the joinChat event
    socket.emit("joinChat", { currId, targetId });
    
    // handling the incoming msgs & display it on screen
    socket.on("messageReceived", ({ senderId, text, timestamp }) => {
      if (senderId === currId) return; // Ignore our own messages
      setMessages(prev => [...prev, { senderId, text, timestamp }]);
    });

    return () => socket.disconnect();  //remove connection
  }, [currId, targetId]);
  
  // Functn to append the input tag msges with ongoing msges
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    const timestamp = new Date();
    
    // // handling the sending msgs & display it on screen
    setMessages(prev => [...prev, {
      senderId: currId,
      text: newMessage,
      timestamp
    }]);
    
    //emit the sendMessage event
    socket.emit("sendMessage", {
      currId,
      targetId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // Hide global footer
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);



  //find targetUser info from all connections
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
            onClick={() => navigate("/connections")}
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
        {messages.map((msg, index) => {
          //making details dynamic on basis of isSent
          const isSent = msg.senderId === currId;  
          const userPhoto = isSent 
            ? currentUser?.photoUrl 
            : targetUser?.photoUrl || "/default-avatar.png";
          const displayName = isSent ? "You" : targetUser?.firstName;

          return (
            //isSent --> true ? right side : left side
            <div key={index} className={`chat ${isSent ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={userPhoto} alt={displayName} />
                </div>
              </div>
              <div className="chat-header">
                {displayName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </time>
              </div>
              <div className={`chat-bubble ${isSent ? 'bg-primary text-primary-content' : 'bg-base-100'}`}>
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">
                {isSent ? 'Delivered' : 'Seen'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4">
        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full bg-base-200 focus:outline-none"
          />
          <button onClick={sendMessage} className="btn btn-circle btn-primary">
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;