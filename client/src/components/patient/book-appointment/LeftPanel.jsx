import React from "react";

function LeftPanel(props) {
  return (
    <div className="left-panel">
      <h1>New Appointment</h1>
      <h4>Appointment Type</h4>
      <p>{props.appointment ? props.appointment : "---"}</p>
      <h4>Specify Patient</h4>
      <p>{props.patient ? props.patient : "---"}</p>
      <h4>Reason for visit</h4>
      <p>{props.reason ? props.reason : "---"}</p>
      <h4>Service</h4>
      <p>{props.service ? props.service : "---"}</p>
      <h4>Date</h4>
      <p>{props.date ? props.date : "---"}</p>
      <h4>Time</h4>
      <p>{props.time ? props.time : "---"}</p>
      <h4>Confirmation</h4>
    </div>
  );
}

export default LeftPanel;
