import React, { useCallback, useEffect, useState } from "react";
import { DoctorNav } from "../admin-side/admin-nav/AdminNav";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import EmpHeader from "../admin-side/header/EmpHeader";
import axios from "axios";
import Loader from "../Loader";
import CurrentlyServing from "./DocQueue/CurrentlyServing";
function DoctorLayout() {
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
      if (role !== "Doctor") {
        if (role !== "Admin") {
          navigate(`/WordOfHope/${role}/${uid}/Dashboard`);
          return;
        }

        navigate(`/WordOfHope/MNS/${uid}/Dashboard`);
        return;
      }
      axios
        .get("/WordOfHope/Doctor/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {
          console.error("API error: " + error.message);
        });
    }
  }, [user]);

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

  const updateBackend = () => {
    axios
      .get("/WordOfHope/Doctor/" + user)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {
        console.error("API error: " + error.message);
      });
  };

  const updateCurrentlyServing = async () => {
    try {
      const response = await axios.post(
        `/next-appointment/${backendData.user[0].id}/${backendData.user[0].department}`
      );

      setBackendData((prev) => ({
        ...prev,
        currentlyServing: response.data.currentlyServing,
      }));

      updateQueue();
    } catch (error) {
      console.error("updateCurrentlyServing error: " + error.message);
    }
  };

  const returnToQueue = async () => {
    try {
      const { appointment_id, id } = backendData.currentlyServing[0];

      const prevAppointment = appointment_id;
      const prevQueue = id;
      const response = await axios.post(
        `/return-queue/${prevAppointment}/${prevQueue}/${backendData.user[0].id}/${backendData.user[0].department}`
      );

      setBackendData((prev) => ({
        ...prev,
        currentlyServing: response.data.currentlyServing,
      }));

      updateQueue();
    } catch (error) {
      console.error("returnToQueue error: " + error.message);
    }
  };
  const updateQueue = useCallback(() => {
    currentQueue();
  }, [backendData]);

  const currentQueue = async () => {
    try {
      if (backendData.user && backendData.user.length > 0) {
        const response = await axios.get(
          `/update-department-queue/${backendData.user[0].department}`
        );
        setBackendData((prev) => ({
          ...prev,
          inQueue: response.data.inQueue,
        }));
      }
    } catch (error) {
      console.error("/update-department-queu error: " + error.message);
    }
  };
  useEffect(() => {
    if (backendData) {
      if (backendData.user[0].firsttimelog) {
        navigate("Change-Password");
      }
    }
  }, [backendData]);

  useEffect(() => {
    if (backendData && backendData.user && backendData.user.length > 0) {
      const intervalId = setInterval(() => {
        updateBackend();
      }, 60000);

      return () => clearInterval(intervalId);
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
      <DoctorNav user={user} backendData={backendData} />
      <main>
        <Outlet
          context={{
            backendData,
            renewUserInfo,
            updateCurrentlyServing,
            updateQueue,
            returnToQueue,
          }}
        />
      </main>
    </div>
  );
}

export default DoctorLayout;
