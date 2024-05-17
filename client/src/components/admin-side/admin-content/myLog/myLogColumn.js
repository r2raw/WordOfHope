import dayjs from 'dayjs'

export const myLogColumn = [
    {
      Header: `ID`,
      accessor: "id",
    },
    {
      Header: `Time-In`,
      accessor: `arrival`,
      Cell: ({value}) => (
        dayjs(value).format("MMMM DD, YYYY - hh:mm A")
      )
    },
    {
      Header: `Time-Out`,
      accessor: `departure`,
      Cell: ({value}) => (
        value && dayjs(value).format("MMMM DD, YYYY - hh:mm A")
      )
    },
    {
      Header: `Status`,
      accessor: `status`,
    //   Cell: ({ value }) => (
    //       <p
    //         style={value === 'Available'? availableStyle : unavailableStyle }
    //       >
    //         {value}
    //       </p>
    //     ),
    },
  ];