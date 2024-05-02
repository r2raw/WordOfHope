export default async (db, qr) => {
  try {
    const appointedForSelf = await db.query(
      "SELECT ap.id, ap.appointmenttime, ap.appointmentdate, ap.type, ap.reason, ap.service, ap.method, ap.qrcode, ap.appointedFor, ap.datebooked, ap.status, u.userId, pi.firstname, pi.lastname, pi.middlename, pi.suffix, pi.birthdate, pi.street, pi.barangay, pi.zip, pi.province, pi.city FROM appointmentSched AS ap INNER JOIN userAppointment AS u ON ap.id = u.id INNER JOIN userProfile AS pi ON u.userId = pi.userId WHERE ap.qrcode = $1",
      [qr]
    );

    if (appointedForSelf.rowCount === 0) return null;

    return appointedForSelf.rows[0];
  } catch (error) {
    console.error("appointedForSelf: " + error);
  }
};
