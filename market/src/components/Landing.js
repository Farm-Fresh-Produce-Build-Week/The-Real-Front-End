import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LoginCustomer from "./LoginCustomer";
import LoginFarmer from "./LoginFarmer";
import RegisterFarmer from "./RegisterFarmer";
import RegisterCustomer from "./RegisterCustomer";

const Landing = props => {
  return (
    <div className="landing-container">
      <div className="login-container">
        <h2>Login to purchase local produce</h2>
        <NavLink to="/login-customer">
          <button>Login as Customer</button>
        </NavLink>
        <NavLink to="/register-customer">
          <button>Register as Customer</button>
        </NavLink>
      </div>
      <div className="login-container">
        <h2>Login as Farmer to manage inventory and view your orders</h2>
        <NavLink to="/login-farmer">
          <button>Login as Farmer</button>
        </NavLink>
        <NavLink to="/register-farmer">
          <button>Register as Farmer</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
