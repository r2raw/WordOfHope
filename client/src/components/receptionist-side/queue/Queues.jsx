import React, { useEffect, useState } from "react";
import QrCodeScannerSharpIcon from "@mui/icons-material/QrCodeScannerSharp";
import QrScanner from "./QrScanner";
import EnterAppointment from "./EnterAppointment";
import { useOutletContext } from "react-router-dom";
import InQueueTable from "./InQueueTable";
function Queues() {
  const { backendData } = useOutletContext();
  const [scanner, setScanner] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [foundAppointment, setFoundAppointment] = useState();

  console.log(backendData)
  useEffect(() => {
    if (appointmentId) {
      const findappointment = backendData.appointmentsToday.find(
        (i) => i.id === appointmentId && i.status === 'Upcoming'
      );
      setFoundAppointment(findappointment);
      return;
    }
  }, [appointmentId]);

  const handleCloseQr = () => {
    setScanner(false);
  };

  useEffect(()=>{
    if(appointmentId){
      setTimeout(()=>{
        setAppointmentId("")
      }, 3000)
    }
  },[appointmentId])
  return (
    <div className="admin-element queue">
      <div>
        <h1>Queues</h1>
        <button className="solid simple" onClick={() => setScanner(true)}>
          <QrCodeScannerSharpIcon /> Scan Qr
        </button>
      </div>
      {scanner && (
        <QrScanner
          handleCloseQr={handleCloseQr}
          setAppointmentId={setAppointmentId}
        />
      )}
      <EnterAppointment setAppointmentId={setAppointmentId} foundAppointment={foundAppointment} />
      {appointmentId && !foundAppointment && <p className="invalid">No appointment today</p>}
      <hr />
      <h2>Currently Serving</h2>
      <div className="currently-serving queue">
        {/* {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="serving-info card">
            <h3>Laboratory</h3>
            <p>Optholmology</p>
            <div>
              <h1>{index + 1}</h1>
            </div>
          </div>
        ))} */}
        {backendData.currentlyServing.map((i, index)=>{
          return(
          <div key={index} className="serving-info card">
            <h3>{i.service_name}</h3>
            <p>{i.department_name}</p>
            <div>
              <h1>{i.queue_no}</h1>
            </div>
          </div>)
        })}
      </div>
      <hr />
      <div>
        <h2>In Queue</h2>
      </div>
      <InQueueTable />
    </div>
  );
}

export default Queues;
