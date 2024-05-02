import React from "react";
import ClientNav from "../ClientNav";
import Footer from "../footer/Footer";
import servicePic from "../../my-images/hopeImgs/serviceOffer.png";
import FirstServ from "./FirstServ";
import SecondServ from "./SecondServ";
import ThirdServ from "./ThirdServ";
import FourthServ from "./FourthServ";
function Service() {
  return (
    <section className="services" style={{ overflow: "hidden" }}>
      {/* <ClientNav /> */}
      <div className="services-container">
        <div className="services-header">
          <img src={servicePic} alt="service" />
          <div >
            <h1>SERVICES WE OFFER</h1>
          </div>
        </div>
        <FirstServ />
        <SecondServ />
        <ThirdServ /> 
        <FourthServ />  
        {/* <FirstSec />
        <SecondSec />
        <ThirdSec />
        <FourthSec /> */}
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default Service;
