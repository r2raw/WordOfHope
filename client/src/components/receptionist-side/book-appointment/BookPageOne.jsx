import React from "react";
import BookSomeone from "./BookSomeone";

function BookPageOne(props) {
  //   const { appointMentData } = props;
  const page = "pageOne";

  const serviceType = {
    generalConsultations: [
      "General Health Concern",
      "Pre-Employment Health Check",
    ],
    specializedServices: [
      "Nephrology",
      "Pulmonnology",
      "Cardiology",
      "Obstetrics (OB)",
      "Ophtalmology",
      "Pediatric (Pedia)",
    ],
    diagNosticServices: ["Laboratory", "Ultrasound", "X-Ray"],
  };

  function handleInputChange(e) {
    props.handleInputChange(e, page);
  }

  function handleBookSomeone(e, page) {
    props.handleInputChange(e, page);
  }

  function handleReasonChange(e) {
    props.handleReasonChange(e);
  }

  return (
    <div className="page">
      <h5>Select Appointment Type</h5>
      <div className="appointment-rdb">
        <input
          type="radio"
          value="Check-up"
          id="check"
          name="appointment"
          onChange={handleInputChange}
          checked={
            props.appointMentData.appointment === "Check-up" ? true : false
          }
        />
        <label htmlFor="check" className="rdb lg-blue-3">
          Check-up
        </label>
        <input
          type="radio"
          value="Follow-up"
          id="follow"
          name="appointment"
          onChange={handleInputChange}
          checked={
            props.appointMentData.appointment === "Follow-up" ? true : false
          }
        />
        <label htmlFor="follow" className="rdb lg-blue-3">
          Follow-up
        </label>
      </div>
      <h5>Specify Patient</h5>
      <div className="patient-type-rdb">
        <input
          type="radio"
          value="Someone"
          id="someone"
          name="patient"
          onChange={handleInputChange}
          checked={props.appointMentData.patient === "Someone" ? true : false}
        />
        <label htmlFor="someone" className="rdb lg-blue-3">
          Someone Else
        </label>
      </div>
      {props.appointMentData.patient &&
        props.appointMentData.patient === "Someone" && (
          <BookSomeone
            handleBookSomeone={handleBookSomeone}
            appointSomeone={props.appointSomeone}
            handleFocusState={props.handleFocusState}
            handleBlurState={props.handleBlurState}
            ncr={props.ncr && props.ncr}
            barangays={props.barangays && props.barangays}
          />
        )}
      <h5>Reason for visit</h5>
      <div className="patient-type-rdb">
        <input
          type="radio"
          value="General Consultation"
          id="general"
          name="reason"
          onChange={(e) => {
            handleInputChange(e);
            handleReasonChange(e);
          }}
          checked={
            props.appointMentData.reason === "General Consultation"
              ? true
              : false
          }
        />
        <label htmlFor="general" className="rdb lg-blue-3">
          General Consultation
        </label>
        <input
          type="radio"
          value="Specialized"
          id="specialized"
          name="reason"
          onChange={(e) => {
            handleInputChange(e);
            handleReasonChange(e);
          }}
          checked={
            props.appointMentData.reason === "Specialized" ? true : false
          }
        />
        <label htmlFor="specialized" className="rdb lg-blue-3">
          Specialized Services
        </label>
        <input
          type="radio"
          value="Diagnostic"
          id="diagnostic"
          name="reason"
          onChange={(e) => {
            handleInputChange(e);
            handleReasonChange(e);
          }}
          checked={props.appointMentData.reason === "Diagnostic" ? true : false}
        />
        <label htmlFor="diagnostic" className="rdb lg-blue-3">
          Diagnostic Services
        </label>
      </div>
      <h5>Select a service</h5>
      <div className="input-group">
        <select
          className="lg-blue-3"
          name="service"
          onChange={handleInputChange}
          value={props.appointMentData.service}
          required
        >
          <option>...</option>
          {props.appointMentData.reason === "Diagnostic"
            ? serviceType.diagNosticServices.map((i, id) => {
                return (
                  <option value={i} key={id}>
                    {i}
                  </option>
                );
              })
            : props.appointMentData.reason === "Specialized"
            ? serviceType.specializedServices.map((i, id) => {
                return (
                  <option value={i} key={id}>
                    {i}
                  </option>
                );
              })
            : props.appointMentData.reason === "General Consultation" &&
              serviceType.generalConsultations.map((i, id) => {
                return (
                  <option value={i} key={id}>
                    {i}
                  </option>
                );
              })}
        </select>
        <span className="floating-label">Service</span>
      </div>
    </div>
  );
}

export default BookPageOne;
