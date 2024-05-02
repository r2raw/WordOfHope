export default async (db, data, id, qr) => {
  try {
    console.log(data);
    const {
      appointment,
      patient,
      reason,
      service,
      date,
      time,
      userId,
      appointedFor,
      method,
      dateBooked,
    } = data;
    const appointMentSchedRes = await db.query(
      "INSERT INTO appointmentSched(id, appointmenttime, appointmentdate, type, reason, service, method,qrcode,appointedfor, status, dateBooked) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [id, time, date, appointment, reason, service, method, qr, appointedFor, "Upcoming", dateBooked]
    );

    const userapppointmentRes = await db.query("INSERT INTO userAppointment(id, userId) VALUES ($1, $2)", [
        id,
        userId,
    ])

    if(!appointMentSchedRes || !userapppointmentRes) return "failed";

    return "success";


  } catch (error) {
    console.error("Insert appointment error: " + error);
  }
};
