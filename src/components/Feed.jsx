import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeedDetails = async () => {
    try {
      if (feed) {
        return;
      }
      const feedData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(getFeed(feedData?.data?.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedDetails();
  }, []);

  return (
    feed && (
      <div className="flex justify-center">
        <UserCard userCardData={feed} />
      </div>
    )
  );
};

export default Feed;
