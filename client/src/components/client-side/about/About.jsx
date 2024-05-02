import React from "react";
import ClientNav from "../ClientNav";
import Footer from "../footer/Footer";
import cloud from "../../my-images/hopeImgs/cloud.png";
import FirstSec from "./FirstSect";
import SecondSec from "./SecondSec";
import ThirdSec from "./ThirdSec";
import FourthSec from "./FourthSec";  

function About() {
  return (
    <section className="about" style={{overflow: "hidden"}}>
    {/* //   <ClientNav /> */}
      <div
      className="about-container">
        <div className="about-header">
          <img src={cloud} alt="sky" />
          <h1>ABOUT US</h1>
        </div>
        <FirstSec />
        <SecondSec />
        <ThirdSec />
        <FourthSec />
      </div>
   </section>
  );
}

export default About;
