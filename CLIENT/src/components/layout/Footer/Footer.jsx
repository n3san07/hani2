import React from "react";
import "./Footer.css";
import { Divider, Paper } from "@mui/material";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Paper className="f-wrapper">
      <Divider />

      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img className="mylogo" src="./logo.png" alt="" width={80} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">isreal,jerusalem</span>
          <div className="flexCenter f-menu">
            <BsInstagram size={25} />
            <BsTwitter size={25} />
            <BsFacebook size={25} />
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Footer;
