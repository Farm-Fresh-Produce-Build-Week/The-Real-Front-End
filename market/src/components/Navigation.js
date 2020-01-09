import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  const logOut = e => {
    console.log("LOGOUT PRESSED!");
    localStorage.removeItem("token");
    localStorage.removeItem("user-token");
    localStorage.removeItem("farmer");
    localStorage.removeItem("user");
  };

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
          <NavLink to="/">
            <button onClick={() => logOut()}>Logout</button>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
