import React from "react";


import facebook from "../icons/PNG/facebook.png";
// import instagram from "../icons/PNG/instagram.png";
import youtube from "../icons/PNG/youtube.png";
import twitter from "../icons/PNG/twitter.png";
import linkedin from "../icons/PNG/linkedin.png";
// import phone from "../icons/PNG/phone.png";
// import mail from "../icons/PNG/mail.png";


const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="Contact">
          <h1> Contact Us</h1>
          {/* <p>
            Beetroot water spinach okra water chestnut ricebean pea catsear
            courgette summer purslane. Water spinach arugula pea tatsoi
            aubergine spring onion bush tomato kale radicchio turnip chicory
            salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow
            chickpea dandelion sorrel courgette turnip greens tigernut soybean
            radish artichoke wattle seed endive groundnut broccoli arugula.
          </p> */}
        </div>
      </div>
      <div  className="SocialMedia">
        <img style={{paddingRight: "10px" }} src={facebook} alt="facebook icon" />
        {/* <img src={instagram} alt="instagram icon" /> */}
        <img style={{paddingRight: "10px" }} src={twitter} alt="twitter icon" />
        {/* <img src={mail} alt="email" /> */}
        <img style={{paddingRight: "10px" }} src={youtube} alt="youtube icon" />
        {/* <img src={phone} alt="phone" /> */}
        <img src={linkedin} alt="linkedin" />
      </div>
      <div className="Credits">
        <p><strong>&#9400; 2020 Fresh Finds Farmers Market</strong></p>
      </div>
    </>
  );
};

export default Footer;
