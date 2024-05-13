import React from "react";

import calculateAge from "../../my-functions/calculateAge";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import removeCityOfPrefix from "../../my-functions/removeCityOfPrefix";
function AppointmentInfo(props) {
  const { backendData } = useOutletContext();
  const { appointment, patient, reason, service } =
    props.appointMentData.pageOne;

    console.log(props.appointMentData.someOne)
    const { barangay, birthdate, city, firstname, lastname, middlename, province,sex, street, suffix,zip } =
    props.appointMentData.someOne;
  // const { currUser } = props;

  const address = `${street.value} ${
    barangay.value
  }, ${removeCityOfPrefix(city.value)}, ${province.value}, ${
    zip.value
  }`;
  return (
    <div className="appointment-details">
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Patient Name:</h4>
          <p>{`${firstname.value}${
            middlename.value && ` ${middlename.value}`
          } ${lastname.value}${
            suffix.value && ` ${suffix.value}`
          }`}</p>
        </div>
        <div className="details-partition">
          <h4>Complete Address:</h4>
          <p>{address}</p>
        </div>
        <div className="details-partition">
          <h4>Birthdate:</h4>
          <p>{dayjs(birthdate.value ).format("MMMM DD, YYYY")}</p>
        </div>
        <div className="details-partition">
          <h4>Age:</h4>
          <p>{calculateAge(birthdate.value)}</p>
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
          <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
        </div>
        <div className="details-partition">
          <h4>Time:</h4>
          <p>{dayjs(Date.now()).format("hh:mm A")}</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfo;
