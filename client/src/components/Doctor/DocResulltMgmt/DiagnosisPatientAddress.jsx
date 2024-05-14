import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
function DiagnosisPatientAddress(props) {
  const { backendData } = useOutletContext();
  const { values, handleInputChange } = props;
  const { cities } = backendData.ncr;
  const [barangays, setBarangays] = useState();

  useEffect(() => {
    if (values.city !== "") {
      const foundCity = cities.find((city) => city.name === values.city);
      if (foundCity) {
        if (foundCity.isCity) {
          setBarangays(
            backendData.ncr.barangays.filter(
              (i) => i.cityCode === foundCity.code
            )
          );
        } else {
          setBarangays(
            backendData.ncr.barangays.filter(
              (i) => i.municipalityCode === foundCity.code
            )
          );
        }
      }
    } else {
      setBarangays("");
    }
  }, [values.city]);
  return (
    <div className="patient-address">
      <div id="new-input-group">
        <input
          className="card"
          name="street"
          type="text"
          value={values.street}
          onChange={handleInputChange}
          placeholder=" "
          required
        />
        <span className="new-floating-label">House No., Bldg, Street</span>
      </div>
      <div id="new-input-group">
        <select className="card" value="Metro-Manila" required>
          <option>Metro-Manila</option>
        </select>
        <span className="new-floating-label">Province</span>
        <span className="dropdown">
          <ArrowDropDownSharpIcon />
        </span>
      </div>
      <div id="new-input-group">
        <select className="card" name="city" value={values.city} onChange={handleInputChange} required>
          <option></option>
          {cities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((i) => {
              return <option>{i.name}</option>;
            })}
        </select>
        <span className="new-floating-label">City/Municipality</span>
        <span className="dropdown">
          <ArrowDropDownSharpIcon />
        </span>
      </div>
      <div id="new-input-group">
        <select className="card" name="barangay" value={values.barangay} onChange={handleInputChange} required>
          <option></option>
          {barangays &&
            barangays
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((i) => {
                return <option>{i.name}</option>;
              })}
        </select>
        <span className="new-floating-label">Barangay</span>
        <span className="dropdown">
          <ArrowDropDownSharpIcon />
        </span>
      </div>
      <div id="new-input-group">
        <input
          className="card"
          type="tel"
          placeholder=" "
          pattern="[0-9]{4}"
          name="zip"
          onChange={handleInputChange}
          value={values.zip}
          maxLength={4}
          required
        />
        <span className="new-floating-label">Zip/Postal Code</span>
      </div>
    </div>
  );
}

export default DiagnosisPatientAddress;
