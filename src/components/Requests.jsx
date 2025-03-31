import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data.data));
    } catch (err) {
      setError(err.message);
    }
  };
  const handleRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        { status, _id },
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="text-center my-10 font-bold">No Requests received!!</div>
    );
  return (
    <div className="text-center">
      {error && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}
      <h1 className="my-3 font-bold bg-gradient-to-bl">Requests Received</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, about } = request.fromUserId;
        return (
          <div
            className="card mx-auto bg-base-300 w-1/2 flex flex-row"
            key={request._id}
          >
            <div className="card-body flex-row p-2">
              <img
                src={photoUrl}
                alt={firstName}
                className="align-center w-25 h-20 object-cover rounded-md"
              />

              <div className="mx-2 flex flex-col justify-items-start">
                <h3 className="card-title">{firstName + " " + lastName}</h3>
                <div className="">{about}</div>
              </div>
            </div>
            <div className="flex flex-row items-center ">
              <button
                className="btn btn-neutral mx-2"
                onClick={() => handleRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => handleRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
