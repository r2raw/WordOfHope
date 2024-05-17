import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import EmpHeader from "../header/EmpHeader";
import { HRNav } from "../admin-nav/AdminNav";
import Loader from "../../Loader";

function HrLayout() {
  const { user } = useParams();

  const navigate = useNavigate();
  const [backendData, setBackendData] = useState();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const uid = localStorage.getItem("uid");
    if (!isLoggedIn || isLoggedIn === "false" || !role || !uid) {
      navigate("/Login");
      return;
    } else {
      if (role !== "HR") {
        if (role !== "Admin") {
          navigate(`/WordOfHope/${role}/${uid}/Dashboard`);
          return;
        }

        navigate(`/WordOfHope/MNS/${uid}/Dashboard`);
        return;
      }
      axios
        .get("/HR/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {});
    }
  }, [user]);

  const renewBackendData = () => {
    axios
      .get("/HR/" + user)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  };

  const renewSchedules = () => {
    axios
      .get("/schedules")
      .then((response) => {
        setBackendData((prev) => ({
          ...prev,
          noSchedule: response.data.noSchedule,
          employeeSched: response.data.employeeSched,
        }));
      })
      .catch((error) => {});
  };

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
      <HRNav user={user} backendData={backendData} />
      <main>
        <Outlet
          context={{
            backendData: backendData,
            renewBackendData,
            renewSchedules,
            renewUserInfo,
          }}
        />
      </main>
    </div>
  );
}

export default HrLayout;
