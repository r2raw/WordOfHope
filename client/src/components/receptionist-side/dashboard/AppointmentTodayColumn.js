import dayjs from 'dayjs'

export const todayAppointmentColumn = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Time`,
      accessor: `appointmenttime`,
      Cell: ({ value }) => (
        dayjs(value, "HH:mm:ss").format("hh:mm A")
      ),
    },
    {
      Header: `Date`,
      accessor: `appointmentdate`,
      Cell: ({ value }) => (
        dayjs(value).format("MM/DD/YYYY")
      ),
    },
    {
        Header: `Status`,
        accessor: `status`,
        Cell: ({value}) =>(
            <p style={value === "Upcoming" ? upcomingStyle : value === "Ongoing" ? onGoingStyle : value==="In Queue" ? inQueueStyle : completedStyle}>{value}</p>
        )
      }
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