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
import FarmerLandingPage from "./components/FarmerLandingPage";
import RegisterCustomer from "./components/RegisterCustomer";

// Styles
import "./App.css";

function App() {
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

  console.log(farmItems);

  const [cart, setCart] = useLocalStorage("cart", []);

  return (
    <FarmItemsContext.Provider value={{ farmItems, setFarmItems }}>
      <div className="App">
        <Navigation />
        <Route exact path="/" />
        <Route exact path="/login" />
        <Route
          exact
          path="/register-farmer"
          render={props => {
            return <RegisterFarmer {...props} />;
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
        <Route exact path="/dashboard" />
        <Route exact path="/farmer-dashboard" component={FarmerLandingPage} />
        <Route path="/:id" />
        <Footer />
      </div>
    </FarmItemsContext.Provider>
  );
}

export default App;
