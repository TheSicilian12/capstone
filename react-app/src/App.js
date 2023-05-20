import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SingleProduct from "./components/SingleProduct";
import ProductForm from "./components/ProductForm";
import EditProductForm from "./components/ProductForm/editProductWrapper";
import AllCarts from "./components/AllCarts";
import SingleCart from "./components/SingleCart";
import { getItemsSingleCartTHUNK, getSingleCartTHUNK } from "./store/cart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector(state => state.session.user)
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getSingleCartTHUNK(1))
  }, [dispatch]);


  console.log("---------------------user: ", user)
  console.log("---------------------cart: ", cart)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" exact>
            <LoginFormPage />
          </Route>
          <Route path="/signup" exact>
            <SignupFormPage />
          </Route>
          <Route path="/homepage" exact>
            <HomePage />
          </Route>
          <Route path="/products/new" exact>
            <ProductForm formType={"new"}/>
          </Route>
          <Route path="/products/:productId/edit" exact>
            <EditProductForm />
          </Route>
          <Route path="/products/:productId" exact>
            <SingleProduct />
          </Route>
          <Route path="/carts" exact>
            <AllCarts />
          </Route>
          <Route path="/carts/:cartId" exact>
            <SingleCart />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
