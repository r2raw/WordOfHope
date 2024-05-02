import React from "react";
import myGif from "./my-images/epic-loading.gif"
function Loader(){
    return(
        <div id="loader">
          <img src={myGif} alt="gif" />
        </div>
    )
}
export default Loader;