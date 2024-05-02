import React from "react";
import { currentDate } from "../my-functions/CurrentDate";
import dayjs from "dayjs";
function DocDash() {
  const upcomingStyle = {
    backgroundColor: "#e6db8e",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  const onGoingStyle = {
    backgroundColor: "#ffa319",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };
  const completedStyle = {
    backgroundColor: "#4fbc46",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };
  return (
    <div className="admin-element doctor-dashboard">
      <div className="dashboard greetings">
        <div>
          <h1>{`Hello, Dr. Kim`}</h1>
          <h3>Have a nice day at work!</h3>
        </div>
        <h3>{currentDate()}</h3>
      </div>
      <h3>Weekly Reports</h3>
      <div className="doctor reports">
        <div className="report today-appointment">
          <h4>Today Appointment</h4>
          <p>March 14, 2024</p>
          <h1>10</h1>
        </div>
        <div className="report today-appointment">
          <h4>Today Patients</h4>
          <p>March 14, 2024</p>
          <h1>10</h1>
        </div>
        <div className="report today-appointment">
          <h4>Total Appointments</h4>
          <p>10 Mar - 14 Mar 2024</p>
          <h1>10</h1>
        </div>
        <div className="report today-appointment">
          <h4>Total Patients</h4>
          <p>10 Mar - 14 Mar 2024</p>
          <h1>10</h1>
        </div>
      </div>
      <h3>Upcoming Appointments</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Queue No.</th>
              <th>Appointment Type</th>
              <th>Date of Appointment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.queueNo}</td>
                  <td>{i.appointmentType}</td>
                  <td>{i.date}</td>
                  <td><p 
                    style={
                      i.stats === "Ongoing"
                        ? onGoingStyle
                        : i.stats === "Upcoming"
                        ? upcomingStyle
                        : i.stats === "Completed" && completedStyle
                    }>{i.stats}</p></td>
                  <td>
                    <button className="solid submit">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocDash;

const upcomingAppointments = [
  {
    queueNo: 1,
    appointmentType: "Check-up",
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Upcoming",
  },
  {
    queueNo: 2,
    appointmentType: "Check-up",
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Upcoming",
  },
  {
    queueNo: 3,
    appointmentType: "Check-up",
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Ongoing",
  },
  {
    queueNo: 4,
    appointmentType: "Check-up",
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Ongoing",
  },
  {
    queueNo: 5,
    appointmentType: "Follow-up",
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Completed",
  },
];
