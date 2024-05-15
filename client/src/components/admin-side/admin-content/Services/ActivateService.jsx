import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Zoom } from "@mui/material";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";
function ActivateService(props) {
  const { selectedActivateService } = props;
  const { updateServices } = useOutletContext();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = selectedActivateService;
  console.log(id)
  const handleActivate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/update-service-availability/${id}`, {
        availability: "Available",
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
        props.handleCloseActivate();
      }, 1000);
    }
  }, [success]);
  if (loading) return <FitLoading />;
  if (success)
    return (
      <div className="service-form card">
        <SuccessMessageFit message="Service activated successfully!" />
      </div>
    );

  return (
    <Zoom in={true}>
      <div className="service-form card">
        <div
          className="close-btn"
          onClick={() => {
            props.handleCloseActivate();
          }}
        >
          <CloseSharpIcon />
        </div>
        <h1>Activate service</h1>
        <h3 className="update-dialog">
          Are you sure to turn{" "}
          <span>[{selectedActivateService.service_name}]</span> of{" "}
          <span>[{selectedActivateService.department_name}]</span> department
          available?
        </h3>
        <button className="solid submit fade" onClick={handleActivate}>
          Activate
        </button>
      </div>
    </Zoom>
  );
}

export default ActivateService;
