import React, { useEffect, useState } from "react";
import EmpHeader from "../../header/EmpHeader";
import AdminNav from "../../admin-nav/AdminNav";
import { currentDate } from "../../../my-functions/CurrentDate";
import { useOutletContext } from "react-router-dom";
import _ from "lodash";
import { titleCase } from "title-case";
import { Zoom } from "@mui/material";
import AdminTodaysAttendanceTable from "./AdminTodaysAttendanceTable";

function AdminDashboard() {
  const { backendData } = useOutletContext();
  const [onTimeAttendance, setOnTimeAttendance] = useState();
  const [lateAttendance, setLateAttendance] = useState();
  const [unscheduledAttendance, setUnscheduledAttendance] = useState();
  const [earlyAttendance, setEarlyAttendance] = useState();
  useEffect(() => {
    setUnscheduledAttendance(
      backendData.attendancesToday.filter((i) => i.status === "Unscheduled")
    );
    setOnTimeAttendance(
      backendData.attendancesToday.filter((i) => i.status === "On-Time")
    );
    setLateAttendance(
      backendData.attendancesToday.filter((i) => i.status === "Late")
    );
    setEarlyAttendance(
      backendData.attendancesToday.filter((i) => i.status === "Early")
    );
  }, [backendData.attendanceToday]);
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

  if (
    !onTimeAttendance ||
    !lateAttendance ||
    !earlyAttendance ||
    !unscheduledAttendance
  )
    return null;
  return (
    <Zoom in={true}>
      <div className="admin-element">
        <div className="greetings">
          <div>
            <h1>
              Hello, {backendData.user[0].sex === "Male" ? "Mr." : "Ms."}{" "}
              {titleCase(_.lowerCase(backendData.user[0].lastname))}!
            </h1>
            <h4>Have a nice day at work</h4>
          </div>
          <h4>{currentDate()}</h4>
        </div>
        <h1>Reports</h1>
        <div className="attendance-monitor">
          <div className="attendance-result">
            <h2>EARLY</h2>
            <h1>{earlyAttendance.length}</h1>
          </div>
          <div className="attendance-result">
            <h2>ON TIME</h2>
            <h1>{onTimeAttendance.length}</h1>
          </div>
          <div className="attendance-result">
            <h2>LATE</h2>
            <h1>{lateAttendance.length}</h1>
          </div>
          <div className="attendance-result">
            <h2>UNSCHEDULED</h2>
            <h1>{unscheduledAttendance.length}</h1>
          </div>
          <div className="attendance-result">
            <h2>ABSENT</h2>
            <h1>{backendData.absentee.length}</h1>
          </div>
        </div>
        <h1>Attendance</h1>
        <AdminTodaysAttendanceTable />
      </div>
    </Zoom>
  );
}

export default AdminDashboard;
