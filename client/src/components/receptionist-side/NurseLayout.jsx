import React,{useState, useEffect} from "react";
import { ReceptionistNav } from "../admin-side/admin-nav/AdminNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import EmpHeader from "../admin-side/header/EmpHeader";
import Loader from "../Loader";

function NurseLayout(){
    const {user} = useParams();

    const navigate = useNavigate();
    const [backendData, setBackendData] = useState();
    useEffect(() => {
      axios
        .get("/WordOfHope/Nurse/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {});
    }, [user]);
  
    const renewBackendData = ()=>{
    
      axios
        .get("/WordOfHope/Nurse/" + user)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {});
    }
    
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
          <ReceptionistNav user={user} backendData={backendData}/>
          <main>
            <Outlet context={{ backendData, renewBackendData, renewUserInfo}}/>
          </main>
        </div>
      );
}

export default NurseLayout;