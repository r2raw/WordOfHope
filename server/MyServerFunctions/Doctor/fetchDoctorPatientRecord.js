export default async (db, doctor_id)=>{
    try {
        const sql = "SELECT pr.id, pr.patient_id, p.firstname, p.lastname, p.middlename, p.suffix, s.service_name, pr.date_added FROM patient_record pr JOIN services s ON pr.service_id = s.id JOIN patient p ON pr.patient_id = p.patient_id WHERE pr.doctor_id=$1 ORDER BY date_added DESC"
        const result = await db.query(sql, [doctor_id])

        return result.rows
    } catch (error) {
        console.error("fetchDoctorPatientRecord Error: " + error.message)
    }
}