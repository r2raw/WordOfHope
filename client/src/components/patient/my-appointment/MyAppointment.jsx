import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Loader from "../../Loader";
import ScannedQr from "../../client-side/ViewApointment/ScannedQr";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ViewedAppointmentHeader from "./ViewedAppointmentHeader";
import ViewThirdPartyAppointment from "../../client-side/ViewApointment/ViewThirdPartyAppointment";
import ViewedThirdParty from "./ViewedThirdParty";
import ViewSelfAppointment from "../../client-side/ViewApointment/ViewSelfAppointment";
import ViewSelfAppoint from "./ViewSelfAppoint";
import MyUpComingAppointmentTable from "./MyUpComingAppointmentTable";
import MyThirdPartyAppointment from "./MyThirdPartyAppointment";
import UnattendedTable from "./UnattendedTable";
function MyAppointment() {

  const { backendData } = useOutletContext();

  const [selectedAppointment, setSelectedAppointment] = useState();

  const today = dayjs("01/12/2022").format("MMMM DD, YYYY");

  console.log(selectedAppointment);
  const selfAppointment = backendData.appointments.selfAppointment;
  const thirdPartyAppointment = backendData.appointments.thirdPartyAppointment;
  if (selectedAppointment) {
    console.log(selectedAppointment);
    // const qrImagePath = require(`../../my-images/qr-codes/${selectedAppointment.qrcode}.png`);
    const qrImagePath = `http://localhost:5000/qrImgs/${selectedAppointment.qrcode}.png`;
    return (
      <div className="admin-element" id="appointment-to-pdf">
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedAppointment(null);
          }}
        >
          <ArrowBackSharpIcon sx={{ fontSize: 40 }} />
        </div>

        <div className="viewed-qr">
          <ViewedAppointmentHeader qrcode={selectedAppointment.qrcode} />
          {selectedAppointment.appointedby ? (
            <ViewedThirdParty selectedAppointment={selectedAppointment} />
          ) : (
            <ViewSelfAppoint appointment={selectedAppointment} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-element">
      <h1>My Appointment</h1>
      <MyUpComingAppointmentTable
        setSelectedAppointment={setSelectedAppointment}
      />

      <h1>Third Party Appointment</h1>
      <MyThirdPartyAppointment
        setSelectedAppointment={setSelectedAppointment}
      />

      <h1>Unnattended</h1>
      <UnattendedTable setSelectedAppointment={setSelectedAppointment} />
    </div>
  );
}

export default MyAppointment;
