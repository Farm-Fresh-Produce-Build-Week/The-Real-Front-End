import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { NavLink } from "react-router-dom";
import FarmItem from "./FarmItem";
import styled from "styled-components";
import blackberries from "../Images/Produce/blackberries.jpg";

const Cart = props => {
  const {
    cart,
    getUserCart,
    removeItem,
    clearCart,
    PurchaseOrder
  } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [isComplete, setIsComplete] = useState(false);
  console.log("Cart.js, user: ", user);
  console.log("Cart.js, cart: ", cart);

  useEffect(() => {
    getUserCart(user.id);
  }, []);

  const handlePurchase = cart => {
    PurchaseOrder(cart);
    clearCart();
  };

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
          {cart &&
            cart.map(item => (
              <div className={item.id}>
                <div className="FarmItem-Header">
                  <div className="image-wrapper">
                    {/* {item.produceImgURL !== undefined && (
                    <StyledImg
                      src={
                        item.produceImgURL
                          ? props.item.produceImgURL
                          : blackberries
                      }
                      alt="produce item"
                    />
                  )} */}
                  </div>
                  <div className="Item-Info">
                    <p>{item.name}</p>
                    <p>
                      ${item.price} per {item.increment}
                    </p>
                    <p>
                      Quantity: {item.quantity} {item.increment}
                    </p>
                    {/* <p>{item.description}</p> */}
                    <p>Provided by Farm# {item.farmer_id}</p>
                  </div>
                  <button onClick={() => removeItem(user.id, item.SKU)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          {/* This should be the list of items wanting to purchase,
                do we want an image/price. And do we need to build it out,
                in a single card and then map to show it? */}

          {/* <StyledImg src={props.item.produceImgURL ? props.item.produceImgURL : blackberries } alt="produce" /> */}
          {/* <h4> $ {props.item.price} </h4> */}
        </div>
        <div className="totals">
          <h3> Total: $ </h3>
          <button onClick={() => PurchaseOrder(cart)}>
            {" "}
            Purchase Produce{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

const StyledImg = styled.img`
  height: 100px;
`;
