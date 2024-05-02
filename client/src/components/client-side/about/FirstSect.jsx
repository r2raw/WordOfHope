import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function FirstSec() {
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
    <div className="first-sec" ref={intersectionRef} id="about-us">
      <motion.p
        variants={{
          hidden: { opacity: 0, y: -500 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        The first-ever “Born Again” Christian Hospital in the Philippines, Hope General Hospital is located in one of the poorest communities in Metro Manila.
        HGH adheres to the highest quality and excellent delivery of medical services by competent, dedicated and well-trained professionals who abide by the 
        highest standard of professionalism and ethics; HGH operated mainy on contributions/donations from good samaritans in our midst. 
      </motion.p>
      <div className="missviss">
        <div className="mission">
          <motion.h3
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.75}}
          >
            Mission
          </motion.h3>

          <motion.p
            variants={{
              hidden: { opacity: 0, x: -500 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            To provide excellent and holistic healthcare services to all by
             dedicated and committed professionals all in the service 
             of God and men.
          </motion.p>
        </div>
        <div className="vision">
          <motion.h3
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay:  0.75 }}
          >
            Vision
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, x: 500 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            To be a medical institution known for delivering excellent
            healthcare by serving and meeting the holistic needs of
            people of all walks of life with compassion and core.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default FirstSec;
