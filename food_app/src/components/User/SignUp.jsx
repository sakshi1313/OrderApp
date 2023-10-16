import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    // console.log(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    console.log(user);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 400 || !data) {
      window.alert("Error");
      console.log("Error");
    } else {
      console.log(data);
      window.alert("Registeration Succesfull");
      console.log("SUccess");
      navigate("/login"); // ye client side wla h
    }
  };

  return (
    <div>
      <section className={classes.section}>
        <div>
          <div>
            <div>
              <h2 className={classes.h2}>SignUp</h2>
              <form method="POST" className={classes.form}>
                <div>
                  <label htmlFor="name">
                    <i></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                    className={classes.input}
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    <i></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your email"
                    className={classes.input}
                  />
                </div>

                <div>
                  <label htmlFor="phone">
                    <i></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your phone"
                    className={classes.input}
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
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your password"
                    className={classes.input}
                  />
                </div>

                <div>
                  <label htmlFor="cpassword">
                    <i></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Password"
                    className={classes.input}
                  />
                </div>

                <div>
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    value="register"
                    onClick={PostData}
                    className={classes.submit}
                  />
                </div>
                <NavLink to="/login">I am already registered </NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignUp;
