export default async (db, id) => {
    try {
      const appointMentRes = await db.query(
        "SELECT ap.id, ap.appointmenttime, ap.appointmentdate, ap.type, ap.reason, ap.service, ap.method, ap.qrcode, ap.datebooked, ap.status, tpa.relationship, tpa.appointedBy, tpa.firstname, tpa.lastname, tpa.middlename, tpa.suffix, tpa.sex, tpa.birthdate, tpa.province, tpa.city, tpa.barangay, tpa.street, tpa.zip, pi.firstname as userFirstname, pi.lastname as userLastname, pi.middlename as userMiddlename, pi.suffix as userSuffix, pi.street as userStreet, pi.barangay as userBarangay, pi.city as userCity, pi.province as userProvince, pi.zip as userZip, pi.phone AS userPhone FROM appointmentSched AS ap INNER JOIN thirdPartyAppointment AS tpa ON ap.id = tpa.id INNER JOIN userProfile AS pi ON tpa.appointedBy = pi.userId WHERE tpa.appointedby = $1 ORDER BY ap.id desc",
        [id]
      );
  
      console.log(appointMentRes.rowCount);
  
      const patientAppointMents = [];
      // const employees = [];
  
      appointMentRes.rows.forEach((info) => {
          patientAppointMents.push(info);
      });
  
      return patientAppointMents;
    } catch (error) {
      console.error("get third party appointment error: " + error);
    }
  };
  