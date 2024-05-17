export default async (db)=>{
    try {
        const sql = "SELECT  TO_CHAR(DATE_TRUNC('month', date_visit), 'Mon') AS month, COUNT(*) AS monthly_patient_visits FROM  patient_record WHERE  EXTRACT(YEAR FROM date_visit) = EXTRACT(YEAR FROM CURRENT_DATE) GROUP BY month ORDER BY month"

        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error("monthly patient visit: " + error.message)
    }
}