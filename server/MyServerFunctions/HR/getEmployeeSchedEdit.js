export default async (db, id)=>{
    try {
        const sql = "SELECT starttime, endtime, day FROM employeesched WHERE empid=$1"

        const result = await db.query(sql, [id])

        return result.rows
    } catch (error) {
        console.error("getEmployeeSchedEdit Error: " + error.message)
    }
}