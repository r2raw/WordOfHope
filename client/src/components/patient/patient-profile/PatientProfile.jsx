import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../../Loader";
import defaulttImg from "../../my-images/empImg/defaultImg.png";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import PhotoSharpIcon from "@mui/icons-material/PhotoSharp";
import EditMyProfile from "./EditMyProfile";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import calculateAge from "../../my-functions/calculateAge";
import {titleCase} from "title-case";
import _ from "lodash";

import dayjs from "dayjs";
// import io from "socket.io-client";

function PatientProfile() {
  const { backendData } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [viewEditForm, setViewEditForm] = useState(false);

  const handleViewEditForm = () => {
    setViewEditForm(!viewEditForm);
  };
  useEffect(() => {
    if (backendData) {
      setLoading(false);
    }
  }, [backendData]);

  const { socket } = useOutletContext();

  useEffect(() => {
    socket.on("new_patient_profile", (data) => {
      console.log(data);
    });
  }, [socket]);
  if (!backendData) {
    return <Loader />;
  }
  return (
    <div className="admin-element patient-profile">
      <h1>Patient Profile</h1>
      {!loading && (
        <div className="my-profile">
          <div className="img-container">
            <img src={defaulttImg} alt="defaultImg" />
            <div className="btn-container">
              <PhotoSharpIcon />
              <p>Edit</p>
            </div>
          </div>
          <div className="patient-info">
            <div className="myName">
              <h2>
                {backendData
                  ? `${titleCase(_.lowerCase(backendData.user[0].firstname))}${
                      backendData.user[0].middlename &&
                      ` ${titleCase(_.lowerCase(backendData.user[0].middlename))}`
                    } ${titleCase(_.lowerCase(backendData.user[0].lastname))}${
                      backendData.user[0].suffix &&
                      ` ${backendData.user[0].suffix}`
                    }`
                  : `---`}
              </h2>
              <div
                className="btn-container"
                onClick={handleViewEditForm}
              >
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
              <div className="btn-container">
                <AddCircleOutlineSharpIcon />
              </div>
            </div>
            <div className="info">
              <p>
                <b>Name:</b> ---- -. ----
              </p>
              <p>
                <b>Relationship:</b> ---
              </p>
              <p>
                <b>Address: </b>---- - --- -- --- - --. ---- ----,
                ---- ---, -----, -----
              </p>
              <p>
                <b>Phone:</b> -----
              </p>
              <p>
                <b>Email:</b> ----
              </p>
            </div>
          </div>
        </div>
      )}

      {viewEditForm && (
        <div className="edit-patient-profile modal">
          <div className="container-header">
            <div
              className="btn-container close"
              onClick={handleViewEditForm}
            >
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
