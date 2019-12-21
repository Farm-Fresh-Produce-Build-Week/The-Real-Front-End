// single item/product for sale   !! Mostly mock data right now. 

// farmItems setFarmItems is the App's application state.  

import React from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios"; or   // import axiosWithAuth from "../utils/axiosWithAuth";

import FarmItemDescription from "../FarmItemDescription.js";
import blackberries from "../../Images/Produce/blackberries.jsp"; 
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";

const FarmItem = (props) => {
    const item = props.item.find(
        thing => `${thing.id}` === props.match.params.id
    );

    if (!props.items.length || !item) {
        return <h2> Loading Items  </h2>; 
        // could change this to a react-spinner later
    }

    // farmer functionality 
    const handleDelete = event => {
        event.preventDefault();
        AxiosWithAuth()
        .delete(`/farmitems/${item.id}`)
        .then(res => {
            console.log("LT: FarmItem.js: handleDelete: res". res);
            props.updateFarmItems(res.data); //res.data? or res only 
            props.history.push("/farmitems-list") // not sure if that's the correct route / link to 
        })
        .catch(error => console.log("LT: FarmItem.js: handleDelete: error", error))
    };

    // does ha



    return (
        <div className="Produce-Card">
            <div className="image-wrapper">
                <img src={blackberries} alt="blackberries" />
            </div>
            <div className="Item-Info">
                <h3> farm name and location here </h3>  
                <h2> Blackberries </h2>
                <h3>  $   </h3>
                <h3> Amount available </h3>
            </div>
            <div className="item-description">
                <FarmItemDescription /> 
            </div>
            {/* <button className="customer-shopping"> Add To Cart </button>
            <button className="farmer-edit-farmItem"> Edit </button> 
            <button className="farmer-delete-farmItem"> Delete </button> 
            
            not sure how to intergrade the functionally for customer and farmer */}
        </div>
    ); 

}

export default FarmItem; 