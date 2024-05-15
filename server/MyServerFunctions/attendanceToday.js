export default async (db)=>{
    try {
        const sql = "SELECT att.*, e.firstname, e.lastname, e.suffix, e.middlename, d.department_name, p.position_name FROM attendance att JOIN employee e ON att.empid = e.id JOIN departments d ON e.department = d.id JOIN positions p ON e.position = p.id WHERE DATE(arrival) = CURRENT_DATE ORDER by att.arrival"
        const result = await db.query(sql);

        return result.rows
    } catch (error) {
        console.error("attendance today error: " + error.message)
    }
}