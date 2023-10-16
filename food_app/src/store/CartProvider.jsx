import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // addToUserCart(
    //   action.item.id,
    //   action.item.amount,
    //   action.item.price,
    //   action.item.name
    // );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

// // Function to add the item to the user's cart in the database
const addToUserCart = async (productId, quantity, price, name) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
      name: name,
      price: price,
    }),
  });
  // console.log(res);

  const data = await res.json();
  if (res.status == 200) {
    console.log("Item added to cart:", data);
    window.alert("Item added to cart");
  } else {
    console.error("Failed to add item to cart");
  }
};

const removeFromUserCart = async (productId) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log("Item removed from cart:", data);
      window.alert("Item removed from the cart");
    } else {
      console.error("Failed to remove item from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// In your component, dispatch the "REMOVE" action and call removeFromUserCart
// to remove the item from the database when the "REMOVE" button is pressed.

export default function CartProvider(props) {
  // -------------REDUCER --------------------
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemtoCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
    addToUserCart(item.id, item.amount, item.price, item.name);
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
    removeFromUserCart(id);
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
