import React, { useState, useEffect } from "react";
import EmpHeader from "../../header/EmpHeader";
import AdminNav from "../../admin-nav/AdminNav";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
// import "./Accounts.css";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
import { Zoom } from "@mui/material";
import defaultImg from "./default.jpg";
import AccountRow from "./AccountRow";
import ViewEmployee from "./ViewEmployee";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import AccountsTable from "./AccountsTable";
import AccountDeactivateModal from "./AccountDeactivateModal";

function Accounts() {
  const { user } = useParams();

  const { backendData } = useOutletContext();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [openDeactivateAccount, setOpenDeactivateAccount] = useState(false);
  const navigate = useNavigate();
  const [empId, setEmpId] = useState();
  var eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  function handleToggleModal() {
    navigate("Add");
  }

  const handleOpenAccountDeactivate = (id) => {
    const findEmp = backendData.employees.find((i) => i.id === id);
    setSelectedEmployee(findEmp);
    setOpenDeactivateAccount(true);
  };
  const handleCloseAccountDeactivate = () => {
    setSelectedEmployee(null);
    setOpenDeactivateAccount(false);
  };
  function handleViewEmployee(id) {
    navigate(`Edit/${id}`);
  }

  return (
    <div className="admin-element">
      <div className="content-header">
        <h1>Accounts</h1>
        <button className="outlined" onClick={handleToggleModal}>
          <span>+</span>Create Employee Account
        </button>
      </div>
      
      <div className="employee-tbl">
        <AccountsTable
          viewEmp={handleViewEmployee}
          handleOpenAccountDeactivate={handleOpenAccountDeactivate}
        />
      </div>
      {openDeactivateAccount && (
        <AccountDeactivateModal
          handleCloseAccountDeactivate={handleCloseAccountDeactivate}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
}

export default Accounts;
