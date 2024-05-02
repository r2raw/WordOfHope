import React from "react";
import imgLogo from "../../my-images/hopeImgs/hope-logo.png"
function EmpHeader() {
  return (
    <header className="emp-header">
      <img src={imgLogo} alt="logo" />
      <p>Word Of Hope General Hospital</p>
    </header>
  );
}

export default EmpHeader;
