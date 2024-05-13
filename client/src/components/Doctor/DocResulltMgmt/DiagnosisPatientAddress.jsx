import React from "react";

function DiagnosisPatientAddress() {
  return (
    <div className="patient-address">
      <div id="new-input-group">
        <input className="card" type="text" placeholder=" " required />
        <span className="new-floating-label">House No., Bldg, Street</span>
      </div>
      <div id="new-input-group">
        <select className="card" required>
          <option></option>
        </select>
        <span className="new-floating-label">Province</span>
      </div>
      <div id="new-input-group">
        <select className="card" required>
          <option></option>
        </select>
        <span className="new-floating-label">City/Municipality</span>
      </div>
      <div id="new-input-group">
        <select className="card" required>
          <option></option>
        </select>
        <span className="new-floating-label">Barangay</span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="tel"
          placeholder=" "
          pattern="[0-9]{4}"
          maxLength={4}
          required
        />
        <span className="new-floating-label">Zip/Postal Code</span>
      </div>
    </div>
  );
}

export default DiagnosisPatientAddress;
