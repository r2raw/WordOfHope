import React from "react";

function AccountRow(props) {
  function viewEmployee() {
    props.viewEmp(props.id);
  }
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.lastName}</td>
      <td>{props.firstName}</td>
      <td>{props.department}</td>
      <td>{props.position}</td>
      <td className="action-cell">
        <div>
          <button
            className="outlined"
            id="view-employee"
            onClick={viewEmployee}
          >
            View
          </button>
          <button className="outlined" id="deact-employee">
            Deactivate
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AccountRow;
