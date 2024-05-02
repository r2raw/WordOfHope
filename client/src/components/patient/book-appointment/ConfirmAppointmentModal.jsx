import React, { useState, useEffect } from "react";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";

import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
function ConfirmAppointmentModal(props) {
  const [openResult, setOpenResult] = useState(false);
  const [editResult, setEditResult] = useState("");
  const [myAppointmentId, setMyAppointmentId] = useState();
  const { socket } = useOutletContext();
  function closeModal() {
    props.closeModal();
  }

  const handleContinueBtn = () => {
    setOpenResult(false);
    closeModal();
    if(editResult === "success") {
      props.handleSuccessfulAppointment(true, myAppointmentId);
    }
  };

  const appointMyself = () => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }
    let datas = {};
    for (const field in props.appointMentData.pageOne) {
      const fieldName = props.appointMentData.pageOne[field];

      datas = { ...datas, [field]: fieldName };
    }

    datas = {
      ...datas,
      date: dayjs(
        props.appointMentData.pageTwo.date,
        "MMMM DD, YYYY - dddd"
      ).format("YYYY-MM-DD"),
      time: dayjs(props.appointMentData.pageTwo.time, "hh:mm A").format(
        "HH:mm:ss"
      ),
      userId: props.userId,
      appointedFor: "Self",
      method: "Online",
      dateBooked: dayjs(Date()).format("YYYY-MM-DD"),
    };

    // console.log(datas);
    if (!datas) return;

    socket.emit("book_my_appointment", datas);
  };

  const appointSomeOne = () => {

    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }
    let datas = {};
    for (const field in props.appointMentData.pageOne) {
      const fieldName = props.appointMentData.pageOne[field];

      datas = { ...datas, [field]: fieldName };
    }

    
    for (const field in props.appointMentData.someOne) {
      const fieldName = props.appointMentData.someOne[field];

      datas = { ...datas, [field]: fieldName.value };
    }

    datas = {
      ...datas,
      date: dayjs(
        props.appointMentData.pageTwo.date,
        "MMMM DD, YYYY - dddd"
      ).format("YYYY-MM-DD"),
      time: dayjs(props.appointMentData.pageTwo.time, "hh:mm A").format(
        "HH:mm:ss"
      ),
      userId: props.userId,
      appointedFor: "Someone",
      method: "Online",
      dateBooked: dayjs(Date()).format("YYYY-MM-DD"),
    };

    if (!datas) return;

    console.log(datas);

    socket.emit("book_other_appointment", datas);
  };

  const handleSubmitClick = async () => {
    if (props.appointedBy === "Self") {
      appointMyself();
    } else {
      appointSomeOne();
    }

    setOpenResult(true);
  };

  useEffect(() => {
    socket.on("booking_myself_result", async (data) => {
      const result = await data;
      setEditResult(result.result);
      setMyAppointmentId(result.id)
      setOpenResult(true);
    });

    
    socket.on("booking_other_result", async (data) => {
      const result = await data;
      setEditResult(result.result);
      setMyAppointmentId(result.id)
      setOpenResult(true);
    });
  }, [socket]);
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
            <p>Confirm Appointment Booking?</p>
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
