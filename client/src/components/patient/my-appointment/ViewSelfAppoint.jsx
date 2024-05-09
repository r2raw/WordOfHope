import React from "react";
import removeCityOfPrefix from "../../my-functions/removeCityOfPrefix";
import calculateAge from "../../my-functions/calculateAge";
import calculateAgeInDays from "../../my-functions/calculateAgeInDays";
import calculateAgeInMonths from "../../my-functions/calculateAgeInMonths";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
function ViewSelfAppoint(props) {
    const  {backendData} = useOutletContext()
  const {
    id,
    type,
    firstname,
    middlename,
    lastname,
    suffix,
    street,
    barangay,
    city,
    province,
    zip,
    birthdate,
    reason,
    service,
    appointmentdate,
    appointmenttime,
  } = props.appointment;

  const patientName = `${firstname}${
    middlename && ` ${middlename}`
  } ${lastname}${suffix && ` ${suffix}`}`;
  const patientAddress = `${street} ${barangay}, ${removeCityOfPrefix(
    city
  )}, ${province}, ${zip}`;
  const ageInYears = calculateAge(birthdate);
  const ageInMonths = calculateAgeInMonths(birthdate);
  const ageInDays = calculateAgeInDays(birthdate);
  return (
    <div className="appointment-details">
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Appointment ID:</h4>
          <p>{id}</p>
        </div>
        <div className="details-partition">
          <h4>Appointment Type:</h4>
          <p>{type}</p>
        </div>
        <div className="details-partition">
          <h4>Patient Name:</h4>
          <p>{patientName}</p>
        </div>
        <div className="details-partition">
          <h4>Address:</h4>
          <p>{patientAddress}</p>
        </div>
        <div className="details-partition">
          <h4>Birthdate:</h4>
          <p>{dayjs(birthdate).format("MMMM DD, YYYY - dddd")}</p>
        </div>
        <div className="details-partition">
          <h4>Age:</h4>
          <p>
            {ageInYears > 0
              ? `${ageInYears} Year${ageInYears > 1 ? "s" : ""} old`
              : ageInMonths > 0
              ? `${ageInMonths} Month${ageInMonths > 1 ? "s" : ""} old`
              : `${ageInDays} Day${ageInDays > 1 ? "s" : ""} old`}
          </p>
        </div>
        <div className="details-partition">
          <h4>Reason for visit:</h4>
          <p>{reason}</p>
        </div>
        <div className="details-partition">
          <h4>Service:</h4>
          <p>
            {backendData.services.map(
              (i) => i.id === parseInt(service) && i.service_name
            )}
          </p>
        </div>
        <div className="details-partition">
          <h4>Scheduled Date:</h4>
          <p>{dayjs(appointmentdate).format("MMMM DD, YYYY - dddd")}</p>
        </div>
        <div className="details-partition">
          <h4>Time:</h4>
          <p>{dayjs(appointmenttime, "HH:mm:ss").format("hh:mm A")}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewSelfAppoint;
