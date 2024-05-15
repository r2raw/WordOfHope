import React, { useState } from "react";

import DepartmentTable from "./DepartmentTable";
import AddDepartmentForm from "./AddDepartmentForm";
import AddPositionForm from "./AddPositionForm";
import EditDepartmentForm from "./EditDepartmentForm";
import PositionTable from "./PositionTable";
import { useOutletContext } from "react-router-dom";
import DeleteDepartment from "./DeleteDepartment";
function Departments() {
  const { backendData } = useOutletContext();
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const [openDeleteDepartment, setOpenDeleteDepartment] = useState(false);
  const [editDepartment, setEditDepartment] = useState();
  const [deleteDepartment, setDeleteDepartment] = useState();
  const [openAddPosition, setOpenAddPosition] = useState(false);

  const handleOpenAddDepartment = () => {
    setOpenEditDepartment(false);
    setOpenAddDepartment(true);
  };
  const handleCloseAddDepartment = () => {
    setOpenAddDepartment(false);
  };
  const handleOpenEditDepartment = (id) => {
    const findDepartment = backendData.departments.find((i) => i.id === id);
    setEditDepartment(findDepartment);
    setOpenAddDepartment(false);
    setOpenDeleteDepartment(false);
    setOpenEditDepartment(true);
  };
  const handleCloseEditDepartment = () => {
    setOpenEditDepartment(false);
  };

  const handleOpenDeleteDepartment = (id) => {
    const findDepartment = backendData.departments.find((i) => i.id === id);
    setDeleteDepartment(findDepartment);
    setOpenAddDepartment(false);
    setOpenEditDepartment(false);
    setOpenDeleteDepartment(true);
  };
  const handleCloseDeleteDepartment = () => {
    setOpenDeleteDepartment(false);
  };
  const handleOpenAddPosition = () => {
    setOpenAddPosition(true);
  };
  const handleCloseAddPosition = () => {
    setOpenAddPosition(false);
  };
  return (
    <div className="admin-element department">
      <div className="item">
        <div className="department-header">
          <h2>Department</h2>
          <button
            className="primary solid fade"
            onClick={handleOpenAddDepartment}
          >
            <p>Add Department</p>
          </button>
        </div>
        {!openAddDepartment && !openEditDepartment && !openDeleteDepartment ? (
          <DepartmentTable
            handleOpenEditDepartment={handleOpenEditDepartment}
            handleOpenDeleteDepartment={handleOpenDeleteDepartment}
          />
        ) : openAddDepartment ? (
          <AddDepartmentForm
            handleCloseAddDepartment={handleCloseAddDepartment}
          />
        ) : !openDeleteDepartment ? (
          <EditDepartmentForm
            department={editDepartment}
            handleCloseEditDepartment={handleCloseEditDepartment}
          />
        ) : (
          <DeleteDepartment
            department={deleteDepartment}
            handleCloseDeleteDepartment={handleCloseDeleteDepartment}
          />
        )}
      </div>
      <div className="item">
        <div className="department-header">
          <h2>Position</h2>
          <button
            className="primary solid fade"
            onClick={handleOpenAddPosition}
          >
            <p>Add Position</p>
          </button>
        </div>
        {!openAddPosition ? (
          <PositionTable />
        ) : (
          <AddPositionForm handleCloseAddPosition={handleCloseAddPosition} />
        )}
      </div>
    </div>
  );
}

export default Departments;
