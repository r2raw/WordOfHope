import React, {useState, useEffect} from "react";
import imglogo from "../../my-images/hopeImgs/hope-logo.png";
import ViewThirdPartyAppointment from "./ViewThirdPartyAppointment";
import ViewSelfAppointment from "./ViewSelfAppointment";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";

function ScannedQr() {
  const [backendData, setBackendData] = useState();
  const [loading, setLoading] = useState(true);
  const { qr } = useParams();

  useEffect(() => {
    axios
      .get("/ViewAppointment/" + qr)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  }, [qr]);

 useEffect(()=>{
  if(backendData){
    setLoading(false)
  }
 },[backendData])

 if (loading) return <Loader />

//  const qrImagePath = require(`../../my-images/qr-codes/${backendData.appointment.qrcode}.png`);
 const qrImagePath = `http://localhost:5000/qrImgs/${backendData.appointment.qrcode}.png`
 const appointedFor = backendData.appointment.appointedfor;

  return (
    <div>
      <div className="viewed-qr">
        <div className="company-info">
          <div className="img-container">
            <img src={imglogo} alt="logo" />
          </div>
          <div className="header-details">
            <h1>Word Of Hope General Hosital</h1>
            <h4>#23 BUENAR ST. NOVALICHES, QUEZON CITY</h4>
            <h4> TEL: 289301622</h4>
            <h2>Summary of Appointment Details</h2>
          </div>
          
          <div className="qr-details">
            <img src={qrImagePath} alt="qr-code" />
          </div>
        </div>
        {appointedFor === "Self" ? <ViewSelfAppointment  appointment={backendData.appointment} /> : <ViewThirdPartyAppointment appointment={backendData.appointment} />}
        {/* <ViewThirdPartyAppointment />
        <ViewSelfAppointment /> */}
      </div>
    </div>
  );
}

export default ScannedQr;
