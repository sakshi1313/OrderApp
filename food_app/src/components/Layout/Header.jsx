import React, { Fragment, useContext } from "react";
import foodimg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../../App";

export default function Header(props) {
  const { state, dispatch } = useContext(UserContext);
  if (state) {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1>Meals</h1>
          <nav>
            <ul className="nav_ul">
              <li className="nav_li">
                <HeaderCartButton onCartClick={props.onShowCart} />
              </li>

              <li className="nav_li">
                <NavLink to="/logout" className={classes.navbutton}>
                  <span className={classes.navicon}>🚪</span> Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className={classes["main-image"]}>
          <img src={foodimg} alt="food" />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1>Meals</h1>
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
        </header>
      </Fragment>
    );
  }
}
