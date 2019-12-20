import React from "react";

const Navigation = () => {
    return (
        <>
        <div className="Navigation-Area">
            <h1> Fresh Finds Farmers Market</h1>
        </div>
        <div className="nav-bar">
            <nav>

                {/*should be navlinks or links instead of a hrefs*/}
                <a href="#"> Home </a>
                <a href="#"> Contact </a>
                <a href="#"> About Us </a>
                <a href="#"> Sign Up </a>
            </nav>
        </div>
        </>
    )
}

export default Navigation; 