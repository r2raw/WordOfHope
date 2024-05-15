import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ServiceForm from "./ServiceForm";
import EditServices from "./EditServices";
import ServicesTable from "./ServicesTable";
import DeleteService from "./DeleteService";
import ActivateService from "./ActivateService";

function AddSevices() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActivate, setopenActvate] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const [selectedDeleteService, setSelectedDeleteService] = useState();
  const [selectedActivateService, setSelectedActivateService] = useState();
  const { backendData, updateServices } = useOutletContext();
  const handleOpenEdit = (id) => {
    setOpenDelete(false);
    setopenActvate(false);
    setSelectedActivateService(null);
    setSelectedDeleteService(null);
    if (openEdit) {
      // handleCloseEdit();
      setTimeout(() => {
        const findService = backendData.services.find((i) => i.id === id);
        setSelectedService(findService);
        setOpenEdit(true);
      }, 100);
      return;
    }

    const findService = backendData.services.find((i) => i.id === id);
    setSelectedService(findService);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);

    setSelectedService(null);
  };

  const handleOpenDelete = (id) => {
    setOpenEdit(false);
    setopenActvate(false);
    setSelectedActivateService(null);
    setSelectedService(null);
    if (openDelete) {
      // handleCloseDelete();
      setTimeout(() => {
        const findService = backendData.services.find((i) => i.id === id);
        setSelectedDeleteService(findService);
        setOpenDelete(true);
      }, 100);
      return;
    }
    const findService = backendData.services.find((i) => i.id === id);
    setSelectedDeleteService(findService);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);

    setSelectedDeleteService(null);
  };

  const handleOpenActivateService = (id) => {
    setOpenDelete(false);
    setOpenEdit(false);
    setSelectedService(null);
    setSelectedDeleteService(null);
    if (openActivate) {
      // handleCloseActivate();
      setTimeout(() => {
        const findService = backendData.services.find((i) => i.id === id);
        setSelectedActivateService(findService);
        setopenActvate(true);
      }, 100);
      return;
    }
    const findService = backendData.services.find((i) => i.id === id);
    setSelectedActivateService(findService);
    setopenActvate(true);
  };
  const handleCloseActivate = () => {
    setopenActvate(false);

    setSelectedActivateService(null);
  };
  return (
    <div className="admin-element manage-services">
      {openEdit ? (
        <EditServices
          selectedService={selectedService}
          handleCloseEdit={handleCloseEdit}
        />
      ) : openDelete ? (
        <DeleteService
          selectedDeleteService={selectedDeleteService}
          handleCloseDelete={handleCloseDelete}
        />
      ) : openActivate ? (
        <ActivateService
          selectedActivateService={selectedActivateService}
          handleCloseActivate={handleCloseActivate}
        />
      ) : (
        <ServiceForm />
      )}
      <ServicesTable
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
        handleOpenActivateService={handleOpenActivateService}
      />
    </div>
  );
}

export default AddSevices;
