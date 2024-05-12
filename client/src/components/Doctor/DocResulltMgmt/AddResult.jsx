import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useOutletContext } from "react-router-dom";
import DiagnosisPatientInfo from "./DiagnosisPatientInfo";
import DiagnosisPatientAddress from "./DiagnosisPatientAddress";
import DiagnosisPatientService from "./DiagnosisPatientService";
import DiagnosisRadioBtn from "./DiagnosisRadioBtn";
import suffix from "../../my-functions/Suffixes";
function AddResult() {
  const { backendData } = useOutletContext();
  const [isCurrentlyServing, setIsCurrentlyServing] = useState("false");
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    sex: "",
    birthdate: "",
    email: "",
    phone: "",
    street: "",
    province: "Metro-Manila",
    barangay: "",
    zip: "",
    service:"",
    date_of_visit: "",
  });

  const handleRadio = (e)=>{
    const {value} = e.target;
    setIsCurrentlyServing(value)
  }


  useEffect(() => {}, [isCurrentlyServing]);

  return (
    <div className="admin-element diagnosis">
      <div className="back-button">
        <Link to="../Result-Management">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <h1>Diagnosis</h1>
      {backendData.currentlyServing.length > 0 && (
        <DiagnosisRadioBtn isCurrentlyServing={isCurrentlyServing} handleRadio={handleRadio} />
      )}
      <form className="card">
        <h3>Patient Information</h3>
        <DiagnosisPatientInfo />
        <h3>Patient Address</h3>
        <DiagnosisPatientAddress />
        <h3>Service</h3>
        <DiagnosisPatientService />
      </form>
    </div>
  );
}

export default AddResult;
