export default async (db)=>{
    try {
        const sql = "SELECT a.*, e.lastname, e.firstname, e.middlename, e.suffix, e.department, e.position FROM attendance AS a JOIN employee as e ON a.empid = e.id ORDER BY a.arrival DESC";

        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error("eftechEmployeeAttendanceError: " + error.message);
    }
}