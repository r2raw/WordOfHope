import React from "react";

function ReceptLog() {

  const style = {
    boxShadow:  "5px 5px 10px #15467a, -5px -5px 10px #2372c6"
  }
  return (
    <div className="admin-element">
      <h1>My Attendance Log</h1>
      <div className="table-container">
        <div className="filter-group">
          <div className="input-group">
            <input type="text" required />
            <span className="floating-label">Search</span>
          </div>

          <div className="input-group">
            <select className="wht" style={style}>
              <option>...</option>
            </select>
            <span className="floating-label wht">
              Filter
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time-In</th>
              <th>Time-Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.date}</td>
                  <td>{i.in}</td>
                  <td>{i.out}</td>
                  <td>{i.total}</td>
                  <td>{i.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceptLog;

const attendance = [
  {
    date: "03/18/2024",
    in: "09:00 AM",
    out: "5:00 PM",
    total: "8 Hours",
    status: "On-time",
  },
  {
    date: "03/19/2024",
    in: "09:00 AM",
    out: "5:00 PM",
    total: "8 Hours",
    status: "On-time",
  },
  {
    date: "03/19/2024",
    in: "09:00 AM",
    out: "5:00 PM",
    total: "8 Hours",
    status: "On-time",
  },
];
