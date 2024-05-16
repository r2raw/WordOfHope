import React from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link } from "react-router-dom";
function ViewedPatientRecord() {
  return (
    <div className="admin-element">
      <div className="back-button">
        <Link to="../Patient-Record">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      ViewedPatientRecord
    </div>
  );
}

export default ViewedPatientRecord;
