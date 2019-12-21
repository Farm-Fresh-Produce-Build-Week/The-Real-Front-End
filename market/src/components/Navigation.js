import React from "react";
import { NavLink, Redirect } from "react-router-dom";

const Navigation = props => {
  const logOut = e => {
    // e.preventDefault();
    console.log("LOGOUT PRESSED!");
    localStorage.removeItem("token");
    // return <Redirect to="/" />;
    // props.history.push("/");
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
