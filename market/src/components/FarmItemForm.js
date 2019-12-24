import React, { useState } from "react";

import { AxiosWithAuth } from "../utils/axiosWithAuth";

// this component is for making a new farm item

const initialItem = {
  name: "",
  price: "",
  imageURL: "",
  description: ""
};

const FarmItemForm = props => {
  const [newFarmItem, setNewFarmItem] = useState(initialItem);

  const handleChange = event => {
    let value = event.target.value;

    setNewFarmItem({
      ...newFarmItem,
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
    <div className="NewFarmItem-Form">
      <h2> Add Produce </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          value={newFarmItem.name}
        />
        <input
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={newFarmItem.price}
        />
        <input
          type="string"
          name="imageURL"
          onChange={handleChange}
          placeholder="Picture of Product"
          value={newFarmItem.imageURL}
        />
        <input
          type="string"
          name="description"
          onChange={handleChange}
          placeholder="description"
          value={newFarmItem.description}
        />

        <button className="button-addNewItem" type="submit">
          Add Item For Sale
        </button>
        <button
          className="button-addNewItem"
          onClick={() => props.history.goBack()}
        >
          Back to Inventory
        </button>
      </form>
    </div>
  );
};

export default FarmItemForm;
