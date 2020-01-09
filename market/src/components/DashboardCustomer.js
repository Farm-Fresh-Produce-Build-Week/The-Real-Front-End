import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import blankcustomer from "../Images/blankcustomer.jpg";
import { NavLink } from "react-router-dom";
// import FarmItem from "./FarmItem";
// import barn3 from "../Images/Farmer/barn3.jpg";
import styled from "styled-components";
import Wrapper from "../styling/Wrapper";
import Title from "../styling/Title";
import SubTitle from "../styling/SubTitle";
import StyledButton from "../styling/StyledButton";

const DashboardCustomer = props => {
  const { user } = useContext(UserContext);

  console.log("DashboardCustomer: user", user);

  return (
    <>
      <div className="Customer-LandingPage">
        <Wrapper>
          <StyledCustomer className="Top-Section">
            <div className="Customer-Details">
              <Title> Hello, {user.username}!</Title>
              <StyledImg
                src={user.profileImgUrl ? user.profileImgURL : blankcustomer}
                alt="customer picture"
              />
              <SubTitle> Member since 2019 </SubTitle>
            </div>
          </StyledCustomer>
          <StyledButtonArea className="Button-area">
            <NavLink to="/shopping">
              <StyledButton> Go Shopping </StyledButton>
            </NavLink>
          </StyledButtonArea>
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
  height: 350px;
  border-radius: 20px;
  border: 5px solid #5c9ead;
`;

// const StyledFarm = styled.img`
//   height: 50px;
// `;

const StyledCustomer = styled.div`
  width: 40%;
  justify-content: left;
  padding: 1rem;
`;

const StyledButtonArea = styled.div`
  width: 40%;
`;
