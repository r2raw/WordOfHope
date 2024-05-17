import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import MedicalRecords from "./MedicalRecords";
function MedicalHistory() {
  const { user } = useParams();

  const today = dayjs(new Date()).format("MMMM DD, YYYY")
  return (
    <div className="admin-element">
      <h1>Medical History</h1>
      <MedicalRecords />
    </div>
  );
}

export default MedicalHistory;
