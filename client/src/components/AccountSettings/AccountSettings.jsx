import React, {useState, useEffect} from "react";
import { NavLink,  Outlet, useOutletContext } from "react-router-dom";
import Loader from "../Loader";
function AccountSettings() {
  const { backendData, renewBackendData, renewUserInfo } = useOutletContext();
  
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(backendData){
      setLoading(false);
    }
  },[backendData]);

  if(loading) return <div className="admin-element" style={{position: "relative", padding: "0"}}><Loader /></div>

  return (
    <div className="admin-element" >
      <div className="account-settings">
        <NavLink to="User-Profile">My Profile</NavLink>
        <NavLink to="Change-Password">Change Password</NavLink>
        <NavLink to="Change-Username">Change Username</NavLink>
      </div>
      <div>
        <Outlet context={{userInfo: backendData.user[0], renewBackendData, ncr: backendData.ncr, renewUserInfo}} />
      </div>
    </div>
  );
}

export default AccountSettings;
