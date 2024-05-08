export default async (db)=>{
    try {
        const sql = "SELECT a.*, e.lastname, e.firstname, e.middlename, e.suffix, e.department, e.position, p.position_name, d.department_name FROM attendance AS a JOIN employee as e ON a.empid = e.id JOIN positions AS p ON e.position = p.id JOIN departments AS d ON e.department = d.id ORDER BY a.arrival DESC";

        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error("eftechEmployeeAttendanceError: " + error.message);
    }
}