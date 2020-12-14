import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/CustomerDashboard";
import VerifyAccount from "./Components/VerifyAccount";
import CustomerDashboard from "./Components/CustomerDashboard";
import MerchantDashboard from "./Components/MerchantDashboard";
import AddCategory from "./Components/manage_category/AddCategory";
import ViewCategory from "./Components/manage_category/ViewCategory";
import AddFood from "./Components/manage_food/AddFood";
import ViewFood from "./Components/manage_food/ViewFood";
import FoodMenu from "./Components/menu_card/FoodMenu";

function MainRouter() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={CustomerDashboard} />
          <Route exact path="/user-reg/:email" component={VerifyAccount} />
          <Route exact path="/addCategory" component={AddCategory} />
          <Route exact path="/viewCategory" component={ViewCategory} />
          <Route exact path="/addFood" component={AddFood} />
          <Route exact path="/viewFood" component={ViewFood} />
          <Route exact path="/menu" component={FoodMenu} />

          <Route
            exact
            path="/merchantDashboard"
            component={MerchantDashboard}
          />
          <Route exact path="/customer" component={CustomerDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default MainRouter;
