import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
function QueueAppointmentInfo(props) {
  const { foundAppointment } = props;
  const [appointmentDetails, setAppointmentDetails] = useState();
  const [successful, setSuccessful] = useState(false);
  const userAppointment = useCallback(() => {
    fetchUserAppointment();
  }, [foundAppointment]);

  const thirdPartyAppointment = useCallback(() => {
    fetchThirdPartyAppointment();
  }, [foundAppointment]);
  const fetchUserAppointment = async () => {
    try {
      const response = await axios.get(
        `/fetchUserAppointment/${foundAppointment.id}`
      );

      setAppointmentDetails(response.data.userappointment);
    } catch (error) {
      console.error("fetch user appointment error: " + error.message);
    }
  };

  const fetchThirdPartyAppointment = async () => {
    try {
      const response = await axios.get(
        `/fetchThirdPartyAppointment/${foundAppointment.id}`
      );

      setAppointmentDetails(response.data.userappointment);
    } catch (error) {
      console.error("fetch user appointment error: " + error.message);
    }
  };
  useEffect(() => {
    if (foundAppointment) {
      if (foundAppointment.method === "Online") {
        if (foundAppointment.appointedfor === "Self") {
          return userAppointment();
        } else {
          return thirdPartyAppointment();
        }
      } else {
      }
    }
  }, [foundAppointment]);

  const handleAddToQueue = async () => {
    const response = await axios.post(`/Add-Queue/${appointmentDetails.id}`);

    if (response.data.status === "success") {
      setSuccessful(true);
      setAppointmentDetails(null);
      return ;
    }
  };

  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        setSuccessful(false);
      }, 3000);
    }
  }, [successful]);
  return (
    <div className="queue appointment-info">
      <div>
        <h4>Patient name: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : `${appointmentDetails.lastname}, ${appointmentDetails.firstname}${
                appointmentDetails.middlename &&
                `, ${appointmentDetails.middlename}`
              }${
                appointmentDetails.suffix && `, ${appointmentDetails.suffix}`
              }`}
        </p>
      </div>
      <div>
        <h4>Appointment ID: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : appointmentDetails.id}
        </p>
      </div>
      <div>
        <h4>Appointment type: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : appointmentDetails.method}
        </p>
      </div>
      <div>
        <h4>Date: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : dayjs(appointmentDetails.appointmentdate).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div>
        <h4>Time: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : dayjs(appointmentDetails.appointmenttime, "HH:mm:ss").format(
                "hh:mm A"
              )}
        </p>
      </div>
      <div>
        <h4>Department: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : appointmentDetails.department_name}
        </p>
      </div>
      <div>
        <h4>Service: </h4>
        <p>
          {!foundAppointment || !appointmentDetails
            ? "---"
            : appointmentDetails.service_name}
        </p>
      </div>
      <div>
        <button
          className="solid submit fade"
          disabled={!appointmentDetails}
          onClick={handleAddToQueue}
        >
          Add to queue
        </button>
      </div>
      {successful && <p className="success">Added to queue</p>}
    </div>
  );
}

export default QueueAppointmentInfo;
