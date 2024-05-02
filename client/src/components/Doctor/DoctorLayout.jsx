import React, {useEffect, useState} from "react";
import { DoctorNav } from "../admin-side/admin-nav/AdminNav";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import EmpHeader from "../admin-side/header/EmpHeader";
import axios from "axios";
import Loader from "../Loader";
function DoctorLayout() {
    const {user} = useParams();

    const navigate = useNavigate();
    const [backendData, setBackendData] = useState();
    useEffect(() => {
      axios
        .get("/WordOfHope/Doctor/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {});
    }, [user]);
  
    
  const renewUserInfo = ()=>{
    
    axios
      .get(`/renew-user/${user}`)
      .then((response) => {
        setBackendData(prev =>({
          ...prev,
          user: response.data.user
        }));
      })
      .catch((error) => {});
  }
  
  useEffect(() => {
    if (backendData) {
      if (backendData.user[0].firsttimelog) {
        navigate("Change-Password");
      }
    }
  }, [backendData]);
  if(!backendData) return <Loader />
  
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
      <DoctorNav user={user} backendData={backendData}/>
      <main>
        <Outlet context={{backendData, renewUserInfo}} />
      </main>
    </div>
  );
}

export default DoctorLayout;