import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useNavigate, useOutlet, useOutletContext, useParams } from "react-router-dom";
import AddNurseSched from "./AddNurseSched";
import AddOfficesSched from "./AddOfficesSched";
import AddDoctorSched from "./AddDoctorSched";
import Loading from "../../../Loading";
import SuccessMessage from "../../../SuccessMessage";
function AddEmployeeSched() {
  const { backendData, renewSchedules } = useOutletContext();
  const { user } = useParams();
  const [search, setSearch] = useState();
  const [searching, setSearching] = useState(false);
  const [foundEmployee, setFoundEmployee] = useState();
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate  = useNavigate();
  //   console.log(backendData)
  const { noSchedule } = backendData;

  const NoSchedEmployee = noSchedule.filter(
    (employee) => employee.userid !== parseInt(user)
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearchEmpId = () => {
    if (search) {
      const findEmployee = NoSchedEmployee.find((i) => i.id === search);

      setFoundEmployee(findEmployee);
      setSearching(true);
    }
  };

  useEffect(() => {
    if (!search) {
      setSearching(false);
    }
  }, [search]);

  const handleLoading = (result) => {
    setLoading(result);
  }

  const handleSuccess = (result) => {
    setSuccessful(result);
  }


  useEffect(()=>{
    if(successful){
      setTimeout(()=>{
        renewSchedules();
        navigate("../Employee-Schedule");
      }, 3000)
    }
  }, [successful])
  if(loading) return <Loading />

  if(successful) return <SuccessMessage message={"Schedule created successfully!"} />

  return (
    <div className="admin-element">
      <Link to="../Employee-Schedule">
        <ArrowBackSharpIcon />
      </Link>
      <h1>Add Employee Schedule</h1>
      <div className="add-schedule">
        <div className="search-employee">
          <div id="new-input-group">
            <input
              type="text"
              className="card"
              value={search}
              placeholder=" "
              onChange={handleSearchChange}
            />
            <span className="new-floating-label">Enter Employee ID</span>
          </div>
          <button className="solid fade card" onClick={handleSearchEmpId}>
            Search
          </button>
        </div>
        {searching ? (
          foundEmployee ? (
            <div>
              <div className="infos">
                <div className="user-info">
                  <h4>Employee ID:</h4>
                  <p>{foundEmployee.id}</p>
                </div>
                <div className="user-info">
                  <h4>Name:</h4>
                  <p>{`${foundEmployee.firstname}${
                    foundEmployee.middlename && ` ${foundEmployee.middlename}`
                  } ${foundEmployee.lastname}${
                    foundEmployee.suffix && ` ${foundEmployee.suffix}`
                  }`}</p>
                </div>
                <div className="user-info">
                  <h4>Position:</h4>
                  <p>{foundEmployee.position}</p>
                </div>
                <div className="user-info">
                  <h4>Department:</h4>
                  <p>{foundEmployee.department}</p>
                </div>
              </div>
              {/* <p>Employee ID: 001</p>
          <p>Name: Arturo D. Marte Jr. II</p>
          <p>Position: Nurse</p>
          <p>Department: Optolmology</p> */}
              {foundEmployee.position === "Nurse" ? (
                <AddNurseSched emp={foundEmployee?.id} handleLoading={handleLoading} handleSuccess={handleSuccess}/>
              ) : foundEmployee.position === "Doctor" ? (
                <AddDoctorSched emp={foundEmployee?.id}  handleLoading={handleLoading} handleSuccess={handleSuccess} />
              ) : (
                <AddOfficesSched emp={foundEmployee?.id} handleLoading={handleLoading} handleSuccess={handleSuccess} />
              )}

              {/* <AddOfficesSched /> */}
            </div>
          ) : (
            <div>
              <h1>Employee not found!</h1>
              <p>
                Either the employee already has a schedule or does not exist.
              </p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default AddEmployeeSched;
