import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Header onShowCart={showCartHandler} />} />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <SignUp />
            </div>
          }
        />
        <Route
          path="/menu"
          element={
            <div>
              <Header onShowCart={showCartHandler} />
              <Meals />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div>
              <Header onShowCart={showCartHandler} />
              cartIsShown ? <Cart onClose={hideCartHandler} /> : null
              <Meals />
            </div>
          }
        />
      </Routes>
      ;
    </CartProvider>
  );
}
export default App;
