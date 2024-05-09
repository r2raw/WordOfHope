import React from "react";
import { useOutletContext } from "react-router-dom";
import dayjs from 'dayjs'
function ReceptNurseReports() {
  const { backendData } = useOutletContext();
  return (
    <div className="nurse reports">
      <div className="report">
        <h3>Today Appointment</h3>
        <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
        <h1>{backendData.appointmentsToday.length}</h1>
      </div>
      <div className="report">
        <h3>Today Patients</h3>
        <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
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
  );
}

export default ReceptNurseReports;
