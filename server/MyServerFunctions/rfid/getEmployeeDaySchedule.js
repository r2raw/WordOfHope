export default async (db, eid, day) => {
    try {
        const sql = "SELECT * from employeeSched WHERE empid=$1 AND day=$2 ORDER BY startTime"
        const result = await db.query(sql, [eid, day])

        if (result.rowCount > 0){
            return result
        }

        return []
    } catch (error) {
        console.error("getemployeeDaySchedule error: " + error.message)
    }
}