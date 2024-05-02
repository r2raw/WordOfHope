import React from "react";
import dayjs from "dayjs";
import calculateAge from "../../my-functions/calculateAge";
import calculateAgeInDays from "../../my-functions/calculateAgeInDays";
import calculateAgeInMonths from "../../my-functions/calculateAgeInMonths";
import removeCityOfPrefix from "../../my-functions/removeCityOfPrefix";

export default (props) => {
    const {
        id,
        userfirstname,
        userlastname,
        usermiddlename,
        usersuffix,
        userstreet,
        userbarangay,
        userprovince,
        usercity,
        userzip,
        userphone,
        datebooked,
        type,
        firstname,
        middlename,
        lastname,
        suffix,
        street,
        barangay,
        province,
        city,
        zip,
        birthdate,
        reason,
        service,
        appointmentdate,
        appointmenttime,
        relationship,
      } = props.selectedAppointment;
      const bookedBy = `${userfirstname}${usermiddlename && ` ${usermiddlename}`} ${userlastname}${usersuffix && ` ${usersuffix}`}`;
      const userAddress = `${userstreet} ${userbarangay}, ${removeCityOfPrefix(usercity)}, ${userprovince}, ${userzip}`;
      const patientName = `${firstname}${middlename && ` ${middlename}`} ${lastname}${suffix && ` ${suffix}`}`;
      const patientAddress =`${street} ${barangay}, ${removeCityOfPrefix(city)}, ${province}, ${zip}`;
    
      const ageInYears = calculateAge(birthdate);;
      const ageInMonths = calculateAgeInMonths(birthdate);
      const ageInDays = calculateAgeInDays(birthdate);
  return (
    <div className="appointment-details">
      <hr />
      <div className="information">
        <div className="details-partition">
          <h4>Appointment id:</h4>
          <p>{id}</p>
        </div>
        <div className="details-partition">
          <h4>Booked By:</h4>
          <p>{bookedBy}</p>
        </div>
        <div className="details-partition">
          <h4>Address:</h4>
          <p>{userAddress}</p>
        </div>
        <div className="details-partition">
          <h4>Phone Number:</h4>
          <p>{userphone}</p>
        </div>
        <div className="details-partition">
          <h4>Date Booked:</h4>
          <p>
            {dayjs(datebooked).format(
              "MMMM DD, YYYY - dddd"
            )}
          </p>
        </div>
      </div>
      <hr />
      <div className="information">
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
          <h4>Relationship:</h4>
          <p>{relationship}</p>
        </div>
        <div className="details-partition">
          <h4>Birthdate:</h4>
          <p>
            {dayjs(birthdate).format(
              "MMMM DD, YYYY - dddd"
            )}
          </p>
        </div>
        <div className="details-partition">
          <h4>Age:</h4>
          <p>{ageInYears > 0 ? `${ageInYears} Year${ageInYears > 1 ? "s" : ""} old`: ageInMonths > 0 ? `${ageInMonths} Month${ageInMonths > 1 ? "s" : ""} old` : `${ageInDays} Day${ageInDays > 1 ? "s" : ""} old` }</p>
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
          <p>
            {dayjs(appointmentdate).format(
              "MMMM DD, YYYY - dddd"
            )}
          </p>
        </div>
        <div className="details-partition">
          <h4>Time:</h4>
          <p>
            {dayjs(appointmenttime, "HH:mm:ss").format(
              "hh:mm A"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
