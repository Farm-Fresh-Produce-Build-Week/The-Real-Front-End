import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";

import Footer from "./components/Footer"; 
import Navigation from "./components/Navigation";

function App() {
  return (
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
  );
}

export default App;
