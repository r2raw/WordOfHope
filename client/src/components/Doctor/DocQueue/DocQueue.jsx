import React from "react";
import CurrentlyServing from "./CurrentlyServing";
import AppointmentInfo from "./AppointmentInfo";
import DocInQueueTable from "./DocInQueueTable";

function DocQueue() {
  return (
    <div className="admin-element">
      <h1>Queue</h1>
      <CurrentlyServing />
      <AppointmentInfo />
      <h2>In Queue</h2>
      <DocInQueueTable />
    </div>
  );
}

export default DocQueue;