import dayjs from "dayjs";
export const attendanceTodayColumn = [
  {
    Header: `ID`,
    accessor: `empid`,
  },
  {
    Header: `Fullname`,
    accessor: (row) =>
      `${row.lastname}, ${row.firstname}${
        row.middlename && `, ${row.middlename}`
      }${row.suffix && `, ${row.suffix}`}`,
  },
  {
    Header: "Time-in",
    accessor: "arrival",
    Cell: ({value}) => dayjs(value).format("hh:mm A")
  },
  {
    Header: "Time-out",
    accessor: "departure",
    Cell: ({value}) => value && dayjs(value).format("hh:mm A")
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
