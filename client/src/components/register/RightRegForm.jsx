import React from "react";
import regimg from "../my-images/hopeImgs/regimg.png";

function RightRegForm() {
  return (
    <div className="right-reg">
      <div className="reg-img-container" style={{backgroundImage: `url(${regimg})`}}>
      </div>
    </div>
  );
}

export default RightRegForm;
