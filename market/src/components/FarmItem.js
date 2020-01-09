import React, { useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import blackberries from "../Images/Produce/blackberries.jpg";
import FarmItemDescription from "../components/FarmItemDescription.js";
import styled from "styled-components";

// single item/product for sale   !! Mostly mock data right now.

// farmItems setFarmItems is the App's application state.
// cart and setCard are also states being uses. Are they application level or app.js level??

const FarmItem = props => {
  // const { farmer } = useContext(FarmerContext);
  const { farmItems, addToCart } = useContext(FarmItemsContext);

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
          </div>
        </div>
        <button>Add to Cart</button>
      </div>
    </>
  );
};

export default FarmItem;

const StyledImg = styled.img`
  height: 50px;
`;
