import React from "react";
import { Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
function NavigationModal(props) {
  const { setIsModalOpen } = props;
  const navigate = useNavigate();
  return (
    <Zoom in={true}>
      <div className="modal">
        <div className="close" onClick={()=>{setIsModalOpen(false)}}>
          <CloseSharpIcon />
        </div>
        <div className="navigation">
          <button
            className="solid fade"
            onClick={() => {
              navigate("Add-Existing-Patient-Result");
            }}
          >
            Existing patient
          </button>
          <button
            className="solid submit fade"
            onClick={() => {
              navigate("Add-New-Patient-Result");
            }}
          >
            New patient
          </button>
        </div>
      </div>
    </Zoom>
  );
}

export default NavigationModal;
