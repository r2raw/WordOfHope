export default async (db, id)=>{
    try {
        const sql = "SELECT e.firstname, e.lastname, e.middlename, e.suffix, p.position_name, d.department_name FROM employee AS e JOIN positions AS p ON e.position = p.id JOIN departments AS d ON e.department = d.id WHERE e.id=$1"

        const result = await db.query(sql, [id])

        return result.rows[0]
    } catch (error) {
        console.error("getEmployeeSchedEdit Error: " + error.message)
    }
}