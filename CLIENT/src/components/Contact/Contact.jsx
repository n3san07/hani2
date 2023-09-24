import React from "react";
import "./Contact.css";
import { MdCall, MdEmail, MdWhatsapp } from "react-icons/md";
import { Box,Paper } from "@mui/material";
import { BsInstagram } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import Lottie from "lottie-react";
import AnimationData from "./animation_lmx73kmg.json";
const Contact = () => {
  return (
    <Paper id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We always ready to help by providijng the best services for you. We
            beleive a good blace to live can make your life better{" "}
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">0549966867</span>
                  </div>
                </div>
                <a className="flexCenter button" href="tel:0549966867">
                  call now
                </a>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdEmail size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText">hanigat7@gmail.com</span>
                  </div>
                </div>
                <a
                  className="flexCenter button"
                  href="mailto:hanigat7@gmail.com"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdWhatsapp size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Whatsapp</span>
                    <span className="secondaryText">0549966867</span>
                  </div>
                </div>
                <a
                  className="flexCenter button"
                  href="https://api.whatsapp.com/send?phone=0549966867"
                >
                  Send Us a Message
                </a>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsInstagram size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">instagram</span>
                    <span className="secondaryText">Hani Gaith</span>
                  </div>
                </div>
                <a  className="flexCenter button"  href="instagram://user?username=hani_gaith">Our Profile</a>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div>
            <Lottie animationData={AnimationData} />
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Contact;
