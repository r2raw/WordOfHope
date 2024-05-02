import React from "react";

function ReceptPatientRec() {
  return (
    <div className="admin-element">
      <h1>Patient Records</h1>
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
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((i, index) => {
              
              const name = ` ${i.firstname}${i.middlename && ` ${i.middlename}`} ${i.lastname}${i.suffix && `, ${i.suffix}`}`;
              return (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td><div><h4>{name}</h4><p style={{fontSize: ".8rem"}}>{i.sex}-{i.age} y/o</p></div></td>
                  <td>
                    <div className="view-emr">
                      <button className="solid submit">View</button>
                      <button className="solid lg-blue-3">EMR</button>
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

export default ReceptPatientRec;

const patient = [
  {
    id: 1,
    lastname: "Marte",
    firstname: "Arturo",
    middlename: "Diago",
    suffix: "Jr.II",
    sex: "Female",
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
    sex: "Female",
    age: 22,
    email: "baler.kimberly.040803@gmail.com",
    phone: "09294897184",
    userId: 2,
  },
];
