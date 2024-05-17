import React from "react";
import { useOutletContext } from "react-router-dom";
import dayjs from 'dayjs'
const getCurrentMonthRange = () => {
  const today = dayjs();
  const firstDayOfMonth = today.startOf('month');
  return `${firstDayOfMonth.format('D MMM')} - ${today.format('D MMM YYYY')}`;
};

function ReceptNurseReports(props) {
  const { backendData } = useOutletContext();
  const {dashboardData} = props;
  const {appointmentCountToday,currMonthAppointment,patientCountToday,patientsCurrMonth,number_of_doctors, countDepartments  } = dashboardData;
  return (
    <div className="nurse reports">
      <div className="report">
        <h3>Today Appointment</h3>
        <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
        <h1>{appointmentCountToday.appointmentcount}</h1>
      </div>
      <div className="report">
        <h3>Today Patients</h3>
        <p>{dayjs(Date.now()).format("MMMM DD, YYYY")}</p>
        <h1>{patientCountToday.today_patient_count}</h1>
      </div>
      <div className="report">
        <h3>Total Appointments</h3>
        <p>{getCurrentMonthRange()}</p>
        <h1>{currMonthAppointment.appointment_count}</h1>
      </div>
      <div className="report">
        <h3>Total Patients</h3>
        <p>{getCurrentMonthRange()}</p>
        <h1>{patientsCurrMonth.patient_count}</h1>
      </div>
      <div className="report">
        <h3>Doctor(s)</h3>
        <h1>{number_of_doctors}</h1>
      </div>
      <div className="report">
        <h3>Department(s)</h3>
        <h1>{countDepartments}</h1>
      </div>
    </div>
  );
}

export default ReceptNurseReports;
