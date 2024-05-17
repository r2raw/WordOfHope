import React, { useEffect, useState } from "react";
import ChangePassForm from "../FirstTimeLog/ChangePassForm";
import Loading from "../Loading";
import PatientPassword from "./PatientPassword";
import PatientUsername from "./PatientUsername";
import SuccessMessage from "../SuccessMessage";
import { useNavigate } from "react-router-dom";
function UsernamePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("../Dashboard");
      }, 3000);
    }
  }, [success]);

  if (loading) return <Loading />;
  if (success) return <SuccessMessage message="User updated successfully!" />;
  return (
    <div className="admin-element">
      <div className="patient-user-pass card">
        <div>
        <h2 style={{textAlign: "center", marginBottom: "20px"}}>Change password</h2>
          <PatientPassword setSuccess={setSuccess} setLoading={setLoading} />
        </div>
        <div>
        <h2 style={{textAlign: "center", marginBottom: "20px"}}>Change Username</h2>
          <PatientUsername setSuccess={setSuccess} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}

export default UsernamePassword;
