import React, { useEffect, useState } from "react";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import { useNavigate, useOutletContext } from "react-router-dom";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import axios from "axios";
function PatientUsername(props) {
  const { backendData, updateBackend } = useOutletContext();
  const userInfo = backendData.user[0];
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState(userInfo.username);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMyUser(value);
  };

  const {setSuccess, setLoading} = props;
  const [isEnabled, setIsEnabled] = useState(false);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (myUser !== userInfo.username) {
      return setIsEnabled(true);
    }
    setIsEnabled(false);
  }, [myUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/change-username", {
        userid: userInfo.userid,
        newUsername: myUser,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setSuccess(true);
          updateBackend();
        } else {
          setError(res.data.message);
          setMyUser(userInfo.username);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      })
      .catch((err) => console.error(err.message));
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p style={{ textShadow: "none", color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}
      <div id="new-input-group">
        <input
          className="card"
          type="text"
          value={myUser}
          placeholder=" "
          onChange={handleInputChange}
        />
        <span className="new-floating-label">Username</span>
      </div>

      <button
        type="submit"
        className="solid submit simple"
        disabled={myUser.length >= 6 && isEnabled ? false : true}
      >
        Submit
      </button>
    </form>
  );
}

export default PatientUsername;
