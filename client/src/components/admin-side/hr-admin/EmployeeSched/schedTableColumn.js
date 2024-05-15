import dayjs from 'dayjs'

export const schedTableColumn = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Name`,
      accessor: row => `${row.lastname}, ${row.firstname}${row.middlename && `, ${row.middlename}`}${row.suffix && `, ${row.suffix}`}`,
    },
    {
      Header: `Department`,
      accessor: `department_name`,
    },
    {
      Header: `Position`,
      accessor: `position_name`,
    },
  ];