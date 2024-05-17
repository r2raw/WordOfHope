import React, { useState, useEffect } from "react";
import { PatientNav, ReceptionistNav } from "../admin-side/admin-nav/AdminNav";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import EmpHeader from "../admin-side/header/EmpHeader";
import ClientNav from "../client-side/ClientNav";
import logoImg from "../my-images/hopeImgs/hope-logo.png";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import io from "socket.io-client";
import Loader from "../Loader";

function PatientLayout() {
  const navigate = useNavigate();
  const socket = io.connect("http://localhost:5000/Patient");
  const { user } = useParams();

  const [backendData, setBackendData] = useState();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const uid = localStorage.getItem("uid");
    if (!isLoggedIn || isLoggedIn === "false" || !role || !uid) {
      navigate("/Login");
      return;
    } else {
      if (role !== "Patient") {
        if (role !== "Admin") {
          navigate(`/WordOfHope/${role}/${uid}/Dashboard`);
          return;
        }

        navigate(`/WordOfHope/MNS/${uid}/Dashboard`);
        return;
      }
      axios
        .get("/WordOfHope/Patient/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {});
    }
  }, [user]);

  useEffect(() => {
    socket.on("new_patient_profile", (updatedData) => {
      setBackendData((prevData) => ({
        ...prevData,
        user: updatedData,
      }));
    });

    socket.on("get_self_appointment", (updatedData) => {
      console.log(updatedData);
      setBackendData((prevData) => ({
        ...prevData,
        appointments: {
          ...prevData.appointments,
          selfAppointment: updatedData,
        },
      }));
    });

    socket.on("get_third_party_appointment", (updatedData) => {
      console.log(updatedData);
      setBackendData((prevData) => ({
        ...prevData,
        appointments: {
          ...prevData.appointments,
          thirdPartyAppointment: updatedData,
        },
      }));
    });
  }, [socket]);

  if (!backendData) return <Loader />;

  console.log(backendData);
  return (
    <div className="admin-layout employee-layout">
      {/* <ClientNav /> */}
      <header className="patient-header">
        <div>
          <img src={logoImg} alt="wordofhopelogo" />
          <h3>Word Of Hope General Hospital</h3>
        </div>
        <NavLink to={`/${user}`}>
          {/* <div>
            <HomeSharpIcon sx={{ fontSize: 50 }} />
          </div> */}
        </NavLink>
      </header>
      <PatientNav user={user} backendData={backendData} />
      <main>
        <Outlet context={{ backendData, socket }} />
      </main>
    </div>
  );
}

export default PatientLayout;
