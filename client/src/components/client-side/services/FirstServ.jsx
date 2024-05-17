import React, { useEffect } from "react";
// import frontHope from "../../my-images/hopeImgs/hope-front.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import img1 from "../../my-images/hh.png";
import img2 from "../../my-images/apt.png";
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
      <motion.div
        className="float-left"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <img src={img1} alt="img1" />
        <h1>An overview on what we offer</h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, x: 500 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          We offers a wide range of services to meet your healthcare needs. From
          diagnostic services such as lab tests and imaging, to specialized
          services in various medical fields, and general consultations with our
          experienced healthcare professionals, we are committed to providing
          comprehensive care.
        </motion.p>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 500 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Our diagnostic services include a variety of tests and procedures to
          help diagnose and monitor medical conditions.We offer specialized
          services in various medical fields. This includes services provided by
          specialists such as cardiologists, orthopedists, nephrologist, and
          more. These specialists are experts in their fields and can provide
          specialized care tailored to your needs. Our general consultation
          services offer personalized care and advice from our skilled
          healthcare professionals.
        </motion.p>
      </motion.div>
      <div className="float-right">
        <img src={img2} alt="img2" />
        <p>
          Our team is dedicated to providing high-quality care in a
          compassionate and understanding manner. Patients can easily schedule
          appointments for these services through our user-friendly system,
          ensuring convenient access to the care you deserve. We strive to make
          your healthcare experience as seamless and stress-free as possible.
        </p>
      </div>
    </div>
  );
}

export default FirstServ;
