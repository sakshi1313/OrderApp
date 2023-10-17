import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navbar(props) {
  return (
    <Fragment>
      <nav>
        <ul className="nav_ul">
          <li className="nav_li">
            <NavLink to="/login" className={classes.navbutton}>
              <span className={classes.navicon}>🔑</span> Login
            </NavLink>
          </li>
          <li className="nav_li">
            <NavLink to="/signup" className={classes.navbutton}>
              <span className={classes.navicon}>📝</span> Signup
            </NavLink>
          </li>
          <li className="nav_li">
            <NavLink to="/logout" className={classes.navbutton}>
              <span className={classes.navicon}>🚪</span> Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}
