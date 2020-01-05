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
  console.log("allFarmItems: ", farmItems);

  const handleChange = event => {
    let value = event.target.value;

    setNewInventory({
      ...newInventory,
      [event.target.name]: value
    });
  };

  const handleSelect = event => {
    setNewInventory(farmItems.filter(item => item.name == event.target.value));
  };
  console.log(newInventory);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(newInventory);
    AxiosWithAuth()
      .post(`/farmers/${props.id}/inventory`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
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
            <option name={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="quantity"
          onChange={handleChange}
          placeholder="quantity"
          value={newInventory.quantity}
        />
        {/* <input
          type="number"
          name="SKU"
          onChange={handleChange}
          placeholder="SKU"
          value={newInventory.SKU}
        />
        <input
          type="number"
          name="PLU"
          onChange={handleChange}
          placeholder="PLU"
          value={newInventory.PLU}
        /> */}

        <input
          type="string"
          name="increment"
          onChange={handleChange}
          placeholder="increment"
          value={newInventory.increment}
          disabled
        />
        <input
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={newInventory.price}
          readOnly
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
    </div>
  );
};

export default FarmItemAddInventory;
