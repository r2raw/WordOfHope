import React, { useEffect, useState } from "react";
import axios from "axios";
import { Zoom } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import SuccessMessageFit from "../../../SuccessMessageFit";
import FitLoading from "../../../FitLoading";
function ServiceForm() {
  const { backendData, updateServices } = useOutletContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    department_id: "",
    service_type: "",
    service_name: "",
    available_online: "",
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
      if (values[fieldname] === "") {
        valid = false;
      }
    }

    setIsDisabled(!valid);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/Add-Service", values)
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          updateServices();
          setSuccess(true);
          return;
        }
        return setError(res.data.message);
      })
      .catch((err) => console.error("/Add-Service error: " + err.message));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setValues({
          department_id: "",
          service_type: "",
          service_name: "",
          available_online: "",
        });
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="service-form card">
        <SuccessMessageFit message="Service added successfully" />
      </div>
    );
  return (
    <Zoom in={true}>
      <div className="service-form card">
        <h2>Add Service</h2>
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
              name="service_type"
              onChange={handleChange}
              placeholder=" "
              value={values.service_type}
              required
            >
              <option value="">...</option>
              {[
                "General Consultation",
                "Specialized Services",
                "Diagnostic Services",
              ].map((type, index) => (
                <option key={index}>{type}</option>
              ))}
            </select>
            <span className="new-floating-label">Service type</span>
          </div>
          <div id="new-input-group">
            <input
              className="card"
              name="service_name"
              type="text"
              onChange={handleChange}
              placeholder=" "
              value={values.service_name}
              required
            />
            <span className="new-floating-label">Service name</span>
          </div>
          <div className="radio">
            Available for online appointment ?
            <input
              type="radio"
              name="available_online"
              onChange={handleChange}
              value="true"
              checked={values.available_online === "true"}
              id="yes"
            />
            <label className="card" htmlFor="yes">
              Yes
            </label>
            <input
              type="radio"
              name="available_online"
              onChange={handleChange}
              value="false"
              checked={values.available_online === "false"}
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

export default ServiceForm;
