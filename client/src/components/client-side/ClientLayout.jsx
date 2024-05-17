import React, {useState, useEffect} from "react";
import ClientNav from "./ClientNav";
import Footer from "./footer/Footer";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import UserNav from "./UserNav";


function ClientLayout() {

  const navigate = useNavigate()
  
  const { user } = useParams;


  useEffect(()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const uid = localStorage.getItem("uid");
    if(isLoggedIn === "true"){

      if(role !== 'Admin'){
        return navigate(`/WordOfHope/${role}/${uid}/Dashboard`)
      }else{
        return navigate(`/WordOfHope/MNS/${uid}/Dashboard`)
      }
    }
  },[])
  return (
    <div className="client-layout">
      {user ? <UserNav /> : <ClientNav />}

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ClientLayout;
