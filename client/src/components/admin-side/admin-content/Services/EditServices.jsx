import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Zoom } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
function EditServices(props) {
  const { backendData, updateServices } = useOutletContext();
  const { selectedService } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    department_id: selectedService.department_id,
    service_type: selectedService.service_type,
    service_name: selectedService.service_name,
    available_online: selectedService.available_online,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (!values[fieldname]) {
        valid = false;
      }
    }

    setIsDisabled(!valid);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios.post("/Update-Services", values).then((res) => {
      setLoading(false);
      if (res.data.status === "success") {
        setSuccess(false);
        return;
      }

      return setError(res.data.message);
    });
  };

  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="service-form card">
        <SuccessMessageFit message="Service updated successfully!" />
      </div>
    );
  return (
    <Zoom in={true}>
      <div className="service-form card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseEdit();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h2>Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div id="new-input-group">
            <select
              className="card"
              name="department_id"
              onChange={handleChange}
              placeholder=" "
              value={values.department_id}
              required
            >
              <option value="">...</option>
              {backendData.departments
                .filter(
                  (i) =>
                    (i.availability === "Available") & (i.id !== 1) &&
                    i.id !== 2
                )
                .map((department, index) => (
                  <option key={index} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
            </select>
            <span className="new-floating-label">Department</span>
          </div>
          <div id="new-input-group">
            <select
              className="card"
              placeholder=" "
              name="service_type"
              onChange={handleChange}
              value={values.service_type}
              required
            >
              <option value="">...</option>
              {[
                "General Consultation",
                "Specialized",
                "Diagnostic",
              ].map((type, index) => (
                <option key={index}>{type}</option>
              ))}
            </select>
            <span className="new-floating-label">Service type</span>
          </div>
          <div id="new-input-group">
            <input
              className="card"
              type="text"
              name="service_name"
              onChange={handleChange}
              value={values.service_name}
              placeholder=" "
              required
            />
            <span className="new-floating-label">Service name</span>
          </div>
          <div className="radio">
            Available for online appointment ?
            <input
              type="radio"
              name="available_online"
              value="true"
              onChange={handleChange}
              checked={values.available_online.toString() === "true"}
              id="yes"
            />
            <label className="card" htmlFor="yes">
              Yes
            </label>
            <input
              type="radio"
              name="available_online"
              value="false"
              onChange={handleChange}
              checked={values.available_online.toString() === "false"}
              id="no"
            />
            <label className="card" htmlFor="no">
              No
            </label>
          </div>
          {error !== "" && <p className="invalid">{error}</p>}
          <button className="solid submit fade card" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </div>
    </Zoom>
  );
}

export default EditServices;
