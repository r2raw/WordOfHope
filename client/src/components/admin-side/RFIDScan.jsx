import React, { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import dayjs from "dayjs";
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 480,
  height: 480,
  facingMode: "user",
};

function RFIDScan() {
  const [captured, setCaptured] = useState("");
  const [value, setValues] = useState();
  const webcamRef = useRef(null);
  const inputRef = useRef(null);
  const [rfidInput, setRfidInput] = useState(true);
  const [invalid, setInvalid] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [result, setResult] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

  setInterval(() => {
    setCurrentDate(dayjs(Date.now()).format("MMMM DD, YYYY - hh:mm:ss A"));
  }, 1000);

  const capture = useCallback((id, timeIn, attendanceStatus, startTime, endTime) => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 480,
      height: 480,
    });
    axios
      .post("/upload-attendance", { attendanceImg: imageSrc, id: id, isTimingIn: timeIn, attendanceStatus: attendanceStatus, startTime: startTime, endTime:endTime})
      .then((res) => {})
      .catch((err) => console.error(err));
      setCaptured(imageSrc);
  }, [result]);

  useEffect(() => {
    if (rfidInput !== null) {
      inputRef.current.focus();
    }
  }, [rfidInput]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValues(value);
    // console.log(value);
  };

  const handleKeyDown = (e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&  
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode !== 13 && e.keyCode !== 8         
    ) {
      e.preventDefault();
    }
    

    if (e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 192) {
      e.preventDefault();
      setRfidInput(!rfidInput);
    }
    console.log(e.keyCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      inputRef.current.blur();
      if (rfidInput) {
        axios
          .post("/rfid-scanner", { rfid: value })
          .then((res) => {
            if (res.data.status === "success") {
              setResult(res.data.employee[0]);
              capture(res.data.employee[0].id, res.data.timeIn, res.data.attendanceStatus, res.data.startTime, res.data.endTime);
            } else {
              setInvalid(true);
              setResult(res.data.errMessage);
            }
          })
          .catch((err) => console.error(err));
      }else{
        axios.post("/empid-input", {empId: value}).then(res =>{
          if (res.data.status === "success") {
            setResult(res.data.employee[0]);
            capture(res.data.employee[0].id, res.data.timeIn, res.data.attendanceStatus, res.data.startTime, res.data.endTime);
          } else {
            setInvalid(true);
            setResult(res.data.errMessage);
          }
        })
      }
    }
  };

  useEffect(()=>{
    if(result){
      setEmployeeId(result.id)
    }
  },[result])
  useEffect(() => {
    setTimeout(() => {
      setCaptured("");
      setValues("");
      setResult(null);
      inputRef.current.focus();
    }, 10000);
  }, [captured]);

  useEffect(()=>{
    setTimeout(()=>{
      setValues("");
      setInvalid(false);
      setResult(null);
      inputRef.current.focus();
    }, 3000);
  },[invalid])
  return (
    <div
      className="rfid fullscreen"
      id="rfidScanner"
      onClick={() => inputRef.current.focus()}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div className="rotating-border">
            {captured && result ? (
              <img src={captured} alt="captured" />
            ) : (
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                ref={webcamRef}
              />
            )}
          </div>
          <h3>ID: {captured && result?.id}</h3>
          <h3>
            Name:{" "}
            {`${captured && result?.firstname}${
              captured &&
              result?.middlename &&
              ` ${captured && result?.middlename}`
            } ${captured && result?.lastname}${
              captured && result?.suffix && ` ${result?.suffix}`
            }`}
          </h3>
          <h3>Date: {dayjs(Date.now()).format("MMMM DD, YYYY - hh:mm A")}</h3>
        </div>

        {rfidInput ? (
          <div className="employee-input">
            <h1>SCAN RFID</h1>
            <SensorsSharpIcon />
            {invalid ? result && (
              <div className="invalid-message">
                <p>Invalid</p>
                <p>{result}</p>
              </div>
            ) : result && 
              <div className="success-message">
                <p>Success</p>
              </div>}
            <input
              style={{
                position: "absolute",
                left: "-100%",
                width: "1px",
                height: "1px",
              }}
              type="password"
              autoFocus
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="rfid"
              ref={inputRef}
            />
          </div>
        ) : (
          <div>
            <h1>Enter Employee ID</h1>
            <input
              // style={{ position: "absolute", left: "-100%", width: "1px", height: "1px" }}
              type="text"
              autoFocus
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="rfid"
              ref={inputRef}
            />
            {invalid ? result && (
              <div className="invalid-message">
                <p>Invalid</p>
                <p>{result}</p>
              </div>
            ) : result && 
              <div className="success-message">
                <p>Success</p>
              </div>}
          </div>
        )}
      </form>
    </div>
  );
}

export default RFIDScan;
