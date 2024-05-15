import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";

function DoctorDayTimeSelection(props) {
  const { arrayNum, employeeSched } = props;

  const [empSched, setEmpSched] = useState();
  const [selectedTime, setSelectedTime] = useState({
    startTime: employeeSched.startTime,
    endTime: employeeSched.endTime,
  });

  const handleTimeChange = (e, name) => {
    const time = dayjs(e).format("HH:mm:ss");
    // const endTime = dayjs(e).add(9, "hour").format("HH:mm:ss");

    // setSelectedTime((prev) => ({
    //   ...prev,
    //   [name]: e,
    // }));
    props.handleTimeChange(name, time, arrayNum);
  };

  const handleDeleteSelection = (e) => {
    e.preventDefault();
    props.handleDeleteSelection(arrayNum);
  };

  const handleCheckChange = (e) => {
    const { value } = e.target;
    props.handleCheckChange(value, arrayNum);
  };

  // useEffect(() => {
  //   setEmpSched(employeeSched);
  // }, [employeeSched.length]);

  return (
    <div
      className="day-time-selection card"
      style={arrayNum === 0 ? { border: "none" } : {}}
    >
      <div className="time-select">
        <h4>Start time:</h4>
        <div className="time-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={employeeSched.startTime && dayjs(employeeSched.startTime, "HH:mm:ss")}
              label="Select time"
              onChange={(e) => {
                handleTimeChange(e, "startTime");
              }}
              minutesStep={30}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="time-select">
        <h4>End time:</h4>
        <div className="time-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
            
            value={employeeSched.endTime && dayjs(employeeSched.endTime, "HH:mm:ss")}
              onChange={(e) => {
                handleTimeChange(e, "endTime");
              }}
              disabled={employeeSched.startTime ? false : true}
              label="Select time"
              minutesStep={30}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="day-checkbox">
        <h4>Repeat on:</h4>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Sunday"
          checked={employeeSched.days.includes("Sunday") ? true : false}
          id={`day1${arrayNum}`}
        />
        <label htmlFor={`day1${arrayNum}`}>Sun</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Monday"
          checked={employeeSched.days.includes("Monday") ? true : false}
          id={`day2${arrayNum}`}
        />
        <label htmlFor={`day2${arrayNum}`}>Mon</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Tuesday"
          checked={employeeSched.days.includes("Tuesday") ? true : false}
          id={`day3${arrayNum}`}
        />
        <label htmlFor={`day3${arrayNum}`}>Tue</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Wednesday"
          checked={employeeSched.days.includes("Wednesday") ? true : false}
          id={`day4${arrayNum}`}
        />
        <label htmlFor={`day4${arrayNum}`}>Wed</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Thursday"
          checked={employeeSched.days.includes("Thursday") ? true : false}
          id={`day5${arrayNum}`}
        />
        <label htmlFor={`day5${arrayNum}`}>Thu</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Friday"
          checked={employeeSched.days.includes("Friday") ? true : false}
          id={`day6${arrayNum}`}
        />
        <label htmlFor={`day6${arrayNum}`}>Fri</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Saturday"
          checked={employeeSched.days.includes("Saturday") ? true : false}
          id={`day7${arrayNum}`}
        />
        <label htmlFor={`day7${arrayNum}`}>Sat</label>
      </div>
      {employeeSched.invalid && <p>Overlapping Time</p>}
      {arrayNum !== 0 && (
        <button
          onClick={handleDeleteSelection}
          className="solid danger fade"
          id="delete-selection"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default DoctorDayTimeSelection;
