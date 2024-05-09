
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function AppointmentInfo() {
  const { backendData } = useOutletContext();

  const [currentlyServing, setCurrentlyServing] = useState({});
  useEffect(() => {
    if (backendData.currentlyServing.length > 0) {
      setCurrentlyServing(backendData.currentlyServing[0]);
    }
  }, [backendData.currentlyServing]);

  return (
    <div>
      <h2>Appointment Info</h2>
      <div className="queue appointment-info">
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
        <div>
          <p>Name:</p>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfo;
