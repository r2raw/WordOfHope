import React, { useEffect } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { NavLink, useLocation, useParams } from "react-router-dom";
function ClientNav() {
  const location = useLocation();

  const { user } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: "none" }}>
          <MenuSharpIcon />
        </div>
        <NavLink to={user ? `/${user}` : "/"}>
          <div className="navbar-brand">
            <img src="./images/hopeImgs/hope-logo.png" alt="logo" />
            <h1>Word Of Hope General Hospital</h1>
          </div>
        </NavLink>
        <div className="nav-items">
          <div className="nav-list">
            <NavLink to={user ? `/${user}` :"/"}>
              <div className="item">Home</div>
            </NavLink>
            <NavLink to={user ? `/${user}/About` :"/About"}>
              <div className="item">About</div>
            </NavLink>
            <NavLink to={user ? `/${user}/Services` :"/Services"}>
              <div className="item">Services</div>
            </NavLink>
            <NavLink to={user ? `/${user}/Facility` :"/Facility"}>
              <div className="item">Facilities</div>
            </NavLink>
            {user ? (
              <NavLink to={`/WordOfHope/Patient/${user}/Dashboard`}>
                <div className="item">{user} </div>
              </NavLink>
            ) : (
              <NavLink to="/Login">
                <div className="item">Login </div>
              </NavLink>
            )}
          </div>
          <div className="nav-list">
            {/* <NavLink to="/Register">
              <div className="item">Register</div>
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
}



export default ClientNav;