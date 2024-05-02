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

function MyAppointment() {
  // const { user } = useParams();

  const { backendData } = useOutletContext();
  // const [loading, setLoading] = useState(true);

  const [selectedAppointment, setSelectedAppointment] = useState();
  // useEffect(() => {
  //   if (backendData) {
  //     setLoading(false);
  //   }
  // }, [backendData]);
  const today = dayjs("01/12/2022").format("MMMM DD, YYYY");

  // if (loading) return <Loader />;

  const selfAppointment = backendData.appointments.selfAppointment;
  const thirdPartyAppointment = backendData.appointments.thirdPartyAppointment;

  if (selectedAppointment) {
    console.log(selectedAppointment);
    const qrImagePath = require(`../../my-images/qr-codes/${selectedAppointment.qrcode}.png`);
    return (
      <div className="admin-element">
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
            <ViewSelfAppointment appointment={selectedAppointment} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-element">
      <h1>My Appointment</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Appointment Id</th>
              <th>Date Booked</th>
              <th>Appointment Type</th>
              <th>Reason for Visit</th>
              <th>Service</th>
              <th>Scheduled Date</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {selfAppointment && selfAppointment.map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td>{dayjs(i.datebooked).format("MMMM DD, YYYY")}</td>
                  <td>{i.type}</td>
                  <td>{i.reason}</td>
                  <td>{i.service}</td>
                  <td>{dayjs(i.appointmentdate).format("MMMM DD, YYYY")}</td>
                  <td>
                    {dayjs(i.appointmenttime, "HH:mm:ss").format("hh:mm A")}
                  </td>
                  <td>
                    <button
                      className="solid submit"
                      onClick={() => {
                        setSelectedAppointment(i);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h1>Third Party Appointment</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Appointment Id</th>
              <th>Date Booked</th>
              <th>Appointment Type</th>
              <th>Reason for Visit</th>
              <th>Service</th>
              <th>Scheduled Date</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {thirdPartyAppointment && thirdPartyAppointment.map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td>{dayjs(i.datebooked).format("MMMM DD, YYYY")}</td>
                  <td>{i.type}</td>
                  <td>{i.reason}</td>
                  <td>{i.service}</td>
                  <td>{dayjs(i.appointmentdate).format("MMMM DD, YYYY")}</td>
                  <td>
                    {dayjs(i.appointmenttime, "HH:mm:ss").format("hh:mm A")}
                  </td>
                  <td>
                    <button
                      className="solid submit"
                      onClick={() => {
                        setSelectedAppointment(i);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppointment;
