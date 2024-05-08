export default async (db) =>{
    try {
        const sql = "SELECT e.*, p.position_name, d.department_name FROM employee as e JOIN positions as p ON e.position = p.id JOIN departments as d ON e.department = d.id WHERE e.id NOT IN (SELECT empId FROM employeeSched)"
        const result = await db.query(sql);

        if (result.rowCount > 0){
            return result.rows;
        }
        return null;
    } catch (error) {
        console.error("getNoSchedEmployee ERROR: " + error.message)
    }
}