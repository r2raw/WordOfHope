import React from "react";

function ReceptPatientAcc() {

  return (
    <div className="admin-element">
      <h1>Patient Accounts</h1>
      <div className="table-container">
        <div className="filter-group">
          <div className="input-group">
            <input type="text" required />
            <span className="floating-label">Search</span>
          </div>

          <div className="input-group">
            <select className="wht">
              <option>...</option>
            </select>
            <span className="floating-label">
              Filter
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((i, index) => {
              const name = ` ${i.firstname}${i.middlename && ` ${i.middlename}`} ${i.lastname}${i.suffix && ` ${i.suffix}`}`;
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td><div><h4>{name}</h4><p style={{fontSize: ".8rem"}}>{i.age} y/o</p></div></td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
                  <td>
                    <button className="solid submit">
                      Appointments
                    </button>
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

export default ReceptPatientAcc;

const patient = [
  {
    id: 1,
    lastname: "Marte",
    firstname: "Arturo",
    middlename: "Diago",
    suffix: "Jr. II",
    birthdate: "07/17/2001",
    age: 22,
    email: "martejrii.arturo.07172001@gmail.com",
    phone: "09294827184",
  },
  {
    id: 2,
    lastname: "Baler",
    firstname: "Kimberly",
    middlename: "Sanchez",
    suffix: "",
    birthdate: "04/08/1993",
    age: 22,
    email: "baler.kimberly.040803@gmail.com",
    phone: "09294897184",
  },
];
