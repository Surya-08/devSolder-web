import React from "react";
import Theme from "./Theme";
import { useSelector } from "react-redux";

const NavBar = () => {
  const userData = useSelector((store) => store.user);

  return (
    <div>
      <div className="navbar bg-base-800 shadow-sm">
        <div>
          <img
            src="https://img.freepik.com/premium-vector/digital-code-logo-system-logo-tech-creative-logo_669794-270.jpg"
            alt="logo"
            className="w-15 h-15 object-cover rounded-xl mx-5"
          />
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevSolder</a>
        </div>
        {userData && (
          <div className="flex gap-2">
            <Theme />
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
            <div className="mx-2 flex items-center">
              <p>Welcome! {userData.firstName}</p>
            </div>
            <div className="dropdown dropdown-end mx-6">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={userData.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
