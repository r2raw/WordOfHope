import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function CurrentlyServing() {
  const { backendData, updateCurrentlyServing, returnToQueue } = useOutletContext();
  
  const [currentlyServing, setCurrentlyServing] = useState({})
  useEffect(()=>{
    if(backendData.currentlyServing.length > 0){
      setCurrentlyServing(backendData.currentlyServing[0])
    }
  },[backendData.currentlyServing[0]])
  return (
    <div>
      <h2>Currently Serving</h2>
      <div className="service-info">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Queue No.</th>
                <th>Service</th>
                <th>Appointment ID.</th>
              </tr>
            </thead>
            <tbody>
              {backendData.currentlyServing.length > 0 && (
                <tr>
                  <td>{currentlyServing.queue_no}</td>
                  <td>{currentlyServing.service_name}</td>
                  <td>{currentlyServing.appointment_id}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="btn">
          <button
            className="solid danger fade"
            disabled={backendData.currentlyServing.length === 0}
            onClick={()=>{returnToQueue()}}
          >
            RETURN TO QUEUE
          </button>
          <button className="solid smlBlue fade" onClick={()=>{updateCurrentlyServing()}}>NEXT APPOINTMENT</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentlyServing;
