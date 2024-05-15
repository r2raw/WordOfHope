import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Zoom } from "@mui/material";
import axios from "axios";
import Loading from "../../../Loading";
import EditNurseSched from "./EditNurseSched";
import EditDoctorSched from "./EditDoctorSched";
import EditOfficesSched from "./EditOfficesSched";
import SuccessMessage from "../../../SuccessMessage";
function EditEmployeeSched() {
  const { id } = useParams();
  const { user } = useParams();
  const [employeeData, setEmployeeData] = useState();
  const { renewSchedules } = useOutletContext();

  
  const fetchEmployeeData = async ()=>{
    try {
        const response = await axios.get(`/fetch-employee-sched/${id}`)
        if(response.status === 200){
            setEmployeeData(response.data)
        }
    } catch (error) {
        console.error("fetchemployeeData error: " + error.message)
    }
  }
  useEffect(()=>{
    fetchEmployeeData()
  },[])

  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();




  const handleLoading = (result) => {
    setLoading(result);
  };

  const handleSuccess = (result) => {
    setSuccessful(result);
  };

  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        renewSchedules();
        navigate("../Employee-Schedule");
      }, 3000);
    }
  }, [successful]);


  if(!employeeData || loading) return <Loading />

  if(successful) return <SuccessMessage message="Schedule updated successfully!"/>
  const employee = employeeData.employeeData;
  const {schedule} =  employeeData;
  const fullname = `${employee.lastname}, ${employee.firstname}${employee.middlename && `, ${employee.middlename}`}${employee.suffix && `, ${employee.suffix}`}`
  return (
    <Zoom in={true}>
      <div className="admin-element">
        <div className="back-button">
          <Link to="../Employee-Schedule">
            <ArrowBackSharpIcon />
          </Link>
        </div>
        <h1>{id}</h1>
        <div className="add-schedule card">
          <div className="infos">
            <div className="user-info">
              <h4>Name:</h4>
              <p>{fullname}</p>
            </div>
            <div className="user-info">
              <h4>Position:</h4>
              <p>{employee.position_name}</p>
            </div>
            <div className="user-info">
              <h4>Department:</h4>
              <p>{employee.department_name}</p>
            </div>
          </div>
          
          {employee.position_name === "Nurse" ? (
                <EditNurseSched
                  emp={id}
                  handleLoading={handleLoading}
                  handleSuccess={handleSuccess}
                  schedule={schedule}
                />
              ) : employee.position_name === "Doctor" ? (
                <EditDoctorSched
                  emp={id}
                  handleLoading={handleLoading}
                  handleSuccess={handleSuccess}
                  schedule={schedule}
                />
              ) : (
                <EditOfficesSched
                  emp={id}
                  handleLoading={handleLoading}
                  handleSuccess={handleSuccess}
                  schedule={schedule}
                />
              )}
        </div>
      </div>
    </Zoom>
  );
}

export default EditEmployeeSched;
