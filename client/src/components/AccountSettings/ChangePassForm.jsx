import React, { useEffect, useState } from "react";
import passwordValidation from "./passwordValidation";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import { useOutletContext, useNavigate } from "react-router-dom";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import axios from "axios";
function ChangePassForm() {
  const { userInfo } = useOutletContext();
  console.log(useOutletContext())
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
          username: userInfo.username,
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

      console.log(errors[valuename]);
      if (value !== "") {
        console.log(errors[valuename]);
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
      .post("/change-password", {
        confirmpassword: values.confirmpassword,
        username: userInfo.username,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
            if(userInfo.usertype !== "Admin"){
              navigate(`/WordOfHope/${userInfo.usertype}/${userInfo.userid}/Account-Settings/User-Profile`);
            }else{
              navigate(`/WordOfHope/MNS/${userInfo.userid}/Account-Settings/User-Profile`);
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
            className="new-floating-icon pass"
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
            className="new-floating-icon pass"
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
            className="new-floating-icon pass"
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
