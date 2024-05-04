export const serviceColumns = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Department`,
      accessor: `department_name`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Type`,
      accessor: `service_type`,
    },
    {
      Header: `Availability`,
      accessor: `availability`,
      Cell: ({ value }) => (
          <p
            style={value === 'Available'? availableStyle : unavailableStyle }
          >
            {value}
          </p>
        ),
    },
  ];
  
  const availableStyle = {
      backgroundColor: '#4fbc46',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      padding: '5px',
      lineHeight: '1',
      width: 'fit-content'
  }
  
  const unavailableStyle = {
      backgroundColor: '#ff0000',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      padding: '5px',
      lineHeight: '1',
      width: 'fit-content'
  }
  