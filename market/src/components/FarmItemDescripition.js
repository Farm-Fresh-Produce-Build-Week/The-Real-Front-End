// each farm item's description 

import React from "react";

const FarmItemDescription = (props) => {
    return (
        <div className="farmitem-description">
            <p className="farmitem-blurb">
                {/* May have to take this out, otherwise set it up for every item we have set up for mockdata and what the farmer adds? */}
                These fresh blackberries are antioxidant, very high in ellagic acid and all around a major super food.  Enjoy within 5 days of pick up,
                or freeze! Great for pies, jams, jellies and your breakfast smoothies.  They are packaged in 1/2 pint sizes equal to about 8 oz. 
            </p>
        </div>
    )
}

export default FarmItemDescripition; 