import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import Card from "../UI/Card";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("LOgin successful");
      console.log("sucess login");
      navigate("/menu");
    }
  };

  return (
    <div className={classes["login-container"]}>
      <section className={classes["login-card"]}>
        <div>
          <div>
            <div>
              <h2>Login</h2>
              <form method="POST" id="register-form">
                <div>
                  <label htmlFor="email">
                    <i></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label htmlFor="password">
                    <i></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    className="form-submit"
                    value="login"
                    onClick={loginUser}
                  />
                </div>
                <NavLink to="/signup" className="signup-image-link">
                  New? Signup{" "}
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
