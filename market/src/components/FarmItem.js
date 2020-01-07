import React, {useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
// import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import { FarmerContext } from "../contexts/FarmerContext"; 
import blackberries from "../Images/Produce/blackberries.jpg"; 
import FarmItemDescription from "../components/FarmItemDescription.js"; 
import Axios from "axios";
import styled from "styled-components"; 


// single item/product for sale   !! Mostly mock data right now. 

// farmItems setFarmItems is the App's application state.  
// cart and setCard are also states being uses. Are they application level or app.js level??


const FarmItem = props => {
    const { farmer } = useContext(FarmerContext); 
    const { item } = useContext(FarmItemsContext);
    const [ farmItems, setFarmItems] = useState();


    return (
        <div className="FarmItem-Wrapper">
            <div className="FarmItem-Header">
                <div className="image-wrapper">
                    <StyledImg src={ 
                        // item.produceImgURL ? item.produceImgURL :
                        blackberries} alt="produce item" />
                </div> 
                <div className="Item-Info">
                    {/* <h3> farm name and location here </h3>   */}
                    <h5> Item Name: {item} </h5>
                </div>
            </div>
                {/* end of farmItem Header  */}
            <nav className="farmItem-sub-nav">
                <NavLink exact to={`/shopping/${item}`}>
                    <h5>Details</h5>
                </NavLink>
                <NavLink exact to={`/farmers`}>  
                    <h5>About the Farm </h5> 
                    {/* {farm.name}  ??  */}
                </NavLink>
            </nav> 
                {/* end of farmItem-sub-nav */}

            <Route exact path ="farmitem-list/:id"
            render={props => <FarmItemDescription {...props} item={item} /> } />
            </div>
    ); 
}

export default FarmItem; 

const StyledImg = styled.img`
height: 50px; 
`