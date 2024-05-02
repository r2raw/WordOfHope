import React, { useState } from "react";
import dayjs from "dayjs";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { Link, useOutletContext } from "react-router-dom";
function EmployeeSched() {
  const { backendData } = useOutletContext();
  const { employeeSched } = backendData;
  return (
    <div className="admin-element">
      <h1>Employee Schedule</h1>
      <div className="table-container">
        <div className="multiple-input">
          <div id="new-input-group">
            <input type="text" placeholder=" " />
            <span className="new-floating-label">Search ID</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeSched.map((i, index) => {
              const name = `${i.firstname}${i.middlename && ` ${i.middlename}`} ${i.lastname}${i.suffix && ` ${i.suffix && ` ${i.suffix}`}`}`
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td>{name}</td>
                  <td>{i.department}</td>
                  <td>
                    <button className="solid submit fade" style={buttonStyle}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link to="Add-Schedule" style={{ width: "fit-content" }}>
        <button
          className="solid fade"
          style={{ marginTop: "10px", width: "300px" }}
        >
          Add Schedule
        </button>
      </Link>
    </div>
  );
}

export default EmployeeSched;
const buttonStyle = {
  height: "30px",
  padding: "5px",
  display: "flex",
  alignItems: "Center",
  justifyContent: "center"
}