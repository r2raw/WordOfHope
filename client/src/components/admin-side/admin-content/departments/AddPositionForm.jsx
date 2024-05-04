import React, { useEffect, useState } from "react";
import { Zoom } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import SuccessMessageFit from "../../../SuccessMessageFit";
import FitLoading from "../../../FitLoading";
function AddPositionForm(props) {
  const { backendData, updatePositions } = useOutletContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [posDept, setPosDept] = useState([]);

  const departmentCounts = {};
  backendData.positions.forEach((position) => {
    departmentCounts[position.department_id] =
      (departmentCounts[position.department_id] || 0) + 1;
  });

  const availableDepartment = backendData.departments.filter((department) => {
    return (
      department.availability === "Available" &&
      (!departmentCounts[department.id] ||
        departmentCounts[department.id] < 2) &&
      department.id !== 1 &&
      department.id !== 2
    );
  });
  const [values, setValues] = useState({
    department_id: "",
    position: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

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
      .post("/Add-Position", values)
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          updatePositions();
          setSuccess(true);
        }
      })
      .catch((err) => console.error("/Add position error: " + err.message));
  };

  useEffect(() => {
    if (values.department_id !== "") {
      const departmentPos = backendData.positions.filter(
        (i) =>
          parseInt(i.department_id) === parseInt(values.department_id) &&
          i.position_name
      );
      const pos = departmentPos && departmentPos.map((i) => i.position_name);
      setPosDept(pos || []);
    }
  }, [values.department_id]);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleCloseAddPosition();
      }, 3000);
    }
  }, [success]);

  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="add-department card">
        <SuccessMessageFit message="Position added successfully" />
      </div>
    );
  return (
    <Zoom in={true}>
      <div className="add-department card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseAddPosition();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h3>Add Position</h3>
        <form onSubmit={handleSubmit}>
          <div id="new-input-group">
            <select
              name="department_id"
              value={values.department_id}
              className="card"
              onChange={handleChange}
              required
            >
              <option value="">...</option>
              {availableDepartment.map((i, index) => (
                <option key={index} value={i.id}>
                  {i.department_name}
                </option>
              ))}
            </select>
            <span className="new-floating-label">Deparment name</span>
            <span className="dropdown">
              <ArrowDropDownSharpIcon />
            </span>
          </div>
          <div id="new-input-group">
            <select
              className="card"
              name="position"
              value={values.position}
              onChange={handleChange}
              required
            >
              <option value="">...</option>
              {values.department_id &&
                ["Doctor", "Nurse"]
                  .filter((position) => !posDept.includes(position))
                  .map((position, index) => (
                    <option key={index}>{position}</option>
                  ))}
            </select>
            <span className="new-floating-label">Position</span>
            <span className="dropdown">
              <ArrowDropDownSharpIcon />
            </span>
          </div>
          <button className="solid submit fade card" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </div>
    </Zoom>
  );
}

export default AddPositionForm;
