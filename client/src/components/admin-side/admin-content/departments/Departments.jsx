import React, { useState } from "react";

import DepartmentTable from "./DepartmentTable";
import AddDepartmentForm from "./AddDepartmentForm";
import AddPositionForm from "./AddPositionForm";
import EditDepartmentForm from "./EditDepartmentForm";
import PositionTable from "./PositionTable";
import { useOutletContext } from "react-router-dom";
import DeleteDepartment from "./DeleteDepartment";
import ActivateDepartment from "./ActivateDepartment";
import DeletePosition from "./DeletePosition";
import ActivatePosition from "./ActivatePosition";
function Departments() {
  const { backendData } = useOutletContext();
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const [openDeleteDepartment, setOpenDeleteDepartment] = useState(false);
  const [openActivateDepartment, setOpenActivateDepartment] = useState(false);
  const [openDeletePosition, setOpenDeletePosition] = useState(false);
  const [openActivatePosition, setOpenActivatePosition] = useState(false);
  const [editDepartment, setEditDepartment] = useState();
  const [deleteDepartment, setDeleteDepartment] = useState();
  const [activateDepartment, setActivateDepartment] = useState();
  const [openAddPosition, setOpenAddPosition] = useState(false);
  const [deletePosition, setDeletePosition] = useState();
  const [activatePosition, setActivatePosition] = useState();
  const handleOpenAddDepartment = () => {
    setOpenEditDepartment(false);
    setOpenDeleteDepartment(false);
    setOpenActivateDepartment(false);
    setOpenAddDepartment(true);
  };
  const handleCloseAddDepartment = () => {
    setOpenAddDepartment(false);
  };
  const handleOpenEditDepartment = (id) => {
    const findDepartment = backendData.departments.find((i) => i.id === id);
    setEditDepartment(findDepartment);
    setOpenAddDepartment(false);
    setOpenActivateDepartment(false);
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
    setOpenActivateDepartment(false);
    setOpenDeleteDepartment(true);
  };
  const handleCloseDeleteDepartment = () => {
    setOpenDeleteDepartment(false);
  };

  const handleOpenActivateDepartment = (id) => {
    const findDepartment = backendData.departments.find((i) => i.id === id);
    setActivateDepartment(findDepartment);
    setOpenAddDepartment(false);
    setOpenEditDepartment(false);
    setOpenDeleteDepartment(false);
    setOpenActivateDepartment(true);
  };

  const handleCloseActivateDepartment = () => {
    setOpenActivateDepartment(false);
  };
  const handleOpenAddPosition = () => {
    setOpenDeletePosition(false);
    setOpenActivatePosition(false);
    setOpenAddPosition(true);
  };
  const handleCloseAddPosition = () => {
    setOpenAddPosition(false);
  };

  const handleOpenDeletePosition = (id) => {
    const findDepartment = backendData.positions.find((i) => i.id === id);
    setDeletePosition(findDepartment);
    setOpenAddPosition(false);
    setOpenActivatePosition(false);
    setOpenDeletePosition(true);
  };
  const handleCloseDeletePosition = () => {
    setOpenDeletePosition(false);
  };

  const handleOpenActivatePosition = (id) => {
    const findDepartment = backendData.positions.find((i) => i.id === id);
    setActivatePosition(findDepartment);
    setOpenAddPosition(false);
    setOpenDeletePosition(false);
    setOpenActivatePosition(true);
  };

  const handleCloseActivatePosition = () => {
    setOpenActivatePosition(false);
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
        {!openAddDepartment &&
        !openEditDepartment &&
        !openDeleteDepartment &&
        !openActivateDepartment ? (
          <DepartmentTable
            handleOpenEditDepartment={handleOpenEditDepartment}
            handleOpenDeleteDepartment={handleOpenDeleteDepartment}
            handleOpenActivateDepartment={handleOpenActivateDepartment}
          />
        ) : openAddDepartment ? (
          <AddDepartmentForm
            handleCloseAddDepartment={handleCloseAddDepartment}
          />
        ) : openEditDepartment ? (
          <EditDepartmentForm
            department={editDepartment}
            handleCloseEditDepartment={handleCloseEditDepartment}
          />
        ) : openDeleteDepartment ? (
          <DeleteDepartment
            department={deleteDepartment}
            handleCloseDeleteDepartment={handleCloseDeleteDepartment}
          />
        ) : (
          openActivateDepartment && (
            <ActivateDepartment
              department={activateDepartment}
              handleCloseActivateDepartment={handleCloseActivateDepartment}
            />
          )
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
        {!openAddPosition && !openDeletePosition && !openActivatePosition ? (
          <PositionTable
            handleOpenDeletePosition={handleOpenDeletePosition}
            handleOpenActivatePosition={handleOpenActivatePosition}
          />
        ) : openAddPosition ? (
          <AddPositionForm handleCloseAddPosition={handleCloseAddPosition} />
        ) : openDeletePosition ? (
          <DeletePosition
            position={deletePosition}
            handleCloseDeletePosition={handleCloseDeletePosition}
          />
        ) : (
          <ActivatePosition
            position={activatePosition}
            handleCloseActivatePosition={handleCloseActivatePosition}
          />
        )}
      </div>
    </div>
  );
}

export default Departments;
