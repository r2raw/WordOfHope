import React, { useState, useEffect, useCallback } from "react";
import img from "../../../my-images/empImg/defaultImg.png";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import suffix from "../../../my-functions/Suffixes";
import { calendarMax } from "../../../my-functions/EighteenYearsAgo";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import {
  useOutletContext,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import Departments from "../../../my-functions/Departments";
import SuccessMessage from "../../../SuccessMessage";
import Loading from "../../../Loading";
import axios from "axios";

function AddEmployee() {
  const { user } = useParams();
  const { backendData, renewEmployees } = useOutletContext();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addStatus, setAddStatus] = useState("");
  const { cities } = backendData.ncr;
  const [barangays, setBarangays] = useState();

  const [errorsIn, setErrorsIn] = useState({
    email: "",
    rfid: "",
  });
  const navigate = useNavigate();
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

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    birthdate: "",
    sex: "",
    email: "",
    phone: "",
    street: "",
    province: "Metro-Manila",
    city: "",
    barangay: "",
    zip: "",
    department: "",
    position: "",
    empType: "",
    rfid: "",
  });

  const [errors, setErrors] = useState({
    birthdate: false,
    email: false,
    phone: false,
    zip: false,
    rfid: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "birthdate" ||
      name === "email" ||
      name === "phone" ||
      name === "zip" ||
      name === "rfid"
    ) {
      const valid = e.target.validity.valid;
      setErrors((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }

    if (name === "city") {
      setValues((prev) => ({
        ...prev,
        barangay: "",
      }));
    }

    if (name === "department") {
      setValues((prev) => ({
        ...prev,
        position: "",
      }));
    }
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (
        fieldname !== "middlename" &&
        fieldname !== "suffix" &&
        fieldname !== "rfid"
      ) {
        const value = values[fieldname];
        if (value === "") {
          valid = false;
        }
      }
    }

    for (const fieldname in errors) {
      const error = errors[fieldname];
      if (error) {
        valid = false;
        break;
      }
    }

    setIsEnabled(valid);
  }, [values, errors, image]);

  useEffect(() => {
    if (values.city !== "") {
      const foundCity = cities.find((city) => city.name === values.city);
      if (foundCity) {
        if (foundCity.isCity) {
          setBarangays(
            backendData.ncr.barangays.filter(
              (i) => i.cityCode === foundCity.code
            )
          );
        } else {
          setBarangays(
            backendData.ncr.barangays.filter(
              (i) => i.municipalityCode === foundCity.code
            )
          );
        }
      }
    } else {
      setBarangays("");
    }
  }, [values.city]);

  useEffect(() => {
    if (values.rfid === "") {
      setErrors((prev) => ({
        ...prev,
        rfid: false,
      }));
    }
  }, [values.rfid]);

  const uploadWithImg = useCallback(
    (data) => {
      axios
        .post(`/add-employee/${user}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImage(null);
          setLoading(false);
          if (res.data.status === "success") {
            setAddStatus("success");
          }
        })
        .catch((err) => console.error("ADD  EMPLOYEE ERROR:" + err.message));
    },
    [values]
  );

  const uploadNoImg = useCallback(
    (data) => {
      axios
        .post(`/add-employee-no-img/${user}`, data)
        .then((res) => {
          setLoading(false);
          if (res.data.status === "success") {
            setAddStatus("success");
          }
        })
        .catch((err) => console.error("ADD  EMPLOYEE ERROR:" + err.message));
    },
    [values]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      email: "",
      rfid: "",
    });

    let newData = new FormData(e.target);
    const validate = await axios.post("/Validate-Add-Employee", values);

    setLoading(true);
    if (validate.data.status === "success") {
      if (!image) {
        uploadNoImg(values);
      } else {
        uploadWithImg(newData);
      }
    } else {
      setLoading(false);
      setErrorsIn(validate.data.errorIn);
    }
  };

  useEffect(() => {
    if (addStatus === "success") {
      renewEmployees();
      setTimeout(() => {
        navigate("../Accounts");
      }, 3000);
    }
  }, [addStatus]);

  if (loading) return <Loading />;

  if (addStatus === "success")
    return <SuccessMessage message={"Employee added successfully."} />;

  return (
    <div className="admin-element add-employee">
      <Link to="../Accounts" style={{ width: "min-content" }}>
        <ArrowBackSharpIcon />
      </Link>
      <div>
        <h1>Add Employee</h1>
        <p>Add your new people to grow the company reaching their goals.</p>
        <div className="card add-employee-form">
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="section-1">
              <div>
                <div className="employee-img card">
                  {preview ? (
                    preview.map((pic) => {
                      return <img src={pic} alt="emp-img" />;
                    })
                  ) : (
                    <img src={img} alt="emp-img" />
                  )}
                </div>
                <input
                  name="employeeImg"
                  type="file"
                  id="add-employee-img"
                  onChange={handleFileChange}
                  accept="image/jpeg"
                />
                <label htmlFor="add-employee-img" className="card">
                  Upload Photo
                </label>
              </div>
              <div className="employee-details">
                <h2>Employee Information</h2>
                <div className="employee-name">
                  <div id="new-input-group">
                    <input
                      value={values.lastname}
                      name="lastname"
                      onChange={handleInputChange}
                      type="text"
                      className="card"
                      placeholder=" "
                      required
                    />
                    <span className="new-floating-label">Last name</span>
                  </div>
                  <div id="new-input-group">
                    <input
                      value={values.firstname}
                      name="firstname"
                      onChange={handleInputChange}
                      type="text"
                      className="card"
                      placeholder=" "
                      required
                    />
                    <span className="new-floating-label">First name</span>
                  </div>
                  <div id="new-input-group">
                    <input
                      value={values.middlename}
                      name="middlename"
                      onChange={handleInputChange}
                      type="text"
                      className="card"
                      placeholder=" "
                    />
                    <span className="new-floating-label">Middle name</span>
                  </div>
                  <div id="new-input-group">
                    <select
                      value={values.suffix}
                      onChange={handleInputChange}
                      name="suffix"
                      style={{ width: "100%" }}
                      className="card"
                    >
                      <option></option>
                      {suffix.map((i, index) => {
                        return <option key={index}>{i}</option>;
                      })}
                    </select>
                    <span
                      className="new-floating-label"
                      style={!values.suffix ? dropDownLabelStyle : {}}
                    >
                      Suffix
                    </span>
                    <span className="dropdown">
                      <ArrowDropDownSharpIcon />
                    </span>
                  </div>
                </div>

                <div id="new-input-group">
                  <input
                    name="birthdate"
                    value={values.birthdate}
                    onChange={handleInputChange}
                    type="date"
                    max={calendarMax}
                    className="card"
                    placeholder=" "
                  />
                  <span className="new-floating-label">Birthdate</span>
                </div>

                <div id="new-input-group">
                  <select
                    name="sex"
                    value={values.sex}
                    onChange={handleInputChange}
                    className="card"
                  >
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <span
                    className="new-floating-label"
                    style={!values.sex ? dropDownLabelStyle : {}}
                  >
                    Sex
                  </span>
                  <span className="dropdown">
                    <ArrowDropDownSharpIcon />
                  </span>
                </div>

                <div id="new-input-group">
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    type="email"
                    className="card"
                    placeholder=" "
                  />
                  <span className="new-floating-label">Email</span>
                </div>

                <div id="new-input-group">
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    type="tel"
                    pattern="[0]{1}[9]{1}[0-9]{9}"
                    className="card"
                    maxLength={11}
                    placeholder=" "
                  />
                  <span className="new-floating-label">Phone</span>
                </div>
              </div>
            </div>

            <h2>Employee Address</h2>
            <div className="section-2">
              <div id="new-input-group">
                <input
                  name="street"
                  value={values.street}
                  onChange={handleInputChange}
                  type="text"
                  className="card"
                  placeholder=" "
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
                  name="city"
                  value={values.city}
                  onChange={handleInputChange}
                  className="card"
                >
                  <option></option>
                  {cities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((i) => {
                      return <option>{i.name}</option>;
                    })}
                </select>
                <span
                  className="new-floating-label"
                  style={!values.city ? dropDownLabelStyle : {}}
                >
                  City/Municipality
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
              <div id="new-input-group">
                <select
                  name="barangay"
                  value={values.barangay}
                  onChange={handleInputChange}
                  className="card"
                >
                  <option></option>
                  {barangays &&
                    barangays
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((i) => {
                        return <option>{i.name}</option>;
                      })}
                </select>
                <span
                  className="new-floating-label"
                  style={!values.barangay ? dropDownLabelStyle : {}}
                >
                  Barangay
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
              <div id="new-input-group">
                <input
                  name="zip"
                  value={values.zip}
                  onChange={handleInputChange}
                  type="tel"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  className="card"
                  placeholder=" "
                  required
                />
                <span className="new-floating-label">Zip/Postal Code</span>
              </div>
            </div>
            <div className="section-3">
              <h2>Job Description</h2>

              <div id="new-input-group">
                <select
                  name="department"
                  value={values.department}
                  onChange={handleInputChange}
                  className="card"
                >
                  <option></option>
                  {backendData.departments
                    .filter((i) => i.id !== 1 && i.availability === "Available")
                    .map((department, index) => {
                      return (
                        <option key={index} value={department.id}>
                          {department.department_name}
                        </option>
                      );
                    })}
                  {/* {Departments.map((i, index) => {
                    return <option key={index}>{i.name}</option>;
                  })} */}
                </select>
                <span
                  className="new-floating-label"
                  style={!values.department ? dropDownLabelStyle : {}}
                >
                  Department
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>

              <div id="new-input-group">
                <select
                  name="position"
                  value={values.position}
                  onChange={handleInputChange}
                  className="card"
                >
                  <option></option>
                  {values.department &&
                    backendData.positions &&
                    backendData.positions
                      .filter(
                        (i) =>
                          i.department_id === parseInt(values.department) &&
                          i.department_availability === "Available" &&
                          i.position_availability === "Available"
                      )
                      .map((position, index) => {
                        return (
                          <option key={index} value={position.id}>
                            {position.position_name}
                          </option>
                        );
                      })}
                  {/* {values.department &&
                    Departments.find(
                      (i) => i.name === values.department
                    )?.positions.map((i, index) => {
                      return <option>{i}</option>;
                    })} */}
                </select>
                <span
                  className="new-floating-label"
                  style={!values.position ? dropDownLabelStyle : {}}
                >
                  Position
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>

              <div id="new-input-group">
                <select
                  name="empType"
                  value={values.empType}
                  onChange={handleInputChange}
                  className="card"
                >
                  <option></option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                </select>
                <span
                  className="new-floating-label"
                  style={!values.empType ? dropDownLabelStyle : {}}
                >
                  Employment type
                </span>
                <span className="dropdown">
                  <ArrowDropDownSharpIcon />
                </span>
              </div>
              <div id="new-input-group">
                <input
                  name="rfid"
                  value={values.rfid}
                  onChange={handleInputChange}
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="card"
                  placeholder=" "
                />
                <span className="new-floating-label">RFID</span>
              </div>
            </div>
            {errorsIn?.email && <p className="invalid">{errorsIn.email}</p>}
            {errorsIn?.rfid && <p className="invalid">{errorsIn.rfid}</p>}

            <button className="solid fade card submit" disabled={!isEnabled}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;

const dropDownLabelStyle = {
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "1rem",
};
