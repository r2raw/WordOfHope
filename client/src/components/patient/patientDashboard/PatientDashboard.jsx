import React, { useState, useEffect } from "react";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import defaultImg from "../../my-images/empImg/defaultImg.png";
import { currentDate } from "../../my-functions/CurrentDate";
import Loader from "../../Loader";
import MyUpComingAppointmentTable from "../my-appointment/MyUpComingAppointmentTable";
import labimg from "../../my-images/hopeImgs/diagnostic/laboratory.jpg";
import ultrasoundimg from "../../my-images/hopeImgs/diagnostic/ultrasound.jpg";
import xrayimg from "../../my-images/hopeImgs/diagnostic/xray.jpg";
import ent from "../../my-images/hopeImgs/diagnostic/ent.png";
import intermed from "../../my-images/hopeImgs/diagnostic/intermed.jpg";
import orth from "../../my-images/hopeImgs/diagnostic/orth.jpg";
import surg from "../../my-images/hopeImgs/diagnostic/surg.png";
import cardiology from "../../my-images/hopeImgs/specialize/spec-cardiology.jpg";
import neurology from "../../my-images/hopeImgs/specialize/spec-neurology.jpg";
import obstetrics from "../../my-images/hopeImgs/specialize/spec-obstetrics.jpg";
import optholmology from "../../my-images/hopeImgs/specialize/spec-opthomology.jpg";
import pediatrics from "../../my-images/hopeImgs/specialize/spec-pediatric.jpg";
import pulmonology from "../../my-images/hopeImgs/specialize/spec-pulomonology.jpg";
import UpcomingDashboardTable from "./UpcomingDashboardTable";
function PatientDashboard() {
  const { user } = useParams();
  const [seeMore, setSeeMor] = useState(false);
  const { backendData } = useOutletContext();
  // const [loading, setLoading] = useState(true);

  // const {user} = backendData;

  // useEffect(() => {
  //   if (backendData) {
  //     setLoading(false);
  //   }
  // }, [backendData]);

  // if (loading) return <Loader />;
  return (
    <div className="admin-element patient-dashboard">
      <div className="dashboard header">
        <div>
          <h1>{`Hello, ${backendData.user[0].lastname}`}</h1>
          <h3 className="currdate">{currentDate()}</h3>
        </div>
        <h3>How are you feeling today?</h3>
      </div>
      <div className="section-2">
        <div className="dashboard greetings">
          <div>
            <h1>Find the best service with Health Care</h1>
            <p>Book an appointment and get finest medical services</p>
          </div>
          <div className="btnContainer">
            <NavLink to={`../Book-Appointment`}>
              <button className="solid">Book an appointment.</button>
            </NavLink>
          </div>
        </div>
        <div className="appointment-analysis">
          <h2>{`${
            backendData.user[0].lastname + `, ` + backendData.user[0].firstname
          }`}</h2>
          <p>21 years old</p>
          <div>
            <p className="upcoming-appointment">
              Upcoming apointments:{" "}
              {backendData.appointments.selfAppointment.length}
            </p>
            <p>Total apointments: {backendData.mytotalAppointment}</p>
          </div>
        </div>
      </div>

      <div className="dashboard services-header">
        <h3>Our Services</h3>
        <a>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSeeMor(!seeMore);
            }}
          >
            {!seeMore ? `See all >>>` : `See Less`}
          </p>
        </a>
      </div>
      <div className="services-grid">
        {seeMore
          ? services.map((i, index) => (
              <div key={index} className="service-item">
                <div className="img-container">
                  <img src={i.imgsrc} alt={i.name} />
                </div>
                <div>
                  <h3>{i.name}</h3>
                  <p>{i.desc}</p>
                </div>
              </div>
            ))
          : services.slice(0, 4).map((i, index) => (
              <div key={index} className="service-item">
                <div className="img-container">
                  <img src={i.imgsrc} alt={i.name} />
                </div>
                <div>
                  <h3>{i.name}</h3>
                  <p>{i.desc}</p>
                </div>
              </div>
            ))}
      </div>
      <h3>Upcoming Appointments</h3>
      <UpcomingDashboardTable />
    </div>
  );
}

export default PatientDashboard;

const services = [
  {
    imgsrc: labimg,
    name: "Laboratory",
    desc: "Provide specialized testing for specific conditions or diseases, such as genetic testing or microbiology services.",
  },
  {
    imgsrc: ultrasoundimg,
    name: "Ultrasound",
    desc: " Used for a variety of purposes, including diagnosing medical conditions, monitoring pregnancies, and guiding medical procedures.",
  },
  {
    imgsrc: xrayimg,
    name: "X-Ray",
    desc: "Used to diagnose and monitor a variety of medical conditions, including fractures, infections, tumors, and lung conditions.",
  },
  {
    imgsrc: neurology,
    name: "Nephrology",
    desc: "Focuses on the diagnosis and treatment of kidney-related conditions and diseases.",
  },
  {
    imgsrc: pulmonology,
    name: "Pulmonology",
    desc: "Focuses on the diagnosis and treatment of diseases and disorders of the respiratory system, including the lungs and airways. ",
  },
  {
    imgsrc: cardiology,
    name: "Cardiology",
    desc: "Focuses on the diagnosis and treatment of heart diseases and conditions.",
  },
  {
    imgsrc: obstetrics,
    name: "OB/Gyne",
    desc: "Focuses on the health of the female reproductive system, including the uterus, ovaries, and breasts.",
  },
  {
    imgsrc: ent,
    name: "ENT",
    desc: "Focuses on the diagnosis and treatment of disorders/conditions related to the ear, nose, throat, and structures of the head and neck.",
  },
  {
    imgsrc: pediatrics,
    name: "Pediatrics",
    desc: "Focuses on the health, development, and well-being of infants, children, and adolescents.",
  },
  {
    imgsrc: orth,
    name: "Orthopedics",
    desc: "Focuses on the diagnosis, treatment, and rehabilitation of disorders and injuries of the musculoskeletal system.",
  },
  {
    imgsrc: intermed,
    name: "Internal Medicine",
    desc: "Focuses on the prevention, diagnosis, and treatment of adult diseases.",
  },
  {
    imgsrc: surg,
    name: "Surgery",
    desc: "Involves the use of operative techniques to investigate or treat various conditions or diseases.",
  },
];
