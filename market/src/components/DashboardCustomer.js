import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext"; 
import blankcustomer from "../Images/blankcustomer.jpg"; 
import {NavLink} from "react-router-dom"; 
import FarmItem from "./FarmItem"; 
import styled from "styled-components"; 

const DashboardCustomer = props => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="Customer-LandingPage">
        <div className="Top-Section">
          <div className="Customer-Details">
            <StyledImg src={user.profileImgUrl ? user.profileImgURL : blankcustomer }
            alt="customer picture" />
            <h2> Name:  {user.username}</h2>    
              {/* won't show username on customer dashboard.... */}
          </div>
        </div>
        <div className="Button-area">
          <NavLink to="/shopping"> <button> Go Shopping </button></NavLink>
        </div>
        <div className="Favorite-Area">
          <div className="Fav-Items">
            <h3> Favorite Produce: </h3>
            {/* empty for now */}
            <FarmItem />
          </div>
          <div className="Fav-Farms">
            <h3> Favorite Farms: </h3>
            {/* empty for now  */}
          </div>
        </div>
        </div>
    </>
  );
};

export default DashboardCustomer;

const StyledImg = styled.img`
  height: 150px; 
`