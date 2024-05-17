import React from "react";
import ChangePassForm from "../FirstTimeLog/ChangePassForm";

import PatientPassword from "./PatientPassword";
function UsernamePassword() {
  return (
    <div className="admin-element">
      <div>
        <PatientPassword />
      </div>
      <div></div>
    </div>
  );
}

export default UsernamePassword;
