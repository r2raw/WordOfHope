export default async (db) =>{
    try {
        const sql = "SELECT * FROM employee as e WHERE e.id NOT IN (SELECT empId FROM employeeSched)"
        const result = await db.query(sql);

        if (result.rowCount > 0){
            return result.rows;
        }
        return null;
    } catch (error) {
        console.error("getNoSchedEmployee ERROR: " + error.message)
    }
}