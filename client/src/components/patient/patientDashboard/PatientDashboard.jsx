import React, { useState, useEffect } from "react";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import defaultImg from "../../my-images/empImg/defaultImg.png";
import { currentDate } from "../../my-functions/CurrentDate";
import Loader from "../../Loader";
function PatientDashboard() {
  const { user } = useParams();
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
            <p className="upcoming-appointment">Upcoming apointments: 2</p>
            <p>Total apointments: 102</p>
          </div>
        </div>
      </div>

      <div className="dashboard services-header">
        <h3>Our Services</h3>
        <NavLink to={`../../../${user}/Services`}>
          <p>See all...</p>
        </NavLink>
      </div>
      <div className="services-grid">
        <div className="service-item">
          <div className="img-container">
            <img src={defaultImg} alt="img" />
          </div>
          <div>
            <h3>Laboratory</h3>
            <p>
              Provide specialized testing for specific conditions or diseases,
              such as genetic testing or microbiology services
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="img-container">
            <img src={defaultImg} alt="img" />
          </div>
          <div>
            <h3>Ultrasound</h3>
            <p>
              Used for a variety of purposes, including diagnosing medical
              conditions, monitoring pregnancies, and guiding medical
              procedures.
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="img-container">
            <img src={defaultImg} alt="img" />
          </div>
          <div>
            <h3>X-RAY</h3>
            <p>
              Used to diagnose and monitor a variety of medical conditions,
              including fractures, infections, tumors, and lung conditions.
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="img-container">
            <img src={defaultImg} alt="img" />
          </div>
          <div>
            <h3>Nephrology</h3>
            <p>
              Focuses on the diagnosis and treatment of kidney-related
              conditions and diseases.
            </p>
          </div>
        </div>
      </div>
      <h3>Upcoming Appointments</h3>
      <div className="upcoming-appointment-tbl table-container">
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Service</th>
              <th>Appointment Type</th>
              <th>Date of Appointment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doctor</td>
              <td>Service</td>
              <td>Appointment Type</td>
              <td>Date of Appointment</td>
              <td>
                <button className="view solid gr">View</button>
              </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Service</td>
              <td>Appointment Type</td>
              <td>Date of Appointment</td>
              <td>
                <button className="view solid gr">View</button>
              </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Service</td>
              <td>Appointment Type</td>
              <td>Date of Appointment</td>
              <td>
                <button className="view solid gr">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientDashboard;
