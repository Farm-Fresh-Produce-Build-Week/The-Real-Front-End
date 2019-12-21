import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="Navigation-Area">
        <h1> Fresh Finds Farmers Market</h1>
      </div>
      <div className="nav-bar">
        <nav>
          <NavLink to="/">
            <button>Home</button>
          </NavLink>
          <NavLink to="#">
            <button>Contact</button>
          </NavLink>
          <NavLink to="#">
            <button>About Us</button>
          </NavLink>
          <NavLink to="/">
            <button>Sign Up</button>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
