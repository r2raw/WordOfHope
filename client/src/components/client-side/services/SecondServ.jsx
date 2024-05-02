import React, { useEffect } from "react";
import labImg from "../../my-images/hopeImgs/diagnostic/laboratory.jpg";
import xrayImg from "../../my-images/hopeImgs/diagnostic/xray.jpg";
import ultraSoundImg from "../../my-images/hopeImgs/diagnostic/ultrasound.jpg";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
function SecondServ() {
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
    <div className="second-serv" ref={intersectionRef}>
      <div className="second-serv-header">
        <div className="cont">
          <h1>Diagnostic Services</h1>
        </div>
      </div>
      <div className="diagnostic-service">
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="diagnostic-card"
        >
          <img src={labImg} alt="laboratory" />
          <h1>Laboratory</h1>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="diagnostic-card"
        >
          <img src={ultraSoundImg} alt="ultrasound" />
          <h1>Ultrasound</h1>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="diagnostic-card"
        >
          <img src={xrayImg} alt="xray" />
          <h1>X-Ray</h1>
        </motion.div>
      </div>
    </div>
  );
}

export default SecondServ;
