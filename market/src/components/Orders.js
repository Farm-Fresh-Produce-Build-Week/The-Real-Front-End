import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { OrdersContext } from "../contexts/OrdersContext";

const Orders = props => {
  const { orders, setOrders } = useContext(OrdersContext);
  console.log("Orders.js, orders: ", orders);

  const handleComplete = () => {
    setOrders([]);
  };

  const buttonText = () => {
    if (orders.length) {
      return "Mark Completed";
    } else {
      return "Back to Dashboard";
    }
  };

  return (
    <div className="orders-wrapper">
      {orders.length ? (
        <h2>Orders: </h2>
      ) : (
        <h2>"You do not have any outstanding orders"</h2>
      )}
      {orders &&
        orders.map(item => (
          <div key={item.user_id}>
            Customer Number: {item.user_id} - {item.name}
          </div>
        ))}
      <NavLink to="/dashboard-farmer">
        <button onClick={handleComplete}>{buttonText()}</button>
      </NavLink>
    </div>
  );
};

export default Orders;
