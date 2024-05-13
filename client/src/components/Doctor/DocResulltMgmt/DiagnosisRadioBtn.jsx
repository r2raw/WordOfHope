import React from "react";

function DiagnosisRadioBtn(props) {
  const { isCurrentlyServing, handleRadio } = props;

  return (
    <div className="radio">
      Currently Serving ?
      <input type="radio" name="existing" value="true" onChange={handleRadio} checked={isCurrentlyServing === "true"} id="yes" />
      <label className="card" htmlFor="yes">
        Yes
      </label>
      <input type="radio" name="existing" value="false" onChange={handleRadio} checked={isCurrentlyServing === "false"} id="no" />
      <label className="card" htmlFor="no">
        No
      </label>
    </div>
  );
}

export default DiagnosisRadioBtn;
