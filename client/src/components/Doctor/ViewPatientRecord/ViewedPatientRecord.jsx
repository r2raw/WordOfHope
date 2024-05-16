import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ViewedPatientData from "./ViewedPatientData";
function ViewedPatientRecord() {
  const [recordData, setRecordData] = useState();

  const {record_id} = useParams();
  const fetchRecordData = async ()=>{
    try {
      const response = await axios.get(`/view-patient-record/${record_id}`)

      if(response){
        setRecordData(response.data)
      }
    } catch (error) {
      console.error("fetchRecordData ERROR: " + error.message)
    }
  }
  useEffect(()=>{
    fetchRecordData()
  },[])

  console.log(recordData)
  if(!recordData) return null
  return (
    <div className="admin-element">
      <div className="back-button">
        <Link to="../Patient-Record">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <ViewedPatientData patient={recordData.patientRecord[0]} diagnosis={recordData.diagnosis}/>
    </div>
  );
}

export default ViewedPatientRecord;
