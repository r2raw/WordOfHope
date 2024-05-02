import React, { useEffect, useState } from "react";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { Zoom } from "@mui/material";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import passwordValidation from "./passwordValidation";

function LeftRegForm(props) {
  // const {socket} = props;

  const suffix = ["Jr.", "Sr.", "II", "III"];

  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [regStatus, setRegStatus] = useState(false);
  const [invalidReg, setInvalidReg] = useState({});
  const [regData, setRegData] = useState({
    firstname: { value: "", valid: false, isFocused: false, required: true },
    middlename: { value: "", valid: false, isFocused: false, required: false },
    lastname: { value: "", valid: false, isFocused: false, required: true },
    suffix: { value: "", valid: false, isFocused: false, required: false },
    email: { value: "", valid: false, isFocused: false, required: true },
    username: { value: "", valid: false, isFocused: false, required: true },
    password: { value: "", valid: false, isFocused: false, required: true },
    confirmpass: { value: "", valid: false, isFocused: false, required: true },
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmpass: "",
  });

  // const existingStyle = {
  //   color: "red",
  //   outline: "1px solid red",
  //   border: "none",
  // };
  const defaultStyle = {
    top: "10px",
    left: "5px",
    color: "rgb(88, 88, 88) ",
    fontSize: "1rem",
  };

  const minimizedStyle = {
    top: "0px",
    fontSize: "0.6rem",
    color: "#379cbd",
  };

  function handleShowPass() {
    setShowPass(!showPass);
  }

  function handleShowConfPass() {
    setShowConfPass(!showConfPass);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    let valid = e.target.validity.valid;

    // if (name === "confirmpass" || name === "password") {
    //   if (name === "password") {
    //     if (value !== regData.confirmpass.value) {
    //       setRegData((prev) => ({
    //         ...prev,
    //         confirmpass: { ...prev["confirmpass"], valid: false },
    //       }));
    //     } else {
    //       setRegData((prev) => ({
    //         ...prev,
    //         confirmpass: { ...prev["confirmpass"], valid: true },
    //       }));
    //     }
    //   } else {
    //     if (value === regData.password.value) {
    //       valid = true;
    //     } else {
    //       valid = false;
    //     }
    //   }
    // }

    setRegData((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: value, valid: valid },
    }));
  }

  function handleFocusState(e) {
    const name = e.target.name;
    setRegData((prev) => ({
      ...prev,
      [name]: { ...prev[name], isFocused: true },
    }));
  }

  function handleBlurState(e) {
    const name = e.target.name;
    setRegData((prev) => ({
      ...prev,
      [name]: { ...prev[name], isFocused: false },
    }));
  }
  useEffect(() => {
    let allFieldsValid = true;

    
    if(errors.password !== "" || errors.confirmpass !== ""){
      allFieldsValid = false;
    }

    for (const fieldName in regData) {
      const field = regData[fieldName];
      if (field.required && (field.value === "" || !field.valid)) {
        allFieldsValid = false;
        break;
      }
    }

    


    setIsEnabled(allFieldsValid);
  }, [regData, errors]);

  useEffect(()=>{

    setErrors(passwordValidation(regData));
  }, [regData.password.value, regData.confirmpass.value])
  function handleSubmit() {
    let newRegData = {};
    for (const fieldName in regData) {
      const field = regData[fieldName];
      newRegData = { ...newRegData, [fieldName]: field.value };
    }

    axios
      .post("/register", newRegData)
      .then((res) => {
        console.log(res.data);
        const { status } = res.data;
        if (status === "invalid") {
          setInvalidReg(res.data.errors);
          return;
        } else if (status === "success") {
          setRegStatus(true);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(invalidReg);

  useEffect(() => {
    if (Object.keys(invalidReg).length > 0) {
      setTimeout(() => {
        setInvalidReg({});
      }, 2000);
    }
  }, [invalidReg]);

  if (regStatus)
    return (
      <div className="left-reg">
        <div className="succesful-registration">
          <h1>Successful registration</h1>
          <Link to="/Login">
            <p
              onClick={() => {
                setRegStatus(false);
              }}
            >
              Click here to login
            </p>
          </Link>
        </div>
      </div>
    );
  return (
    <div className="left-reg">
      {Object.keys(invalidReg).length > 0 && (
        <div id="error-message">
          {Object.keys(invalidReg).map((field) => (
            <p key={field}>{invalidReg[field]}</p>
          ))}
        </div>
      )}
      <LocalHospitalRoundedIcon sx={{ fontSize: 100 }} />
      <h2>Register</h2>
      <div className="input-elements">
        <div className="registration">
          <div className="partition">
            <div className="input-group">
              <input
                name="firstname"
                type="text"
                className="lg-blue-3"
                required
                onChange={handleInputChange}
              />
              <span className="floating-label">First Name</span>
            </div>

            <div className="input-group">
              <input
                name="middlename"
                type="text"
                className="lg-blue-3"
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
              />
              <span
                style={
                  regData.middlename.value
                    ? minimizedStyle
                    : regData.middlename.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
                className="floating-label"
              >
                Middle Name(Optional)
              </span>
            </div>
            <div className="input-group">
              <input
                name="lastname"
                type="text"
                className="lg-blue-3"
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Last Name</span>
            </div>
            <div className="input-group">
              <select
                className="lg-blue-3"
                name="suffix"
                id="suffix"
                style={{ color: !regData.suffix.value ? "white" : "" }}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
              >
                <option value="">...</option>
                {suffix.map((i, id) => {
                  return (
                    <option value={i} key={id}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <span
                style={
                  regData.suffix.value
                    ? minimizedStyle
                    : regData.suffix.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
                className="floating-label"
              >
                Suffix Name(Optional)
              </span>
              <span className="dp-icon">
                <ArrowDropDownSharpIcon />
              </span>
            </div>
          </div>
          <div className="partition">
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="lg-blue-3"
                style={
                  regData.email.value && !regData.email.valid
                    ? { outline: "1px solid red", border: "none" }
                    : {}
                }
                onBlur={handleBlurState}
                onFocus={handleFocusState}
                onChange={handleInputChange}
                required
              />
              <span
                style={
                  regData.email.value
                    ? regData.email.valid
                      ? minimizedStyle
                      : { ...minimizedStyle, color: "red" }
                    : regData.email.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
                className="floating-label"
              >
                Email
              </span>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="lg-blue-3"
                name="username"
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Username</span>
            </div>
            <div className="input-group">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                className="lg-blue-3"
                onChange={handleInputChange}
                style={
                  regData.password.value && errors.password !== ""
                    ? { outline: "1px solid red", border: "none" }
                    : {}
                }
                required
              />
              <span
                className="floating-label"
                style={
                  regData.password.value && errors.password !== ""
                    ? { ...minimizedStyle, color: "red" }
                    : {}
                }
              >
                Password
              </span>
              <span
                onClick={handleShowPass}
                className="label-icon toggle-password"
              >
                <Zoom in={true}>
                  {showPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
                </Zoom>
              </span>
              {regData.password.value && (
                <p className="invalid" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className="input-group">
              <input
                style={
                  regData.confirmpass.value && errors.confirmpass !== ""
                    ? { outline: "1px solid red", border: "none" }
                    : {}
                }
                name="confirmpass"
                type={showConfPass ? "text" : "password"}
                className="lg-blue-3"
                onChange={handleInputChange}
                required
              />
              <span
                style={
                  regData.confirmpass.value && errors.confirmpass !== ""
                    ? { ...minimizedStyle, color: "red" }
                    : {}
                }
                className="floating-label"
              >
                Confirm Password
              </span>
              <span
                onClick={handleShowConfPass}
                className="label-icon toggle-password"
              >
                <Zoom in={true}>
                  {showConfPass ? <LockOpenSharpIcon /> : <LockSharpIcon />}
                </Zoom>
              </span>

              {regData.confirmpass.value && (
                <p className="invalid" style={{ color: "red" }}>
                  {errors.confirmpass}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          className="solid lg-blue-3"
          disabled={!isEnabled}
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>

      <NavLink to="/Login">
        <p>Have an account? Log in</p>
      </NavLink>
    </div>
  );
}

export default LeftRegForm;
