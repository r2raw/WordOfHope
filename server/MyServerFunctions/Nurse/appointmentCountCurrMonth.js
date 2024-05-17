export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) AS appointment_count FROM appointmentSched WHERE appointmentDate BETWEEN DATE_TRUNC('month', CURRENT_DATE) AND CURRENT_DATE"

        const result = await db.query(sql);
        return result.rows[0];
    } catch (error) {
        console.error("appointmentCountCurrmonth ERROR: " + error.message)
    }
}