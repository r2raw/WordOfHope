import React, { useState, useEffect } from "react";
import suffix from "../../my-functions/Suffixes";
// import { calendarTodayMax } from "../../my-functions/EighteenYearsAgo";
import { calendarMax } from "../../my-functions/EighteenYearsAgo";
import SaveChangesModal from "../../SaveChangeModal";
import { useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
// import io from "socket.io-client";

function EditMyProfile(props) {
  const user1 = props.user;
  
  const {user} = useParams();
  const [isCity, setIsCity] = useState({
    value: null,
    code: null,
  });

  
  const [saveData, setSaveData] = useState(false);

  const minimizedStyle = {
    top: "0px",
    fontSize: "0.6rem",
    color: "rgb(28, 92, 160)",
  };

  const defaultStyle = {
    top: "10px",
    left: "5px",
    color: "rgb(88, 88, 88) ",
    fontSize: "1rem",
  };

  const invalidInput = {
    outline: "1px solid red",
    border: "none",
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    firstname: {
      value: user1.firstname,
      valid: user1.firstname ? true : false,
      isFocused: false,
      required: true,
    },
    lastname: {
      value: user1.lastname,
      valid: user1.lastname ? true : false,
      isFocused: false,
      required: true,
    },
    middlename: {
      value: user1.middlename,
      valid: user1.middlename ? true : false,
      isFocused: false,
      required: false,
    },
    suffix: {
      value: user1.suffix,
      valid: user1.suffix ? true : false,
      isFocused: false,
      required: false,
    },
    sex: {
      value: user1.sex,
      valid: user1.sex ? true : false,
      isFocused: false,
      required: true,
    },
    birthdate: {
      value: user1.birthdate,
      valid: user1.birthdate ? true : false,
      isFocused: false,
      required: true,
    },
    email: {
      value: user1.email,
      valid: user1.email ? true : false,
      isFocused: false,
      required: true,
    },
    phone: {
      value: user1.phone,
      valid: user1.phone ? true : false,
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
      value: user1.city,
      valid: user1.city ? true : false,
      isFocused: false,
      required: true,
    },
    barangay: {
      value: user1.barangay,
      valid: user1.barangay ? true : false,
      isFocused: false,
      required: true,
    },
    street: {
      value: user1.street,
      valid: user1.street ? true : false,
      isFocused: false,
      required: true,
    },
    zip: {
      value: user1.zip,
      valid: user1.zip ? true : false,
      isFocused: false,
      required: true,
    },
  });

  function toggleSaveModal() {
    setSaveData(!saveData);
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    let validity = e.target.validity.valid;

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
        return;
      }
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
        return;
      }
    }

    if (name === "city") {
      if (value) foundCity(value);
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

  function foundCity(cityName) {
    const foundCity = props.ncr.cities.find((city) => {
      return city.name === cityName;
    });
    setIsCity({
      isCity: foundCity.isCity,
      code: foundCity.code,
    });
  }

  useEffect(() => {
    if (user1.city) {
      foundCity(user1.city);
    }
  }, [user1.city]);

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



  
  const{socket} = useOutletContext();
  const sendMessage =() =>{
    let sendData  = {};
    for(const fieldName in formData){
      const field = formData[fieldName];
      sendData  = {...sendData,
      [fieldName]: field.value}
    };

    sendData ={...sendData,
      userId:user1.userid}
    
    socket.emit("update_patient", {formData: sendData});
  }

  
  console.log(user1)
  return (
    <div className="container">
      <h1>Edit profile</h1>
      <form className="edit-patient-form" onSubmit={(e) => e.preventDefault()} method="post" action={`/patient-edit-my-profile/${user}`}>
        <div className="form-partition name">
          <h3>Patient Name</h3>
          <div className="inputs">
            <div className="input-group">
              <input
                type="text"
                value={formData.lastname.value}
                name="lastname"
                required
                onChange={handleInputChange}
              />
              <span className="floating-label">Last Name</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                value={formData.firstname.value}
                name="firstname"
                required
                onChange={handleInputChange}
              />
              <span className="floating-label">First Name</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                value={formData.middlename.value}
                name="middlename"
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
              />
              <span
                className="floating-label"
                style={
                  formData.middlename.value
                    ? minimizedStyle
                    : formData.middlename.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Middle Name(Optional)
              </span>
            </div>
            <div className="input-group">
              <select
                name="suffix"
                value={formData.suffix.value}
                onChange={handleInputChange}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                style={{ color: !formData.suffix.value && "white" }}
              >
                <option value="">...</option>
                {suffix.map((i, index) => {
                  return <option key={index}>{i}</option>;
                })}
              </select>
              <span
                className="floating-label"
                style={
                  formData.suffix.value
                    ? minimizedStyle
                    : formData.suffix.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Suffix(Optional)
              </span>
            </div>
          </div>
        </div>
        <div className="form-partition details">
          <h3>Identification Details</h3>
          <div className="inputs">
            <div className="input-group">
              <input
                type="date"
                value={dayjs(formData.birthdate.value).format("YYYY-MM-DD")}
                // value="2001-21-1"
                name="birthdate"
                required
                max={calendarMax}
                style={
                  formData.birthdate.value
                    ? !formData.birthdate.valid
                      ? invalidInput
                      : {}
                    : { color: "white" }
                }
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
              />
              <span
                className="floating-label"
                style={
                  formData.birthdate.value
                    ? !formData.birthdate.valid
                      ? { ...minimizedStyle, color: "red" }
                      : minimizedStyle
                    : formData.birthdate.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Birthdate
              </span>
            </div>
            <div className="input-group">
              <select
                name="sex"
                style={{ color: !formData.sex.value && "white" }}
                value={formData.sex.value}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
              >
                <option value="">...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <span
                className="floating-label"
                style={
                  formData.sex.value
                    ? minimizedStyle
                    : formData.sex.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Sex
              </span>
            </div>
            <div className="input-group">
              <input
                type="email"
                value={formData.email.value}
                name="email"
                required
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                style={
                  formData.email.value && !formData.email.valid
                    ? invalidInput
                    : {}
                }
                onChange={handleInputChange}
              />
              <span
                className="floating-label"
                style={
                  formData.email.value
                    ? formData.email.valid
                      ? minimizedStyle
                      : { ...minimizedStyle, color: "red" }
                    : formData.email.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Email
              </span>
            </div>
            <div className="input-group">
              <input
                type="tel"
                pattern="[0]{1}[9]{1}[0-9]{9}"
                name="phone"
                value={formData.phone.value}
                required
                onChange={handleInputChange}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                style={
                  formData.phone.value && !formData.phone.valid
                    ? invalidInput
                    : {}
                }
              />
              <span
                className="floating-label"
                style={
                  formData.phone.value
                    ? formData.phone.valid
                      ? minimizedStyle
                      : { ...minimizedStyle, color: "red" }
                    : formData.phone.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Phone Number
              </span>
            </div>
          </div>
        </div>
        <div className="form-partition address">
          <h3>Address</h3>
          <div className="inputs">
            <div className="input-group">
              <input
                type="text"
                name="street"
                value={formData.street.value}
                required
                onChange={handleInputChange}
              />
              <span className="floating-label street-address">
                House No., Bldg, Street Name
              </span>
            </div>
            <div className="input-group">
              <select
                value="Metro-Manila"
                name="province"
                onChange={handleInputChange}
              >
                <option>...</option>
                <option>Metro-Manila</option>
              </select>
              <span className="floating-label">Province</span>
            </div>
            <div className="input-group">
              <select
                name="city"
                value={formData.city.value}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                onChange={handleInputChange}
                style={{ color: !formData.city.value && "white" }}
              >
                <option value="">...</option>
                {props.ncr &&
                  props.ncr.cities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((i, index) => {
                      return <option key={index}>{i.name}</option>;
                    })}
              </select>
              <span
                className="floating-label"
                style={
                  formData.city.value
                    ? minimizedStyle
                    : formData.city.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                City/Municipality
              </span>
            </div>
            <div className="input-group">
              <select
                name="barangay"
                value={formData.barangay.value}
                onChange={handleInputChange}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                style={{ color: !formData.barangay.value && "white" }}
              >
                <option value="">...</option>
                {props.ncr &&
                  formData.city.value &&
                  props.ncr.barangays
                    .filter((i) =>
                      isCity.isCity
                        ? i.cityCode === isCity.code
                        : i.municipalityCode === isCity.code
                    )
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((i, index) => {
                      return <option key={index}>{i.name}</option>;
                    })}
              </select>
              <span
                className="floating-label"
                style={
                  formData.barangay.value
                    ? minimizedStyle
                    : formData.barangay.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Barangay
              </span>
            </div>
            <div className="input-group">
              <input
                type="tel"
                pattern="[0-9]{4}"
                value={formData.zip.value}
                name="zip"
                required
                onChange={handleInputChange}
                onFocus={handleFocusState}
                onBlur={handleBlurState}
                style={
                  formData.zip.value && !formData.zip.valid ? invalidInput : {}
                }
              />
              <span
                className="floating-label"
                style={
                  formData.zip.value
                    ? formData.zip.valid
                      ? minimizedStyle
                      : { ...minimizedStyle, color: "red" }
                    : formData.zip.isFocused
                    ? minimizedStyle
                    : defaultStyle
                }
              >
                Zip/Postal Code
              </span>
            </div>
          </div>
        </div>
        {saveData && <SaveChangesModal handleViewEditForm={props.handleViewEditForm} toggleSaveModal={toggleSaveModal} sendMessage={sendMessage} id={user1.id}/>}
      </form>
      <div className="submit-edit">
        <button
          className="solid submit"
          disabled={!isEnabled}
          onClick={toggleSaveModal}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default EditMyProfile;
