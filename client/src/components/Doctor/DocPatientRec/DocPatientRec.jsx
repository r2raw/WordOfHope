import React from "react";
import PatientRecordsTable from "./PatientRecordsTable";

function DocPatientRec() {
  return (
    <div className="admin-element">
      <h1>Patient Record</h1>
      <PatientRecordsTable />
    </div>
  );
}

export default DocPatientRec;
const patient = [
  {
    id: 1,
    lastname: "Marte",
    firstname: "Arturo",
    sex: "Female",
    age: 22,
    email: "martejrii.arturo.07172001@gmail.com",
    phone: "09294827184",
  },
  {
    id: 2,
    lastname: "Baler",
    firstname: "Kimberly",
    sex: "Female",
    age: 22,
    email: "baler.kimberly.040803@gmail.com",
    phone: "09294897184",
    userId: 2,
  },
];
