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
    accessor: (row) =>`${dayjs(row.arrival).format("hh:mm A")} `,
  },
  {
    Header: "Time-out",
    accessor: (row) =>`${row.departure ? dayjs(row.departure).format("hh:mm A"): ""} `,
    // Cell: ({value}) => value && dayjs(value).format("hh:mm A")
  },
  {
    Header: "Department",
    accessor: "department_name",
  },
  {
    Header: "Position",
    accessor: "position_name",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
