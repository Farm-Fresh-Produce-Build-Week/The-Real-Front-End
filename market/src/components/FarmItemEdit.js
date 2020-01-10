import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";
import Title from "../styling/Title"; 
import HeaderWrapper from "../styling/HeaderWraper"; 
import SubTitle from "../styling/SubTitle";
import FormStyled from "../styling/FormStyled"; 
import FormInput from "../styling/FormInput";
import StyledButton from "../styling/StyledButton"; 

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
      <HeaderWrapper>
      <Title>Update Produce </Title>
      </HeaderWrapper>
      {item.produceImgURL && (
        <StyledImg src={item.produceImgURL} alt={"No item picture available"} />
      )}
      {item.name && <ProduceTitle>{item.name}</ProduceTitle>}
      <FormStyled className="Edit-Form-Section"> 
      <form onSubmit={handleSubmit}>
        <label>
          SKU
          <FormInput
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
          <FormInput
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
          <FormInput
            type="number"
            name="quantity"
            onChange={handleChange}
            placeholder="quantity"
            value={item.quantity}
          />
        </label>
        <label>
          Increment
          <FormInput
            type="text"
            name="increment"
            onChange={handleChange}
            placeholder="increment"
            value={item.increment}
          />
        </label>
        <label>
          Price
          <FormInput
            type="price"
            name="price"
            onChange={handleChange}
            placeholder="price"
            value={item.price}
          />
        </label>


        <StyledButton className="button-UpdateItem" type="submit">
          Update
        </StyledButton>
        <StyledButton
          className="button-UpdateItem-cancel"
          onClick={() => props.setIsEditing(false)}
        >
          Cancel
        </StyledButton>
      </form>
      {error && <div style={{ color: "red" }}> {error}</div>}
      </FormStyled>
    </div>
  );
};

export default FarmItemEdit;

const StyledImg = styled.img`
  height: 200px;
  border-radius: 5px; 
`;


const ProduceTitle = styled(SubTitle)`
padding: .5rem;
font-size: 2.5rem; 
`
