import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import DiagnosisPatientInfo from "../DocResulltMgmt/DiagnosisPatientInfo";
import DiagnosisPatientAddress from "../DocResulltMgmt/DiagnosisPatientAddress";
import DiagnosisPatientService from "../DocResulltMgmt/DiagnosisPatientService";
import DiagnosisRadioBtn from "../DocResulltMgmt/DiagnosisRadioBtn";
import suffix from "../../my-functions/Suffixes";
import axios from "axios";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import dayjs from "dayjs";
import DiagnosisTextArea from "../DocResulltMgmt/DiagnosisTextArea";
import DiagnosiscComment from "../DocResulltMgmt/DiagnosiscComment";
import _ from "lodash";
import SuccessMessage from "../../SuccessMessage";
import Loading from "../../Loading";
function SearchedPatientAddResult(props) {
  const { backendData } = useOutletContext();
  const { foundPatient } = props;
  console.log(backendData.user[0].id)
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
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
    city: "",
    province: "Metro-Manila",
    barangay: "",
    zip: "",
    service: "",
    date_of_visit: "",
    diagnosis: [""],
    comment: "",
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      firstname: foundPatient[0].firstname,
      lastname: foundPatient[0].lastname,
      middlename: foundPatient[0].middlename,
      suffix: foundPatient[0].suffix,
      sex: foundPatient[0].sex,
      birthdate: dayjs(foundPatient[0].birthdate).format("YYYY-MM-DD"),
      email: foundPatient[0].email,
      phone: foundPatient[0].phone,
      street:foundPatient[0].street,
      city: foundPatient[0].city,
      province: foundPatient[0].province,
      barangay: foundPatient[0].barangay,
      zip: foundPatient[0].zip,
    }));
  }, []);

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

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (
        fieldname !== "email" &&
        fieldname !== "phone" &&
        fieldname !== "comment" &&
        fieldname !== "middlename" &&
        fieldname !== "suffix" &&
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
        `/add-existing-patient-record/${backendData.user[0].id}/${foundPatient[0].patient_id}`,
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
  if (success) return <SuccessMessage message="Record addeed successfully" />;
  return (
    <div
      style={{ margin: "10px 0 0", width: "100%", padding: "0" }}
      className="admin-element diagnosis"
    >
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

export default SearchedPatientAddResult;
