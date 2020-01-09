import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { AxiosWithAuthUser } from "../utils/axiosWithAuthUser";
import { NavLink } from "react-router-dom";
import FarmItem from "./FarmItem";

const Store = props => {
  // const {Cart} = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [farmers, setFarmers] = useState();
  const [localFarmers, setLocalFarmers] = useState();

  const getLocalFarmers = () => {
    setLocalFarmers(
      farmers.filter(farmer => {
        return user.city.toLowerCase() === farmer.city.toLowerCase();
      })
    );
    console.log("localFarmers", localFarmers);
  };

  useEffect(() => {
    AxiosWithAuthUser()
      .get(`/farmers/`)
      .then(res => {
        console.log("Store.js: GET ALL FARMERS: ", res);
        setFarmers(res.data);
      })
      .catch(err => {
        console.log("Store.js: error", err);
        // getting 401 error
      });
  }, []);

  useEffect(() => {
    if (farmers !== undefined) {
      getLocalFarmers();
    }
  }, [farmers]);

  console.log("user", user);
  console.log("farmers:", farmers);
  console.log("localFarmers", localFarmers);

  // Want to get all farmers and filter for city to match customer/user and then grab produce from farmers
  // list out all produce for sale.  make a card for each item and list over that to build out the page.

  return (
    <>
      <div className="Store-Page">
        <NavLink to="/dashboard-customer">
          <button> Dashboard </button>
        </NavLink>
        <h3> Find something new to make today! </h3>
        <div className="produce-listings">
          {/* should just be the list of produce pulled from the api */}
          {/* <FarmItem item={item} /> */}
        </div>
      </div>
    </>
  );
};

export default Store;
