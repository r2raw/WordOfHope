import dayjs from 'dayjs'

export const myAppointmentColumms = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Service Type`,
      accessor: `reason`,
    },
    {
      Header: `Service`,
      accessor: `service_name`,
    },
    {
      Header: `Date Booked`,
      accessor: row => `${dayjs(row.datebooked).format("MMMM DD, YYYY")}`,
    },
    {
      Header: `Scheduled Date`,
      accessor: row => `${dayjs(row.appointmentdate).format("MMMM DD, YYYY")}`,
    },
    {
      Header: `Scheduled Time`,
      accessor: row => `${dayjs(row.appointmenttime, "HH:mm:ss").format("hh:mm A")}`,
    },
  ];