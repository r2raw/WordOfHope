import React, { useState, useEffect } from "react";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
function ConfirmAppointmentModal(props) {
  const [openResult, setOpenResult] = useState(false);
  const [editResult, setEditResult] = useState("");
  const [myAppointmentId, setMyAppointmentId] = useState();
  const [queueNum, setQueueNum] = useState();
  const { backendData } = useOutletContext();
  function closeModal() {
    props.closeModal();
  }

  const handleContinueBtn = async () => {
    setOpenResult(false);
    closeModal();
    if (editResult === "success") {
      props.handleSuccessfulAppointment(true, myAppointmentId, queueNum);
    }
  };

  const appointSomeOne = () => {
    let datas = {};
    for (const field in props.appointMentData.pageOne) {
      const fieldName = props.appointMentData.pageOne[field];

      datas = { ...datas, [field]: fieldName };
    }

    for (const field in props.appointMentData.someOne) {
      const fieldName = props.appointMentData.someOne[field];

      datas = { ...datas, [field]: fieldName.value };
    }

    return datas;
  };

  const handleSubmitClick = async () => {
    const response = await axios.post(
      `/walkin-appointment/${backendData.user[0].id}`,
      appointSomeOne()
    );
    if (response.data.status === "success") {
      setEditResult(response.data.status);
      setMyAppointmentId(response.data.appointment_id);
      setQueueNum(response.data.queue_num);
      setOpenResult(true);
    }
  };

  return (
    <div className="confirm-appointment-modal yesNo modal">
      <div className="dialog-box">
        <div className="dialog-header">
          <h3>Confirm appointment</h3>
          <div className="btn-container close" onClick={closeModal}>
            <CloseSharpIcon />
          </div>
        </div>
        <div className="dialog-body">
          <div className="dialog-message">
            <p>Confirm Appointment?</p>
          </div>
        </div>
        <div className="dialog-button">
          <button className="solid danger" onClick={closeModal}>
            No
          </button>
          <button onClick={handleSubmitClick} className="submit solid">
            Yes
          </button>
        </div>
      </div>

      {editResult && openResult && (
        <div className="result-box">
          <div className={editResult === "success" ? "success" : "failed"}>
            <div>
              {editResult === "success" ? (
                <CheckCircleSharpIcon sx={{ fontSize: 150 }} />
              ) : (
                <ErrorSharpIcon sx={{ fontSize: 150 }} />
              )}
            </div>
            <h1>{editResult === "success" ? "Success" : "Failed"}</h1>

            <div className="result-button">
              <button
                onClick={handleContinueBtn}
                className={`solid ${
                  editResult === `success` ? `submit` : `danger`
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ConfirmAppointmentModal;
