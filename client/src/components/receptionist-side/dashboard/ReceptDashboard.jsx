import React, { useEffect, useState } from "react";
import { Chart as chartjs } from "chart.js/auto";
import { currentDate } from "../../my-functions/CurrentDate";
import { Doughnut, Bar } from "react-chartjs-2";
import img1 from "../../my-images/empImg/defaultImg.png";
import img2 from "../../my-images/empImg/defaultImg.png";
import img3 from "../../my-images/empImg/defaultImg.png";
import img4 from "../../my-images/empImg/defaultImg.png";
import img5 from "../../my-images/empImg/defaultImg.png";
import axios from "axios";
import dayjs from "dayjs";
import AppointmentsTodayTable from "./AppointmentsTodayTable";
import ReceptNurseReports from "./ReceptNurseReports";
import { useOutletContext } from "react-router-dom";
function ReceptDashboard() {
  const {backendData} = useOutletContext();
  const [dashboardData, setDashboarData] = useState();

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/nurse-dashboard");

      if (response.status === 200) {
        setDashboarData(response.data);
        return;
      }
    } catch (error) {
      console.error("fetchDashboardData ERROR: " + error.message);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return null;

  const { departmentChart, patientVisitBar, loggedinDoctors } = dashboardData;
  return (
    <div className="admin-element nurse">
      <div className="dashboard greetings">
        <div>
          <h1>{`Hello, ${backendData.user[0].sex === "Male" ? "Mr" :"Ms"}. ${backendData.user[0].lastname}`}</h1>
          <h3>Have a nice day at work!</h3>
        </div>
        <h3>{currentDate()}</h3>
      </div>
      <h3>Weekly Reports</h3>
      <ReceptNurseReports dashboardData={dashboardData} />
      <div className="nurse analytics reports">
        <div className="chart-container">
          <h3>Patient Visit By Department</h3>
          <div className="report">
            <Doughnut
              data={{
                labels: departmentChart.map((i) => i.department_name),
                datasets: [
                  {
                    label: "Patients",
                    data: departmentChart.map((i) => i.patient_count),
                    backgroundColor: [
                      "#008DDA90",
                      "#b0f5b090",
                      "#b34df790",
                         "#41C9E290",
                      "#F7EEDD90",
                      "#006cf090",
                      "#ACE2E190",
                      "#DFF5FF90",
                      "#378CE790",
                      "#5356FF90",
                      "#1c5ca090",
                      "#378CE790",
                    ],
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="chart-container">
          <h3>Average Patient Visits</h3>
          <div className="report">
            <Bar
              data={{
                labels: patientVisitBar.map((i) => i.day_of_week),
                datasets: [
                  {
                    label: "Patients",
                    data: patientVisitBar.map(
                      (i) => i.average_completed_appointments
                    ),
                    backgroundColor: "#1c5ca090",
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="chart-container">
          <h3>Doctors</h3>
          <div className="report">
            <div className="actives">
              {loggedinDoctors.map((i, index) => {
                return (
                  <div className="active-docs" id="doctors" key={index}>
                    <div className="doc-info">
                      <div className="img-container">
                        <img
                          src={i.empimg ? i.empimg : img1}
                          alt={i.lastname}
                        />
                      </div>
                      <div>
                        <h3>{i.department_name}</h3>
                        <p className="name">{`Dr. ${i.firstname} ${i.lastname}`}</p>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          backgroundColor: "#ace0a8",
                          borderRadius: "10px",
                          color: "white",
                          padding: "5px",
                        }}
                      >
                        Active
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <h3>Appointments today</h3>
      <AppointmentsTodayTable />
    </div>
  );
}

export default ReceptDashboard;