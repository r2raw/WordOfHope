import React, { useState } from "react";
import QueueAppointmentInfo from "./QueueAppointmentInfo";
import QrCodeScannerSharpIcon from "@mui/icons-material/QrCodeScannerSharp";
import QrScanner from "./QrScanner";
function Queues() {
  const [scanner, setScanner] = useState(false)

  const handleCloseQr = ()=>{
    setScanner(false)
  }
  return (
    <div className="admin-element queue">
      <div>
        <h1>Queues</h1>
        <button className="solid simple" onClick={() => setScanner(true)}>
          <QrCodeScannerSharpIcon /> Scan Qr
        </button>
      </div>
      {scanner && <QrScanner handleCloseQr={handleCloseQr}  />}
      
      <div>
        <h2>Patient Appointment</h2>
        <QueueAppointmentInfo />
        <div className="enter-appointment">
          <div className="input-group">
            <input className="card" type="text" required />
            <span className="floating-label">Appointment Id</span>
          </div>
          <button className="solid card">Enter</button>
        </div>
      </div>
      <hr />
      <h2>Currently Serving</h2>
      <div className="currently-serving queue">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="serving-info card">
            <h3>Laboratory</h3>
            <p>Optholmology</p>
            <div>
              <h1>{index + 1}</h1>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h2>In Queue</h2>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Queue No.</th>
              <th>Room</th>
              <th>Department</th>
              <th>Appointment ID</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{index + 200}</td>
                <td>Pediatrics</td>
                <td>{Math.round(123313 * (index + 1) * 0.1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Queues;
