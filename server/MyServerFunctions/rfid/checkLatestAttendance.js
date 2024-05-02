export default async (db, id)=>{
    try {
        const sql = "SELECT * FROM attendance WHERE empid=$1 ORDER BY arrival DESC LIMIT 1"

        const result = await db.query(sql, [id])

        if (result.rowCount > 0){
            return result.rows[0]
        }

        return null
        
    } catch (error) {
        console.error("checkLatestAttendanceError: " + error.message)
    }
}