export default async (db, id)=>{
    try {
        const sql = "SELECT COUNT(*) AS today_patient_count from patient_record pr JOIN services s ON pr.service_id = s.id WHERE date_visit = CURRENT_DATE AND s.department_id=$1";

        const result = await db.query(sql, [id]);
        return result.rows[0].today_patient_count;
        
    } catch (error) {
        console.error("Patient count today error: " + error.message)
    }
}