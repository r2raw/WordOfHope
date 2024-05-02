import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
function DateToday() {

    const [currDate, setCurrDate] = useState();

    useEffect(()=>{
        setInterval(()=>{
            setCurrDate(dayjs(Date.now()).format("MMMM DD, YYYY - hh:mm A"))
        }, 1000)
    },[])
  return (
    <p>Today: {currDate}</p>
  )
}

export default DateToday