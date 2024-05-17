import React, { useEffect, useState } from "react";
import { Chart as chartjs } from "chart.js/auto";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
function PatientDemo() {
  const { backendData } = useOutletContext();
  const [patientData, setPatientData] = useState();
  console.log(patientData);
  const fetchPatientDemog = async () => {
    try {
      const response = await axios.get(`/patient-demographics/${backendData.user[0].department}`);
      if (response.status === 200) {
        setPatientData(response.data);
      }
    } catch (error) {
      console.error("patientDemog Error: " + error.message);
    }
  };
  useEffect(() => {
    fetchPatientDemog();
  }, []);
  if (!patientData) return null;
  return (
    <div className="admin-element patient-demographics">
      <h1>Patient Demographics</h1>
      <div className="report patient-demo">
        <div className="card">
          <h3>Patient Visit By Department</h3>
          <div className="chart-data">
            <Doughnut
              data={{
                labels: patientData.departmentChart.map((i) => i.department_name),
                datasets: [
                  {
                    label: "Patients",
                    data: patientData.departmentChart.map((i) => i.patient_count),
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
        <div className="card">
          <h3>Patient Visit By Department</h3>
          <div className="chart-data">
            <Doughnut
              data={{
                labels: patientData.departmentsServiceData.map((i) => i.service_name),
                datasets: [
                  {
                    label: "Patients",
                    data: patientData.departmentsServiceData.map((i) => i.patient_count),
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
        <div className="card">
          <h3>Average Patient Age Group</h3>
          <div className="chart-data">
            <Bar
              data={{
                labels: patientData.patientAgeGroupChart.map(
                  (i) => i.age_group
                ),
                datasets: [
                  {
                    label: "Patients",
                    data: patientData.patientAgeGroupChart.map(
                      (i) => i.patient_count
                    ),
                    backgroundColor: "#1c5ca090",
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
        <div className="card line-chart">
          <h3>Monthly Patient Visit</h3>
          <div className="chart-data">
            <Line
              data={{
                labels: patientData.patientVisitPerMonth.map(
                  (i) => i.month
                ),
                datasets: [
                  {
                    label: "Patients",
                    data: patientData.patientVisitPerMonth.map(
                      (i) => i.monthly_patient_visits
                    ),
                    backgroundColor: "#1c5ca090",
                    borderRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </div>
    </div>
  );
}

export default PatientDemo;
