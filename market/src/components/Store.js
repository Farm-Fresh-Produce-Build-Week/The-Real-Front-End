import React, {useState, useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext"; 
import { AxiosWithAuth } from "../utils/axiosWithAuth";

const Store = () => {
    // const {Cart} = useContext(CartContext); 
    const [farmers, setFarmers] = useState();

    useEffect(() => {
        AxiosWithAuth()
        .get(`/farmers`)
        .then(res => {
            console.log("Shopping.js: GET ALL FARMERS: ", res)
            setFarmers(res.data);
        })
        .catch(err => {
            console.log("Shopping.js: error", err); 
        }); 
    }, []); 
    console.log("Farmers:", farmers); 


    // allFarmers.filter(farmer => customer.city === farmer.city);

    return(
        <>
        <div ClassName="Shopping-Page">
            <h3> Find something new to make today! </h3>
        </div>
        </>
    )

}; 

export default Store;