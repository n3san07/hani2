import React from "react";
import './Companies.css'
import { Paper } from "@mui/material";

const Companies = () => {
  return (
    <Paper className="c-wrapper">
      <div   className="paddings innerWidth flexCenter c-container">
        <img loading="lazy" src="./prologis.png" alt="" />
        <img loading="lazy" src="./tower.png" alt="" />
        <img loading="lazy" src="./equinix.png" alt="" />
        <img loading="lazy" src="./realty.png" alt="" />
      </div>
    </Paper>
  );
};

export default Companies;
