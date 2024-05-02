import React from "react";
import {Chart as chartjs} from "chart.js/auto"
import { currentDate } from "../../my-functions/CurrentDate";
import { Doughnut, Bar } from "react-chartjs-2";
import img1 from "../../my-images/empImg/defaultImg.png";
import img2 from "../../my-images/empImg/defaultImg.png";
import img3 from "../../my-images/empImg/defaultImg.png";
import img4 from "../../my-images/empImg/defaultImg.png";
import img5 from "../../my-images/empImg/defaultImg.png";
import dayjs from "dayjs";
function ReceptDashboard() {
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
    <div className="admin-element nurse">
      <div className="dashboard greetings">
        <div>
          <h1>{`Hello, Dr. Kim`}</h1>
          <h3>Have a nice day at work!</h3>
        </div>
        <h3>{currentDate()}</h3>
      </div>
      <h3>Weekly Reports</h3>
      <div className="nurse reports">
        <div className="report">
          <h3>Today Appointment</h3>
          <p>March 14, 2024</p>
          <h1>10</h1>
        </div>
        <div className="report">
          <h3>Today Patients</h3>
          <p>March 14, 2024</p>
          <h1>10</h1>
        </div>
        <div className="report">
          <h3>Total Appointments</h3>
          <p>10 Mar - 14 Mar-2024</p>
          <h1>10</h1>
        </div>
        <div className="report">
          <h3>Total Patients</h3>
          <p>10 Mar - 14 Mar-2024</p>
          <h1>10</h1>
        </div>
        <div className="report">
          <h3>Doctor(s)</h3>
          <h1>10</h1>
        </div>
        <div className="report">
          <h3>Department(s)</h3>
          <h1>10</h1>
        </div>
      </div>
      <div className="nurse analytics reports">
        <div className="chart-container">
          <h3>Patient Visit By Department</h3>
          <div className="report">
            <Doughnut
              data={{
                labels: visitByDepartment.map((i) => i.department),
                datasets: [
                  {
                    label: "Patients",
                    data: visitByDepartment.map((i) => i.patients),
                    backgroundColor: [
                      "#008DDA90",
                      "#41C9E290",
                      "#ACE2E190",
                      "#F7EEDD90",
                      "#67C6E390",
                      "#DFF5FF90",
                      "#378CE790",
                      "#5356FF90",
                      "#1c5ca090",
                    ],
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="chart-container">
          <h3>Average Patient Visits</h3>
          <div className="report">
            <Bar
              data={{
                labels: avaragePatientVisit.map((i) => i.day),
                datasets: [
                  {
                    label: "Patients",
                    data: avaragePatientVisit.map((i) => i.patients),
                    backgroundColor: "#1c5ca090",
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="chart-container">
          <h3>Doctors</h3>
          <div className="report">
            <div className="actives">
              {activeDoctors.map((i, index) => {
                return (
                  <div className="active-docs" id="doctors" key={index}>
                    <div className="doc-info">
                      <div className="img-container">
                        <img src={i.img} alt={i.lastname} />
                      </div>
                      <div>
                        <h3>{i.department}</h3>
                        <p className="name">{`Dr. ${i.firstname} ${i.lastname}`}</p>
                      </div>
                    </div>
                    <div>
                      <p
                        style={
                          i.status === "Active" && {
                            backgroundColor: "#ace0a8",
                            borderRadius: "10px",
                            color: "white",
                            padding: "5px",
                          }
                        }
                      >
                        {i.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <h3>Upcoming Appointments</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Queue No.</th>
              <th>Room</th>
              <th>Service</th>
              <th>Appointment Id</th>
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
                  <td>{i.room}</td>
                  <td>{i.service}</td>
                  <td>{i.appointmentId}</td>
                  <td>{i.date}</td>
                  <td>
                    <p
                      style={
                        i.stats === "Ongoing"
                          ? onGoingStyle
                          : i.stats === "Upcoming"
                          ? upcomingStyle
                          : i.stats === "Completed" && completedStyle
                      }
                    >
                      {i.stats}
                    </p>
                  </td>
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

export default ReceptDashboard;

const upcomingAppointments = [
  {
    queueNo: 1,
    room: 201,
    service: "General Health Concern",
    appointmentId: 1,
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Upcoming",
  },
  {
    queueNo: 2,
    room: 201,
    service: "General Health Concern",
    appointmentId: 2,
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Upcoming",
  },
  {
    queueNo: 3,
    room: 201,
    service: "General Health Concern",
    appointmentId: 3,
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Ongoing",
  },
  {
    queueNo: 4,
    room: 201,
    service: "General Health Concern",
    appointmentId: 4,
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Ongoing",
  },
  {
    queueNo: 5,
    room: 201,
    service: "General Health Concern",
    appointmentId: 5,
    date: dayjs("03/24/2024").format("MMMM DD, YYYY - ddd"),
    stats: "Completed",
  },
];

const avaragePatientVisit = [
  {
    day: "Sun",
    patients: 120,
  },
  {
    day: "Mon",
    patients: 43,
  },
  {
    day: "Tue",
    patients: 311,
  },
  {
    day: "Wed",
    patients: 210,
  },
  {
    day: "Thu",
    patients: 145,
  },
  {
    day: "Fri",
    patients: 10,
  },
  {
    day: "Sat",
    patients: 123,
  },
];

const visitByDepartment = [
  {
    department: "Pulmonology",
    patients: 123,
  },
  {
    department: "Neurology",
    patients: 10,
  },
  {
    department: "Cardiology",
    patients: 145,
  },
  {
    department: "Pediatrics",
    patients: 245,
  },
  {
    department: "Obstetrics",
    patients: 75,
  },
];

const activeDoctors = [
  {
    firstname: "Mariz",
    lastname: "Gabriel",
    department: "Cardiology",
    status: "Active",
    img: img1,
  },
  {
    firstname: "Angela",
    lastname: "Tallon",
    department: "Pulmonology",
    status: "Active",
    img: img2,
  },
  {
    firstname: "Ann",
    lastname: "Domingo",
    department: "Pediatrics",
    status: "Active",
    img: img3,
  },
  {
    firstname: "Maria Sophia",
    lastname: "Galban",
    department: "Cardiology",
    status: "Active",
    img: img4,
  },
  {
    firstname: "Kimberly",
    lastname: "Baler",
    department: "Obstetrics",
    status: "Active",
    img: img5,
  },
];

// const totalDepartmentPatient = visitByDepartment.reduce((total, department) => total + department.patients, 0);

// console.log(totalDepartmentPatient)
