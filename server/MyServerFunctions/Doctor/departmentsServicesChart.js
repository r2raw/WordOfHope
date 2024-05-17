export default async(db, id)=>{
    try {
        const sql = "SELECT s.service_name, COUNT(pr.id) AS patient_count FROM services s JOIN patient_record pr ON s.id = pr.service_id WHERE s.department_id = $1 GROUP BY s.service_name"
        const result = await db.query(sql, [id]);

        return result.rows;
    } catch (error) {
        console.error("department services chart error: " + error.message)
    }
}