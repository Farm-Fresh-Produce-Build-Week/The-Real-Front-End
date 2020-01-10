import React, { useState } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import FormStyled from "../styling/FormStyled"; 
import ShoppingButton from "../styling/ShoppingButton"; 
import StyledButton from "../styling/StyledButton";
import FormInput from "../styling/FormInput"; 
import Title from "../styling/Title";
import HeaderWrapper from "../styling/HeaderWrapper";


const initialItem = {
  PLU: "",
  name: "",
  description: "",
  produceImgURL: ""
};

const FarmItemForm = props => {
  const [newFarmItem, setNewFarmItem] = useState(initialItem);
  const [message, setMessage] = useState("");

  const handleChange = event => {
    let value = event.target.value;

    setNewFarmItem({
      ...newFarmItem,
      [event.target.name]: value
    });
  };
  console.log(newFarmItem);

  const handleSubmit = event => {
    console.log("newFarmItem", newFarmItem);
    event.preventDefault();
    AxiosWithAuth()
      .post(`/produce/`, newFarmItem)
      .then(res => {
        console.log(res);
        setMessage(res.data.message);
        setNewFarmItem(initialItem);
      })
      .catch(err => console.log(err.response));
  };

  const goToPLU = () => {
    const URL = `https://www.ifpsglobal.com/PLU-Codes/PLU-codes-Search`;
    window.open(URL, "PLU CODES", "width=900,height=700");
  };

  return (
    <div className="NewFarmItem-Form">
      <HeaderWrapper>
      <Title> Add Produce </Title>
      </HeaderWrapper>
      <StyledButton onClick={goToPLU} className="plu-btn">
        PLU Codes
      </StyledButton>
      <FormStyled className="Form-Section">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="number"
          name="PLU"
          onChange={handleChange}
          placeholder="PLU"
          value={newFarmItem.PLU}
        />
        <FormInput
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          value={newFarmItem.name}
        />
        {/* <FormInput
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={newFarmItem.price}
        /> */}

        <FormInput
          type="string"
          name="description"
          onChange={handleChange}
          placeholder="description"
          value={newFarmItem.description}
        />
        <FormInput
          type="string"
          name="produceImgURL"
          onChange={handleChange}
          placeholder="Picture of Product URL"
          value={newFarmItem.produceImgURL}
        />

        <ShoppingButton className="button-addNewItem" type="submit">
          Add Item For Sale
        </ShoppingButton>
        <StyledButton
          className="button-addNewItem"
          onClick={() => props.setIsAddingItem(false)}
        >
          Back to Inventory
        </StyledButton>
      </form>
      {message && <div className="added-message">{message}</div>}
      </FormStyled>
    </div>
  );
};

export default FarmItemForm;
