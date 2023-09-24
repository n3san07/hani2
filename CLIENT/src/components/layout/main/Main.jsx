import React from "react";
import Hero from "../../Hero/Hero";
import Companies from "../../Companies/Companies";
import Value from "../../Value/Value";
import Contact from "../../Contact/Contact";
import PopularResidences from "../../PopularResidences/Residencies";
const MainLayOut = () => {
  return (
    <div className="App">
      <Hero />
      <Companies />
      <PopularResidences />
      <Value />
      <Contact />
    </div>
  );
};

export default MainLayOut;
