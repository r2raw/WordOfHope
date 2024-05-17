export default async (db, id) => {
    try {
      const appointMentRes = await db.query(
        "SELECT DISTINCT ap.id, ap.appointmenttime, ap.appointmentdate, ap.type, ap.reason, ap.service, s.service_name, ap.method, ap.qrcode, ap.appointedFor, ap.datebooked, ap.status, u.userId, pi.firstname, pi.lastname, pi.middlename, pi.suffix, pi.birthdate, pi.street, pi.barangay, pi.zip, pi.province, pi.city FROM appointmentSched AS ap INNER JOIN userAppointment AS u ON ap.id = u.id INNER JOIN services s ON ap.service = s.id INNER JOIN userProfile AS pi ON u.userId = pi.userId WHERE ap.appointmentdate < CURRENT_DATE AND ap.status = 'Upcoming' AND u.userid = $1 ORDER BY ap.id desc",
        [id]
      );
  
      // console.log(appointMentRes);
  
      const patientAppointMents = [];
      // const employees = [];
  
      appointMentRes.rows.forEach((info) => {
          patientAppointMents.push(info);
      });
  
      return patientAppointMents;
    } catch (error) {
      console.error("GetAppointment error: " + error);
    }
  };
  