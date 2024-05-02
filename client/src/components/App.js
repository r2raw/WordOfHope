import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import AdminDashboard from "./admin-side/admin-content/dashboard/AdminDashboard";
import Accounts from "./admin-side/admin-content/accounts/Accounts";
import "./css/style.css";
import DoctorSched from "./admin-side/admin-content/doctor schedule/DoctorSched";
import PatientDemandRate from "./admin-side/admin-content/patient-demand/PatientDemandRate";
import Attendance from "./admin-side/hr-admin/attendance/Attendance";
import HrDashboard from "./admin-side/hr-admin/hr-dashboard/HrDashboard";
import ReceptDashboard from "./receptionist-side/dashboard/ReceptDashboard";
import Queues from "./receptionist-side/queue/Queues";
import ReceptLog from "./receptionist-side/attendance-log/ReceptLog";
import ReceptPatientAcc from "./receptionist-side/patient-acc/ReceptPatientAcc";
import ReceptPatientRec from "./receptionist-side/patient-rec/ReceptPatientRec";
import ReceptDoctorSched from "./receptionist-side/doctor-sched/ReceptDoctorSched";
import ReceptBookAppointment from "./receptionist-side/book-appointment/ReceptBookAppointment";
import ReceptManageAppointment from "./receptionist-side/manage-appointment/ReceptManageAppointment";
import Index from "./client-side/Index/Index";
import About from "./client-side/about/About";
import Service from "./client-side/services/Service";
import Facility from "./client-side/facility/Facility";
import Register from "./register/Register";
import ClientLayout from "./client-side/ClientLayout";
import AdminLayout from "./admin-side/AdminLayout";
import DocDash from "./Doctor/DocDash";
import DoctorLayout from "./Doctor/DoctorLayout";
import DocQueue from "./Doctor/DocQueue/DocQueue";
import DocLog from "./Doctor/DocLog/DocLog";
import DocPatientRec from "./Doctor/DocPatientRec/DocPatientRec";
import PatientDemo from "./Doctor/PatientDemo/PatientDemo";
import DocResultMgmt from "./Doctor/DocResulltMgmt/DocResultMgmt";
import NurseLayout from "./receptionist-side/NurseLayout";
import HrLayout from "./admin-side/hr-admin/HrLayout";
import PatientLayout from "./patient/PatientLayout";
import PatientDashboard from "./patient/patientDashboard/PatientDashboard";
import BookAppointment from "./patient/book-appointment/BookAppointment";
import MyAppointment from "./patient/my-appointment/MyAppointment";
import PatientProfile from "./patient/patient-profile/PatientProfile";
import MedicalHistory from "./patient/medical-history/MedicalHistory";
import DocAppointmentSched from "./Doctor/DocAppointmentSched/DocAppointmentSched";
import RFIDScan from "./admin-side/RFIDScan";
import ScannedQr from "./client-side/ViewApointment/ScannedQr";
import EmployeeSched from "./admin-side/hr-admin/EmployeeSched/EmployeeSched";
import AccountSettings from "./AccountSettings/AccountSettings";
import ChangePassword from "./AccountSettings/ChangePassword";
import ChangeUsername from "./AccountSettings/ChangeUsername";
import UserProfile from "./AccountSettings/UserProfile";
import AddEmployeeSched from "./admin-side/hr-admin/EmployeeSched/AddEmployeeSched";
import EditUserProfile from "./AccountSettings/EditUserProfile";
import AddEmployee from "./admin-side/admin-content/accounts/AddEmployee";
import EditEmployee from "./admin-side/admin-content/accounts/EditEmployee";
import FirstTimeLog from "./FirstTimeLog/FirstTimeLog";
import EmployeeViewAttendance from "./admin-side/hr-admin/attendance/EmployeeViewAttendance";
import Departments from "./admin-side/admin-content/departments/Departments";
import AddSevices from "./admin-side/admin-content/Services/AddSevices";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Index />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Service />} />
        <Route path="/Facility" element={<Facility />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="ViewAppointment/:qr" element={<ScannedQr />} />
      </Route>
      <Route path="/rfid" element={<RFIDScan />} />

      <Route path="/WordOfHope">
        <Route path=":user/" element={<ClientLayout />}>
          <Route index element={<Index />} />
          <Route path="About" element={<About />} />
          <Route path="Services" element={<Service />} />
          <Route path="Facility" element={<Facility />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>

        <Route path="MNS/:user" element={<AdminLayout />}>
          <Route path="RFIDScan" element={<RFIDScan />} />
          <Route path="Dashboard" element={<AdminDashboard />} />
          <Route path="Accounts" element={<Accounts />} />
          <Route path="Doctor-Schedule" element={<DoctorSched />} />
          <Route path="Patient-Demand-Rate" element={<PatientDemandRate />} />
          <Route path="Accounts/Add" element={<AddEmployee />} />
          <Route path="Accounts/Edit/:empId" element={<EditEmployee />} />
          <Route path="Departments" element={<Departments />} />
          <Route path="Services" element={<AddSevices />} />
          <Route path="Change-Password" element={<FirstTimeLog />} />
          <Route path="Account-Settings" element={<AccountSettings />}>
            <Route path="User-Profile" element={<UserProfile />} />
            <Route
              path="User-Profile/Edit-Profile"
              element={<EditUserProfile />}
            />
            <Route path="Change-Password" element={<ChangePassword />} />
            <Route path="Change-Username" element={<ChangeUsername />} />
          </Route>
        </Route>

        <Route path="Doctor/:user" element={<DoctorLayout />}>
          <Route path="Dashboard" element={<DocDash />} />
          <Route path="Queue" element={<DocQueue />} />
          <Route path="Appointment-Sched" element={<DocAppointmentSched />} />
          <Route path="Change-Password" element={<FirstTimeLog />} />
          <Route path="Log" element={<DocLog />} />
          <Route path="Patient-Record" element={<DocPatientRec />} />
          <Route path="Patient-Demographics" element={<PatientDemo />} />
          <Route path="Result-Management" element={<DocResultMgmt />} />
          <Route path="Account-Settings" element={<AccountSettings />}>
            <Route path="User-Profile" element={<UserProfile />} />
            <Route path="Change-Password" element={<ChangePassword />} />
            <Route path="Change-Username" element={<ChangeUsername />} />
            <Route
              path="User-Profile/Edit-Profile"
              element={<EditUserProfile />}
            />
          </Route>
        </Route>

        <Route path="HR/:user" element={<HrLayout />}>
          <Route path="Dashboard" element={<HrDashboard />} />
          <Route path="Change-Password" element={<FirstTimeLog />} />
          <Route path="Employee-Schedule" element={<EmployeeSched />} />
          <Route
            path="Employee-Schedule/Add-Schedule"
            element={<AddEmployeeSched />}
          />
          <Route path="Attendance" element={<Attendance />} />
          <Route path="Attendance/:attendanceId" element={<EmployeeViewAttendance />} />
          <Route path="Account-Settings" element={<AccountSettings />}>
            <Route path="User-Profile" element={<UserProfile />} />
            <Route
              path="User-Profile/Edit-Profile"
              element={<EditUserProfile />}
            />
            <Route path="Change-Password" element={<ChangePassword />} />
            <Route path="Change-Username" element={<ChangeUsername />} />
          </Route>
        </Route>

        <Route path="Nurse/:user" element={<NurseLayout />}>
          <Route path="Dashboard" element={<ReceptDashboard />} />
          <Route path="Change-Password" element={<FirstTimeLog />} />
          <Route path="Queue" element={<Queues />} />
          <Route path="Log" element={<ReceptLog />} />
          <Route path="Patient-Account" element={<ReceptPatientAcc />} />
          <Route path="Patient-Record" element={<ReceptPatientRec />} />
          <Route path="Doctor-Schedule" element={<ReceptDoctorSched />} />
          <Route path="Book-Appointment" element={<ReceptBookAppointment />} />
          <Route path="Account-Settings" element={<AccountSettings />}>
            <Route path="User-Profile" element={<UserProfile />} />
            <Route path="Change-Password" element={<ChangePassword />} />
            <Route path="Change-Username" element={<ChangeUsername />} />
            <Route
              path="User-Profile/Edit-Profile"
              element={<EditUserProfile />}
            />
          </Route>
          <Route
            path="Manage-Appointments"
            element={<ReceptManageAppointment />}
          />
        </Route>
        <Route path="Patient/:user" element={<PatientLayout />}>
          <Route path="Dashboard" element={<PatientDashboard />} />
          <Route path="Book-Appointment" element={<BookAppointment />} />
          <Route path="My-Appointment" element={<MyAppointment />} />
          <Route path="Patient-Profile" element={<PatientProfile />} />
          <Route path="Medical-History" element={<MedicalHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
