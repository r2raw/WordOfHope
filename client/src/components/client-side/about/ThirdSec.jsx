import React from "react";
// import pakners from "../../my-images/hopeImgs/"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../my-images/hopeImgs/chs.png";
import img2 from "../../my-images/hopeImgs/cclh.png";
import img3 from "../../my-images/hopeImgs/chp.png";
import img4 from "../../my-images/hopeImgs/iwc.png";
import img5 from "../../my-images/hopeImgs/nvdcbanner.png";

function ThirdSec() {
  var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    cssEase: "linear",
  };
  return (
    <div className="third-sec">
      <div className="third-header">
        <div className="cont">
          <h1>Our Partners</h1>
        </div>
      </div>
      <div className="our-partner">
        <div className="slider-container">
          <Slider {...settings}>
            <div className="slider-item">
              <img src={img1} alt="slider1" />
            </div>
            <div className="slider-item">
              <img src={img2} alt="slider2" />
            </div>
            <div className="slider-item">
              <img src={img3} alt="slider3" />
            </div>
            <div className="slider-item">
              <img src={img4} alt="slider4" />
            </div>
            <div className="slider-item">
              <img src={img5} alt="slider5" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ThirdSec;
