export default async (db, id) => {
  try {
    const sql =
      "SELECT COUNT (*) AS appointment_count FROM appointmentSched aps JOIN services s ON aps.service = s.id WHERE aps.appointmentDate BETWEEN DATE_TRUNC('month', CURRENT_DATE) AND CURRENT_DATE AND s.department_id=$1";

    const result = await db.query(sql, [id]);
    return result.rows[0].appointment_count;
  } catch (error) {
    console.error("department appointmentCountCurrmonth: " + error.message);
  }
};
