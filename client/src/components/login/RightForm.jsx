import React, { useEffect, useState } from "react";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import { Zoom } from "@mui/material";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../my-images/loadingSmall.gif";
function RightForm() {
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  function handleShowPass() {
    setShowPass(!showPass);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (values.username && values.password) {
      setLoading(true);
      axios
        .post("/Login", values)
        .then((res) => {
          if (res.data.status === "Success") {
            const { role, id } = res.data;
            if(role !== 'Admin'){
              navigate(`/WordOfHope/${role}/${id}/Dashboard`);
            }else{
              navigate(`/WordOfHope/MNS/${id}/Dashboard`);
            }
            
            return;
          } else {
            setLoginError(res.data.errorMessage);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (loginError !== "") {
      setTimeout(() => {
        setLoginError("");
      }, 2000);
    }
  }, [loginError]);

  if (loading)
    return (
      <div className="right-form lg-blue">
        <div className="login-loader">
          <img src={loader} alt="asd" />
        </div>
      </div>
    );
  return (
    <div className="right-form lg-blue">
      {loginError && (
        <div id="error-message">
          <p>{loginError}</p>
        </div>
      )}
      <LocalHospitalRoundedIcon sx={{ fontSize: 100 }} />
      <h2>Login</h2>
      <div className="input-elements">
        <div className="input-group">
          <input
            type="text"
            name="username"
            className="lg-blue-3"
            onChange={handleInputChange}
            value={values.username}
            required
          />
          <span className="floating-label">Username/Email</span>
          <span className="label-icon">
            <AlternateEmailSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <input
            className="lg-blue-3"
            type={showPass ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleInputChange}
            required
          />
          <span className="floating-label">Password</span>
          <span onClick={handleShowPass} className="label-icon toggle-password">
            <Zoom in={true}>
              {showPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
            </Zoom>
          </span>
        </div>
        <div className="forgot">
          <p>Forgot password?</p>
        </div>
        <button
          className="outlined lg-blue-3"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <NavLink to="/Register">
        <p>Don't have account? Register.</p>
      </NavLink>
    </div>
  );
}

export default RightForm;
