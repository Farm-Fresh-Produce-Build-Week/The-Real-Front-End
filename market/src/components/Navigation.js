import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Navigation = props => {
  const { clearCart } = useContext(CartContext);

  const logOut = e => {
    console.log("LOGOUT PRESSED!");
    localStorage.removeItem("token");
    localStorage.removeItem("user-token");
    localStorage.removeItem("farmer");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    clearCart();
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
