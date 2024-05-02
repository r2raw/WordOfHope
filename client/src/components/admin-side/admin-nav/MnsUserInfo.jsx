import React, { useState, useRef, useEffect } from "react";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { NavLink } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import def from "../../my-images/empImg/defaultImg.png";
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';

function MnsUserInfo(props) {
  const [imageSrc, setImageSrc] = useState(null);

  const [userDets, setUserDets] = useState({
    lastname: props.lastname,
    firstname: props.firstname,
    imgsrc: props.img,
    position: props.pos,
  });

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(userDets.imgsrc){
          setImageSrc(`http://localhost:5000/empImg/${userDets.imgsrc}`);
    
  }});

  useEffect(()=>{
    setUserDets({
        lastname: props.lastname,
        firstname: props.firstname,
        imgsrc: props.img,
        position: props.pos,
    
    })
  }, [props])
  function handleClick() {
    setIsOpen(!isOpen);
  }

  function openRfidDialog(){
    props.openRfidDialog();
  }
  return (
    <div className="nav-partition">
      <p>Logged in as:</p>
      <div className="active-user">
        <img src={imageSrc ? imageSrc : def} alt={`${userDets.firstname}`} />
        <div className="user-info">
          <h5>{`${userDets.firstname ? userDets.firstname : "---"} ${
            userDets.lastname ? userDets.lastname : "---"
          }`}</h5>
          <div className="user-type">
            {userDets.position ? userDets.position : "---"}
          </div>
        </div>
        <div className="menu-dot" onClick={handleClick}>
          <MoreVertSharpIcon />
        </div>
      </div>
      <div
        ref={menuRef}
        className="three-dots-opt mns"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        {/* <NavLink to="RFIDScan"> */}
        <div className="fullscreen" onClick={openRfidDialog}>
          <div>
            <div>
              <SensorsSharpIcon />
            </div>
            <p>RFID scanner</p>
          </div>
        </div>
        {/* </NavLink> */}
        {/* <NavLink to=""> */}

        <div className="fullscreen">
          <div>
            <div>
              <PeopleAltSharpIcon />
            </div>
            <p>Queue</p>
          </div>
        </div>
        {/* </NavLink> */}
        <NavLink to={`/WordOfHope/MNS/${props.user}/Account-Settings/User-Profile`}>
          <div>
            <div>
              <PersonSharpIcon />
            </div>
            <p>My Profile</p>
          </div>
        </NavLink>
        <NavLink to="/Login">
          <div>
            <div>
              <LogoutSharpIcon />
            </div>
            <p>Logout</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default MnsUserInfo;
