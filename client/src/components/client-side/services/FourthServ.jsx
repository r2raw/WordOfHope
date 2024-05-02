import React, { useEffect } from "react";

import img5 from "../../my-images/hopeImgs/specialize/spec-opthomology.jpg";
import img6 from "../../my-images/hopeImgs/specialize/spec-pediatric.jpg";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
function FourthServ() {
  const { inView, ref: intersectionRef } = useInView({ threshold: 0 });

  const mainControls = useAnimation();
  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [inView, mainControls]);

  return (
    <div className="fourth-serv" ref={intersectionRef}>
      <div className="fourth-serv-header">
        <div className="cont">
          <h1>General Consultation</h1>
        </div>
      </div>
      <div className="general-service">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -500 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="general-card"
        >
          <img src={img5} alt="General Health Concern" />
          <h1>General Health Concern</h1>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 500 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="generals-card"
        >
          <img src={img6} alt="ultrasound" />
          <h1>Pre-Employment Health Check</h1>
        </motion.div>
      </div>
    </div>
  );
}

export default FourthServ;
