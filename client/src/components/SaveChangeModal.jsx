import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useOutletContext } from "react-router-dom";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
function SaveChangesModal(props) {
  // toggleSaveModal
  const { socket } = useOutletContext();

  const [openResult, setOpenResult] = useState(false);
  const [editResult, setEditResult] = useState("failed");

  function toggleSaveModal() {
    props.toggleSaveModal();
  }

  const handleClick = () => {
    props.sendMessage();
  };

  useEffect(() => {
    socket.on("edit_result", async (data) => {
      const result = await data;
      setOpenResult(true);
       setEditResult(result);
    });
  }, [socket]);

  const handleContinueBtn = () =>{
    toggleSaveModal();
    props.handleViewEditForm();
  }
  return (
    <div className="confirm-modal modal">
      <div className="dialog-box">
        <div className="dialog-header">
          <h3>Save Changes</h3>
          <div className="btn-container close" onClick={toggleSaveModal}>
            <CloseSharpIcon />
          </div>
        </div>
        <div className="dialog-body">
          <div className="dialog-message">
            <p>Are you sure you want to save changes?</p>
          </div>
        </div>
        <div className="dialog-button">
          <button
            className="submit solid"
            onClick={handleClick}
            name="confirm-edit"
            value={props.id}
          >
            Confirm
          </button>
        </div>
      </div>

      {openResult && (
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
              <button onClick={handleContinueBtn}
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

export default SaveChangesModal;
