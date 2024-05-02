import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
function MedicalHistory() {
  const { user } = useParams();

  const today = dayjs(new Date()).format("MMMM DD, YYYY")
  return (
    <div className="admin-element">
      <h1>Medical History</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Appointment Id</th>
              <th>Patient Id</th>
              <th>Date of Visit</th>
              <th>Patient</th>
              <th>Reason for Visit</th>
              <th>Service</th>
              <th>Doctor</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>{today}</td>
              <td>Self</td>
              <td>General Consultation</td>
              <td>General Health Concern</td>
              <td>Dr. Dre</td>
              <td>
                <button className="solid submit">View</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>{today}</td>
              <td>Self</td>
              <td>General Consultation</td>
              <td>General Health Concern</td>
              <td>Dr. Dre</td>
              <td>
                <button className="solid submit">View</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>{today}</td>
              <td>Self</td>
              <td>General Consultation</td>
              <td>General Health Concern</td>
              <td>Dr. Dre</td>
              <td>
                <button className="solid submit">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalHistory;
