import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { getSwiperP } from "../../hooks/UseProperties";

// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import { CssCard } from "../cssCard/CssCard.jsx";
import { Paper } from "@mui/material";

const PopularResidences = () => {
  const { data, isError, isLoading, refetch } = getSwiperP();
  return (
    <Paper id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          {data?.map((card, i) => (
            <SwiperSlide key={i}>
              <CssCard
                name={card.title}
                detail={card.info}
                price={card.price}
                image={
                  card?.imgsUrl[0] ||
                  "https://2.bp.blogspot.com/-fmCBOi29Wmw/VuBFym8DENI/AAAAAAAA3D0/q8EkobXxQZo/s1600/cute-modern-home.jpg"
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Paper>
  );
};

export default PopularResidences;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <Paper className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </Paper>
  );
};
