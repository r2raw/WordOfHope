import { Zoom } from "@mui/material";
import React, { useState } from "react";
import DeactivatedAccountsTable from "./DeactivatedAccountsTable";
import { useOutletContext } from "react-router-dom";
import AccountActivateModal from "./AccountActivateModal";

function DeactivatedAccounts() {
  const { backendData } = useOutletContext();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [openActivateAccount, setOpenActivateAccount] = useState(false);
  const handleOpenAccountActivate = (id) => {
    const findEmp = backendData.employees.find((i) => i.id === id);
    setSelectedEmployee(findEmp);
    setOpenActivateAccount(true);
  };
  const handleCloseAccountActivate = () => {
    setSelectedEmployee(null);
    setOpenActivateAccount(false);
  };
  return (
    <Zoom in={true}>
      <div className="admin-element">
        <h1>Deactivated Accounts</h1>
        <div className="card">
          <DeactivatedAccountsTable handleOpenAccountActivate={handleOpenAccountActivate} />
        </div>

        {openActivateAccount && (
          <AccountActivateModal
            handleCloseAccountActivate={handleCloseAccountActivate}
            selectedEmployee={selectedEmployee}
          />
        )}
      </div>
    </Zoom>
  );
}

export default DeactivatedAccounts;
