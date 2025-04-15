import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  console.log(userData);
  
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start p-8 bg-gray-900 min-h-screen text-white">
      {/* On small screens, show UserCard first */}
      <div className="order-first md:order-last flex items-center justify-center w-full">
        <UserCard user={userData} />
      </div>

      {/* Edit Profile component */}
      <div className="order-last md:order-first flex items-center justify-center w-full">
        <EditProfile user={userData} />
      </div>
    </div>
  );
};

export default Profile;
