import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { NavLink } from "react-router-dom";
import blackberries from "../Images/Produce/blackberries.jpg";

const Cart = props => {
  const { cart } = useContext(CartContext);
  return (
    <>
      <div className="Cart-Page">
        <NavLink to="/dashboard-customer">
          <button> Dashboard </button>
        </NavLink>
        <NavLink to="/shopping">
          <button> Store </button>
        </NavLink>
        <div className="top-section">
          <h2>Your Cart: </h2>
        </div>
        <div className="want-to-purchase">
          {/* This should be the list of items wanting to purchase,
                do we want an image/price. And do we need to build it out,
                in a single card and then map to show it? */}

          {/* <StyledImg src={props.item.produceImgURL ? props.item.produceImgURL : blackberries } alt="produce" /> */}
          {/* <h4> $ {props.item.price} </h4> */}
        </div>
        <div className="totals">
          <h3> Total: $ </h3>
          <button> Purchase Produce </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
