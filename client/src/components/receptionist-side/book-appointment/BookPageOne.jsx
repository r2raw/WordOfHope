import React from "react";
import BookSomeone from "./BookSomeone";
import { useOutletContext } from "react-router-dom";

function BookPageOne(props) {
  //   const { appointMentData } = props;
  const { backendData } = useOutletContext();
  // console.log(backendData);
  console.log(props);
  const page = "pageOne";

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
      <BookSomeone
        handleBookSomeone={handleBookSomeone}
        appointSomeone={props.appointSomeone}
        handleFocusState={props.handleFocusState}
        handleBlurState={props.handleBlurState}
        ncr={props.ncr && props.ncr}
        barangays={props.barangays && props.barangays}
      />
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
        <label htmlFor="general" className="rdb lg-blue-3 card">
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
        <label htmlFor="specialized" className="rdb lg-blue-3 card">
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
        <label htmlFor="diagnostic" className="rdb lg-blue-3 card">
          Diagnostic Services
        </label>
      </div>
      <h5>Select a service</h5>
      <div className="input-group">
        <select
          className="lg-blue-3 card"
          name="service"
          onChange={handleInputChange}
          value={props.appointMentData.service}
          required
        >
          <option>...</option>

          {props.appointMentData.reason &&
            backendData.services
              .filter((i) => i.service_type === props.appointMentData.reason)
              .map((service, index) => {
                return (
                  <option key={index} value={service.id}>
                    {service.service_name}
                  </option>
                );
              })}
          {/* {props.appointMentData.reason === "Diagnostic"
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
              })} */}
        </select>
        <span className="floating-label">Service</span>
      </div>
    </div>
  );
}

export default BookPageOne;
