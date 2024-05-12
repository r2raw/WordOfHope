import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { calendarMax } from "../my-functions/EighteenYearsAgo";
import calculateAge from "../my-functions/calculateAge";
import suffix from "../my-functions/Suffixes";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import dayjs from "dayjs";
import axios from "axios";
import img1 from "../my-images/empImg/defaultImg.png";

import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
function EditUserProfile() {
  const { userInfo, ncr, renewBackendData, renewUserInfo } = useOutletContext();
  const { empimg } = userInfo;
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const userImg = `http://localhost:5000/empImg/${empimg}`;
  const [isDisabled, setIsDisabled] = useState(true);
  const { cities } = ncr;
  const [barangays, setBarangays] = useState();
  const navigate = useNavigate();
  const [values, setValue] = useState({
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    middlename: userInfo.middlename,
    suffix: userInfo.suffix,
    email: userInfo.email,
    phone: userInfo.phone,
    sex: userInfo.sex,
    birthdate: dayjs(userInfo.birthdate).format("YYYY-MM-DD"),
    street: userInfo.street,
    barangay: userInfo.barangay,
    city: userInfo.city,
    province: "Metro-Manila",
    zip: userInfo.zip,
  });

  const [successfullySaved, setSuccessFullySave] = useState(false);

  const [errors, setErrors] = useState({
    zip: false,
    birthdate: false,
    email: false,
    phone: false,
  });

  const [errMessage, setErrMessage] = useState({
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "zip" ||
      name === "birthdate" ||
      name === "email" ||
      name === "phone"
    ) {
      const { valid } = e.target.validity;
      setErrors((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }

    if (name === "city") {
      setValue((prev) => ({
        ...prev,
        barangay: "",
      }));
    }

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const foundCity = cities.find((i) => i.name === values.city);
    if (!foundCity.isCity) {
      return setBarangays(
        ncr.barangays.filter((i) => i.municipalityCode === foundCity.code)
      );
    }
    return setBarangays(
      ncr.barangays.filter((i) => i.cityCode === foundCity.code)
    );
  }, [values.city]);

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (fieldname !== "middlename" && fieldname !== "suffix") {
        if (values[fieldname] === "") {
          valid = false;
        }
      }
    }

    if (errors.zip || errors.birthdate || errors.email || errors.phone) {
      valid = false;
    }

    setIsDisabled(!valid);
  }, [values, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/edit-user/${userInfo.userid}`, {
        values,
        prevEmail: userInfo.email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          renewUserInfo();
          setSuccessFullySave(true);
          return;
        }

        setErrMessage(prev =>({
          ...prev,
          email: res.data.errmessage,
        }));
        setErrors(prev =>({
          ...prev,
          email: true,
        }))
      })
      .catch((err) => console.error("edit user error: " + err.message));
  };

  useEffect(() => {
    if (successfullySaved) {
      setTimeout(() => {
        setSuccessFullySave(false);
        navigate("../User-Profile");
      }, 3000);
    }
  }, [successfullySaved]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      setImage(() => file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (!image) return setPreview("");

    let tmp = [];

    for (let i = 0; i < image.length; i++) {
      tmp.push(URL.createObjectURL(image[i]));
    }

    const objectUrl = tmp;
    setPreview(objectUrl);

    for (let i = 0; i < objectUrl.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrl[i]);
      };
    }
  }, [image]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const newData = new FormData(e.target);
    newData.append("userId", userInfo.id);
    console.log(newData);
    axios
      .post("/update-user-img", newData)
      .then((res) => {
        if (res.data.status === "success") {
          renewUserInfo();
          setImage(null);
          setImageChanged(true);
        }
      })
      .catch((err) => console.error("update-user-img error: " + err.message));
  };

  useEffect(() => {
    if (imageChanged) {
      setTimeout(() => {
        setImageChanged(false);
      }, 3000);
    }
  }, [imageChanged]);

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <p>Provide details about yourself and any other pertinent information.</p>
      <div className="card user-info">
        <form className="form-img-change" onSubmit={handleImageChange}>
          <div className="change-image">
            <div className="img-container">
              {preview ? (
                preview.map((pic) => {
                  return <img src={pic} alt="emp-img" />;
                })
              ) : (
                <img src={!empimg ? img1 : userImg } alt="emp-img" />
              )}
              {/* <img src={userImg} alt="user-profile" /> */}
            </div>
            <div className="change-profile-pic">
              {preview && (
                <button className="solid submit fade card" type="submit">
                  Save
                </button>
              )}
              <input
                type="file"
                name="employee-image"
                id="change-image"
                onChange={handleFileChange}
              />
              <label htmlFor="change-image" className="card">
                Upload Photo
              </label>
            </div>

            {imageChanged && (
              <p style={{ color: "#4fbc46" }}>Image changed successfully!</p>
            )}
          </div>
        </form>
        <div>
          <form className="form-edit-user-info" onSubmit={handleSubmit}>
            <div>
              <div id="new-input-group">
                <input
                  type="text"
                  value={values.lastname}
                  name="lastname"
                  onChange={handleInputChange}
                  placeholder=" "
                  className="card"
                  required
                />
                <span className="new-floating-label">Last name</span>
              </div>
              <div id="new-input-group">
                <input
                  type="text"
                  value={values.firstname}
                  name="firstname"
                  onChange={handleInputChange}
                  placeholder=" "
                  className="card"
                  required
                />
                <span className="new-floating-label">First name</span>
              </div>
              <div id="new-input-group">
                <input
                  type="text"
                  value={values.middlename}
                  name="middlename"
                  onChange={handleInputChange}
                  placeholder=" "
                  className="card"
                />
                <span className="new-floating-label">Middle name</span>
              </div>

              <div id="new-input-group">
                <select
                  className="card"
                  value={values.suffix}
                  name="suffix"
                  onChange={handleInputChange}
                >
                  <option></option>
                  {suffix.map((i, index) => {
                    return <option key={index}>{i}</option>;
                  })}
                </select>
                <span
                  style={!values.suffix ? dropdownLabelStyle : {}}
                  className="new-floating-label"
                >
                  Suffix
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
            </div>
            <div>
              <div id="new-input-group">
                <input
                  type="tel"
                  value={values.phone}
                  name="phone"
                  onChange={handleInputChange}
                  pattern="[0]{1}[9]{1}[0-9]{9}"
                  maxLength={11}
                  placeholder=" "
                  className="card"
                  required
                />
                <span className="new-floating-label">Phone</span>
              </div>
              <div id="new-input-group">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder=" "
                  onChange={handleInputChange}
                  className="card"
                  required
                />
                <span className="new-floating-label">Email</span>
              </div>
              {errMessage.email !== "" && <p className="invalid">{errMessage.email}</p>}
              <div id="new-input-group">
                <input
                  type="date"
                  name="birthdate"
                  // onKeyDown={(e)=>{e.preventDefault()}}
                  onChange={handleInputChange}
                  value={values.birthdate}
                  placeholder=" "
                  max={calendarMax}
                  className="card"
                />
                <span className="new-floating-label">Birthdate</span>
              </div>
              <p>Age: {calculateAge(values.birthdate)}</p>
              <div id="new-input-group" className="selection">
                <select
                  className="card"
                  name="sex"
                  value={values.sex}
                  onChange={handleInputChange}
                  required
                >
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <span
                  style={values.sex ? {} : dropdownLabelStyle}
                  className="new-floating-label"
                >
                  Sex
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
            </div>
            <h3>Address</h3>
            <div className="address-container">
              <div id="new-input-group">
                <input
                  type="text"
                  placeholder=" "
                  name="street"
                  value={values.street}
                  onChange={handleInputChange}
                  className="card"
                  required
                />
                <span className="new-floating-label">
                  House No., Bldg, Street
                </span>
              </div>
              <div id="new-input-group">
                <select value="Metro-Manila" className="card">
                  <option>Metro-Manila</option>
                </select>
                <span className="new-floating-label">Province</span>
              </div>
              <div id="new-input-group">
                <select
                  value={values.city}
                  name="city"
                  onChange={handleInputChange}
                  className="card"
                  required
                >
                  {cities.map((i, index) => {
                    return <option key={index}>{i.name}</option>;
                  })}
                </select>
                <span className="new-floating-label">City/Municipality</span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
              <div id="new-input-group">
                <select
                  value={values.barangay}
                  name="barangay"
                  onChange={handleInputChange}
                  className="card"
                  required
                >
                  <option></option>
                  {barangays &&
                    barangays.map((i, index) => {
                      return <option key={index}>{i.name}</option>;
                    })}
                </select>
                <span
                  className="new-floating-label"
                  style={values.barangay ? {} : dropdownLabelStyle}
                >
                  Barangay
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
              <div id="new-input-group">
                <input
                  type="tel"
                  pattern="[0-9]{4}"
                  name="zip"
                  onChange={handleInputChange}
                  value={values.zip}
                  maxLength={4}
                  className="card"
                  placeholder=" "
                  required
                />
                <span className="new-floating-label">Zip/Postal Code</span>
              </div>
            </div>
            <button className="button submit solid fade" disabled={isDisabled}>
              Submit
            </button>
          </form>
        </div>
      </div>

      {successfullySaved && (
        <div>
          <div className="success-change">
            <div>
              <CheckCircleOutlineSharpIcon />
            </div>
            <h1>Success</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUserProfile;

const dropdownLabelStyle = {
  fontSize: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
};
