// single item/product for sale   !! Mostly mock data right now. 

import React from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios"; or   // import axiosWithAuth from "../utils/axiosWithAuth";

import ProduceDescription from "../ProduceDescription.js";
import blackberries from "../../Images/Produce/blackberries.jsp"; 

const ProduceCard = (props) => {
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
                <ProduceDescription /> 
            </div>
            {/* <button className="customer-shopping"> Add To Cart </button>
            <button className="farmer-item-sell/edit"> Edit </button> 
            
            not sure how to intergrade the functionally for customer and farmer */}
        </div>
    ); 

}

export default ProduceCard; 