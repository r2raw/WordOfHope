import React from "react";

function CurrentlyServing() {
  return (
    <div>
      <h2>Currently Serving</h2>
      <div className="service-info">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Queue No.</th>
                <th>Service</th>
                <th>Appointment ID.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>05</td>
                <td>Sipsip posonegro</td>
                <td>0120310</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn">
          <button className="solid smlBlue">NEXT APPOINTMENT</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentlyServing;
