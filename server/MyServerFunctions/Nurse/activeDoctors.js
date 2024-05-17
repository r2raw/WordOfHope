export default async (db) =>{
    try {
        const sql = "SELECT e.firstname, e.lastname, e.suffix, e.middlename, d.department_name, e.empimg FROM employee e JOIN wohUser u ON e.userid = u.id JOIN departments d ON e.department = d.id JOIN positions p ON e.position = p.id WHERE p.position_name = 'Doctor' AND u.loggedin=true"
        const result = await db.query(sql);

        return result.rows
    } catch (error) {
        console.error("activeDoctors ERROR: " + error.message)
    }
}