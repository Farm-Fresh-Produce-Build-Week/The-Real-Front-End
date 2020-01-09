import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import blankcustomer from "../Images/blankcustomer.jpg";
import { NavLink } from "react-router-dom";
// import FarmItem from "./FarmItem";
// import barn3 from "../Images/Farmer/barn3.jpg";
import styled from "styled-components";
import Wrapper from "../styling/Wrapper"; 
import Title from "../styling/Title"; 

const DashboardCustomer = props => {
  const { user } = useContext(UserContext);

  console.log("DashboardCustomer: user", user);

  return (
    <>
      <div className="Customer-LandingPage">
      <Wrapper>
        <div className="Top-Section">
          <div className="Customer-Details">
          <Title> Hello, {user.username}!</Title>
            <StyledImg
              src={user.profileImgUrl ? user.profileImgURL : blankcustomer}
              alt="customer picture"
            />
          </div>
        </div>
        <div className="Button-area">
          <NavLink to="/shopping">
            {" "}
            <button> Go Shopping </button>
          </NavLink>
        </div>
        </Wrapper>
        {/* <div className="Favorite-Area">
          <div className="Fav-Items">
            <h3> Favorite Produce: </h3>
            <FarmItem />
          </div>
          <div className="Fav-Farms">
            <h3> Favorite Farms: </h3>
            <StyledFarm src={barn3} alt="farm" />
          </div>
        </div> */}
          
      </div>
    </>
  );
};

export default DashboardCustomer;

const StyledImg = styled.img`
  height: 250px;
`;

// const StyledFarm = styled.img`
//   height: 50px;
// `;
