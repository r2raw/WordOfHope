import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Zoom } from "@mui/material";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";
function DeleteService(props) {
  const { selectedDeleteService } = props;
  const { updateServices } = useOutletContext();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = selectedDeleteService;
  const handleDeactivate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/update-service-availability/${id}`, {
        availability: "Unavailable",
      });
      setLoading(false);
      if (response.status === 200) {
        setSuccess(true);
        updateServices();
      }
    } catch (error) {
      console.error("deactivate service error: " + error.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleCloseDelete();
      }, 1000);
    }
  }, [success]);
  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="service-form card">
        <SuccessMessageFit message="Service deactivated successfully!" />
      </div>
    );

  return (
    <Zoom in={true}>
      <div className="service-form card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseDelete();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h1>Deactivate service</h1>
        <h3 className="update-dialog">
          Are you you sure to turn{" "}
          <span>[{selectedDeleteService.service_name}]</span> of{" "}
          <span>[{selectedDeleteService.department_name}]</span> department
          unavailable?
        </h3>
        <button className="solid danger fade" onClick={handleDeactivate}>
          Deactivate
        </button>
      </div>
    </Zoom>
  );
}

export default DeleteService;
