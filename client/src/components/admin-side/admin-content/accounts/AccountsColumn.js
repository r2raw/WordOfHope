

export const accountsColumn = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Fullname`,
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
  