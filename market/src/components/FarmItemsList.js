import React, { useState } from "react";
import FarmItemEdit from "./FarmItemEdit";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const FarmItemList = props => {
  // console.log("FarmItemsList.js, props: ", props);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState();

  // console.log("FarmItemsList, item: ", item);

  const handleDelete = item => {
    // console.log("FarmItemsList.js, handleDelete, item: ", item);
    setItem(item);
    setIsDeleting(true);
  };

  const deleteItem = item => {
    AxiosWithAuth()
      .delete(`/farmers/${props.farmer.id}/inventory/${item.SKU}`)
      .then(res => {
        console.log(res);
        setIsDeleting(false);
        props.setDeletedItem(!props.deletedItem);
      })
      .catch(error => console.log(error));
  };

  const handleEdit = item => {
    setIsEditing(true);
    setItem(item);
  };

  // Toggle update item form
  if (isEditing) {
    return (
      <div className="Editing-Inventory">
        <FarmItemEdit
          id={props.farmer.id}
          SKU={item.SKU}
          setIsEditing={setIsEditing}
          editedItem={props.editedItem}
          setEditedItem={props.setEditedItem}
        />
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
        <div>
          <StyledImg
            src={item.produceImgURL}
            alt={"No item picture available"}
          />
        </div>

        <button
          className="yes-btn"
          onClick={() => {
            deleteItem(item);
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
  height: 150px;
`;
