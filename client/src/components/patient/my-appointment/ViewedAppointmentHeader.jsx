import React from "react";

import imglogo from "../../my-images/hopeImgs/hope-logo.png";
export default (props) => {
  const qrImagePath = require(`../../my-images/qr-codes/${props.qrcode}.png`);
  return (
      <div className="company-info">
        <div className="img-container">
          <img src={imglogo} alt="logo" />
        </div>
        <div className="header-details">
          <h1>Word Of Hope General Hosital</h1>
          <h4>#23 BUENAR ST. NOVALICHES, QUEZON CITY</h4>
          <h4> TEL: 289301622</h4>
          <h2>Summary of Appointment Details</h2>
        </div>

        <div className="qr-details">
          <img src={qrImagePath} alt="qr-code" />
        </div>
      </div>
  );
};
