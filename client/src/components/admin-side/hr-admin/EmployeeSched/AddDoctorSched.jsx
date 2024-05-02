import React, { useEffect, useState, useCallback } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DayTimeSelection from "./DayTimeSelection";
import DoctorDayTimeSelection from "./DoctorDayTimeSelection";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
function AddDoctorSched(props) {
  const { user } = useParams();
  const { emp } = props;
  const [selectedDays, setSelectedDays] = useState([]);
  const [hasOverlappingSched, setHasOverLappingSched] = useState();
  const [disabled, setDisabled] = useState(true);
  const [employeeSched, setEmployeesched] = useState([
    {
      startTime: "00:00:00",
      endTime: "01:00:00",
      days: [],
      invalid: false,
    },
  ]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const checkOverlappingTimeChange = (startTime, endTime, days, arrayNum) => {
    const itemsToCheck = employeeSched.filter((_, index) => index !== arrayNum);
    let isOverlapping = false;
    if (itemsToCheck.length > 0) {
      for (let i = 0; i < itemsToCheck.length; i++) {
        for (let j = 0; j < days.length; j++) {
          if(itemsToCheck[i].days.includes(weekdays[(weekdays.indexOf(days[j]) - 1 + 7) % 7])){
          let checkEndtime = dayjs(
            "1970-01-01T" + itemsToCheck[i].endTime
          ).format("YYYY-MM-DD HH:mm:ss");
          if (
            checkEndtime <=
            dayjs("1970-01-01T" + itemsToCheck[i].startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ) {
            checkEndtime = dayjs(
              "1970-01-02T" + itemsToCheck[i].endTime
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          let checkStartTime = dayjs(
            "1970-01-01T" + itemsToCheck[i].startTime
          ).format("YYYY-MM-DD HH:mm:ss");

          if (startTime <= checkEndtime && startTime >= checkStartTime) {
            isOverlapping = true;
          }

          if (endTime >= checkStartTime && endTime <= checkEndtime) {
            isOverlapping = true;
          }
        }else if(itemsToCheck[i].days.includes(weekdays[(weekdays.indexOf(days[j])  + 1 ) % 7])){
          let checkEndtime = dayjs(
            "1970-01-03T" + itemsToCheck[i].endTime
          ).format("YYYY-MM-DD HH:mm:ss");
          if (
            checkEndtime <=
            dayjs("1970-01-03T" + itemsToCheck[i].startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ) {
            checkEndtime = dayjs(
              "1970-01-04T" + itemsToCheck[i].endTime
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          let checkStartTime = dayjs(
            "1970-01-03T" + itemsToCheck[i].startTime
          ).format("YYYY-MM-DD HH:mm:ss");

          if (startTime <= checkEndtime && startTime >= checkStartTime) {
            isOverlapping = true;
          }

          if (endTime >= checkStartTime && endTime <= checkEndtime) {
            isOverlapping = true;
          }
        }else if (itemsToCheck[i].days.includes(days[j])) {
            let checkEndtime = dayjs(
              "1970-01-02T" + itemsToCheck[i].endTime
            ).format("YYYY-MM-DD HH:mm:ss");
            if (
              checkEndtime <=
              dayjs("1970-01-02T" + itemsToCheck[i].startTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            ) {
              checkEndtime = dayjs(
                "1970-01-03T" + itemsToCheck[i].endTime
              ).format("YYYY-MM-DD HH:mm:ss");
            }
            let checkStartTime = dayjs(
              "1970-01-02T" + itemsToCheck[i].startTime
            ).format("YYYY-MM-DD HH:mm:ss");

            if (startTime <= checkEndtime && startTime >= checkStartTime) {
              isOverlapping = true;
            }

            if (endTime >= checkStartTime && endTime <= checkEndtime) {
              isOverlapping = true;
            }
          } 
        }
      }
    }

    return isOverlapping;
  };
  const handleEmployeeSchedChange = useCallback(
    (empSchedArray) => {
      if (empSchedArray.length > 1) {
        let overlappingSched = false;
        if (employeeSched.length > 1) {
        }
        const updatedEmpSchedArray = empSchedArray.map((empSched, index) => {
          const { startTime, endTime, days } = empSched;

          let end = dayjs(`1970-01-02T` + endTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          if (
            end <= dayjs("1970-01-02T" + startTime).format("YYYY-MM-DD HH:mm:ss")
          ) {
            end = dayjs("1970-01-03T" + endTime).format("YYYY-MM-DD HH:mm:ss");
          }
          let start = dayjs("1970-01-02T" + startTime).format("HH:mm:ss");
          const isOverlapping = checkOverlappingTimeChange(
            start,
            end,
            days,
            index
          );

          if (isOverlapping) {
            overlappingSched = true;
            return { ...empSched, invalid: true };
          } else {
            return { ...empSched, invalid: false };
          }
        });

        if (!arraysEqual(employeeSched, updatedEmpSchedArray)) {
          setEmployeesched(updatedEmpSchedArray);
          setHasOverLappingSched(overlappingSched);

          let valid = false;
          updatedEmpSchedArray.forEach((empSched) => {
            if (
              empSched.startTime !== "" &&
              empSched.endTime !== "" &&
              empSched.days.length > 0 &&
              !empSched.invalid
            ) {
              valid = true;
            }
          });
          setDisabled(!valid);
        }
      } else {
        let valid = false;

        empSchedArray.forEach((empSched) => {
          if (
            empSched.startTime !== "" &&
            empSched.endTime !== "" &&
            empSched.days.length > 0 &&
            !empSched.invalid
          ) {
            valid = true;
          }
        });
        setDisabled(!valid);
      }
    },
    [checkOverlappingTimeChange, employeeSched]
  );

  // Function to compare two arrays
  function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  useEffect(() => {
    handleEmployeeSchedChange([...employeeSched]);
  }, [employeeSched, handleEmployeeSchedChange]);

  const handleDeleteSelection = (index) => {
    const deletedDays = employeeSched[index].days;
    setEmployeesched((prev) => prev.filter((_, i) => i !== index));
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.filter((day) => !deletedDays.includes(day))
    );
  };

  const handleAddSelection = () => {
    if (employeeSched.length < 7) {
      setEmployeesched((prev) => [
        ...prev,
        {
          startTime: "",
          endTime: "",
          days: [],
          invalid: false,
        },
      ]);
    }
  };

  const handleCheckChange = (selectedDay, empSchedIndex) => {
    setEmployeesched((prevEmployeesched) => {
      const updatedEmployeesched = [...prevEmployeesched];
      const schedule = { ...updatedEmployeesched[empSchedIndex] };
      const daySelected = schedule.days.includes(selectedDay);

      if (daySelected) {
        schedule.days = schedule.days.filter((day) => day !== selectedDay);
      } else {
        schedule.days.push(selectedDay);
      }

      updatedEmployeesched[empSchedIndex] = schedule;
      return updatedEmployeesched;
    });
  };

  const handleTimeChange = (name, time, arrayNum) => {
    const updatedSched = [...employeeSched];
    updatedSched[arrayNum][name] = time;

    setEmployeesched(updatedSched);
  };

  useEffect(() => {
    if (selectedDays.length === 7) {
      setEmployeesched((prev) => prev.filter((i) => i.days.length !== 0));
    }
  }, [selectedDays]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleLoading(true);
    const values = employeeSched.filter(
      (sched) =>
        sched.startTime !== "" && sched.endTime !== "" && sched.days.length > 0
    );
    axios
      .post("/add-employee-sched/:uid", {
        id: emp,
        schedule: values,
        createdBy: user,
      })
      .then((res) => {
        props.handleLoading(false);
        if (res.data.status === "success") {
          props.handleSuccess(true);
        }
      })
      .catch((err) =>
        console.error("Add employee sched error: " + err.message)
      );
  };
  return (
    <form className="scheduler-form" onSubmit={handleSubmit}>
      <div
        onClick={handleAddSelection}
        style={
          selectedDays.length === 7 || employeeSched.length === 7
            ? { display: "none" }
            : {}
        }
        className="add-button card"
      >
        <AddCircleSharpIcon />
      </div>
      {employeeSched.map((i, index) => {
        return (
          <DoctorDayTimeSelection
            key={index}
            arrayNum={index}
            employeeSched={i}
            handleCheckChange={handleCheckChange}
            handleTimeChange={handleTimeChange}
            handleDeleteSelection={handleDeleteSelection}
          />
        );
      })}

      <button
        className="solid button fade submit-schedule"
        disabled={disabled || hasOverlappingSched}
      >
        Submit
      </button>
    </form>
  );
}

export default AddDoctorSched;
