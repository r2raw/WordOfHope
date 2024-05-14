import React from "react";
import suffix from "../../my-functions/Suffixes";
import { calendarTodayMax } from "../../my-functions/EighteenYearsAgo";

function DiagnosisPatientInfo(props) {
  const { values, handleInputChange } = props;
  return (
    <div className="patient-information">
      <div id="new-input-group">
        <input
          className="card"
          name="firstname"
          onChange={handleInputChange}
          type="text"
          value={values.firstname}
          placeholder=" "
          required
        />
        <span className="new-floating-label">First name</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          name="lastname"
          onChange={handleInputChange}
          type="text"
          value={values.lastname}
          placeholder=" "
          required
        />
        <span className="new-floating-label">Last name</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          name="middlename"
          onChange={handleInputChange}
          type="text"
          value={values.middlename}
          placeholder=" "
        />
        <span className="new-floating-label">Middle name</span>
      </div>

      <div id="new-input-group">
        <select
          className="card"
          name="suffix"
          onChange={handleInputChange}
          value={values.suffix}
        >
          <option></option>
          {suffix.map((i, index) => {
            return <option key={index}>{i}</option>;
          })}
        </select>
        <span className="new-floating-label">Suffix</span>
      </div>
      <div id="new-input-group">
        <select
          value={values.sex}
          name="sex"
          onChange={handleInputChange}
          className="card"
          required
        >
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
          name="birthdate"
          onChange={handleInputChange}
          value={values.birthdate}
          max={calendarTodayMax}
          required
        />
        <span className="new-floating-label">Birthdate</span>
      </div>

      <div id="new-input-group">
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleInputChange}
          className="card"
          placeholder=" "
        />
        <span className="new-floating-label">Email</span>
      </div>

      <div id="new-input-group">
        <input
          name="phone"
          onChange={handleInputChange}
          type="tel"
          value={values.phone}
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
