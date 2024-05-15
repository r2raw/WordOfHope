import React, { useEffect, useState } from "react";
import { Zoom } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";
function DeleteDepartment(props) {
  const { updateDepartments, updatePositions } = useOutletContext();
  const { department_name, id } = props.department;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const deactivateDepartment = async (deptid) => {

    try {
      const response = await axios.post(
        `/update-department-availability/${deptid}`,
        { availability: "Unavailable"}
      );

      setLoading(false);
      if (response.status === 200) {
        if (response.data.status === "success") {
          setSuccess(true);
          updateDepartments();
          updatePositions();
        }
      }
    } catch (error) {
      console.error("deactivateDepartment ERROR: " + error.message);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deactivateDepartment(id);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleCloseDeleteDepartment();
      }, 3000);
    }
  }, [success]);
  if (loading) return <FitLoading />;
  if (success)
    return <SuccessMessageFit message={"Department updated successfully"} />;
  return (
    <Zoom in={true}>
      <div className="add-department card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseDeleteDepartment();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h3>Delete Department</h3>
        <div>
          <h3 style={{ textAlign: "center" }}>
            Are you sure to delete <span>[{department_name}]</span> department?
          </h3>
        </div>
        <button className="solid danger fade" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Zoom>
  );
}

export default DeleteDepartment;
