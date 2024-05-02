import React from "react";

function DocPatientRec() {
  return (
    <div className="admin-element">
      <h1>Patient Record</h1>
      <div className="table-container">
        <div className="filter-group">
          <div className="input-group">
            <input type="text" className="wht" required />
            <span className="floating-label wht">Search</span>
          </div>

          <div className="input-group">
            <select className="wht">
              <option>...</option>
            </select>
            <span style={{ color: "white" }} className="floating-label wht">
              Filter
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient Id</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>User Id</th>
              <th>Medical Records</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((i, index) => {
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td>{i.lastname}</td>
                  <td>{i.firstname}</td>
                  <td>{i.sex}</td>
                  <td>{i.age}</td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
                  <td>{i.userId}</td>
                  <td>
                    <div className="view-emr">
                      <button className="solid submit">View</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocPatientRec;
const patient = [
  {
    id: 1,
    lastname: "Marte",
    firstname: "Arturo",
    sex: "Female",
    age: 22,
    email: "martejrii.arturo.07172001@gmail.com",
    phone: "09294827184",
  },
  {
    id: 2,
    lastname: "Baler",
    firstname: "Kimberly",
    sex: "Female",
    age: 22,
    email: "baler.kimberly.040803@gmail.com",
    phone: "09294897184",
    userId: 2,
  },
];
