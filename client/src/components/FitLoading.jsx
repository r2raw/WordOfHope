import React from 'react'
import myGif from "./my-images/myLoader.gif"

function FitLoading() {
  return (
    <div className="loading card" style={{padding: '0', height:'400px'}}>
      <img style={{width: "400px", height: "400px"}} src={myGif} alt="loader" />
    </div>
  )
}

export default FitLoading