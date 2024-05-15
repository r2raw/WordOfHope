import React, { useEffect, useState } from "react";
import { Zoom } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";

function ActivateDepartment(props) {
  const { updateDepartments, updatePositions, updateServices } = useOutletContext();
  const { department_name, id } = props.department;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const activateDepartment = async (deptid) => {
    try {
      const response = await axios.post(
        `/update-department-availability/${deptid}`,
        { availability: "Available" }
      );

      setLoading(false);
      if (response.status === 200) {
        if (response.data.status === "success") {
          setSuccess(true);
          updateDepartments();
          updateServices();
          updatePositions();
        }
      }
    } catch (error) {
      console.error("deactivateDepartment ERROR: " + error.message);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    activateDepartment(id);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleCloseActivateDepartment();
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
            props.handleCloseActivateDepartment();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h3>Activate Department</h3>
        <div>
          <h3 className="update-dialog">
            Are you sure to activate <span>[{department_name}]</span> department?
          </h3>
        </div>
        <button className="solid submit fade" onClick={handleDelete}>
          Activate
        </button>
      </div>
    </Zoom>
  );
}

export default ActivateDepartment;
