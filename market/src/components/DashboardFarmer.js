import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FarmerContext } from "../contexts/FarmerContext";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import FarmItemsList from "./FarmItemsList";
import FarmAddItem from "./FarmItemForm";
import FarmItemEdit from "./FarmItemEdit";

import styled from "styled-components";

import farmer3 from "../Images/Farmer/farmer3.jpg"; // mock data
import starfull from "../icons/PNG/starfull.png";

import starhalf from "../icons/PNG/starhalf.png";
import starempty from "../icons/PNG/starempty.png";

const DashboardFarmer = props => {
  const farmer = useContext(FarmerContext);
  const [farmItems, setFarmItems] = useState();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log("DashboardFarmer: props, farmer", props, farmer);

  // Sets current farmers inventory to state
  useEffect(() => {
    if (farmer.farmer !== undefined) {
      const id = farmer.farmer.id;
      AxiosWithAuth()
        .get(`/farmers/${id}/inventory`)
        .then(res => {
          console.log("App.js, GET PRODUCE RES: ", res);
          setFarmItems(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [farmer]);
  console.log("Farm Items: ", farmItems);

  if (!farmer.farmer) {
    return <div>Loading farm inventory...</div>;
  }

  // Toggle add item form
  if (isAddingItem) {
    return (
      <div className="Adding-Item">
        <FarmAddItem id={farmer.farmer.id} setIsAddingItem={setIsAddingItem} />;
        {farmItems && <FarmItemsList farmItems={farmItems} />};
        {!farmItems && <p>Add some items to sell</p>};
      </div>
    );
  }

  return (
    <>
      <div className="FarmerLandingPage">
        <div className="Top-Section">
          <div className="Farmer-Details">
            <StyledImg src={farmer.farmer.profileImgURL} alt="mockfarmer" />
            <h1>{farmer.farmer.username}</h1>
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
            {/* <NavLink to="/add-farm-items"> */}
            <button onClick={() => setIsAddingItem(!setIsAddingItem)}>
              {" "}
              Add New Farm Item{" "}
            </button>
            <button onClick={() => setIsAddingInventory(!isAddingInventory)}>
              {" "}
              Add New Inventory{" "}
            </button>
            <button onClick={() => setIsEditing(!isEditing)}>
              {" "}
              Edit Current Inventory{" "}
            </button>
            {/* </NavLink> */}
            {/* sends to another component not named yet..  */}
            <button> Farm Details </button>
            {/* dead button may add page for fun later  */}
          </div>
        </div>

        <div className="Sale-Section">
          <div className="Items-For-Sale" />
          <h2>Items for sale</h2>
          {farmItems && <FarmItemsList farmItems={farmItems} />}
          {!farmItems && <p>Add some items to sell</p>}
          {/* Throw is in A) <itemlistcomponent /> that lists over each item for sale  B) a <itemcomponent /> of mock data?   */}
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
