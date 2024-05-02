import React, { useEffect } from "react";
import ChangePassForm from "./ChangePassForm";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import { useNavigate, useOutletContext } from "react-router-dom";
function FirstTimeLog() {
  const navigate = useNavigate();
  const { backendData } = useOutletContext();

  useEffect(() => {
    if (!backendData.user[0].firsttimelog) {
      if (backendData.user[0].position !== "Admin") {
        navigate(
          `/WordOfHope/${backendData.user[0].position}/${backendData.user[0].userid}/Dashboard`
        );
      } else {
        navigate(`/WordOfHope/MNS/${backendData.user[0].userid}/Dashboard`);
      }
    }
  }, []);
  return (
    <div className="change-password card" id="first-time-log">
      <div>
        <div>
          <LockSharpIcon />
        </div>
        <h1>Change Password</h1>
        <p>To change your password, please fill in the fields.</p>
        <p>
          Your password must contain at least 8 characters, it must also include
          at least on upper case letter, one lower case letter, one number and
          one special character
        </p>
      </div>
      <ChangePassForm />
    </div>
  );
}

export default FirstTimeLog;
