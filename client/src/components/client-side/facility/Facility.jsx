import React, { useState, useEffect } from "react";
import ClientNav from "../ClientNav";
import Footer from "../footer/Footer";
import fac1 from "../../my-images/hopeImgs/facilities/fac1.png";
import fac2 from "../../my-images/hopeImgs/facilities/fac2.png";
import fac3 from "../../my-images/hopeImgs/facilities/fac3.png";
import fac4 from "../../my-images/hopeImgs/facilities/fac4.png";
import fac5 from "../../my-images/hopeImgs/facilities/fac5.png";
import fac6 from "../../my-images/hopeImgs/facilities/fac6.png";
import fac7 from "../../my-images/hopeImgs/facilities/fac7.png";
import fac8 from "../../my-images/hopeImgs/facilities/fac8.png";
import fac9 from "../../my-images/hopeImgs/facilities/fac9.png";
import fac10 from "../../my-images/hopeImgs/facilities/fac10.png";
import fac11 from "../../my-images/hopeImgs/facilities/fac11.png";
import fac12 from "../../my-images/hopeImgs/facilities/fac12.png";
import fac13 from "../../my-images/hopeImgs/facilities/fac13.png";
import fac14 from "../../my-images/hopeImgs/facilities/fac14.png";
import fac15 from "../../my-images/hopeImgs/facilities/fac15.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function Facility() {
  const [viewImg, setViewImg] = useState("");
  const [isImgView, setIsImgView] = useState(false);
  const imgs = [
    { src: fac1, name: "facility1" },
    { src: fac2, name: "facility2" },
    { src: fac3, name: "facility3" },
    { src: fac4, name: "facility4" },
    { src: fac5, name: "facility5" },
    { src: fac6, name: "facility6" },
    { src: fac7, name: "facility7" },
    { src: fac8, name: "facility8" },
    { src: fac9, name: "facility9" },
    { src: fac10, name: "facility10" },
    { src: fac11, name: "facility11" },
    { src: fac12, name: "facility12" },
    { src: fac13, name: "facility13" },
    { src: fac14, name: "facility14" },
    { src: fac15, name: "facility15" },
  ];

  const { inView, ref: intersectionRef } = useInView({ threshold: 0 });

  const mainControls = useAnimation();
  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView, mainControls]);

  function handleImgModal(e) {
    const source = e.target.src;
    setViewImg(source);
    setIsImgView(true);
  }

  function handleCloseView() {
    setViewImg("");
    setIsImgView(false);
  }
  return (
    <section className="facility" style={{ overflow: "hidden" }}>
      {/* <ClientNav /> */}
      <div className="facility-container">
        <div className="facility-header">
          <div>
            <h1>Our Facilities</h1>
          </div>
        </div>
        <div className="our-facilities-container" ref={intersectionRef}>
          {imgs.map((img, index) => {
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
                key={index}
                className="grid-item"
                name={img.src}
              >
                <img onClick={handleImgModal} src={img.src} alt={img.name} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <h1>Pharmacy</h1>
        <div>
          <img src={fac5} alt="pharmacy"/>
        </div>
      </div>
      {/* <Footer /> */}
      <div
        className="img-modal"
        style={{ display: isImgView ? "flex" : "none" }}
      >
        <div className="viewed-container">
          <div className="img-close" onClick={handleCloseView}>
            <CloseSharpIcon sx={{ fontSize: 40 }} />
          </div>
          {viewImg && <img src={viewImg} alt="view-fac" />}
        </div>
      </div>
    </section>
  );
}

export default Facility;
