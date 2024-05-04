import React from "react";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

function SuccessMessageFit(props) {
    const {message} = props;
  return (
    <div id="success-message-fit">
      <div>
        <CheckCircleOutlineSharpIcon />
      </div>
      <p>{message}</p>
    </div>
  );
}

export default SuccessMessageFit;
