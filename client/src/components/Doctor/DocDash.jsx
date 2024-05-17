import React, { useState, useEffect } from "react";
import { currentDate } from "../my-functions/CurrentDate";
import dayjs from "dayjs";
import {useOutletContext} from 'react-router-dom';
import axios from "axios";
import DeptAppointmentsTodayTable from "./DeptAppointmentsToday/DeptAppointmentsTodayTable";
function DocDash() {

  const {backendData} = useOutletContext();

  const [dashboardData, setDashboarData] = useState();

  console.log(dashboardData)
  const fetchDashnoardData = async ()=>{
    try {
      const response  = await axios.get(`/doctor-dashboard/${backendData.user[0].department}`)
      if(response.status === 200){
        setDashboarData(response.data);
      }
    } catch (error) {
      console.error("fetchDashboarData ERROR: " + error.message)
    }
  }

  useEffect(()=>{
    fetchDashnoardData()
  },[])
  const upcomingStyle = {
    backgroundColor: "#e6db8e",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  const onGoingStyle = {
    backgroundColor: "#ffa319",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };
  const completedStyle = {
    backgroundColor: "#4fbc46",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  if(!dashboardData) return null

  const {appointmentCount, appointmentCurrMonth, appointmentsToday, totalPatientToday,currentMonthPatientCount} = dashboardData;
  return (
    <div className="admin-element doctor-dashboard">
      <div className="dashboard greetings">
        <div>
          <h1>{`Hello, Dr. ${backendData.user[0].lastname}`}</h1>
          <h3>Have a nice day at work!</h3>
        </div>
        <h3>{currentDate()}</h3>
      </div>
      <h3>Weekly Reports</h3>
      <div className="doctor reports">
        <div className="report today-appointment">
          <h4>Today Appointment</h4>
          <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
          <h1>{appointmentCount}</h1>
        </div>
        <div className="report today-appointment">
          <h4>Today Patients</h4>
          <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
          <h1>{totalPatientToday}</h1>
        </div>
        <div className="report today-appointment">
          <h4>Total Appointments</h4>
          <p>{getCurrentMonthRange()}</p>
          <h1>{appointmentCurrMonth}</h1>
        </div>
        <div className="report today-appointment">
          <h4>Total Patients</h4>
          <p>{getCurrentMonthRange()}</p>
          <h1>{currentMonthPatientCount}</h1>
        </div>
      </div>
      <h3>Upcoming Appointments</h3>
      <DeptAppointmentsTodayTable appointmentsToday={appointmentsToday}/>
    </div>
  );
}

export default DocDash;
const getCurrentMonthRange = () => {
  const today = dayjs();
  const firstDayOfMonth = today.startOf('month');
  return `${firstDayOfMonth.format('D MMM')} - ${today.format('D MMM YYYY')}`;
};