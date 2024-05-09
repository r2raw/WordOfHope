import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import dayjs from "dayjs";
function QrScanner(props) {
  const [scanResult, setScanResult] = useState(null);
  const qrRef = useRef(null);

  const [qrData, setQrData] = useState();

  const handleConfirm = () => {
    if (qrData) {
      props.setAppointmentId(qrData.id);
    }
  };

  useEffect(() => {
    if (scanResult === null) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      });

      let isScanning = true;

      scanner.render(success, error);

      function handleClickOutside(event) {
        if (qrRef.current && !qrRef.current.contains(event.target)) {
          scanner.clear();
          props.handleCloseQr();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

      function success(result) {
        if (isScanning) {
          scanner.clear();
          let scannedQr = result.split("/");
          scannedQr = scannedQr[scannedQr.length - 1];

          axios
            .post("/scan-qr", { qrCode: scannedQr })
            .then((res) => {
              //   console.log(res);
              if (res.data.status === "success") {
                setQrData(res.data.qrData);
              }
            })
            .catch((err) => console.error(err));

          setScanResult(result.split("/"));
          isScanning = false;
        }
      }

      function error(err) {
        console.warn(err);
      }
    }
  }, [scanResult, props]);

  return (
    <div className="qr-scanner" ref={qrRef}>
      <h1 style={{ teextAlign: "center" }}>QR Scanner</h1>
      {scanResult && qrData ? (
        <div>
          <p>Appointment ID:</p>
          <h4>{qrData.id}</h4>
          <p>Name:</p>
          <h4>{`${qrData.firstname}${
            qrData.middlename && ` ${qrData.middlename}`
          } ${qrData.lastname}${qrData.suffix && ` ${qrData.suffix}`}`}</h4>
          <p>Appointment Date:</p>
          <h4>
            {dayjs(qrData.appointmentdate).format("MMMM DD, YYYY")} -{" "}
            {dayjs(qrData.appointmenttime, "HH:mm:ss").format("hh:mm A")}
          </h4>
          <p>Status:</p>
          <h4>{qrData.status}</h4>
          <div>
            <button className="solid simple" onClick={handleConfirm}>
              Confirm
            </button>
            <button
              onClick={() => setScanResult(null)}
              className="outlined lg-blue-3 simple"
            >
              Scan another
            </button>{" "}
          </div>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
        </div>
      )}
    </div>
  );
}

export default QrScanner;
