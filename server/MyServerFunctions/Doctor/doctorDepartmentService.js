export default async (db, id)=>{
    try {
        const sql = "SELECT * from services WHERE department_id=$1 AND availability='Available'"
        const result = await db.query(sql, [id])

        return result.rows;

    } catch (error) {
        console.error("dotorDepartmentServices error: " + error.message)
    }
}