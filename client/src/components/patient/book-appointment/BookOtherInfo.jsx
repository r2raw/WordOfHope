import React from "react";
import removeCityOfPrefix from "../../my-functions/removeCityOfPrefix";
import calculateAge from "../../my-functions/calculateAge";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
function BookOtherInfo(props) {
  const {backendData} = useOutletContext()
  const { appointment, reason, service } = props.appointMentData.pageOne;
  const { date, time } = props.appointMentData.pageTwo;

  const {
    birthdate,
    street,
    province,
    city,
    barangay,
    zip,
    firstname,
    lastname,
    suffix,
    middlename,
    relationship,
  } = props.appointMentData.someOne;
  const { currUser } = props;

  const userAddress = `${currUser.street} ${
    currUser.barangay
  }, ${removeCityOfPrefix(currUser.city)}, ${currUser.province}, ${
    currUser.zip
  }`;

  const patientAddress = `${street.value} ${
    barangay.value
  }, ${removeCityOfPrefix(city.value)}, ${province.value}, ${zip.value}`;

  return (
    <div className="appointment-details">
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Booked By:</h4>
          <p>{`${currUser.firstname}${
            currUser.middlename && ` ${currUser.middlename}`
          } ${currUser.lastname}${
            currUser.suffix && ` ${currUser.suffix}`
          }`}</p>
        </div>
        <div className="details-partition">
          <h4>Address:</h4>
          <p>{userAddress}</p>
        </div>
        <div className="details-partition">
          <h4>Phone Number:</h4>
          <p>{currUser.phone}</p>
        </div>
        <div className="details-partition">
          <h4>Date Booked:</h4>
          <p>{dayjs(new Date()).format("MMMM DD, YYYY - dddd")}</p>
        </div>
      </div>
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Appointment Type:</h4>
          <p>{appointment}</p>
        </div>
        <div className="details-partition">
          <h4>Specify Patient:</h4>
          <p>Others</p>
        </div>
        <div className="details-partition">
          <h4>Patient Name:</h4>
          <p>{`${firstname.value}${
            middlename.value && ` ${middlename.value}`
          } ${lastname.value}${suffix.value && ` ${suffix.value}`}`}</p>
        </div>
        <div className="details-partition">
          <h4>Address:</h4>
          <p>{patientAddress}</p>
        </div>
        <div className="details-partition">
          <h4>Relationship:</h4>
          <p>{relationship.value}</p>
        </div>
        <div className="details-partition">
          <h4>Birthdate:</h4>
          <p>{dayjs(birthdate.value).format("MMMM DD, YYYY")}</p>
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
            {backendData.services.map((i) => (
              i.id === parseInt(service) && i.service_name
              
            ))}
          </p>
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

export default BookOtherInfo;
