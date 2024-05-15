export default async (db)=>{
    try {
        const sql = "SELECT e.id, e.firstname, e.lastname, e.middlename, e.suffix, d.department_name, p.position_name FROM employee e JOIN employeeSched es ON e.id = es.empid JOIN departments d ON e.department = d.id JOIN positions p ON e.position = p.id JOIN wohUser u ON e.userid = u.id LEFT JOIN attendance a ON e.id = a.empid  AND a.arrival::time BETWEEN es.startTime AND es.endTime AND date_trunc('day', a.arrival) = current_date WHERE es.day = to_char(current_date, 'Day') AND a.id IS NULL AND u.accountstatus='Activated'"

        const result = await db.query(sql)
        return result.rows;
    } catch (error) {
        console.error("Absent employee error: " + error.message)
    }
}