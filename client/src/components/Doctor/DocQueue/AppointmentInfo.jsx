import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import calculateAge from "../../my-functions/calculateAge";

function AppointmentInfo() {
  const { backendData } = useOutletContext();

  const [currentlyServing, setCurrentlyServing] = useState();

  const fetchAppointmentData = async (appointmentId, method, appointedFor) => {
    const response = await axios.get(
      `/doctor-get-appointment/${appointmentId}/${method}/${appointedFor}`
    );

    setCurrentlyServing(response.data.appointment);
  };
  useEffect(() => {
    if (backendData.currentlyServing.length > 0) {
      // setCurrentlyServing(backendData.currentlyServing[0]);
      fetchAppointmentData(
        backendData.currentlyServing[0].appointment_id,
        backendData.currentlyServing[0].method,
        backendData.currentlyServing[0].appointedfor
      );
    } else {
      setCurrentlyServing(null);
    }
  }, [backendData.currentlyServing]);

  console.log(currentlyServing);
  return (
    <div>
      <h2>Appointment Info</h2>
      <div className="queue appointment-info">
        <div>
          <p>Name:</p>
          <p>
            {!currentlyServing
              ? "---"
              : `${currentlyServing.lastname}, ${currentlyServing.firstname}${
                  currentlyServing.middlename &&
                  `, ${currentlyServing.middlename}`
                }${currentlyServing.suffix && `, ${currentlyServing.suffix}`}`}
          </p>
        </div>
        <div>
          <p>Appointment ID:</p>
          <p>{!currentlyServing ? "---" : currentlyServing.id}</p>
        </div>
        <div>
          <p>Sex:</p>
          <p>{!currentlyServing ? "---" : currentlyServing.sex}</p>
        </div>
        <div>
          <p>Birthdate:</p>
          <p>
            {!currentlyServing
              ? "---"
              : dayjs(currentlyServing.birthdate, "YYYY-MM-DD").format(
                  "MMMM DD, YYYY"
                )}
          </p>
        </div>
        <div>
          <p>Age:</p>
          <p>
            {!currentlyServing
              ? "---"
              : calculateAge(currentlyServing.birthdate)}
          </p>
        </div>
        <div>
          <p>Department:</p>
          <p>{!currentlyServing ? "---" : currentlyServing.department_name}</p>
        </div>
        <div>
          <p>Service:</p>
          <p>{!currentlyServing ? "---" : currentlyServing.service_name}</p>
        </div>
        <div>
          <p>Time:</p>
          <p>
            {!currentlyServing
              ? "---"
              : dayjs(currentlyServing.appointmenttime, "HH:mm:ss").format(
                  "hh:mm A"
                )}
          </p>
        </div>
        <div>
          <p>Date:</p>
          <p>
            {!currentlyServing
              ? "---"
              : dayjs(currentlyServing.appointmentdate, "YYYY=MM-DD").format(
                  "MMMM DD, YYYY"
                )}
          </p>
        </div>

        <div>
          <p>Appointment Type:</p>
          <p>{!currentlyServing ? "---" : currentlyServing.method}</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfo;
