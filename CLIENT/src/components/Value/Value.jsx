import React, { useState } from "react";
import data from "../../utils/accordion.jsx";
import "./Value.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Lottie from "lottie-react";
import AnimationData from "./animation_lmx6nlhl.json";
import { Paper } from "@mui/material";
// Demo styles, see 'Styles' section below for some notes on use.

const Value = () => {
  return (
    <Paper id="value" className="v-wrapper">
      <Paper className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div>
            <Lottie animationData={AnimationData} />
          </div>
        </div>

        {/* right */}
        <div className="flexColStart v-right">
          <span className="orangeText">Our Value</span>

          <span className="primaryText">Value We Give to You</span>

          <span className="secondaryText">
            We always ready to help by providijng the best services for you.
            <br />
            We beleive a good blace to live can make your life better
          </span>
          <Paper color="primary"  elevation={8}>
            {data?.map((x, i) => (
              <Accordion sx={{padding:"10px 50px"}} key={x.heading} transition="0.2s ease">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >
                    {x.icon} &nbsp; &nbsp; {x.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{x.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </div>
      </Paper>
    </Paper>
  );
};

export default Value;
