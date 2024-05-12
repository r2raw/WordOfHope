import React from "react";
import { useNavigate } from "react-router-dom";

function DocResultMgmt() {
  const navigate = useNavigate()
  const handleAddResult = ()=>{
    navigate("Add-Result")
  }
  return (
    <div className="admin-element result-management">
      <div className="header">
        <h1>Result Management</h1>
        <button className="solid fade" onClick={handleAddResult}>Add</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Service</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>First name</td>
              <td>Last name</td>
              <td>Service</td>
              <td>Date Added</td>
              <td>Action</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocResultMgmt;
