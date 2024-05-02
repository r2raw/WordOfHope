import React, { useState, useEffect } from "react";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useParams } from "react-router-dom";
import { color } from "framer-motion";
// import img1 from "./EImg/employeeImg-1710260933988-419280624-336658555_596631925718918_8023185564823727990_n.jpg";
// import omg from "../../../my-images/empImg"
function ViewEmployee(props) {
  const {user} = useParams();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [cityMunicipality, setCityMunicipality] = useState({
    city: null,
    municipality: null,
    code: null,
  });

  const [employeeCity, setEmployeeCity] = useState({
    isCity: null,
    code: null,
  });
  const [isEditable, setIsEditable] = useState(props.editable);

  const backendData = props.backendData;

  function handleCancel() {
    setPreview();
  }

  function handleCityChange(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const name = selectedOption.getAttribute("name");
    // const value = selectedOption.getAttribute("value");
    const id = selectedOption.getAttribute("id");

    if (name === "city") {
      setCityMunicipality({
        city: true,
        municipality: false,
        code: id,
      });
    } else {
      setCityMunicipality({
        city: false,
        municipality: true,
        code: id,
      });
    }
  }

  function handleKeyDown(e) {
    const code = e.keyCode;
    if (code === 13) {
      e.preventDefault();
    }
  }

  var eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  var formattedDate = formatDate(eighteenYearsAgo);

  function formatDate(date) {
    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1); 
    var day = padZero(date.getDate());
    return year + "-" + month + "-" + day;
  }

  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  const suffix = ["Jr.", "Sr.", "II", "III", "Jr. II"];

  const defaultStyle = {
    top: "10px",
    left: "5px",
    color: "rgb(88, 88, 88) ",
    fontSize: "1rem",
  };

  const minimizedStyle = {
    top: "0px",
    fontSize: "0.6rem",
    color: "rgb(28, 92, 160)",
  };

  const [formData, setFormData] = useState({
    firstName: {
      value: props.firstName,
      valid: true,
      isFocused: false,
      required: true,
    },
    lastName: {
      value: props.lastName,
      valid: true,
      isFocused: false,
      required: true,
    },
    middleName: {
      value: props.middleName,
      valid: true,
      isFocused: false,
      required: false,
    },
    suffix: {
      value: props.suffix,
      valid: true,
      isFocused: false,
      required: false,
    },
    sex: { value: props.sex, valid: true, isFocused: false, required: true },
    birthdate: {
      value: props.birthdate,
      valid: true,
      isFocused: false,
      required: true,
    },
    email: {
      value: props.email,
      valid: true,
      isFocused: false,
      required: true,
      errorMess: "",
    },
    phoneNum: {
      value: props.phone,
      valid: true,
      isFocused: false,
      required: true,
    },
    province: {
      value: "Metro-Manila",
      valid: true,
      isFocused: false,
      required: true,
    },
    city: { value: props.city, valid: true, isFocused: false, required: true },
    barangay: {
      value: props.barangay,
      valid: true,
      isFocused: false,
      required: true,
    },
    street: {
      value: props.street,
      valid: true,
      isFocused: false,
      required: true,
    },
    zip: { value: props.zip, valid: true, isFocused: false, required: true },
    position: {
      value: props.position,
      valid: true,
      isFocused: false,
      required: true,
    },
    department: {
      value: props.department,
      valid: true,
      isFocused: false,
      required: true,
    },
    shift: {
      value: props.shift,
      valid: true,
      isFocused: false,
      required: true,
    },
    employeeType: {
      value: props.empType,
      valid: true,
      isFocused: false,
      required: true,
    },
    rfid: {
      value: props.rfid,
      valid: true,
      isFocused: false,
      required: false,
    },
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    let validity = e.target.validity.valid;

    if (name === "email") {
      if (validity === true) {
        if (value !== props.email) {
          const foundEmail = backendData.employee.find(
            (i) => i.email === value
          );
          if (foundEmail) {
            validity = false;
            setFormData((prev) => ({
              ...prev,
              [name]: {
                ...prev[name],
                value: value,
                valid: validity,
                errorMess: "Email already existing",
              },
            }));

            return;
          }
        }
      }else{
        
        setFormData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
            valid: validity,
            errorMess: "Invalid email format",
          },
        }));
        return;
      }
    }

    
    if (name === "phoneNum") {
      if (validity === true) {
        if (value !== props.phone) {
          const foundPhone = backendData.employee.find(
            (i) => i.phone === value
          );
          if (foundPhone) {
            validity = false;
            setFormData((prev) => ({
              ...prev,
              [name]: {
                ...prev[name],
                value: value,
                valid: validity,
                errorMess: "Phone number is already in use",
              },
            }));

            return;
          }
        }
      }else{
        
        setFormData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
            valid: validity,
            errorMess: "Invalid phone number format",
          },
        }));
        return;
      }
    }

    if (name === "zip") {
      if (validity === false) {
        setFormData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
            valid: validity,
            errorMess: "Invalid Zip/Postal code format",
          },
        }));
        return ;
      }
    }

    
    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        position: { value: "", valid: false, isFocused: false, required: true },
      }));
    }


    if (name === "birthdate") {
      if (validity === false) {
        setFormData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
            valid: validity,
            errorMess: "Age must be 18 above.",
          },
        }));
        return ;
      }
    }

    if (name === "rfid") {
      if (validity === true) {
        if (value !== props.email) {
          const foundRfid = backendData.employee.find(
            (i) => i.rfid === value
          );
          if (foundRfid) {
            validity = false;
            setFormData((prev) => ({
              ...prev,
              [name]: {
                ...prev[name],
                value: value,
                valid: validity,
                errorMess: "RFID already in used",
              },
            }));

            return;
          }
        }
      }else{
        
        setFormData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
            valid: validity,
            errorMess: "Invalid rfid format",
          },
        }));
        return;
      }
    }
    console.log("not returned")

    if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: value, valid: validity },
        barangay: { value: "", valid: false, isFocused: false },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: value, valid: validity, errorMess: "" },
      }));
    }
  }

  function handleFocusState(e) {
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], isFocused: true },
    }));
  }

  function handleBlurState(e) {
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], isFocused: false },
    }));
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      setImage(() => file);
    }
  }

  useEffect(() => {
    let allFieldsValid = true;
    for (const fieldName in formData) {
      const field = formData[fieldName];
      if (field.required && (field.value === "" || !field.valid)) {
        allFieldsValid = false;
        break;
      }
    }

    setIsEnabled(allFieldsValid);
  }, [formData]);

  useEffect(() => {
    if (!image) return;

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

  // useEffect(() => {
  //   if(!preview){
  //     setImage(null);
  //   }
  // }, [preview]);

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      return (images[item.replace("./", "")] = r(item));
    });
    return images;
  };

  // image && console.log(image[0]);
  const images = importAll(
    require.context("../../../my-images/empImg", false, /\.(png|jpe?g|svg)$/)
  );

  useEffect(() => {
    const foundCity = backendData.ncr.cities.find((city) => {
      return city.name === props.city;
    });
    // console.log(foundCity)
    setEmployeeCity({
      isCity: foundCity.isCity,
      code: foundCity.code,
    });

    setPreview();
    setImage();
    setIsEditable(false);
  }, [props.city, backendData.ncr.cities]);

  useEffect(() => {
    // console.log(employeeCity);
  }, [employeeCity]);

  useEffect(() => {
    setFormData({
      firstName: {
        value: props.firstName,
        valid: true,
        isFocused: false,
        required: true,
      },
      lastName: {
        value: props.lastName,
        valid: true,
        isFocused: false,
        required: true,
      },
      middleName: {
        value: props.middleName,
        valid: true,
        isFocused: false,
        required: false,
      },
      suffix: {
        value: props.suffix,
        valid: true,
        isFocused: false,
        required: false,
      },
      sex: { value: props.sex, valid: true, isFocused: false, required: true },
      birthdate: {
        value: props.birthdate,
        valid: true,
        isFocused: false,
        required: true,
      },
      email: {
        value: props.email,
        valid: true,
        isFocused: false,
        required: true,
      },
      phoneNum: {
        value: props.phone,
        valid: true,
        isFocused: false,
        required: true,
      },
      province: {
        value: "Metro-Manila",
        valid: true,
        isFocused: false,
        required: true,
      },
      city: {
        value: props.city,
        valid: true,
        isFocused: false,
        required: true,
      },
      barangay: {
        value: props.barangay,
        valid: true,
        isFocused: false,
        required: true,
      },
      street: {
        value: props.street,
        valid: true,
        isFocused: false,
        required: true,
      },
      zip: { value: props.zip, valid: true, isFocused: false, required: true },
      position: {
        value: props.position,
        valid: true,
        isFocused: false,
        required: true,
      },
      department: {
        value: props.department,
        valid: true,
        isFocused: false,
        required: true,
      },
      shift: {
        value: props.shift,
        valid: true,
        isFocused: false,
        required: true,
      },
      employeeType: {
        value: props.empType,
        valid: true,
        isFocused: false,
        required: true,
      },
      rfid: {
        value: props.rfid,
        valid: true,
        isFocused: false,
        required: false,
      },
    });
  }, [props]);
  console.log(props)
  return (
    <form method="post" encType="multipart/form-data">
      {/* <div className="employee-img-container">
        <img src={images[props.img]} alt="emp-img" />
      </div> */}
      <div className="employee-info image-upload">
        <div className="image-preview">
          {isEditable && preview ? (
            preview.map((pic) => {
              return <img className="empl-img" src={pic} alt="img" />;
            })
          ) : (
            <img className="empl-img" src={images[props.img]} alt="emp-img" />
          )}
          {preview ? (
            <input
              type="file"
              className="img-upload"
              id="img-upload"
              style={{ display: isEditable ? "" : "none" }}
              name="employeeImg"
              onChange={handleFileChange}
            />
          ) : (
            isEditable && (
              <input
                type="file"
                className="img-upload"
                id="img-upload"
                style={{ display: isEditable ? "" : "none" }}
                name="employeeImg"
                onChange={handleFileChange}
              />
            )
          )}
        </div>
      </div>
      <h3>Employee Id: {props.id}</h3>
      <input type="hidden" name="empId" value={props.id} />
      <input type="hidden" name="userId" value={props.userId} />
      <h4>Full Name</h4>
      <div className="employee-info employee-name">
        <div className="input-group">
          <input
            type="text"
            value={isEditable ? formData.firstName.value : props.firstName}
            name="firstName"
            onChange={handleInputChange}
            // value={props.firstName}
            readOnly={!isEditable}
            required
          />
          <span
            className="floating-label"
            style={
              !isEditable && formData.firstName.value ? minimizedStyle : {}
            }
          >
            First Name
          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={isEditable ? formData.lastName.value : props.lastName}
            name="lastName"
            onChange={handleInputChange}
            required
          />
          <span className="floating-label">Last Name</span>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="middleName"
            value={isEditable ? formData.middleName.value : props.middleName}
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.middleName.isFocused
                  ? minimizedStyle
                  : formData.middleName.value
                  ? formData.middleName.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : props.middleName
                ? minimizedStyle
                : defaultStyle
            }
          >
            Middle Name(Optional)
          </span>
        </div>
        <div className="input-group">
          <select
            style={{
              color: `${
                isEditable
                  ? !formData.suffix.value
                    ? "white"
                    : "rgb(28, 92, 160)"
                  : !props.suffix
                  ? "white"
                  : "rgb(28, 92, 160)"
              }`,
            }}
            name="suffix"
            id="suffix"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            // style={{color: "red"}}
          >
            <option value="" disabled={!isEditable}>
              ...
            </option>
            {suffix.map((i, id) => {
              return (
                <option
                  value={i}
                  key={id}
                  selected={
                    isEditable
                      ? formData.suffix.value === i
                        ? true
                        : false
                      : props.suffix === i
                      ? true
                      : false
                  }
                  disabled={!isEditable}
                >
                  {i}
                </option>
              );
            })}
          </select>
          <span
            style={
              isEditable
                ? formData.suffix.isFocused
                  ? minimizedStyle
                  : formData.suffix.value
                  ? formData.suffix.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : props.suffix
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

      <h4>Identification Details</h4>
      <div className="employee-info identification-details">
        <div className="input-group">
          <input
            type="date"
            name="birthdate"
            max={formattedDate}
            style={
              isEditable
                ? formData.birthdate.value
                  ? !formData.birthdate.valid
                    ? { outline: "2px solid red", border: "none" }
                    : {}
                  : { color: "white", userSelect: "none" }
                : { color: "rgb(28, 92, 160)" }
            }
            value={
              isEditable
                ? formData.birthdate.value
                  ? new Date(formData.birthdate.value)
                      .toISOString()
                      .split("T")[0]
                  : ""
                : new Date(props.birthdate).toISOString().split("T")[0]
            }
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            required
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.birthdate.isFocused
                  ? formData.birthdate.value && !formData.birthdate.valid
                    ? { ...minimizedStyle, color: "red" }
                    : minimizedStyle
                  : formData.birthdate.value
                  ? formData.birthdate.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : { ...minimizedStyle, color: "rgb(28, 92, 160)" }
            }
          >
            Birthdate (dd/mm/yyyy)
          </span>
          <p style={{display: formData.birthdate.value && !formData.birthdate.valid ? "flex" : "none" }}>{formData.birthdate.errorMess}</p>
        </div>
        <div className="input-group">
          <select
            name="sex"
            id="sex"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            required
          >
            <option value="" disabled>
              ...
            </option>
            <option
              value="Male"
              selected={
                isEditable
                  ? formData.sex.value === "Male"
                    ? true
                    : false
                  : props.sex === "Male"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              Male
            </option>
            <option
              value="Female"
              selected={
                isEditable
                  ? formData.sex.value === "Female"
                    ? true
                    : false
                  : props.sex === "Female"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              Female
            </option>
          </select>
          <span
            className="floating-label"
            style={
              formData.sex.isFocused
                ? minimizedStyle
                : formData.sex.value
                ? formData.sex.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            Sex
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={isEditable ? formData.email.value : props.email}
            style={
              isEditable && formData.email.value && !formData.email.valid
                ? { outline: "2px solid red", border: "none" }
                : {}
            }
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            required
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.email.isFocused
                  ? formData.email.value && !formData.email.valid
                    ? { ...minimizedStyle, color: "red" }
                    : minimizedStyle
                  : formData.email.value
                  ? formData.email.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : minimizedStyle
            }
          >
            Email
          </span>

          <p style={{display: formData.email.value && !formData.email.valid ? "flex" : "none" }}>{formData.email.errorMess}</p>
        </div>
        <div className="input-group">
          <input
            type="tel"
            id="phone"
            name="phoneNum"
            pattern="[0]{1}[9]{1}[0-9]{9}"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            value={isEditable ? formData.phoneNum.value : props.phone}
            style={
              isEditable && formData.phoneNum.value && !formData.phoneNum.valid
                ? { outline: "2px solid red", border: "none" }
                : {}
            }
            readOnly={!isEditable}
            required
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.phoneNum.isFocused
                  ? formData.phoneNum.value && !formData.phoneNum.valid
                    ? { ...minimizedStyle, color: "red" }
                    : minimizedStyle
                  : formData.phoneNum.value
                  ? formData.phoneNum.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : minimizedStyle
            }
          >
            Phone Number
          </span>
          <p style={{display: formData.phoneNum.value && !formData.phoneNum.valid ? "flex" : "none" }}>{formData.phoneNum.errorMess}</p>
        </div>
        
      </div>
      
      <h4>Address</h4>
      <div className="employee-info address-details">
        <div className="input-group">
          <input
            type="text"
            name="street"
            value={isEditable ? formData.street.value : props.street}
            onChange={handleInputChange}
            readOnly={!isEditable}
            required
          />
          <span
            className="floating-label street-address"
            style={!isEditable ? minimizedStyle : {}}
          >
            House No., Bldg, Street Name
          </span>
        </div>
        <div className="input-group">
          <select name="province" id="province" required>
            <option value="" disabled>
              ...
            </option>
            <option value="Metro-Manila" selected>
              Metro-Manila
            </option>
          </select>

          <span className="floating-label">Province</span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <select
            name="city"
            id="city"
            onChange={(e) => {
              handleInputChange(e);
              handleCityChange(e);
            }}
            onLoadCapture={(e) => {
              handleCityChange(e);
            }}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            style={{ color: "rgb(28, 92, 160)" }}
            required
          >
            <option value="" disabled>
              ...
            </option>
            {backendData.ncr &&
              backendData.ncr.cities &&
              backendData.ncr.cities.map((city, index) => {
                return (
                  <option
                    key={index}
                    name={!city.isCity ? "municipality" : "city"}
                    id={city.code}
                    value={city.name}
                    selected={
                      isEditable
                        ? formData.city.value === city.name
                          ? true
                          : false
                        : props.city === city.name
                        ? true
                        : false
                    }
                    disabled={!isEditable}
                  >
                    {city.name}
                  </option>
                );
              })}
          </select>

          <span
            className="floating-label"
            style={
              formData.city.isFocused
                ? minimizedStyle
                : formData.city.value
                ? formData.city.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            City/Municipality
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <select
            name="barangay"
            id="barangay"
            value={!formData.barangay.value ? props.barangay : formData.barangay.value}
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            style={{ color: !isEditable ? "rgb(28, 92, 160)" : "" }}
            required
          >
            <option
              value=""
              disabled={!isEditable}
              selected={
                isEditable
                  ? formData.barangay.value === ""
                    ? true
                    : false
                  : false
              }
            >
              ...
            </option>
            {backendData.ncr &&
              backendData.ncr.barangays &&
              backendData.ncr.barangays
                .filter((barangay) =>
                  isEditable
                    ? cityMunicipality.code
                      ? !cityMunicipality.municipality
                        ? barangay.cityCode === cityMunicipality.code
                        : barangay.municipalityCode === cityMunicipality.code
                      : employeeCity.isCity
                      ? barangay.cityCode === employeeCity.code
                      : barangay.municipalityCode === employeeCity.code
                    : employeeCity.isCity
                    ? barangay.cityCode === employeeCity.code
                    : barangay.municipalityCode === employeeCity.code
                )
                .map((barangay, index) => {
                  return (
                    <option
                      key={index}
                      value={barangay.name}
                      selected={
                        isEditable
                          ? formData.barangay.value === barangay.name
                            ? true
                            : false
                          : props.barangay === barangay.name
                          ? true
                          : false
                      }
                      disabled={!isEditable}
                    >
                      {barangay.name}
                    </option>
                  );
                })}
          </select>
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.barangay.isFocused
                  ? minimizedStyle
                  : formData.barangay.value
                  ? formData.barangay.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : minimizedStyle
            }
          >
            Barangay
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <input
            type="tel"
            name="zip"
            pattern="[0-9]{4}"
            maxLength={4}
            style={
              formData.zip.value && !formData.zip.valid && isEditable
                ? { outline: "2px solid red", border: "none" }
                : {}
            }
            value={isEditable ? formData.zip.value : props.zip}
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            required
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.zip.isFocused
                  ? formData.zip.value && !formData.zip.valid
                    ? { ...minimizedStyle, color: "red" }
                    : minimizedStyle
                  : formData.zip.value
                  ? formData.zip.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : minimizedStyle
            }
          >
            ZIP/Postal Code
          </span>
          <p style={{display: formData.zip.value && !formData.zip.valid ? "flex" : "none" }}>{formData.zip.errorMess}</p>
        </div>
      </div>

      <h4>Job Description</h4>
      <div className="employee-info job-description">
        <div className="input-group">
          <select
            name="department"
            id="department"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            value={isEditable ? formData.department.value : props.department}
            readOnly={!isEditable}
            style={{ color: "rgb(28, 92, 160)" }}
            required
          >
            <option value="" disabled={true}>
              ...
            </option>
            
            
            <option
              value="HR"
              disabled={!isEditable}
            >
              Human Resource
            </option>
            <option
              value="OB/GYN"
              disabled={!isEditable}
            >
              OB/GYN
            </option>

            <option
              value="Pediatrics"
              disabled={!isEditable}
            >
              Pediatrics
            </option>
            <option
              value="Pharmacy"
              disabled={!isEditable}
            >
              Pharmacy
            </option>
            <option
              value="Radiology"
              disabled={!isEditable}
            >
              Radiology
            </option>
          </select>

          <span
            className="floating-label"
            style={
              formData.department.isFocused
                ? minimizedStyle
                : formData.department.value
                ? formData.department.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            Department
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <select
            name="position"
            id="position"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            value={isEditable
                  ? formData.position.value
                  : props.position}
            style={isEditable  ? !formData.position.value ? {color: "white"} : { color: "rgb(28, 92, 160)" } :  { color: "rgb(28, 92, 160)"}}
            required
          >
            <option value="" disabled={true}>
              ...
            </option>
            <option
              value="Doctor"
              style={isEditable && formData.department.value === "HR" ? {display: "none"} : {}}
              disabled={!isEditable}
            >
              Doctor
            </option>
            <option
              value="Nurse"
              style={isEditable && formData.department.value === "HR" ? {display: "none"} : {}}
              disabled={!isEditable}
            >
              Nurse
            </option>
            <option
              style={isEditable && formData.department.value !== "HR" ? {display: "none"} : {}}
              value="HR"
              disabled={!isEditable}
            >
              HR
            </option>
          </select>

          <span
            className="floating-label"
            style={
              formData.position.isFocused
                ? minimizedStyle
                : formData.position.value
                ? formData.position.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            Position
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <select
            name="shift"
            id="shift"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            readOnly={!isEditable}
            style={{ color: "rgb(28, 92, 160)" }}
            required
          >
            <option value="" disabled={true}>
              ...
            </option>
            <option
              value="AM"
              selected={
                isEditable
                  ? formData.shift.value === "AM"
                    ? true
                    : false
                  : props.shift === "AM"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              AM
            </option>
            <option
              value="PM"
              selected={
                isEditable
                  ? formData.shift.value === "PM"
                    ? true
                    : false
                  : props.shift === "PM"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              PM
            </option>
          </select>

          <span
            className="floating-label"
            style={
              formData.shift.isFocused
                ? minimizedStyle
                : formData.shift.value
                ? formData.shift.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            Shift
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <select
            name="employeeType"
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            id="employeeType"
            readOnly={!isEditable}
            style={{ color: "rgb(28, 92, 160)" }}
            required
          >
            <option value="" disabled={true}>
              ...
            </option>
            <option
              value="Fulltime"
              selected={
                isEditable
                  ? formData.employeeType.value === "Fulltime"
                    ? true
                    : false
                  : props.empType === "Fulltime"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              Fulltime
            </option>
            <option
              value="Part-time"
              selected={
                isEditable
                  ? formData.employeeType.value === "Part-time"
                    ? true
                    : false
                  : props.empType === "Part-time"
                  ? true
                  : false
              }
              disabled={!isEditable}
            >
              Part-time
            </option>
          </select>

          <span
            className="floating-label"
            style={
              formData.employeeType.isFocused
                ? minimizedStyle
                : formData.employeeType.value
                ? formData.employeeType.valid
                  ? minimizedStyle
                  : { ...minimizedStyle, color: "red" }
                : defaultStyle
            }
          >
            Employee type
          </span>
          <span className="dp-icon">
            <ArrowDropDownSharpIcon />
          </span>
        </div>
        <div className="input-group">
          <input
            type="tel"
            name="rfid"
            pattern="[0-9]{10}"
            style={
              isEditable && formData.rfid.value && !formData.rfid.valid
                ? { outline: "2px solid red", border: "none" }
                : {}
            }
            value={isEditable ? formData.rfid.value : props.rfid}
            onChange={handleInputChange}
            onFocus={handleFocusState}
            onBlur={handleBlurState}
            onKeyDown={isEditable ? handleKeyDown : undefined}
            readOnly={!isEditable}
            maxLength={10}
          />
          <span
            className="floating-label"
            style={
              isEditable
                ? formData.rfid.isFocused
                  ? formData.rfid.value && !formData.rfid.valid
                    ? { ...minimizedStyle, color: "red" }
                    : minimizedStyle
                  : formData.rfid.value
                  ? formData.rfid.valid
                    ? minimizedStyle
                    : { ...minimizedStyle, color: "red" }
                  : defaultStyle
                : minimizedStyle
            }
          >
            RFID
          </span>
          <p style={{display: !formData.rfid.valid ? "flex" : "none" }}>{formData.rfid.errorMess}</p>
        </div>
      </div>
      <div className="form-button">
        {isEditable ? (
          <div className="editable-content">
            <button
              className="outlined"
              id="cancel-btn"
              onClick={() => {
                setIsEditable(false);
              }}
              tabIndex="-1"
            >
              Cancel
            </button>
            <button
              className="outlined"
              id="edit-empl-acc"
              disabled={ formData.barangay.valid ? !isEnabled : true}
              formAction={
                image ? `/update-employee-with-img/${user}` : `/update-employee/${user}`
              }
            >
              Confirm
            </button>
          </div>
        ) : (
          <button
            className="outlined"
            id="editable-btn"
            onClick={() => setIsEditable(true)}
            tabIndex="-1"
          >
            Edit
          </button>
        )}
      </div>
      <div className="save-modal">
        <div>
          <div className="container-header">
            <h5 style={{ margin: "none" }}>Create Employee Account</h5>
            <div className="close-btn">
              <CloseSharpIcon />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ViewEmployee;
