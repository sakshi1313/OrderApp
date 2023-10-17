import React, { useEffect, useState } from "react";
import classes from "./CartItem.module.css";
export default function CartItem(props) {
  // const [itemPrice, setItemPrice] = useState(props.price * props.amount);

  // useEffect(() => {
  //   setItemPrice(props.price * props.amount);
  // }, [props.amount, props.price]);

  // const price1 = `$${itemPrice.toFixed(2)}`;
  const [localAmount, setLocalAmount] = useState(props.amount);

  const price = `$${props.price.toFixed(2)}`;

  const handleIncrement = () => {
    setLocalAmount(localAmount + 1);
    props.onAdd();
  };

  const handleDecrement = () => {
    if (localAmount > 1) {
      setLocalAmount(localAmount - 1);
      props.onRemove();
    }
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x{localAmount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        {/* <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button> */}
      </div>
    </li>
  );
}
