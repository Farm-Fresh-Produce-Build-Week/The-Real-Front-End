import React, { useState } from "react";
import FarmItemEdit from "./FarmItemEdit";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const FarmItemList = props => {
  console.log("FarmItemsList.js, props: ", props);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [item, setItem] = useState();

  const handleDelete = item => {
    setIsDeleting(true);
    setItem(item);
  };

  const deleteItem = () => {
    // AxiosWithAuth.delete(`/farmers/${farmer.id}/inventory/${item.SKU}`);
  };

  const handleEdit = item => {
    setIsEditing(true);
    setItem(item);
  };

  const editItem = item => {};

  const routeToFarmItem = (event, item) => {
    // event.prevetDefault();
    // props.history.push(`/farmitem-list/${item.id}`); THIS ROUTE NEEDS TO BE UPDATED
  };

  // Toggle update item form
  if (isEditing) {
    return (
      <div className="Editing-Inventory">
        <FarmItemEdit id={props.farmer.id} setIsEditing={setIsEditing} />
      </div>
    );
  }

  // Toggle confirm delete item screen
  if (isDeleting) {
    return (
      <div className="Deleting-Item">
        <h2>
          Are you sure you want to delete {item.name} from your inventory?
        </h2>
        <button
          className="yes-btn"
          onClick={() => {
            deleteItem();
            setIsDeleting(false);
          }}
        >
          Yes
        </button>
        <button
          className="no-btn"
          onClick={() => {
            setIsDeleting(false);
          }}
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Items for sale</h2>
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
              Quantity: {item.quantity}-{item.increment}
            </p>
            <button onClick={() => handleEdit(item)}>Update Item</button>
            <button onClick={() => handleDelete(item)}>Delete Item</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmItemList;

const StyledImg = styled.img`
  height: 100px;
`;
