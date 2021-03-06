import React, { useState } from "react";
import FarmItemEdit from "./FarmItemEdit";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

import Title from "../styling/Title";
import HeaderWrapper from "../styling/HeaderWrapper";
import ShoppingButton from "../styling/ShoppingButton";
import PStyled from "../styling/PStyled";
import SubTitle from "../styling/SubTitle";
import StyledButton from "../styling/StyledButton";

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
        <HeaderWrapper>
          <DeleteTitle>
            Are you sure you want to delete {item.name} from your inventory?
          </DeleteTitle>
        </HeaderWrapper>
        <div>
          <StyledImg
            src={item.produceImgURL}
            alt={"No item picture available"}
          />
        </div>

        <StyledButton
          className="yes-btn"
          onClick={() => {
            deleteItem(item);
          }}
        >
          Yes
        </StyledButton>
        <StyledButton
          className="no-btn"
          onClick={() => {
            setIsDeleting(false);
          }}
        >
          No
        </StyledButton>
      </div>
    );
  }

  return (
    <div className="Selling-Area">
      <div className="Selling-Header">
        <HeaderWrapper>
          <Title>Items You're Selling </Title>
        </HeaderWrapper>
      </div>
      <StyledList className="farmItems-Wrapper">
        {props.farmItems.length == 0 ? (
          <PStyled>Your inventory is empty. Add some more inventory.</PStyled>
        ) : null}
        {props.farmItems.map(item => (
          <FarmCard className="FarmItem-card" key={item.name}>
            <StyledImg
              className="farmitem-list-image"
              src={item.produceImgURL}
              alt={item.name}
            />
            <ProduceTitle>{item.name}</ProduceTitle>
            <PStyled>
              ${item.price} per {item.increment}
            </PStyled>
            <PStyled>
              Quantity: {item.quantity}-{item.increment}
            </PStyled>
            <ShoppingButton onClick={() => handleEdit(item)}>
              Update Item
            </ShoppingButton>
            <ShoppingButton onClick={() => handleDelete(item)}>
              Delete Item
            </ShoppingButton>
          </FarmCard>
        ))}
      </StyledList>
    </div>
  );
};

export default FarmItemList;

const StyledImg = styled.img`
  height: 175px;
  border-radius: 5px;
`;

const StyledList = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 80%;
  flex-flow: wrap;
  justify-content: center;
  margin: auto;
`;

const ProduceTitle = styled(SubTitle)`
  padding: 0.5rem;
  font-size: 2.5rem;
`;

const FarmCard = styled.div`
  padding: 1rem;
`;

const DeleteTitle = styled(Title)`
  font-size: 3rem;
`;
