import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const getConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <div>No connections Found!!</div>;

  return (
    <div className="text-center">
      {error && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}
      <h1 className="my-3 font-bold bg-gradient-to-bl">My Soldered Devs!!!</h1>
      <div className="carousel carousel-center rounded-box my-5">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            about,
            skills,
            photoUrl,
          } = connection;
          return (
            <div
              className="carousel-item join join-vertical mx-5 bg-base-300 p-2 rounded-xl"
              key={_id}
            >
              <img
                src={photoUrl}
                alt={firstName}
                className="align-center w-60 h-60 object-cover"
              />
              <div className="card-body join join-vertical text-start">
                <div>{firstName + " " + lastName}</div>
                <div>{age + ", " + gender}</div>
                <div className="flex flex-wrap">
                  {skills.join(", ").toUpperCase()}
                </div>
                <div className="flex flex-wrap w-60">{about}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
