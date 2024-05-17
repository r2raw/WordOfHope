export default async (db)=>{
    try {
        const sql = "SELECT TO_CHAR(date_visit, 'Dy') AS day_of_week, ROUND(AVG(completed_appointments)) AS average_completed_appointments FROM ( SELECT date_visit, COUNT(*) AS completed_appointments FROM patient_record WHERE doctor_id IS NOT NULL GROUP BY date_visit) AS completed_per_day GROUP BY TO_CHAR(date_visit, 'Dy') ORDER BY CASE WHEN TO_CHAR(date_visit, 'Dy') = 'Sun' THEN 1 WHEN TO_CHAR(date_visit, 'Dy') = 'Mon' THEN 2 WHEN TO_CHAR(date_visit, 'Dy') = 'Tue' THEN 3 WHEN TO_CHAR(date_visit, 'Dy') = 'Wed' THEN 4 WHEN TO_CHAR(date_visit, 'Dy') = 'Thu' THEN 5 WHEN TO_CHAR(date_visit, 'Dy') = 'Fri' THEN 6 WHEN TO_CHAR(date_visit, 'Dy') = 'Sat' THEN 7 END"

        const result = await db.query(sql);
        return result.rows
    } catch (error) {
        console.error("avarage patient visit error: " + error.message)
    }
}