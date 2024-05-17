import express from "express";
import bodyParser from "body-parser";
import dayjs from "dayjs";
import multer from "multer";
import _ from "lodash";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import UpdateMyPatientProfile from "./MyServerFunctions/UpdateMyPatientProfile.js";
import GetMyProfileData from "./MyServerFunctions/GetMyProfileData.js";
import qr from "qr-image";
import { uid } from "uid";
import fs, { stat } from "fs";
import path from "path";
import { titleCase } from "title-case";
import GetAppointmentNum from "./MyServerFunctions/GetAppointmentNum.js";
import PadZeroes from "./MyServerFunctions/PadZeroes.js";
import BookMyself from "./MyServerFunctions/BookMyself.js";
import GetMyAppointment from "./MyServerFunctions/GetMyAppointment.js";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import BookOthers from "./MyServerFunctions/BookOthers.js";
import GetThirdPartyAppointment from "./MyServerFunctions/GetThirdPartyAppointment.js";
import ScanQr from "./MyServerFunctions/ScanQr.js";
import ScanQrSelfAppointment from "./MyServerFunctions/ScanQrSelfAppointment.js";
import ScanThirdPartyQr from "./MyServerFunctions/ScanThirdPartyQr.js";

// import admin from "firebase-admin";
// import credentials from "./react-auth-4e890-firebase-adminsdk-jd9vi-cd2ae8df6c.json"  assert { type: "json" };
import RegisterUser from "./MyServerFunctions/RegisterUser.js";
import GetUserInfo from "./MyServerFunctions/GetUserInfo.js";
import GetUserEmailInfo from "./MyServerFunctions/GetUserEmailInfo.js";
import { error } from "console";
import GetCurrentPass from "./MyServerFunctions/GetCurrentPass.js";
import { resourceLimits } from "worker_threads";
import getHrInfo from "./MyServerFunctions/HR/getHrInfo.js";
import getNoSchedEmployee from "./MyServerFunctions/HR/getNoSchedEmployee.js";
import updateEmployee from "./MyServerFunctions/employeeprofile/updateEmployee.js";
import GetAllEmployee from "./MyServerFunctions/GetAllEmployee.js";
import CheckExistingEmail from "./MyServerFunctions/CheckExistingEmail.js";
import AddNewEmployee, {
  addNewEmployeeNoImg,
} from "./MyServerFunctions/Admin/AddNewEmployee.js";
import internal from "stream";
import CheckExistingRfid from "./MyServerFunctions/Admin/CheckExistingRfid.js";
import InsertSchedule from "./MyServerFunctions/HR/InsertSchedule.js";
import getSchedule from "./MyServerFunctions/HR/getSchedule.js";
import checkExistingEmployeeSched from "./MyServerFunctions/rfid/checkExistingEmployeeSched.js";
import employeeIdExist from "./MyServerFunctions/rfid/employeeIdExist.js";
import getTimeDiff from "./MyServerFunctions/getTimeDiff.js";
import checkTodaySchedule from "./MyServerFunctions/rfid/checkTodaySchedule.js";
import employeeTimeIn from "./MyServerFunctions/rfid/employeeTimeIn.js";
import getEmployeeDaySchedule from "./MyServerFunctions/rfid/getEmployeeDaySchedule.js";
import checkLatestAttendance from "./MyServerFunctions/rfid/checkLatestAttendance.js";
import updateEmployeeImage from "./MyServerFunctions/employeeprofile/updateEmployeeImage.js";
import fetchEmployeeUserInfo from "./MyServerFunctions/fetchEmployeeUserInfo.js";
import fetchDoctorsDaySched from "./MyServerFunctions/Patient/fetchDoctorsDaySched.js";
import fetchAvailableDoctorTime from "./MyServerFunctions/Patient/fetchAvailableDoctorTime.js";
import fetchEmployeeAttendance from "./MyServerFunctions/HR/fetchEmployeeAttendance.js";
import getEmployeeDaySchedReverse from "./MyServerFunctions/rfid/getEmployeeDaySchedReverse.js";
import AddNewDepartment from "./MyServerFunctions/Admin/AddNewDepartment.js";
import CheckExistingDepartment from "./MyServerFunctions/Admin/CheckExistingDepartment.js";
import fetchDepartments from "./MyServerFunctions/Admin/fetchDepartments.js";
import fetchPositions from "./MyServerFunctions/Admin/fetchPositions.js";
import UpdateDepartment from "./MyServerFunctions/Admin/UpdateDepartment.js";
import AddNewPosition from "./MyServerFunctions/Admin/AddNewPosition.js";
import CheckExistingService from "./MyServerFunctions/Admin/CheckExistingService.js";
import AddService from "./MyServerFunctions/Admin/AddService.js";
import fetchServices from "./MyServerFunctions/Admin/fetchServices.js";
import appointmentToday from "./MyServerFunctions/Nurse/appointmentToday.js";
import getUserAppointment from "./MyServerFunctions/Nurse/getUserAppointment.js";
import getThirdPartyAppointment from "./MyServerFunctions/Nurse/getThirdPartyAppointment.js";
import QueueCount from "./MyServerFunctions/Nurse/QueueCount.js";
import InsertQueue from "./MyServerFunctions/Nurse/InsertQueue.js";
import updateInQueueSched from "./MyServerFunctions/Nurse/updateInQueueSched.js";
import fetchQueues from "./MyServerFunctions/Nurse/fetchQueues.js";
import fetchDoctorQueue from "./MyServerFunctions/Doctor/fetchDoctorQueue.js";
import fetchOngoingAppointment from "./MyServerFunctions/Doctor/fetchOngoingAppointment.js";
import fetchTopQueue from "./MyServerFunctions/Doctor/fetchTopQueue.js";
import updateFetchQueue from "./MyServerFunctions/Doctor/updateFetchQueue.js";
import updatePreviousServe from "./MyServerFunctions/Doctor/updatePreviousServe.js";
import fetchNurseCurrentlyServing from "./MyServerFunctions/Nurse/fetchNurseCurrentlyServing.js";
import serviceChart from "./MyServerFunctions/Doctor/serviceChart.js";
import returnToQueue from "./MyServerFunctions/Doctor/returnToQueue.js";
import dotenv from "dotenv";
import fetchAllServices from "./MyServerFunctions/Nurse/fetchAllServices.js";
import fetchPatientServices from "./MyServerFunctions/Patient/fetchPatientServices.js";
import insertWalkinAppointment from "./MyServerFunctions/Nurse/insertWalkinAppointment.js";
import getWalkinAppointment from "./MyServerFunctions/Doctor/getWalkinAppointment.js";
import doctorDepartmentService from "./MyServerFunctions/Doctor/doctorDepartmentService.js";
import countPatients from "./MyServerFunctions/Doctor/countPatients.js";
import insertNewPatient from "./MyServerFunctions/Doctor/insertNewPatient.js";
import insertPatientRecord from "./MyServerFunctions/Doctor/insertPatientRecord.js";
import insertDiagnosis from "./MyServerFunctions/Doctor/insertDiagnosis.js";
import getEmployeeDataEdit from "./MyServerFunctions/HR/getEmployeeDataEdit.js";
import getEmployeeSchedEdit from "./MyServerFunctions/HR/getEmployeeSchedEdit.js";
import deleteEmployeesched from "./MyServerFunctions/HR/deleteEmployeesched.js";
import updateDepartmentAvailabilty from "./MyServerFunctions/Admin/updateDepartmentAvailabilty.js";
import updatePositionAvailability from "./MyServerFunctions/Admin/updatePositionAvailability.js";
import checkExistingServiceUpdate from "./MyServerFunctions/Admin/checkExistingServiceUpdate.js";
import UpdateService from "./MyServerFunctions/Admin/UpdateService.js";
import updateServiceAvailability from "./MyServerFunctions/Admin/updateServiceAvailability.js";
import updateEmployeeStatus from "./MyServerFunctions/Admin/updateEmployeeStatus.js";
import absentEmployee from "./MyServerFunctions/absentEmployee.js";
import attendanceToday from "./MyServerFunctions/attendanceToday.js";
import fetchDoctorPatientRecord from "./MyServerFunctions/Doctor/fetchDoctorPatientRecord.js";
import fetchPatientEditRecord from "./MyServerFunctions/Doctor/fetchPatientEditRecord.js";
import fetchPatientEditDiagnosis from "./MyServerFunctions/Doctor/fetchPatientEditDiagnosis.js";
import deleteDiagnosis from "./MyServerFunctions/Doctor/deleteDiagnosis.js";
import editDoctorPatientInfo from "./MyServerFunctions/Doctor/editDoctorPatientInfo.js";
import editDoctorPatientRecord from "./MyServerFunctions/Doctor/editDoctorPatientRecord.js";
import searchAddExistingPatient from "./MyServerFunctions/Doctor/searchAddExistingPatient.js";
import fetchAllPatientRecords from "./MyServerFunctions/Doctor/fetchAllPatientRecords.js";
import viewPatientRecord from "./MyServerFunctions/Doctor/viewPatientRecord.js";
import fetchMyAttendance from "./MyServerFunctions/fetchMyAttendance.js";
import viewedAttendance from "./MyServerFunctions/viewedAttendance.js";
import patientAgeGroup from "./MyServerFunctions/Doctor/patientAgeGroup.js";
import avaragePatientVisit from "./MyServerFunctions/Nurse/avaragePatientVisit.js";
import countAppointmentToday from "./MyServerFunctions/Nurse/countAppointmentToday.js";
import countPatientToday from "./MyServerFunctions/Nurse/countPatientToday.js";
import appointmentCountCurrMonth from "./MyServerFunctions/Nurse/appointmentCountCurrMonth.js";
import patientCountCurrMonth from "./MyServerFunctions/Nurse/patientCountCurrMonth.js";
import activeDoctors from "./MyServerFunctions/Nurse/activeDoctors.js";
import departmentPatientCount from "./MyServerFunctions/Nurse/departmentPatientCount.js";
import departmentsCount from "./MyServerFunctions/Nurse/departmentsCount.js";
import availableDoctorsCount from "./MyServerFunctions/Nurse/availableDoctorsCount.js";
import departmentAppointmentCount from "./MyServerFunctions/Doctor/departmentAppointmentCount.js";
import departmentAppointmentCurrMonth from "./MyServerFunctions/Doctor/departmentAppointmentCurrMonth.js";
import departmentPatientTodayCount from "./MyServerFunctions/Doctor/departmentPatientTodayCount.js";
import departmentCurrMonthPatientCount from "./MyServerFunctions/Doctor/departmentCurrMonthPatientCount.js";
import deoartmentAppointmentToday from "./MyServerFunctions/Doctor/deoartmentAppointmentToday.js";
import departmentsServicesChart from "./MyServerFunctions/Doctor/departmentsServicesChart.js";
import monthlyPatientVisit from "./MyServerFunctions/Doctor/monthlyPatientVisit.js";
import removeFromQueue from "./MyServerFunctions/Nurse/removeFromQueue.js";
import fetchMyRecord from "./MyServerFunctions/Patient/fetchMyRecord.js";
import upcomingAppointments from "./MyServerFunctions/Nurse/upcomingAppointments.js";
import myUnattendedAppointment from "./MyServerFunctions/Patient/myUnattendedAppointment.js";
import myAppointmentTotal from "./MyServerFunctions/Patient/myAppointmentTotal.js";
import userEmergencyContact from "./MyServerFunctions/Patient/userEmergencyContact.js";
import inserEmergencyContact from "./MyServerFunctions/Patient/inserEmergencyContact.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directoryParts = __dirname.split(sep);
const wordOfHopeIndex = directoryParts.indexOf("WordOfHope");
const wordOfHopePath =
  wordOfHopeIndex !== -1
    ? directoryParts.slice(0, wordOfHopeIndex + 1).join(sep)
    : null;

const PORT = process.env.PORT || 5000;
const saltRounds = 10;

// const directory = path.parse(__dirname).dir;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// admin.initializeApp({
//   credential: admin.credential.cert(credentials)
// });

const server = http.createServer(app);
const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPW,
  port: process.env.PGPORT,
});
db.connect();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/empImg");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const attendanceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/attendanceImg`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "attendanceImg-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });
const uploadAttendance = multer({ storage: attendanceStorage });

io.of("/UserAuth").on("connection", (socket) => {
  try {
    socket.on("user_registration", async (data) => {
      console.log("registration");
      const { username, confirmpass } = data;
      const verifyUsername = await GetUserInfo(db, username);
      if (verifyUsername.rowCount) {
        socket.emit("existingUser", username);
      }

      console.log(data);

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(confirmpass, salt);

      const userRegistration = await RegisterUser(db, hash, data);
    });
  } catch (error) {
    console.error("userAuth error:  " + error);
  }
});

app.post("/fb", async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  const userResponse = await admin.auth().createUser({
    email: email,
    password: password,
    emailVerified: false,
    disabled: false,
  });

  res.json(userResponse);
});

io.of("/Patient").on("connection", (socket) => {
  try {
    // console.log("userConnected: " + socket.id);

    socket.on("update_patient", async (data) => {
      const result = await UpdateMyPatientProfile(db, data);
      socket.emit("edit_result", result);
      const patientResult = await GetMyProfileData(db, data);
      socket.emit("new_patient_profile", patientResult);
    });

    socket.on("book_my_appointment", async (data) => {
      const qrCode = "qr_code-" + uid(16);

      const result = await GetAppointmentNum(db);
      const apptId = await PadZeroes(result + 1, 8);

      const bookingResult = await BookMyself(db, data, apptId, qrCode);
      const url = "http://localhost:3000/ViewAppointment/" + qrCode;
      var qr_svg = qr.image(url);

      const rootFolder = wordOfHopePath;
      const qrFilePath = "public/qrImgs/" + qrCode + ".png";
      qr_svg.pipe(fs.createWriteStream(qrFilePath));

      socket.emit("booking_myself_result", {
        result: bookingResult,
        id: apptId,
      });
      const myAppointments = await GetMyAppointment(db, data.userId);
      socket.emit("get_self_appointment", myAppointments);
    });

    socket.on("book_other_appointment", async (data) => {
      const qrCode = "qr_code-" + uid(16);

      const result = await GetAppointmentNum(db);
      const apptId = await PadZeroes(result + 1, 8);
      const bookingResult = await BookOthers(db, data, apptId, qrCode);
      const url = "http://localhost:3000/ViewAppointment/" + qrCode;
      var qr_svg = qr.image(url);

      const rootFolder = wordOfHopePath;
      const qrFilePath = "public/qrImgs/" + qrCode + ".png";

      qr_svg.pipe(fs.createWriteStream(qrFilePath));

      socket.emit("booking_other_result", {
        result: bookingResult,
        id: apptId,
      });
      const myAppointments = await GetThirdPartyAppointment(db, data.userId);
      socket.emit("get_third_party_appointment", myAppointments);
      // console.log(data);
    });
  } catch (error) {
    console.error("Socket Patient Error: " + error);
  }
});

app.post("/rfid-scanner", async (req, res) => {
  try {
    const { rfid } = req.body;
    const employeeRes = await db.query(
      "SELECT id, firstname, middlename,lastname, suffix from employee WHERE rfid=$1",
      [rfid]
    );

    if (employeeRes.rowCount > 0) {
      const empId = employeeRes.rows[0].id;
      const today = dayjs(Date.now()).format("dddd");
      const yesterday = dayjs(Date.now()).subtract(1, "day").format("dddd");
      const existingEmpId = await employeeIdExist(db, empId);
      const hasExistingSchedule = await checkExistingEmployeeSched(db, empId);
      if (hasExistingSchedule) {
        const currTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const hasAttendance = await checkLatestAttendance(db, empId);
        const hasSchedToday = await checkTodaySchedule(db, empId, today);
        const hasSchedYesterday = await checkTodaySchedule(
          db,
          empId,
          yesterday
        );
        if (hasAttendance) {
          if (hasAttendance.arrival && hasAttendance.departure) {
            if (hasSchedYesterday) {
              const yesterdaySched = await getEmployeeDaySchedReverse(
                db,
                empId,
                yesterday
              );
              if (
                dayjs("1970-01-01T " + yesterdaySched.endtime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) <=
                dayjs("1970-01-01T " + yesterdaySched.starttime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              ) {
                const yesterdayEndtime = dayjs(
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                    " " +
                    yesterdaySched.endtime
                ).format("YYYY-MM-DD HH:mm:ss");
                const yesterdayStartTime = dayjs(
                  dayjs(Date.now()).subtract(1, "day").format("YYYY-MM-DD") +
                    " " +
                    yesterdaySched.starttime
                ).format("YYYY-MM-DD HH:mm:ss");
                if (
                  currTime < yesterdayEndtime &&
                  currTime > yesterdayStartTime
                ) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Late",
                    startTime: dayjs(yesterdayStartTime).format("HH:mm:ss"),
                    endTime: dayjs(yesterdayEndtime).format("HH:mm:ss"),
                  });
                }
              }
            }

            if (hasSchedToday) {
              const empSchedRes = await getEmployeeDaySchedule(
                db,
                empId,
                today
              );

              for (let i = 0; i < empSchedRes.rows.length; i++) {
                const startTime =
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                  " " +
                  empSchedRes.rows[i].starttime;
                let endTime =
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                  " " +
                  empSchedRes.rows[i].endtime;
                if (endTime < startTime) {
                  endTime = dayjs(endTime)
                    .add(1, "day")
                    .format("YYYY-MM-DD HH:mm:ss");
                }
                const gracePeriod = dayjs(startTime)
                  .add(15, "minutes")
                  .format("YYYY-MM-DD HH:mm:ss");
                if (currTime > gracePeriod && currTime < endTime) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Late",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                } else if (currTime < startTime && currTime < endTime) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Early",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                } else if (currTime >= startTime && currTime <= gracePeriod) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "On-time",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                }
              }
            }
            return res.json({
              status: "success",
              employee: existingEmpId,
              timeIn: true,
              attendanceStatus: "Unscheduled",
              startTime: null,
              endTime: null,
            });
          }

          let nextTap;
          const arrivalTime = dayjs(hasAttendance.arrival).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const todayStartTime =
            dayjs(arrivalTime).format("YYYY-MM-DD") +
            " " +
            hasAttendance.starttime;

          if (hasAttendance.status === "Late") {
            nextTap = dayjs(arrivalTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            nextTap = dayjs(todayStartTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          }

          if (hasAttendance.status === "Unscheduled") {
            nextTap = dayjs(arrivalTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          }

          if (dayjs(currTime).format("YYYY-MM-DD HH:mm:ss") > nextTap) {
            return res.json({
              status: "success",
              employee: existingEmpId,
              timeIn: false,
              attendanceStatus: "timeout",
              startTime: "",
              endTime: "",
            });
          }

          return res.json({
            status: "invalid",
            errMessage:
              "Just timed in. Wait for " + dayjs(nextTap).format("hh:mm A"),
          });
        }

        if (hasSchedYesterday) {
          const yesterdaySched = await getEmployeeDaySchedReverse(
            db,
            empId,
            yesterday
          );
          if (
            dayjs("1970-01-01T " + yesterdaySched.endtime).format(
              "YYYY-MM-DD HH:mm:ss"
            ) <=
            dayjs("1970-01-01T " + yesterdaySched.starttime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ) {
            const yesterdayEndtime = dayjs(
              dayjs(Date.now()).format("YYYY-MM-DD") +
                " " +
                yesterdaySched.endtime
            ).format("YYYY-MM-DD HH:mm:ss");
            const yesterdayStartTime = dayjs(
              dayjs(Date.now()).subtract(1, "day").format("YYYY-MM-DD") +
                " " +
                yesterdaySched.starttime
            ).format("YYYY-MM-DD HH:mm:ss");
            if (currTime < yesterdayEndtime && currTime > yesterdayStartTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Late",
                startTime: dayjs(yesterdayStartTime).format("HH:mm:ss"),
                endTime: dayjs(yesterdayEndtime).format("HH:mm:ss"),
              });
            }
          }
        }

        if (hasSchedToday) {
          const empSchedRes = await getEmployeeDaySchedule(db, empId, today);

          for (let i = 0; i < empSchedRes.rows.length; i++) {
            const startTime =
              dayjs(Date.now()).format("YYYY-MM-DD") +
              " " +
              empSchedRes.rows[i].starttime;
            let endTime =
              dayjs(Date.now()).format("YYYY-MM-DD") +
              " " +
              empSchedRes.rows[i].endtime;
            if (endTime < startTime) {
              endTime = dayjs(endTime)
                .add(1, "day")
                .format("YYYY-MM-DD HH:mm:ss");
            }
            const gracePeriod = dayjs(startTime)
              .add(15, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            if (currTime > gracePeriod && currTime < endTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Late",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            } else if (currTime < startTime && currTime < endTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Early",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            } else if (currTime >= startTime && currTime <= gracePeriod) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "On-time",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            }
          }
        }

        return res.json({
          status: "success",
          employee: existingEmpId,
          timeIn: true,
          attendanceStatus: "Unscheduled",
          startTime: null,
          endTime: null,
        });
      }

      return res.json({
        status: "invalid",
        errMessage: "Employee does not have a schedule!",
      });
    }
    return res.json({
      status: "invalid",
      errMessage: "Employee does not exists!",
    });
  } catch (error) {
    return res.json({ status: "error", errMessage: error.message });
  }
});

app.post("/empid-input", async (req, res) => {
  try {
    const { empId } = req.body;
    const today = dayjs(Date.now()).format("dddd");
    const yesterday = dayjs(Date.now()).subtract(1, "day").format("dddd");
    const existingEmpId = await employeeIdExist(db, empId);

    if (existingEmpId) {
      const hasExistingSchedule = await checkExistingEmployeeSched(db, empId);
      if (hasExistingSchedule) {
        const currTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const hasAttendance = await checkLatestAttendance(db, empId);
        const hasSchedToday = await checkTodaySchedule(db, empId, today);
        const hasSchedYesterday = await checkTodaySchedule(
          db,
          empId,
          yesterday
        );
        if (hasAttendance) {
          if (hasAttendance.arrival && hasAttendance.departure) {
            if (hasSchedYesterday) {
              const yesterdaySched = await getEmployeeDaySchedReverse(
                db,
                empId,
                yesterday
              );
              if (
                dayjs("1970-01-01T " + yesterdaySched.endtime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) <=
                dayjs("1970-01-01T " + yesterdaySched.starttime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              ) {
                const yesterdayEndtime = dayjs(
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                    " " +
                    yesterdaySched.endtime
                ).format("YYYY-MM-DD HH:mm:ss");
                const yesterdayStartTime = dayjs(
                  dayjs(Date.now()).subtract(1, "day").format("YYYY-MM-DD") +
                    " " +
                    yesterdaySched.starttime
                ).format("YYYY-MM-DD HH:mm:ss");
                if (
                  currTime < yesterdayEndtime &&
                  currTime > yesterdayStartTime
                ) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Late",
                    startTime: dayjs(yesterdayStartTime).format("HH:mm:ss"),
                    endTime: dayjs(yesterdayEndtime).format("HH:mm:ss"),
                  });
                }
              }
            }

            if (hasSchedToday) {
              const empSchedRes = await getEmployeeDaySchedule(
                db,
                empId,
                today
              );

              for (let i = 0; i < empSchedRes.rows.length; i++) {
                const startTime =
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                  " " +
                  empSchedRes.rows[i].starttime;
                let endTime =
                  dayjs(Date.now()).format("YYYY-MM-DD") +
                  " " +
                  empSchedRes.rows[i].endtime;
                if (endTime < startTime) {
                  endTime = dayjs(endTime)
                    .add(1, "day")
                    .format("YYYY-MM-DD HH:mm:ss");
                }
                const gracePeriod = dayjs(startTime)
                  .add(15, "minutes")
                  .format("YYYY-MM-DD HH:mm:ss");
                if (currTime > gracePeriod && currTime < endTime) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Late",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                } else if (currTime < startTime && currTime < endTime) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "Early",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                } else if (currTime >= startTime && currTime <= gracePeriod) {
                  return res.json({
                    status: "success",
                    employee: existingEmpId,
                    timeIn: true,
                    attendanceStatus: "On-time",
                    startTime: dayjs(startTime).format("HH:mm:ss"),
                    endTime: dayjs(endTime).format("HH:mm:ss"),
                  });
                }
              }
            }
            return res.json({
              status: "success",
              employee: existingEmpId,
              timeIn: true,
              attendanceStatus: "Unscheduled",
              startTime: null,
              endTime: null,
            });
          }

          let nextTap;
          const arrivalTime = dayjs(hasAttendance.arrival).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const todayStartTime =
            dayjs(arrivalTime).format("YYYY-MM-DD") +
            " " +
            hasAttendance.starttime;

          if (hasAttendance.status === "Late") {
            nextTap = dayjs(arrivalTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            nextTap = dayjs(todayStartTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          }

          if (hasAttendance.status === "Unscheduled") {
            nextTap = dayjs(arrivalTime)
              .add(30, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
          }

          if (dayjs(currTime).format("YYYY-MM-DD HH:mm:ss") > nextTap) {
            return res.json({
              status: "success",
              employee: existingEmpId,
              timeIn: false,
              attendanceStatus: "timeout",
              startTime: "",
              endTime: "",
            });
          }

          return res.json({
            status: "invalid",
            errMessage:
              "Just timed in. Wait for " + dayjs(nextTap).format("hh:mm A"),
          });
        }

        if (hasSchedYesterday) {
          const yesterdaySched = await getEmployeeDaySchedReverse(
            db,
            empId,
            yesterday
          );
          if (
            dayjs("1970-01-01T " + yesterdaySched.endtime).format(
              "YYYY-MM-DD HH:mm:ss"
            ) <=
            dayjs("1970-01-01T " + yesterdaySched.starttime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ) {
            const yesterdayEndtime = dayjs(
              dayjs(Date.now()).format("YYYY-MM-DD") +
                " " +
                yesterdaySched.endtime
            ).format("YYYY-MM-DD HH:mm:ss");
            const yesterdayStartTime = dayjs(
              dayjs(Date.now()).subtract(1, "day").format("YYYY-MM-DD") +
                " " +
                yesterdaySched.starttime
            ).format("YYYY-MM-DD HH:mm:ss");
            if (currTime < yesterdayEndtime && currTime > yesterdayStartTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Late",
                startTime: dayjs(yesterdayStartTime).format("HH:mm:ss"),
                endTime: dayjs(yesterdayEndtime).format("HH:mm:ss"),
              });
            }
          }
        }

        if (hasSchedToday) {
          const empSchedRes = await getEmployeeDaySchedule(db, empId, today);

          for (let i = 0; i < empSchedRes.rows.length; i++) {
            const startTime =
              dayjs(Date.now()).format("YYYY-MM-DD") +
              " " +
              empSchedRes.rows[i].starttime;
            let endTime =
              dayjs(Date.now()).format("YYYY-MM-DD") +
              " " +
              empSchedRes.rows[i].endtime;
            if (endTime < startTime) {
              endTime = dayjs(endTime)
                .add(1, "day")
                .format("YYYY-MM-DD HH:mm:ss");
            }
            const gracePeriod = dayjs(startTime)
              .add(15, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            if (currTime > gracePeriod && currTime < endTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Late",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            } else if (currTime < startTime && currTime < endTime) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "Early",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            } else if (currTime >= startTime && currTime <= gracePeriod) {
              return res.json({
                status: "success",
                employee: existingEmpId,
                timeIn: true,
                attendanceStatus: "On-time",
                startTime: dayjs(startTime).format("HH:mm:ss"),
                endTime: dayjs(endTime).format("HH:mm:ss"),
              });
            }
          }
        }

        return res.json({
          status: "success",
          employee: existingEmpId,
          timeIn: true,
          attendanceStatus: "Unscheduled",
          startTime: null,
          endTime: null,
        });
      }

      return res.json({
        status: "invalid",
        errMessage: "Employee does not have a schedule.",
      });
    }
    return res.json({
      status: "invalid",
      errMessage: "Employee does not exists",
    });
  } catch (error) {
    return res.json({ status: "error", errMessage: error.message });
  }
});

app.post("/upload-attendance", async (req, res) => {
  try {
    const base64Data = req.body.attendanceImg.replace(
      /^data:image\/jpeg;base64,/,
      ""
    ); // Adjust if your image format is different
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = "attendanceImg-" + uniqueSuffix + ".jpeg";

    const filePath = `public/attendanceImg/${fileName}`;
    // Write the base64 data to a file
    fs.writeFileSync(filePath, base64Data, "base64");

    const { id, attendanceStatus, startTime, endTime } = req.body;
    const currTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (req.body.isTimingIn) {
      const sql =
        "INSERT into attendance (empid, arrival, status, arrivalimg, startTime, endTime) VALUES ($1, $2, $3, $4,$5,$6)";
      const inserAttendance = await db.query(sql, [
        id,
        currTime,
        attendanceStatus,
        fileName,
        startTime,
        endTime,
      ]);
    } else {
      const hasAttendance = await checkLatestAttendance(db, id);
      console.log(hasAttendance.id);

      const sql =
        "UPDATE attendance set departure=$1, departureimg=$2 WHERE id=$3";

      const insertTimeOut = await db.query(sql, [
        currTime,
        fileName,
        hasAttendance.id,
      ]);
    }
    res.status(200).send("Image uploaded successfully");
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).send("Error saving image");
  }
});
app.get("/ViewAppointment/:qr", async (req, res) => {
  try {
    const qrCode = req.params.qr;
    const appointedFor = await ScanQr(db, qrCode);
    if (!appointedFor) {
      return null;
    }

    if (appointedFor === "Self") {
      const QrSelfAppointment = await ScanQrSelfAppointment(db, qrCode);
      res.json({
        appointment: QrSelfAppointment,
      });
    } else {
      const QrThirdPartyAppointment = await ScanThirdPartyQr(db, qrCode);
      res.json({
        appointment: QrThirdPartyAppointment,
      });
    }
  } catch (error) {
    console.error("ViewAppointment/:qr: " + error);
  }
});
async function fetchNcrCities() {
  try {
    const response = await axios.get(
      "https://psgc.gitlab.io/api/regions/130000000/cities-municipalities/"
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch NCR cities: " + error.message);
  }
}

// Function to fetch NCR barangays
async function fetchNcrBarangays() {
  try {
    const response = await axios.get(
      "https://psgc.gitlab.io/api/regions/130000000/barangays/"
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch NCR barangays: " + error.message);
  }
}

// Route to handle API request
app.get("/api", async (req, res) => {
  try {
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const empl = await db.query(
      "SELECT employee.*, wohUser.email from employee JOIN wohUser ON employee.userId = wohUser.id"
    );

    const employees = [];

    empl.rows.forEach((employee) => {
      employees.push(employee);
    });

    res.json({
      ncr: { cities: ncrCities, barangays: ncrBarangays },
      employee: employees,
    });
  } catch (error) {
    console.error("API request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/patient-edit-my-profile/:user", async (req, res) => {
  try {
    const currUser = req.params.user;
    const {
      lastname,
      firstname,
      middlename,
      suffix,
      birthdate,
      sex,
      email,
      phone,
      street,
      province,
      city,
      barangay,
      zip,
    } = req.body;
    const patientId = req.body["confirm-edit"];

    await db.query(
      "update userProfile SET lastname=$1, firstname=$2, middlename=$3, suffix=$4,  birthdate=$5, sex=$6, phone=$7, street=$8, province=$9, city=$10, barangay=$11, zip=$12 WHERE id=$13",
      [
        lastname,
        firstname,
        middlename,
        suffix,
        birthdate,
        sex,
        phone,
        street,
        province,
        city,
        barangay,
        zip,
        patientId,
      ]
    );

    await db.query("UPDATE wohUser set email=$1 WHERE id=$2", [
      email,
      currUser,
    ]);
    console.log(currUser);

    res.redirect(`/WordOfHope/Patient/${currUser}/Patient-Profile`);
  } catch (error) {
    console.log("Update Employee Error: " + error.message);
  }
});

app.post("/Validate-Add-Employee", async (req, res) => {
  try {
    const { email } = req.body;
    const emailCount = await CheckExistingEmail(db, email);

    let errors = {
      email: "",
      rfid: "",
    };

    if (parseInt(emailCount) > 0) {
      errors.email = "Email already exist!";
    }

    if (req.body.rfid !== "") {
      const rfidCount = await CheckExistingRfid(db, req.body.rfid);
      if (parseInt(rfidCount) > 0) {
        errors.rfid = "RFID already exist!";
      }
    }

    if (errors.rfid !== "" || errors.email !== "") {
      return res.json({ status: "invalid", errorIn: errors });
    }

    return res.json({ status: "success" });
  } catch (error) {
    console.error("Validate-Add-Employee Error: " + error.message);
  }
});

app.post("/add-employee-no-img/:user", async (req, res) => {
  try {
    const { user } = req.params;

    const empl = await db.query("SELECT COUNT(*) from employee");
    const employeeCount = empl.rows[0].count;

    const num = parseInt(employeeCount) + 1;
    const empId = (num, places) => String(num).padStart(places, "0");

    const username = empId(num, 3);

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(username, salt);

    const addEmployeeResult = await addNewEmployeeNoImg(
      db,
      username,
      hash,
      req.body,
      user
    );

    if (addEmployeeResult === "success") {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("/add-employee/:user no image error: " + error.message);
    res.status(503).json("Internal server error: " + error.message);
  }
});

app.post(
  "/add-employee/:user",
  upload.single("employeeImg"),
  async (req, res) => {
    try {
      const { user } = req.params;
      const image = req.file.filename;

      const empl = await db.query("SELECT COUNT(*) from employee");
      const employeeCount = empl.rows[0].count;

      const num = parseInt(employeeCount) + 1;
      const empId = (num, places) => String(num).padStart(places, "0");

      const username = empId(num, 3);

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(username, salt);

      const addEmployeeResult = await AddNewEmployee(
        db,
        username,
        hash,
        req.body,
        user,
        image
      );

      if (addEmployeeResult === "success") {
        return res.json({ status: "success" });
      }
    } catch (error) {
      console.error("/add-employee/:use error: " + error.message);
      res.status(503).json("Internal server error: " + error.message);
    }
  }
);

app.post("/update-employee/:user", async (req, res) => {
  const currUser = req.params.user;
  try {
    const {
      firstname,
      lastname,
      middlename,
      suffix,
      sex,
      birthdate,
      email,
      phone,
      province,
      city,
      barangay,
      street,
      zip,
      position,
      department,
      empType,
      rfid,
      empId,
      userId,
      prevEmail,
      prevRfid,
    } = req.body;

    const emailCount = await CheckExistingEmail(db, email);

    let errors = {
      email: "",
      rfid: "",
    };

    if (_.toLower(email) !== _.toLower(prevEmail)) {
      if (parseInt(emailCount) > 0) {
        errors.email = "Email already exist!";
      }
    }

    if (req.body.rfid !== "") {
      if (prevRfid !== rfid) {
        const rfidCount = await CheckExistingRfid(db, req.body.rfid);
        if (parseInt(rfidCount) > 0) {
          errors.rfid = "RFID already exist!";
        }
      }
    }

    if (errors.rfid !== "" || errors.email !== "") {
      return res.json({ status: "invalid", errorIn: errors });
    }

    const selectPositionName =
      "SELECT position_name from positions where id=$1";

    const positionName = await db.query(selectPositionName, [position]);

    const wohUser = await db.query(
      "UPDATE wohUser SET userType=$1, email=$2 WHERE id=$3",
      [positionName.rows[0].position_name, _.trim(email), userId]
    );

    await db.query(
      "update employee SET firstname=$1, lastname=$2, middlename=$3, suffix=$4, sex=$5, birthdate=$6,  phone=$7, province=$8, city=$9, barangay=$10, street=$11, zip=$12, position=$13, department=$14, empType=$15,rfid=$16, modifiedBy=$17 WHERE id=$18",
      [
        titleCase(_.toLower(_.trim(firstname))),
        titleCase(_.toLower(_.trim(lastname))),
        titleCase(_.toLower(_.trim(middlename))),
        suffix,
        sex,
        birthdate,
        phone,
        province,
        city,
        barangay,
        street,
        zip,
        position,
        department,
        empType,
        rfid,
        currUser,
        empId,
      ]
    );

    return res.json({ status: "success" });
    // res.redirect(`/WordOfHope/MNS/${currUser}/Accounts`);
  } catch (error) {
    console.log("Update Employee Error: " + error.message);
  }
});

app.post(
  "/update-employee-with-img/:user",
  upload.single("employeeImg"),
  async (req, res) => {
    const currUser = req.params.user;
    try {
      const {
        firstname,
        lastname,
        middlename,
        suffix,
        sex,
        birthdate,
        phone,
        province,
        city,
        barangay,
        email,
        street,
        zip,
        position,
        department,
        shift,
        empType,
        rfid,
        empId,
        userId,
        prevEmail,
        prevRfid,
      } = req.body;

      const emailCount = await CheckExistingEmail(db, email);

      let errors = {
        email: "",
        rfid: "",
      };

      if (_.toLower(email) !== _.toLower(prevEmail)) {
        if (parseInt(emailCount) > 0) {
          errors.email = "Email already exist!";
        }
      }

      if (req.body.rfid !== "") {
        if (prevRfid !== rfid) {
          const rfidCount = await CheckExistingRfid(db, req.body.rfid);
          if (parseInt(rfidCount) > 0) {
            errors.rfid = "RFID already exist!";
          }
        }
      }

      if (errors.rfid !== "" || errors.email !== "") {
        return res.json({ status: "invalid", errorIn: errors });
      }

      const image = req.file.filename;

      await db.query(
        "update employee SET firstname= $1, lastname = $2, middlename=$3, suffix=$4, sex=$5, birthdate=$6, phone=$7, province=$8, city=$9, barangay=$10, street=$11, zip=$12, position=$13, department=$14, modifiedBy=$15, empType=$16,rfid=$17, empimg=$18 WHERE id=$19",
        [
          titleCase(_.toLower(_.trim(firstname))),
          titleCase(_.toLower(_.trim(lastname))),
          titleCase(_.toLower(_.trim(middlename))),
          suffix,
          sex,
          birthdate,
          phone,
          province,
          city,
          barangay,
          street,
          zip,
          position,
          department,
          currUser,
          empType,
          rfid,
          image,
          empId,
        ]
      );

      const selectPositionName =
        "SELECT position_name from positions where id=$1";

      const positionName = await db.query(selectPositionName, [position]);
      await db.query("UPDATE wohUser SET userType=$1, email=$2 WHERE id=$3", [
        position,
        _.trim(email),
        userId,
      ]);
      return res.json({ status: "success" });
      // res.redirect(`/WordOfHope/MNS/${currUser}/Accounts`);
    } catch (error) {
      console.log("Update with Image Error: " + error.message);
    }
  }
);

// LOGIN

app.post("/Logout/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const updateLogin = await db.query(
      "UPDATE wohUser SET loggedin=$1 WHERE id=$2",
      [false, uid]
    );
    if (updateLogin.rowCount <= 0) {
      return res
        .status(500)
        .json({ status: "failed", errorMessage: "Logout attempt failed" });
    }

    return res.status(200).json({ message: "logout success" });
  } catch (error) {
    console.log("Logout api error: " + error.message);
  }
});

app.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const getUserResult = await db.query(
      "SELECT id, username, password, userType, email, accountstatus FROM wohUser WHERE username=$1 OR email=$1",
      [username]
    );

    // console.log(getUserResult);
    if (getUserResult.rows.length > 0) {
      const firstRow = getUserResult.rows[0];
      const dbPass = firstRow.password;
      const userType = firstRow.usertype;
      const dbEmail = firstRow.email;

      const accountStatus = firstRow.accountstatus;
      const uid = firstRow.id;
      const match = await bcrypt.compare(password, dbPass);

      if (match) {
        if (accountStatus === "Deactivated") {
          return res.json({
            status: "failed",
            errorMessage: "Account deactivated! Plss, contact the admin!",
          });
        }

        const updateLogin = await db.query(
          "UPDATE wohUser SET loggedin=$1 WHERE id=$2",
          [true, uid]
        );
        if (updateLogin.rowCount <= 0) {
          return res.json({
            status: "failed",
            errorMessage: "Login attempt failed",
          });
        }

        return res.json({
          role: userType,
          id: uid,
          email: dbEmail,
          status: "Success",
        });

        // if (userType === "Nurse") {
        //   res.redirect(`/WordOfHope/Nurse/${username}/Dashboard`);
        // } else if (userType === "HR") {
        //   console.log("HR log");
        //   res.redirect(`/WordOfHope/HR/${username}/Dashboard`);
        // } else if (userType === "MNS") {
        //   res.redirect(`/WordOfHope/MNS/${uid}/Dashboard`);
        // } else if (userType === "Doctor") {
        //   res.redirect(`/WordOfHope/Doctor/${username}/Dashboard`);
        // } else if (userType === "Patient") {
        //   res.redirect(`WordOfHope/Patient/${uid}/Dashboard`);
        // }
      }
      console.log(`pass dont match`);
      return res.json({ status: "failed", errorMessage: "Invalid password" });
    } else {
      console.log(`dont exist`);
      return res.json({
        status: "failed",
        errorMessage: "User does not exist",
      });
    }

    // res.redirect("/Login");
  } catch (error) {
    return res.json({ status: "failed", errorMessage: error.message });
  }
});

app.post(
  "/update-user-img",
  upload.single("employee-image"),
  async (req, res) => {
    try {
      const updateResult = await updateEmployeeImage(
        db,
        req.body.userId,
        req.file.filename
      );

      if (updateResult) {
        return res.json({ status: "success" });
      }

      return res.json({
        status: "invalid",
        errmessage: "Image update failed!",
      });
    } catch (error) {
      console.error("update-user-img error: " + error.message);
    }
  }
);

app.get("/renew-user/:user", async (req, res) => {
  try {
    const uid = req.params.user;

    const employeeResult = await fetchEmployeeUserInfo(db, uid);
    res.json({
      user: employeeResult.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/WordOfHope/Nurse/:user", async (req, res) => {
  try {
    const uid = req.params.user;

    // console.log(username);
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const apptToday = await appointmentToday(db);
    const employeeResult = await fetchEmployeeUserInfo(db, uid);
    const myAttendance = await fetchMyAttendance(db, employeeResult.rows[0].id);
    const currentlyServing = await fetchNurseCurrentlyServing(db);
    const patientRecords = await fetchAllPatientRecords(db);
    const queues = await fetchQueues(db);
    const services = await fetchAllServices(db);
    const availableDays = await fetchDoctorsDaySched(db);
    const appointmentsUpcoming = await upcomingAppointments(db)
    return res.json({
      user: employeeResult.rows,
      appointmentsToday: apptToday,
      currentlyServing: currentlyServing,
      inQueue: queues,
      availableDays: availableDays,
      services: services,
      appointmentsUpcoming: appointmentsUpcoming,
      patientRecords: patientRecords,
      myAttendance: myAttendance,
      ncr: { cities: ncrCities, barangays: ncrBarangays },
    });
  } catch (error) {
    console.error("API request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/view-attendance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await viewedAttendance(db, id);

    return res.status(200).json(attendance);
  } catch (error) {
    console.error("view attendance API error: " + error.message);
  }
});

app.post("/walkin-appointment/:nurse_id", async (req, res) => {
  try {
    const { nurse_id } = req.params;
    const qrCode = "qr_code-" + uid(16);

    const result = await GetAppointmentNum(db);
    const apptId = await PadZeroes(result + 1, 8);
    const url = "http://localhost:3000/ViewAppointment/" + qrCode;
    var qr_svg = qr.image(url);
    const qrFilePath = "public/qrImgs/" + qrCode + ".png";
    const bookingResult = await insertWalkinAppointment(
      db,
      req.body,
      nurse_id,
      qrCode,
      apptId
    );
    qr_svg.pipe(fs.createWriteStream(qrFilePath));
    if (bookingResult) {
      const queueCount = await QueueCount(db);
      const queueNum = queueCount + 1;
      const result = await InsertQueue(db, apptId, queueNum);

      if (result) {
        const updateStatus = await updateInQueueSched(db, apptId);
        if (updateStatus) {
          return res.json({
            status: "success",
            queue_num: queueNum,
            appointment_id: apptId,
          });
        }
      }
    }

    qr_svg.pipe(fs.createWriteStream(qrFilePath));
  } catch (error) {
    console.error("walkin-appointment API error: " + error.message);
  }
});

app.get("/fetchQueues", async (req, res) => {
  try {
    const queues = await fetchQueues(db);
    const apptToday = await appointmentToday(db);
    return res.json({
      inQueue: queues,
      appointmentsToday: apptToday,
    });
  } catch (error) {
    console.error("fetchQueue Error: " + error.message);
  }
});

app.post("/add-to-queue/:appointmentid", async (req, res) => {
  try {
    const { appointmentid } = req.params;

    const queueCount = await QueueCount(db);
    const queueNum = queueCount + 1;
    const result = await InsertQueue(db, appointmentid, queueNum);

    if (result) {
      const updateStatus = await updateInQueueSched(db, appointmentid);
      if (updateStatus) {
        return res.status(200).json({
          status: "success",
        });
      }
    }
  } catch (error) {
    console.error("add to queue api error: " + error.message);
  }
});
app.get("/WordOfHope/Doctor/:user", async (req, res) => {
  try {
    const uid = req.params.user;

    const employeeResult = await fetchEmployeeUserInfo(db, uid);

    const doctorPatientRecord = await fetchDoctorPatientRecord(
      db,
      employeeResult.rows[0].id
    );
    const myAttendance = await fetchMyAttendance(db, employeeResult.rows[0].id);
    const patientRecords = await fetchAllPatientRecords(db);
    const queue = await fetchDoctorQueue(db, employeeResult.rows[0].department);
    const services = await doctorDepartmentService(
      db,
      employeeResult.rows[0].department
    );
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const ongoingAppointment = await fetchOngoingAppointment(
      db,
      employeeResult.rows[0].id
    );

    const serviceChartData = await serviceChart(db);
    res.json({
      user: employeeResult.rows,
      inQueue: queue,
      myAttendance: myAttendance,
      currentlyServing: ongoingAppointment,
      services: services,
      serviceChartData: serviceChartData,
      doctorPatientRecord: doctorPatientRecord,
      patientRecords: patientRecords,
      ncr: { cities: ncrCities, barangays: ncrBarangays },
    });
  } catch (error) {
    console.error("API request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/nurse-dashboard", async (req, res) => {
  try {
    const patientVisit = await avaragePatientVisit(db);
    const appointmentCountToday = await countAppointmentToday(db);
    const patientCountToday = await countPatientToday(db);
    const currMonthAppointment = await appointmentCountCurrMonth(db);
    const patientsCurrMonth = await patientCountCurrMonth(db);
    const loggedinDoctors = await activeDoctors(db);
    const departmentChart = await departmentPatientCount(db);
    const countDepartments = await departmentsCount(db);
    const number_of_doctors = await availableDoctorsCount(db);
    return res.status(200).json({
      patientVisitBar: patientVisit,
      departmentChart: departmentChart,
      countDepartments: countDepartments,
      number_of_doctors: number_of_doctors,
      appointmentCountToday: appointmentCountToday,
      patientCountToday: patientCountToday,
      currMonthAppointment: currMonthAppointment,
      patientsCurrMonth: patientsCurrMonth,
      loggedinDoctors: loggedinDoctors,
    });
  } catch (error) {
    console.error("dashboard api error: " + error.message);
  }
});

app.get("/doctor-dashboard/:department_id", async (req, res) => {
  try {
    const { department_id } = req.params;
    const appointmentCount = await departmentAppointmentCount(
      db,
      department_id
    );
    const appointmentCurrMonth = await departmentAppointmentCurrMonth(
      db,
      department_id
    );

    const totalPatientToday = await departmentPatientTodayCount(db, department_id);
    const currentMonthPatientCount = await departmentCurrMonthPatientCount(db, department_id);
    const appointmentToday = await deoartmentAppointmentToday(db, department_id)
    
    return res
      .status(200)
      .json({
        appointmentCount: appointmentCount,
        appointmentCurrMonth: appointmentCurrMonth,
        currentMonthPatientCount: currentMonthPatientCount,
        totalPatientToday: totalPatientToday,
        appointmentsToday: appointmentToday,
      });
  } catch (error) {
    console.error("/doctor-dashboard/ API ERROR: " + error.message);
  }
});
app.get("/patient-demographics/:deptid", async (req, res) => {
  try {

    const {deptid} =req.params
    const departmentChart = await departmentPatientCount(db);
    const patientVisitServices = await departmentsServicesChart(db, deptid)
    const patientAgeGroupChart = await patientAgeGroup(db);
    const patientVisitPerMonth = await monthlyPatientVisit(db)
    return res.status(200).json({
      departmentChart: departmentChart,
      departmentsServiceData: patientVisitServices,
      patientVisitPerMonth: patientVisitPerMonth,
      patientAgeGroupChart: patientAgeGroupChart,
    });
  } catch (error) {
    console.error("patient-demog error: " + error.message);
  }
});
app.get("/fetchEditPatientRecord/:record_id", async (req, res) => {
  try {
    const { record_id } = req.params;
    const patientData = await fetchPatientEditRecord(db, record_id);
    const diagnosis = await fetchPatientEditDiagnosis(db, record_id);

    return res
      .status(200)
      .json({ patientData: patientData, patient_diagnosis: diagnosis });
  } catch (error) {
    console.error("fetchEditPatientRecord API ERROR: " + error.message);
  }
});
app.get("/update-department-queue/:department", async (req, res) => {
  try {
    const { department } = req.params;
    const queue = await fetchDoctorQueue(db, department);
    res.json({
      inQueue: queue,
    });
  } catch (error) {
    console.error("get-department-queue api: " + error.message);
  }
});

app.post("/next-appointment/:id/:department", async (req, res) => {
  try {
    const { id, department } = req.params;
    const currentlyOngoingQueue = await fetchOngoingAppointment(db, id);
    if (currentlyOngoingQueue.length > 0) {
      const updatePrevious = await updatePreviousServe(
        db,
        currentlyOngoingQueue[0].appointment_id
      );
      if (!updatePrevious) {
        return;
      }
    }
    const topQueue = await fetchTopQueue(db, department);
    if (topQueue) {
      const updatedQueue = await updateFetchQueue(
        db,
        topQueue.appointment_id,
        topQueue.id,
        id
      );

      if (updatedQueue) {
        const ongoingQueue = await fetchOngoingAppointment(db, id);

        return res.json({ currentlyServing: ongoingQueue });
      }
    }

    return res.json({ currentlyServing: [] });
  } catch (error) {
    console.error("next appointment API error: " + error.message);
  }
});

app.post(
  "/return-queue/:appointmentId/:queueId/:doctorId/:department",
  async (req, res) => {
    try {
      const { appointmentId, queueId, doctorId, department } = req.params;

      const queue = await fetchDoctorQueue(db, department);

      if (queue.length === 0) {
        const returned = await returnToQueue(db, appointmentId, queueId);
        if (returned) {
          return res.json({ currentlyServing: [] });
        }
      }
      const topQueue = await fetchTopQueue(db, department);
      if (topQueue) {
        const updatedQueue = await updateFetchQueue(
          db,
          topQueue.appointment_id,
          topQueue.id,
          doctorId
        );

        if (updatedQueue) {
          const returned = await returnToQueue(db, appointmentId, queueId);
          const ongoingQueue = await fetchOngoingAppointment(db, doctorId);

          if (returned) {
            return res.json({ currentlyServing: ongoingQueue });
          }
        }
      }
    } catch (error) {
      console.error("return queue api error: " + error.message);
    }
  }
);

app.get("/WordOfHope/Patient/:user", async (req, res) => {
  try {
    const uid = req.params.user;
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const availableDays = await fetchDoctorsDaySched(db);
    const availableTime = await fetchAvailableDoctorTime(db);
    const services = await fetchPatientServices(db);
    const patientRecord = await fetchMyRecord(db, uid);
    const emergencyContact = await userEmergencyContact(db, uid);
    const patientResult = await db.query(
      "SELECT userProfile.*, wohUser.email, wohUser.username FROM userProfile JOIN wohUser ON userProfile.userId = wohUser.id WHERE userid=$1",
      [uid]
    );

    const patientInfos = [];

    patientResult.rows.forEach((info) => {
      patientInfos.push(info);
    });

    const myAppointments = await GetMyAppointment(db, uid);
    const thirdPartyAppointment = await GetThirdPartyAppointment(db, uid);
    const unattendedAppointment = await myUnattendedAppointment(db, uid);
    const mytotalAppointment = await myAppointmentTotal(db, uid)
    // console.log(myAppointments);
    res.json({
      ncr: { cities: ncrCities, barangays: ncrBarangays },
      user: patientInfos,
      availableDays: availableDays,
      availableTime: availableTime,
      services: services,
      myRecord: patientRecord,
      emergencyContact: emergencyContact,
      mytotalAppointment: mytotalAppointment,
      appointments: {
        selfAppointment: myAppointments,
        thirdPartyAppointment: thirdPartyAppointment,
        unattendedAppointment: unattendedAppointment,
      },
    });
  } catch (error) {
    console.error("Patient login request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/remove-contact/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    const sql = "DELETE FROM userEmergencyContact WHERE id=$1"
    const result = await db.query(sql, [id]);

    if(result.rowCount > 0){
      return res.status(200).json({message: "success"})
    }
  } catch (error) {
    console.error('remove contact error: ' + error.message)
  }
})
app.post("/add-emergency-contact/:uid", async (req, res) =>{
  try {
    const {uid} =  req.params;
    console.log(uid)
    const emergencyContact = await inserEmergencyContact(db, uid, req.body)
    if(emergencyContact){
      return res.status(200).json({success: "message"});
    }
  } catch (error) {
    console.error("add-emergency-contact API ERROR: " + error.message)
  }
})
app.get("/WordOfHope/MNS/:user", async (req, res) => {
  try {
    const uid = req.params.user;

    const employeeResult = await fetchEmployeeUserInfo(db, uid);

    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const myAttendance = await fetchMyAttendance(db, employeeResult.rows[0].id);
    const absentee = await absentEmployee(db);
    const employee = await GetAllEmployee(db);
    const departments = await fetchDepartments(db);
    const positions = await fetchPositions(db);
    const services = await fetchServices(db);
    const attendancesToday = await attendanceToday(db);
    res.json({
      user: employeeResult.rows,
      ncr: { cities: ncrCities, barangays: ncrBarangays },
      employees: employee,
      departments: departments,
      services: services,
      positions: positions,
      absentee: absentee,
      myAttendance: myAttendance,
      attendancesToday: attendancesToday,
    });
  } catch (error) {
    console.error("API request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/Add-Service", async (req, res) => {
  try {
    const { service_type, service_name } = req.body;
    const existingService = await CheckExistingService(
      db,
      service_type,
      service_name
    );

    if (parseInt(existingService) > 0) {
      return res.json({ status: "invalid", message: "Service already exist!" });
    }

    const insertService = await AddService(db, req.body);

    if (insertService) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("Add Service error: " + error.message);
  }
});

app.post("/Update-Services", async (req, res) => {
  try {
    const { service_type, service_name, service_id } = req.body;
    const existingService = await checkExistingServiceUpdate(
      db,
      service_type,
      service_name,
      service_id
    );

    if (parseInt(existingService) > 0) {
      return res.json({ status: "invalid", message: "Service already exist!" });
    }

    const updateService = await UpdateService(db, req.body, service_id);

    if (updateService) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("Update Service error: " + error.message);
  }
});

app.get(
  `/doctor-get-appointment/:id/:method/:appointmentfor`,
  async (req, res) => {
    const { id, method, appointmentfor } = req.params;

    if (method === "Online") {
      if (appointmentfor === "Someone") {
        const appointmentData = await getThirdPartyAppointment(db, id);

        return res.json({ appointment: appointmentData });
      }

      const appointmentData = await getUserAppointment(db, id);
      return res.json({ appointment: appointmentData });
    }

    const appointmentData = await getWalkinAppointment(db, id);
    return res.json({ appointment: appointmentData });
  }
);

app.get("/fetchUserAppointment/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userappointment = await getUserAppointment(db, id);

    return res.json({ userappointment: userappointment });
  } catch (error) {
    console.error("fetchUserAppointment ERROR: " + error.message);
  }
});

app.get("/fetchThirdPartyAppointment/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userappointment = await getThirdPartyAppointment(db, id);

    return res.json({ userappointment: userappointment });
  } catch (error) {
    console.error("fetchUserAppointment ERROR: " + error.message);
  }
});
app.get("/fetchPositions", async (req, res) => {
  try {
    const positions = await fetchPositions(db);
    res.json({
      positions: positions,
    });
  } catch (error) {
    console.error("fetchDepartment API ERROR: " + error.message);
  }
});

app.get("/fetchServices", async (req, res) => {
  try {
    const services = await fetchServices(db);
    res.json({
      services: services,
    });
  } catch (error) {
    console.error("fetchDepartment API ERROR: " + error.message);
  }
});

app.get("/fetchDepartments", async (req, res) => {
  try {
    const departments = await fetchDepartments(db);
    res.json({
      departments: departments,
    });
  } catch (error) {
    console.error("fetchDepartment API ERROR: " + error.message);
  }
});
app.post("/remove-queue", async(req,res)=>{
  try {
    const { id, appointment_id } =req.body;
    const removed = await removeFromQueue(db, id, appointment_id);

    if(removed){
      return res.status(200).json({message: "success"});
    }
    
  } catch (error) {
    console.error("remove queue API ERROR: " + error.message)
  }
})
app.get("/employeeApi", async (req, res) => {
  try {
    const employee = await GetAllEmployee(db);
    res.json({
      employees: employee,
    });
  } catch (error) {
    console.error("Employee API ERROR: " + error.message);
  }
});

app.get("/cityApi", async (req, res) => {
  try {
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    res.json({ cities: ncrCities, barangays: ncrBarangays });
  } catch (error) {
    console.error("API request error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/Add-Department", async (req, res) => {
  try {
    const { department } = req.body;

    const existingDepartment = await CheckExistingDepartment(db, department);

    console.log(existingDepartment);
    if (existingDepartment > 0) {
      return res.json({
        status: "invalid",
        message: "Department already exist!",
      });
    }

    const insertDepartment = await AddNewDepartment(db, department);
    if (insertDepartment) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("/Add-Department API  err: " + error.message);
  }
});

app.post("/Add-Position", async (req, res) => {
  try {
    console.log(req.body);
    const { department_id, position } = req.body;

    const InsertPosition = await AddNewPosition(db, department_id, position);

    if (InsertPosition) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error('"Add position api error: ' + error.message);
  }
});
app.post("/Update-Department", async (req, res) => {
  try {
    const { id, department } = req.body;

    const existingDepartment = await CheckExistingDepartment(db, department);

    if (existingDepartment > 0) {
      return res.json({
        status: "invalid",
        message: "Department already exist!",
      });
    }

    const updateDepartment = await UpdateDepartment(db, id, department);
    if (updateDepartment) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("/Add-Department API  err: " + error.message);
  }
});

app.post("/update-department-availability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;
    console.log(req.body);
    const updateDepartment = await updateDepartmentAvailabilty(
      db,
      id,
      availability
    );
    if (updateDepartment) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error(
      "/update-department-availability api error: " + error.message
    );
    return res
      .status(500)
      .json({ message: "internal server error update-department" });
  }
});
app.post("/employee-account-status/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { accountstatus } = req.body;

    const updateStatus = await updateEmployeeStatus(db, accountstatus, userid);

    if (updateStatus) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error("/employee-account-status API error: " + error.message);
  }
});
app.post("/update-service-availability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;
    const updateDepartment = await updateServiceAvailability(
      db,
      availability,
      id
    );
    if (updateDepartment) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error(
      "/update-department-availability api error: " + error.message
    );
    return res
      .status(500)
      .json({ message: "internal server error update-department" });
  }
});
app.post("/update-position-availability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;
    const updatePosition = await updatePositionAvailability(
      db,
      id,
      availability
    );
    if (updatePosition) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error(
      "/update-department-availability api error: " + error.message
    );
    return res
      .status(500)
      .json({ message: "internal server error update-department" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      suffix,
      email,
      username,
      confirmpass,
    } = req.body;

    // console.log(req.body);

    console.log("first");
    const getEmail = await GetUserEmailInfo(db, email);
    const getUsername = await GetUserInfo(db, username);

    const errors = {};

    if (getEmail.rowCount > 0) {
      errors.email = "Email already exists";
    }

    if (getUsername.rowCount > 0) {
      errors.username = "Username already exists";
    }

    if (Object.keys(errors).length > 0) {
      return res.json({ status: "invalid", errors });
    }

    console.log("first valid");
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(confirmpass, salt);

    // const regUser = await RegisterUser(db, hash, req.body);

    const insertWohUser = await db.query(
      "INSERT INTO wohUser(username, password, userType, email) VALUES ($1, $2 ,$3, $4)",
      [username, hash, "Patient", email]
    );

    if (insertWohUser.rowCount > 0) {
      const userIdResult = await db.query(
        "SELECT id from wohUser WHERE username=$1",
        [username]
      );

      const userId = userIdResult.rows[0].id;

      const insertUserProfile = await db.query(
        "INSERT INTO userProfile (lastname, firstname, suffix, middlename, userId) VALUES ($1, $2, $3, $4, $5)",
        [lastname, firstname, suffix, middlename, userId]
      );

      if (insertUserProfile.rowCount > 0) {
        return res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error(error);
    res.json({ status: "error", errMessage: error });
  }
});

app.post("/scan-qr", async (req, res) => {
  try {
    const { qrCode } = req.body;
    const appointedFor = await ScanQr(db, qrCode);

    if (appointedFor) {
      if (appointedFor === "Self") {
        const qrDetails = await ScanQrSelfAppointment(db, qrCode);
        return res.json({ status: "success", qrData: qrDetails });
      } else {
        const qrDetails = await ScanThirdPartyQr(db, qrCode);
        return res.json({ status: "success", qrData: qrDetails });
      }
    }
    return res.json({ status: "invalid", errMess: "Invalid Qr code" });
  } catch (error) {
    res.json({ status: "error", errMess: error });
  }
});

app.post("/check-current-pass", async (req, res) => {
  try {
    const { username, password } = req.body;

    const dbPass = await GetCurrentPass(db, username);
    const match = await bcrypt.compare(password, dbPass);

    if (match) {
      return res.json({ status: "success" });
    }
    return res.json({
      status: "invalid",
      message: "Invalid current password!",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

app.post("/change-password", async (req, res) => {
  try {
    const { confirmpassword, username } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(confirmpassword, salt);
    const updatePass = await db.query(
      "UPDATE wohUser set password=$1 WHERE username=$2",
      [hash, username]
    );

    if (updatePass.rowCount > 0) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

app.post("/first-time-log", async (req, res) => {
  try {
    const { confirmpassword, username } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(confirmpassword, salt);
    const updatePass = await db.query(
      "UPDATE wohUser set password=$1, firsttimelog=$3 WHERE username=$2",
      [hash, username, false]
    );

    if (updatePass.rowCount > 0) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

app.post("/change-username", async (req, res) => {
  try {
    const { userid, newUsername } = req.body;

    const checkUser = await db.query(
      "SELECT username FROM wohUser WHERE LOWER(username) = LOWER($1)",
      [newUsername]
    );

    if (checkUser.rowCount === 0) {
      const updateUsername = await db.query(
        "UPDATE wohUser set username=$1 WHERE id=$2",
        [newUsername, userid]
      );

      if (updateUsername.rowCount > 0) {
        return res.json({ status: "success" });
      }
    }

    return res.json({ status: "invalid", message: "Username already exist!" });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

app.post("/add-employee-sched/:uid", async (req, res) => {
  try {
    const { id, schedule, createdBy } = req.body;
    for (let i = 0; i < schedule.length; i++) {
      for (let j = 0; j < schedule[i].days.length; j++) {
        const schedInsertResult = await InsertSchedule(
          db,
          id,
          schedule[i].startTime,
          schedule[i].endTime,
          schedule[i].days[j],
          createdBy
        );
        // console.log(schedInsertResult.rowCount);
      }
    }

    return res.json({ status: "success" });
  } catch (error) {
    console.log("sched insert error: " + error.message);
  }
});

app.post("/update-employee-sched", async (req, res) => {
  try {
    const { id, schedule, createdBy } = req.body;

    const schedDeleted = await deleteEmployeesched(db, id);

    if (schedDeleted) {
      let valid = true;
      for (let i = 0; i < schedule.length; i++) {
        for (let j = 0; j < schedule[i].days.length; j++) {
          const schedInsertResult = await InsertSchedule(
            db,
            id,
            schedule[i].startTime,
            schedule[i].endTime,
            schedule[i].days[j],
            createdBy
          );
          if (!schedInsertResult) {
            valid = false;
          }
        }
      }

      if (valid) {
        return res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.log("sched insert error: " + error.message);
  }
});
app.get("/HR/:uid", async (req, res) => {
  try {
    const ncrCities = await fetchNcrCities();
    const ncrBarangays = await fetchNcrBarangays();
    const { uid } = req.params;

    const hrResult = await fetchEmployeeUserInfo(db, uid);
    const myAttendance = await fetchMyAttendance(db, hrResult.rows[0].id);
    const noSchedResult = await getNoSchedEmployee(db);
    const employeeAttendance = await fetchEmployeeAttendance(db);
    const employeeSchedResult = await getSchedule(db);
    const absentee = await absentEmployee(db);
    const attendancesToday = await attendanceToday(db);
    return res.json({
      user: hrResult.rows,
      attendancesToday: attendancesToday,
      noSchedule: noSchedResult,
      absentee: absentee,
      employeeSched: employeeSchedResult,
      myAttendance: myAttendance,
      employeeAttendance: employeeAttendance,
      ncr: { cities: ncrCities, barangays: ncrBarangays },
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/schedules", async (req, res) => {
  try {
    const noSchedResult = await getNoSchedEmployee(db);

    const employeeSchedResult = await getSchedule(db);
    return res.json({
      noSchedule: noSchedResult,
      employeeSched: employeeSchedResult,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/edit-user/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    if (req.body.values.email !== req.body.prevEmail) {
      const emailCount = await CheckExistingEmail(db, req.body.values.email);
      if (emailCount > 0) {
        return res.json({
          status: "invalid",
          errmessage: "Email already exist!",
        });
      }

      const result = await updateEmployee(db, req.body.values, uid);

      if (result === "success") {
        return res.json({ status: "success" });
      }
    } else {
      const result = await updateEmployee(db, req.body.values, uid);

      if (result === "success") {
        return res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/Add-Queue/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queueCount = await QueueCount(db);
    const queueNum = queueCount + 1;
    const result = await InsertQueue(db, id, queueNum);

    if (result) {
      const updateStatus = await updateInQueueSched(db, id);
      if (updateStatus) {
        return res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error("Add-Queue error: " + error.message);
  }
});

app.get("/fetch-queues", async (req, res) => {
  try {
    const queues = await fetchQueues(db);
    res.json({
      inQueue: queues,
    });
  } catch (error) {
    console.error("fetchQueues API error: " + error.message);
  }
});

app.post("/add-patient-record/:doc_id", async (req, res) => {
  try {
    const patientCount = await countPatients(db);

    const { doc_id } = req.params;
    const { diagnosis } = req.body;
    const patient_id = await PadZeroes(patientCount + 1, 8);
    const record_id = uid(10);
    const patient = await insertNewPatient(db, patient_id, req.body);
    if (patient) {
      const patient_record = await insertPatientRecord(
        db,
        record_id,
        patient_id,
        doc_id,
        req.body
      );

      if (patient_record) {
        let valid = true;
        for (let i = 0; i < diagnosis.length; i++) {
          const diagnosisRes = await insertDiagnosis(
            db,
            record_id,
            diagnosis[i]
          );
          if (!diagnosisRes) {
            valid = false;
          }
        }
        if (!valid) {
          return res.status(500).json({ message: "add-patient-record error" });
        }

        return res.status(200).json({ message: "Patient added success fully" });
      }
    }
  } catch (error) {
    console.error("add-patient-record API error: " + error.message);
    return res.status(500).json({ error: "add-patient-record API error" });
  }
});

app.post(
  "/add-existing-patient-record/:doc_id/:patient_id",
  async (req, res) => {
    try {
      const { doc_id, patient_id } = req.params;
      const { diagnosis } = req.body;
      const record_id = uid(10);

      console.log(patient_id);
      console.log(req.body);
      const patient_record = await insertPatientRecord(
        db,
        record_id,
        patient_id,
        doc_id,
        req.body
      );

      if (patient_record) {
        let valid = true;
        for (let i = 0; i < diagnosis.length; i++) {
          const diagnosisRes = await insertDiagnosis(
            db,
            record_id,
            diagnosis[i]
          );
          if (!diagnosisRes) {
            valid = false;
          }
        }
        if (!valid) {
          return res.status(500).json({ message: "add-patient-record error" });
        }

        return res.status(200).json({ message: "Patient added success fully" });
      }
    } catch (error) {
      console.error("add-patient-record API error: " + error.message);
      return res.status(500).json({ error: "add-patient-record API error" });
    }
  }
);

app.post("/edit-patient-record/:record_id", async (req, res) => {
  try {
    const { record_id } = req.params;
    const { diagnosis } = req.body;
    const diagnosisDelete = await deleteDiagnosis(db, record_id);

    let valid = true;
    if (diagnosisDelete) {
      const updatePatient = await editDoctorPatientInfo(db, req.body);
      if (updatePatient) {
        const updateRecord = await editDoctorPatientRecord(
          db,
          record_id,
          req.body
        );
        if (updateRecord) {
          for (let i = 0; i < diagnosis.length; i++) {
            const diagnosisRes = await insertDiagnosis(
              db,
              record_id,
              diagnosis[i]
            );
            if (!diagnosisRes) {
              valid = false;
            }
          }
        }
      }
    }
    if (valid) {
      return res.status(200).json({ message: "Patient edited successfully" });
    }
  } catch (error) {
    console.error("/edit-patient-record API ERROR: " + error.message);
  }
});
app.get("/appointment-today", async (req, res) => {
  try {
    const apptToday = await appointmentToday(db);
    res.json({
      appointmentsToday: apptToday,
    });
  } catch (error) {
    console.error("Appointment-today API error: " + error.message);
  }
});

app.get("/view-patient-record/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patientRecord = await viewPatientRecord(db, id);
    const diagnosis = await fetchPatientEditDiagnosis(db, id);

    return res
      .status(200)
      .json({ patientRecord: patientRecord, diagnosis: diagnosis });
  } catch (error) {
    console.error("view-patient-record error: " + error.message);
  }
});

app.get("/search-existing-patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patientInfo = await searchAddExistingPatient(db, id);

    return res.status(200).json(patientInfo);
  } catch (error) {
    console.error("/search-existing-patient API ERROR: " + error.message);
  }
});
app.get("/fetch-employee-sched/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeData = await getEmployeeDataEdit(db, id);

    const employeeSched = await getEmployeeSchedEdit(db, id);

    if (employeeData && employeeSched) {
      return res
        .status(200)
        .json({ employeeData: employeeData, schedule: employeeSched });
    }
  } catch (error) {
    console.error("fetchEmployeeApi ERROR: " + error.message);
    return res
      .status(500)
      .json({ message: "internal server fetch employee sched error" });
  }
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
