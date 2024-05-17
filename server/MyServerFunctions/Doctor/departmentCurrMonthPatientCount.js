export default async (db, id) => {
    try {
      const sql = "SELECT COUNT(*) AS patient_count FROM patient_record pr JOIN services s ON pr.service_id = s.id WHERE date_visit BETWEEN DATE_TRUNC('month', CURRENT_DATE) AND CURRENT_DATE AND s.department_id=$1"
      const result = await db.query(sql, [id])
      return result.rows[0].patient_count;
    } catch (error) {
      console.error("patientCOunt Current month ERROR: " + error.message);
    }
  };
  