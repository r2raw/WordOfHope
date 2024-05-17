export default async (db)=>{
    try {
        const sql = "SELECT d.department_name, COUNT(pr.id) AS patient_count FROM departments d JOIN services s ON d.id = s.department_id JOIN patient_record pr ON s.id = pr.service_id GROUP BY d.department_name"
        const result = await db.query(sql)
        return result.rows;

    } catch (error) {
        console.error("departmentPatientCount ERROR: " + error.message)
    }
}