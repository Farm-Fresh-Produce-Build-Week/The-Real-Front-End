import React, { useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuthUser } from "../utils/axiosWithAuthUser";
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
  const [message, setMessage] = useState();
  const [itemToAdd, setItemToAdd] = useState({
    SKU: props.item.SKU,
    quantity: 1
  });

  console.log("FarmItem.js, props: ", props);

  const handleChange = event => {
    setItemToAdd({
      ...itemToAdd,
      [event.target.name]: parseInt(event.target.value)
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.setRefreshOnAdd(!props.setRefreshOnAdd);
    console.log("FarmItem.js, itemToAdd: ", itemToAdd);

    AxiosWithAuthUser()
      .post(`users/${props.user.id}/cart`, itemToAdd)
      .then(res => {
        console.log(res.response);
        setMessage(
          `Added ${itemToAdd.quantity} ${props.item.name} to your cart`
        );
        addToCart(props.user.id);
      })
      .catch(err => {
        console.log(err.response);
        if (err) {
          setMessage(`${props.item.name} are already in your cart`);
        }
      });
  };

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
`;
