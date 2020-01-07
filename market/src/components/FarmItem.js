import React from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";


import blackberries from "../Images/Produce/blackberries.jpg"; 
import FarmItemDescription from "../components/FarmItemDescription.js"; 
import Axios from "axios";


// single item/product for sale   !! Mostly mock data right now. 

// farmItems setFarmItems is the App's application state.  
// cart and setCard are also states being uses. Are they application level or app.js level??


/* <button className="customer-shopping"> Add To Cart </button>

            <button className="farmer-edit-farmItem" 
                onClick={() => 
                props.history.push(`/edit-item/${item.id}`)}>
                Edit 
            </button>

            <button className="farmer-delete-farmItem" onClick={handleDelete}> Delete </button> 

            not sure how to intergrade the functionally for customer and farmer. They see different functions. */

           // line 75 not sure if routing correctly and able to make it work. Have to set up the farm name with an id? 



const FarmItem = (props) => {
    const item = props.item.find(
        produce => `${produce.id}` === props.match.params.id
    );

    if (!props.items.length || !item) {
        return <h2> Loading ... ...   </h2>; 
        // could change this to a react-spinner later
    }

    // farmer functionality 
    const handleDelete = event => {
        event.preventDefault();
        AxiosWithAuth()
        .delete(`/farmitems/${item.id}`)
        .then(res => {
            console.log("LT: FarmItem.js: handleDelete: res", res);
            props.updateFarmItems(res.data); //res.data? or res only 
            props.history.push("/farmitems-list") // not sure if that's the correct route / link to 
        })
        .catch(error => console.log("LT: FarmItem.js: handleDelete: error", error))
    };


    return (
        <div className="FarmItem-Wrapper">
            <div className="FarmItem-Header">
                <div className="image-wrapper">
                    <img src={blackberries} alt="blackberries" />
                </div> 
                    {/* end of image div  */}
                <div className="Item-Info">
                    {/* <h3> farm name and location here </h3>   */}
                    <h2> Blackberries </h2>
                    <h3>  $   </h3>
                    <h3> Amount available </h3>
                </div>
            </div>
                {/* end of farmItem Header  */}
            <nav className="farmItem-sub-nav">
                <NavLink exact to={`/farmitem-list/${item.id}`}>
                    Details 
                </NavLink>
                <NavLink exact to={`/farms/`}>  
                    About the Farm 
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