import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chats = () => {
  const { targetId } = useParams(); // to extract targetId from path
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const currId = currentUser?._id;
  const [messages, setMessages] = useState([]);  // display ongoing messages
  const [newMessage, setNewMessage] = useState("");
  const connections = useSelector((state) => state.connection ?? []);
  const socketRef = useRef(null);

  // 1) Fetch chat history
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/chat/${targetId}`,
          { withCredentials: true }
        );

        const initial = res?.data?.messages?.map((msg) => ({
          senderId: msg?.senderId?._id ?? msg?.senderId,
          text: msg?.text,
          // use mongoose auto-timestamp
          timestamp: msg?.createdAt,
        }));

        setMessages(initial ?? []);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchChatMessages();
  }, [targetId]);

  // 2) Real-time sockets
  useEffect(() => {
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { currId, targetId });

    socketRef.current.on("messageReceived", ({ senderId, text, createdAt }) => {
      if (senderId === currId) return; // ignore our own echoes
      setMessages((prev) => [
        ...prev,
        { senderId, text, timestamp: createdAt },
      ]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currId, targetId]);

  // Send new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const timestamp = new Date();

    // Optimistic render
    setMessages((prev) => [
      ...prev,
      { senderId: currId, text: newMessage, timestamp },
    ]);

    socketRef.current?.emit("sendMessage", {
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

  // Identify target user
  const targetUser = connections.find(
    (conn) => conn?._id?.toString() === targetId?.toString()
  );

  if (!connections.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <span className="loading loading-spinner text-primary" />
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
        <div className="max-w-md w-full bg-base-100 rounded-box p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-error mb-4">
            User Not Found
          </h1>
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
                src={targetUser?.photoUrl ?? "/default-avatar.png"}
                alt={targetUser?.firstName}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {targetUser?.firstName} {targetUser?.lastName}
            </h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => {
          const isSent = msg.senderId === currId;
          const userPhoto = isSent
            ? currentUser?.photoUrl
            : targetUser?.photoUrl ?? "/default-avatar.png";
          const displayName = isSent ? "You" : targetUser?.firstName;

          return (
            <div key={i} className={`chat ${isSent ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={userPhoto} alt={displayName} />
                </div>
              </div>
              <div className="chat-header">
                {displayName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  isSent ? "bg-primary text-primary-content" : "bg-base-100"
                }`}
              >
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">
                {isSent ? "Delivered" : "Seen"}
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
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
