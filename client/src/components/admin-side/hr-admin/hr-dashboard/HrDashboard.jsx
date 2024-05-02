import React from "react";
import EmpHeader from "../../header/EmpHeader";
import { HRNav } from "../../admin-nav/AdminNav";
import { currentDate } from "../../../my-functions/CurrentDate";
import { useOutlet, useOutletContext, Link } from "react-router-dom";
import dayjs from "dayjs";
function HrDashboard() {
  const { backendData } = useOutletContext();

  console.log(backendData);
  const userInfo = backendData.user[0];
  return (
    <div className="admin-element">
      <div className="dashboard greetings">
        <div>
          <h1>{`Hello, ${userInfo.sex === "Male" ? `Mr.` : `Ms.`} ${
            userInfo.lastname
          }`}</h1>
          <h3>Have a nice day at work!</h3>
        </div>
        <h3>{currentDate()}</h3>
      </div>
      <h3>Reports</h3>
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
      <h3>Attendance</h3>
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
            {backendData.employeeAttendance.slice(0, 5).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.empid}</td>
                  <td>{item.lastname}</td>
                  <td>{item.firstname}</td>
                  <td>{dayjs(item.arrival).format("hh:mm A")}</td>
                  <td>
                    {item.departure && dayjs(item.departure).format("hh:mm A")}
                  </td>
                  <td>
                    <p
                      style={
                        item.status === "Early" || item.status === "On-Time"
                          ? earlyOntime
                          : item.status === "Unscheduled"
                          ? Unscheduled
                          : Late
                      }
                    >
                      {item.status}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          <Link to="../Attendance">
            <p>
              See more...
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;

const earlyOntime = {
  backgroundColor: "#4fbc46",
  borderRadius: "20px",
  color: "white",
  width: "fit-content",
  paddingInline: "10px",
};

const Unscheduled = {
  backgroundColor: "rgb(143, 143, 143)",
  borderRadius: "20px",
  color: "white",
  width: "fit-content",
  paddingInline: "10px",
};

const Late = {
  backgroundColor: "#ffa319",
  borderRadius: "20px",
  color: "white",
  width: "fit-content",
  paddingInline: "10px",
};
