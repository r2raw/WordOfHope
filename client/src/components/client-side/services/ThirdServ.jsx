import React from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./swi.css";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay
} from "swiper/modules";

import img1 from "../../my-images/hopeImgs/specialize/spec-neurology.jpg";
import img2 from "../../my-images/hopeImgs/specialize/spec-pulomonology.jpg";
import img3 from "../../my-images/hopeImgs/specialize/spec-cardiology.jpg";
import img4 from "../../my-images/hopeImgs/specialize/spec-obstetrics.jpg";
import img5 from "../../my-images/hopeImgs/specialize/spec-opthomology.jpg";
import img6 from "../../my-images/hopeImgs/specialize/spec-pediatric.jpg";
function ThirdServ() {
  return (
    <div className="third-serv">
      <div className="third-serv-header">
        <div className="cont">
          <h1>Diagnostic Services</h1>
        </div>
      </div>
      <div className="diagnostics">
        <div className="container">
          {/* <h1 className="heading">Flower Gallery</h1> */}
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 50,
              modifier: 2.5,
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            <SwiperSlide>
              <img src={img1} alt="slide_image" />
              <h1>Neurology</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="slide_image" />
              <h1>Pulmonology</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="slide_image" />
              <h1>Cardiology</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt="slide_image" />
              <h1>Obstetrics</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={img5} alt="slide_image" />
              <h1>Opthomology</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={img6} alt="slide_image" />
              <h1>Pediatrics</h1>
            </SwiperSlide>

            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
              <ArrowBackIosSharpIcon />
                
              </div>
              <div className="swiper-button-next slider-arrow">
                {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                <ArrowForwardIosSharpIcon />
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ThirdServ;
