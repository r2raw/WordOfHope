import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
function OfficeDayTimeSelection(props) {
  const { arrayNum, selectedDays, employeeSched } = props;
  const [disabledDays, setDisabledDays] = useState();
  const [selectedTime, setSelectedTime] = useState(
    dayjs("12:00 AM", "hh:mm A")
  );

  const handleTimeChange = (e) => {
    const time = dayjs(e).format("HH:mm:ss");
    const endTime = dayjs(e).add(9, "hour").format("HH:mm:ss");
    setSelectedTime(e);
    props.handleTimeChange(time, endTime, arrayNum);
  };

  const handleDeleteSelection = (e) => {
    e.preventDefault();
    props.handleDeleteSelection(arrayNum);
  };

  const handleCheckChange = (e) => {
    const { value } = e.target;
    props.handleCheckChange(value, arrayNum);
  };

  useEffect(() => {
    let days = [];
    const unavailableDays = employeeSched.filter((_, i) => i !== arrayNum);
    unavailableDays.forEach((sched) => {
      days.push(...sched.days);
    });
    setDisabledDays(days);
  }, [employeeSched, selectedDays]);

  return (
    <div
      className="day-time-selection"
      style={arrayNum === 0 ? { border: "none" } : {}}
    >
      <div className="time-select">
        <h4>Start time:</h4>
        <div className="time-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              // value={props.appointMentData.time ? parsedTime : selectedTime}
              label="Select time"
              value={dayjs("1970-01-01" + employeeSched[arrayNum].startTime)}
              onChange={(e) => {
                handleTimeChange(e);
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
              label="Select time"
              value={dayjs("1970-01-01" + employeeSched[arrayNum].endTime)}
              disabled
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
          checked={
            employeeSched[arrayNum].days.includes("Sunday") ? true : false
          }
          id={`day1${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Sunday") ? true : false
          }
        />
        <label htmlFor={`day1${arrayNum}`}>Sun</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Monday"
          checked={
            employeeSched[arrayNum].days.includes("Monday") ? true : false
          }
          id={`day2${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Monday") ? true : false
          }
        />
        <label htmlFor={`day2${arrayNum}`}>Mon</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Tuesday"
          checked={
            employeeSched[arrayNum].days.includes("Tuesday") ? true : false
          }
          id={`day3${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Tuesday") ? true : false
          }
        />
        <label htmlFor={`day3${arrayNum}`}>Tue</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Wednesday"
          checked={
            employeeSched[arrayNum].days.includes("Wednesday") ? true : false
          }
          id={`day4${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Wednesday") ? true : false
          }
        />
        <label htmlFor={`day4${arrayNum}`}>Wed</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Thursday"
          checked={
            employeeSched[arrayNum].days.includes("Thursday") ? true : false
          }
          id={`day5${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Thursday") ? true : false
          }
        />
        <label htmlFor={`day5${arrayNum}`}>Thu</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Friday"
          checked={
            employeeSched[arrayNum].days.includes("Friday") ? true : false
          }
          id={`day6${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Friday") ? true : false
          }
        />
        <label htmlFor={`day6${arrayNum}`}>Fri</label>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          value="Saturday"
          checked={
            employeeSched[arrayNum].days.includes("Saturday") ? true : false
          }
          id={`day7${arrayNum}`}
          disabled={
            disabledDays && disabledDays.includes("Saturday") ? true : false
          }
        />
        <label htmlFor={`day7${arrayNum}`}>Sat</label>
      </div>
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

export default OfficeDayTimeSelection;
