import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

// this is updating an item that is already for sale

const initialItem = {
  SKU: "",
  PLU: "",
  quantity: "",
  increment: "",
  price: ""
};

const FarmItemEdit = props => {
  //   console.log("FarmItemEdit, props: ", props);
  const [item, setItem] = useState(initialItem);
  const [newItem, setNewItem] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    AxiosWithAuth()
      .get(`farmers/${props.id}/inventory/${props.SKU}`)
      .then(res => {
        // console.log("GET INV BY SKU, res: ", res);
        setItem(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = event => {
    event.preventDefault();
    let value = event.target.value;
    setItem({
      ...item,
      [event.target.name]: value
    });
    setNewItem({ ...newItem, [event.target.name]: value });
  };
  //   console.log("FarmItemEdit.js, item: ", item);
  //   console.log("FarmItemEdit.js, newItem: ", newItem);

  const handleSubmit = event => {
    event.preventDefault();
    setError("");
    AxiosWithAuth()
      .put(`/farmers/${props.id}/inventory/${props.SKU}`, newItem)
      .then(res => {
        console.log("FarmItemEdit: handleSubmit res", res);
        props.setIsEditing(false);
        props.setEditedItem(!props.editedItem);
      })
      .catch(error => {
        console.log("FarmItemEdit: handleSubmit error", error);
        setError(error.message);
      });
  };

  return (
    <div className="EditFarmItem-Form">
      <h2>Update Produce </h2>
      {item.produceImgURL && (
        <StyledImg src={item.produceImgURL} alt={"No item picture available"} />
      )}
      {item.name && <h3>{item.name}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          SKU
          <input
            type="number"
            name="SKU"
            onChange={handleChange}
            placeholder="SKU"
            value={item.SKU}
            disabled
          />
        </label>
        <label>
          PLU
          <input
            type="number"
            name="PLU"
            onChange={handleChange}
            placeholder="PLU"
            value={item.PLU}
            disabled
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            placeholder="quantity"
            value={item.quantity}
          />
        </label>
        <label>
          Increment
          <input
            type="text"
            name="increment"
            onChange={handleChange}
            placeholder="increment"
            value={item.increment}
          />
        </label>
        <label>
          Price
          <input
            type="price"
            name="price"
            onChange={handleChange}
            placeholder="price"
            value={item.price}
          />
        </label>

        <button className="button-UpdateItem" type="submit">
          Update
        </button>
        <button
          className="button-UpdateItem-cancel"
          onClick={() => props.setIsEditing(false)}
        >
          Cancel
        </button>
      </form>
      {error && <div style={{ color: "red" }}> {error}</div>}
    </div>
  );
};

export default FarmItemEdit;

const StyledImg = styled.img`
  height: 200px;
`;
