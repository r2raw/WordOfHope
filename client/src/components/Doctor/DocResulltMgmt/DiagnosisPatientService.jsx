import React from "react";

import { calendarTodayMax } from "../../my-functions/EighteenYearsAgo";
function DiagnosisPatientService() {
  return (
    <div className="service-information">
      <div id="new-input-group">
        <select className="card" required>
          <option></option>
        </select>
        <span className="new-floating-label">Service</span>
      </div>
      <div id="new-input-group">
        <input className="card" type="text" placeholder=" " disabled />
        <span className="new-floating-label">Department</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="date"
          placeholder=""
          max={calendarTodayMax}
          required
        />
        <span className="new-floating-label">Date of Visit</span>
      </div>
    </div>
  );
}

export default DiagnosisPatientService;
