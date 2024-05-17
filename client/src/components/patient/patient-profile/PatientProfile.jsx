import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Loader from "../../Loader";
import defaulttImg from "../../my-images/empImg/defaultImg.png";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import PhotoSharpIcon from "@mui/icons-material/PhotoSharp";
import EditMyProfile from "./EditMyProfile";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import calculateAge from "../../my-functions/calculateAge";
import { titleCase } from "title-case";
import _ from "lodash";
import axios from "axios";
import dayjs from "dayjs";
import AddEmergencyContact from "./AddEmergencyContact";
// import io from "socket.io-client";

function PatientProfile() {
  const { backendData, updateBackend } = useOutletContext();
  console.log(backendData)
  const [loading, setLoading] = useState(true);
  const [viewEditForm, setViewEditForm] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  const imgPath = `http://localhost:5000/empimg/${backendData.user[0].empimg}`
  const { user } = useParams();
  const [viewContactForm, setViewContactForm] = useState(false);
  const handleViewEditForm = () => {
    setViewEditForm(!viewEditForm);
  };

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

  const handleViewContactForm = () => {
    setViewContactForm(!viewContactForm);
  };
  useEffect(() => {
    if (backendData) {
      setLoading(false);
    }
  }, [backendData]);

  const handleChangeimg = async (e) => {
    e.preventDefault();

    const newData = new FormData(e.target);
    const response =  await axios.post(`/add-img-patient/${user}`, newData);
    if(response.status === 200){
      updateBackend()
    }
  };

  const { socket } = useOutletContext();

  useEffect(() => {
    socket.on("new_patient_profile", (data) => {
      console.log(data);
    });
  }, [socket]);
  const handleRemove = async (id) => {
    try {
      const response = await axios.post(`/remove-contact/${id}`);
      if (response.status === 200) {
        updateBackend();
      }
    } catch (error) {
      console.error("handleRemove Error: " + error.message);
    }
  };
  if (!backendData) {
    return <Loader />;
  }
  return (
    <div className="admin-element patient-profile">
      <h1>Patient Profile</h1>
      {!loading && (
        <div className="my-profile">
          <div className="img-container">
            {preview ? (
              preview.map((pic) => {
                return <img src={pic} alt="emp-img" />;
              })
            ) : (
              <img src={backendData.user[0].empimg ?  imgPath :defaulttImg} alt="defaultImg" />
            )}
            <div className="btn-container">
              <PhotoSharpIcon />
              <label htmlFor="patient-img">Edit</label>
            </div>
            <form
              encType="multipart/form-data"
              className="patient-img-form"
              onSubmit={handleChangeimg}
            >
              <input
                type="file"
                name="patient-img"
                id="patient-img"
                accept="image/jpeg"
                onChange={handleFileChange}
              />
              {preview && (
                <button
                  className="solid submit fade"
                  style={{ width: "100px", margin: "0", padding: "0" }}
                >
                  Submit
                </button>
              )}
            </form>
          </div>

          <div className="patient-info">
            <div className="myName">
              <h2>
                {backendData
                  ? `${titleCase(_.lowerCase(backendData.user[0].firstname))}${
                      backendData.user[0].middlename &&
                      ` ${titleCase(
                        _.lowerCase(backendData.user[0].middlename)
                      )}`
                    } ${titleCase(_.lowerCase(backendData.user[0].lastname))}${
                      backendData.user[0].suffix &&
                      ` ${backendData.user[0].suffix}`
                    }`
                  : `---`}
              </h2>
              <div className="btn-container" onClick={handleViewEditForm}>
                <CreateSharpIcon />
              </div>
            </div>
            <h4>{`${
              backendData && backendData.user[0].street
                ? backendData.user[0].street
                : `---`
            }`}</h4>
            <h4>{`${
              backendData && backendData.user[0].barangay
                ? backendData.user[0].barangay
                : `---`
            }, ${
              backendData && backendData.user[0].city
                ? backendData.user[0].city
                : `---`
            },`}</h4>
            <h4>{`${
              backendData && backendData.user[0].province
                ? backendData.user[0].province
                : `---`
            }, ${
              backendData && backendData.user[0].zip
                ? backendData.user[0].zip
                : `---`
            }`}</h4>
            <p>
              <b>Birthdate: </b>
              {`${
                backendData && backendData.user[0].birthdate
                  ? dayjs(backendData.user[0].birthdate).format("MMMM DD, YYYY")
                  : `---`
              }`}
            </p>
            <p>
              <b>Age: </b>
              {`${
                backendData && backendData.user[0].birthdate
                  ? calculateAge(backendData.user[0].birthdate)
                  : `---`
              }`}
            </p>
            <p>
              <b>Sex: </b>
              {`${
                backendData && backendData.user[0].sex
                  ? backendData.user[0].sex
                  : `---`
              }`}
            </p>
            <p>
              <b>Phone Number: </b>
              {`${
                backendData && backendData.user[0].phone
                  ? backendData.user[0].phone
                  : `---`
              }`}
            </p>
            <p>
              <b>Email: </b>
              {`${
                backendData && backendData.user[0].email
                  ? backendData.user[0].email
                  : `---`
              }`}
            </p>
          </div>
          <hr />

          <div className="emergency-contacts">
            <div className="header">
              <h3>Emergency Contacts</h3>
              <div className="btn-container" onClick={handleViewContactForm}>
                <AddCircleOutlineSharpIcon />
              </div>
            </div>

            <div className="contacts">
              {backendData.emergencyContact.map((i, index) => {
                const fullname = `${i.lastname}, ${i.firstname}${
                  i.middlename && `, ${i.middlename}`
                }${i.suffix && `, ${i.suffix}`}`;
                return (
                  <div key={index} className="info card">
                    <p>
                      <b>Name:</b> {fullname}
                    </p>
                    <p>
                      <b>Relationship:</b> {i.relation}
                    </p>
                    <p>
                      <b>Phone:</b> {i.phone}
                    </p>
                    <p>
                      <b>Email:</b> {i.email}
                    </p>
                    <button
                      style={{ marginTop: "10px" }}
                      className="solid danger fade"
                      onClick={() => {
                        handleRemove(i.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {viewContactForm && (
        <div className="edit-patient-profile modal">
          <div className="container-header">
            <div
              className="btn-container close"
              onClick={handleViewContactForm}
            >
              <CloseSharpIcon />
            </div>
          </div>
          <AddEmergencyContact handleViewContactForm={handleViewContactForm} />
        </div>
      )}
      {viewEditForm && (
        <div className="edit-patient-profile modal">
          <div className="container-header">
            <div className="btn-container close" onClick={handleViewEditForm}>
              <CloseSharpIcon />
            </div>
          </div>
          <EditMyProfile
            ncr={backendData && backendData.ncr}
            user={backendData && backendData.user[0]}
            handleViewEditForm={handleViewEditForm}
          />
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
