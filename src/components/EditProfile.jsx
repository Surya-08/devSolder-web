import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    setError("");
    try {
      const response = axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about, skills },

        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response?.data));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 4000);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {alert && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Profile has been updated successfully</span>
          </div>
        </div>
      )}
      <div className="card bg-base-100 image-full shadow-xl flex justify-center w-96 my-3 mx-10">
        <figure>
          <img
            src="https://media.gettyimages.com/id/1145791509/vector/young-woman-playing-video-games-at-night.jpg?s=612x612&w=gi&k=20&c=_5_FbjKKE7uCWjNh2Nat49An36ovVFNESef0gOVBk0A="
            alt="developers"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <fieldset className="fieldset">
            <label className="form-control fieldset-label text-neutral-300">
              FirstName
            </label>
            <input
              type="text"
              className="input text-orange-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="fieldset-label text-neutral-300">LastName</label>
            <input
              type="text"
              className="input text-orange-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="fieldset-label text-neutral-300">Age</label>
            <input
              type="text"
              className="input text-orange-300"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="fieldset-label text-neutral-300">Gender</label>
            <input
              type="text"
              className="input text-orange-300"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <label className="fieldset-label text-neutral-300">Skills</label>
            <input
              type="text"
              className="input text-orange-300"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <label className="fieldset-label text-neutral-300">
              Profile Photo
            </label>
            <input
              type="text"
              className="input text-orange-300"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="fieldset-label text-neutral-300">About</label>
            <textarea
              className="textarea text-orange-300"
              placeholder="Bio"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          {error && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{error}</span>
            </div>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard
        userCardData={{
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        }}
      />
    </>
  );
};

export default EditProfile;
