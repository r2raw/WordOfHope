import React, { useEffect, useState } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DayTimeSelection from "./DayTimeSelection";
import axios from "axios";
import { useParams } from "react-router-dom";
function AddNurseSched(props) {
  const { user } = useParams();
  const { emp } = props;
  const [selectedDays, setSelectedDays] = useState([]);
  const [employeeSched, setEmployeesched] = useState([
    {
      startTime: "00:00:00",
      endTime: "12:00:00",
      days: [],
    },
  ]);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const isAnyArrayCompleted = employeeSched.some((schedule) => {
      return (
        schedule.startTime !== "" &&
        schedule.endTime !== "" &&
        schedule.days.length > 0
      );
    });

    setDisabled(!isAnyArrayCompleted);
  }, [employeeSched]);

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
          startTime: "00:00:00",
          endTime: "12:00:00",
          days: [],
        },
      ]);
    }
  };

  const handleCheckChange = (selectedDay, empSchedIndex) => {
    if (selectedDays.includes(selectedDay)) {
      setSelectedDays((prev) => prev.filter((day) => day !== selectedDay));
    } else {
      setSelectedDays((prev) => [...prev, selectedDay]);
    }

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

  const handleTimeChange = (startTime, endTime, arrayNum) => {
    const updatedSched = [...employeeSched];
    updatedSched[arrayNum].startTime = startTime;
    updatedSched[arrayNum].endTime = endTime;
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
      <div className="selection">
        {employeeSched.map((i, index) => {
          return (
            <DayTimeSelection
              key={index}
              arrayNum={index}
              selectedDays={selectedDays}
              employeeSched={employeeSched}
              handleCheckChange={handleCheckChange}
              handleTimeChange={handleTimeChange}
              handleDeleteSelection={handleDeleteSelection}
            />
          );
        })}
      </div>

      <button className="solid button fade submit-schedule" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}

export default AddNurseSched;
