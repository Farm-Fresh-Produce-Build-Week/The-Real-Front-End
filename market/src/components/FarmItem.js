import React, {useContext, useEffect, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import { FarmItemsContext } from "../contexts/FarmItemsContext";
import blackberries from "../Images/Produce/blackberries.jpg"; 
import FarmItemDescription from "../components/FarmItemDescription.js"; 
import styled from "styled-components"; 


// single item/product for sale   !! Mostly mock data right now. 

// farmItems setFarmItems is the App's application state.  
// cart and setCard are also states being uses. Are they application level or app.js level??


const FarmItem = props => {
    // const { farmer } = useContext(FarmerContext); 
    const { item } = useContext(FarmItemsContext);
    const [ farmItems, setFarmItems] = useState();


    useEffect(() => {
    AxiosWithAuth()
        .get("/produce")
        .then(res => {
        console.log("Store.js, GET ALL PRODUCE RES: ", res);
        setFarmItems(res.data);
        })
        .catch(err => console.log(err));
    }, []); 

    console.log("Store.js, farmItems: ", farmItems);



    return (
        <div className="FarmItem-Wrapper">
            <div className="FarmItem-Header">
                <div className="image-wrapper">
                    <StyledImg src={ 
                        // item.produceImgURL ? item.produceImgURL :
                        blackberries} alt="produce item" />
                </div> 
                <div className="Item-Info">
                    <h5> Item Name: {item} </h5>
                </div>
            </div>
                {/* end of farmItem Header  */}
            <nav className="farmItem-sub-nav">
                <NavLink exact to={`/shopping/${item}`}>
                    <h5>Details</h5>
                </NavLink>
                <NavLink exact to={`/farm`}>  
                    <h5>About the Farm </h5> 
                    {/* {farm.name}  ??  */}
                </NavLink>
            </nav> 
                {/* end of farmItem-sub-nav */}

            <Route exact path ="shopping/:id"
            render={props => <FarmItemDescription {...props} item={item} /> } />
            </div>
    ); 
}

export default FarmItem; 

const StyledImg = styled.img`
height: 50px; 
`