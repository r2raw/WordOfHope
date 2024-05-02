import React from "react";
import EmpHeader from "../../header/EmpHeader";
import AdminNav from "../../admin-nav/AdminNav";
import { currentDate } from "../../../my-functions/CurrentDate";
import { useOutletContext } from "react-router-dom";
import _ from "lodash";
import { titleCase } from "title-case";

function AdminDashboard() {
  const {backendData} = useOutletContext()
  const attndnce = [
    {
      id: 1,
      lastname: "Baler",
      firstname: "Kimberly",
      in: "10:00: AM",
      out: " 10:00:00 PM",
      status: "Late",
    },
    {
      id: 2,
      lastname: "Marte",
      firstname: "Arturo",
      in: "8:00: AM",
      out: "10:00:00 PM",
      status: "On-Time",
    },
    {
      id: 3,
      lastname: "Galban",
      firstname: "Maria",
      in: "1:00: PM",
      out: "9:00:00 PM",
      status: "Late",
    },
    {
      id: 4,
      lastname: "Umali",
      firstname: "Sophia",
      in: "7:00: AM",
      out: "3:00:00 PM",
      status: "Late",
    },
    {
      id: 5,
      lastname: "Sanchez",
      firstname: "Kimmy",
      in: "12:00: PM",
      out: "5:00:00 PM",
      status: "Late",
    },
  ];
  return (
    <div className="admin-element">
        <div className="greetings">
          <div>
            <h1>Hello, {backendData.user[0].sex === "Male" ? "Mr." : "Ms."} {titleCase(_.lowerCase(backendData.user[0].lastname))}!</h1>
            <h4>Have a nice day at work</h4>
          </div>
          <h4>{currentDate()}</h4>
        </div>
        <h1>Reports</h1>
        <div className="attendance-monitor">
          <div className="attendance-result">
            <h2>ON TIME</h2>
            <h1>10</h1>
          </div>
          <div className="attendance-result">
            <h2>LATE</h2>
            <h1>10</h1>
          </div>
          <div className="attendance-result">
            <h2>ABSENT</h2>
            <h1>10</h1>
          </div>
        </div>
        <h1>Attendance</h1>
        <div className="attendance-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Time-in</th>
                <th>Time-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attndnce.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.in}</td>
                    <td>{item.out}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default AdminDashboard;
