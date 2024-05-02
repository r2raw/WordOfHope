import React, { useEffect } from "react";
import ClientNav from "../ClientNav";
import Footer from "../footer/Footer";
import logo from "../../my-images/hopeImgs/hope-logo.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Link, NavLink, useParams } from "react-router-dom";
function Index() {
  // const ref = useRef(null);
  const { inView, ref: intersectionRef } = useInView({ threshold: 0 });

  const { user } = useParams();
  const mainControls = useAnimation();
  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView, mainControls]);
  return (
    <section className="index" style={{ overflow: "hidden" }}>
      {/* <ClientNav /> */}
      <div className="index-container" ref={intersectionRef}>
        <div className="blue-bg">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -500 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="paragaphs"
          >
            <h1>WORD OF HOPE GENERAL HOSPITAL</h1>
            <h2>MedInnovate Nexus Systems</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet porttitor eget dolor. Metus aliquam eleifend mi in nulla
              posuere sollicitudin. Maecenas volutpat blandit aliquam etiam erat
              velit scelerisque in. Sed sed risus pretium quam vulputate{" "}
            </p>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="index-btns"
            >
              <Link
                to={
                  user
                    ? `About`
                    : `About`
                }
              >
                <button className="outlined out-wht learn-more">
                  LEARN MORE
                </button>
              </Link>
              <Link
                to={
                  user
                    ? `../WordOfHope/Patient/${user}/Book-Appointment`
                    : `Login`
                }
              >
                <button className="solid smlBlue book-appointment">
                  BOOK APPOINTMENT
                </button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 500 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="index-logo"
          >
            <img src={logo} alt="logo" />
          </motion.div>
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default Index;
