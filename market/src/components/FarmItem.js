import React from "react";
import { Route, NavLink } from "react-router-dom";
import { AxiosWithAuth } from "../utils/axiosWithAuth.js";
import FarmItemContext from "../contexts/FarmItemsContext";

import blackberries from "../Images/Produce/blackberries.jpg"; 
import FarmItemDescription from "../components/FarmItemDescription.js"; 
import Axios from "axios";


// single item/product for sale   !! Mostly mock data right now. 

// farmItems setFarmItems is the App's application state.  
// cart and setCard are also states being uses. Are they application level or app.js level??


const FarmItem = (props) => {
    const { item } = useContext(FarmItemContext);

    return (
        <div className="FarmItem-Wrapper">
            <div className="FarmItem-Header">
                <div className="image-wrapper">
                    <img src={item.productImgUrl ? item.productImgUrl: blackberries} alt="produce item" />
                </div> 
                <div className="Item-Info">
                    {/* <h3> farm name and location here </h3>   */}
                    <h2> {item.name} </h2>
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