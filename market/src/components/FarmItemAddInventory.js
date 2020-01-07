import React, { useState, useEffect, useContext } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import { FarmItemsContext } from "../contexts/FarmItemsContext";

// this component is for adding to farm inventory from existing items

const initialItem = {
  SKU: "",
  PLU: "",
  quantity: "",
  increment: "",
  price: ""
};

const FarmItemAddInventory = props => {
  const [newInventory, setNewInventory] = useState(initialItem);
  const { farmItems } = useContext(FarmItemsContext);
  const [selectItem, setSelectItem] = useState(initialItem);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("allFarmItems: ", farmItems);

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
  console.log("selectItem", selectItem);
  console.log("newInventory", newInventory);

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
      <h2> Add Inventory </h2>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelect} value={newInventory.name}>
          <option name="None" value="None">
            -- Select --
          </option>
          {farmItems.map(item => (
            <option key={item.name} name={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="SKU"
          onChange={handleChange}
          placeholder="SKU"
          value={newInventory.SKU}
        />
        <input
          type="text"
          name="PLU"
          onChange={handleChange}
          placeholder="PLU"
          value={newInventory.PLU}
          disabled
        />
        <input
          type="text"
          name="quantity"
          onChange={handleChange}
          placeholder="quantity"
          value={newInventory.quantity}
        />
        <input
          type="text"
          name="increment"
          onChange={handleChange}
          placeholder="increment"
          value={newInventory.increment}
        />
        <input
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={newInventory.price}
        />

        <button className="button-addNewItem" type="submit">
          Add Item To Inventory
        </button>
        <button
          className="button-addNewItem"
          onClick={() => props.setIsAddingInventory(false)}
        >
          Back to Inventory
        </button>
      </form>
      {message ? (
        <div className="added-message">{message}</div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
    </div>
  );
};

export default FarmItemAddInventory;
