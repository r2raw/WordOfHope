import React, { useEffect, useState } from "react";
import EmpHeader from "../../header/EmpHeader";
import { HRNav } from "../../admin-nav/AdminNav";
import dayjs from "dayjs";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { useNavigate, useOutletContext } from "react-router-dom";
function Attendance() {
  const { backendData } = useOutletContext();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(Date.now()).format("MMMM")
  );

  const [selectedUnscheduledMonth, setSelectedUnscheduledMonth] = useState(
    dayjs(Date.now()).format("MMMM")
  );
  const currentYear = new Date().getFullYear();
  const [selectedMonthAttendance, setSelectedMonthAttendance] = useState();
  const [selectedUnscheduledMonthAttendance, setSelectedUnscheduledMonthAttendance] = useState();
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelectedMonth(value);
  };

  useEffect(() => {
    const monthlyAttendance = backendData.employeeAttendance.filter(
      (attendance) =>
        dayjs(attendance.arrival).format("YYYY-MMMM") ===
        `${currentYear}-${selectedMonth}`
    );

    setSelectedMonthAttendance(monthlyAttendance);
  }, [selectedMonth]);


  
  const handleUnscheduledSelectChange = (e)=>{
    
    const { value } = e.target;
    setSelectedUnscheduledMonth(value)
  }

  useEffect(() => {
    const monthlyUnscheduledAttendance = backendData.employeeAttendance.filter(
      (attendance) =>
        dayjs(attendance.arrival).format("YYYY-MMMM") ===
        `${currentYear}-${selectedUnscheduledMonth}` && attendance.status ===  "Unscheduled"
    );

    setSelectedUnscheduledMonthAttendance(monthlyUnscheduledAttendance);
  }, [selectedUnscheduledMonth]);

  const handleViewClick = (i)=>{
    navigate(`${i.id}`)
  }
  return (
    <div className="admin-element">
      <h1>Attendance Log</h1>
      <div className="table-container">
        <div className="multiple-input">
          <div id="new-input-group">
            <input type="text" placeholder=" " />
            <span className="new-floating-label">Search ID</span>
          </div>
          <div id="new-input-group">
            <select
              onChange={handleSelectChange}
              value={selectedMonth}
              required
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <span className="new-floating-label">Select Month</span>
            <span className="dropdown">
              <ArrowDropDownSharpIcon />
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedMonthAttendance && selectedMonthAttendance.filter(i => i.status !== "Unscheduled").slice(0,10).map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.empid}</td>
                  <td>{i.lastname}</td>
                  <td>{i.firstname}</td>
                  <td>{i.department}</td>
                  <td>{dayjs(i.arrival).format("MM/DD/YYYY")}</td>
                  <td>{dayjs(i.arrival).format("hh:mm A")}</td>
                  <td>{i.departure && dayjs(i.departure).format("hh:mm A")}</td>
                  <td>
                    <button className="solid submit" style={buttonStyle}  onClick={()=> handleViewClick(i)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2>Unscheduled Log</h2>
      <div className="table-container">
      <div className="multiple-input">
          <div id="new-input-group">
            <input type="text" placeholder=" " />
            <span className="new-floating-label">Search ID</span>
          </div>
          <div id="new-input-group">
            <select
              onChange={handleUnscheduledSelectChange}
              value={selectedUnscheduledMonth}
              required
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <span className="new-floating-label">Select Month</span>
            <span className="dropdown">
              <ArrowDropDownSharpIcon />
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedUnscheduledMonthAttendance && selectedUnscheduledMonthAttendance.slice(0,10).map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.empid}</td>
                  <td>{i.lastname}</td>
                  <td>{i.firstname}</td>
                  <td>{i.department}</td>
                  <td>{dayjs(i.arrival).format("MM/DD/YYYY")}</td>
                  <td>{dayjs(i.arrival).format("hh:mm A")}</td>
                  <td>{i.departure && dayjs(i.departure).format("hh:mm A")}</td>
                  <td>
                    <button className="solid submit" style={buttonStyle} onClick={()=> handleViewClick(i)}>View</button>
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

export default Attendance;

const buttonStyle = {
  height: "30px",
  padding: "5px",
  display: "flex",
  alignItems: "Center",
  justifyContent: "center"
}