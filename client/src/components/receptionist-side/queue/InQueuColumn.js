import dayjs from 'dayjs'

export const inQueueColumn = [
    {
      Header: `Queue No.`,
      accessor: `queue_no`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Department`,
      accessor: `department_name`,
    },
    {
      Header: `Appointment ID`,
      accessor: `appointment_id`,
    },
    {
      Header: `Appointment Date`,
      accessor: `appointmentdate`,
      Cell: ({value})=> (dayjs(value).format("MMMM DD, YYYY"))
    },
  ];
  
  
  const upcomingStyle = {
    backgroundColor: "#e6db8e",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  const onGoingStyle = {
    backgroundColor: "#ffa319",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  
  const inQueueStyle = {
    backgroundColor: "#FFC775",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };

  const completedStyle = {
    backgroundColor: "#4fbc46",
    color: "white",
    padding: "3px 5px",
    borderRadius: "15px",
    width: "fit-content",
  };