import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext"; 
import customer3 from "../Images/customer3.jpg"; 
import {NavLink} from "react-router-dom"; 
import styled from "styled-components"; 

const DashboardCustomer = props => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="Customer-LandingPage">
        <div className="Top-Section">
          <div className="Customer-Details">
            <StyledImg src={user.profileImgUrl ? user.profileImgURL : customer3 }
            alt="customer picture" />
            <h1> {user.username}</h1>    
              {/* won't show username on customer dashboard.... */}
          </div>
        </div>
        <div className="Button-area">
          <NavLink to="/shopping"> <button> Go Shopping </button></NavLink>
        </div>
        <div className="Favorite-Area">
          <div className="Fav-Items">
          </div>
          <div className="Fav-Farms">

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