import React, { useEffect } from "react";
// import frontHope from "../../my-images/hopeImgs/hope-front.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
function FirstServ() {
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
    <div className="first-serv" ref={intersectionRef}>
      <motion.h3
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sit amet porttitor
        eget dolor. Metus aliquam eleifend mi in nulla posuere sollicitudin.
        enas volutpat blandit aliquam etiam erat velit scelerisque in. Sed sed
        risus pretium quam vulputateuere sollicituddit aliquam etiam erat velit
        scelerisque in. Sed sed risus pretium quam vulputate .
      </motion.h3>

      <motion.h3
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sit amet porttitor
        eget dolor. Metus aliquam eleifend mi in nulla posuere sollicitudin.
      </motion.h3>
    </div>
  );
}

export default FirstServ;
