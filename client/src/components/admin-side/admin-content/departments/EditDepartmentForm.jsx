import { Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";
import FitLoading from "../../../FitLoading";
import _ from "lodash";
import { titleCase } from "title-case";

function EditDepartmentForm(props) {
  const { updateDepartments } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [departmentName, setDepartmentName] = useState(
    props.department.department_name
  );
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
      .post("/Update-Department", { id: props.department.id ,department: departmentName })
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
        props.handleCloseEditDepartment();
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
        <SuccessMessageFit message="Department updated successfully" />
      </div>
    );

  return (
    <Zoom in={true}>
      <div className="add-department card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseEditDepartment();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h3>Edit Department</h3>
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
            disabled={
              departmentName === "" ||
              _.trim(titleCase(_.toLower(departmentName))) ===
                props.department.department_name
            }
          >
            Submit
          </button>
        </form>
      </div>
    </Zoom>
  );
}

export default EditDepartmentForm;
