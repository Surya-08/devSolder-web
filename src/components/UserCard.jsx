import React from "react";

const UserCard = ({ userCardData }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    userCardData;

  return (
    <div className="card bg-base-300 w-3/12 shadow-sm flex justify-center my-3">
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
          <button className="btn btn-secondary">Ignored</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
