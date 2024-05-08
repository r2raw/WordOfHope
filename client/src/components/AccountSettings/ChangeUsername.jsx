import React, { useEffect, useState } from "react";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import { useOutletContext, useNavigate } from "react-router-dom";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import axios from "axios";
function ChangeUsername() {
  const { userInfo,renewUserInfo } = useOutletContext();
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState(userInfo.username);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMyUser(value);
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError]= useState(null);
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
          renewUserInfo()
          setTimeout(() => {
            setSuccess(false);
            
            if(userInfo.usertype !== "Admin"){
              navigate(`/WordOfHope/${userInfo.usertype}/${userInfo.userid}/Account-Settings/User-Profile`);
            }else{
              navigate(`/WordOfHope/MNS/${userInfo.userid}/Account-Settings/User-Profile`);
            }
          }, 3000);
        }else{
          console.log(res.data)
          setError(res.data.message)
          setMyUser(userInfo.username)
          setTimeout(()=>{
            setError(null)
          },  3000)
        }
      })
      .catch((err) => console.error(err.message));
  };
  return (
    <div className="change-username card">
      <div>
        <div className="manage-user-icon">
          <ManageAccountsSharpIcon />
        </div>
        <h1>Change Username</h1>
        <p>To change your username, please fill in the designated field.</p>
        <p>
          Your username must be unique and contains a minimum of 6 characters.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
      {error && <p style={{textShadow: "none", color: "red", textAlign:"center"}}>{error}</p>}
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
      {success && (
        <div>
          <div className="success-change">
            <div>
              <CheckCircleOutlineSharpIcon />
            </div>
            <h1>Success</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeUsername;
