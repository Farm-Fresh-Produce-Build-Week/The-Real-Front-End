import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";

// this is updating an item that is already for sale

const initialItem = {
  SKU: "",
  PLU: "",
  quantity: "",
  increment: "",
  price: ""
};

const FarmItemEdit = props => {
  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");
  //   useEffect(() => {
  //     const itemToEdit = props.items.find(
  //       item => `${item.id}` === props.match.params.id
  //     );

  //     if (itemToEdit) setItem(itemToEdit);
  //   }, [props.items]);
  //   props.match.params.id --> removed dependancy from line above

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
          type="number"
          name="quantity"
          onChange={handleChange}
          placeholder="quantity"
          value={item.quantity}
        />
        <input
          type="price"
          name="price"
          onChange={handleChange}
          placeholder="price"
          value={item.price}
        />
        <input
          type="number"
          name="SKU"
          onChange={handleChange}
          placeholder="SKU"
          value={item.SKU}
        />
        <input
          type="number"
          name="PLU"
          onChange={handleChange}
          placeholder="PLU"
          value={item.PLU}
        />
        <input
          type="string"
          name="increment"
          onChange={handleChange}
          placeholder="increment"
          value={item.increment}
        />

        <button className="button-UpdateItem"> Update </button>
        <button
          className="button-UpdateItem-cancel"
          onClick={() => props.setIsEditing(false)}
        >
          {" "}
          Cancel{" "}
        </button>
      </form>
      {error & <div style={{ color: "red" }}> {error}</div>}
    </div>
  );
};

export default FarmItemEdit;
