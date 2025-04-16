import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4 sm:mt-6 md:mt-10 px-4">
      {feedData && feedData.length > 0 ? (
        <UserCard user={feedData[0]} />
      ) : (
        <div className="text-center py-16 sm:py-20 bg-base-200 rounded-3xl w-full max-w-md">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl text-gray-500">No more profiles</h2>
          <p className="text-gray-400 mt-2">Check back later for more connections</p>
        </div>
      )}
    </div>
  );
};

export default Feed;