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
import { OrdersContext } from "./contexts/OrdersContext";

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
import Store from "./components/Store";
import FarmCard from "./components/FarmCard"; 

// Styles
import "./App.css";

function App() {
  // farmer context
  const [farmer, setFarmer] = useLocalStorage("farmer", []);

  const setCurrentFarmer = farmer => {
    setFarmer(farmer);
  };

  // user context
  const [user, setUser] = useLocalStorage("user", []);

  const setCurrentUser = user => {
    setFarmer(user);
  };

  // farm items context
  const [farmItems, setFarmItems] = useState();
  // const [farmItems, setFarmItems] = useLocalStorage("items", []);

  // const setFarmItems = items => {
  //   setFarmItems(items);
  // }

  useEffect(() => {
    AxiosWithAuth()
      .get("/produce")
      .then(res => {
        console.log("App.js, GET PRODUCE RES: ", res);
        setFarmItems(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log("App.js, farmItems: ", farmItems);

  // cart context
  const [cart, setCart] = useLocalStorage("cart", []);

  const addToCart = item => {
    // add the given item to the cart
    console.log("dw: App.js: addItem: item: ", item);
    setCart([...cart, item]);
    console.log("dw: App.js: addItem: cart: ", cart);
  };

  const removeItem = item => {
    setCart(cart.filter(i => i.id !== item));
    console.log("dw: App.js: removeItem: cart: ", cart);
  };

  // new order context
  const [orders, setOrders] = useLocalStorage("orders", []);

  const PurchaseOrder = order => {
    setOrders([...orders, order]);
  };

  return (
    <FarmerContext.Provider value={{ farmer, setCurrentFarmer }}>
      <FarmItemsContext.Provider value={{ farmItems, setFarmItems, addToCart }}>
        <UserContext.Provider value={{ user, setCurrentUser }}>
          <CartContext.Provider value={{ cart, removeItem, PurchaseOrder }}>
            <OrdersContext.Provider value={{ orders }}>
              <div className="App">
                <Navigation />
                <Route exact path="/" component={Landing} />
                
                {/* <Route exact path="/login-customer" component={LoginCustomer} /> */}

                <Route exact path="/login-customer" render={props => {
                  return(
                    <LoginCustomer
                    {...props}
                    setCurrentUser={setCurrentUser}
                    />
                  );
                }}
                />

                <Route
                  exact
                  path="/login-farmer"
                  render={props => {
                    return (
                      <LoginFarmer
                        {...props}
                        setCurrentFarmer={setCurrentFarmer}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path="/register-farmer"
                  render={props => {
                    return (
                      <RegisterFarmer
                        {...props}
                        setCurrentFarmer={setCurrentFarmer}
                      />
                    );
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
                <PrivateRoute path="/shopping" component={Store} />
                <PrivateRoute path="/farm" component={FarmCard} />
                <Footer />
              </div>
            </OrdersContext.Provider>
          </CartContext.Provider>
        </UserContext.Provider>
      </FarmItemsContext.Provider>
    </FarmerContext.Provider>
  );
}

export default App;
