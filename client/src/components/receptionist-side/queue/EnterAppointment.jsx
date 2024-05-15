import React, { useState } from "react";
import QueueAppointmentInfo from "./QueueAppointmentInfo";
import { useOutletContext } from "react-router-dom";

function EnterAppointment(props) {
  const { backendData } = useOutletContext();
  const [appointmentId, setAppointmentId] = useState();
  const handleAppointmentInput = (e) => {
    const { value } = e.target;

    setAppointmentId(value);
  };
  const handleEnter = () => {
    if (appointmentId) {
      props.setAppointmentId(appointmentId);
    }
  };
  return (
    <div>
      <h2>Patient Appointment</h2>
      <div className="enter-appointment">
        <div className="input-group">
          <input
            className="card"
            type="text"
            value={appointmentId}
            onChange={handleAppointmentInput}
            required
          />
          <span className="floating-label">Appointment Id</span>
        </div>
        <button className="solid card" onClick={handleEnter}>
          Enter
        </button>
      </div>
      <QueueAppointmentInfo foundAppointment={props.foundAppointment} />
    </div>
  );
}

export default EnterAppointment;
