import React from "react";
import { NavLink, Redirect } from "react-router-dom";

import logo from "../icons/PNG/logo.svg";

const Navigation = props => {
  const logOut = e => {
    // e.preventDefault();
    console.log("LOGOUT PRESSED!");
    localStorage.removeItem("token");
    localStorage.removeItem("user-token");
    localStorage.removeItem("farmer");
    // return <Redirect to="/" />;
    // props.history.push("/");
  };

  return (
    <>
      {/* <div className="Navigation-Area">
        <h1> Fresh Finds Farmers Market</h1>
      </div> */}
      <nav>
        <div className= "logo">
            <h1 style={{ width: "200px", color: "#a85f1a" }}> Fresh Finds Farmers Market</h1>
            <img style={{ height: "100px", width: "70px" }} src={logo} alt="logo icon" />
        </div>
        <div className="nav-bar">
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
        </div>
      </nav>
    </>
  );
};

export default Navigation;
