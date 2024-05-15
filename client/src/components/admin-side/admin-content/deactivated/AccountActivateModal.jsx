import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useOutletContext } from "react-router-dom";
import { Zoom } from "@mui/material";
import axios from "axios";
import SuccessMessageFit from "../../../SuccessMessageFit";
import FitLoading from "../../../FitLoading";
function AccountActivateModal(props) {
  const { renewEmployees } = useOutletContext();
  const { selectedEmployee } = props;
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, firstname, lastname, suffix, middlename, userid } =
    selectedEmployee;

  const fullname = `${lastname}, ${firstname}${
    middlename && `, ${middlename}`
  }${suffix && `, ${suffix}`}`;

  const handleActivation = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/employee-account-status/${userid}`, {
        accountstatus: "Activated",
      });

      setLoading(false);
      if (response.status === 200) {
        renewEmployees();
        setSuccess(true);
      }
    } catch (error) {
      console.error("userDeactivatien ERROR: " + error.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        props.handleCloseAccountActivate();
      }, 1000);
    }
  }, [success]);

  if (loading)
    return (
      <div className="modal">
        <Zoom in={true}>
          <div
            style={{
              backgroundColor: "white",
              width: "400px",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <FitLoading />
          </div>
        </Zoom>
      </div>
    );
  if (success)
    return (
      <div className="modal">
        <Zoom in={true}>
          <div
            style={{
              backgroundColor: "white",
              width: "400px",
              borderRadius: "10px",
            }}
          >
            <SuccessMessageFit message="Account activated successfully!" />
          </div>
        </Zoom>
      </div>
    );
  return (
    <div className="modal">
      <div
        className="close"
        onClick={() => {
          props.handleCloseAccountActivate();
        }}
      >
        <CloseSharpIcon />
      </div>

      <Zoom in={true}>
        <div className="account-status-update">
          <h2>Deactivate employee account</h2>
          <h3 className="update-dialog">
            Are you sure you want to activate{" "}
            <span>
              [{id} - {fullname}]
            </span>
            ?
          </h3>
          <button className="solid fade" onClick={handleActivation}>
            Activate
          </button>
        </div>
      </Zoom>
    </div>
  );
}

export default AccountActivateModal