<CartProvider>
  <Header onShowCart={showCartHandler} />
  {cartIsShown && <Cart onClose={hideCartHandler} />}
  <main>
    <Meals />
  </main>
</CartProvider>;

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
        cartIsShown ? <Cart onClose={hideCartHandler} /> : null
        <Header onShowCart={showCartHandler} />
      </div>
    }
  />
</Routes>;
