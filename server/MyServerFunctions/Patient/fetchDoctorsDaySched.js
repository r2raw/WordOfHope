export default async (db) =>{
    try {
        const sql = "SELECT DISTINCT(es.day) from employeeSched AS es JOIN employee as e ON es.empid = e.id WHERE e.position = 'Doctor'"
        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error("fetchDoctorDaySched ERROR: " + error.message)
    }
}