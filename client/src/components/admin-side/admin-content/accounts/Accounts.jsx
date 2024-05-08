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
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import AccountsTable from "./AccountsTable";

function Accounts() {
  const { user } = useParams();

  const {backendData} = useOutletContext();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const navigate = useNavigate();

  const [empId, setEmpId] = useState();
  var eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  function handleToggleModal() {
    navigate("Add")
  }



  function handleViewEmployee(id) {
    navigate(`Edit/${id}`)
    // setEmpId(id);
    // setIsViewOpen(true);
  }

  console.log(backendData);
  return (
    <div className="admin-element">
      <div className="content-header">
        <h1>Accounts</h1>
          <button className="outlined" onClick={handleToggleModal}>
            <span>+</span>Create Employee Account
          </button>
      </div>
      <div className="employee-tbl">
        <AccountsTable viewEmp={handleViewEmployee}/>
      </div>
    
      <div
        className={`view-employee-modal ${isViewOpen && `openModal`}`}
        style={{ display: isViewOpen ? "flex" : "none" }}
      >
        <div className="view-employee-container">
          <div className="container-header">
            <h5 style={{ margin: "none" }}>Employee Account</h5>
            <div
              className="close-btn"
              onClick={() => {
                setIsViewOpen(false);
              }}
            >
              <CloseSharpIcon />
            </div>
          </div>
          {backendData.employee &&
            backendData.employee
              .filter((employee) => {
                return employee.id === empId;
              })
              .map((employee, index) => {
                return (
                  <ViewEmployee
                    backendData={backendData}
                    key={index}
                    id={employee.id}
                    firstName={employee.firstname}
                    lastName={employee.lastname}
                    middleName={employee.middlename}
                    suffix={employee.suffix}
                    sex={employee.sex}
                    birthdate={employee.birthdate}
                    email={employee.email}
                    phone={employee.phone}
                    province={employee.province}
                    city={employee.city}
                    barangay={employee.barangay}
                    street={employee.street}
                    zip={employee.zip}
                    department={employee.department}
                    position={employee.position}
                    empType={employee.emptype}
                    rfid={employee.rfid}
                    img={employee.empimg}
                    userId={employee.userid}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Accounts;
