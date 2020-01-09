import React, { useState, useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import { AxiosWithAuth } from "../utils/axiosWithAuth";
import { NavLink } from "react-router-dom"; 
import FarmItem from "./FarmItem"; 

const Store = () => {
  // const {Cart} = useContext(CartContext);
  const [farmers, setFarmers] = useState();


    useEffect(() => {
        AxiosWithAuth()
        .get(`/farmers`)
        .then(res => {
            console.log("Store.js: GET ALL FARMERS: ", res)
            setFarmers(res.data);
        })
        .catch(err => {
            console.log("Store.js: error", err); 
            // getting 401 error 
        }); 
    }, []); 
    console.log("Farmers:", farmers);  //undefined 


  // allFarmers.filter(farmer => customer.city === farmer.city);

  // Want to get all farmers and filter for city to match customer/user and then grab produce from farmers
  // list out all produce for sale.  make a card for each item and list over that to build out the page.

    return(
        <>
        <div className="Store-Page">
            <NavLink to="/dashboard-customer"><button> Dashboard </button></NavLink>
            <h3> Find something new to make today! </h3>
            <div className="produce-listings">
                {/* should just be the list of produce pulled from the api */}
                <FarmItem /> 
            </div>
        </div>
        </>
    )
};


export default Store;
