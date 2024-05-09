import React from "react";
import {Chart as chartjs} from "chart.js/auto"
import { Doughnut, Bar } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";
function PatientDemo() {
  const {backendData} = useOutletContext()
  return (
    <div className="admin-element">
      <h1>Patient Demographics</h1>
      <div className="report patient-demo">
            <Doughnut
              data={{
                labels: backendData.serviceChartData.map((i) => i.service_name),
                datasets: [
                  {
                    label: "Patients",
                    data: backendData.serviceChartData.map((i) => i.count),
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
  );
}

export default PatientDemo;