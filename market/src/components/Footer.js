import React from "react";

import facebook2 from "../icons/PNG/facebook2.png"; 
import instagram from "../icons/PNG/instagram.png";
import twitter from "../icons/PNG/twitter.png";
import phone from "../icons/PNG/phone.png";
import mail from "../icons/PNG/mail.png"; 

const Footer = () => {
    return (
        <>
        <div className="footer">
            <div className="Contact">
                <h1> Contact Us</h1>
                <p>
                Beetroot water spinach okra water chestnut ricebean pea 
                catsear courgette summer purslane. Water spinach arugula 
                pea tatsoi aubergine spring onion bush tomato kale radicchio
                turnip chicory salsify pea sprouts fava bean. Dandelion
                zucchini burdock yarrow chickpea dandelion sorrel courgette
                turnip greens tigernut soybean radish artichoke wattle
                seed endive groundnut broccoli arugula.
                </p>
            </div>
        </div>
        <div className="SocialMedia">
            <img src={facebook2} alt="facebook icon" />
            <img src={instagram} alt="instagram icon" />
            <img src={twitter} alt="twitter icon" />
            <img src={mail} alt="email" />
            <img src={phone} alt="phone" />
        </div>
        <div className="Credits"> 
            <p>
                Built with coffee, time and love by Lambda Students
            </p>
        </div>
        </>
    )
};

export default Footer; 