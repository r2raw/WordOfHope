import React from "react";
import CurrentlyServing from "./CurrentlyServing";

function DocQueue() {
  return (
    <div className="admin-element">
      <h1>Queue</h1>
      <CurrentlyServing />
    </div>
  );
}

export default DocQueue;