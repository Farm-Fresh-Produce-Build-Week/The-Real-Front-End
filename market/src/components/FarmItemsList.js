import React from "react";
// import { Link } from "react-router-dom";

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
          key={item.id}
        >
          <img
            className="farmitem-list-image"
            src={item.imageURL}
            // not sure about how to set up img with mock data and regularly
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FarmItemList;
