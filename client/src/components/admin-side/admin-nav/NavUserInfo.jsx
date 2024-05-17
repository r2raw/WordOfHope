import React, { useState, useRef, useEffect } from "react";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import def from "../../my-images/empImg/defaultImg.png";
import _ from "lodash";
import axios from "axios";
import { titleCase } from "title-case";
function NavUserInfo(props) {
  const [imageSrc, setImageSrc] = useState(null);

  const navigate = useNavigate()
  const { user } = useParams();
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(`/Logout/${user}`);
      if (response.status === 200) {
        
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("uid", null);
        localStorage.setItem("role", null);
        navigate("/Login")
        return;
      }
    } catch (error) {
      console.error("handleLogout error: " + error.message);
    }
  };

  // useEffect(() => {
  //   if(userDets.imgsrc){
  //     import(`../../my-images/empImg/${userDets.imgsrc}`)
  //       .then((imageModule) => {
  //         setImageSrc(imageModule.default);
  //       })
  //       .catch((error) => {
  //         console.error('Error loading image:', error);
  //       });
  //     }

  // });

  useEffect(() => {
    if (props.img) {
      setImageSrc(`http://localhost:5000/empimg/${props.img}`);
    }
  }, [props.img]);
  useEffect(() => {
    setUserDets({
      lastname: props.lastname,
      firstname: props.firstname,
      imgsrc: props.img,
      position: props.pos,
    });
  }, [props]);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="nav-partition">
      <p>Logged in as:</p>
      <div className="active-user">
        <img src={imageSrc ? imageSrc : def} alt={`${userDets.firstname}`} />
        <div className="user-info">
          <h5>{`${
            userDets.firstname
              ? titleCase(_.lowerCase(userDets.firstname))
              : "---"
          } ${
            userDets.lastname
              ? titleCase(_.lowerCase(userDets.lastname))
              : "---"
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
        className="three-dots-opt"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <NavLink
          to={`/WordOfHope/${userDets.position}/${props.user}/Account-Settings/User-Profile`}
        >
          <div>
            <div>
              <PersonSharpIcon />
            </div>
            <p>My Profile</p>
          </div>
        </NavLink>
        <a onClick={handleLogout}>
          <div>
            <div>
              <LogoutSharpIcon />
            </div>
            <p>Logout</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NavUserInfo;
