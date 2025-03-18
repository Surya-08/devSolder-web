import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Feed from "./Feed";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const fetchUserDetails = async () => {
    if (user) {
      return;
    }
    try {
      const result = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
      throw new Error("ERROR " + err.message);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
