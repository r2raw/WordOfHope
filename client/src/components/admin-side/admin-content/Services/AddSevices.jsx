import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ServiceForm from "./ServiceForm";
import EditServices from "./EditServices";
import ServicesTable from "./ServicesTable";

function AddSevices() {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const { backendData } = useOutletContext();
  const handleOpenEdit = (id) => {
    if (openEdit) {
      handleCloseEdit();
      setTimeout(() => {
        const findService = backendData.services.find((i) => i.id === id);
        setSelectedService(findService);
        setOpenEdit(true);
      }, 300);
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
  return (
    <div className="admin-element manage-services">
      {openEdit ? (
        <EditServices
          selectedService={selectedService}
          handleCloseEdit={handleCloseEdit}
        />
      ) : (
        <ServiceForm />
      )}
      <ServicesTable handleOpenEdit={handleOpenEdit} />
    </div>
  );
}

export default AddSevices;
