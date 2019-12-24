import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";

// this is updating an item that is already for sale

const initialItem = {
  name: "",
  price: "",
  imageURL: "",
  description: ""
};

const FarmItemEdit = props => {
  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");
  useEffect(() => {
    const itemToEdit = props.items.find(
      item => `${item.id}` === props.match.params.id
    );

    if (itemToEdit) setItem(itemToEdit);
  }, [props.items, props.match.params.id]);

  const handleChange = event => {
    event.preventDefault();
    let value = event.target.value;
    setItem({
      ...item,
      [event.target.value]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setError("");
    AxiosWithAuth()
      .put(`farmitems/${item.id}`, item)
      .then(res => {
        console.log("FarmItemEdit: handleSubmit res", res);
        props.updateItem(res.data);
        props.history.push("/farmitem-list");
      })
      .catch(error => {
        console.log("FarmItemEdit: handleSubmit error", error);
        setError(error.message);
      });
  };

  return (
    <div className="EditFarmItem-Form">
      <h2>Update Produce </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          name="name"
          onChange={handleChange}
          placeholder="name"
          value={item.name}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={item.price}
        />
        <input
          type="string"
          name="imageURL"
          onChange={handleChange}
          placeholder="image"
          value={item.imageURL}
        />
        <input
          type="string"
          name="description"
          onChange={handleChange}
          placeholder="description"
          value={item.description}
        />
        <button className="button-UpdateItem"> Update </button>
      </form>
      {error & <div style={{ color: "red" }}> {error}</div>}
    </div>
  );
};

export default FarmItemEdit;
