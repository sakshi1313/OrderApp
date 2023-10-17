import React, { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const LogoutPage = async () => {
    try {
      console.log("Logout page");

      const res = await fetch("/api/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // cookie client se server me bhejne ke liye
      }); // backend se response milta h
      dispatch({ type: "USER", payload: false });

      navigate("/login");

      if (!res.status === 200) {
        // authentication failed
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LogoutPage();
  }, []);

  return (
    <div>
      <h1> Logout</h1>
    </div>
  );
};

export default Logout;
