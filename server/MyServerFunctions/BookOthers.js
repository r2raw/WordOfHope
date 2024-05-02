
export default async (db, data, id, qr) => {
    try {
      console.log(data);
      const {
        appointment,
        reason,
        service,
        date,
        time,
        userId,
        appointedFor,
        method,
        dateBooked,
        firstname,
        lastname,
        middlename,
        suffix,
        sex,
        birthdate,
        province,
        city,
        barangay,
        street,
        zip,
        relationship,
      } = data;
      const appointMentSchedRes = await db.query(
        "INSERT INTO appointmentSched(id, appointmenttime, appointmentdate, type, reason, service, method,qrcode,appointedfor, status, dateBooked) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        [id, time, date, appointment, reason, service, method, qr, appointedFor,"Upcoming", dateBooked]
      );
  
      const thirdPartyAppointmentRes = await db.query("INSERT INTO thirdPartyAppointment(id, appointedBy, firstname, lastname, middlename, suffix, sex, birthdate, province, city, barangay, street, zip, relationship) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [
          id,
          userId,
          firstname,
          lastname,
          middlename,
          suffix,
          sex,
          birthdate,
          province,
          city,
          barangay,
          street,
          zip,
          relationship,
      ])
  
      if(!appointMentSchedRes || !thirdPartyAppointmentRes) return "failed";
  
      return "success";
  
  
    } catch (error) {
      console.error("Insert appointment error: " + error);
    }
  };
  