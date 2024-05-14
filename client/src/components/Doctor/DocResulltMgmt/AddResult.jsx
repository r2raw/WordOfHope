import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import DiagnosisPatientInfo from "./DiagnosisPatientInfo";
import DiagnosisPatientAddress from "./DiagnosisPatientAddress";
import DiagnosisPatientService from "./DiagnosisPatientService";
import DiagnosisRadioBtn from "./DiagnosisRadioBtn";
import suffix from "../../my-functions/Suffixes";
import axios from "axios";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import dayjs from "dayjs";
import DiagnosisTextArea from "./DiagnosisTextArea";
import DiagnosiscComment from "./DiagnosiscComment";
import _ from "lodash";
import SuccessMessage from "../../SuccessMessage";
import Loading from "../../Loading";
function AddResult() {
  const { backendData } = useOutletContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const [isCurrentlyServing, setIsCurrentlyServing] = useState("false");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    sex: "",
    birthdate: "",
    email: "",
    phone: "",
    street: "",
    province: "Metro-Manila",
    barangay: "",
    zip: "",
    service: "",
    date_of_visit: "",
    diagnosis: [""],
    comment: "",
    user_id: "",
  });

  const addDiagnosis = () => {
    setValues((prev) => {
      let newValues = values;
      newValues = { ...newValues, diagnosis: [...prev.diagnosis, ""] };
      return newValues;
    });
  };

  const deleteDiagnosis = (id) => {
    setValues((prev) => {
      const newDiagnosis = prev.diagnosis.filter((_, index) => index !== id);
      return { ...prev, diagnosis: newDiagnosis };
    });
  };

  const handleDiagnosticChange = (value, id) => {
    setValues((prev) => {
      let newValues = values;
      newValues = {
        ...newValues,
        diagnosis: prev.diagnosis.map((diag, index) =>
          index === id ? value : diag
        ),
      };
      return newValues;
    });
  };

  const handleRadio = (e) => {
    const { value } = e.target;
    setIsCurrentlyServing(value);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearData = () => {
    setValues((prev) => ({
      ...prev,
      firstname: "",
      lastname: "",
      middlename: "",
      suffix: "",
      sex: "",
      birthdate: "",
      email: "",
      phone: "",
      street: "",
      province: "Metro-Manila",
      city: "",
      barangay: "",
      user_id: "",
      zip: "",
    }));
  };

  const fetchAppointmentData = async (id, method, appointedfor) => {
    try {
      const response = await axios.get(
        `/doctor-get-appointment/${id}/${method}/${appointedfor}`
      );

      if (response.status === 200) {
        const {
          firstname,
          lastname,
          suffix,
          middlename,
          sex,
          birthdate,
          email,
          phone,
          barangay,
          street,
          zip,
          city,
          province,
          userid,
          service,
        } = response.data.appointment;

        setValues((prev) => ({
          ...prev,
          firstname: firstname,
          lastname: lastname,
          middlename: middlename,
          suffix: suffix,
          sex: sex,
          birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
          email: email || "",
          phone: phone || "",
          street: street,
          province: province,
          city: city,
          barangay: barangay,
          zip: zip,
          service: service,
          date_of_visit: dayjs(
            backendData.currentlyServing[0].date_of_visit
          ).format("YYYY-MM-DD"),
          user_id: userid || "",
        }));
      }
    } catch (error) {
      console.error("fetchAppointmentData Error: " + error.message);
    }
  };
  useEffect(() => {
    if (isCurrentlyServing === "true") {
      fetchAppointmentData(
        backendData.currentlyServing[0].appointment_id,
        backendData.currentlyServing[0].method,
        backendData.currentlyServing[0].appointedfor
      );
    } else {
      clearData();
    }
  }, [isCurrentlyServing]);

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (
        fieldname !== "email" &&
        fieldname !== "phone" &&
        fieldname !== "comment" &&
        fieldname !== "diagnosis"
      ) {
        if (_.trim(values[fieldname]) === "") {
          valid = false;
        }
      }
    }

    for (let i = 0; i < values.diagnosis.length; i++) {
      if (_.trim(values.diagnosis[i]) === "") {
        valid = false;
      }
    }

    setIsDisabled(!valid);
  }, [values]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        `/add-patient-record/${backendData.user[0].id}`,
        values
      );

      setLoading(false);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("add-patient-record: " + error.message);
    }
  };

  const handleFormChange = (e) => {
    const { valid } = e.target.validity;

    setIsFormValid(valid);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate("../Result-Management");
      }, 3000);
    }
  }, [success]);
  if (loading) return <Loading />;
  if (success) return <SuccessMessage message="Record added success fully" />;
  return (
    <div className="admin-element diagnosis">
      <div className="back-button">
        <Link to="../Result-Management">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <h1>Add Result</h1>
      {backendData.currentlyServing.length > 0 && (
        <DiagnosisRadioBtn
          isCurrentlyServing={isCurrentlyServing}
          handleRadio={handleRadio}
        />
      )}
      <form
        className="card"
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      >
        <h3>Patient Information</h3>
        <DiagnosisPatientInfo
          values={values}
          handleInputChange={handleInputChange}
        />
        <h3>Patient Address</h3>
        <DiagnosisPatientAddress
          values={values}
          handleInputChange={handleInputChange}
        />
        <h3>Service</h3>
        <DiagnosisPatientService
          values={values}
          handleInputChange={handleInputChange}
        />
        <h3 className="diagnosis-h3">
          Diagnosis
          <div className="add-btn" onClick={addDiagnosis}>
            <AddCircleSharpIcon />
          </div>
        </h3>
        {values.diagnosis.map((i, index) => {
          return (
            <DiagnosisTextArea
              key={index}
              id={index}
              deleteDiagnosis={deleteDiagnosis}
              handleDiagnosticChange={handleDiagnosticChange}
              values={values}
            />
          );
        })}
        <h3>Comment</h3>
        <DiagnosiscComment
          values={values}
          handleInputChange={handleInputChange}
        />
        <button
          className="submit solid fade"
          disabled={isDisabled || !isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddResult;
