import React from "react";

import { calendarTodayMax } from "../../my-functions/EighteenYearsAgo";
import { useOutletContext } from "react-router-dom";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
function DiagnosisPatientService(props) {
  const { values, handleInputChange } = props;
  const { backendData } = useOutletContext();
  return (
    <div className="service-information">
      <div id="new-input-group">
        <select className="card" name="service" onChange={handleInputChange} value={parseInt(values.service)} required>
          <option></option>
          {backendData.services.map((service, index) => {
            return (
              <option key={index} value={service.id}>
                {service.service_name}
              </option>
            );
          })}
        </select>
        <span className="new-floating-label">Service</span>
        <span className="dropdown">
          <ArrowDropDownSharpIcon />
        </span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="text"
          placeholder=" "
          value={backendData.user[0].department_name}
        />
        <span className="new-floating-label">Department</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="date"
          placeholder=""
          name="date_of_visit"
          max={calendarTodayMax}
          onChange={handleInputChange}
          value={values.date_of_visit}
          required
        />
        <span className="new-floating-label">Date of Visit</span>
      </div>
    </div>
  );
}

export default DiagnosisPatientService;
