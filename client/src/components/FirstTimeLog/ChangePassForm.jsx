import React, { useEffect, useState } from "react";
import passwordValidation from "../AccountSettings/passwordValidation";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import { useOutletContext, useNavigate } from "react-router-dom";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import axios from "axios";
function ChangePassForm() {
  const { backendData } = useOutletContext();
  const [values, setValues] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [isEnabled, setIsEnabled] = useState(false);

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState({
    currentPass: false,
    newPass: false,
    confirmPass: false,
  });

  const [currentErr, setCurrentErr] = useState();
  const [validCurrent, setValidCurrent] = useState(false);

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const handleShowPass = (name) => {
    setShowPass((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrPassBlur = (e) => {
    const { value } = e.target;
    if (value) {
      axios
        .post("/check-current-pass", {
          username: backendData.user[0].username,
          password: value,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            setValidCurrent(true);
            setCurrentErr(null);
          } else {
            setValidCurrent(false);
            setCurrentErr(res.data.message);
          }
        });
    } else {
      setCurrentErr(null);
    }
  };

  useEffect(() => {
    setErrors(passwordValidation(values));
  }, [values]);

  useEffect(() => {
    let allValid = true;
    for (const valuename in values) {
      const value = values[valuename];

      if (value !== "") {
        if (errors[valuename] !== "") {
          allValid = false;
        }
      } else {
        allValid = false;
      }
    }

    setIsEnabled(allValid);
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/first-time-log", {
        confirmpassword: values.confirmpassword,
        username: backendData.user[0].username,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
            window.location.reload();
            if(backendData.user[0].position !== "Admin"){
              
              window.location.href = `/WordOfHope/${backendData.user[0].position}/${backendData.user[0].userid}/Dashboard`;
              // navigate(`/WordOfHope/${backendData.user[0].position}/${backendData.user[0].userid}/Dashboard`);
            }else{
              window.location.href = `/WordOfHope/MNS/${backendData.user[0].userid}/Dashboard`;
              // navigate(`/WordOfHope/MNS/${backendData.user[0].userid}/Dashboard`);
            }
            
          }, 3000);
        }
      })
      .catch((err) => console.error(err.message));
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="card" id="new-input-group">
          <input
            name="currentpassword"
            type={showPass.currentPass ? "text" : "password"}
            placeholder=" "
            onChange={handleCurrPassBlur}
            required
          />
          <span className="new-floating-label">Current Password</span>
          <span
            className="new-floating-icon"
            onClick={() => {
              handleShowPass("currentPass");
            }}
          >
            {showPass.currentPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
          </span>
        </div>
        {currentErr && <p style={invalidStyle}>{currentErr}</p>}
        <div className="card" id="new-input-group">
          <input
            name="newpassword"
            type={showPass.newPass ? "text" : "password"}
            placeholder=" "
            onChange={handlePassChange}
            required
          />
          <span className="new-floating-label">New Password</span>
          <span
            className="new-floating-icon"
            onClick={() => {
              handleShowPass("newPass");
            }}
          >
            {showPass.newPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
          </span>
        </div>
        {values.newpassword && errors.newpassword && (
          <p style={invalidStyle}>{errors.newpassword}</p>
        )}
        <div className="card" id="new-input-group">
          <input
            name="confirmpassword"
            type={showPass.confirmPass ? "text" : "password"}
            placeholder=" "
            onChange={handlePassChange}
            required
          />
          <span className="new-floating-label">Confirm Password</span>
          <span
            className="new-floating-icon"
            onClick={() => {
              handleShowPass("confirmPass");
            }}
          >
            {showPass.confirmPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
          </span>
        </div>
        {values.confirmpassword && errors.confirmpassword && (
          <p style={invalidStyle}>{errors.confirmpassword}</p>
        )}
        <button
          type="submit"
          className="solid submit simple"
          disabled={validCurrent && isEnabled ? false : true}
        >
          Submit
        </button>
      </div>
      {success && 
      <div>
        <div className="success-change">
          <div>
            <CheckCircleOutlineSharpIcon />
          </div>
          <h1>Success</h1>
        </div>
      </div>}
    </form>
  );
}

export default ChangePassForm;

const invalidStyle = {
  textShadow: "none",
  color: "red",
  fontSize: ".7rem",
  textAlign: "center",
};

const invalidInput = {
  border: "none",
  outline: "1px solid red",
  color: "red",
};

const invalidLabel = {
  color: "red",
};
