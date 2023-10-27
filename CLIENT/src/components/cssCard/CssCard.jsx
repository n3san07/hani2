import React from "react";
import "./Card.css";

export const CssCard = ({ name, price, detail, image }) => {
  return (
    <div className="flexColStart r-card">
      <img loading="lazy" style={{width:"230px",height:"230px"}} src={image} alt="house" />

      <span className="secondaryText r-price">
        <span style={{ color: "orange",paddingRight:"5px" }}>&#8362;</span>
        <span>{Intl.NumberFormat().format(price)}</span>
      </span>
      <span className="primaryText">{name}</span>
      <span className="secondaryText">{detail}</span>
    </div>
  );
};


