import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

// Utils
import PrivateRoute from "./utils/PrivateRoute";
import { AxiosWithAuth } from "./utils/AxiosWithAuth.js";

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

// Stles
import "./App.css";

function App() {
  // farm items context
  const [farmItems, setFarmItems] = useState([]);

  useEffect(() => {
    AxiosWithAuth().get();
  });

  const [cart, setCart] = useLocalStorage("cart", []);

  return (
    <FarmItemsContext.Provider value={{ farmItems, setFarmItems, addItem }}>
      <div className="App">
        <Navigation />
        <p>Test Code Here</p>
        <Route exact path="/" />
        <Route exact path="/login" />
        <Route exact path="/customer-signup" />
        <Route exact path="/farmer-signup" />
        <Route exact path="/dashboard" />
        <Route exact path="/farmer-dashboard" />
        <Route path="/:id" />
        <Footer />
      </div>
    </FarmItemsContext.Provider>
  );
}

export default App;
