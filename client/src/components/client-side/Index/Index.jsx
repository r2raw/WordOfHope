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
              Welcome to Hope General Hospital, the pioneer 'Born Again'
              Christian Hospital in the Philippines, serving one of Metro
              Manila's most underserved communities. Committed to the highest
              standards of care, our dedicated professionals uphold integrity,
              compassion, and excellence in all we do. Supported primarily by
              generous contributions from compassionate individuals, we strive
              to deliver holistic healthcare services to all, guided by our
              mission to serve God and humanity.
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
              <Link to={user ? `About` : `About`}>
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
