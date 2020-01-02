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

  const handleSubmit = event => {
    event.preventDefault();
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
        <select>
          <option value="None">-- Select --</option>
          {farmItems.map(item => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
        <input
          type="number"
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

        {/* <input
          type="string"
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
        /> */}

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
