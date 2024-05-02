import React, { useState } from "react";
// import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";

function BookPageTwo(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [highlightedDays, setHighLightedDays] = useState([1, 2, 3]);
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
    // console.log(date.name)
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

      console.log("inrange");
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
  // console.log(parsedTime);

  const isDateSelectable = (date) => {
    const dayOfWeek = date.day();
    return dayOfWeek === 3 || dayOfWeek === 5 || dayOfWeek === 6; // Wednesday, Friday, Saturday
  };

  const availableTime = [
    {
      from: "8:00",
      to: "13:00",
    },
    {
      from: "12:00",
      to: "19:30 ",
    },
  ];

  const availableTimeRanges = availableTime.map((range) => ({
    from: dayjs(range.from, "HH:mm"),
    to: dayjs(range.to, "HH:mm"),
  }));
  return (
    <div className="page">
      <h3>Select Date</h3>
      <div className="calendar-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            value={props.appointMentData.date ? parsedDate : selectedDate}
            name="date"
            onChange={handleDateChange}
            minDate={dayjs(today)}
            shouldDisableDate={(date) => !isDateSelectable(date)}
            okButton={false}
            cancelButton={false}
          />
        </LocalizationProvider>
      </div>

      <h3>Select Time</h3>
      <div className="time-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={props.appointMentData.time ? parsedTime : selectedTime}
            label="Select appointment time"
            onChange={handleTimeChange}
            minutesStep={60}
            shouldDisableTime={(timeValue, clockType) => {
              const currentTime = dayjs(timeValue);
              const isDisabled = availableTimeRanges.every((range) => {
                return !currentTime.isBetween(range.from, range.to, null, "[)");
              });
              return isDisabled;
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
export default BookPageTwo;
