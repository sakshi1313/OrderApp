import React, { Fragment } from "react";
import foodimg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onCartClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        {/* <img src={foodimg}></img> */}
        <img src={foodimg} alt="foood"></img>
      </div>
    </Fragment>
  );
}
