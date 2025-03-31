import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const responseData = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(responseData.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
    }
  };

  const handleSignUp = async () => {
    try {
      const responseData = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(responseData.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="card bg-base-100 image-full shadow-sm justify-center my-6 scroll-auto rounded-lg">
      <figure>
        <img
          src="data:image/jpeg;base64,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"
          alt="developers"
        />
      </figure>
      <div className="card-body items-center gap-0 p-2">
        <h2 className="card-title justify-center">
          {isLoginUser ? "Login" : "SignUp"}
        </h2>
        {!isLoginUser && (
          <>
            <fieldset className="fieldset gap-0 p-0 ">
              <legend className="fieldset-legend text-neutral-300">
                FirstName
              </legend>
              <input
                type="text"
                className="input text-orange-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <legend className="fieldset-legend text-neutral-300">
                LastName
              </legend>
              <input
                type="text"
                className="input text-orange-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </>
        )}
        <fieldset className="fieldset items-center">
          <legend className="fieldset-legend text-neutral-300">EmailID</legend>
          <input
            type="text"
            className="input text-orange-300"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <legend className="fieldset-legend text-neutral-300">Password</legend>
          <input
            type="text"
            className="input text-orange-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <p className="text-error">{error}</p>
        <div className="card-actions flex-col items-center">
          <div
            className="flex justify-center"
            onClick={() => setIsLoginUser((value) => !value)}
          >
            {isLoginUser
              ? "New User? Please sign up"
              : "Existing User? Login Here"}
          </div>
          <button
            className="btn btn-primary"
            onClick={isLoginUser ? handleLogin : handleSignUp}
          >
            {isLoginUser ? "Login" : "SignUp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
