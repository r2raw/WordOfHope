async function GetAppointmentNum(db) {
    try {
        
    const appointmentRes = await db.query(
        "SELECT * from appointmentsched",
      );
  
      if (!appointmentRes) return null;
      
      return appointmentRes.rowCount;
    } catch (error) {
        console.error("Appointment Sched Number Error: " + error)
    }
  }
  
  export default GetAppointmentNum;
  