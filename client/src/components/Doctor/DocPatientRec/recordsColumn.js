import dayjs from 'dayjs'
export const recordColumns = [
    {
      Header: `ID`,
      accessor: `patient_id`,
    },
    {
      Header: `Fullname`,
      accessor: row => `${row.lastname}, ${row.firstname}${row.middlename && `, ${row.middlename}`}${row.suffix && `, ${row.suffix}`}`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Date Added`,
      accessor: `date_added`,
      Cell: ({value}) =>  dayjs(value).format("MMMM DD, YYYY - hh:mm A")
    },
  ];