import { useContext, useState, useEffect } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Cart(props) {
  const navigateTo = useNavigate();
  const cartCtx = useContext(CartContext);

  const [UserCartItems, userSetCartItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  // const updateTotalAmount = async () => {
  //   // TODO: // correct the total amoutn
  //   let total = 0;
  //   UserCartItems.forEach((item) => {
  //     total += item.amount * item.price;
  //     console.log(item.amount);
  //   });
  //   console.log("amounttttttttt:");
  //   console.log(amount);
  //   setAmount(total.toFixed(2));
  // };
  // ------------------------------------------------------------------
  useEffect(() => {
    console.log("Running useeffect");
    async function fetchUserCartData() {
      try {
        const response = await fetch("/api/user/cart");
        if (response.ok) {
          const data = await response.json();
          userSetCartItems(data.cartItems);
          setAmount(data.totalAmount.toFixed(2));

          // updateTotalAmount();
          console.log("From cart.jsxxxxxxxxxxxxxxxxxxx");
          console.log(data.cartItems);
        } else {
          console.error("Failed to fetch user's cart data");
        }
      } catch (error) {
        console.error("Error fetching user's cart data:", error);
      }
    }

    fetchUserCartData();
  }, [buttonClicked]);

  // ------------------------------------------------------------

  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
    setButtonClicked(!buttonClicked);
    // updateTotalAmount();
  };

  const cartItemAddHandler = async (item) => {
    cartCtx.addItem({ ...item, amount: 1 }); // updating the context
    setButtonClicked(!buttonClicked);
    // updateTotalAmount();
  };

  // const cartItems = (
  //   <ul className={classes["cart-items"]}>
  //     {cartCtx.items.map((item) => (
  //       <CartItem
  //         key={item.id}
  //         name={item.name}
  //         amount={item.amount}
  //         price={item.price}
  //         onAdd={cartItemAddHandler.bind(null, item)}
  //         onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //       />
  //     ))}
  //   </ul>
  // );

  const cartItemsList = (
    <ul className={classes["cart-items"]}>
      {UserCartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${amount}`;

  const closeCartAndNavigateToMeals = () => {
    props.onClose();
    navigateTo("/menu");
  };
  return (
    <Modal onClose={closeCartAndNavigateToMeals}>
      {/* {cartItems} */}
      {cartItemsList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={closeCartAndNavigateToMeals}
        >
          Close
        </button>
        {UserCartItems.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
}
