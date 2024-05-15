import React, { useState } from "react";
import dayjs from "dayjs";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { Link, useOutletContext } from "react-router-dom";
import SchedTable from "./SchedTable";
function EmployeeSched() {
  return (
    <div className="admin-element">
      <h1>Employee Schedule</h1>
      <SchedTable />
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