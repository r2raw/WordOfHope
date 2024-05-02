import React, {useState, useEffect} from "react";
import ClientNav from "./ClientNav";
import Footer from "./footer/Footer";
import { Outlet, useParams } from "react-router-dom";
import UserNav from "./UserNav";


function ClientLayout() {

  
  const { user } = useParams;


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
