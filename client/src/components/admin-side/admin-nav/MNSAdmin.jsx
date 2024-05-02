import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MNSAdmin(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // const isActive = location.pathname === props.path;
  const isActive = location.pathname.includes(props.path);

  return (
    <NavLink to={props.path}>
      <div className={`nav-item ${isActive ? "active" : ""}`}>
        <div className="item-icon">
          <img src={isActive ? props.wurl : props.url} alt={props.title} />
        </div>
        <div className="item-text">{props.title}</div>
        {props.title === "Patient Profile" && !props.birthdate && (
          <div className="patient-notif notif">!</div>
        )}
      </div>
    </NavLink>
  );
}
export default MNSAdmin;
