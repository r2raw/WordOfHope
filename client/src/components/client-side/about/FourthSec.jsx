import React, {  useEffect } from "react";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
function FourthSec() {
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
    <div className="fourth-sec">
      <div className="fourth-header">
        <div className="cont">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="contact-us" ref={intersectionRef}>
        <div className="address">
          <h1>Location</h1>
          <div className="address-info">
            <motion.iframe
              variants={{
                hidden: { opacity: 0, scale: 2 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.25 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.88151084825!2d121.03412628597515!3d14.71929034911925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0fc77839833%3A0x955c79ff3446d452!2s23%20Buenamar%20Dr%2C%20Novaliches%2C%20Quezon%20City%2C%201117%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1710426712671!5m2!1sen!2sph"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></motion.iframe>
            <motion.div
              className="full-address"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <LocationOnSharpIcon sx={{ fontSize: 40 }} />
              <h3>
                23 Buenamar St. Buenamar Subd Nova Proper Novaliches, Quezon
                City, 1117, Philippines
              </h3>
            </motion.div>
          </div>
        </div>
        <div className="contact-info">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -500},
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="contact-grid"
          >
            <h1>Opening Hours</h1>
            <div>
              <div className="contact-detail">
                <LightModeSharpIcon sx={{ fontSize: 40 }} />{" "}
                <h3>Monday - Sunday</h3>
              </div>
              <div className="contact-detail">
                <WatchLaterSharpIcon sx={{ fontSize: 40 }} /> <h3>24 Hours</h3>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 500 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="contact-grid"
          >
            <h1>Get In Touch</h1>
            <div>
              <div className="contact-detail">
                <LocalPhoneSharpIcon sx={{ fontSize: 40 }} />{" "}
                <h3>09289301622</h3>
              </div>
              <div className="contact-detail">
                <EmailSharpIcon sx={{ fontSize: 40 }} />{" "}
                <h3>hopegeneralhospital@yahoo.com </h3>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 500 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="contact-grid"
          >
            <h1>Socials</h1>
            <div>
              <div className="contact-detail">
                <FacebookSharpIcon sx={{ fontSize: 40 }} /> <h3>Facebook</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FourthSec;
