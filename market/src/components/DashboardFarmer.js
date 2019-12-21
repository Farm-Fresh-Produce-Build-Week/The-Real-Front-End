import React from "react";

import farmer3 from "../../Images/Farmer/farmer3.jpg";
import starfull from "../icons/PNG/starfull.png";
import starhalf from "../icons/PNG/starhalf.png"; 
import starempty from "../icons/PNG/starempty.png";

const  DashboardFarmer = (props) => {
  return (
    <>
      <div className="FarmerLandingPage">
        <div className="Top-Section">
          <div className="Farmer-Details">
            <img src={farmer3} alt="mockfarmer" />
            <h1> Farmer Joe </h1>  
          </div> 
          <div className="ratings-area">
            <h3> Your Farm Rating: </h3>
              <div className="stars-rating">
                <img src={starfull} alt="star-full" />
                <img src={starfull} alt="star-full" />
                <img src={starfull} alt="star-full" />
                <img src={starhalf} alt="star-half" />
                <img src={starempty} alt="star-empty" />
              </div> 
          </div> 
          <div className="button-area">
            <button> Add Items to Sell </button>
                {/* sends to another component not named yet..  */}
            <button> Farm Details </button>
                {/* dead button may add page for fun later  */}
          </div> 
        </div> 

        <div className="Sale-Section">
          <div className="Items-For-Sale" />
          {/* Throw is in A) <itemlistcomponent /> that lists over each item for sale  B) a <itemcomponent /> of mock data?   */}
        </div>
            {/* end of sale-section */}
        
      </div> 
          {/* end of DashboardFarmer */}
      </>
  );
};

export default DashboardFarmer;
