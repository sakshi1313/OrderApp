import { useState, createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Logout from "./components/User/Logout";
import Navbar from "./components/Layout/Navbar";

import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Header onShowCart={showCartHandler} />} />
            <Route
              path="/login"
              element={
                <>
                  <Header onShowCart={showCartHandler} />
                  <Login />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header onShowCart={showCartHandler} />
                  <SignUp />
                </>
              }
            />
            <Route
              path="/menu"
              element={
                <>
                  <Header onShowCart={showCartHandler} />
                  <Meals />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Header onShowCart={showCartHandler} />
                  cartIsShown ? <Cart onClose={hideCartHandler} /> : null
                  <Meals />
                </>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </CartProvider>
      </UserContext.Provider>
    </div>
  );
}
export default App;
