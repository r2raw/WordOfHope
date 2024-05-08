import { LayoutGroup } from "framer-motion";
import React, { useEffect, useState } from "react";
import AdminNav from "./admin-nav/AdminNav";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import EmpHeader from "./header/EmpHeader";
import axios from "axios";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import RFIDScan from "./RFIDScan";
import Loader from "../Loader";
import FirstTimeLog from "../FirstTimeLog/FirstTimeLog";

function AdminLayout() {
  const { user } = useParams();
  const navigate = useNavigate();
  const [rfidDialogfOpen, setRfidDialogOpen] = useState(false);
  const [backendData, setBackendData] = useState();
  useEffect(() => {
    axios
      .get("/WordOfHope/MNS/" + user)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  }, []);

  const renewBackendData = () => {
    axios
      .get("/WordOfHope/MNS/" + user)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  };

  const updateDepartments = () => {
    axios
      .get("/fetchDepartments")
      .then((res) => {
        setBackendData((prev) => ({
          ...prev,
          departments: res.data.departments,
        }));
      });
  };

  const updatePositions = () => {
    axios.get("/fetchPositions").then((res) => {
      setBackendData((prev) => ({
        ...prev,
        positions: res.data.positions,
      }));
    });
  };

  const updateServices = () => {
    axios.get("/fetchServices").then((res) => {
      
      setBackendData((prev) => ({
        ...prev,
        services: res.data.services,
      }));

    });
  };
  const renewEmployees = () => {
    axios
      .get("/employeeApi")
      .then((response) => {
        setBackendData((prev) => ({
          ...prev,
          employees: response.data.employees,
        }));
      })
      .catch((error) => {});
  };

  function openRfidDialog() {
    setRfidDialogOpen(true);
  }

  const renewUserInfo = () => {
    axios
      .get(`/renew-user/${user}`)
      .then((response) => {
        setBackendData((prev) => ({
          ...prev,
          user: response.data.user,
        }));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (backendData) {
      if (backendData.user[0].firsttimelog) {
        navigate("Change-Password");
      }
    }
  }, [backendData]);

  if (!backendData) return <Loader />;
  if (backendData.user[0].firsttimelog) {
    return (
      <div className="admin-layout employee-layout">
        <EmpHeader />
        <main>
          <Outlet
            context={{
              backendData,
              renewBackendData,
              renewEmployees,
              renewUserInfo,
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout employee-layout">
      <EmpHeader />
      <AdminNav
        user={user}
        backendData={backendData}
        openRfidDialog={openRfidDialog}
      />
      <main>
        <Outlet
          context={{
            backendData,
            renewBackendData,
            renewEmployees,
            renewUserInfo,
            updateDepartments,
            updatePositions,
            updateServices,
          }}
        />
      </main>

      {rfidDialogfOpen && (
        <div className="rfid-modal modal">
          <div className="dialog-box">
            <div className="dialog-header">
              <h3>Save Changes</h3>
              <div
                className="btn-container close"
                onClick={() => setRfidDialogOpen(false)}
              >
                <CloseSharpIcon />
              </div>
            </div>
            <div className="dialog-body">
              <div className="dialog-message">
                <p>Launch RFID Scanner?</p>
              </div>
            </div>
            <div
              className="dialog-button"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <button
                className="solid danger"
                onClick={() => setRfidDialogOpen(false)}
              >
                Cancel
              </button>
              <Link to="/rfid">
                <button className="submit solid">Confirm</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;
