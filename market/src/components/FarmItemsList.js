import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const FarmItemList = props => {
  console.log("FarmItemsList.js, props: ", props);
  const routeToFarmItem = (event, item) => {
    // event.prevetDefault();
    // props.history.push(`/farmitem-list/${item.id}`); THIS ROUTE NEEDS TO BE UPDATED
  };
  return (
    <div className="farmItemS-Wrapper">
      {props.farmItems.map(item => (
        <div
          onClick={event => routeToFarmItem(event, item)}
          className="FarmItem-card"
          key={item.name}
        >
          <StyledImg
            className="farmitem-list-image"
            src={item.produceImgURL}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>
            ${item.price} per {item.increment}
          </p>
          <p>
            Quanity: {item.quantity}-{item.increment}
          </p>
          <button onClick={() => props.setIsEditing(!props.isEditing)}>
            Update Quanity
          </button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FarmItemList;

const StyledImg = styled.img`
  height: 100px;
`;
