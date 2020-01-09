import React, { useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import blackberries from "../Images/Produce/blackberries.jpg";
import FarmItemDescription from "../components/FarmItemDescription.js";
import styled from "styled-components";

const FarmItem = props => {
  // const { farmer } = useContext(FarmerContext);
  const { farmItems, addToCart } = useContext(FarmItemsContext);
  const [message, setMessage] = useState();
  const [itemToAdd, setItemToAdd] = useState({
    SKU: props.item.SKU,
    quantity: 1
  });

  console.log("FarmItem.js, props: ", props);

  const handleChange = event => {
    setItemToAdd({
      ...itemToAdd,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage(`Added ${itemToAdd.quantity} ${props.item.name} to your cart`);
    console.log("FarmItem.js, itemToAdd: ", itemToAdd);
  };

  return (
    <>
      <div className="FarmItem-Wrapper">
        <div className="FarmItem-Header">
          <div className="image-wrapper">
            {props.item.produceImgURL !== undefined && (
              <StyledImg
                src={
                  props.item.produceImgURL
                    ? props.item.produceImgURL
                    : blackberries
                }
                alt="produce item"
              />
            )}
          </div>
          <div className="Item-Info">
            <p>{props.item.name}</p>
            <p>
              ${props.item.price} per {props.item.increment}
            </p>
            <p>Quantity: {props.item.quantity}</p>
            <p>{props.item.description}</p>
            <p>Provided by Farm# {props.item.farmer_id}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="quantity"
            value={itemToAdd.quantity}
            onChange={handleChange}
            style={{ width: "50px", margin: "0 auto" }}
          />
          <button type="submit">Add to Cart</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    </>
  );
};

export default FarmItem;

const StyledImg = styled.img`
  height: 50px;
`;
