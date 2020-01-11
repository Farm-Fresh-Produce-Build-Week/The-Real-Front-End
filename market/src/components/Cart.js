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
  const [refresh, setRefresh] = useState(false);
  console.log("Cart.js, user: ", user);
  console.log("Cart.js, cart: ", cart);

  useEffect(() => {
    getUserCart(user.id);
    setIsComplete(false);
  }, [refresh]);

  const handlePurchase = cart => {
    console.log("Cart.js, handlePurchase(), cart: ", cart);
    PurchaseOrder(cart);
    clearCart();
    setIsComplete(true);
  };

  const handleDelete = (id, SKU) => {
    // e.preventDefault;
    setRefresh(!refresh);
    removeItem(id, SKU);
  };

  const titleText = () => {
    if (cart.length > 0) {
      return "Your Cart:";
    } else {
      return "Your Cart is empty. Add some items from the store.";
    }
  };

  if (isComplete) {
    return (
      <div>
        <h3>Thank you for your purchase!</h3>
        <NavLink to="/dashboard-customer">
          <button> Dashboard </button>
        </NavLink>
        <NavLink to="/shopping">
          <button> Store </button>
        </NavLink>
      </div>
    );
  }

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
          <h2>{titleText()}</h2>
        </div>
        <div className="want-to-purchase">
          {cart &&
            cart.map(item => (
              <div className={item.id} key={item.name}>
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
                    {/* <p>
                      Quantity: {item.quantity} {item.increment}
                    </p> */}
                    <p>Provided by Farm# {item.farmer_id}</p>
                  </div>
                  <button onClick={() => handleDelete(user.id, item.SKU)}>
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
          {/* <h3> Total: $ </h3> */}
          {cart.length > 0 && (
            <button onClick={() => handlePurchase(cart)}>
              {" "}
              Purchase Produce{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

const StyledImg = styled.img`
  height: 100px;
`;
