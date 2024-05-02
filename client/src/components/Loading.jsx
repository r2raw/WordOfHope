import React from "react";
import myGif from "./my-images/myLoader.gif"
function Loading() {
  return (
    <div className="admin-element">
      <div className="loading card">
        <img style={{width: "400px", height: "400px"}} src={myGif} alt="loader" />
      </div>
    </div>
  );
}

export default Loading;
