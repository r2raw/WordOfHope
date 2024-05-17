import dayjs from 'dayjs'

export const medicalColumns = [
    {
      Header: `Date  of Visit`,
      accessor: row => `${dayjs(row.date_visit).format("MMMM DD, YYYY")}`,
    },
    {
      Header: `Service Type`,
      accessor: `service_type`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Doctor`,
      accessor: row => `${row.lastname}, ${row.firstname}${row.middlename && `, ${row.middlename}`}${row.suffix && `, ${row.suffix}`}`,
      Cell: ({value})=> `Dr. ${value}`
    },
  ];