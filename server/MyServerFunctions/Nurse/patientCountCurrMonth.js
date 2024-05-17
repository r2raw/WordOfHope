export default async (db) => {
  try {
    const sql = "SELECT COUNT(*) AS patient_count FROM patient_record WHERE date_visit BETWEEN DATE_TRUNC('month', CURRENT_DATE) AND CURRENT_DATE"
    const result = await db.query(sql)
    return result.rows[0];
  } catch (error) {
    console.error("patientCOunt Current month ERROR: " + error.message);
  }
};
