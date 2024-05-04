export default async (db)=>{
    try {
        const sql = 'SELECT p.id, d.id AS department_id, d.department_name, p.position_name, p.availability AS position_availability, d.availability AS department_availability FROM positions AS p JOIN departments AS d on p.department_id = d.id'

        const result = await db.query(sql);
        return result.rows;
    } catch (error) {
        console.error("fetch position error: "  + error.message)
    }
}