import React from "react";

import LockSharpIcon from "@mui/icons-material/LockSharp";
import ChangePassForm from "./ChangePassForm";
function ChangePassword() {
  return (
    <div className="change-password card">
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

export default ChangePassword;
