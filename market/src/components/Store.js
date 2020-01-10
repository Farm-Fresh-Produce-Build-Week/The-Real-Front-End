import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { AxiosWithAuthUser } from "../utils/axiosWithAuthUser";
import { NavLink } from "react-router-dom";
import FarmItem from "./FarmItem";
import styled from "styled-components";
import Title from "../styling/Title"; 
import HeaderWrapper from "../styling/HeaderWrapper"; 
import StyledButton from "../styling/StyledButton"; 
import PStyled from "../styling/PStyled"; 
import SubTitle from "../styling/SubTitle"; 
import Wrapper from "../styling/Wrapper";

const Store = props => {
  // const {Cart} = useContext(CartContext);

  const { user } = useContext(UserContext);
  const [farmers, setFarmers] = useState();
  const [localFarmers, setLocalFarmers] = useState();
  const [localItems, setLocalItems] = useState("");

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
      let currentData = [];
      localFarmers.forEach(farmer => {
        AxiosWithAuthUser()
          .get(`farmers/${farmer.id}/inventory`)
          .then(res => {
            console.log(res);
            currentData = [...currentData, ...res.data];
            setLocalItems(currentData);
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
            <StyledButton> Dashboard </StyledButton>
        </NavLink>
        {localFarmers ? (
          <div>
            <HeaderWrapper>
            <Title>Your Local Farmers</Title>
            </HeaderWrapper>
            <Farmers>
            {localFarmers.map(farmer => (
              <div key={farmer.id}>
                <FarmerInfo>{farmer.username} - Farm #{farmer.id} - {farmer.city},{" "}
                {farmer.state} {farmer.zipCode}{" "} 
                </FarmerInfo>
                <StyledImg src={farmer.profileImgURL} alt="" />
              </div>
            ))}
            </Farmers>
          </div>
        ) : (
          <div>
            <PStyled>I'm sorry there are no farms available in the city of {user.city} </PStyled>
          </div>
        )}
        <div className="produce-listings">
          {/* should just be the list of produce pulled from the api */}
          {localItems && (
            <div>
              <HeaderWrapper> 
              <Title>Local Produce for Sale</Title>
              </HeaderWrapper>
              <StyledItems className="Item-List">
                {localItems.map(item => {
                  return <FarmItem key={item.name} item={item} />;
                })}
              </StyledItems>
            </div>
          )}
        </div>
        </div>
    </>
    );
};

export default Store;

const StyledImg = styled.img`
  height: 4rem;
  margin: auto;
  padding: .25rem; 
`;

const FarmerInfo = styled(PStyled)`
font-size: 1.25rem; 
`

const Farmers = styled(Wrapper)`
width: 50%; 
`

const StyledItems = styled.div`
display: flex;
width: 75%;
margin: auto;
justify-content: center;
align-items: center;
flex-flow: wrap;
`


