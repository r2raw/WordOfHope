import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import BookPageOne from "./BookPageOne";
import BookPageTwo from "./BookPageTwo";
import BookPageThree from "./BookPageThree";
import Loader from "../../Loader";
import ConfirmAppointmentModal from "./ConfirmAppointmentModal";

function BookAppointment() {
  const { user } = useParams();
  const { backendData } = useOutletContext();
  const [isEnabled, setIsEnabled] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [appointmentModalOpen, setAppoitnmentModalOpen] = useState(false);
  const [succesfulAppointment, setSuccesfulAppointment] = useState(false);
  const [appointmentId, setAppointmentId] = useState();

  // useEffect(() => {
  //   if (backendData) {
  //     setLoading(false);
  //   }
  // }, [backendData]);
  const [appointMentData, setAppointmentData] = useState({
    pageOne: {
      appointment: "",
      patient: "",
      reason: "",
      service: "",
    },
    pageTwo: {
      date: "",
      time: "",
    },
    someOne: {
      lastname: { value: "", valid: false, isFocused: false, required: true },
      firstname: { value: "", valid: false, isFocused: false, required: true },
      middlename: {
        value: "",
        valid: false,
        isFocused: false,
        required: false,
      },
      suffix: { value: "", valid: false, isFocused: false, required: false },
      birthdate: { value: "", valid: false, isFocused: false, required: true },
      relationship: {
        value: "",
        valid: false,
        isFocused: false,
        required: true,
      },
      sex: { value: "", valid: true, isFocused: false, required: true },
      street: { value: "", valid: false, isFocused: false, required: true },
      province: {
        value: "Metro-Manila",
        valid: true,
        isFocused: false,
        required: true,
      },
      city: { value: "", valid: false, isFocused: false, required: true },
      barangay: { value: "", valid: false, isFocused: false, required: true },
      zip: { value: "", valid: false, isFocused: false, required: true },
    },
  });

  function handleFocusState(e) {
    const name = e.target.name;
    setAppointmentData((prev) => ({
      ...prev,
      someOne: {
        ...prev.someOne,
        [name]: { ...prev.someOne[name], isFocused: true },
      },
    }));
  }

  function handleBlurState(e) {
    const name = e.target.name;
    setAppointmentData((prev) => ({
      ...prev,
      someOne: {
        ...prev.someOne,
        [name]: { ...prev.someOne[name], isFocused: false },
      },
    }));
  }

  function handleReasonChange(e) {
    setAppointmentData((prev) => ({
      ...prev,
      pageOne: { ...prev.pageOne, service: "" },
    }));
  }

  function handlePrevClick(e) {
    e.preventDefault();
    setPage((prev) => prev - 1);
  }

  function handleNextClick(e) {
    e.preventDefault();
    setPage((prev) => prev + 1);
  }

  function handleInputChange(e, page) {
    const { name, value } = e.target;
    const currPage = page;

    if (page === "someOne") {
      const validity = e.target.validity.valid;
      if (name === "city") {
        setAppointmentData((prev) => ({
          ...prev,
          someOne: {
            ...prev.someOne,
            barangay: { ...prev.someOne[name], value: "" },
          },
        }));
      }
      setAppointmentData((prev) => ({
        ...prev,
        someOne: {
          ...prev.someOne,
          [name]: { ...prev.someOne[name], value: value, valid: validity },
        },
      }));
    } else {
      setAppointmentData((prev) => ({
        ...prev,
        [page]: { ...prev[page], [name]: value },
      }));
    }
  }

  function openModal(e) {
    e.preventDefault();
    setAppoitnmentModalOpen(true);
  }
  function closeModal() {
    setAppoitnmentModalOpen(false);
  }
  useEffect(() => {
    const isPageOneValid = () => {
      for (const fieldName in appointMentData.pageOne) {
        const field = appointMentData.pageOne[fieldName];
        if (field === "") {
          return false;
        }
      }
      if (appointMentData.pageOne.patient === "Someone") {
        for (const fieldName in appointMentData.someOne) {
          const field = appointMentData.someOne[fieldName];
          if (field.required && (field.value === "" || !field.valid)) {
            return false;
          }
        }
      }
      return true;
    };

    const isPageTwoValid = () => {
      for (const fieldName in appointMentData.pageTwo) {
        const field = appointMentData.pageTwo[fieldName];
        if (field === "") {
          return false;
        }
      }
      return true;
    };

    const allFieldsValid = page === 1 ? isPageOneValid() : isPageTwoValid();

    setIsEnabled(allFieldsValid);
  }, [appointMentData, page]);

  useEffect(() => {}, [isEnabled]);

  const handleSuccessfulAppointment = (e, id) => {
    setSuccesfulAppointment(e);
    setAppointmentId(id);
    setPage(1);
    setAppointmentData({
      pageOne: {
        appointment: "",
        patient: "",
        reason: "",
        service: "",
      },
      pageTwo: {
        date: "",
        time: "",
      },
      someOne: {
        lastname: { value: "", valid: false, isFocused: false, required: true },
        firstname: {
          value: "",
          valid: false,
          isFocused: false,
          required: true,
        },
        middlename: {
          value: "",
          valid: false,
          isFocused: false,
          required: false,
        },
        suffix: { value: "", valid: false, isFocused: false, required: false },
        birthdate: {
          value: "",
          valid: false,
          isFocused: false,
          required: true,
        },
        relationship: {
          value: "",
          valid: false,
          isFocused: false,
          required: true,
        },
        sex: { value: "", valid: true, isFocused: false, required: true },
        street: { value: "", valid: false, isFocused: false, required: true },
        province: {
          value: "Metro-Manila",
          valid: true,
          isFocused: false,
          required: true,
        },
        city: { value: "", valid: false, isFocused: false, required: true },
        barangay: { value: "", valid: false, isFocused: false, required: true },
        zip: { value: "", valid: false, isFocused: false, required: true },
      },
    });
  };

  console.log(backendData)
  // if (loading) return <Loader />;
  return (
    <div className="admin-element">
      {!backendData.user[0].birthdate && (
        <div id="setup-first">
          <h1>Whoops!</h1>
          <p>
            Before scheduling your appointment, make sure to fill out all
            necessary info.
          </p>
          <p>
            <Link to="../Patient-Profile">
              <span>Click here</span>
            </Link>
            to finish up.
          </p>
        </div>
      )}
      <h1>Book Appointment</h1>
      <div className="boooking-form">
        <div className="main-panel">
          {succesfulAppointment ? (
            <div className="successful-appointment">
              <h1>Appointment successful</h1>
              <p>
                Your appointment [Appointment ID:{" "}
                <span style={{ fontWeight: "600" }}>{appointmentId}</span>] has
                been successfully booked
              </p>
              <div>
                <button
                  className="solid lg-blue-3"
                  onClick={() => setSuccesfulAppointment(false)}
                >
                  Book another
                </button>
                <Link to="../My-Appointment">
                  <button
                    className="outlined lg-blue-3"
                    onClick={() => setSuccesfulAppointment(false)}
                  >
                    View Appointment
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="page-container">
                {page === 1 ? (
                  <BookPageOne
                    handleInputChange={handleInputChange}
                    handleReasonChange={handleReasonChange}
                    appointMentData={appointMentData.pageOne}
                    appointSomeone={appointMentData.someOne}
                    handleBlurState={handleBlurState}
                    handleFocusState={handleFocusState}
                    ncr={backendData && backendData.ncr.cities}
                    barangays={backendData && backendData.ncr.barangays}
                  />
                ) : page === 2 ? (
                  <BookPageTwo
                    handleInputChange={handleInputChange}
                    service={appointMentData.pageOne.service}
                    appointMentData={appointMentData.pageTwo}
                  />
                ) : (
                  page === 3 && (
                    <BookPageThree
                      appointMentData={appointMentData}
                      currUser={backendData && backendData.user[0]}
                    />
                  )
                )}
              </div>
              <div className="booking-pagination">
                <button
                  className="solid lg-blue-3"
                  style={{ visibility: page === 1 ? "hidden" : "visible" }}
                  onClick={handlePrevClick}
                >
                  <ArrowBackSharpIcon /> Prev
                </button>
                {page !== 3 ? (
                  <button
                    className="solid lg-blue-3"
                    disabled={!isEnabled}
                    onClick={handleNextClick}
                  >
                    Next
                    <ArrowForwardSharpIcon />
                  </button>
                ) : (
                  <button className="solid submit" onClick={openModal}>
                    Confirm
                    <ArrowForwardSharpIcon />
                  </button>
                )}
              </div>
              {appointmentModalOpen && (
                <ConfirmAppointmentModal
                  openModal={openModal}
                  userId={backendData.user[0].userid}
                  closeModal={closeModal}
                  appointMentData={appointMentData}
                  appointedBy={appointMentData.pageOne.patient}
                  handleSuccessfulAppointment={handleSuccessfulAppointment}
                />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
