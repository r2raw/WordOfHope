import React, { useEffect, useState } from "react";
import img from "../my-images/empImg/defaultImg.png";
import dayjs from "dayjs";
import DateToday from "./DateToday";
import { useOutletContext, Link } from "react-router-dom";
import Loader from "../Loader";
import calculateAge from "../my-functions/calculateAge";
function UserProfile() {
  
  const { userInfo } = useOutletContext();
  const [myInfo, setMyinfo] = useState(userInfo);

  const {firstname, lastname, suffix, middlename, empimg, email, phone, department, position,emptype, sex, birthdate} = myInfo;
  const {street, barangay, city, province, zip} = myInfo;
  // const userImg = require(`../my-images/empImg/${empimg}`)
  const userImg = `http://localhost:5000/empImg/${empimg}`
  

  const fullname = `${firstname}${middlename && ` ${middlename}`} ${lastname}${suffix && ` ${suffix}`}`
  const address = `${street}, ${barangay}, ${city}, ${province}, ${zip}`;
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div>
          <div>
            <h1>Hello, {fullname}</h1>
            <p>Have a nice day at work!</p>
          </div>
          <DateToday />
        </div>
        <div className="img-container">
          <img src={userImg} alt="my-img" />
        </div>
      </div>
      <Link to="Edit-Profile">
      <p>Edit profile</p></Link>
      <div className="user-info">
        <div className="user-details">
          <h1>Details</h1>
          <p>Sex: <span>{sex}</span></p>
          <p>Birthdate:  <span>{dayjs(birthdate).format("MMMM DD, YYYY")}</span></p>
          <p>Age:  <span>{calculateAge(birthdate)}</span></p>
        </div>
        <div className="user-contacts">
          <h1>Contacts</h1>
          <p>Phone:  <span>{phone}</span></p>
          <p>Email:  <span>{email}</span></p>
          <p>Address:   <span>{address}</span></p>
        </div>
        <div className="user-job">
          <h1>Job Details</h1>
          <p>Department:  <span>{department}</span></p>
          <p>Position:  <span>{position} - {emptype}</span></p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
