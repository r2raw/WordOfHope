import React, { useEffect} from "react";
// import Slider from "react-slick";
import frontHope from "../../my-images/hopeImgs/hope-front.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function SecondSec() {
  // const ref = useRef(null);
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
    <div className="second-sec" >
      <div className="second-header">
        <div className="cont">
          <h1>How We started</h1>
        </div>
      </div>
      <div className="our-story" ref={intersectionRef}>
        <motion.div 
        variants={{
          hidden: { opacity: 0, x: -500 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="img-container">
          <img src={frontHope} alt="front-hope" />
        </motion.div>
        <motion.div 
        variants={{
          hidden: { opacity: 0, x: 500 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="paragraph-container">
          <h1>Our Story</h1>
          <p>
          Hope General Hospital is privately founded missionary hospital with its origins 
          rooted in the Word of Hope Christian church. The institution was founded by 
          Dr. David A. Sobrapeña, a visionary committed to the provision of quality 
          healthcare services. The core mission of this medical center is to establish
          a healthcare facility that extends essential medical services to the under 
          priviledge segments of our society, with an unwavering commitment to excellence
          in service delivery. 
          <br></br>
          <br></br>
          This hospital primarily relies on charitable contributions and donations to 
          sustain its operation, reflecting its dedication to serving those who might 
          not otherwise have access to vital medical care. Through this philanthropic 
          exemplary, word of Hope General Hospital stands as a beacon of hope and support 
          for individuals in need of medical attention within marginalized communities, 
          ensuring that high-quality healthcare services remain accessible to all.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SecondSec;
