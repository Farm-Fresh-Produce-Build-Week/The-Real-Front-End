import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FarmerContext } from "../contexts/FarmerContext";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import FarmItemsList from "./FarmItemsList";
import FarmAddItem from "./FarmItemForm";
import FarmItemAddInventory from "./FarmItemAddInventory";

import styled from "styled-components";

import farmer3 from "../Images/Farmer/farmer3.jpg"; // mock data
import starfull from "../icons/PNG/starfull.png";

import starhalf from "../icons/PNG/starhalf.png";
import starempty from "../icons/PNG/starempty.png";

const DashboardFarmer = props => {
  const { farmer } = useContext(FarmerContext);
  const [farmItems, setFarmItems] = useState();
  const [loading, setLoading] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [editedItem, setEditedItem] = useState(false);
  const [deletedItem, setDeletedItem] = useState(false);

  console.log("DashboardFarmer: props, farmer", props, farmer);

  // Sets current farmers inventory to state
  useEffect(() => {
    if (farmer !== undefined) {
      const id = farmer.id;
      setLoading(true);
      AxiosWithAuth()
        .get(`/farmers/${id}/inventory`)
        .then(res => {
          console.log("App.js, GET PRODUCE RES: ", res);
          setLoading(false);
          setFarmItems(res.data);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [farmer, isAddingInventory, editedItem, deletedItem]);
  console.log("Farm Items: ", farmItems);

  if (loading) {
    return <div>Loading farm inventory...</div>;
  }

  // Toggle add item form
  if (isAddingItem) {
    return (
      <div className="Adding-Item">
        <FarmAddItem id={farmer.id} setIsAddingItem={setIsAddingItem} />
        {/* {farmItems && <FarmItemsList farmItems={farmItems} />};
        {!farmItems && <p>Add some items to sell</p>}; */}
      </div>
    );
  }

  // Toggle add inventory form
  if (isAddingInventory) {
    return (
      <div className="Adding-Inventory">
        <FarmItemAddInventory
          id={farmer.id}
          setIsAddingInventory={setIsAddingInventory}
        />
      </div>
    );
  }

  return (
    <>
      <div className="FarmerLandingPage">
        <div className="Top-Section">
          <div className="Farmer-Details">
            <StyledImg
              src={farmer.profileImgURL ? farmer.profileImgURL : farmer3}
              // src={farmer3} // mock
              alt="farmer picture"
            />
            <h1>{farmer.username}</h1>
          </div>

          <div className="ratings-area">
            <h3> Your Farm Rating: </h3>
            <div className="stars-rating">
              <img src={starfull} alt="star-full" />
              <img src={starfull} alt="star-full" />
              <img src={starfull} alt="star-full" />
              <img src={starhalf} alt="star-half" />
              <img src={starempty} alt="star-empty" />
            </div>
          </div>
          <div className="button-area">
            <button onClick={() => setIsAddingItem(!isAddingItem)}>
              {" "}
              Add New Farm Item{" "}
            </button>
            <button onClick={() => setIsAddingInventory(!isAddingInventory)}>
              {" "}
              Add New Inventory{" "}
            </button>
            {/* </NavLink> */}
            {/* sends to another component not named yet..  */}
            <button> Farm Details </button>
            {/* dead button may add page for fun later  */}
          </div>
        </div>

        <div className="Sale-Section">
          <div className="Items-For-Sale" />
          {farmItems && (
            <FarmItemsList
              farmItems={farmItems}
              farmer={farmer}
              editedItem={editedItem}
              setEditedItem={setEditedItem}
              deletedItem={deletedItem}
              setDeletedItem={setDeletedItem}
            />
          )}
        </div>
        {/* end of sale-section */}
      </div>
      {/* end of DashboardFarmer */}
    </>
  );
};

export default DashboardFarmer;

const StyledImg = styled.img`
  height: 150px;
`;
