export default async (db)=>{
    try {
        const sql = "SELECT es.day, es.startTime, es.endTime, e.department from employeeSched AS es JOIN employee as e ON es.empid = e.id JOIN positions AS p ON e.position = p.id WHERE p.position_name = 'Doctor'"
        const result = await db.query(sql)
        return result.rows;
    } catch (error) {
        console.error("fetchAvailableDoctorTime ERROR: " + error.message)
    }
}