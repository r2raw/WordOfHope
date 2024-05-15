import React, { useEffect, useState } from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
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
function EditResult() {
  const { backendData } = useOutletContext();
  const {record_id}  = useParams()
  const [recordData, setRecordData] = useState()
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
    city: "",
    province: "Metro-Manila",
    barangay: "",
    zip: "",
    service: "",
    date_of_visit: "",
    diagnosis: [""],
    comment: "",
  });


  console.log(recordData)
  useEffect(()=>{
    if(recordData){
        const {patientData, patient_diagnosis} = recordData;
        setValues({
            firstname: patientData.firstname,
            lastname: patientData.lastname,
            middlename: patientData.middlename,
            suffix: patientData.suffix,
            sex: patientData.sex,
            birthdate: dayjs(patientData.birthdate).format("YYYY-MM-DD"),
            email: patientData.email,
            phone: patientData.phone,
            street: patientData.street,
            city: patientData.city,
            province: patientData.province,
            barangay: patientData.barangay,
            zip: patientData.zip,
            service: patientData.service_id,
            date_of_visit: dayjs(patientData.date_visit).format("YYYY-MM-DD"),
            diagnosis: patient_diagnosis,
            comment: patientData.doctor_comment,
          })
    }
  },[recordData])
  const fetchPatientRecord  = async ()=>{
    try {
        const response = await axios.get(`/fetchEditPatientRecord/${record_id}`)
        if(response.status === 200){
            setRecordData(response.data)
        }
    } catch (error) {
        console.error("fetchPatientRecord Error: " + error.message)
    }
  }
  useEffect(()=>{
    fetchPatientRecord();
  },[])

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
        `/edit-patient-record/${record_id}`,
        {...values, patient_id: recordData.patientData.patient_id}
      );

      setLoading(false);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("edit-patient-record: " + error.message);
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

  if (!recordData) return null
  if (loading) return <Loading />;
  if (success) return <SuccessMessage message="Record updated successfully" />;
  return (
    <div className="admin-element diagnosis">
      <div className="back-button">
        <Link to="../Result-Management">
          <ArrowBackSharpIcon />
        </Link>
      </div>
      <h1>Edit Result</h1>
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

export default EditResult