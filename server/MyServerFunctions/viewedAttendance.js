export default async (db, id)=>{
    try {
        const sql = "SELECT att.status, att.arrival, att.departure, att.arrivalimg, att.departureimg, e.firstname, e.lastname, e.middlename, e.suffix, p.position_name, d.department_name FROM attendance att JOIN employee e ON att.empid=e.id JOIN positions p ON e.position = p.id JOIN departments d ON e.department=d.id WHERE att.id=$1"
        const result = await db.query(sql, [id])

        return result.rows[0]
    } catch (error) {
        console.error("viewedAttendance ERROR: " + error.message)
    }
}