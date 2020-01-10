import React, { useState, useEffect, useContext } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import styled from "styled-components";
import Title from "../styling/Title";
import FormStyled from "../styling/FormStyled";
import FormInput from "../styling/FormInput"; 
import HeaderWrapper from "../styling/HeaderWrapper"; 
import StyledButton from "../styling/StyledButton";
import ShoppingButton from "../styling/ShoppingButton";

const initialItem = {
  SKU: "",
  PLU: "",
  quantity: "",
  increment: "",
  price: ""
};

const FarmItemAddInventory = props => {
  const [newInventory, setNewInventory] = useState(initialItem);
  // const { farmItems } = useContext(FarmItemsContext);
  const [farmItems, setFarmItems] = useState();
  const [selectItem, setSelectItem] = useState(initialItem);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("allFarmItems: ", farmItems);

  useEffect(() => {
    AxiosWithAuth()
      .get("/produce")
      .then(res => {
        console.log("App.js, GET PRODUCE RES: ", res);
        setFarmItems(res.data);
      })
      .catch(err => console.log(err));
  }, [newInventory]);

  const handleChange = event => {
    let value = event.target.value;

    setNewInventory({
      ...newInventory,
      [event.target.name]: value
    });
  };

  const handleSelect = event => {
    setSelectItem(farmItems.find(item => item.name == event.target.value));
  };

  useEffect(() => {
    setNewInventory({ ...newInventory, PLU: selectItem.PLU });
  }, [selectItem]);
  // console.log("selectItem", selectItem);
  // console.log("newInventory", newInventory);

  const handleSubmit = event => {
    event.preventDefault();
    let successMsg = `You've added ${newInventory.quantity} ${newInventory.increment} of ${selectItem.name} to your inventory.`;
    console.log(newInventory);
    AxiosWithAuth()
      .post(`/farmers/${props.id}/inventory`, newInventory)
      .then(res => {
        console.log(res);
        setMessage(successMsg);
        setErrorMessage("");
        setNewInventory(initialItem);
        // props.setIsAddingInventory(false)
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(
          "There was a problem adding your inventory. Make sure this produce is not already in your inventory and that the SKU is unique."
        );
      });
  };

  return (
    <div className="NewFarmInventory-Form">
      <HeaderWrapper>
      <Title> Add Inventory </Title>
      </HeaderWrapper>
      <FormStyled className="AddInventory-Form">
      <form onSubmit={handleSubmit}>
        <StyledSelect onChange={handleSelect} value={newInventory.name}>
          <option name="None" value="None">
            -- Select Item --
          </option>
          {farmItems &&
            farmItems.map(item => (
              <option key={item.name} name={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </StyledSelect>
        <label>
          SKU
          <FormInput
            type="text"
            name="SKU"
            onChange={handleChange}
            placeholder="SKU"
            value={newInventory.SKU}
          />
        </label>
        <label>
          PLU
          <FormInput
            type="text"
            name="PLU"
            onChange={handleChange}
            placeholder="PLU"
            value={newInventory.PLU}
            disabled
          />
        </label>
        <label>
          Quantity
          <FormInput
            type="text"
            name="quantity"
            onChange={handleChange}
            placeholder="quantity"
            value={newInventory.quantity}
          />
        </label>
        <label>
          Increment
          <FormInput
            type="text"
            name="increment"
            onChange={handleChange}
            placeholder="increment"
            value={newInventory.increment}
          />
        </label>
        <label>
          Price
          <FormInput
            type="price"
            name="price"
            onChange={handleChange}
            placeholder="price"
            value={newInventory.price}
          />
        </label>

        <ShoppingButton className="button-addNewItem" type="submit">
          Add Item To Inventory
        </ShoppingButton>
        <StyledButton
          className="button-addNewItem"
          onClick={() => props.setIsAddingInventory(false)}
        >
          Back to Inventory
        </StyledButton>
      </form>
      {message ? (
        <div className="added-message">{message}</div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      </FormStyled>
    </div>
  );
};

export default FarmItemAddInventory;

const StyledSelect = styled.select`
  width: 150px;
  margin: 25px;
  padding: .3rem;
`;
