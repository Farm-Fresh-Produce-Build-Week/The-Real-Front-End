import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

// Utils
import PrivateRoute from "./utils/PrivateRoute";
import { AxiosWithAuth } from "./utils/axiosWithAuth";

// Context
import { CartContext } from "./contexts/CartContext";
import { FarmItemsContext } from "./contexts/FarmItemsContext";
import { FarmerContext } from "./contexts/FarmerContext";
import { UserContext } from "./contexts/UserContext";

// Custom Hook
import useLocalStorage from "./hooks/useLocalStorage";

// Components
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import RegisterFarmer from "./components/RegisterFarmer";
import DashboardFarmer from "./components/DashboardFarmer";
import RegisterCustomer from "./components/RegisterCustomer";
import LoginFarmer from "./components/LoginFarmer";
import LoginCustomer from "./components/LoginCustomer";
import Landing from "./components/Landing";
import DashboardCustomer from "./components/DashboardCustomer";

// Styles
import "./App.css";

function App() {
  // farmer context
  const [farmer, setFarmer] = useState();

  // farm items context
  const [farmItems, setFarmItems] = useState();

  useEffect(() => {
    AxiosWithAuth()
      .get("/produce")
      .then(res => {
        console.log("App.js, GET PRODUCE RES: ", res);
        setFarmItems(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log("Apps.js, farmItems: ", farmItems);

  const [cart, setCart] = useLocalStorage("cart", []);

  return (
    <FarmerContext.Provider value={{ farmer }}>
      <FarmItemsContext.Provider value={{ farmItems, setFarmItems }}>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login-customer" component={LoginCustomer} />
          <Route
            exact
            path="/login-farmer"
            render={props => {
              return <LoginFarmer {...props} setFarmer={setFarmer} />;
            }}
          />
          <Route
            exact
            path="/register-farmer"
            render={props => {
              return <RegisterFarmer {...props} setFarmer={setFarmer} />;
            }}
          />
          <Route
            exact
            path="/register-customer"
            render={props => {
              return <RegisterCustomer {...props} />;
            }}
          />
          {/* <Route exact path="/farmer-register" /> */}
          <PrivateRoute
            exact
            path="/dashboard-customer"
            component={DashboardCustomer}
          />
          <PrivateRoute
            exact
            path="/dashboard-farmer"
            component={DashboardFarmer}
            farmer={farmer}
          />
          <PrivateRoute path="dashboard-customer/:id" />
          <PrivateRoute path="dashboard-farmer/:id" />
          <Footer />
        </div>
      </FarmItemsContext.Provider>
    </FarmerContext.Provider>
  );
}

export default App;
