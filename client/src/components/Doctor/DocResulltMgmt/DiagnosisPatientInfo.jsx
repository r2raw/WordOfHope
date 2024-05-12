import React from "react";
import suffix from "../../my-functions/Suffixes";
import { calendarTodayMax } from "../../my-functions/EighteenYearsAgo";

function DiagnosisPatientInfo() {
  return (
    <div className="patient-information">
      <div id="new-input-group">
        <input className="card" type="text" placeholder=" " required />
        <span className="new-floating-label">First name</span>
      </div>
      <div id="new-input-group">
        <input className="card" type="text" placeholder=" " required />
        <span className="new-floating-label">Last name</span>
      </div>
      <div id="new-input-group">
        <input className="card" type="text" placeholder=" " />
        <span className="new-floating-label">Middle name</span>
      </div>

      <div id="new-input-group">
        <select className="card">
          <option></option>
          {suffix.map((i, index) => {
            return <option key={index}>{i}</option>;
          })}
        </select>
        <span className="new-floating-label">Suffix</span>
      </div>
      <div id="new-input-group">
        <select className="card" required>
          <option></option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <span className="new-floating-label">Sex</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="date"
          placeholder=""
          max={calendarTodayMax}
          required
        />
        <span className="new-floating-label">Birthdate</span>
      </div>

      <div id="new-input-group">
        <input name="email" type="email" className="card" placeholder=" " />
        <span className="new-floating-label">Email</span>
      </div>

      <div id="new-input-group">
        <input
          name="phone"
          type="tel"
          pattern="[0]{1}[9]{1}[0-9]{9}"
          className="card"
          maxLength={11}
          placeholder=" "
        />
        <span className="new-floating-label">Phone</span>
      </div>
    </div>
  );
}

export default DiagnosisPatientInfo;
