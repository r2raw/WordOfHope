export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) AS today_patient_count from patient_record WHERE date_visit = CURRENT_DATE";

        const result = await db.query(sql);
        return result.rows[0];
        
    } catch (error) {
        console.error("Patient count today error: " + error.message)
    }
}