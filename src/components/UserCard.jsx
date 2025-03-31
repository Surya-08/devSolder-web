import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ userCardData }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } =
    userCardData;
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInterest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        { status, _id },
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-3/12 shadow-sm flex justify-center my-3">
      {error && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}
      <figure>
        <img
          src={photoUrl}
          alt={firstName}
          className="rounded-2xl object-cover mt-2 h-80"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div>{about}</div>
        <div>
          {age} {gender}
        </div>
        <div>{skills}</div>
        <div className="card-actions justify-around">
          <button
            className="btn btn-secondary"
            onClick={() => handleInterest("ignored", _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleInterest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
