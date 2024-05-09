import React, { useState } from "react";
// import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { useOutletContext } from "react-router-dom";

function BookPageTwo(props) {
  const { backendData } = useOutletContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [highlightedDays, setHighLightedDays] = useState([1, 2, 3]);
  console.log(props);
  const dept = backendData.services.find(
    (i) => i.id === parseInt(props.service)
  );
  console.log(dept);
  function handleDateChange(date) {
    const e = {
      target: {
        name: "date",
        value: formatDate(date),
      },
    };
    setSelectedDate(date);
    props.handleInputChange(e, "pageTwo");
  }
  const formatDate = (date) => {
    return dayjs(date).format("MMMM DD, YYYY - dddd");
  };

  function handleTimeChange(time) {
    const myTime = dayjs(time, "HH:mm:ss"); // Specify the format string to match the format in availableTime
    const isTimeInRange = availableTimeRanges.some((range) => {
      return myTime.isBetween(range.from, range.to, null, "[)");
    });

    if (isTimeInRange) {
      const e = {
        target: {
          name: "time",
          value: formatTime(time),
        },
      };
      setSelectedTime(time);
      props.handleInputChange(e, "pageTwo");
    } else {
      const e = {
        target: {
          name: "time",
          value: "",
        },
      };
      props.handleInputChange(e, "pageTwo");
      setSelectedTime(null);

      console.log("not inrange");
    }
  }

  const formatTime = (time) => {
    return dayjs(time).format("hh:mm A");
  };

  const today = new Date();
  const parsedDate = dayjs(props.appointMentData.date, "MMMM DD, YYYY - dddd");
  const parsedTime = dayjs(props.appointMentData.time, "hh:mm A");

  const daysAvailable = backendData.availableDays
    .filter((i) => i.department === dept.department_id)
    .map((i) => i.day);

  const isDateSelectable = (date) => {
    const dayOfWeek = date.day();
    const dayName = date.format("dddd");

    return daysAvailable.includes(dayName);
  };

  // const availableTime = [
  //   {
  //     from: "8:00",
  //     to: "13:00",
  //   },
  //   {
  //     from: "12:00",
  //     to: "19:30 ",
  //   },
  // ];

  const availableTime = backendData.availableTime
    .filter(
      (i) =>
        i.department === dept.department_id &&
        i.day ===
          dayjs(props.appointMentData.date, "MMMM DD, YYYY - dddd").format(
            "dddd"
          )
    )
    .map((i) => {
      return { from: i.starttime, to: i.endtime };
    });

    console.log(availableTime)

  const availableTimeRanges = availableTime.map((range) => ({
    from: dayjs(range.from, "HH:mm:ss"),
    to: dayjs(range.to, "HH:mm:ss"),
  }));
  return (
    <div className="page two">
      <div className="card">
        <h3>Select Date</h3>
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={props.appointMentData.date ? parsedDate : selectedDate}
              name="date"
              onChange={handleDateChange}
              minDate={dayjs(today).add(1, "day")}
              shouldDisableDate={(date) => !isDateSelectable(date)}
              okButton={false}
              cancelButton={false}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="card">
        <h3>Select Time</h3>
        <div className="time-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={props.appointMentData.time ? parsedTime : selectedTime}
              label="Select appointment time"
              onChange={handleTimeChange}
              minutesStep={30}
              disabled={!props.appointMentData.date}
              shouldDisableTime={(timeValue, clockType) => {
                const currentTime = dayjs(timeValue);
                const isDisabled = availableTimeRanges.every((range) => {
                  return !currentTime.isBetween(
                    range.from,
                    range.to,
                    null,
                    "[)"
                  );
                });
                return isDisabled;
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
export default BookPageTwo;
