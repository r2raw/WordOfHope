import React, { useEffect, useState } from "react";
import { Zoom } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import FitLoading from "../../../FitLoading";
import SuccessMessageFit from "../../../SuccessMessageFit";
import { useOutletContext } from "react-router-dom";

function ActivatePosition(props) {
    const {updatePositions } = useOutletContext();
    const { department_name, id, position_name } = props.position;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const activatePosition = async (posid) => {
      try {
        const response = await axios.post(
          `/update-position-availability/${posid}`,
          { availability: "Available" }
        );
  
        setLoading(false);
        if (response.status === 200) {
          if (response.data.status === "success") {
            setSuccess(true);
            updatePositions();
          }
        }
      } catch (error) {
        console.error("deactivatePosition ERROR: " + error.message);
      }
    };
  
    const handleActivate = () => {
      setLoading(true);
      activatePosition(id);
    };
  
    useEffect(() => {
      if (success) {
        setTimeout(() => {
          setSuccess(false);
          props.handleCloseActivatePosition();
        }, 3000);
      }
    }, [success]);
    if (loading) return <FitLoading />;
    if (success)
      return <SuccessMessageFit message={"Position updated successfully"} />;
    return (
      <Zoom in={true}>
        <div className="add-department card">
          <div
            className="close-btn"
            onClick={() => {
              props.handleCloseActivatePosition();
            }}
          >
            <CloseSharpIcon />
          </div>
          <h3>Activate Position</h3>
          <div>
            <h3 className="update-dialog">
              Are you sure to turn <span>[{position_name}]</span> position for <span>[{department_name}]</span> department available?
            </h3>
          </div>
          <button className="solid submit fade" onClick={handleActivate}>
            Deactivate
          </button>
        </div>
      </Zoom>
    );
}

export default ActivatePosition