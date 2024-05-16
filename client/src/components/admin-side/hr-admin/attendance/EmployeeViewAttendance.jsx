import React, { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import calculateTimeDiff from "../../../my-functions/calculateTimeDiff";
import _ from "lodash";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import calculateAttendance from "../../../my-functions/calculateAttendance";
function EmployeeViewAttendance() {
  const { attendanceId } = useParams();
  const { backendData } = useOutletContext();
  const [foundEmployee, setFoundEmployee] = useState();

  useEffect(() => {
    const findEmployee = backendData.employeeAttendance.find(
      (i) => i.id === parseInt(attendanceId)
    );
    if (findEmployee) {
      setFoundEmployee(findEmployee);
    }
  }, [attendanceId]);

  if (!foundEmployee) return null;

  const name = `${foundEmployee.lastname}, ${foundEmployee.firstname}${
    foundEmployee.middlename && `, ${foundEmployee.middlename}`
  }${foundEmployee.suffix && `, ${foundEmployee.suffix}`}`;
  const totalTime =
    foundEmployee.departure &&
    calculateAttendance(
      dayjs(foundEmployee.arrival),
      dayjs(foundEmployee.departure)
    );

  return (
    <div className="admin-element">
      <Link to="../Attendance" style={{ width: "autofit" }}>
        <ArrowBackSharpIcon />
      </Link>
      <h1>Employee: {foundEmployee.empid}</h1>
      <div className="card employee-attendance-view">
        <h1>Status: {foundEmployee.status} </h1>
        <h3>Name: {name} </h3>
        <h3>Department: {foundEmployee.department_name} </h3>
        <h3>Position: {foundEmployee.position_name} </h3>
        <div>
          <div>
            <h2>Arrival</h2>
            <div className="attendance-img">
              <img
                src={`http://localhost:5000/attendanceImg/${foundEmployee.arrivalimg}`}
                alt="arrival-image"
              />
            </div>
            <h3>
              Time:{" "}
              {dayjs(foundEmployee.arrival).format("MM/DD/YYYY - hh:mm A")}
            </h3>
          </div>
          <div>
            <h2>Departure</h2>
            <div className="attendance-img">
              {foundEmployee.departureimg && (
                <img
                  src={`http://localhost:5000/attendanceImg/${foundEmployee.departureimg}`}
                  alt="arrival-image"
                />
              )}
            </div>
            <h3>
              Time:{" "}
              {foundEmployee.departure &&
                dayjs(foundEmployee.departure).format("MM/DD/YYYY - hh:mm A")}
            </h3>
          </div>
        </div>
        <h1>
          Total time:{" "}
          {foundEmployee.departure && _.padStart(totalTime.hours, 2, 0)+":"}{foundEmployee.departure && _.padStart(totalTime.minutes, 2, 0)}
        </h1>
      </div>
    </div>
  );
}

export default EmployeeViewAttendance;
