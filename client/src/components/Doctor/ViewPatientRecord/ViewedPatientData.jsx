import React from "react";
import calculateAge from "../../my-functions/calculateAge";
import dayjs from "dayjs";
import logowoh from "../../my-images/hopeImgs/hope-logo.png";
function ViewedPatientData(props) {
  const { patient, diagnosis } = props;

  const fullname = `${patient.lastname}, ${patient.firstname}${
    patient.middlename && `, ${patient.middlename}`
  }${patient.suffix && `, ${patient.suffix}`}`;

  const fullAddress = `${patient.street}, ${patient.barangay}, ${patient.city}, ${patient.province}, ${patient.zip}`;
  const docName = `${patient.doc_lastname}, ${patient.doc_firstname}${
    patient.doc_middlename && `, ${patient.doc_middlename}`
  }${patient.doc_suffix && `, ${patient.doc_suffix}`}`;
  return (
    <div className="card">
      <div
        className=" viewed-patient-record"
        id="actual-patient-record"
        style={{ backgroundColor: "white" }}
      >
        <div className="result-header">
          <div>
          </div>
          <div>
            <h1>Word Of Hope General Hosital</h1>
            <h3>#23 BUENAR ST. NOVALICHES, QUEZON CITY TEL: 289301622</h3>
            <h1>Test Result - {patient.service_type}</h1>
            <h3>Record ID: {patient.id}</h3>
          </div>
          <div>
            <img src={logowoh} alt="logo" /></div>
        </div>
        <div className="information">
          <h2>Patient Information</h2>
          <hr />
          <div>
            <div>
              <h3>
                Patient ID: <span>{patient.patient_id}</span>
              </h3>
              <h3>
                Patient Name: <span>{fullname}</span>
              </h3>
              <h3>
                Address: <span>{fullAddress}</span>
              </h3>
              <h3>
                Phone: <span>{patient.phone}</span>
              </h3>
              <h3>
                Age: <span>{calculateAge(patient.birthdate)}</span>
              </h3>
              <h3>
                Sex: <span>{patient.sex}</span>
              </h3>
            </div>
            <div>
              <h3>
                Date of Visit:{" "}
                <span>
                  {dayjs(patient.date_visit).format("MMMM DD, YYYY - dddd")}
                </span>
              </h3>
              <h3>
                Healthcare Provider: <span>Dr. {docName}</span>
              </h3>
              <h3>
                Department: <span>{patient.department_name}</span>
              </h3>
              <h3>
                Service: <span>{patient.service_name}</span>
              </h3>
            </div>
          </div>
        </div>
        <div>
          <h2>Assessment Result</h2>
          <hr />
          <h3>Diagnosis</h3>
          <ul style={{ padding: "20px" }}>
            {diagnosis.map((i, index) => (
              <li key={index}>
                <p className="diagnosis">{i}</p>
              </li>
            ))}
          </ul>
          {patient.doctor_comment && <h3>Comment</h3>}
          <p className="diagnosis">{patient.doctor_comment}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewedPatientData;
