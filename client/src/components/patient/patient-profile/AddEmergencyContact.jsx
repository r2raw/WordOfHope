import React, { useEffect, useState } from "react";
import suffix from "../../my-functions/Suffixes";
import _ from "lodash";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";
function AddEmergencyContact(props) {
  const { user } = useParams();
  const { updateBackend } = useOutletContext();
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    relation: "",
    email: "",
    phone: "",
  });
  const [error, setErrors] = useState({
    email: "",
    phone: "",
  });
  const handleInputChange = (e) => {
    const { name, value, validity } = e.target;

    if (name === "email" || name === "phone") {
      if (!validity.valid) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Invalid format!",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let valid = true;
    for (const fieldname in formData) {
      if (fieldname !== "middlename" && fieldname !== "suffix") {
        const fieldData = _.trim(formData[fieldname]);
        if (fieldData === "") {
          valid = false;
        }
      }
    }

    if (error.email !== "" || error.phone !== "") {
      valid = false;
    }

    setIsDisabled(!valid);
  }, [formData, error]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleViewContactForm();
      }, 1000);
    }
  }, [success]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `/add-emergency-contact/${user}`,
      formData
    );

    if (response.status === 200) {
      updateBackend();
      setSuccess(true);
    }
  };
  return (
    <div className="container">
      <h1>Add contact</h1>
      <form className="edit-patient-form" method="post">
        <div className="form-partition name">
          <h3>Contact Name</h3>
          <div className="inputs">
            <div id="new-input-group">
              <input
                type="text"
                name="lastname"
                className="card"
                value={formData.lastname}
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <span className="new-floating-label">Last Name</span>
            </div>
            <div id="new-input-group">
              <input
                type="text"
                name="firstname"
                className="card"
                value={formData.firstname}
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <span className="new-floating-label">First Name</span>
            </div>
            <div id="new-input-group">
              <input
                type="text"
                className="card"
                value={formData.middlename}
                name="middlename"
                placeholder=" "
                onChange={handleInputChange}
              />
              <span className="new-floating-label">Middle Name</span>
            </div>
            <div id="new-input-group">
              <select
                className="suffix card"
                name="suffix"
                value={formData.suffix}
                onChange={handleInputChange}
                placeholder=" "
              >
                <option></option>
                {suffix.map((i) => (
                  <option>{i}</option>
                ))}
              </select>
              <span className="new-floating-label">Suffix Name</span>
            </div>
          </div>
        </div>
        <div className="form-partition details">
          <h3>Identification Details</h3>
          <div className="inputs">
            <div id="new-input-group">
              <select
                className="suffix card"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                placeholder=" "
                required
              >
                <option></option>
                {relation.map((i) => (
                  <option>{i}</option>
                ))}
              </select>
              <span className="new-floating-label">Relation</span>
            </div>
            <div id="new-input-group">
              <input
                type="email"
                name="email"
                className="card"
                onChange={handleInputChange}
                value={formData.email}
                placeholder=" "
                required
              />
              <span className="new-floating-label">Email</span>
              {formData.email && error.email !== "" && (
                <p className="invalid">{error.email}</p>
              )}
            </div>
            <div id="new-input-group">
              <input
                type="tel"
                name="phone"
                className="card"
                maxLength={11}
                placeholder=" "
                onChange={handleInputChange}
                value={formData.phone}
                pattern="[0]{1}[9]{1}[0-9]{9}"
                required
              />
              <span className="new-floating-label">Phone</span>
              {formData.phone && error.phone !== "" && (
                <p className="invalid">{error.phone}</p>
              )}
            </div>
          </div>
        </div>
        {/* {saveData && (
          <SaveChangesModal/>
        )} */}
      </form>

      <div className="submit-edit">
        <button className="solid submit" disabled={isDisabled} onClick={handleSubmit}>
          Confirm
        </button>
      </div>
      {success && (
        <div className="confirm-modal modal">
          <div className="result-box">
            <div className="success">
              <div>
                <CheckCircleSharpIcon sx={{ fontSize: 150 }} />
              </div>
              <h1>Success</h1>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEmergencyContact;
const relation = [
  "Parent",
  "Guardian",
  "Child",
  "Spouse",
  "Sibling",
  "Relative",
];
