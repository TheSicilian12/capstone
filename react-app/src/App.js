import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SingleProduct from "./components/SingleProduct";
import ProductForm from "./components/ProductForm";
import EditProductForm from "./components/ProductForm/editProductWrapper";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
            <ProductForm />
          </Route>
          <Route path="/products/:productId/edit" exact>
            <EditProductForm />
          </Route>
          <Route path="/products/:productId" exact>
            <SingleProduct />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
