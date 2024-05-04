export default async (db)=>{
    try {
        const sql = "SELECT s.*, d.department_name, d.availability AS department_availability FROM services AS s JOIN departments as d  ON s.department_id = d.id"
        const result = await db.query(sql);

        return result.rows || []
    } catch (error) {
        console.error("Fetch services error: " + error.message)
    }
}