import React from "react";
import removeCityOfPrefix from "../../my-functions/removeCityOfPrefix";
import calculateAge from "../../my-functions/calculateAge";
import dayjs from "dayjs";
function AppointmentInfo(props) {
  const { appointment, patient, reason, service } =
    props.appointMentData.pageOne;
  const { date, time } = props.appointMentData.pageTwo;

  const { currUser } = props;

  const address = `${currUser.street} ${
    currUser.barangay
  }, ${removeCityOfPrefix(currUser.city)}, ${currUser.province}, ${
    currUser.zip
  }`;
  return (
    <div className="appointment-details">
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Appointment Type:</h4>
          <p>{appointment}</p>
        </div>
        <div className="details-partition">
          <h4>Specify Patient:</h4>
          <p>{patient}</p>
        </div>
        <div className="details-partition">
          <h4>Patient Name:</h4>
          <p>{`${currUser.firstname}${
            currUser.middlename && ` ${currUser.middlename}`
          } ${currUser.lastname}${
            currUser.suffix && ` ${currUser.suffix}`
          }`}</p>
        </div>
        <div className="details-partition">
          <h4>Complete Address:</h4>
          <p>{address}</p>
        </div>
        <div className="details-partition">
          <h4>Birthdate:</h4>
          <p>{dayjs(currUser.birthdate).format("MMMM DD, YYYY")}</p>
        </div>
        <div className="details-partition">
          <h4>Age:</h4>
          <p>{calculateAge(currUser.birthdate)}</p>
        </div>
        <div className="details-partition">
          <h4>Reason for visit:</h4>
          <p>{reason}</p>
        </div>
        <div className="details-partition">
          <h4>Service:</h4>
          <p>{service} </p>
        </div>
        <div className="details-partition">
          <h4>Scheduled Date:</h4>
          <p>{date}</p>
        </div>
        <div className="details-partition">
          <h4>Time:</h4>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfo;
