import React, { useContext } from "react";
import { OrdersContext } from "../contexts/OrdersContext";

const Orders = props => {
  const { orders } = useContext(OrdersContext);
  console.log("Orders.js, orders: ", orders);
  return <p>orders here</p>;
};

export default Orders;
