import React from "react";
import imglogo from "../../my-images/hopeImgs/hope-logo.png";
import AppointmentInfo from "./AppointmentInfo";
import { useOutletContext } from "react-router-dom";
import BookOtherInfo from "./BookOtherInfo";


function BookPageThree(props) {
  const { socket } = useOutletContext();
  

  const {patient} = props.appointMentData.pageOne;
  return (
    <div className="page three">
      <header>
        <div className="company-info">
          <div className="img-container">
            <img src={imglogo} alt="logo" />
          </div>
          <div className="header-details">
            <h1>Word Of Hope General Hosital</h1>
            <h4>#23 BUENAR ST. NOVALICHES, QUEZON CITY</h4>
            <h4> TEL: 289301622</h4>
          </div>
        </div>
        <h2>Summary of Appointment Details</h2>
      </header>
      {patient === "Self" ? (
        <AppointmentInfo
          appointMentData={props.appointMentData}
          currUser={props.currUser}
        />
      ) : (
        <BookOtherInfo
          appointMentData={props.appointMentData}
          currUser={props.currUser} />
      )}
    </div>
  );
}

export default BookPageThree;
