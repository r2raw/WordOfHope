import React from "react";
import ManageAppointmentTodayTable from "./ManageAppointmentTodayTable";
import UpcomingAppointmentsTable from "./UpcomingAppointmentsTable";
function ReceptManageAppointment() {

  return (
    <div className="admin-element">
      <h1>Manage Appointment</h1>
      <ManageAppointmentTodayTable />
      <h1>Upcoming Appointments</h1>
      <UpcomingAppointmentsTable />
    </div>
  );
}

export default ReceptManageAppointment;
