import React from "react";
import Theme from "./Theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div>
          <img
            src="https://img.freepik.com/premium-vector/digital-code-logo-system-logo-tech-creative-logo_669794-270.jpg"
            alt="logo"
            className="w-15 h-15 object-cover rounded-xl mx-5"
          />
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevSolder
          </Link>
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
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
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
