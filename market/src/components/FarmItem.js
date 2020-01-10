import React, { useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import blackberries from "../Images/Produce/blackberries.jpg";
import FarmItemDescription from "../components/FarmItemDescription.js";
import styled from "styled-components";
import SubTitle from "../styling/SubTitle"; 
import PStyled from "../styling/PStyled"; 
import ShoppingButton from "../styling/ShoppingButton"; 


const FarmItem = props => {
  // const { farmer } = useContext(FarmerContext);
    const { farmItems, addToCart } = useContext(FarmItemsContext);


  return (
    <>
      <FarmCard className="FarmItem-Wrapper">
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
            <SubTitle>{props.item.name}</SubTitle>
            <PStyled>
              ${props.item.price} per {props.item.increment}
            </PStyled>
            <PStyled>Quantity: {props.item.quantity}</PStyled>
            <PStyled>{props.item.description}</PStyled>
            <PStyled>Provided by Farm #{props.item.farmer_id}</PStyled>
          </div>
        </div>
        <ShoppingButton>Add to Cart</ShoppingButton>
      </FarmCard>
    </>
  );

};

export default FarmItem;

const StyledImg = styled.img`
  height: 175px;
  border-radius: 5px; 
  &:hover {
   
  }
`;

const FarmCard = styled.div`
padding: 1rem;
`
