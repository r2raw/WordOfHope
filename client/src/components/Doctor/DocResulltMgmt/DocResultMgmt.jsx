import React, { useState } from "react";
import NavigationModal from "./NavigationModal";
import ResultTable from "../ResultManagementTable/ResultTable";
function DocResultMgmt() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddResult = () => {
    // navigate("Add-Result")
    setIsModalOpen(true);
  };
  return (
    <div className="admin-element result-management">
      <div className="header">
        <h1>Result Management</h1>
        <button className="solid fade" onClick={handleAddResult}>
          Add
        </button>
      </div>
      <ResultTable />
      {isModalOpen && <NavigationModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default DocResultMgmt;
