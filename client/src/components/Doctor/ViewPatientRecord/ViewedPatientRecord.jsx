import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ViewedPatientData from "./ViewedPatientData";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
function ViewedPatientRecord() {
  const [recordData, setRecordData] = useState();

  const [loader, setLoader] = useState(false);
  const downloadPdf = ()=>{
    const capture = document.querySelector("#actual-patient-record")
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
      setLoader(false);
      doc.save(`${recordData.patientRecord[0].id}-${recordData.patientRecord[0].service_type}-result.pdf`)
    })
    
    
  }
  const { record_id } = useParams();
  const fetchRecordData = async () => {
    try {
      const response = await axios.get(`/view-patient-record/${record_id}`);

      if (response) {
        setRecordData(response.data);
      }
    } catch (error) {
      console.error("fetchRecordData ERROR: " + error.message);
    }
  };
  useEffect(() => {
    fetchRecordData();
  }, []);

  console.log(recordData);
  if (!recordData) return null;
  return (
    <div className="admin-element">
      <div className="back-button">
        <Link to="../">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <ViewedPatientData
        patient={recordData.patientRecord[0]}
        diagnosis={recordData.diagnosis}
      />
      <div>
        <button className="danger solid fade" disabled={loader} onClick={downloadPdf}>
          {loader ? "Downloading" : "Download"}
        </button>
      </div>
    </div>
  );
}

export default ViewedPatientRecord;
