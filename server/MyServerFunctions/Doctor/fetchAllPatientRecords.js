export default async (db) => {
  try {
    const sql =
      "SELECT pr.id, pr.patient_id, p.firstname, p.lastname, p.middlename, p.suffix, s.service_name, pr.date_added FROM patient_record pr JOIN services s ON pr.service_id = s.id JOIN patient p ON pr.patient_id = p.patient_id ORDER BY date_added DESC";
    const result = await db.query(sql);

    return result.rows;
  } catch (error) {
    console.error("fetchAllpatientRecords ERROR: " + error.message);
  }
};
