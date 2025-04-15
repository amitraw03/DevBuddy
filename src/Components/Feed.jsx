import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center mt-4 sm:mt-6 md:mt-10 px-4">
      {feedData && feedData.length > 0 && <UserCard user={feedData[0]} />}
    </div>
  );
};

export default Feed;