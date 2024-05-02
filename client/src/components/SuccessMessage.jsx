import React from 'react'
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
function SuccessMessage(props) {
    const {message} =props;
  return (
    
    <div className="admin-element">
    <div id="success-message" className="card">
      <div >
        <div>
          <CheckCircleOutlineSharpIcon />
        </div>
        <h1>Success</h1>
        <p>{message}</p>
      </div>
    </div>
  </div>
  )
}

export default SuccessMessage