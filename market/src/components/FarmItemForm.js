import React, { useState } from "react";

import { AxiosWithAuth } from "../utils/axiosWithAuth";

// this component is for making a new farm item

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
      .catch(err => console.log(err));
  };

  return (
    <div className="NewFarmItem-Form">
      <h2> Add Produce </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="PLU"
          onChange={handleChange}
          placeholder="PLU"
          value={newFarmItem.PLU}
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          value={newFarmItem.name}
        />
        {/* <input
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={newFarmItem.price}
        /> */}

        <input
          type="string"
          name="description"
          onChange={handleChange}
          placeholder="description"
          value={newFarmItem.description}
        />
        <input
          type="string"
          name="produceImgURL"
          onChange={handleChange}
          placeholder="Picture of Product URL"
          value={newFarmItem.produceImgURL}
        />

        <button className="button-addNewItem" type="submit">
          Add Item For Sale
        </button>
        <button
          className="button-addNewItem"
          onClick={() => props.setIsAddingItem(false)}
        >
          Back to Inventory
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default FarmItemForm;
