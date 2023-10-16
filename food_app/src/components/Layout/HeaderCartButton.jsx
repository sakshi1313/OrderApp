import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { Link } from "react-router-dom";

const HeaderCartButton = (props) => {
  const [pressed, setPressed] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${pressed ? classes.bump : ""}`;

  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setPressed(true);

    const timer = setTimeout(() => {
      setPressed(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    //   <button className={btnClasses} onClick={props.onCartClick}>
    //     <span className={classes.icon}>
    //       <CartIcon />
    //     </span>
    //     <span>Your Cart</span>
    //     <span className={classes.badge}>{numberOfItems}</span>
    //   </button>
    // );
    <Link to="/cart">
      {" "}
      {/* Use Link component with the "to" attribute */}
      <button className={btnClasses}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItems}</span>
      </button>
    </Link>
  );
};

export default HeaderCartButton;
