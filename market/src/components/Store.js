import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { AxiosWithAuthUser } from "../utils/axiosWithAuthUser";
import { NavLink } from "react-router-dom";
import FarmItem from "./FarmItem";
import styled from "styled-components";

const Store = props => {
  // const {Cart} = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [farmers, setFarmers] = useState();
  const [localFarmers, setLocalFarmers] = useState();
  const [localItems, setLocalItems] = useState();

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
      });
  }, []);

  useEffect(() => {
    if (farmers !== undefined) {
      getLocalFarmers();
    }
  }, [farmers]);

  useEffect(() => {
    if (localFarmers !== undefined) {
      localFarmers.forEach(farmer => {
        AxiosWithAuthUser()
          .get(`farmers/${farmer.id}/inventory`)
          .then(res => {
            console.log(res);
            setLocalItems(res.data);
          })
          .catch(error => console.log(error));
      });
    }
  }, [localFarmers]);

  console.log("user", user);
  console.log("farmers:", farmers);
  console.log("localFarmers", localFarmers);
  console.log("localItems", localItems);

  // Want to get all farmers and filter for city to match customer/user and then grab produce from farmers
  // list out all produce for sale.  make a card for each item and list over that to build out the page.

  return (
    <>
      <div className="Store-Page">
        <NavLink to="/dashboard-customer">
          <button> Dashboard </button>
        </NavLink>
        {localFarmers ? (
          <div>
            <h3>Your local farmers:</h3>
            {localFarmers.map(farmer => (
              <div key={farmer.id}>
                {farmer.username} - {farmer.city}, {farmer.state}{" "}
                {farmer.zipCode} <StyledImg src={farmer.profileImgURL} alt="" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            I'm sorry there are no farms available in the city of {user.city}
          </div>
        )}
        <div className="produce-listings">
          {/* should just be the list of produce pulled from the api */}
          {localItems && (
            <div>
              <h3>Local Produce for sale:</h3>
              <div>
                {localItems.map(item => {
                  return <FarmItem key={item.name} item={item} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Store;

const StyledImg = styled.img`
  height: 2rem;
`;
