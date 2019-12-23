import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FarmerContext } from "../contexts/FarmerContext";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import FarmItemsList from "./FarmItemsList";

import styled from "styled-components";

import farmer3 from "../Images/Farmer/farmer3.jpg"; // mock data
import starfull from "../icons/PNG/starfull.png";

import starhalf from "../icons/PNG/starhalf.png";
import starempty from "../icons/PNG/starempty.png";

const DashboardFarmer = props => {
  const farmer = useContext(FarmerContext);
  const [farmItems, setFarmItems] = useState();
  console.log("DashboardFarmer: props, farmer", props, farmer);

  useEffect(() => {
    if (farmer !== undefined) {
      const id = farmer.farmer[0].id;
      AxiosWithAuth()
        .get(`/farmers/${id}/inventory`)
        .then(res => {
          console.log("App.js, GET PRODUCE RES: ", res);
          setFarmItems(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);
  console.log("Farm Items: ", farmItems);

  return (
    <>
      <div className="FarmerLandingPage">
        <div className="Top-Section">
          <div className="Farmer-Details">
            <StyledImg src={farmer3} alt="mockfarmer" />
            <p> NOTE: MOCKPICTURE</p>
            <h1> Farmer Chris (mock) </h1>
          </div>

          <div className="ratings-area">
            <h3> Your Farm Rating: </h3>
            <div className="stars-rating">
              <img src={starfull} alt="star-full" />
              <img src={starfull} alt="star-full" />
              <img src={starfull} alt="star-full" />
              <img src={starhalf} alt="star-half" />
              {/* <img src={starempty} alt="star-empty" /> */}
            </div>
          </div>
          <div className="button-area">
            <NavLink to="/add-farm-items">
              <button> Add Items to Sell </button>
            </NavLink>
            {/* sends to another component not named yet..  */}
            <button> Farm Details </button>
            {/* dead button may add page for fun later  */}
          </div>
        </div>

        <div className="Sale-Section">
          <div className="Items-For-Sale" />
          <h2>Items for sale</h2>
          {farmItems && <FarmItemsList farmItems={farmItems} />}
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
  height: 100px;
`;
