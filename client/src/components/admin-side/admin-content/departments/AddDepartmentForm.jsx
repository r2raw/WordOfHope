import { Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";
import FitLoading from "../../../FitLoading";
function AddDepartmentForm(props) {
  const { updateDepartments } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;

    setDepartmentName(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/Add-Department", { department: departmentName })
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          updateDepartments();
          setSuccess(true);
          return;
        }

        return setErrorMessage(res.data.message);
      })
      .catch((err) => console.error("Error Add Department: " + err.message));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleCloseAddDepartment();
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (errorMessage !== "") {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="add-department card">
        <SuccessMessageFit message="Department added successfully" />
      </div>
    );

  return (
    <Zoom in={true}>
      <div className="add-department card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseAddDepartment();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h3>Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div id="new-input-group">
            <input
              type="text"
              name="department"
              value={departmentName}
              onChange={handleChange}
              className="card"
              placeholder=" "
              required
            />
            <span className="new-floating-label">Deparment name</span>
          </div>
          {errorMessage !== "" && <p className="invalid">{errorMessage}</p>}
          <button
            className="solid submit fade card"
            disabled={departmentName === ""}
          >
            Submit
          </button>
        </form>
      </div>
    </Zoom>
  );
}

export default AddDepartmentForm;
